import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, "..");

function parseEnvFile(contents) {
    const lines = contents.split(/\r?\n/);
    const entries = [];

    for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith("#")) {
            continue;
        }

        const separatorIndex = trimmed.indexOf("=");
        if (separatorIndex === -1) {
            continue;
        }

        const key = trimmed.slice(0, separatorIndex).trim();
        let value = trimmed.slice(separatorIndex + 1).trim();

        if (
            (value.startsWith("\"") && value.endsWith("\"")) ||
            (value.startsWith("'") && value.endsWith("'"))
        ) {
            value = value.slice(1, -1);
        }

        entries.push([key, value]);
    }

    return entries;
}

export function loadEnv({ extraFiles = [] } = {}) {
    const envFiles = [path.resolve(ROOT_DIR, ".env"), ...extraFiles];

    for (const filePath of envFiles) {
        if (!fs.existsSync(filePath)) {
            continue;
        }

        const contents = fs.readFileSync(filePath, "utf-8");
        const entries = parseEnvFile(contents);

        for (const [key, value] of entries) {
            if (process.env[key] === undefined) {
                process.env[key] = value;
            }
        }
    }
}

export function getEnv(name, { required = false, defaultValue } = {}) {
    const value = process.env[name] ?? defaultValue;

    if (required && (!value || `${value}`.trim() === "")) {
        throw new Error(`Missing required environment variable: ${name}`);
    }

    return value;
}

export function getRequiredEnv(names) {
    return names.reduce((acc, name) => {
        acc[name] = getEnv(name, { required: true });
        return acc;
    }, {});
}
