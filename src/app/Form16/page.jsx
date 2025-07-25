"use client";
import React, { useEffect, useContext, Suspense } from "react";
import { useGlobalContext } from "../../context/Store";
import { useRouter } from "next/navigation";
import {
  NumInWords,
  randBetween,
  roundSo,
} from "../../modules/calculatefunctions";
import { DA, HRA, PREVDA } from "../../modules/constants";
const Form16Prev = () => {
  const { state, stateObject } = useGlobalContext();
  const router = useRouter();
  let details = stateObject;

  let tname,
    desig,
    school,
    disability,
    pan,
    basic,
    mbasic,
    addl,
    da,
    hra,
    mda,
    mhra,
    ma,
    gross,
    mgross,
    gpf,
    ptax,
    gsli,
    totalptax,
    mediclaim,
    nsc,
    ppf,
    lic,
    e,
    ph,
    b,
    fname,
    less;

  tname = details.tname;
  fname = details.fname;
  desig = details.desig;
  school = details.school;
  disability = details.disability;
  pan = details.pan;
  basic = parseInt(details.basic);
  mbasic = parseInt(details.mbasic);
  addl = parseInt(details.addl);
  ma = parseInt(details.ma);
  ph = parseInt(details.ph);
  !details.gpf ? (gpf = 0) : (gpf = parseInt(details.gpf));
  !details.gsli ? (gsli = 0) : (gsli = parseInt(details.gsli));
  !details.mediclaim
    ? (mediclaim = 0)
    : (mediclaim = parseInt(details.mediclaim));
  !details.nsc ? (nsc = 0) : (nsc = parseInt(details.nsc));
  !details.ppf ? (ppf = 0) : (ppf = parseInt(details.ppf));
  !details.lic ? (lic = 0) : (lic = parseInt(details.lic));

  let date = new Date();

  let rand = randBetween(1000, 3000);

  const year = date.getFullYear();

  da = Math.round(basic * DA);
  hra = Math.round(basic * HRA);

  gross = basic + da + hra + addl + ma;
  mda = Math.round(mbasic * PREVDA);
  mhra = Math.round(mbasic * HRA);

  mgross = mbasic + mda + mhra + addl + ma;
  let tgross = gross * 8 + mgross * 4;
  if (gross > 40000) {
    ptax = 200;
  } else if (gross > 25000) {
    ptax = 150;
  } else if (gross > 15000) {
    ptax = 130;
  } else if (gross > 10000) {
    ptax = 110;
  } else {
    ptax = 0;
  }

  if (disability === "YES") {
    ptax = 0;
  }

  totalptax = ptax * 12;

  if (gsli * 12 + lic + gpf * 12 + nsc + ppf < 150000) {
    e = gsli * 12 + lic + gpf * 12 + nsc + ppf;
  } else {
    e = 150000;
  }
  let a = roundSo(
    tgross - totalptax - 50000 + rand - (e + mediclaim + ph + rand),
    10
  );
  if (a > 1000000) {
    b = Math.round(12500 + 100000 + ((a - 1000000) * 30) / 100);
  } else if (a > 500000) {
    b = Math.round(12500 + ((a - 500000) * 20) / 100);
  } else if (a > 250000) {
    b = Math.round(((a - 250000) * 5) / 100);
  } else if (a < 250000) {
    b = "NIL";
  }
  if (b > 12500) {
    less = b;
  } else {
    less = 0;
  }
  let tax = less > 0 ? b + roundSo(b * 0.04, 10) : 0;

  useEffect(() => {
    if (!state) {
      router.push("/login");
    }
    document.title = `FORM 16 OF ${tname?.toUpperCase()} OF ${school?.toUpperCase()}`;
  }, []);
  return (
    <Suspense>
      <div
        className="text-black my-2 fw-bold"
        style={{ zoom: 0.8, fontWeight: "lighter" }}
      >
        <div className="p-1 mb-5 font-weight-bold text-center noprint">
          <input
            id="printbtn"
            type="button"
            className="btn btn-primary font-weight-bold  p-2 rounded"
            value="Print Statement"
            onClick={() => {
              if (typeof window !== "undefined") {
                window.print();
              }
            }}
          />
          <input
            id="printbtn"
            type="button"
            className="btn btn-primary font-weight-bold  p-2 rounded"
            value="Go Back"
            onClick={() => router.back()}
            style={{ float: "left" }}
          />
        </div>
        <h5
          className="my-0 text-center"
          style={{ marginTop: "20px !important" }}
        >
          ORIGINAL / DUPLICATE / TRIPLICATE
        </h5>

        <div className="text-center">
          <h3>FORM NO. 16 (PART - B)</h3>
        </div>
        <div className="statement">
          <div className="text-center">
            <h5>SEE RULE 31(1)</h5>
          </div>
          <div className="my-4">
            <h5 className="text-center font-weight-bold">
              "Certificate under section 203 of the Income-tax Act, 1961 <br />
              For tax deducted at source from income chargeable under the head
              “Salaries”
            </h5>
          </div>
          <div>
            <table style={{ width: "100%", border: "2px solid" }}>
              <tr>
                <th
                  colSpan="3"
                  className="p-1 text-center"
                  style={{
                    borderTop: "2px solid",
                    borderBottom: "2px solid",
                    borderRight: "2px solid",
                    width: "50%",
                  }}
                >
                  Name and Designation of the Employer
                </th>
                <th
                  colSpan="3"
                  className="p-1 text-center"
                  style={{ borderTop: "2px solid", borderBottom: "2px solid" }}
                >
                  Name and designation of the Employee
                </th>
              </tr>
              <tr>
                <th
                  colSpan="3"
                  style={{
                    borderBottom: "2px solid",
                    borderRight: "2px solid",
                  }}
                ></th>
                <th
                  colSpan="3"
                  className=" p-1 text-center"
                  style={{
                    borderLeft: "2px solid !important",
                    borderBottom: "2px solid",
                  }}
                >
                  {tname}
                </th>
              </tr>
              <tr style={{ borderBottom: "0px !important" }}>
                <th
                  colSpan="3"
                  className=" p-1 text-center"
                  style={{
                    borderBottom: "0px !important",
                    borderRight: "2px solid",
                  }}
                >
                  CHAIRMAN, DPSC, HOWRAH
                </th>
                <th
                  colSpan="3"
                  className=" p-1 text-center"
                  style={{
                    borderLeft: "2px solid !important",
                    borderBottom: "2px solid",
                  }}
                >
                  {desig}
                </th>
              </tr>
              <tr>
                <th
                  colSpan="3"
                  className=" p-1 text-center"
                  style={{
                    borderRight: "2px solid",
                  }}
                >
                  18, N.D. MUKHERJEE ROAD
                </th>
                <th
                  colSpan="3"
                  className=" p-1 text-center"
                  style={{
                    borderLeft: "2px solid !important",
                    borderBottom: "2px solid",
                  }}
                ></th>
              </tr>
              <tr>
                <th
                  colSpan="3"
                  className=" p-1 text-center"
                  style={{
                    borderRight: "2px solid",
                  }}
                >
                  HOWRAH- 1
                </th>
                <th
                  colSpan="3"
                  className=" p-1 text-center"
                  style={{
                    borderLeft: "2px solid !important",
                  }}
                ></th>
              </tr>
              <tr>
                <th colSpan="3"> </th>
                <th
                  colSpan="3"
                  style={{
                    borderLeft: "2px solid !important",
                    borderBottom: "2px solid",
                  }}
                >
                  {" "}
                </th>
              </tr>
              <tr>
                <th
                  className="text-center font-weight-bold"
                  style={{
                    borderTop: "2px solid",
                    borderBottom: "2px solid",
                    borderRight: "2px solid",
                  }}
                  colSpan="2"
                >
                  PAN / GIR NO.
                </th>
                <th
                  className="text-center font-weight-bold"
                  style={{
                    borderTop: "2px solid",
                    borderBottom: "2px solid",
                    borderRight: "2px solid",
                  }}
                  colSpan="2"
                >
                  TAN
                </th>
                <th
                  className="text-center font-weight-bold"
                  style={{ borderTop: "2px solid", borderBottom: "2px solid" }}
                  colSpan="2"
                >
                  PAN / GIR NO.
                </th>
              </tr>
              <tr>
                <th
                  className="text-center font-weight-bold"
                  style={{
                    borderTop: "2px solid",
                    borderBottom: "2px solid",
                    borderRight: "2px solid",
                  }}
                  colSpan="2"
                >
                  {" "}
                </th>
                <th
                  className="text-center font-weight-bold"
                  style={{
                    borderTop: "2px solid",
                    borderBottom: "2px solid",
                    borderRight: "2px solid",
                  }}
                  colSpan="2"
                >
                  CALD02032C
                </th>
                <th
                  className="text-center font-weight-bold"
                  style={{ borderTop: "2px solid", borderBottom: "2px solid" }}
                  colSpan="2"
                >
                  {pan}
                </th>
              </tr>
              <tr>
                <th
                  className="text-center font-weight-bold"
                  style={{
                    borderBottom: "2px solid",
                    borderRight: "2px solid",
                  }}
                  colSpan="2"
                  rowSpan="4"
                >
                  TDS Circle where Annual Reaturn /<br /> Statement Under
                  Section 206 is to be filled
                </th>
                <th
                  className="text-center font-weight-bold"
                  style={{
                    borderBottom: "2px solid",
                    borderRight: "2px solid",
                  }}
                  colSpan="2"
                >
                  PERIOD RETURN
                </th>
                <th
                  className="text-center font-weight-bold"
                  colSpan="2"
                  rowSpan="3"
                >
                  ASSESSMENT <br />
                  YEAR
                </th>
              </tr>
              <tr>
                <th
                  className="text-center"
                  style={{ borderRight: "2px solid", width: "18%" }}
                >
                  FROM
                </th>
                <th
                  className="text-center"
                  style={{ borderRight: "2px solid", width: "20%" }}
                >
                  TO
                </th>
              </tr>
              <tr>
                <th
                  className="text-center"
                  style={{ borderRight: "2px solid" }}
                >
                  {" "}
                </th>
                <th
                  className="text-center"
                  style={{ borderRight: "2px solid" }}
                >
                  {" "}
                </th>
              </tr>
              <tr>
                <th
                  className="text-center"
                  style={{
                    borderRight: "2px solid",
                    borderBottom: "2px solid",
                  }}
                >
                  {year}
                </th>
                <th
                  className="text-center"
                  style={{
                    borderRight: "2px solid",
                    borderBottom: "2px solid",
                  }}
                >
                  {year + 1}
                </th>
                <th
                  className="text-center"
                  style={{ borderBottom: "2px solid" }}
                >
                  {year + " - " + (year + 1)}
                </th>
              </tr>
              <tr>
                <th
                  colSpan="6"
                  className="text-center font-weight-bold"
                  style={{ borderBottom: "2px solid" }}
                >
                  <h4>
                    DETAILS OF SALARY PAID AND ANY OTHER INCOME AND TAX DEDUCTED
                  </h4>
                </th>
              </tr>
              <tr>
                <th
                  colSpan="2"
                  style={{ borderRight: "2px solid", width: "40%" }}
                  className="p-1"
                >
                  1. GROSS SALARY <br />
                  (a) Salary as per provisions contained in Section 17(1)
                </th>
                <th
                  style={{ borderRight: "2px solid" }}
                  className="p-1 text-center"
                >
                  {}
                </th>
                <th
                  style={{ borderRight: "2px solid" }}
                  className="p-1 text-center"
                >
                  {" "}
                </th>
                <th> </th>
              </tr>
              <tr>
                <th
                  colSpan="2"
                  style={{ borderRight: "2px solid" }}
                  className="p-1"
                >
                  (b) Value of perquisites u/s 17(2)
                  <br />
                  (as per Form No. 12BA, wherever applicable)
                </th>
                <th
                  style={{ borderRight: "2px solid" }}
                  className="p-1 text-center"
                ></th>
                <th
                  style={{ borderRight: "2px solid" }}
                  className="p-1 text-center"
                >
                  {" "}
                </th>
                <th> </th>
              </tr>
              <tr>
                <th
                  colSpan="2"
                  style={{ borderRight: "2px solid" }}
                  className="p-1"
                >
                  (c) Profits in lieu of salary under section 17(3)
                  <br />
                  (as per Form No. 12BA, wherever applicable)
                </th>
                <th
                  style={{ borderRight: "2px solid" }}
                  className="p-1 text-center"
                ></th>
                <th
                  style={{ borderRight: "2px solid" }}
                  className="p-1 text-center"
                >
                  {" "}
                </th>
                <th> </th>
              </tr>
              <tr>
                <th
                  colSpan="2"
                  style={{ borderRight: "2px solid" }}
                  className="p-1"
                >
                  (d) Total
                </th>
                <th
                  style={{ borderRight: "2px solid" }}
                  className="p-1 text-center"
                ></th>
                <th
                  style={{ borderRight: "2px solid" }}
                  className="p-1 text-center"
                >
                  {tgross}
                </th>
                <th> </th>
              </tr>
              <tr>
                <th
                  colSpan="2"
                  style={{ borderRight: "2px solid" }}
                  className="p-1"
                >
                  (2) LESS : Allowance to the extent exempt under Section 10
                </th>
                <th
                  style={{ borderRight: "2px solid" }}
                  className="p-1 text-center"
                ></th>
                <th
                  style={{ borderRight: "2px solid" }}
                  className="p-1 text-center"
                ></th>
                <th> </th>
              </tr>
              <tr style={{ height: "20px" }}>
                <th
                  style={{ borderRight: "2px solid" }}
                  colSpan="2"
                  className="p-1 text-center"
                ></th>
                <th
                  style={{ borderRight: "2px solid" }}
                  className="p-1 text-center"
                ></th>
                <th
                  style={{ borderRight: "2px solid" }}
                  className="p-1 text-center"
                ></th>
              </tr>
              <tr style={{ height: "20px" }}>
                <th
                  style={{ borderRight: "2px solid" }}
                  colSpan="2"
                  className="p-1 text-center"
                ></th>
                <th
                  style={{ borderRight: "2px solid" }}
                  className="p-1 text-center"
                ></th>
                <th
                  style={{ borderRight: "2px solid" }}
                  className="p-1 text-center"
                ></th>
              </tr>
              <tr>
                <th
                  colSpan="2"
                  style={{ borderRight: "2px solid" }}
                  className="p-1"
                >
                  {"(3) BALANCE (1 – 2)"}
                </th>
                <th
                  style={{ borderRight: "2px solid" }}
                  className="p-1 text-center"
                ></th>
                <th
                  style={{ borderRight: "2px solid" }}
                  className="p-1 text-center"
                >
                  {"Rs. " + tgross}
                </th>
              </tr>
              <tr>
                <th
                  colSpan="2"
                  style={{ borderRight: "2px solid" }}
                  className="p-1"
                >
                  {"(4)"} DEDUCTIONS
                </th>
                <th
                  style={{ borderRight: "2px solid" }}
                  className="p-1 text-center"
                ></th>
                <th
                  style={{ borderRight: "2px solid" }}
                  className="p-1 text-center"
                ></th>
              </tr>
              <tr>
                <th
                  colSpan="2"
                  style={{ borderRight: "2px solid" }}
                  className="pl-4"
                >
                  {"a) Standard Deduction"}
                </th>
                <th
                  style={{ borderRight: "2px solid" }}
                  className="p-1 text-center"
                >
                  50000
                </th>
                <th
                  style={{ borderRight: "2px solid" }}
                  className="p-1 text-center"
                ></th>
              </tr>
              <tr>
                <th
                  colSpan="2"
                  style={{ borderRight: "2px solid" }}
                  className="pl-4"
                >
                  {"b) Tax on Employment"}
                </th>
                <th
                  style={{ borderRight: "2px solid" }}
                  className="p-1 text-center"
                >
                  {totalptax}
                </th>
                <th
                  style={{ borderRight: "2px solid" }}
                  className="p-1 text-center"
                ></th>
              </tr>
              <tr style={{ height: "20px" }}>
                <th
                  style={{ borderRight: "2px solid" }}
                  colSpan="2"
                  className="p-1 text-center"
                ></th>
                <th
                  style={{ borderRight: "2px solid" }}
                  className="p-1 text-center"
                ></th>
                <th
                  style={{ borderRight: "2px solid" }}
                  className="p-1 text-center"
                ></th>
              </tr>
              <tr>
                <th
                  colSpan="2"
                  style={{ borderRight: "2px solid" }}
                  className="pl-4"
                >
                  {"5) AGGREGATE OF 4 (a) to 4 (b)"}
                </th>
                <th
                  style={{ borderRight: "2px solid" }}
                  className="p-1 text-center"
                ></th>
                <th
                  style={{ borderRight: "2px solid" }}
                  className="p-1 text-center"
                >
                  {totalptax + 50000}
                </th>
              </tr>
              <tr>
                <th
                  colSpan="2"
                  style={{ borderRight: "2px solid" }}
                  className="pl-4"
                >
                  {"6)"} TAXABLE INCOME UNDER THE
                  <br />
                  &nbsp;&nbsp;&nbsp;HEAD SALARIES {"(3-5)"}
                </th>
                <th
                  style={{ borderRight: "2px solid" }}
                  className="p-1 text-center"
                ></th>
                <th
                  style={{ borderRight: "2px solid" }}
                  className="p-1 text-center"
                ></th>
                <th className="p-1 text-center">
                  {tgross - totalptax - 50000}
                </th>
              </tr>
              <tr>
                <th
                  colSpan="2"
                  style={{ borderRight: "2px solid" }}
                  className="pl-4 pt-4"
                >
                  {"7)"}&nbsp;&nbsp;&nbsp;Add : Any other income reported by the
                  <br />
                  employee
                </th>
                <th
                  style={{ borderRight: "2px solid" }}
                  className="p-1 text-center pt-4"
                >
                  {rand}
                </th>
                <th
                  style={{ borderRight: "2px solid" }}
                  className="p-1 text-center pt-4"
                ></th>
              </tr>
              <tr>
                <th
                  colSpan="2"
                  style={{ borderRight: "2px solid" }}
                  className="pl-4"
                >
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  {"a) GROSS INCOME (Total above 7)"}
                </th>
                <th
                  style={{ borderRight: "2px solid" }}
                  className="p-1 text-center"
                >
                  {tgross - totalptax - 50000 + rand}
                </th>
                <th
                  style={{ borderRight: "2px solid" }}
                  className="p-1 text-center"
                ></th>
              </tr>
              <tr>
                <th
                  colSpan="2"
                  style={{ borderRight: "2px solid" }}
                  className="pl-4"
                >
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{"b)"} LESS: Deduction
                  under Section 57
                </th>
                <th
                  style={{ borderRight: "2px solid" }}
                  className="p-1 text-center"
                >
                  NIL
                </th>
                <th
                  style={{ borderRight: "2px solid" }}
                  className="p-1 text-center"
                ></th>
              </tr>
              <tr>
                <th
                  colSpan="2"
                  style={{ borderRight: "2px solid" }}
                  className="pl-4 pt-4"
                >
                  {"8)"}&nbsp;&nbsp;&nbsp;TAXABLE INCOME FROM
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;OTHER SOURCES [7(A)-7(B)]
                </th>
                <th
                  style={{ borderRight: "2px solid" }}
                  className="p-1 text-center pt-4"
                >
                  {tgross - totalptax - 50000 + rand}
                </th>
                <th
                  style={{ borderRight: "2px solid" }}
                  className="p-1 text-center pt-4"
                ></th>
              </tr>
              <tr>
                <th
                  colSpan="2"
                  style={{ borderRight: "2px solid" }}
                  className="pl-4 pt-4"
                >
                  {"9)"}&nbsp;&nbsp;&nbsp;LESS: Interest paid on dwelling house
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Under Section 24
                </th>
                <th
                  style={{ borderRight: "2px solid" }}
                  className="p-1 text-center pt-4"
                >
                  NIL
                </th>
                <th
                  style={{ borderRight: "2px solid" }}
                  className="p-1 text-center pt-4"
                ></th>
              </tr>
              <tr>
                <th
                  colSpan="2"
                  style={{
                    borderRight: "2px solid",
                    borderBottom: "2px solid",
                  }}
                  className="pl-4 pt-4 pb-2"
                >
                  {"10)"}&nbsp;&nbsp;&nbsp;GROSS TOTAL INCOME {"(6+8-9)"}
                </th>
                <th
                  style={{
                    borderRight: "2px solid",
                    borderBottom: "2px solid",
                  }}
                  className="p-1 pb-2 text-center pt-4"
                ></th>
                <th
                  style={{
                    borderRight: "2px solid",
                    borderBottom: "2px solid",
                  }}
                  className="p-1 pb-2 text-center pt-4"
                ></th>
                <th
                  className="p-1 pb-2 text-center pt-4"
                  style={{ borderBottom: "2px solid" }}
                >
                  {tgross - totalptax - 50000 + rand}
                </th>
              </tr>

              <tr>
                <th
                  colSpan="2"
                  style={{ borderRight: "2px solid" }}
                  className="pl-4 pt-4"
                >
                  {"11)"}&nbsp;&nbsp;&nbsp;DEDUCTION UNDER
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;CHAPTER VI A<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{"(80C TO 80U)"}
                </th>
                <th
                  style={{ borderRight: "2px solid" }}
                  className="p-1 text-center pt-4"
                >
                  GROSS
                  <br />
                  AMOUNT
                </th>
                <th
                  style={{ borderRight: "2px solid" }}
                  className="p-1 text-center pt-4"
                >
                  QUALIFYING
                  <br />
                  AMOUNT
                </th>
                <th className="p-1 text-center pt-4">
                  DEDUCTION
                  <br />
                  AMOUNT
                </th>
              </tr>
              <tr>
                <th
                  colSpan="2"
                  style={{ borderRight: "2px solid" }}
                  className="pl-4 pt-4 pb-2"
                >
                  &nbsp;&nbsp;&nbsp;G.P.F. SUBSCRIPTION
                </th>
                <th
                  style={{ borderRight: "2px solid" }}
                  className="p-1 pb-2 text-center pt-4"
                >
                  {"Rs." + gpf * 12}
                </th>
                <th
                  style={{ borderRight: "2px solid" }}
                  className="p-1 pb-2 text-center pt-4"
                >
                  {"Rs." + gpf * 12}
                </th>
                <th className="p-1 pb-2 text-center pt-4">
                  {"Rs." + gpf * 12}
                </th>
              </tr>
              <tr>
                <th
                  colSpan="2"
                  style={{ borderRight: "2px solid" }}
                  className="pl-4 pt-4 pb-2"
                >
                  &nbsp;&nbsp;&nbsp;80 TTA Exemption of Savings Bank Interest (
                  Maximum Rs. 10000/-)
                </th>
                <th
                  style={{ borderRight: "2px solid" }}
                  className="p-1 pb-2 text-center pt-4"
                >
                  Rs. {rand}
                </th>
                <th
                  style={{ borderRight: "2px solid" }}
                  className="p-1 pb-2 text-center pt-4"
                >
                  Rs. {rand}
                </th>
                <th className="p-1 pb-2 text-center pt-4">Rs. {rand}</th>
              </tr>
              {gsli > 0 ? (
                <tr>
                  <th
                    colSpan="2"
                    style={{ borderRight: "2px solid" }}
                    className="pl-4 pt-4 pb-2"
                  >
                    &nbsp;&nbsp;&nbsp;G.S.L.I. Subscription
                  </th>
                  <th
                    style={{ borderRight: "2px solid" }}
                    className="p-1 pb-2 text-center pt-4"
                  >
                    Rs. {gsli * 12}
                  </th>
                  <th
                    style={{ borderRight: "2px solid" }}
                    className="p-1 pb-2 text-center pt-4"
                  >
                    Rs. {gsli * 12}
                  </th>
                  <th className="p-1 pb-2 text-center pt-4">Rs. {gsli * 12}</th>
                </tr>
              ) : null}
              {lic ? (
                <tr>
                  <th
                    colSpan="2"
                    style={{ borderRight: "2px solid" }}
                    className="pl-4 pt-4 pb-2"
                  >
                    &nbsp;&nbsp;&nbsp;L.I.C. / PLI Premium
                  </th>
                  <th
                    style={{ borderRight: "2px solid" }}
                    className="p-1 pb-2 text-center pt-4"
                  >
                    Rs. {lic}
                  </th>
                  <th
                    style={{ borderRight: "2px solid" }}
                    className="p-1 pb-2 text-center pt-4"
                  >
                    Rs. {lic}
                  </th>
                  <th className="p-1 pb-2 text-center pt-4">Rs. {lic}</th>
                </tr>
              ) : null}
              {ph ? (
                <tr>
                  <th
                    colSpan="2"
                    style={{ borderRight: "2px solid" }}
                    className="pl-4 pt-4 pb-2"
                  >
                    &nbsp;&nbsp;&nbsp;80U Person with Disability
                  </th>
                  <th
                    style={{ borderRight: "2px solid" }}
                    className="p-1 pb-2 text-center pt-4"
                  >
                    Rs. {ph}
                  </th>
                  <th
                    style={{ borderRight: "2px solid" }}
                    className="p-1 pb-2 text-center pt-4"
                  >
                    Rs. {ph}
                  </th>
                  <th className="p-1 pb-2 text-center pt-4">Rs. {ph}</th>
                </tr>
              ) : null}
              {nsc ? (
                <tr>
                  <th
                    colSpan="2"
                    style={{ borderRight: "2px solid" }}
                    className="pl-4 pt-4 pb-2"
                  >
                    &nbsp;&nbsp;&nbsp;NSC / KVP Purchase{" "}
                  </th>
                  <th
                    style={{ borderRight: "2px solid" }}
                    className="p-1 pb-2 text-center pt-4"
                  >
                    Rs. {nsc}
                  </th>
                  <th
                    style={{ borderRight: "2px solid" }}
                    className="p-1 pb-2 text-center pt-4"
                  >
                    Rs. {nsc}
                  </th>
                  <th className="p-1 pb-2 text-center pt-4">Rs. {nsc}</th>
                </tr>
              ) : null}
              {mediclaim ? (
                <tr>
                  <th
                    colSpan="2"
                    style={{ borderRight: "2px solid" }}
                    className="pl-4 pt-4 pb-2"
                  >
                    &nbsp;&nbsp;&nbsp;80 D Medical Insurance Premium{" "}
                  </th>
                  <th
                    style={{ borderRight: "2px solid" }}
                    className="p-1 pb-2 text-center pt-4"
                  >
                    Rs. {mediclaim}
                  </th>
                  <th
                    style={{ borderRight: "2px solid" }}
                    className="p-1 pb-2 text-center pt-4"
                  >
                    Rs. {mediclaim}
                  </th>
                  <th className="p-1 pb-2 text-center pt-4">Rs. {mediclaim}</th>
                </tr>
              ) : null}

              <tr>
                <th
                  colSpan="2"
                  style={{ borderRight: "2px solid" }}
                  className="pl-4 pt-4 pb-2"
                >
                  {"12)"}&nbsp;&nbsp;&nbsp;AGGREATE OF DEDUCTABLE AMOUNT UNDER
                  CHAPTER V1A
                </th>
                <th
                  style={{ borderRight: "2px solid" }}
                  className="p-1 pb-2 text-center pt-4"
                ></th>
                <th
                  style={{ borderRight: "2px solid" }}
                  className="p-1 pb-2 text-center pt-4"
                ></th>
                <th className="p-1 pb-2 text-center pt-4">
                  Rs. {e + mediclaim + ph + rand}
                </th>
              </tr>
              <tr>
                <th
                  colSpan="2"
                  style={{ borderRight: "2px solid" }}
                  className="pl-4 pt-4 pb-2"
                >
                  {"13)"}&nbsp;&nbsp;&nbsp;TOTAL OR NET TAXABLE INCOME{" "}
                  {"(10-12)"}
                </th>
                <th
                  style={{ borderRight: "2px solid" }}
                  className="p-1 pb-2 text-center pt-4"
                ></th>
                <th
                  style={{ borderRight: "2px solid" }}
                  className="p-1 pb-2 text-center pt-4"
                ></th>
                <th className="p-1 pb-2 text-center pt-4">
                  Rs.{" "}
                  {tgross -
                    totalptax -
                    50000 +
                    rand -
                    (e + mediclaim + ph + rand)}
                </th>
              </tr>
              <tr>
                <th
                  colSpan="2"
                  style={{ borderRight: "2px solid" }}
                  className="pl-4 pt-4 pb-2"
                >
                  {"14)"}&nbsp;&nbsp;&nbsp;ROUNDED OFF
                </th>
                <th
                  style={{ borderRight: "2px solid" }}
                  className="p-1 pb-2 text-center pt-4"
                ></th>
                <th
                  style={{ borderRight: "2px solid" }}
                  className="p-1 pb-2 text-center pt-4"
                ></th>
                <th className="p-1 pb-2 text-center pt-4">
                  Rs.{" "}
                  {roundSo(
                    tgross -
                      totalptax -
                      50000 +
                      rand -
                      (e + mediclaim + ph + rand),
                    10
                  )}
                </th>
              </tr>
              <tr>
                <th
                  colSpan="2"
                  style={{ borderRight: "2px solid" }}
                  className="pl-4 pt-4 pb-2"
                >
                  {"15)"}&nbsp;&nbsp;&nbsp;TAX ON TOTAL OR NET INCOME
                </th>
                <th
                  style={{ borderRight: "2px solid" }}
                  className="p-1 pb-2 text-center pt-4"
                ></th>
                <th
                  style={{ borderRight: "2px solid" }}
                  className="p-1 pb-2 text-center pt-4"
                ></th>
                <th className="p-1 pb-2 text-center pt-4">Rs. {b}</th>
              </tr>
              <tr>
                <th
                  colSpan="2"
                  style={{ borderRight: "2px solid" }}
                  className="pl-4 pt-4 pb-2"
                >
                  {"16)"}&nbsp;&nbsp;&nbsp;LESS: REBATE U/S. 87A
                </th>
                <th
                  style={{ borderRight: "2px solid" }}
                  className="p-1 pb-2 text-center pt-4"
                ></th>
                <th
                  style={{ borderRight: "2px solid" }}
                  className="p-1 pb-2 text-center pt-4"
                ></th>
                <th className="p-1 pb-2 text-center pt-4">
                  {!less ? "Rs." + b : "NIL"}
                </th>
              </tr>
              <tr>
                <th
                  colSpan="2"
                  style={{ borderRight: "2px solid" }}
                  className="pl-4 pt-4 pb-2"
                >
                  {"17)"}&nbsp;&nbsp;&nbsp;TAX ON SURCHARGE
                </th>
                <th
                  style={{ borderRight: "2px solid" }}
                  className="p-1 pb-2 text-center pt-4"
                ></th>
                <th
                  style={{ borderRight: "2px solid" }}
                  className="p-1 pb-2 text-center pt-4"
                ></th>
                <th className="p-1 pb-2 text-center pt-4">NIL</th>
              </tr>
              <tr>
                <th
                  colSpan="2"
                  style={{ borderRight: "2px solid" }}
                  className="pl-4 pt-4 pb-2"
                >
                  {"18)"}&nbsp;&nbsp;&nbsp;ADD: EDUCATION CESS <br />
                  (4% OF TAX AND SURCHARGE)
                </th>
                <th
                  style={{ borderRight: "2px solid" }}
                  className="p-1 pb-2 text-center pt-4"
                ></th>
                <th
                  style={{ borderRight: "2px solid" }}
                  className="p-1 pb-2 text-center pt-4"
                ></th>
                <th className="p-1 pb-2 text-center pt-4">
                  {b > 12500 ? roundSo(b * 0.04, 10) : "NIL"}
                </th>
              </tr>
              <tr>
                <th
                  colSpan="2"
                  style={{ borderRight: "2px solid" }}
                  className="pl-4 pt-4 pb-2"
                >
                  {"19)"}&nbsp;&nbsp;&nbsp;TOTAL TAX PAYABLE (17+18)
                </th>
                <th
                  style={{ borderRight: "2px solid" }}
                  className="p-1 pb-2 text-center pt-4"
                ></th>
                <th
                  style={{ borderRight: "2px solid" }}
                  className="p-1 pb-2 text-center pt-4"
                ></th>
                <th className="p-1 pb-2 text-center pt-4">
                  {b > 12500 ? b + roundSo(b * 0.04, 10) : "NIL"}
                </th>
              </tr>
              <tr>
                <th
                  colSpan="2"
                  style={{ borderRight: "2px solid" }}
                  className="pl-4 pt-4 pb-2"
                >
                  {"20)"}&nbsp;&nbsp;&nbsp;LESS: REBATE U/S. 89{" "}
                  {"(Attach Details)"}
                </th>
                <th
                  style={{ borderRight: "2px solid" }}
                  className="p-1 pb-2 text-center pt-4"
                ></th>
                <th
                  style={{ borderRight: "2px solid" }}
                  className="p-1 pb-2 text-center pt-4"
                ></th>
                <th className="p-1 pb-2 text-center pt-4">NIL</th>
              </tr>
              <tr>
                <th
                  colSpan="2"
                  style={{ borderRight: "2px solid" }}
                  className="pl-4 pt-4 pb-2"
                >
                  {"21)"}&nbsp;&nbsp;&nbsp;NET TAX PAYABLE {"(19-20)"}
                </th>
                <th
                  style={{ borderRight: "2px solid" }}
                  className="p-1 pb-2 text-center pt-4"
                ></th>
                <th
                  style={{ borderRight: "2px solid" }}
                  className="p-1 pb-2 text-center pt-4"
                ></th>
                <th className="p-1 pb-2 text-center pt-4">
                  {b > 12500 ? b + roundSo(b * 0.04, 10) : "NIL"}
                </th>
              </tr>
              <tr>
                <th
                  colSpan="2"
                  style={{ borderRight: "2px solid" }}
                  className="pl-4 pt-4 pb-2"
                >
                  {"22)"}&nbsp;&nbsp;&nbsp;LESS: TAX DEDUCTED AT SOURCE
                </th>
                <th
                  style={{ borderRight: "2px solid" }}
                  className="p-1 pb-2 text-center pt-4"
                ></th>
                <th
                  style={{ borderRight: "2px solid" }}
                  className="p-1 pb-2 text-center pt-4"
                ></th>
                <th className="p-1 pb-2 text-center pt-4">
                  {tax > 0 ? tax : "NIL"}
                </th>
              </tr>
              <tr>
                <th
                  colSpan="2"
                  style={{ borderRight: "2px solid" }}
                  className="pl-4 pt-4 pb-2"
                >
                  {"23)"}&nbsp;&nbsp;&nbsp;TAX PAYABLE / REFUNDABLE {"(21-22)"}
                </th>
                <th
                  style={{ borderRight: "2px solid" }}
                  className="p-1 pb-2 text-center pt-4"
                ></th>
                <th
                  style={{ borderRight: "2px solid" }}
                  className="p-1 pb-2 text-center pt-4"
                ></th>
                <th className="p-1 pb-2 text-center pt-4">
                  {tax > 0 ? b + roundSo(b * 0.04, 10) : "NIL"}
                </th>
              </tr>
              <tr>
                <th
                  colSpan="2"
                  style={{
                    borderBottom: "2px solid",
                    borderRight: "2px solid",
                    height: "100px",
                  }}
                  className="pl-4 pt-4 pb-2"
                ></th>
                <th
                  style={{
                    borderRight: "2px solid",
                    borderBottom: "2px solid",
                  }}
                  className="p-1 pb-2 text-center pt-4"
                ></th>
                <th
                  style={{
                    borderRight: "2px solid",
                    borderBottom: "2px solid",
                  }}
                  className="p-1 pb-2 text-center pt-4"
                ></th>
                <th
                  className="p-1 pb-2 text-center pt-4"
                  style={{ borderBottom: "2px solid" }}
                ></th>
              </tr>
              <tr>
                <th colSpan="6" className="text-center">
                  <h4>
                    DETAILS OF TAX DEDUCTED AND DEPOSITED INTO CENTRAL
                    GOVERNMENT ACCOUNT
                  </h4>
                </th>
              </tr>
              <tr
                style={{ borderTop: "4px solid", borderBottom: "4px solid" }}
                className="text-center"
              >
                <th>
                  <i>Amount</i>
                </th>
                <th>
                  <i>Date of Payment</i>
                </th>
                <th>
                  <i></i>
                </th>
                <th colSpan="3">
                  <i>Name of the bank and Branch where Tax Deposited</i>
                </th>
              </tr>
              <tr>
                <th
                  colSpan="6"
                  style={{ borderBottom: "2px solid", height: "150px" }}
                ></th>
              </tr>
            </table>

            <div
              style={{ fontSize: 14, fontWeight: "lighter" }}
              className="border border-top-0 border-2 border-black p-2  mx-auto"
            >
              <div className="d-flex text-nowrap  ">
                <div className=" text-left m-1">I, </div>
                <div
                  style={{
                    borderBottom: "1px solid",
                    borderBottomStyle: "dashed",
                  }}
                  className="m-1"
                >
                  {tname},
                </div>
                <div className="m-1">son/daughter of</div>
                <div
                  style={{
                    borderBottom: "1px solid",
                    borderBottomStyle: "dashed",
                  }}
                  className="m-1"
                >
                  {fname},
                </div>
                <div className="m-1">working in the capacity of </div>
                <div className="m-1">
                  <span
                    style={{
                      borderBottom: "1px solid",
                      borderBottomStyle: "dashed",
                    }}
                    className="m-1"
                  >
                    {desig}
                  </span>
                  <span className="m-1">
                    , (designation) do hereby certify that a sum of
                  </span>
                  <span
                    style={{
                      borderBottom: "1px solid",
                      borderBottomStyle: "dashed",
                    }}
                    className="m-1"
                  >
                    Rs. {tax},
                  </span>
                </div>
              </div>
              <div className="d-flex text-nowrap  ">
                <div>
                  <span
                    style={{
                      borderBottom: "1px solid",
                      borderBottomStyle: "dashed",
                    }}
                    className="m-1"
                  >
                    {tax === 0
                      ? "[Rupees Zero Only (in words)]"
                      : "[Rupees  " + NumInWords(tax) + " Only (in words)]"}
                  </span>
                  <span className="m-1">
                    has been deducted at source and paid to the credit of the
                    Central Government.
                  </span>
                </div>
              </div>

              <div className="d-flex text-nowrap mb-5">
                <div className="m-1">
                  I further certify that the information given above is true and
                  correct based on the books of account documents and other
                  available records.
                </div>
              </div>

              <div className="d-flex justify-content-between p-2 align-items-end">
                <div style={{ fontSize: 12 }}>
                  <p className="text-start">
                    Date…................................................
                  </p>
                  <p className="text-start">
                    Designation…..............................................................................
                  </p>
                </div>
                <div style={{ fontSize: 12 }}>
                  <p
                    className="text-start p-2"
                    style={{
                      borderTop: "1px solid",
                      borderTopStyle: "dashed",
                    }}
                  >
                    Signature of the person resposible for deduction of tax
                  </p>
                  <p className="text-start">
                    Place…...............................................
                  </p>
                  <p className="text-start">
                    Full
                    Name…................................................................................
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default Form16Prev;
