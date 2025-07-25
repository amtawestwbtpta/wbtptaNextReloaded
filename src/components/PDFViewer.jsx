"use client";
import React, { useState, useRef, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import Loader from "./Loader";

// Ensure we only run this on the client-side
if (typeof window !== "undefined") {
  pdfjs.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@5.3.31/build/pdf.worker.min.mjs`;
}

const PDFViewer = ({ pdfUrl }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [containerWidth, setContainerWidth] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const containerRef = useRef(null);

  // Handle container resize
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
      }
    };

    updateWidth();
    const resizeObserver = new ResizeObserver(updateWidth);

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setLoading(false);
  };

  const onDocumentLoadError = (error) => {
    setError(error.message || "Failed to load PDF");
    setLoading(false);
  };

  const changePage = (offset) => {
    setPageNumber((prevPage) =>
      Math.max(1, Math.min(numPages, prevPage + offset))
    );
  };

  return (
    <div className="pdf-viewer-container">
      {/* Download button */}
      <div className="pdf-download-container">
        <a
          href={pdfUrl}
          download
          className="pdf-download-button"
          aria-label="Download PDF"
          target="_blank"
          rel="noopener noreferrer"
        >
          Download PDF
        </a>
      </div>

      {/* PDF display */}
      <div ref={containerRef} className="pdf-display-container">
        {loading && <Loader />}
        {error && <div className="pdf-error">Error: {error}</div>}

        {!error && (
          <>
            <Document
              file={pdfUrl}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={onDocumentLoadError}
              loading={<Loader />}
            >
              <Page
                pageNumber={pageNumber}
                width={containerWidth}
                renderAnnotationLayer={false}
                renderTextLayer={false}
              />
            </Document>

            {/* Navigation controls */}
            <div className="pdf-navigation">
              <button
                onClick={() => changePage(-1)}
                disabled={pageNumber <= 1}
                aria-label="Previous page"
              >
                ‹
              </button>

              <span>
                Page {pageNumber} of {numPages || "--"}
              </span>

              <button
                onClick={() => changePage(1)}
                disabled={pageNumber >= (numPages || 0)}
                aria-label="Next page"
              >
                ›
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PDFViewer;
