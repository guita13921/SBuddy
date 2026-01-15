import fetch from "node-fetch";
import fs from "fs";

const JOBID = 15056968;
const OUTPUT_FILE = "Barnard33_wcs.fits";

async function downloadWCS() {
    const response = await fetch(
        `https://nova.astrometry.net/wcs_file/${JOBID}`,
        {
            headers: {
                "Referer": "https://nova.astrometry.net/"
            }
        }
    );

    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }

    const buffer = await response.arrayBuffer();
    fs.writeFileSync(OUTPUT_FILE, Buffer.from(buffer));

    console.log("WCS FITS downloaded:", OUTPUT_FILE);
}

downloadWCS().catch(console.error);
