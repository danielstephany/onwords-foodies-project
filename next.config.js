/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'daniel-stephany-onwards-foodies-starting-project.s3.us-east-1.amazonaws.com',
                port: '',
                pathname: "/**"
            }
        ]
    }
}

module.exports = nextConfig
