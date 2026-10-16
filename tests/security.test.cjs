const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');

function loadProxy(environment) {
    const source = fs.readFileSync(path.join(__dirname, '..', 'proxy.ts'), 'utf8');
    const {outputText} = ts.transpileModule(source, {
        compilerOptions: {module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020},
    });
    const module = {exports: {}};
    const mockRequire = id => id === 'next/server' ? {
        NextResponse: {next: options => ({request: options.request, headers: new Headers()})},
    } : require(id);
    new Function('require', 'module', 'exports', 'process', outputText)(
        mockRequire, module, module.exports, {env: {NODE_ENV: environment}},
    );
    return module.exports.proxy;
}

test('production CSP uses fresh nonces and overwrites client-supplied policy values', () => {
    const proxy = loadProxy('production');
    const request = {headers: new Headers({
        'x-nonce': 'attacker', 'Content-Security-Policy': "script-src 'unsafe-inline'",
    })};
    const first = proxy(request);
    const second = proxy(request);
    const policy = first.headers.get('Content-Security-Policy');
    const nonce = first.request.headers.get('x-nonce');
    assert.equal(Buffer.from(nonce, 'base64').length, 16);
    assert.notEqual(nonce, second.request.headers.get('x-nonce'));
    assert.equal(first.request.headers.get('Content-Security-Policy'), policy);
    assert.ok(policy.includes(`'nonce-${nonce}'`));
    assert.ok(!policy.includes('attacker'));
    const scripts = policy.split(';').find(value => value.trim().startsWith('script-src'));
    assert.ok(!scripts.includes('unsafe-inline'));
    assert.ok(!scripts.includes('unsafe-eval'));
    for (const directive of ["frame-ancestors 'none'", "object-src 'none'", "base-uri 'self'", "form-action 'self'"]) {
        assert.ok(policy.includes(directive));
    }
    assert.ok(!policy.includes('ws://'));
});

test('development CSP allows Next.js debugging and local hot reload', () => {
    const response = loadProxy('development')({headers: new Headers()});
    const policy = response.headers.get('Content-Security-Policy');
    assert.ok(policy.includes("'unsafe-eval'"));
    assert.ok(policy.includes('ws://localhost:*'));
    assert.ok(policy.includes("frame-ancestors 'none'"));
});
