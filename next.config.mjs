/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ['mui-tel-input'],
    experimental:{
        serverActions:{
            allowedOrigins:['49.12.111.204:3030','49.12.111.204']
        }
    }
};

export default nextConfig;
