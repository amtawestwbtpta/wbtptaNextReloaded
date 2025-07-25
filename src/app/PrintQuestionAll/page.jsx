"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useGlobalContext } from "../../context/Store";
import { useRouter } from "next/navigation";
import { NumInWords, round2dec } from "../../modules/calculatefunctions";
const PrintQuestionAll = () => {
  const { state, stateObject, questionRateState } = useGlobalContext();
  const router = useRouter();

  const [allData, setAllData] = useState([]);
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
  let pp_rate = qRate.pp_rate;
  let i_rate = qRate.i_rate;
  let ii_rate = qRate.ii_rate;
  let iii_rate = qRate.iii_rate;
  let iv_rate = qRate.iv_rate;
  let v_rate = qRate.v_rate;
  let term = qRate.term;
  let year = qRate.year;

  useEffect(() => {
    setAllData(stateObject);
    setQRate(questionRateState);
    document.title = "WBTPTA AMTA WEST:Print All Question Invoice";
    if (!state) {
      router.push("/login");
    }
  }, []);
  return (
    <Suspense>
      <div>
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

        {allData.length > 0 &&
          allData.map((el, ind) => {
            let cl_pp_rate = round2dec(el.cl_pp_student * 3 * pp_rate);
            let cl_1_rate = round2dec(el.cl_1_student * 3 * i_rate);
            let cl_2_rate = round2dec(el.cl_2_student * 3 * ii_rate);
            let cl_3_rate = round2dec(el.cl_3_student * 4 * iii_rate);
            let cl_4_rate = round2dec(el.cl_4_student * 4 * iv_rate);
            let cl_5_rate = round2dec(el.cl_5_student * 4 * v_rate);
            let total_rate = Math.round(
              el.cl_pp_student * 3 * pp_rate +
                el.cl_1_student * 3 * i_rate +
                el.cl_2_student * 3 * ii_rate +
                el.cl_3_student * 4 * iii_rate +
                el.cl_4_student * 4 * iv_rate +
                el.cl_5_student * 4 * v_rate
            );

            return (
              <div className="container timesAll text-black my-5">
                <div className="d-flex row justify-content-center align-items-center">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?data=Amta West Circle, School: ${
                      el.school
                    }, PP Students ${parseInt(
                      el.cl_pp_student
                    )}, Amount Rs. ${cl_pp_rate}, Class I Students ${parseInt(
                      el.cl_1_student
                    )}, Amount Rs. ${cl_1_rate}, Class II Students ${parseInt(
                      el.cl_2_student
                    )}, Amount Rs. ${cl_2_rate}, Class III Students ${parseInt(
                      el.cl_3_student
                    )}, Amount Rs. ${cl_3_rate}, Class IV Students ${parseInt(
                      el.cl_4_student
                    )}, Amount Rs. ${cl_4_rate}, Class V Students ${parseInt(
                      el.cl_5_student
                    )}, Amount Rs. ${cl_5_rate}, Total Amount ${total_rate}.`}
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
                    INVOICE FOR {term.toUpperCase()} SUMMATIVE EXAMINATION
                    QUESTION PAPERS , {year}
                  </h5>
                </div>
                <table className="container table table-bordered border-4 border-dark">
                  <thead>
                    <tr>
                      <th>SL</th>
                      <th>{ind + 1}</th>
                      <th>SCHOOL NAME</th>
                      <th>{el.school.toUpperCase()}</th>
                      <th>GP</th>
                      <th colSpan="2">{el.gp}</th>
                    </tr>
                    <tr>
                      <th colSpan="7">CLASSWISE NUMBER OF STUDENTS</th>
                    </tr>
                    <tr>
                      <th>Class PP</th>
                      <th>Class I</th>
                      <th>Class II</th>
                      <th>Class III</th>
                      <th>Class IV</th>
                      {parseInt(el.cl_5_student) !== 0 ? (
                        <th>Class V</th>
                      ) : null}
                      <th>Total Students</th>
                    </tr>
                    <tr>
                      <th>{parseInt(el.cl_pp_student)}</th>
                      <th>{parseInt(el.cl_1_student)}</th>
                      <th>{parseInt(el.cl_2_student)}</th>
                      <th>{parseInt(el.cl_3_student)}</th>
                      <th>{parseInt(el.cl_4_student)}</th>
                      {parseInt(el.cl_5_student) !== 0 ? (
                        <th>{parseInt(el.cl_5_student)}</th>
                      ) : null}
                      <th>{el.total_student}</th>
                    </tr>
                    <tr>
                      <th colSpan="7">CLASS WISE COST</th>
                    </tr>
                    <tr>
                      <th>
                        Class PP @ <i className="bi bi-currency-rupee"></i>
                        {pp_rate}
                      </th>
                      <th>
                        Class I @ <i className="bi bi-currency-rupee"></i>
                        {i_rate}
                      </th>
                      <th>
                        Class II @ <i className="bi bi-currency-rupee"></i>
                        {ii_rate}
                      </th>
                      <th>
                        Class III @ <i className="bi bi-currency-rupee"></i>
                        {iii_rate}
                      </th>
                      <th>
                        Class IV @ <i className="bi bi-currency-rupee"></i>
                        {iv_rate}
                      </th>

                      {parseInt(el.cl_5_student) !== 0 ? (
                        <th>
                          Class V @ <i className="bi bi-currency-rupee"></i>
                          {v_rate}
                        </th>
                      ) : null}
                      <th>Total Cost</th>
                    </tr>
                    <tr>
                      <th>
                        {parseInt(el.cl_pp_student)} X{" "}
                        <i className="bi bi-currency-rupee"></i>
                        {pp_rate} X 3 = <i className="bi bi-currency-rupee"></i>
                        {cl_pp_rate}
                      </th>
                      <th>
                        {parseInt(el.cl_1_student)} X{" "}
                        <i className="bi bi-currency-rupee"></i>
                        {i_rate} X 3 = <i className="bi bi-currency-rupee"></i>
                        {cl_1_rate}
                      </th>
                      <th>
                        {parseInt(el.cl_2_student)} X{" "}
                        <i className="bi bi-currency-rupee"></i>
                        {ii_rate} X 3 = <i className="bi bi-currency-rupee"></i>
                        {cl_2_rate}
                      </th>
                      <th>
                        {parseInt(el.cl_3_student)} X{" "}
                        <i className="bi bi-currency-rupee"></i>
                        {iii_rate} X 4 ={" "}
                        <i className="bi bi-currency-rupee"></i>
                        {cl_3_rate}
                      </th>
                      <th>
                        {parseInt(el.cl_4_student)} X{" "}
                        <i className="bi bi-currency-rupee"></i>
                        {iv_rate} X 4 = <i className="bi bi-currency-rupee"></i>
                        {cl_4_rate}
                      </th>

                      {parseInt(el.cl_5_student) !== 0 ? (
                        <th>
                          {parseInt(el.cl_5_student)} X{" "}
                          <i className="bi bi-currency-rupee"></i>
                          {v_rate} X 4 ={" "}
                          <i className="bi bi-currency-rupee"></i>
                          {cl_5_rate}
                        </th>
                      ) : null}
                      <th>
                        <i className="bi bi-currency-rupee"></i>
                        {total_rate}
                      </th>
                    </tr>
                    <tr>
                      <th colSpan="3">TOTAL IN WORDS</th>
                      <th colSpan="4">
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
              </div>
            );
          })}
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

export default PrintQuestionAll;
