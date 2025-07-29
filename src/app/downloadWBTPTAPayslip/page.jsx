import React, { Suspense } from "react";
import DownloadWBTPTAPayslip from "./DownloadWBTPTAPayslip";
export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DownloadWBTPTAPayslip />
    </Suspense>
  );
}
