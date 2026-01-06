import { useImageCompression } from './hooks/useImageCompression';
import DropZone from './components/DropZone';
import ImageEditor from './components/ImageEditor';
import Controls from './components/Controls';
import ErrorNotification from './components/ErrorNotification';
import { useState } from 'react';

const App = () => {
  const {
    originalImage,
    originalImageUrl,
    compressedImage,
    compressedImageUrl,
    isCompressing,
    targetSizeKB,
    error: compressionError,
    initializeImage,
    handleTargetSizeChange,
    reset,
    clearError: clearCompressionError
  } = useImageCompression();

  const [dropZoneError, setDropZoneError] = useState(null);

  // Unified error handler
  const currentError = compressionError || dropZoneError;
  const clearCurrentError = () => {
    clearCompressionError();
    setDropZoneError(null);
  };

  const handleFileSelect = (file) => {
    setDropZoneError(null); // Clear any previous errors
    initializeImage(file);
  };

  const handleError = (errorMessage) => {
    setDropZoneError(errorMessage);
  };

  if (!originalImage) {
    return (
      <>
        <DropZone
          onFileSelect={handleFileSelect}
          onError={handleError}
        />
        <ErrorNotification
          error={currentError}
          onClose={clearCurrentError}
        />
      </>
    );
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
        onError={handleError}
      />
      <Controls
        targetSizeKB={targetSizeKB}
        onTargetSizeChange={handleTargetSizeChange}
        compressedImage={compressedImage}
        compressedImageUrl={compressedImageUrl}
        originalSize={originalImage.size}
        originalFileName={originalImage.name}
      />
      <ErrorNotification
        error={currentError}
        onClose={clearCurrentError}
      />
    </div>
  );
};

export default App;