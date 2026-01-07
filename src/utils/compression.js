export const calculateCompressionOptions = (file, targetSizeKB) => {
    return {
        maxSizeMB: (targetSizeKB * 0.9) / 1024,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
        initialQuality: 0.8,
    };
};
