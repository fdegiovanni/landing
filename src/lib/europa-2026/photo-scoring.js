"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deduplicatePhotos = deduplicatePhotos;
exports.resolutionScore = resolutionScore;
exports.selectTopPhotos = selectTopPhotos;
function deduplicatePhotos(photos) {
    if (photos.length === 0)
        return [];
    const sorted = [...photos].sort((a, b) => new Date(a.mediaMetadata.creationTime).getTime() -
        new Date(b.mediaMetadata.creationTime).getTime());
    const result = [sorted[0]];
    for (let i = 1; i < sorted.length; i++) {
        const current = sorted[i];
        const last = result[result.length - 1];
        const timeDiff = new Date(current.mediaMetadata.creationTime).getTime() -
            new Date(last.mediaMetadata.creationTime).getTime();
        if (timeDiff < 5000) {
            if (resolutionScore(current) > resolutionScore(last)) {
                result[result.length - 1] = current;
            }
        }
        else {
            result.push(current);
        }
    }
    return result;
}
function resolutionScore(photo) {
    return parseInt(photo.mediaMetadata.width) * parseInt(photo.mediaMetadata.height);
}
function selectTopPhotos(photos, count = 10) {
    const deduped = deduplicatePhotos(photos);
    if (deduped.length <= count)
        return deduped;
    // Group by UTC hour, each bucket sorted by resolution desc
    const byHour = new Map();
    for (const photo of deduped) {
        const hour = new Date(photo.mediaMetadata.creationTime).getUTCHours();
        if (!byHour.has(hour))
            byHour.set(hour, []);
        byHour.get(hour).push(photo);
    }
    for (const [h, bucket] of byHour) {
        byHour.set(h, bucket.sort((a, b) => resolutionScore(b) - resolutionScore(a)));
    }
    // Round-robin across hours: pick best-remaining from each hour in turn
    const selected = [];
    const hours = Array.from(byHour.keys()).sort();
    let round = 0;
    outer: while (true) {
        let addedThisRound = false;
        for (const hour of hours) {
            const bucket = byHour.get(hour);
            if (bucket[round]) {
                selected.push(bucket[round]);
                addedThisRound = true;
                if (selected.length >= count)
                    break outer;
            }
        }
        if (!addedThisRound)
            break;
        round++;
    }
    return selected;
}
