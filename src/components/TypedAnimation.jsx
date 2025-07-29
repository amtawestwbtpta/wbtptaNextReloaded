import { useEffect, useRef } from "react";

const TypedAnimation = ({ title }) => {
  const typedInstance = useRef(null);
  const el = useRef(null);

  useEffect(() => {
    const loadTyped = async () => {
      const { default: Typed } = await import("typed.js");
      if (el.current && !typedInstance.current) {
        typedInstance.current = new Typed(el.current, {
          strings: [title],
          typeSpeed: 30,
          loop: true,
          loopCount: Infinity,
          showCursor: true,
          cursorChar: "|",
          autoInsertCss: true,
          fadeOut: true,
        });
      }
    };

    loadTyped();

    return () => {
      if (typedInstance.current) {
        typedInstance.current.destroy();
        typedInstance.current = null;
      }
    };
  }, []);

  return (
    <div>
      <span
        className="text-primary text-center fs-3 mb-3 web-message"
        ref={el}
        suppressHydrationWarning
      />{" "}
      {/* Typed attaches here */}
    </div>
  );
};

export default TypedAnimation;
