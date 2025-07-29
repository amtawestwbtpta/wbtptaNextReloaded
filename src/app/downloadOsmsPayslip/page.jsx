"use client";
import React, { Suspense } from "react";
import DownloadOsmsPayslip from "./DownloadOsmsPayslip";
export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DownloadOsmsPayslip />
    </Suspense>
  );
}
