import React, { useState, useRef, useEffect } from 'react';
import imageCompression from 'browser-image-compression';

const ImageCompressor = () => {
  const [originalImage, setOriginalImage] = useState(null);
  const [originalImageUrl, setOriginalImageUrl] = useState(null);
  const [compressedImage, setCompressedImage] = useState(null);
  const [compressedImageUrl, setCompressedImageUrl] = useState(null);
  const [quality, setQuality] = useState(80);
  const [isCompressing, setIsCompressing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isEditorMode, setIsEditorMode] = useState(false);
  const fileInputRef = useRef(null);
  const qualityInputRef = useRef(null);
  const compressionTimeoutRef = useRef(null);

  // Handle file selection
  const handleFileSelect = (file) => {
    if (file && file.type.startsWith('image/')) {
      setOriginalImage(file);
      setOriginalImageUrl(URL.createObjectURL(file));
      setCompressedImage(null);
      setCompressedImageUrl(null);
      setIsEditorMode(true);
      // Trigger initial compression
      setTimeout(() => compressImage(file, quality), 100);
    }
  };

  // Handle file input change
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    handleFileSelect(file);
  };

  // Handle paste
  useEffect(() => {
    const handlePaste = async (e) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          e.preventDefault();
          const blob = items[i].getAsFile();
          const file = new File([blob], 'pasted-image.png', { type: blob.type });
          handleFileSelect(file);
          break;
        }
      }
    };

    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, []);

  // Drag and drop handlers
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
    handleFileSelect(file);
  };

  // Compression logic with quality (0-100)
  const compressImage = async (imageFile, qualityValue) => {
    if (!imageFile) return;

    setIsCompressing(true);

    // Map quality (0-100) to initialQuality (0.1-1.0) for more aggressive compression
    // Quality 0 = 0.1 (very compressed), Quality 100 = 1.0 (max quality)
    const initialQuality = 0.1 + (qualityValue / 100) * 0.9; // Maps 0-100 to 0.1-1.0
    
    // Calculate maxSizeMB based on quality - more aggressive compression
    const estimatedOriginalSizeMB = imageFile.size / (1024 * 1024);
    
    // Map quality to size ratio: 0 = 1% of original, 100 = 100% of original
    // More aggressive: allows much smaller files at low quality
    const sizeRatio = 0.01 + (qualityValue / 100) * 0.99;
    const maxSizeMB = estimatedOriginalSizeMB * sizeRatio;

    // Reduce max dimensions at lower quality for more compression
    const maxDimension = qualityValue < 30 
      ? 1280  // Smaller dimensions for aggressive compression
      : qualityValue < 60
      ? 1600
      : 1920; // Full size for higher quality

    const options = {
      maxSizeMB: Math.max(0.01, maxSizeMB), // Minimum 0.01 MB (10 KB) - very aggressive
      maxWidthOrHeight: maxDimension,
      useWebWorker: true,
      initialQuality: initialQuality,
    };

    try {
      const compressedFile = await imageCompression(imageFile, options);
      setCompressedImage(compressedFile);
      if (compressedImageUrl) URL.revokeObjectURL(compressedImageUrl);
      setCompressedImageUrl(URL.createObjectURL(compressedFile));
    } catch (error) {
      console.log('Error compressing:', error);
    }

    setIsCompressing(false);
  };

  // Handle quality change with debounce for real-time compression
  const handleQualityChange = (newQuality) => {
    const clampedQuality = Math.max(0, Math.min(100, newQuality));
    setQuality(clampedQuality);

    // Debounce compression to avoid too many calls
    if (compressionTimeoutRef.current) {
      clearTimeout(compressionTimeoutRef.current);
    }

    if (originalImage) {
      compressionTimeoutRef.current = setTimeout(() => {
        compressImage(originalImage, clampedQuality);
      }, 300);
    }
  };

  // Reset function
  const handleReset = () => {
    if (originalImageUrl) URL.revokeObjectURL(originalImageUrl);
    if (compressedImageUrl) URL.revokeObjectURL(compressedImageUrl);
    setOriginalImage(null);
    setOriginalImageUrl(null);
    setCompressedImage(null);
    setCompressedImageUrl(null);
    setIsEditorMode(false);
    setQuality(80);
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (compressionTimeoutRef.current) {
      clearTimeout(compressionTimeoutRef.current);
    }
  };

  const compressionRatio = compressedImage && originalImage 
    ? ((1 - compressedImage.size / originalImage.size) * 100).toFixed(1)
    : 0;

  // Upload Mode
  if (!isEditorMode) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center px-4">
        <div className="max-w-2xl w-full">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Image Compressor
            </h1>
            <p className="text-gray-600 text-lg">Upload or paste an image to get started</p>
          </div>

          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-16 text-center cursor-pointer transition-all bg-white shadow-lg ${
              isDragging
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            
            <div className="space-y-4">
              <div className="text-6xl mb-4">📸</div>
              <p className="text-xl text-gray-700 font-semibold">
                Click to upload or drag and drop
              </p>
              <p className="text-gray-500">
                Or press <kbd className="px-2 py-1 bg-gray-100 rounded text-sm">Ctrl+V</kbd> to paste from clipboard
              </p>
              <p className="text-sm text-gray-400 mt-4">
                PNG, JPG, WEBP up to 10MB
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Editor Mode
  return (
    <div className="h-screen bg-gray-900 flex flex-col overflow-hidden">
      {/* Top Bar with Close Button */}
      <div className="flex items-center justify-between p-4 bg-gray-800 border-b border-gray-700">
        <button
          onClick={handleReset}
          className="w-10 h-10 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center transition-colors"
          title="Close editor"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="text-center">
          <h1 className="text-lg font-semibold text-white">Image Compressor</h1>
          {originalImage && (
            <p className="text-xs text-gray-400 mt-0.5">{originalImage.name}</p>
          )}
        </div>
        <div className="w-10"></div> {/* Spacer for centering */}
      </div>

      {/* Main Content - Before/After Comparison */}
      <div className="flex-1 flex overflow-hidden">
        {/* Before Image */}
        <div className="flex-1 bg-gray-800 flex items-center justify-center p-4 overflow-auto">
          <div className="text-center">
            <div className="mb-2 text-sm text-gray-400 font-medium">Original</div>
            {originalImageUrl && (
              <div className="relative">
                <img
                  src={originalImageUrl}
                  alt="Original"
                  className="max-w-full max-h-[calc(100vh-200px)] rounded-lg shadow-2xl"
                  style={{ imageRendering: 'auto' }}
                />
                <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white px-3 py-1 rounded text-sm font-medium">
                  {(originalImage.size / 1024).toFixed(2)} KB
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="w-px bg-gray-700"></div>

        {/* After Image */}
        <div className="flex-1 bg-gray-800 flex items-center justify-center p-4 overflow-auto">
          <div className="text-center">
            <div className="mb-2 text-sm text-gray-400 font-medium">Compressed</div>
            {compressedImageUrl ? (
              <div className="relative">
                <img
                  src={compressedImageUrl}
                  alt="Compressed"
                  className="max-w-full max-h-[calc(100vh-200px)] rounded-lg shadow-2xl"
                  style={{ imageRendering: 'auto' }}
                />
                <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white px-3 py-1 rounded text-sm font-medium">
                  {(compressedImage.size / 1024).toFixed(2)} KB
                </div>
                {isCompressing && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                    <div className="text-white">
                      <svg className="animate-spin h-8 w-8 mx-auto mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <p className="text-sm">Compressing...</p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-gray-500">Loading...</div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Control Panel */}
      <div className="bg-gray-800 border-t border-gray-700 p-4">
        <div className="max-w-4xl mx-auto flex items-center gap-6">
          {/* Quality Slider */}
          <div className="flex-1">
            <div className="flex items-center gap-4">
              <label className="text-sm text-gray-300 font-medium whitespace-nowrap">Quality:</label>
              <input
                type="range"
                min="0"
                max="100"
                value={quality}
                onChange={(e) => handleQualityChange(Number(e.target.value))}
                className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <input
                ref={qualityInputRef}
                type="number"
                min="0"
                max="100"
                value={quality}
                onChange={(e) => handleQualityChange(Number(e.target.value))}
                onClick={(e) => e.target.select()}
                className="w-20 px-3 py-1 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none text-center font-medium [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>
          </div>

          {/* Stats and Download */}
          <div className="flex items-center gap-4">
            {compressedImage && originalImage && (
              <>
                <div className="text-right">
                  <div className="text-xs text-gray-400">Size</div>
                  <div className="text-lg font-bold text-white">
                    {(compressedImage.size / 1024).toFixed(2)} KB
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-400">Reduction</div>
                  <div className="text-lg font-bold text-green-400">
                    {compressionRatio}%
                  </div>
                </div>
              </>
            )}
            {compressedImageUrl && (
              <a
                href={compressedImageUrl}
                download={`compressed-${originalImage.name}`}
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageCompressor;
