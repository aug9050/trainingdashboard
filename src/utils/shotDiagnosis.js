export function getShotDiagnosis(trace = []) {
    //console.log("trace", trace)
    if (!trace.length) return "No Data";

    let sumX = 0;
    let sumY = 0;

    trace.forEach(p => {
    sumX += p.x;
    sumY += p.y;
    });

    const avgX = sumX / trace.length;
    const avgY = sumY / trace.length;

    // determine direction
    if (avgX > 5 && avgY < -5) return "Breaking Wrist Up";
    if (avgX > 5 && avgY > 5) return "Heeling (Pushing Forward)";
    if (avgX < -5 && avgY > 5) return "Jerking Trigger";
    if (avgX < -5 && avgY < -5) return "Thumbing";

    if (avgY > 8) return "Pushing Forward";
    if (avgY < -8) return "Anticipating Recoil";
    if (avgX > 8) return "Too Much Trigger Finger";
    if (avgX < -8) return "Too Little Trigger Finger";

    return "Stable Shot";
}