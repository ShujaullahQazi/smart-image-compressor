import { useState, useEffect, useRef } from 'react';
import imageCompression from 'browser-image-compression';

export const useImageCompression = () => {
    const [originalImage, setOriginalImage] = useState(null);
    const [originalImageUrl, setOriginalImageUrl] = useState(null);
    const [compressedImage, setCompressedImage] = useState(null);
    const [compressedImageUrl, setCompressedImageUrl] = useState(null);
    const [isCompressing, setIsCompressing] = useState(false);
    const [quality, setQuality] = useState(80);

    const compressionTimeoutRef = useRef(null);

    // Clean up URLs when they change or component unmounts
    useEffect(() => {
        return () => {
            if (originalImageUrl) URL.revokeObjectURL(originalImageUrl);
            if (compressedImageUrl) URL.revokeObjectURL(compressedImageUrl);
        };
    }, [originalImageUrl, compressedImageUrl]);

    const compress = async (file, qualityValue) => {
        if (!file) return;

        setIsCompressing(true);

        // Logic extracted from your original App.jsx
        const initialQuality = 0.1 + (qualityValue / 100) * 0.9;
        const estimatedOriginalSizeMB = file.size / (1024 * 1024);
        const sizeRatio = 0.01 + (qualityValue / 100) * 0.99;
        const maxSizeMB = estimatedOriginalSizeMB * sizeRatio;

        const maxDimension = qualityValue < 30 ? 1280 : qualityValue < 60 ? 1600 : 1920;

        const options = {
            maxSizeMB: Math.max(0.01, maxSizeMB),
            maxWidthOrHeight: maxDimension,
            useWebWorker: true,
            initialQuality: initialQuality,
        };

        try {
            const compressedFile = await imageCompression(file, options);
            setCompressedImage(compressedFile);
            setCompressedImageUrl(URL.createObjectURL(compressedFile));
        } catch (error) {
            console.error('Error compressing:', error);
        } finally {
            setIsCompressing(false);
        }
    };

    const handleQualityChange = (newQuality) => {
        const clampedQuality = Math.max(0, Math.min(100, newQuality));
        setQuality(clampedQuality);

        if (compressionTimeoutRef.current) clearTimeout(compressionTimeoutRef.current);

        if (originalImage) {
            compressionTimeoutRef.current = setTimeout(() => {
                compress(originalImage, clampedQuality);
            }, 300);
        }
    };

    const reset = () => {
        setOriginalImage(null);
        setOriginalImageUrl(null);
        setCompressedImage(null);
        setCompressedImageUrl(null);
        setQuality(80);
        setIsCompressing(false);
    };

    return {
        originalImage,
        originalImageUrl,
        compressedImage,
        compressedImageUrl,
        isCompressing,
        quality,
        setOriginalImage,
        setOriginalImageUrl,
        handleQualityChange,
        compress,
        reset,
    };
};