import fetch from "node-fetch";

import { astrometryConfig } from "./config.js";

const JOBID = Number(astrometryConfig.jobId || 15056968);

async function getCalibration() {
    const response = await fetch(
        `https://nova.astrometry.net/api/jobs/${JOBID}/calibration`
    );

    const json = await response.json();
    console.log(JSON.stringify(json, null, 2));

    console.log("\nSolved parameters:");
    console.log("RA (deg):", json.ra);
    console.log("DEC (deg):", json.dec);
    console.log("Pixel scale (arcsec/pixel):", json.pixscale);
    console.log("Orientation (deg):", json.orientation);
}

getCalibration().catch(console.error);
