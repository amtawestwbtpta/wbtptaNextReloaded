"use client";
import ropa from "../../modules/ropa";
import React, { Suspense, useEffect, useState } from "react";
import { useGlobalContext } from "../../context/Store";
import { useRouter } from "next/navigation";
import {
  INR,
  GetMonthName,
  printDate,
  readCSVFile,
} from "../../modules/calculatefunctions";
import OSMSPaySLip from "../../pdfs/OSMSPaySLip";
import dynamic from "next/dynamic";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
const PaySlipOsmsNew = () => {
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
    if (!state) {
      router.push("/login");
    }
    getModifiedSalary(month, year);
  }, []);
  return (
    <Suspense>
      <div>
        {loader ? (
          <Loader />
        ) : (
          <div>
            <div className="mx-auto my-3 noprint">
              <button
                type="button"
                className="btn btn-info text-white font-weight-bold p-2 m-2 rounded"
                onClick={() => router.back()}
              >
                Go Back
              </button>
              <button
                type="button"
                className="btn btn-success text-white font-weight-bold p-2 m-2 rounded"
                onClick={() => {
                  router.push(
                    `/downloadOsmsPayslip?data=${JSON.stringify(salary)}&key=${
                      process.env.NEXT_PUBLIC_ANYKEY
                    }`
                  );
                }}
              >
                Go To Download
              </button>
              <div className="mx-auto my-5">
                <PDFDownloadLink
                  document={<OSMSPaySLip data={salary} />}
                  fileName={`PAYSLIP OF ${tname?.toUpperCase()} OF ${school?.toUpperCase()} FOR THE MONTH OF ${month.toUpperCase()} ${year}.pdf`}
                  style={{
                    textDecoration: "none",
                    padding: 11,
                    color: "#fff",
                    backgroundColor: "purple",
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

            <div
              className="containermain"
              style={{
                margin: 0,
                padding: 50,
                maxWidth: "960px",
                zoom: 0.9,
                whiteSpace: "nowrap",
                color: "#000",
              }}
            >
              <div className="main" style={{ zoom: "1.3" }}>
                <div
                  className="top"
                  style={{ fontSize: "smaller", margin: "10px auto" }}
                >
                  <div>
                    <img
                      className="img2"
                      src="https://firebasestorage.googleapis.com/v0/b/awwbtpta.appspot.com/o/images%2Fiosms.png?alt=media&token=f21c8d21-ac4e-4f2e-b416-2064d91ffe4f"
                      style={{ position: "absolute", width: 80, left: 51 }}
                      alt="OSMS LOGO"
                    />
                  </div>
                  <div
                    className="heading dejavu"
                    style={{
                      margin: "auto",
                      width: "100%",
                      marginLeft: 38,
                    }}
                  >
                    <h5 style={{ textAlign: "center", marginLeft: -54 }}>
                      GOVT. OF WEST BENGAL
                    </h5>
                    <h6 style={{ textAlign: "center", marginLeft: -54 }}>
                      OFFICE OF THE SUB INSPECTOR OF SCHOOLS
                    </h6>
                    <h6
                      style={{
                        textAlign: "center",
                        marginLeft: -54,
                        color: "#004080",
                      }}
                    >
                      AMTA WEST CIRCLE, HAORA
                    </h6>
                    <h6 style={{ textAlign: "center", marginLeft: -54 }}>
                      PAY SLIP FOR THE MONTH OF {month.toUpperCase()},{year}
                    </h6>
                  </div>
                </div>

                <button
                  type="button"
                  className="btn btn-primary text-white font-weight-bold p-2 rounded noprint"
                  onClick={() => {
                    if (typeof window !== undefined) {
                      window.print();
                    }
                  }}
                >
                  Print Payslip
                </button>

                <div
                  className="dejaVuCondensed"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    fontSize: "0.6rem",
                    marginTop: 15,
                    marginBottom: 10,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      textAlign: "left",
                    }}
                  >
                    <p>
                      <b>EMPLOYEE NAME:&nbsp;</b>
                      {tname}
                    </p>
                    <p>
                      <b>SCHOOL NAME:&nbsp;</b>
                      {school}(<b>UDISE:&nbsp;</b>
                      {udise})
                    </p>
                    <p>
                      <b>LEVEL:&nbsp;</b>
                      {level}&nbsp;<b>CELL:&nbsp;</b>
                      {cell}
                    </p>
                  </div>
                  <div
                    className="idDiv"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      textAlign: "left",
                    }}
                  >
                    <p>
                      <b>EMPLOYEE ID:&nbsp;</b>
                      {empid}
                    </p>
                    <p>
                      <b>DESIGNATION:&nbsp;</b>
                      {desig}
                    </p>
                    <p>
                      <b>PAN:&nbsp;</b>
                      {pan}
                    </p>
                  </div>
                </div>

                <table
                  className="myTable dejaVuCondensed"
                  style={{
                    border: "1px solid gray",
                    fontSize: "0.9rem",
                    borderCollapse: "separate",
                    borderSpacing: 1,
                  }}
                  suppressHydrationWarning
                >
                  <tr className="dejavu">
                    <th
                      style={{
                        borderRight: "1px solid gray",
                        borderBottom: "1px solid gray",
                        padding: "2px 0 2px 0",
                        textAlign: "center",
                        borderCollapse: "separate",
                        borderSpacing: 1,
                      }}
                      colSpan="2"
                    >
                      EARNING(Rs)
                    </th>
                    <th
                      style={{
                        borderRight: "1px solid gray",
                        borderBottom: "1px solid gray",
                        padding: "2px 0 2px 0",
                        textAlign: "center",
                        borderCollapse: "separate",
                        borderSpacing: 1,
                      }}
                      colSpan="2"
                    >
                      DEDUCTION(Rs)
                    </th>
                    <th
                      style={{
                        borderRight: "1px solid gray",
                        borderBottom: "1px solid gray",
                        padding: "2px 0 2px 0",
                        textAlign: "center",
                        borderCollapse: "separate",
                        borderSpacing: 1,
                      }}
                      colSpan="2"
                    >
                      RECOVERIES OF LOAN(Rs)
                    </th>
                    <th
                      style={{
                        borderBottom: "1px solid gray",
                        padding: "2px 0 2px 0",
                        textAlign: "center",
                        borderCollapse: "separate",
                        borderSpacing: 1,
                      }}
                      colSpan="2"
                    >
                      OUT/ACCT.DED (Rs)
                    </th>
                  </tr>
                  <tr>
                    {desig === "AT" ? (
                      <>
                        <th style={{ textAlign: "left" }}>
                          <table className="dejaVuCondensed">
                            <tr>
                              <th>BASIC</th>
                            </tr>
                            <tr>
                              <th>DA</th>
                            </tr>
                            <tr>
                              <th>HRA</th>
                            </tr>
                            <tr>
                              <th>MA</th>
                            </tr>
                            <tr>
                              <th>CA</th>
                            </tr>
                            <tr>
                              <th>CPF</th>
                            </tr>
                            <tr>
                              <th>IR</th>
                            </tr>
                          </table>
                        </th>
                        <td
                          className="dejaVuCondensed"
                          style={{
                            textAlign: "left",
                            paddingRight: "16pt",
                            borderRight: "1px solid gray",
                            borderCollapse: "separate",
                            borderSpacing: 1,
                          }}
                        >
                          <table
                            style={{
                              marginRight: -20,
                            }}
                          >
                            <tr>
                              <td style={{ textAlign: "right" }}>
                                {salary.basicpay}
                              </td>
                            </tr>
                            <tr>
                              <td style={{ textAlign: "right" }}>
                                {salary.da}
                              </td>
                            </tr>
                            <tr>
                              <td style={{ textAlign: "right" }}>
                                {salary.hra}
                              </td>
                            </tr>
                            <tr>
                              <td style={{ textAlign: "right" }}>
                                {salary.ma}
                              </td>
                            </tr>
                            <tr>
                              <td style={{ textAlign: "right" }}>0</td>
                            </tr>
                            <tr>
                              <td style={{ textAlign: "right" }}>0</td>
                            </tr>
                            <tr>
                              <td style={{ textAlign: "right" }}>
                                {year === 2024 && index === 6 ? salary.ir : 0}
                              </td>
                            </tr>
                          </table>
                        </td>
                        <th style={{ textAlign: "left" }}>
                          <table className="dejavu">
                            <tr>
                              <th>GPF</th>
                            </tr>
                            <tr>
                              <th>PF LOAN</th>
                            </tr>
                            <tr>
                              <th>CPF DEDUCT</th>
                            </tr>
                            <tr>
                              <th>PT</th>
                            </tr>
                            <tr>
                              <th>IT</th>
                            </tr>
                            <tr>
                              <th>GSLI</th>
                            </tr>
                            <tr>
                              <th>OVERDRAWN</th>
                            </tr>
                          </table>
                        </th>
                        <td
                          className="dejaVuCondensed"
                          style={{
                            textAlign: "center",
                            borderRight: "1px solid gray",
                            borderCollapse: "separate",
                            borderSpacing: 1,
                          }}
                        >
                          <table style={{ marginRight: "5px" }}>
                            <tr>
                              <td style={{ textAlign: "right" }}>
                                {salary.pfund}
                              </td>
                            </tr>
                            <tr>
                              <td style={{ textAlign: "right" }}>0</td>
                            </tr>
                            <tr>
                              <td style={{ textAlign: "right" }}>0</td>
                            </tr>
                            <tr>
                              <td style={{ textAlign: "right" }}>
                                {salary.ptax}
                              </td>
                            </tr>
                            <tr>
                              <td style={{ textAlign: "right" }}>0</td>
                            </tr>
                            <tr>
                              <td style={{ textAlign: "right" }}>
                                {salary.gsli}
                              </td>
                            </tr>
                            <tr>
                              <td style={{ textAlign: "right" }}>0</td>
                            </tr>
                          </table>
                        </td>
                        <td
                          style={{
                            textAlign: "right",
                            borderRight: "1px solid gray",
                          }}
                        >
                          <table style={{ marginRight: 1 }}></table>
                        </td>
                      </>
                    ) : (
                      <>
                        <th className="dejavu" style={{ textAlign: "left" }}>
                          <table>
                            <tr>
                              <th>BASIC</th>
                            </tr>
                            <tr>
                              <th>ADDL. REMUN.</th>
                            </tr>
                            <tr>
                              <th>DA</th>
                            </tr>
                            <tr>
                              <th>HRA</th>
                            </tr>
                            <tr>
                              <th>MA</th>
                            </tr>
                            <tr>
                              <th>CA</th>
                            </tr>
                            <tr>
                              <th>CPF</th>
                            </tr>
                            <tr>
                              <th>IR</th>
                            </tr>
                          </table>
                        </th>
                        <td
                          className="dejaVuCondensed"
                          style={{
                            textAlign: "left",
                            borderRight: "1px solid gray",
                            paddingRight: "20pt",
                            borderCollapse: "separate",
                            borderSpacing: 1,
                          }}
                        >
                          <table style={{ marginRight: -20 }}>
                            <tr>
                              <td style={{ textAlign: "right" }}>
                                {salary.basicpay}
                              </td>
                            </tr>
                            <tr>
                              <td style={{ textAlign: "right" }}>
                                {salary.addl}
                              </td>
                            </tr>
                            <tr>
                              <td style={{ textAlign: "right" }}>
                                {salary.da}
                              </td>
                            </tr>
                            <tr>
                              <td style={{ textAlign: "right" }}>
                                {salary.hra}
                              </td>
                            </tr>
                            <tr>
                              <td style={{ textAlign: "right" }}>
                                {salary.ma}
                              </td>
                            </tr>
                            <tr>
                              <td style={{ textAlign: "right" }}>0</td>
                            </tr>
                            <tr>
                              <td style={{ textAlign: "right" }}>0</td>
                            </tr>
                            <tr>
                              <td style={{ textAlign: "right" }}>
                                {year === 2024 && index === 6 ? salary.ir : 0}
                              </td>
                            </tr>
                          </table>
                        </td>
                        <th
                          style={{
                            textAlign: "left",
                            // paddingRight: "6pt",
                            paddingTop: "20pt",
                          }}
                        >
                          <table className="dejavu">
                            <tr>
                              <th>GPF</th>
                            </tr>
                            <tr>
                              <th>PF LOAN</th>
                            </tr>
                            <tr>
                              <th>CPF DEDUCT</th>
                            </tr>
                            <tr>
                              <th>PT</th>
                            </tr>
                            <tr>
                              <th>IT</th>
                            </tr>
                            <tr>
                              <th>GSLI</th>
                            </tr>
                            <tr>
                              <th>OVERDRAWN</th>
                            </tr>
                          </table>
                        </th>
                        <td
                          className="dejaVuCondensed"
                          style={{
                            textAlign: "right",
                            paddingRight: "6pt",
                            paddingTop: "20pt",
                            borderRight: "1px solid gray",
                          }}
                        >
                          <table>
                            <tr>
                              <td style={{ textAlign: "right" }}>
                                {salary.pfund}
                              </td>
                            </tr>
                            <tr>
                              <td style={{ textAlign: "right" }}>0</td>
                            </tr>
                            <tr>
                              <td style={{ textAlign: "right" }}>0</td>
                            </tr>
                            <tr>
                              <td style={{ textAlign: "right" }}>
                                {salary.ptax}
                              </td>
                            </tr>
                            <tr>
                              <td style={{ textAlign: "right" }}>0</td>
                            </tr>
                            <tr>
                              <td style={{ textAlign: "right" }}>
                                {salary.gsli}
                              </td>
                            </tr>
                            <tr>
                              <td style={{ textAlign: "right" }}>0</td>
                            </tr>
                          </table>
                        </td>
                        <td
                          style={{
                            textAlign: "right",
                            borderRight: "1px solid gray",
                          }}
                        >
                          <table style={{ marginRight: 1 }}></table>
                        </td>
                      </>
                    )}
                  </tr>
                  <tr className="dejavu">
                    <th
                      colSpan="2"
                      style={{
                        borderTop: "1px solid gray",
                        borderCollapse: "separate",
                        borderSpacing: 1,
                      }}
                    >
                      <table className="dejavu">
                        <tr>
                          <th style={{ textAlign: "left" }}>Total:</th>
                          <th style={{ textAlign: "right" }}>{salary.gross}</th>
                        </tr>
                      </table>
                    </th>

                    <th
                      colSpan="2"
                      style={{
                        textAlign: "right",
                        paddingRight: "6pt",
                        borderTop: "1px solid gray",
                        borderCollapse: "separate",
                        borderSpacing: 1,
                      }}
                    >
                      {salary.deduction}
                    </th>

                    <th
                      colSpan="2"
                      style={{
                        borderTop: "1px solid gray",
                        borderCollapse: "separate",
                        borderSpacing: 1,
                      }}
                    ></th>
                    <th
                      colSpan="2"
                      style={{
                        borderTop: "1px solid gray",
                        borderCollapse: "separate",
                        borderSpacing: 1,
                      }}
                    ></th>
                  </tr>
                  <tr>
                    <td
                      colSpan="8"
                      style={{
                        borderTop: "1px solid gray",
                        borderCollapse: "separate",
                        borderSpacing: 1,
                      }}
                    >
                      <table className="dejavu">
                        <tr>
                          <th style={{ textAlign: "left", width: 85 }}>
                            GROSS PAY:
                          </th>
                          <th style={{ textAlign: "left" }}>{salary.gross}</th>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td
                      colSpan="8"
                      style={{
                        borderTop: "1px solid gray",
                        borderCollapse: "separate",
                        borderSpacing: 1,
                      }}
                    >
                      <table className="dejavu">
                        <tr>
                          <th style={{ textAlign: "left", width: 85 }}>
                            NET PAY:
                          </th>
                          <th style={{ textAlign: "left" }}>
                            {salary.netpay} ({INR(salary.netpay)})
                          </th>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="8">
                      <table className="dejavu">
                        <tr>
                          <th>
                            Transferred to {bank} Account no {account} &emsp;
                            IFS Code {ifsc}
                          </th>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </div>
              <div
                className="disclaimer dejaVuCondensed"
                style={{ margin: "50px auto 300px 2px", textAlign: "left" }}
              >
                <p style={{ margin: "10px" }}>
                  GP: Grade Pay, DA: Dearness Allowance, HRA: House Rent
                  Allowance, MA: Medical Allowance, CA: Conveyance Allowance,
                </p>
                <p style={{ margin: "10px" }}>
                  CPF: Contributory Provident Fund, GPF: General Provident Fund,
                  PT: Professional Tax, IT: Income Tax,
                </p>
                <p style={{ margin: "10px" }}>
                  GSLI: Group Savings Linked Insurance, IR: Interim Relief.
                </p>
              </div>
              <div
                className="disclaimer2 dejaVuCondensed"
                style={{ margin: "20px auto 10px 10px", textAlign: "left" }}
              >
                <p style={{ fontSize: "medium" }}>
                  <span className="dejavu" style={{ fontSize: "medium" }}>
                    Disclaimer:
                  </span>{" "}
                  This is a computer generated Pay Slip and hence does not
                  require any signature.
                </p>
              </div>
              <div
                className="hr"
                style={{
                  height: 2,
                  borderTop: "1px solid",
                  width: "100%",
                  margin: "auto",
                }}
              ></div>
              <div
                className="footer dejavu"
                style={{
                  margin: "auto",
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <p>
                    <b>
                      <i>osms.wbsed.gov.in</i>
                    </b>
                  </p>
                </div>
                <div>
                  <p>
                    <b>
                      <i>Page-1</i>
                    </b>
                  </p>
                </div>
                <div>
                  <p>
                    <b>
                      <i>Date of Generation: {printDate()}</i>
                    </b>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Suspense>
  );
};

export default PaySlipOsmsNew;
