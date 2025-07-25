"use client";
import React, { useEffect, useState,useRef } from "react";
import SwiperSlides from "../components/SwiperSlides";
import Typed from "typed.js";
import { useGlobalContext } from "../context/Store";
import { createDownloadLink } from "../modules/calculatefunctions";
export default function Home() {
  const { state, slideState } = useGlobalContext();
  const el = useRef(null);
  const [width, setWidth] = useState(100);
  const childRef = useRef(null);
  const removeChild = () => {
    const parentNode = childRef.current?.parentNode;

    if (parentNode && childRef.current) {
        try {
            parentNode.removeChild(childRef.current);
            console.log("Child node removed.");
        } catch (error) {
            console.error("Error removing child node:", error);
        }
    } else {
        console.error("Child node is not a child of the parent node.");
    }
};
  useEffect(() => {
    document.title = "WBTPTA AMTA WEST:Homepage";
    const typed = new Typed(el.current, {
      strings: ["Welcome To WBTPTA Amta West Circle's New Website."],
      typeSpeed: 50,
      loop: true,
      loopCount: Infinity,
      showCursor: true,
      cursorChar: "|",
      autoInsertCss: true,
    });

    setWidth(window.screen.width);

    return () => {
      // Destroy Typed instance during cleanup to stop animation
      typed.destroy();
    };
  }, []);
  return (
    <div className="container my-3">
      <div id="parent">
      <div ref={childRef} id="child" className="my-3" style={{ height: "70px" }}>
        {width < 780 ? (
          <span
            className="text-primary text-center fs-6 mb-3 web-message"
            ref={el}
          />
        ) : (
          <span
            className="text-primary text-center fs-3 mb-3 web-message"
            ref={el}
          />
        )}
      </div>

      <SwiperSlides />
      {state === "admin" && slideState.length > 0 && (
        <button
          type="button"
          className="btn btn-sm m-5 btn-warning"
          onClick={() => {
            createDownloadLink(slideState, "slides");
          }}
        >
          Download Slide Data
        </button>
      )}
      <button style={{display:"none"}} onClick={removeChild}>Remove Child</button>
      </div>
    </div>
  );
}
