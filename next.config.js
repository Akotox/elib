/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.pixabay.com',
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
              },
              {
                protocol: 'https',
                hostname: 'bronze-keen-ox-570.mypinata.cloud',
              },
        ],
    },
};

module.exports = nextConfig;
