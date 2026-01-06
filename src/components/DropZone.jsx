import { useState, useRef, useEffect, useCallback } from 'react';

const DropZone = ({ onFileSelect, onError }) => {
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        validateAndSelect(file);
    };

    const validateAndSelect = useCallback((file) => {
        if (!file) {
            onError?.('No file selected. Please choose a valid image file.');
            return;
        }

        if (!file.type.startsWith('image/')) {
            onError?.('Invalid file type. Please select an image file (PNG, JPG, WEBP, etc.).');
            return;
        }

        if (file.size > 10 * 1024 * 1024) {
            onError?.('File too large. Maximum size is 10MB. Please choose a smaller image.');
            return;
        }

        if (file.size === 0) {
            onError?.('The selected file is empty. Please choose a valid image.');
            return;
        }

        onFileSelect(file);
    }, [onFileSelect, onError]);

    const handlePaste = useCallback((e) => {
        const items = e.clipboardData?.items;
        if (!items) return;
        for (let i = 0; i < items.length; i++) {
            if (items[i].type.indexOf('image') !== -1) {
                e.preventDefault();
                const blob = items[i].getAsFile();
                const file = new File([blob], 'pasted-image.png', { type: blob.type });
                validateAndSelect(file);
                break;
            }
        }
    }, [validateAndSelect]);

    useEffect(() => {
        window.addEventListener('paste', handlePaste);
        return () => window.removeEventListener('paste', handlePaste);
    }, [handlePaste]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center px-4">
            <div className="max-w-2xl w-full">
                <div className="text-center mb-8 pb-4">
                    <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Image Compressor
                    </h1>
                    <p className="text-gray-600 text-lg">Upload or paste an image to get started</p>
                </div>

                <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-2xl p-16 text-center cursor-pointer transition-all bg-white shadow-lg ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
                        }`}
                >
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={(e) => validateAndSelect(e.target.files[0])}
                        className="hidden"
                    />
                    <div className="space-y-4">
                        <div className="text-6xl mb-4">📸</div>
                        <p className="text-xl text-gray-700 font-semibold">Click to upload or drag and drop</p>
                        <p className="text-sm text-gray-400">PNG, JPG, WEBP up to 10MB</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DropZone;