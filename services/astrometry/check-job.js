import fetch from "node-fetch";

import { astrometryConfig } from "./config.js";

const JOBID = Number(astrometryConfig.jobId || 15056968);

async function checkJob() {
    const response = await fetch(
        `https://nova.astrometry.net/api/jobs/${JOBID}`
    );

    const json = await response.json();
    console.log(JSON.stringify(json, null, 2));

    if (json.status === "success") {
        console.log("Job solved successfully");
    } else if (json.status === "failure") {
        console.log("Job failed");
    } else {
        console.log("Job still processing");
    }
}

checkJob().catch(console.error);
