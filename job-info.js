import fetch from "node-fetch";

const JOBID = 15056968;

async function getJobInfo() {
    const response = await fetch(
        `https://nova.astrometry.net/api/jobs/${JOBID}/info/`
    );

    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }

    const json = await response.json();
    console.log(JSON.stringify(json, null, 2));

    // Convenient access
    console.log("\n=== SUMMARY ===");
    console.log("Status:", json.status);
    console.log("Objects:", json.objects_in_field);
    console.log("Tags:", json.tags);
    console.log("Pixel scale:", json.calibration?.pixscale);
    console.log("RA / DEC:", json.calibration?.ra, json.calibration?.dec);
}

getJobInfo().catch(console.error);
