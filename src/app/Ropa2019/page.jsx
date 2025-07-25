"use client";
import React from "react";
import { ropa2019 } from "../../modules/ropa";
import { useRouter } from "next/navigation";

const Ropa2019 = () => {
  const router = useRouter();
  return (
    <div className="container my-3">
      <h3 className="text-black">ROPA 2019 FOR PRIMARY SCHOOL</h3>
      <table className="table table-hover table-sm table-bordered border-black border-1 align-middle table-responsive text-center rounded w-75 mx-auto">
        <thead>
          <tr>
            <th className="text-center" style={{ border: "1px solid" }}>
              Cell No.
            </th>
            <th className="text-center" style={{ border: "1px solid" }}>
              Level-7
              <br />
              (Non Trained)
            </th>
            <th className="text-center" style={{ border: "1px solid" }}>
              Level-9
              <br />
              (Trained)
            </th>
            <th className="text-center" style={{ border: "1px solid" }}>
              Level-10
              <br />
              (20 Years)
            </th>
          </tr>
        </thead>
        <tbody>
          {ropa2019[0].map((cell, index) => {
            return (
              <tr key={index} className="teacher-tr">
                <td
                  className="text-center"
                  style={{ border: "1px solid", width: "10%" }}
                >
                  {index + 1}
                </td>
                <td
                  className="text-center"
                  style={{ border: "1px solid", width: "30%" }}
                >
                  {ropa2019[0][index]}
                </td>
                <td
                  className="text-center"
                  style={{ border: "1px solid", width: "30%" }}
                >
                  {ropa2019[1][index]}
                </td>
                <td
                  className="text-center"
                  style={{ border: "1px solid", width: "30%" }}
                >
                  {ropa2019[2][index]}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="my-2">
        <div className="mx-auto my-3 noprint">
          <button
            type="button"
            className="btn btn-primary text-white p-2 rounded"
            onClick={() => {
              if (typeof window !== undefined) {
                window.print();
              }
            }}
          >
            Print Page
          </button>
        </div>
        <div className="mx-auto my-3 noprint">
          <button
            type="button"
            className="btn btn-warning  p-2 rounded"
            onClick={() => router.back()}
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default Ropa2019;
