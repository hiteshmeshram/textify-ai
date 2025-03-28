
"use server"
import {S3Client, PutObjectCommand} from '@aws-sdk/client-s3'
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({
    
    endpoint: "https://blr1.digitaloceanspaces.com",
    region: 'blr1',
    credentials: {
        accessKeyId: process.env.NEXT_PUBLIC_DIGITAL_OCEAN_ACCESS_KEY ?? "",
        secretAccessKey: process.env.NEXT_PUBLIC_DIGITAL_OCEAN_SECRET_KEY ?? ""
    }
})

export async function getPresignedUrlFromDigitalOcean(fileName: string, fileType: string) {
    try {
        const command = new PutObjectCommand({
            Bucket: "muzer-assets",
            Key: fileName,
            ContentType: fileType
        });

        const url = await getSignedUrl(s3Client, command, {expiresIn: 3600})
        return url;

    } catch (error) {
        console.log(error);
    }
}