import { registerAs } from '@nestjs/config';

export default registerAs('configUpload', () => {
    return {
        cloudinary: {
            cloudName: process.env.CLOUDINARY_NAME,
            apiKey: process.env.CLOUDINARY_API_KEY,
            apiSecret: process.env.CLOUDINARY_API_SECRET,
        },
        s3amazon: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            region: process.env.AWS_REGION,
            bucket: process.env.AWS_BUCKET
        },
        firestore: {
            type: process.env.FIRESTORE_TYPE,
            projectId: process.env.FIRESTORE_PROJECT_ID,
            privateKeyId: process.env.FIRESTORE_PRIVATE_KEY_ID,
            privateKey: process.env.FIRESTORE_PRIVATE_KEY,
            clientEmail: process.env.FIRESTORE_CLIENT_EMAIL,
            clientId: process.env.FIRESTORE_CLIENT_ID,
            authUri: process.env.FIRESTORE_AUTH_URI,
            tokenUri: process.env.FIRESTORE_TOKEN_URI,
            authProviderX509CertUrl: process.env.FIRESTORE_AUTH_PROVIDER_X509_CERT_URL,
            clientX509CertUrl: process.env.FIRESTORE_CLIENT_X509_CERT_URL
        }
    };
});