interface ImagePreviewProps {
  src: string;
  alt: string;
  onRemove?: () => void;
  className?: string;
}

export default function ImagePreview({ src, alt, onRemove, className = '' }: ImagePreviewProps) {
  return (
    <div className={`relative group ${className}`}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover rounded-lg"
      />
      {onRemove && (
        <button
          onClick={onRemove}
          className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
          type="button"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
