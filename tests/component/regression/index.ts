import { MatchImageSnapshotOptions } from 'jest-image-snapshot';

export const getConfigRegression = (customDiffDir, customSnapshotsDir): MatchImageSnapshotOptions => ({
    diffDirection: 'vertical',
    dumpDiffToConsole: true,
    comparisonMethod: 'ssim',
    customDiffDir,
    customSnapshotsDir
});