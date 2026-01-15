import fetch from "node-fetch";

const JOBID = 15056968;

async function getAnnotations() {
    const response = await fetch(
        `https://nova.astrometry.net/api/jobs/${JOBID}/annotations`
    );

    const json = await response.json();
    console.log(JSON.stringify(json, null, 2));

    console.log("\nDetected objects:");

    json.annotations.forEach(obj => {
        const name =
            obj.names && obj.names.length > 0
                ? obj.names.join(", ")
                : "(no name)";

        console.log(
            `- ${obj.type.toUpperCase()} | ${name} | pixel=(${obj.pixelx.toFixed(
                1
            )}, ${obj.pixely.toFixed(1)}) | radius=${obj.radius}`
        );
    });
}

getAnnotations().catch(console.error);
