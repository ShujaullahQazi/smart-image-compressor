import React from 'react';

const ImageEditor = ({
    originalImage,
    originalImageUrl,
    compressedImage,
    compressedImageUrl,
    isCompressing,
    onReset
}) => {
    return (
        <div className="flex-1 flex flex-col overflow-hidden relative">
            {/* Top Bar */}
            <div className="flex items-center justify-between p-4 bg-gray-800 border-b border-gray-700">
                <button onClick={onReset} className="w-10 h-10 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center text-white">
                    ✕
                </button>
                <h1 className="text-white font-semibold">{originalImage?.name}</h1>
                <div className="w-10"></div>
            </div>

            {/* Comparison View */}
            <div className="flex-1 flex overflow-hidden">
                {/* Original */}
                <div className="flex-1 bg-gray-800 flex flex-col items-center justify-center p-4">
                    <span className="text-gray-400 mb-2">Original</span>
                    <div className="relative">
                        <img src={originalImageUrl} alt="Original" className="max-h-[calc(100vh-200px)] rounded-lg shadow-xl" />
                        <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
                            {(originalImage?.size / 1024).toFixed(2)} KB
                        </div>
                    </div>
                </div>

                <div className="w-px bg-gray-700"></div>

                {/* Compressed */}
                <div className="flex-1 bg-gray-800 flex flex-col items-center justify-center p-4">
                    <span className="text-gray-400 mb-2">Compressed</span>
                    {compressedImageUrl ? (
                        <div className="relative">
                            <img src={compressedImageUrl} alt="Compressed" className="max-h-[calc(100vh-200px)] rounded-lg shadow-xl" />
                            <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
                                {(compressedImage?.size / 1024).toFixed(2)} KB
                            </div>
                            {isCompressing && (
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white">
                                    Compressing...
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="text-gray-500">Processing...</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ImageEditor;