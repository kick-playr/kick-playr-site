const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');

function loadTs(file, requireModule = require) {
    const source = fs.readFileSync(path.join(__dirname, '..', file), 'utf8');
    const {outputText} = ts.transpileModule(source, {compilerOptions: {esModuleInterop: true, module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020}});
    const module = {exports: {}};
    new Function('require', 'module', 'exports', outputText)(requireModule, module, module.exports);
    return module.exports;
}
const {resolveLocale} = loadTs('intl/locale.ts');
test('negotiates supported languages, regions and quality weights', () => {
    for (const [header, expected] of [
        [null, 'en'], ['', 'en'], ['de-CH,de;q=0.9,en;q=0.8', 'de'],
        ['fr-CH', 'fr'], ['IT-it', 'it'], ['en-US', 'en'],
        ['de;q=0.4,fr;q=0.9', 'fr'], ['es, it;q=0.8', 'it'],
        ['de;q=0,fr;q=0.5', 'fr'], ['de;q=invalid,it;q=0.7', 'it'],
        ['de;q=1.5,fr;q=1', 'fr'], ['fr;q=0.8,de;q=0.8', 'fr'],
        ['ja-JP', 'en'], ['*', 'en'], ['garbage!,it;q=0.5', 'it'],
    ]) assert.equal(resolveLocale(header), expected, String(header));
});
const english = require('../intl/messages/en.json');
test('all catalogs contain nonempty translations for every English key', () => {
    for (const locale of ['en', 'de', 'fr', 'it']) {
        const messages = require(`../intl/messages/${locale}.json`);
        assert.deepEqual(Object.keys(messages).sort(), Object.keys(english).sort());
        for (const value of Object.values(messages)) assert.ok(typeof value === 'string' && value.trim());
    }
});
test('loads only English and the requested catalog; falls back for missing and blank values', async () => {
    const imports = [];
    const {loadMessages} = loadTs('intl/messages.ts', id => {
        imports.push(id);
        if (id === './messages/en.json') return english;
        if (id === './messages/de.json') return {features: 'Funktionen', pricing: '  '};
        throw Error(`Unexpected import: ${id}`);
    });
    const result = await loadMessages('de');
    assert.equal(result.features, 'Funktionen');
    assert.equal(result.pricing, english.pricing);
    assert.equal(result.metadataTitle, english.metadataTitle);
    assert.deepEqual(imports, ['./messages/en.json', './messages/de.json']);
});


test('saved language overrides the header; invalid preferences use header negotiation', () => {
    const {resolveRequestLocale} = loadTs('intl/locale.ts');
    assert.equal(resolveRequestLocale('it', 'de-CH'), 'it');
    assert.equal(resolveRequestLocale('en', 'fr'), 'en');
    assert.equal(resolveRequestLocale(undefined, 'de-CH'), 'de');
    assert.equal(resolveRequestLocale('invalid', 'fr-CH'), 'fr');
    assert.equal(resolveRequestLocale('es', null), 'en');
});
