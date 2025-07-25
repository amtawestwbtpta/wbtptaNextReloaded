"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useGlobalContext } from "../../context/Store";
import { useRouter } from "next/navigation";
import {
  NumInWords,
  round2dec,
  round5,
} from "../../modules/calculatefunctions";
const PrintQuestionInvoice = () => {
  const router = useRouter();
  const { state, stateObject, questionRateState } = useGlobalContext();
  const [allData, setAllData] = useState({});
  const [qRate, setQRate] = useState({
    pp_rate: "",
    i_rate: "",
    ii_rate: "",
    iii_rate: "",
    iv_rate: "",
    v_rate: "",
    term: "",
    year: "",
  });
  let sl = allData.sl;
  let school = allData.school;
  let gp = allData.gp;
  let cl_pp_student = allData.cl_pp_student;
  let cl_1_student = allData.cl_1_student;
  let cl_2_student = allData.cl_2_student;
  let cl_3_student = allData.cl_3_student;
  let cl_4_student = allData.cl_4_student;
  let cl_5_student = parseInt(allData.cl_5_student);
  let total_student = allData.total_student;
  let pp_rate = qRate.pp_rate;
  let i_rate = qRate.i_rate;
  let ii_rate = qRate.ii_rate;
  let iii_rate = qRate.iii_rate;
  let iv_rate = qRate.iv_rate;
  let v_rate = qRate.v_rate;
  let term = qRate.term;
  let year = qRate.year;
  let cl_pp_rate = round2dec(cl_pp_student * pp_rate);
  let cl_1_rate = round2dec(cl_1_student * i_rate);
  let cl_2_rate = round2dec(cl_2_student * ii_rate);
  let cl_3_rate = round2dec(cl_3_student * iii_rate);
  let cl_4_rate = round2dec(cl_4_student * iv_rate);
  let cl_5_rate = round2dec(cl_5_student * v_rate);
  let total_rate = round5(
    cl_pp_student * pp_rate +
      cl_1_student * i_rate +
      cl_2_student * ii_rate +
      cl_3_student * iii_rate +
      cl_4_student * iv_rate +
      cl_5_student * v_rate
  );
  useEffect(() => {
    document.title = `Question Invoice of ${school}`;
    setAllData(stateObject);
    setQRate(questionRateState);
  }, [stateObject, questionRateState]);
  return (
    <Suspense>
      <div className="container times text-black my-5">
        <div className="d-flex row justify-content-center align-items-center">
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?data=Amta West Circle, School: ${school}, GP: ${gp}, PP Students ${cl_pp_student}, Amount Rs. ${cl_pp_rate}, Class I Students ${cl_1_student}, Amount Rs. ${cl_1_rate}, Class II Students ${cl_2_student}, Amount Rs. ${cl_2_rate}, Class III Students ${cl_3_student}, Amount Rs. ${cl_3_rate}, Class IV Students ${cl_4_student}, Amount Rs. ${cl_4_rate}, Class V Students ${cl_5_student}, Amount Rs. ${cl_5_rate}, Total Student. ${total_student}, Total Amount ${total_rate}.`}
            className="m-0 p-0"
            style={{ width: "10%", height: "10%" }}
            alt="QRCode"
          />
        </div>
        <div className="h-text">
          <h5 className="m-1 text-center">INVOICE</h5>
          <h4 className="m-1 text-center">AMTA WEST CIRCLE</h4>
          <h6 className="m-1 text-center">
            Joypur Fakirdas, Joypur, Howrah, PIN-711401.
          </h6>
          <h5 className="m-1 text-center">
            INVOICE FOR {term.toUpperCase()} SUMMATIVE EXAMINATION QUESTION
            PAPERS , {year}
          </h5>
        </div>
        <table
          className="container table table-bordered  border-dark"
          style={{ border: ".5px solid" }}
        >
          <thead>
            <tr style={{ border: ".5px solid" }}>
              <th style={{ border: ".5px solid" }}>SL</th>
              <th style={{ border: ".5px solid" }}>{sl}</th>
              <th style={{ border: ".5px solid" }}>SCHOOL NAME</th>
              <th style={{ border: ".5px solid" }}>{school?.toUpperCase()}</th>
              <th style={{ border: ".5px solid" }}>GP</th>
              <th style={{ border: ".5px solid" }} colSpan="2">
                {gp}
              </th>
            </tr>
            <tr style={{ border: ".5px solid" }}>
              <th style={{ border: ".5px solid" }} colSpan="7">
                CLASSWISE NUMBER OF STUDENTS
              </th>
            </tr>
            <tr>
              <th style={{ border: ".5px solid" }}>Class PP</th>
              <th style={{ border: ".5px solid" }}>Class I</th>
              <th style={{ border: ".5px solid" }}>Class II</th>
              <th style={{ border: ".5px solid" }}>Class III</th>
              <th style={{ border: ".5px solid" }}>Class IV</th>
              {cl_5_student !== 0 ? (
                <th style={{ border: ".5px solid" }}>Class V</th>
              ) : null}
              <th style={{ border: ".5px solid" }}>Total Students</th>
            </tr>
            <tr>
              <th style={{ border: ".5px solid" }}>{cl_pp_student}</th>
              <th style={{ border: ".5px solid" }}>{cl_1_student}</th>
              <th style={{ border: ".5px solid" }}>{cl_2_student}</th>
              <th style={{ border: ".5px solid" }}>{cl_3_student}</th>
              <th style={{ border: ".5px solid" }}>{cl_4_student}</th>
              {cl_5_student !== 0 ? (
                <th style={{ border: ".5px solid" }}>{cl_5_student}</th>
              ) : null}
              <th style={{ border: ".5px solid" }}>{total_student}</th>
            </tr>
            <tr>
              <th style={{ border: ".5px solid" }} colSpan="7">
                CLASS WISE COST
              </th>
            </tr>
            <tr>
              <th style={{ border: ".5px solid" }}>
                Class PP @ <i className="bi bi-currency-rupee"></i>
                {pp_rate}
              </th>
              <th style={{ border: ".5px solid" }}>
                Class I @ <i className="bi bi-currency-rupee"></i>
                {i_rate}
              </th>
              <th style={{ border: ".5px solid" }}>
                Class II @ <i className="bi bi-currency-rupee"></i>
                {ii_rate}
              </th>
              <th style={{ border: ".5px solid" }}>
                Class III @ <i className="bi bi-currency-rupee"></i>
                {iii_rate}
              </th>
              <th style={{ border: ".5px solid" }}>
                Class IV @ <i className="bi bi-currency-rupee"></i>
                {iv_rate}
              </th>

              {cl_5_student !== 0 ? (
                <th style={{ border: ".5px solid" }}>
                  Class V @ <i className="bi bi-currency-rupee"></i>
                  {v_rate}
                </th>
              ) : null}
              <th style={{ border: ".5px solid" }}>Total Cost</th>
            </tr>
            <tr>
              <th style={{ border: ".5px solid" }}>
                {cl_pp_student} X <i className="bi bi-currency-rupee"></i>
                {pp_rate} = <i className="bi bi-currency-rupee"></i>
                {cl_pp_rate}
              </th>
              <th style={{ border: ".5px solid" }}>
                {cl_1_student} X <i className="bi bi-currency-rupee"></i>
                {i_rate} = <i className="bi bi-currency-rupee"></i>
                {cl_1_rate}
              </th>
              <th style={{ border: ".5px solid" }}>
                {cl_2_student} X <i className="bi bi-currency-rupee"></i>
                {ii_rate} = <i className="bi bi-currency-rupee"></i>
                {cl_2_rate}
              </th>
              <th style={{ border: ".5px solid" }}>
                {cl_3_student} X <i className="bi bi-currency-rupee"></i>
                {iii_rate} = <i className="bi bi-currency-rupee"></i>
                {cl_3_rate}
              </th>
              <th style={{ border: ".5px solid" }}>
                {cl_4_student} X <i className="bi bi-currency-rupee"></i>
                {iv_rate} = <i className="bi bi-currency-rupee"></i>
                {cl_4_rate}
              </th>

              {cl_5_student !== 0 ? (
                <th style={{ border: ".5px solid" }}>
                  {cl_5_student} X <i className="bi bi-currency-rupee"></i>
                  {v_rate} = <i className="bi bi-currency-rupee"></i>
                  {cl_5_rate}
                </th>
              ) : null}
              <th style={{ border: ".5px solid" }}>
                <i className="bi bi-currency-rupee"></i>
                {total_rate}
              </th>
            </tr>
            <tr>
              <th style={{ border: ".5px solid" }} colSpan="3">
                TOTAL IN WORDS
              </th>
              <th style={{ border: ".5px solid" }} colSpan="4">
                [Rupees {NumInWords(total_rate)} Only]
              </th>
            </tr>
          </thead>
        </table>
        <div className="col-md-4 mt-4" style={{ float: "right" }}>
          <h6 className="for mb-4">For Amta West Circle</h6>
          <br />
          <h6 className="mt-4">
            .......................................................
          </h6>
        </div>
        <div className="mx-auto my-5 noprint">
          <button
            type="button"
            className="btn btn-primary text-white font-weight-bold p-2 m-5 rounded"
            onClick={() => {
              if (typeof window !== "undefined") {
                window.print();
              }
            }}
          >
            Print Invoice
          </button>

          <button
            type="button"
            className="btn btn-info text-white font-weight-bold p-2 m-5 rounded"
            onClick={() => router.back()}
          >
            Go Back
          </button>
        </div>
      </div>
    </Suspense>
  );
};

export default PrintQuestionInvoice;
