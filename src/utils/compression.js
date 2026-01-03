export const calculateCompressionOptions = (file, targetSizeKB) => {
    const originalSizeMB = file.size / (1024 * 1024);
    const targetSizeMB = targetSizeKB / 1024;

    // Calculate compression ratio needed
    const compressionRatio = targetSizeMB / originalSizeMB;

    // Calculate quality based on compression ratio (0.1 to 0.95)
    const initialQuality = Math.max(0.1, Math.min(0.95, compressionRatio * 1.2));

    // Adjust max dimension based on target size
    let maxDimension;
    if (targetSizeKB < 50) {
        maxDimension = 1280;
    } else if (targetSizeKB < 150) {
        maxDimension = 1600;
    } else {
        maxDimension = 1920;
    }

    return {
        maxSizeMB: Math.max(0.01, targetSizeMB),
        maxWidthOrHeight: maxDimension,
        useWebWorker: true,
        initialQuality: initialQuality,
    };
};