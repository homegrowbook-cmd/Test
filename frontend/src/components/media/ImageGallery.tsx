import { useState } from 'react';
import ImageModal from './ImageModal';

interface ImageGalleryProps {
  images: string[];
  alt?: string;
}

export default function ImageGallery({ images, alt = 'Gallery image' }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  if (!images || images.length === 0) {
    return null;
  }

  const openModal = (index: number) => {
    setSelectedImage(index);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const goToNext = () => {
    if (selectedImage !== null && selectedImage < images.length - 1) {
      setSelectedImage(selectedImage + 1);
    }
  };

  const goToPrevious = () => {
    if (selectedImage !== null && selectedImage > 0) {
      setSelectedImage(selectedImage - 1);
    }
  };

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            className="aspect-square cursor-pointer overflow-hidden rounded-lg hover:opacity-90 transition-opacity"
            onClick={() => openModal(index)}
          >
            <img
              src={image}
              alt={`${alt} ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {selectedImage !== null && (
        <ImageModal
          image={images[selectedImage]}
          alt={`${alt} ${selectedImage + 1}`}
          onClose={closeModal}
          onNext={selectedImage < images.length - 1 ? goToNext : undefined}
          onPrevious={selectedImage > 0 ? goToPrevious : undefined}
        />
      )}
    </>
  );
}
