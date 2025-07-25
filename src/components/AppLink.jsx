"use client";
import React, { useEffect, useState } from "react";

export default function AppLink() {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        setVisible(false);
      }, 10000); // 10000 ms = 10 seconds

      // Cleanup the timeout if the component unmounts or visibility changes
      return () => clearTimeout(timer);
    }
  }, [visible]);
  return (
    visible && (
      <div
        className="alert alert-success alert-dismissible fade show noprint"
        role="alert"
      >
        <strong>To download Our Android App Click</strong>{" "}
        <a
          className="d-inline-block text-decoration-none fw-bold"
          href="https://drive.google.com/drive/folders/1QQzBMJjI_MXTKxP3_ayTo7QflGD0vbVP?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
        >
          Here
        </a>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
          onClick={() => {
            setVisible(false);
            clearTimeout();
          }}
        ></button>
      </div>
    )
  );
}
