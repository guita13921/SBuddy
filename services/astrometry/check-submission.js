import fetch from "node-fetch";

const SUBID = 14222752;

async function checkSubmission() {
    const response = await fetch(
        `https://nova.astrometry.net/api/submissions/${SUBID}`
    );

    const json = await response.json();
    console.log(JSON.stringify(json, null, 2));

    if (json.jobs && json.jobs.length > 0) {
        console.log("JOB ID =", json.jobs[0]);
        return json.jobs[0];
    } else {
        console.log("No job yet. Still processing...");
        return null;
    }
}

checkSubmission().catch(console.error);
