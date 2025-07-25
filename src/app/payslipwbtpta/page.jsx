"use client";
import ropa from "../../modules/ropa";
import React, { Suspense, useEffect, useState } from "react";
import { useGlobalContext } from "../../context/Store";
import { useRouter } from "next/navigation";
import {HRA } from "../../modules/constants";
import {
  GetMonthName,
  NumInWords,
  printDate,
} from "../../modules/calculatefunctions";
import dynamic from "next/dynamic";
import WBTPTAPaySLip from "../../components/WBTPTAPaySLip";
import axios from "axios";
const PayslipWbtpta = () => {
  const PDFDownloadLink = dynamic(
    async () =>
      await import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
    {
      ssr: false,
      loading: () => <p>Please Wait...</p>,
    }
  );
  const thisYear = new Date().getFullYear();
  const prevYear = thisYear - 1;
  const dataExist = true;
  let PAYSLIPMONTHS;
  if (dataExist) {
    PAYSLIPMONTHS = [
      `January-${thisYear}`,
      `February-${thisYear}`,
      `March-${prevYear}`,
      `April-${prevYear}`,
      `May-${prevYear}`,
      `June-${prevYear}`,
      `July-${prevYear}`,
      `August-${prevYear}`,
      `September-${prevYear}`,
      `October-${prevYear}`,
      `November-${prevYear}`,
      `December-${prevYear}`,
      `January-${prevYear}`,
      `February-${thisYear}`,
      `March-${thisYear}`,
    ];
  } else {
    PAYSLIPMONTHS = [`January-${prevYear}`, `February-${prevYear}`];
  }

  const { state, stateObject } = useGlobalContext();
  const router = useRouter();
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
    ptax,
    gsli,
    udise,
    ir;

  id = details.id;
  tname = details.tname;
  desig = details.desig;
  school = details.school;
  disability = details.disability;
  empid = details.empid;
  pan = details.pan;
  udise = details.udise;
  dataYear = details.dataYear;

  let netpay;

  let basicpay;
  let pfund;
  let today = new Date();
  // let date = new Date();
  const [loader, setLoader] = useState(false);
  const [index, setIndex] = useState(
    today.getMonth() === 0 ? 11 : today.getMonth() - 1
  );
  const [month, setMonth] = useState(GetMonthName(today.getMonth() - 1));
  const [year, setYear] = useState(today.getFullYear());
  const [prevJanuary, setPrevJanuary] = useState({
    basic: 29800,
    daPercent: 0.14,
    gpf: 2000,
    ma: 500,
  });
  const [prevFebruary, setPrevFebruary] = useState({
    basic: 29800,
    daPercent: 0.14,
    gpf: 2000,
    ma: 500,
  });
  const [march, setMarch] = useState({
    basic: 29800,
    daPercent: 0.14,
    gpf: 2000,
    ma: 500,
  });
  const [april, setApril] = useState([]);
  const [may, setMay] = useState({
    basic: 29800,
    daPercent: 0.14,
    gpf: 2000,
    ma: 500,
  });
  const [june, setJune] = useState({
    basic: 29800,
    daPercent: 0.14,
    gpf: 2000,
    ma: 500,
  });
  const [july, setJuly] = useState({
    basic: 29800,
    daPercent: 0.14,
    gpf: 2000,
    ma: 500,
  });
  const [august, setAugust] = useState({
    basic: 29800,
    daPercent: 0.14,
    gpf: 2000,
    ma: 500,
  });
  const [september, setSeptember] = useState({
    basic: 29800,
    daPercent: 0.14,
    gpf: 2000,
    ma: 500,
  });
  const [october, setOctober] = useState({
    basic: 29800,
    daPercent: 0.14,
    gpf: 2000,
    ma: 500,
  });
  const [november, setNovember] = useState({
    basic: 29800,
    daPercent: 0.14,
    gpf: 2000,
    ma: 500,
  });
  const [december, setDecember] = useState({
    basic: 29800,
    daPercent: 0.14,
    gpf: 2000,
    ma: 500,
  });
  const [january, setJanuary] = useState({
    basic: 29800,
    daPercent: 0.14,
    gpf: 2000,
    ma: 500,
  });
  const [february, setFebruary] = useState({
    basic: 29800,
    daPercent: 0.14,
    gpf: 2000,
    ma: 500,
  });

  if (index === 0) {
    basicpay = january?.basic;
    da = Math.round(basicpay * january?.daPercent);
    pfund = january?.gpf;
    ma = january?.ma;
  } else if (index === 1) {
    basicpay = february?.basic;
    da = Math.round(basicpay * february?.daPercent);
    pfund = february?.gpf;
    ma = february?.ma;
  } else if (index === 2) {
    basicpay = march?.basic;
    da = Math.round(basicpay * march?.daPercent);
    pfund = march?.gpf;
    ma = march?.ma;
  } else if (index === 3) {
    basicpay = april?.basic;
    da = Math.round(basicpay * april?.daPercent);
    pfund = april?.gpf;
    ma = april?.ma;
  } else if (index === 4) {
    basicpay = may?.basic;
    da = Math.round(basicpay * may?.daPercent);
    pfund = may?.gpf;
    ma = may?.ma;
  } else if (index === 5) {
    basicpay = june?.basic;
    da = Math.round(basicpay * june?.daPercent);
    pfund = june?.gpf;
    ma = june?.ma;
  } else if (index === 6) {
    basicpay = july?.basic;
    da = Math.round(basicpay * july?.daPercent);
    pfund = july?.gpf;
    ma = july?.ma;
  } else if (index === 7) {
    basicpay = august?.basic;
    da = Math.round(basicpay * august?.daPercent);
    pfund = august?.gpf;
    ma = august?.ma;
  } else if (index === 8) {
    basicpay = september?.basic;
    da = Math.round(basicpay * september?.daPercent);
    pfund = september?.gpf;
    ma = september?.ma;
  } else if (index === 9) {
    basicpay = october?.basic;
    da = Math.round(basicpay * october?.daPercent);
    pfund = october?.gpf;
    ma = october?.ma;
  } else if (index === 10) {
    basicpay = november?.basic;
    da = Math.round(basicpay * november?.daPercent);
    pfund = november?.gpf;
    ma = november?.ma;
  } else if (index === 11) {
    basicpay = december?.basic;
    da = Math.round(basicpay * december?.daPercent);
    pfund = december?.gpf;
    ma = december?.ma;
  } else if (index === 12) {
    basicpay = january?.basic;
    da = Math.round(basicpay * january?.daPercent);
    pfund = january?.gpf;
    ma = january?.ma;
  } else if (index === 13) {
    basicpay = february?.basic;
    da = Math.round(basicpay * february?.daPercent);
    pfund = february?.gpf;
    ma = february?.ma;
  }

  let level = ropa(basicpay).lv;
  let cell = ropa(basicpay).ce;

  hra = Math.round(basicpay * HRA);

  if (dataYear === 2024 && index === 6) {
    gross = basicpay + da + ir + hra + addl + ma;
  } else {
    gross = basicpay + da + hra + addl + ma;
  }

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

  let lastmonth = GetMonthName(today.getMonth() - 1);
  const getSalary = async () => {
    setLoader(true);
    const qA = await axios.get(
      "https://raw.githubusercontent.com/amtawestwbtpta/salary/main/prevJanuary.json"
    );
    const qB = await axios.get(
      "https://raw.githubusercontent.com/amtawestwbtpta/salary/main/prevFebruary.json"
    );
    const q1 = await axios.get(
      "https://raw.githubusercontent.com/amtawestwbtpta/salary/main/march.json"
    );
    const q2 = await axios.get(
      "https://raw.githubusercontent.com/amtawestwbtpta/salary/main/april.json"
    );
    const q3 = await axios.get(
      "https://raw.githubusercontent.com/amtawestwbtpta/salary/main/may.json"
    );
    const q4 = await axios.get(
      "https://raw.githubusercontent.com/amtawestwbtpta/salary/main/june.json"
    );
    const q5 = await axios.get(
      "https://raw.githubusercontent.com/amtawestwbtpta/salary/main/july.json"
    );
    const q6 = await axios.get(
      "https://raw.githubusercontent.com/amtawestwbtpta/salary/main/august.json"
    );
    const q7 = await axios.get(
      "https://raw.githubusercontent.com/amtawestwbtpta/salary/main/september.json"
    );
    const q8 = await axios.get(
      "https://raw.githubusercontent.com/amtawestwbtpta/salary/main/october.json"
    );
    const q9 = await axios.get(
      "https://raw.githubusercontent.com/amtawestwbtpta/salary/main/november.json"
    );
    const q10 = await axios.get(
      "https://raw.githubusercontent.com/amtawestwbtpta/salary/main/december.json"
    );
    const q11 = await axios.get(
      "https://raw.githubusercontent.com/amtawestwbtpta/salary/main/january.json"
    );
    const q12 = await axios.get(
      "https://raw.githubusercontent.com/amtawestwbtpta/salary/main/february.json"
    );
    setPrevJanuary(qA.data?.filter((el) => el.id === stateObject.id)[0]);
    setPrevFebruary(qB.data?.filter((el) => el.id === stateObject.id)[0]);
    setMarch(q1.data?.filter((el) => el.id === stateObject.id)[0]);
    setApril(q2.data?.filter((el) => el.id === stateObject.id)[0]);
    setMay(q3.data?.filter((el) => el.id === stateObject.id)[0]);
    setJune(q4.data?.filter((el) => el.id === stateObject.id)[0]);
    setJuly(q5.data?.filter((el) => el.id === stateObject.id)[0]);
    setAugust(q6.data?.filter((el) => el.id === stateObject.id)[0]);
    setSeptember(q7.data?.filter((el) => el.id === stateObject.id)[0]);
    setOctober(q8.data?.filter((el) => el.id === stateObject.id)[0]);
    setNovember(q9.data?.filter((el) => el.id === stateObject.id)[0]);
    setDecember(q10.data?.filter((el) => el.id === stateObject.id)[0]);
    setJanuary(q11.data?.filter((el) => el.id === stateObject.id)[0]);
    setFebruary(q12.data?.filter((el) => el.id === stateObject.id)[0]);
    setLoader(false);
  };

  useEffect(() => {}, [
    month,
    index,
    prevJanuary,
    prevFebruary,
    march,
    april,
    may,
    june,
    july,
    august,
    september,
    october,
    november,
    december,
    january,
    february,
  ]);
  useEffect(() => {
    document.title = `PAYSLIP OF ${tname?.toUpperCase()} OF ${school?.toUpperCase()} FOR THE MONTH OF ${lastmonth?.toUpperCase()}`;
    if (!state) {
      router.push("/login");
    }
    getSalary();
  }, []);

  return (
    <Suspense>
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
            document={
              <WBTPTAPaySLip
                data={{
                  tname,
                  desig,
                  school,
                  empid,
                  pan,
                  ir,
                  addl,
                  da,
                  hra,
                  ma,
                  gross,
                  ptax,
                  gsli,
                  udise,
                  month,
                  netpay,
                  basicpay,
                  pfund,
                  level,
                  cell,
                  deduction,
                  year,
                }}
              />
            }
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
            onChange={(e) => {
              if (e.target.value !== "") {
                setMonth(e.target.value.split("-")[0]);
                setYear(e.target.value.split("-")[1]);
                setIndex(parseInt(e.target.value.split("-")[2]));
              } else {
                toast.error("Please select a valid month");
              }
            }}
          >
            <option value="">Select Month </option>
            {PAYSLIPMONTHS.map((el, ind) => {
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
                <p className="text-center fs-5">{tname}</p>
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
                {level}, {cell}
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
                {desig}
              </th>
              <th
                style={{
                  border: "1px solid",
                  textAlign: "center",
                  fontSize: "16px",
                }}
              >
                {empid}
              </th>
              <th
                style={{
                  border: "1px solid",
                  textAlign: "center",
                  fontSize: "16px",
                }}
              >
                {pan}
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
                  {school}, UDISE:({udise})
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
                  <br /> This Payslip is Only For Reference Purpose. It can not
                  be used as a Valid Proof of Salary. Please Use Payslip which
                  is available form SIS Office as a Valid Salary Proof.
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
                {basicpay}
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
                {pfund}
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
                {addl}
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
                {ptax}
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
                {da}
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
                {gsli}
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
                {hra}
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
                {ma}
              </td>
            </tr>
            {dataYear === 2024 && index === 6 && (
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
                  {ir}
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
                {gross}
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
                {deduction}
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
                {netpay}
              </td>
              <td
                style={{
                  border: "1px solid",
                  textAlign: "center",
                  fontSize: "16px",
                }}
                colSpan="4"
              >
                {NumInWords(netpay)}
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
    </Suspense>
  );
};

export default PayslipWbtpta;
