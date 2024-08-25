/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com', // Allow images from a specific host
            }
        ]
    }
};

export default nextConfig;
