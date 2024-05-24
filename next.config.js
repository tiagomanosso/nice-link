/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        config.experiments = { ...config.experiments, topLevelAwait: true };
        return config;
    },
    reactStrictMode: true,
    swcMinify: true,
    compiler: {
        // ssr and displayName are configured by default
        styledComponents: true,
    },
    logging: {
        fetches: {
            fullUrl: true,
        },
    },
    optimizeFonts: false, async rewrites() {
        return [
            {
                source: '/:path*/:path*',
                // source: '/(links|lnk|l)',
                destination: '/'
            },
            {
                source: '/minisite',
                // source: '/(links|lnk|l)',
                destination: '/'
            }
        ]
    },
}

module.exports = nextConfig
