/** @type {import('next').NextConfig} */
const nextConfig = {
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
        BACKEND_URL: process.env.BACKEND_URL,
    },
};

module.exports = nextConfig;
