/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import './src/env.js';

/** @type { import ('next').NextConfig } */
const config = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/polls',
                permanent: true,
            },
        ];
    },
    images: {
        dangerouslyAllowSVG: true,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
                port: '',
                pathname: '**',
            },
        ],
    },
    env: {
        BACKEND_URL: process.env.BACKEND_URL ?? 'http://localhost:3000/api',
    },
};

export default config;
