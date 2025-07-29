"use client";
import React, { useRef, useCallback, useState, useEffect } from "react";
import ReactCrop, {
  type Crop,
  type PixelCrop,
  makeAspectCrop,
  centerCrop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
interface ImageCropperProps {
  src: string | null;
  onCropComplete: (blob: Blob) => void;
  onCancel: () => void;
}

const ImageCropper: React.FC<ImageCropperProps> = ({
  src,
  onCropComplete,
  onCancel,
}) => {
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    setIsMobile(
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    );
  }, []);

  const onImageLoad = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      const { naturalWidth: width, naturalHeight: height } = e.currentTarget;

      // Reset crop state to ensure proper updates
      setCrop(undefined);
      setCompletedCrop(null);

      // Use centerCrop to ensure the crop area is visible and centered
      const newCrop = centerCrop(
        makeAspectCrop(
          {
            unit: "%",
            width: isMobile ? 80 : 50, // Larger initial crop on mobile
          },
          1,
          width,
          height
        ),
        width,
        height
      );

      setCrop(newCrop);
      setImageLoaded(true);
    },
    [isMobile]
  );

  const generateCroppedImage = () => {
    if (
      !completedCrop ||
      !previewCanvasRef.current ||
      !imgRef.current ||
      !imageLoaded
    ) {
      return;
    }

    const canvas = previewCanvasRef.current;
    const image = imgRef.current;

    // Get the actual displayed dimensions of the image
    const displayedWidth = image.width;
    const displayedHeight = image.height;

    // Calculate scaling factors
    const scaleX = image.naturalWidth / displayedWidth;
    const scaleY = image.naturalHeight / displayedHeight;

    // Calculate crop coordinates in natural image dimensions
    const cropX = completedCrop.x * scaleX;
    const cropY = completedCrop.y * scaleY;
    const cropWidth = completedCrop.width * scaleX;
    const cropHeight = completedCrop.height * scaleY;

    // Set canvas dimensions to match the cropped area
    canvas.width = cropWidth;
    canvas.height = cropHeight;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Draw the cropped portion
    ctx.drawImage(
      image,
      cropX,
      cropY,
      cropWidth,
      cropHeight,
      0,
      0,
      cropWidth,
      cropHeight
    );

    canvas.toBlob(
      (blob) => {
        if (blob) {
          onCropComplete(blob);
        }
      },
      "image/jpeg",
      0.95
    );
  };

  return (
    <div className="container">
      {src && (
        <div className="d-flex flex-column align-items-center">
          <div
            className="border rounded p-2 mb-4 bg-light"
            style={{
              maxHeight: "400px",
              overflow: "auto",
              touchAction: "none",
            }}
          >
            <ReactCrop
              crop={crop}
              onChange={(c) => setCrop(c)}
              onComplete={(c) => setCompletedCrop(c)}
              aspect={1}
              ruleOfThirds
              className="react-crop"
              style={{
                touchAction: "none",
              }}
            >
              <img
                ref={imgRef}
                src={src}
                className="img-fluid"
                alt="Uploaded"
                onLoad={onImageLoad}
                style={{
                  maxHeight: "400px",
                  display: "block",
                  touchAction: "none",
                }}
              />
            </ReactCrop>
          </div>

          <div className="d-flex gap-2 mb-4">
            <button
              type="button"
              onClick={generateCroppedImage}
              className="btn btn-primary btn-sm"
              disabled={!completedCrop || !imageLoaded}
            >
              <i className="bi bi-crop me-2"></i>Crop
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="btn btn-outline-secondary btn-sm"
            >
              <i className="bi bi-x-circle me-2"></i>Cancel
            </button>
          </div>
        </div>
      )}
      <canvas ref={previewCanvasRef} className="d-none" />
    </div>
  );
};

export default ImageCropper;
