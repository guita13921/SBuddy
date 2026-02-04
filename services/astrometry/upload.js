import fetch from "node-fetch";
import FormData from "form-data";
import fs from "fs";

const SESSION = "a8vde7018phs7xgzajrmc5x12zjid1aq";
const FILE_PATH = "./Barnard33.fit";

async function uploadFile() {
    const form = new FormData();

    // request-json part
    form.append(
        "request-json",
        JSON.stringify({
            publicly_visible: "y",
            allow_modifications: "d",
            allow_commercial_use: "d",
            session: SESSION
        }),
        { contentType: "text/plain" }
    );

    // file part
    form.append(
        "file",
        fs.createReadStream(FILE_PATH),
        {
            filename: "Barnard33.fit",
            contentType: "application/octet-stream"
        }
    );

    // 🔑 CRITICAL: compute Content-Length
    const contentLength = await new Promise((resolve, reject) => {
        form.getLength((err, length) => {
            if (err) reject(err);
            else resolve(length);
        });
    });

    const response = await fetch(
        "https://nova.astrometry.net/api/upload",
        {
            method: "POST",
            body: form,
            headers: {
                ...form.getHeaders(),
                "Content-Length": contentLength
            }
        }
    );

    const text = await response.text();
    console.log(text);

    const json = JSON.parse(text);
    return json.subid;
}

uploadFile()
    .then(subid => {
        console.log("SUBMISSION ID =", subid);
    })
    .catch(err => {
        console.error("Upload failed:", err);
    });
