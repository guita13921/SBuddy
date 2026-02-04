import path from "path";
import { fileURLToPath } from "url";

import { getEnv, loadEnv } from "../../config/env.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

loadEnv({ extraFiles: [path.resolve(__dirname, ".env")] });

export const appConfig = {
    databaseUrl: getEnv("DATABASE_URL"),
    jwtSecret: getEnv("JWT_SECRET"),
    s3Bucket: getEnv("S3_BUCKET"),
    redisUrl: getEnv("REDIS_URL")
};

export const astrometryConfig = {
    apiKey: getEnv("ASTROMETRY_API_KEY"),
    session: getEnv("ASTROMETRY_SESSION"),
    filePath: getEnv("ASTROMETRY_FILE_PATH"),
    jobId: getEnv("ASTROMETRY_JOB_ID"),
    submissionId: getEnv("ASTROMETRY_SUBMISSION_ID"),
    outputFile: getEnv("ASTROMETRY_OUTPUT_FILE")
};

export function requireAstrometryApiKey() {
    return getEnv("ASTROMETRY_API_KEY", { required: true });
}
