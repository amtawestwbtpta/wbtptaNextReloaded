"use client";
import React, { Suspense } from "react";
import Form16NewPage from "./Form16NewPage";
export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Form16NewPage />
    </Suspense>
  );
}
