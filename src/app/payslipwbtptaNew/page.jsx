"use client";

import ropa from "../../modules/ropa";

import React, { Suspense, useEffect, useState } from "react";
import { useGlobalContext } from "../../context/Store";
import { useRouter } from "next/navigation";
import {
  GetMonthName,
  NumInWords,
  printDate,
  readCSVFile,
} from "../../modules/calculatefunctions";
import dynamic from "next/dynamic";
import WBTPTAPaySLip from "../../pdfs/WBTPTAPaySLip";
import axios from "axios";
import Loader from "../../components/Loader";
const PayslipWbtpta = () => {
  const PDFDownloadLink = dynamic(
    async () =>
      await import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
    {
      ssr: false,
      loading: () => <p>Please Wait...</p>,
    }
  );
  const { state, stateObject } = useGlobalContext();
  const router = useRouter();
  const thisYear = new Date().getFullYear();
  const preYear = thisYear - 1;
  const pre2ndYear = thisYear - 2;
  const thisYearMonths = [
    `January-${thisYear}`,
    `February-${thisYear}`,
    `March-${thisYear}`,
    `April-${thisYear}`,
    `May-${thisYear}`,
    `June-${thisYear}`,
    `July-${thisYear}`,
    `August-${thisYear}`,
    `September-${thisYear}`,
    `October-${thisYear}`,
    `November-${thisYear}`,
    `December-${thisYear}`,
  ];
  const preYearMonths = [
    `January-${preYear}`,
    `February-${preYear}`,
    `March-${preYear}`,
    `April-${preYear}`,
    `May-${preYear}`,
    `June-${preYear}`,
    `July-${preYear}`,
    `August-${preYear}`,
    `September-${preYear}`,
    `October-${preYear}`,
    `November-${preYear}`,
    `December-${preYear}`,
  ];
  const pre2ndYearMonths = [
    `January-${pre2ndYear}`,
    `February-${pre2ndYear}`,
    `March-${pre2ndYear}`,
    `April-${pre2ndYear}`,
    `May-${pre2ndYear}`,
    `June-${pre2ndYear}`,
    `July-${pre2ndYear}`,
    `August-${pre2ndYear}`,
    `September-${pre2ndYear}`,
    `October-${pre2ndYear}`,
    `November-${pre2ndYear}`,
    `December-${pre2ndYear}`,
  ];

  const today = new Date();
  const [loader, setLoader] = useState(false);
  const [index, setIndex] = useState(
    today.getMonth() === 0 ? 11 : today.getMonth() - 1
  );
  const [month, setMonth] = useState(
    GetMonthName(today.getMonth() === 0 ? 11 : today.getMonth() - 1)
  );
  const [year, setYear] = useState(today.getFullYear());
  const lastmonth = GetMonthName(today.getMonth() - 1);
  const lastMonthIndex = today.getMonth();
  let paySlipArray = [];
  if (state === "admin") {
    paySlipArray = thisYearMonths
      // .slice(0, lastMonthIndex)
      .reverse()
      .concat(preYearMonths.reverse())
      .concat(pre2ndYearMonths.reverse());
  } else {
    paySlipArray = thisYearMonths
      .slice(0, lastMonthIndex)
      .reverse()
      .concat(preYearMonths.reverse())
      .concat(pre2ndYearMonths.reverse());
  }
  let details = stateObject;
  let tname,
    id,
    desig,
    school,
    disability,
    empid,
    pan,
    dataYear,
    addl,
    da,
    hra,
    ma,
    gross,
    pfund,
    ptax,
    gsli,
    udise,
    bank,
    account,
    ifsc,
    level,
    cell,
    ir;

  id = details.id;
  tname = details.tname;
  desig = details.desig;
  school = details.school;
  disability = details.disability;
  empid = details.empid;
  pan = details.pan;
  udise = details.udise;
  bank = details.bank;
  account = details.account;
  ifsc = details.ifsc;
  dataYear = details.dataYear;

  let netpay;

  let basicpay;

  const [salary, setSalary] = useState({
    basic: 0,
    da: 0.14,
    pfund: 0,
    ma: 0,
    addl: 0,
    ir: 0,
    hra: 0,
    gross: 0,
    netpay: 0,
    ptax: 0,
    gsli: 0,
    level: 0,
    cell: 0,
    deduction: 0,
    id,
    tname,
    desig,
    school,
    disability,
    empid,
    pan,
    udise,
    bank,
    account,
    ifsc,
    index: index,
    month: month,
    year: year,
    lastmonth: lastmonth,
    basicpay,
    today: today,
  });
  const handleChange = (e) => {
    if (e.target.value !== "") {
      const month = e.target.value.split("-")[0];
      const year = parseInt(e.target.value.split("-")[1]);
      const index = parseInt(e.target.value.split("-")[2]);
      setMonth(month);
      setYear(year);
      setIndex(index);
      getModifiedSalary(month, year);
    } else {
      toast.error("Please select a valid month");
    }
  };
  const getModifiedSalary = async (month, year) => {
    setLoader(true);
    const q1 = await readCSVFile(`${month.toLowerCase()}-${year}`);
    const q2 = await readCSVFile(`april-2024`);
    const monthSalary = q1?.filter((el) => el.id === stateObject.id)[0];
    const aprilSalary = q2?.filter((el) => el.id === stateObject.id)[0];
    if (month === "July" && year === 2024 && aprilSalary?.basic > 0) {
      ir = Math.round(aprilSalary?.basic * 0.04);
    } else {
      ir = 0;
    }
    basicpay = monthSalary?.basic;
    da = Math.round(basicpay * monthSalary?.daPercent);
    hra =
      monthSalary?.hraPercent > 10
        ? monthSalary?.hraPercent
        : Math.round(basicpay * monthSalary?.hraPercent);
    addl = monthSalary?.addl;
    ma = monthSalary?.ma;
    pfund = monthSalary?.gpf;
    gsli = monthSalary?.gsli;
    level = ropa(basicpay).lv;
    cell = ropa(basicpay).ce;
    gross = basicpay + da + ir + hra + addl + ma;
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

    let deduction = gsli + pfund + ptax;

    netpay = gross - deduction;
    setSalary({
      ...salary,
      level,
      cell,
      basicpay,
      basic: basicpay,
      da,
      ir,
      hra,
      addl,
      ma,
      pfund,
      gross,
      ptax,
      netpay,
      deduction,
      gsli,
      month,
      year,
      index,
    });
    setLoader(false);
  };
  useEffect(() => {
    //eslint-disable-next-line
  }, [month, index, year, salary]);
  useEffect(() => {
    document.title = `PAYSLIP OF ${tname?.toUpperCase()} OF ${school?.toUpperCase()} FOR THE MONTH OF ${lastmonth?.toUpperCase()}`;
    if (!state) {
      router.push("/login");
    }
    getModifiedSalary(month, year);
  }, []);

  return (
    <Suspense>
      {loader ? (
        <Loader />
      ) : (
        <div
          className="my-5 container"
          style={{
            fontFamily: "Times New Roman",
            color: "#000",
          }}
        >
          <div className="mx-auto my-3 noprint">
            <button
              type="button"
              className="btn btn-primary text-white font-weight-bold p-2 rounded"
              onClick={() => {
                if (typeof window !== "undefined") {
                  window.print();
                }
              }}
            >
              Print Payslip
            </button>
          </div>

          <div className="mx-auto noprint mb-5">
            <button
              type="button"
              className="btn btn-info text-white font-weight-bold m-2 p-2 rounded"
              onClick={() => router.back()}
            >
              Go Back
            </button>
            <PDFDownloadLink
              document={<WBTPTAPaySLip data={salary} />}
              fileName={`PAYSLIP OF ${tname?.toUpperCase()} OF ${school?.toUpperCase()} FOR THE MONTH OF ${lastmonth.toUpperCase()}.pdf`}
              style={{
                textDecoration: "none",
                padding: 11,
                color: "#fff",
                backgroundColor: "darkgreen",
                border: "1px solid #4a4a4a",
                width: "40%",
                borderRadius: 10,
                margin: 20,
              }}
            >
              {({ blob, url, loading, error }) =>
                loading ? "Please Wait..." : "Download Payslip"
              }
            </PDFDownloadLink>
          </div>
          <div className="mx-auto my-3 col-md-2 noprint">
            <h6 className="text-primary">Select Salary Month:</h6>
            <select
              className="form-select form-select-sm mb-3"
              aria-label=".form-select-sm example"
              name="Month"
              required
              defaultValue={month + "-" + year + "-" + index}
              onChange={handleChange}
            >
              <option value="">Select Month </option>
              {paySlipArray.map((el, ind) => {
                return (
                  <option value={el + "-" + ind} key={ind}>
                    {el}
                  </option>
                );
              })}
            </select>
          </div>

          <div>
            <h4 className="mb-2">
              WEST BENGAL TRINAMOOL PRIMARY TEACHERS' ASSOCIATION
            </h4>
            <h5 className="mb-2">
              * AMTA WEST CIRCLE * HOWRAH GRAMIN DISTRICT *
            </h5>
            <h5>
              * Sikshak Bhawan, Vill.- Joypur Fakirdas, P.O.- Joypur, P.S.-
              JoyPur, District- Howrah, PIN-711401. *
            </h5>
          </div>

          <h4 className="my-4 border-2">
            PAY SLIP FOR THE MONTH OF {month.toUpperCase()},
            {lastmonth?.toUpperCase() === "DECEMBER"
              ? today.getFullYear() - 1
              : today.getFullYear()}
          </h4>
          <div className="row">
            <table
              className="table table-bordered  border-1 border-black"
              width={"100%"}
              style={{
                border: "1px solid",
                textAlign: "center",
                fontSize: "16px",
              }}
            >
              <tr>
                <th
                  style={{
                    border: "1px solid",
                    textAlign: "center",
                    fontSize: "16px",
                  }}
                  colSpan="2"
                >
                  TEACHER'S NAME
                </th>
                <th
                  style={{
                    border: "1px solid",
                    textAlign: "center",
                    fontSize: "16px",
                  }}
                  colSpan="3"
                >
                  <p className="text-center fs-5">{salary.tname}</p>
                </th>
              </tr>
              <tr>
                <th
                  style={{
                    border: "1px solid",
                    textAlign: "center",
                    fontSize: "16px",
                  }}
                >
                  DESIGNATION:
                </th>

                <th
                  style={{
                    border: "1px solid",
                    textAlign: "center",
                    fontSize: "16px",
                  }}
                >
                  ID
                </th>
                <th
                  style={{
                    border: "1px solid",
                    textAlign: "center",
                    fontSize: "16px",
                  }}
                >
                  PAN:
                </th>
                <th
                  style={{
                    border: "1px solid",
                    textAlign: "center",
                    fontSize: "16px",
                  }}
                  colSpan="2"
                  rowSpan={2}
                >
                  {salary.level}, {salary.cell}
                </th>
              </tr>
              <tr>
                <th
                  style={{
                    border: "1px solid",
                    textAlign: "center",
                    fontSize: "16px",
                  }}
                >
                  {salary.desig}
                </th>
                <th
                  style={{
                    border: "1px solid",
                    textAlign: "center",
                    fontSize: "16px",
                  }}
                >
                  {salary.empid}
                </th>
                <th
                  style={{
                    border: "1px solid",
                    textAlign: "center",
                    fontSize: "16px",
                  }}
                >
                  {salary.pan}
                </th>
              </tr>
              <tr>
                <th
                  style={{
                    border: "1px solid",
                    textAlign: "center",
                    fontSize: "16px",
                  }}
                >
                  SCHOOL NAME
                </th>
                <th
                  style={{
                    border: "1px solid",
                    textAlign: "center",
                    fontSize: "16px",
                  }}
                  colSpan="4"
                >
                  <p className="text-center fs-5">
                    {salary.school}, UDISE:({salary.udise})
                  </p>
                </th>
              </tr>
              <tr>
                <th
                  style={{
                    border: "1px solid",
                    textAlign: "center",
                    fontSize: "16px",
                  }}
                  colSpan="2"
                >
                  EARNINGS
                </th>
                <th
                  style={{
                    border: "1px solid",
                    textAlign: "center",
                    fontSize: "16px",
                  }}
                  colSpan="2"
                >
                  DEDUCTIONS
                </th>
                <td
                  rowSpan="7"
                  style={{
                    wordWrap: "break-word",
                    minWidth: "50px",
                    maxWidth: "50px",
                    border: "1px solid",
                  }}
                >
                  <p className="text-danger text-wrap text-center">
                    <b>REMARKS:</b>
                    <br /> This Payslip is Only For Reference Purpose. It can
                    not be used as a Valid Proof of Salary. Please Use Payslip
                    which is available form SIS Office as a Valid Salary Proof.
                  </p>
                </td>
              </tr>
              <tr>
                <th
                  style={{
                    border: "1px solid",
                    textAlign: "center",
                    fontSize: "16px",
                  }}
                >
                  BASIC PAY
                </th>
                <td
                  style={{
                    textAlign: "center",
                    border: "1px solid",
                    fontSize: "16px",
                  }}
                >
                  {salary.basicpay}
                </td>
                <th
                  style={{
                    border: "1px solid",
                    textAlign: "center",
                    fontSize: "16px",
                  }}
                >
                  GPF
                </th>
                <td
                  style={{
                    textAlign: "center",
                    border: "1px solid",
                    fontSize: "16px",
                  }}
                >
                  {salary.pfund}
                </td>
              </tr>
              <tr>
                <th
                  style={{
                    border: "1px solid",
                    textAlign: "center",
                    fontSize: "16px",
                  }}
                >
                  ADDL. REMUN.
                </th>
                <td
                  style={{
                    textAlign: "center",
                    border: "1px solid",
                    fontSize: "16px",
                  }}
                >
                  {salary.addl}
                </td>
                <th
                  style={{
                    border: "1px solid",
                    textAlign: "center",
                    fontSize: "16px",
                  }}
                >
                  PTAX
                </th>
                <td
                  style={{
                    textAlign: "center",
                    border: "1px solid",
                    fontSize: "16px",
                  }}
                >
                  {salary.ptax}
                </td>
              </tr>
              <tr>
                <th
                  style={{
                    border: "1px solid",
                    textAlign: "center",
                    fontSize: "16px",
                  }}
                >
                  DA
                </th>
                <td
                  style={{
                    textAlign: "center",
                    border: "1px solid",
                    fontSize: "16px",
                  }}
                >
                  {salary.da}
                </td>
                <th
                  style={{
                    border: "1px solid",
                    textAlign: "center",
                    fontSize: "16px",
                  }}
                >
                  GSLI
                </th>
                <td
                  style={{
                    textAlign: "center",
                    border: "1px solid",
                    fontSize: "16px",
                  }}
                >
                  {salary.gsli}
                </td>
              </tr>
              <tr>
                <th
                  style={{
                    border: "1px solid",
                    textAlign: "center",
                    fontSize: "16px",
                  }}
                >
                  HRA
                </th>
                <td
                  style={{
                    textAlign: "center",
                    border: "1px solid",
                    fontSize: "16px",
                  }}
                >
                  {salary.hra}
                </td>
                <td
                  rowSpan="2"
                  colSpan="2"
                  style={{
                    border: "1px solid",
                    textAlign: "center",
                    fontSize: "16px",
                  }}
                >
                  <img
                    src="https://raw.githubusercontent.com/ultimate365/jsondata/main/logo.png"
                    alt="LOGO"
                    width={"100vw"}
                    className="opacity-25 p-2"
                  />
                </td>
              </tr>
              <tr>
                <th
                  style={{
                    border: "1px solid",
                    textAlign: "center",
                    fontSize: "16px",
                  }}
                >
                  MA
                </th>
                <td
                  style={{
                    textAlign: "center",
                    border: "1px solid",
                    fontSize: "16px",
                  }}
                >
                  {salary.ma}
                </td>
              </tr>
              {salary.ir > 0 && (
                <tr>
                  <th
                    style={{
                      border: "1px solid",
                      textAlign: "center",
                      fontSize: "16px",
                    }}
                  >
                    IR
                  </th>
                  <td
                    style={{
                      textAlign: "center",
                      border: "1px solid",
                      fontSize: "16px",
                    }}
                  >
                    {salary.ir}
                  </td>
                </tr>
              )}
              <tr>
                <th
                  style={{
                    border: "1px solid",
                    textAlign: "center",
                    fontSize: "16px",
                  }}
                >
                  GROSS SALARY
                </th>
                <td
                  style={{
                    border: "1px solid",
                    textAlign: "center",
                    fontSize: "16px",
                  }}
                >
                  {salary.gross}
                </td>
                <th
                  style={{
                    border: "1px solid",
                    textAlign: "center",
                    fontSize: "16px",
                  }}
                >
                  TOTAL DEDUCTIONS
                </th>
                <td
                  style={{
                    border: "1px solid",
                    textAlign: "center",
                    fontSize: "16px",
                  }}
                >
                  {salary.deduction}
                </td>
              </tr>
              <tr>
                <th
                  style={{
                    border: "1px solid",
                    textAlign: "center",
                    fontSize: "16px",
                  }}
                >
                  NET SALARY
                </th>
                <td
                  style={{
                    border: "1px solid",
                    textAlign: "center",
                    fontSize: "16px",
                  }}
                >
                  {salary.netpay}
                </td>
                <td
                  style={{
                    border: "1px solid",
                    textAlign: "center",
                    fontSize: "16px",
                  }}
                  colSpan="4"
                >
                  {NumInWords(salary.netpay)}
                </td>
              </tr>
            </table>
          </div>

          <div
            className="d-flex justify-content-between align-items-center fw-bold pt-2"
            style={{ borderTop: "1px solid", marginTop: "100px" }}
          >
            <a
              className="d-inline-block text-decoration-none text-left text-dark fst-italic"
              href="https://awwbtpta.github.io/web"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://awwbtpta.github.io/web
            </a>
            <p>Page-1</p>
            <p className="fst-italic">{printDate()}</p>
          </div>
        </div>
      )}
    </Suspense>
  );
};

export default PayslipWbtpta;
