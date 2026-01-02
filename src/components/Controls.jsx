import React from 'react';

const Controls = ({ quality, onQualityChange, compressedImage, compressedImageUrl, originalSize }) => {
    const compressionRatio = compressedImage
        ? ((1 - compressedImage.size / originalSize) * 100).toFixed(1)
        : 0;

    return (
        <div className="bg-gray-800 border-t border-gray-700 p-4">
            <div className="max-w-4xl mx-auto flex items-center gap-6">
                <div className="flex-1 flex items-center gap-4">
                    <label className="text-gray-300">Quality:</label>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={quality}
                        onChange={(e) => onQualityChange(Number(e.target.value))}
                        className="flex-1 h-2 bg-gray-700 rounded-lg accent-blue-600 cursor-pointer"
                    />
                    <span className="text-white w-12 text-center">{quality}%</span>
                </div>

                {compressedImage && (
                    <div className="flex items-center gap-4">
                        <div className="text-right">
                            <div className="text-xs text-gray-400">Saved</div>
                            <div className="text-green-400 font-bold">{compressionRatio}%</div>
                        </div>
                        <a
                            href={compressedImageUrl}
                            download="compressed-image.jpg"
                            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                        >
                            Download
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Controls;