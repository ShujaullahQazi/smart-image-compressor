// src/utils/formatters.js

/**
 * Formats bytes into a readable string (KB or MB).
 * * @param {number} bytes - The size in bytes
 * @param {number} decimals - Number of decimal places (default 2)
 * @returns {string} - Formatted string (e.g., "1.50 MB")
 */
export const formatFileSize = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};