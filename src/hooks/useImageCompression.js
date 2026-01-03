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

    const compressionTimeoutRef = useRef(null);

    useEffect(() => {
        return () => {
            if (originalImageUrl) URL.revokeObjectURL(originalImageUrl);
            if (compressedImageUrl) URL.revokeObjectURL(compressedImageUrl);
        };
    }, [originalImageUrl, compressedImageUrl]);

    const compress = async (file, targetKB) => {
        if (!file) return;

        setIsCompressing(true);

        try {
            const options = calculateCompressionOptions(file, targetKB);
            const compressedFile = await imageCompression(file, options);
            setCompressedImage(compressedFile);
            setCompressedImageUrl(URL.createObjectURL(compressedFile));
        } catch (error) {
            console.error('Error compressing:', error);
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
        compress(file, targetSizeKB);
    };

    const reset = () => {
        setOriginalImage(null);
        setOriginalImageUrl(null);
        setCompressedImage(null);
        setCompressedImageUrl(null);
        setTargetSizeKB(100);
        setIsCompressing(false);
    };

    return {
        originalImage,
        originalImageUrl,
        compressedImage,
        compressedImageUrl,
        isCompressing,
        targetSizeKB,
        initializeImage,
        setTargetSizeKB,
        handleTargetSizeChange,
        reset,
    };
};