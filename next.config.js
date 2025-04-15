/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.pixabay.coms',
                pathname: '**',
            },
           
        ],
    },
};

module.exports = nextConfig;
