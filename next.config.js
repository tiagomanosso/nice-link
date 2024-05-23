/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        // this will override the experiments
        config.experiments = { ...config.experiments, topLevelAwait: true };
        // this will just update topLevelAwait property of config.experiments
        // config.experiments.topLevelAwait = true 
        return config;
    },
    reactStrictMode: true,
    swcMinify: true,
    compiler: {
        // ssr and displayName are configured by default
        styledComponents: true,
    },
    optimizeFonts: false, async rewrites() {
        return [
            {
                source: '/:path*/:path*',
                // source: '/(links|lnk|l)',
                destination: '/',
            },
        ]
    },
}

module.exports = nextConfig
