import { useState, useEffect, useRef } from 'react';
import imageCompression from 'browser-image-compression';
import { calculateCompressionOptions } from '../utils/compression';

export const useImageCompression = () => {
    const [originalImage, setOriginalImage] = useState(null);
    const [originalImageUrl, setOriginalImageUrl] = useState(null);
    const [compressedImage, setCompressedImage] = useState(null);
    const [compressedImageUrl, setCompressedImageUrl] = useState(null);
    const [isCompressing, setIsCompressing] = useState(false);
    const [targetSizeKB, setTargetSizeKB] = useState(100);
    const [error, setError] = useState(null);

    const compressionTimeoutRef = useRef(null);

    useEffect(() => {
        return () => {
            if (compressionTimeoutRef.current) clearTimeout(compressionTimeoutRef.current);
            if (originalImageUrl) URL.revokeObjectURL(originalImageUrl);
            if (compressedImageUrl) URL.revokeObjectURL(compressedImageUrl);
        };
    }, [originalImageUrl, compressedImageUrl]);

    const compress = async (file, targetKB) => {
        if (!file) return;

        setIsCompressing(true);
        setError(null); // Clear any previous errors

        try {
            const options = calculateCompressionOptions(file, targetKB);
            const compressedFile = await imageCompression(file, options);
            setCompressedImage(compressedFile);
            setCompressedImageUrl(URL.createObjectURL(compressedFile));
        } catch (err) {
            console.error('Error compressing:', err);
            let errorMessage = 'Failed to compress image. ';

            if (err.message?.includes('Not an image')) {
                errorMessage += 'The file is not a valid image.';
            } else if (err.message?.includes('Could not load image')) {
                errorMessage += 'The image file appears to be corrupted.';
            } else if (err.message?.includes('timeout')) {
                errorMessage += 'Compression took too long. Try a smaller target size.';
            } else {
                errorMessage += err.message || 'Please try again.';
            }

            setError(errorMessage);
        } finally {
            setIsCompressing(false);
        }
    };

    const handleTargetSizeChange = (newTargetSize) => {
        setTargetSizeKB(newTargetSize);

        if (compressionTimeoutRef.current) clearTimeout(compressionTimeoutRef.current);

        if (originalImage) {
            compressionTimeoutRef.current = setTimeout(() => {
                compress(originalImage, newTargetSize);
            }, 300);
        }
    };

    const initializeImage = (file) => {
        setOriginalImage(file);
        setOriginalImageUrl(URL.createObjectURL(file));

        // Calculate 80% of original image size as the default target
        const originalSizeKB = Math.round(file.size / 1024);
        const defaultTargetKB = Math.max(10, Math.round(originalSizeKB * 0.8)); // At least 10KB

        setTargetSizeKB(defaultTargetKB);
        compress(file, defaultTargetKB);
    };

    const reset = () => {
        setOriginalImage(null);
        setOriginalImageUrl(null);
        setCompressedImage(null);
        setCompressedImageUrl(null);
        setTargetSizeKB(100);
        setIsCompressing(false);
        setError(null);
    };

    const clearError = () => {
        setError(null);
    };

    return {
        originalImage,
        originalImageUrl,
        compressedImage,
        compressedImageUrl,
        isCompressing,
        targetSizeKB,
        error,
        initializeImage,
        setTargetSizeKB,
        handleTargetSizeChange,
        reset,
        clearError,
    };
};