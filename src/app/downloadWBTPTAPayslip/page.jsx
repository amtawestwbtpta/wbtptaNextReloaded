"use client";
import ropa from "../../modules/ropa";
import React, { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  GetMonthName,
  months,
  readCSVFile,
  RoundTo,
} from "../../modules/calculatefunctions";
import { DA, HRA, NEXTDA } from "../../modules/constants";
import dynamic from "next/dynamic";
import WBTPTAPaySLip from "../../components/WBTPTAPaySLip";
import axios from "axios";
import { decryptObjData, getCookie } from "../../modules/encryption";
import { toast } from "react-toastify";
export default function Page() {
  const PDFDownloadLink = dynamic(
    async () =>
      await import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
    {
      ssr: false,
      loading: () => <p>Please Wait...</p>,
    }
  );
  const thisYear = new Date().getFullYear();
  const nextYear = thisYear + 1;
  const preYear = thisYear - 1;
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
  const paySlipArray = thisYearMonths
    .slice(0, lastMonthIndex)
    .reverse()
    .concat(preYearMonths.reverse());
  const searchParams = useSearchParams();
  const data = JSON.parse(searchParams.get("data"));
  const router = useRouter();
  let details = data;
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
      const cmonth = e.target.value.split("-")[0];
      const cyear = parseInt(e.target.value.split("-")[1]);
      const cindex = parseInt(e.target.value.split("-")[2]);
      setMonth(cmonth);
      setYear(cyear);
      setIndex(cindex);
      getModifiedSalary(cmonth, cyear);
    } else {
      toast.error("Please select a valid month");
    }
  };
  const getModifiedSalary = async (month, year) => {
    setLoader(true);
    const q1 = await readCSVFile(`${month.toLowerCase()}-${year}`);
    const q2 = await readCSVFile(`april-2024`);
    const monthSalary = q1?.filter((el) => el.id === id)[0];
    const aprilSalary = q2?.filter((el) => el.id === id)[0];
    if (month === "July" && year === 2024 && aprilSalary?.basic > 0) {
      ir = Math.round(aprilSalary?.basic * 0.04);
    } else {
      ir = 0;
    }
    basicpay = monthSalary?.basic;
    da = Math.round(basicpay * monthSalary?.daPercent);
    hra = Math.round(basicpay * monthSalary?.hraPercent);
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
      year: parseInt(year),
      index: parseInt(index),
    });
    setLoader(false);
  };
  useEffect(() => {
    //eslint-disable-next-line
  }, [month, index, year, salary]);
  useEffect(() => {
    document.title = `PAYSLIP OF ${tname?.toUpperCase()} OF ${school?.toUpperCase()} FOR THE MONTH OF ${lastmonth?.toUpperCase()}`;

    getModifiedSalary(month, year);
    // eslint-disable-next-line
  }, []);
  let mydetails = getCookie("tid");
  let myData, circle;
  if (mydetails) {
    myData = decryptObjData("tid");
    circle = myData?.circle;
  }
  // useEffect(() => {
  //   if (circle !== "admin") {
  //     setTimeout(() => {
  //       router.push("/");
  //     }, 2000);
  //     return;
  //   }
  //   //eslint-disable-next-line
  // }, []);
  return (
    <Suspense>
      <div>
        <div className="mx-auto my-3 noprint">
          <button
            type="button"
            className="btn btn-info text-white font-weight-bold p-2 rounded"
            onClick={() => router.back()}
          >
            Go Back
          </button>
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
        <PDFDownloadLink
          document={<WBTPTAPaySLip data={salary} />}
          fileName={`PAYSLIP OF ${tname?.toUpperCase()} OF ${school?.toUpperCase()} FOR THE MONTH OF ${month.toUpperCase()}.pdf`}
          style={{
            textDecoration: "none",
            padding: "10px",
            color: "#fff",
            backgroundColor: "navy",
            border: "1px solid #4a4a4a",
            width: "40%",
            borderRadius: 10,
          }}
        >
          {({ blob, url, loading, error }) =>
            loading ? "Please Wait..." : "Download Payslip"
          }
        </PDFDownloadLink>
        {/* <h3 className="text-danger">This Service is Temporary Unavailable</h3> */}
      </div>
    </Suspense>
  );
}
