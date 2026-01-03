
const Controls = ({
    targetSizeKB,
    onTargetSizeChange,
    compressedImage,
    compressedImageUrl,
    originalSize
}) => {
    // Convert original size to KB for display and slider limits
    const originalSizeKB = Math.round(originalSize / 1024);

    // Calculate current compression ratio
    const compressionRatio = compressedImage
        ? ((1 - compressedImage.size / originalSize) * 100).toFixed(1)
        : 0;

    const presets = [20, 50, 100]; // KB presets

    return (
        <div className="bg-gray-800 border-t border-gray-700 p-4">
            <div className="max-w-4xl mx-auto flex flex-col gap-6">

                {/* 1. Target Size Slider */}
                <div className="flex items-center gap-4">
                    <label className="text-gray-300 min-w-[100px]">Target Size:</label>
                    <input
                        type="range"
                        min="10" // Minimum 10KB
                        max={originalSizeKB} // Max is original file size
                        value={targetSizeKB}
                        onChange={(e) => onTargetSizeChange(Number(e.target.value))}
                        className="flex-1 h-2 bg-gray-700 rounded-lg accent-blue-600 cursor-pointer"
                    />
                    <span className="text-white w-20 text-right font-mono">
                        {Math.round(targetSizeKB)} KB
                    </span>
                </div>

                {/* 2. Quick Action Presets & Download */}
                <div className="flex justify-between items-end">

                    {/* Presets */}
                    <div className="flex gap-2">
                        {presets.map((size) => (
                            <button
                                key={size}
                                onClick={() => onTargetSizeChange(size)}
                                disabled={size >= originalSizeKB} // Disable if original is smaller
                                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${targetSizeKB === size
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed'
                                    }`}
                            >
                                {size} KB
                            </button>
                        ))}
                    </div>

                    {/* Download Section */}
                    {compressedImage && (
                        <div className="flex items-center gap-4">
                            <div className="text-right">
                                <div className="text-xs text-gray-400">Reduced by</div>
                                <div className="text-green-400 font-bold">{compressionRatio}%</div>
                            </div>
                            <a
                                href={compressedImageUrl}
                                download={`compressed-${Math.round(targetSizeKB)}KB.jpg`}
                                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                            >
                                Download
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Controls;