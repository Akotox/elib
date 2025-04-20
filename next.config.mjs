const nextConfig = {
  assetPrefix: "/exp1-static",
  transpilePackages: ["@workspace/ui"],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.pixabay.com',
        pathname: '**',
    },
   
      {
        protocol: 'https',
        hostname: 'bronze-keen-ox-570.mypinata.cloud',
      },
    ],    
  },  
}

export default nextConfig
