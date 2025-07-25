"use client";
import React, { useRef, useCallback, useState } from "react";
import ReactCrop, {
  type Crop,
  type PixelCrop,
  makeAspectCrop,
} from "react-image-crop";

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

  const onImageLoad = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      const { width, height } = e.currentTarget;
      const newCrop = makeAspectCrop(
        { unit: "%", width: 50 },
        1,
        width,
        height
      );
      setCrop(newCrop);
    },
    []
  );

  const generateCroppedImage = () => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return;
    }

    const canvas = previewCanvasRef.current;
    const image = imgRef.current;
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    const pixelRatio = window.devicePixelRatio;
    canvas.width = completedCrop.width * pixelRatio;
    canvas.height = completedCrop.height * pixelRatio;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      image,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0,
      0,
      canvas.width,
      canvas.height
    );

    canvas.toBlob((blob) => {
      if (blob) {
        onCropComplete(blob);
      }
    }, "image/jpeg");
  };

  return (
    <div className="container">
      {src && (
        <div className="d-flex flex-column align-items-center">
          <div
            className="border rounded p-2 mb-4 bg-light"
            style={{ overflow: "auto" }}
          >
            <ReactCrop
              crop={crop}
              onChange={(c) => setCrop(c)}
              onComplete={(c) => setCompletedCrop(c)}
              aspect={1}
            >
              <img
                ref={imgRef}
                src={src}
                className="img-fluid"
                alt="Uploaded"
                onLoad={onImageLoad}
              />
            </ReactCrop>
          </div>

          <div className="d-flex gap-2 mb-4">
            <button
              type="button"
              onClick={generateCroppedImage}
              className="btn btn-primary btn-sm"
              disabled={!completedCrop}
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
      {/* Hidden canvas for image processing */}
      <canvas ref={previewCanvasRef} className="d-none" />
    </div>
  );
};

export default ImageCropper;
