"use client";
import React, { useEffect, useState } from "react";

export default function CustomInput({
  type,
  onChange,
  value,
  placeholder,
  name,
  title,
}) {
  const [showPassword, setShowPassword] = useState(type);
  const [color, setColor] = useState("warning");
  useEffect(() => {
    //eslint-disable-next-line
  }, [type]);
  return (
    <div className="my-2">
      <label htmlFor={name || "myInput"} className="form-label">
        {title}
      </label>
      <div className="input-group mb-3">
        <input
          type={showPassword}
          value={value || ""}
          placeholder={placeholder || ""}
          name={name || "myInput"}
          className="form-control"
          aria-label="Amount (to the nearest dollar)"
          onChange={onChange}
        />
        {type === "password" && (
          <span className="input-group-text">
            <p
              style={{ cursor: "pointer" }}
              className={`text-${color} fs-5 m-0 p-0`}
              onClick={() => {
                if (showPassword === "password") {
                  setShowPassword("text");
                  setColor("danger");
                } else {
                  setShowPassword("password");
                  setColor("warning");
                }
              }}
            >
              {showPassword === "password" ? (
                <i className="bi bi-eye-fill"></i>
              ) : (
                <i className="bi bi-eye-slash-fill"></i>
              )}
            </p>
          </span>
        )}
      </div>
    </div>
  );
}
