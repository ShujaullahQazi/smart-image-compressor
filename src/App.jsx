import React from 'react';
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
    targetSizeKB,
    initializeImage,
    setTargetSizeKB,
    handleTargetSizeChange,
    reset
  } = useImageCompression();

  const handleFileSelect = (file) => initializeImage(file);

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
        targetSizeKB={targetSizeKB}
        onTargetSizeChange={handleTargetSizeChange}
        compressedImage={compressedImage}
        compressedImageUrl={compressedImageUrl}
        originalSize={originalImage.size}
      />
    </div>
  );
};

export default App;