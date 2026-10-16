import type {NextConfig} from 'next';

const config: NextConfig = {
    outputFileTracingIncludes: {
        '/*': ['./news/**/*.md'],
    },
};

export default config;
