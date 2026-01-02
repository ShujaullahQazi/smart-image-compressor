import React, { useEffect } from 'react';
import { useImageCompression } from './hooks/useImageCompression';
import DropZone from './components/DropZone';
import ImageEditor from './components/ImageEditor';
import Controls from './components/Controls';

const App = () => {
  const {
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
    reset
  } = useImageCompression();

  // Initial compression when a file is selected
  const handleFileSelect = (file) => {
    setOriginalImage(file);
    setOriginalImageUrl(URL.createObjectURL(file));
    compress(file, quality);
  };

  if (!originalImage) {
    return <DropZone onFileSelect={handleFileSelect} />;
  }

  return (
    <div className="h-screen bg-gray-900 flex flex-col overflow-hidden">

      <ImageEditor
        originalImage={originalImage}
        originalImageUrl={originalImageUrl}
        compressedImage={compressedImage}
        compressedImageUrl={compressedImageUrl}
        isCompressing={isCompressing}
        onReset={reset}
      />
      <Controls
        quality={quality}
        onQualityChange={handleQualityChange}
        compressedImage={compressedImage}
        compressedImageUrl={compressedImageUrl}
        originalSize={originalImage.size}
      />
    </div>
  );
};

export default App;