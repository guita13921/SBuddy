import fetch from "node-fetch";
import { URLSearchParams } from "url";

const API_KEY = "kbrunnpyfngxhggi";

async function login() {
    // Match Python: data={'request-json': json.dumps({...})}
    const body = new URLSearchParams({
        "request-json": JSON.stringify({
            apikey: API_KEY
        })
    });

    const response = await fetch(
        "http://nova.astrometry.net/api/login",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: body
        }
    );

    const text = await response.text();
    console.log(text);

    // Optional: parse JSON
    const json = JSON.parse(text);
    return json.session;
}

login()
    .then(session => {
        console.log("SESSION =", session);
    })
    .catch(err => {
        console.error("Login failed:", err);
    });
