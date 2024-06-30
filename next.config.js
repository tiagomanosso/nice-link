/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
        return [
            {
                // Routes this applies to
                source: "/api/(.*)",
                // Headers
                headers: [
                    // Allow for specific domains to have access or * for all
                    {
                        key: "Access-Control-Allow-Origin",
                        value: "*",
                        // DOES NOT WORK
                        // value: process.env.ALLOWED_ORIGIN,
                    },
                    // Allows for specific methods accepted
                    {
                        key: "Access-Control-Allow-Methods",
                        value: "GET, POST, PUT, DELETE, OPTIONS",
                    },
                    // Allows for specific headers accepted (These are a few standard ones)
                    {
                        key: "Access-Control-Allow-Headers",
                        value: "Content-Type, Authorization",
                    },
                ],
            },
        ];
    },
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
