"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "../../context/Store";
import Link from "next/link";
import { DA, HRA, NEXTDA, PREV6DA, PREVDA } from "../../modules/constants";
import {
  GetMonthName,
  RoundTo,
  months,
  readCSVFile,
} from "../../modules/calculatefunctions";
import ropa from "../../modules/ropa";
import axios from "axios";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
const TechSalary = () => {
  const { state, stateArray, setStateObject } = useGlobalContext();
  const router = useRouter();
  const [filteredData, setFilteredData] = useState([]);
  const [school, setSchool] = useState("");
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
  const [month, setMonth] = useState(
    GetMonthName(today.getMonth() === 0 ? 11 : today.getMonth() - 1)
  );
  const [year, setYear] = useState(today.getFullYear());

  const lastMonthIndex = today.getMonth() === 11 ? 11 : today.getMonth() + 1;
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

  const [monthSalary, setMonthSalary] = useState([]);
  const [aprilSalary, setAprilSalary] = useState([]);
  const handleChange = async (e) => {
    if (e.target.value !== "") {
      const month = e.target.value.split("-")[0];
      const year = parseInt(e.target.value.split("-")[1]);
      setMonth(month);
      setYear(year);

      await getModifiedSalary(month, year);
    } else {
      toast.error("Please select a valid month");
    }
  };

  const getModifiedSalary = async (month, year) => {
    setLoader(true);
    const q1 = await readCSVFile(`${month.toLowerCase()}-${year}`);
    const q2 = await readCSVFile(`april-2024`);
    setLoader(false);
    setMonthSalary(q1);
    setAprilSalary(q2);
  };

  useEffect(() => {
    if (!state) {
      router.push("/login");
    }
    setFilteredData(stateArray);
    setSchool(stateArray[0]?.school);
    getModifiedSalary(month, year);
    document.title = `All Teacher's Salary Data of ${stateArray[0]?.school}`;
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    // eslint-disable-next-line
  }, [monthSalary, aprilSalary]);

  return (
    <div className="container-fluid my-5">
      {loader ? (
        <Loader />
      ) : (
        <>
          <div className="table-resposive text-center my-2">
            <div className="mx-auto my-3 col-md-2 noprint">
              <h6 className="text-primary">Select Salary Month:</h6>
              <select
                className="form-select form-select-sm mb-3"
                aria-label=".form-select-sm example"
                name="Month"
                required
                defaultValue={month + "-" + year}
                onChange={handleChange}
              >
                <option value="">Select Month </option>
                {paySlipArray.map((el, ind) => {
                  return (
                    <option value={el} key={ind}>
                      {el}
                    </option>
                  );
                })}
              </select>
            </div>
            <h3 className="text-center text-primary">
              All Teacher's Salary Data for The Month of {month.toUpperCase()}'{" "}
              {year} of {school}
            </h3>
            <div className="table-resposive-md" style={{ overflowX: "scroll" }}>
              <table className="table table-hover table-sm table-bordered border-black border-1 align-middle table-responsive text-center">
                <thead>
                  <tr>
                    <th className="text-center" style={{ border: "1px solid" }}>
                      SL. NO.
                    </th>
                    <th className="text-center" style={{ border: "1px solid" }}>
                      TEACHER'S NAME
                    </th>
                    <th className="text-center" style={{ border: "1px solid" }}>
                      DESIGNATION
                    </th>
                    <th className="text-center" style={{ border: "1px solid" }}>
                      BASIC PAY
                    </th>
                    <th className="text-center" style={{ border: "1px solid" }}>
                      ADDL.
                      <br />
                      ALLOWANCE
                    </th>
                    <th className="text-center" style={{ border: "1px solid" }}>
                      DA
                    </th>
                    <th className="text-center" style={{ border: "1px solid" }}>
                      HRA
                    </th>
                    <th className="text-center" style={{ border: "1px solid" }}>
                      MA
                    </th>
                    {month === "July" && year === 2024 && (
                      <th
                        className="text-center"
                        style={{ border: "1px solid" }}
                      >
                        IR
                      </th>
                    )}
                    <th className="text-center" style={{ border: "1px solid" }}>
                      GROSS PAY
                    </th>
                    <th className="text-center" style={{ border: "1px solid" }}>
                      GPF
                    </th>
                    <th className="text-center" style={{ border: "1px solid" }}>
                      GSLI
                    </th>
                    <th className="text-center" style={{ border: "1px solid" }}>
                      PTAX
                    </th>
                    <th className="text-center" style={{ border: "1px solid" }}>
                      NETPAY
                    </th>
                    <th
                      className="noprint text-center"
                      style={{ border: "1px solid" }}
                    >
                      PRINT PAYSLIP
                    </th>
                  </tr>
                </thead>
                <tbody id="tbody">
                  {filteredData.map((el, ind) => {
                    let tname,
                      id,
                      desig,
                      school,
                      disability,
                      empid,
                      pan,
                      addl,
                      da,
                      hra,
                      ma,
                      gross,
                      pfund,
                      ptax,
                      gsli,
                      ir;
                    tname = el.tname;
                    id = el.id;
                    desig = el.desig;
                    school = el.school;
                    disability = el.disability;
                    empid = el.empid;
                    pan = el.pan;
                    let netpay;
                    let basicpay;

                    const techersSalary = monthSalary?.filter(
                      (el) => el.id === id
                    )[0];
                    const teachersAprilSalary = aprilSalary?.filter(
                      (el) => el.id === id
                    )[0];
                    if (
                      month === "July" &&
                      year === 2024 &&
                      teachersAprilSalary?.basic > 0
                    ) {
                      ir = Math.round(teachersAprilSalary?.basic * 0.04);
                    } else {
                      ir = 0;
                    }
                    basicpay = techersSalary?.basic;
                    da = Math.round(basicpay * techersSalary?.daPercent);
                    // hra = Math.round(basicpay * techersSalary?.hraPercent);
                    hra =
                      techersSalary?.hraPercent > 10
                        ? techersSalary?.hraPercent
                        : Math.round(basicpay * techersSalary?.hraPercent);
                    addl = techersSalary?.addl;
                    ma = techersSalary?.ma;
                    pfund = techersSalary?.gpf;
                    gsli = techersSalary?.gsli;
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
                    return (
                      basicpay !== 0 &&
                      basicpay !== undefined && (
                        <tr key={el.id}>
                          <td
                            className="text-center"
                            style={{ border: "1px solid" }}
                          >
                            {ind + 1}
                          </td>
                          <td
                            className="text-center"
                            style={{ border: "1px solid" }}
                          >
                            {el.tname}
                          </td>
                          <td
                            className="text-center"
                            style={{ border: "1px solid" }}
                          >
                            {el.desig}
                          </td>
                          <td
                            className="text-center"
                            style={{ border: "1px solid" }}
                          >
                            {basicpay}
                          </td>
                          <td
                            className="text-center"
                            style={{ border: "1px solid" }}
                          >
                            {addl}
                          </td>
                          <td
                            className="text-center"
                            style={{ border: "1px solid" }}
                          >
                            {da}
                          </td>
                          <td
                            className="text-center"
                            style={{ border: "1px solid" }}
                          >
                            {hra}
                          </td>
                          <td
                            className="text-center"
                            style={{ border: "1px solid" }}
                          >
                            {ma}
                          </td>
                          {ir > 0 && (
                            <td
                              className="text-center"
                              style={{ border: "1px solid" }}
                            >
                              {ir}
                            </td>
                          )}
                          <td
                            className="text-center"
                            style={{ border: "1px solid" }}
                          >
                            {gross}
                          </td>
                          <td
                            className="text-center"
                            style={{ border: "1px solid" }}
                          >
                            {pfund}
                          </td>
                          <td
                            className="text-center"
                            style={{ border: "1px solid" }}
                          >
                            {gsli}
                          </td>
                          <td
                            className="text-center"
                            style={{ border: "1px solid" }}
                          >
                            {ptax}
                          </td>
                          <td
                            className="text-center"
                            style={{ border: "1px solid" }}
                          >
                            {netpay}
                          </td>
                          <th
                            className="noprint text-center"
                            style={{ border: "1px solid" }}
                          >
                            {state === "admin" ||
                            el.association === "WBTPTA" ? (
                              <Link
                                className="btn btn-info m-1 text-decoration-none"
                                href={`/payslipwbtptaNew`}
                                onClick={() => setStateObject(el)}
                              >
                                PRINT PAYSLIP
                              </Link>
                            ) : null}
                            {state === "admin" ||
                            el.association === "WBTPTA" ? (
                              <Link
                                className="btn btn-primary m-1 text-decoration-none"
                                href={`/HRADeclaration`}
                                onClick={() => setStateObject(el)}
                              >
                                HRA Declaration
                              </Link>
                            ) : null}
                            {state === "admin" ? (
                              <Link
                                className="btn btn-success m-1 text-decoration-none"
                                href={`/paysliposmsNew`}
                                onClick={() => setStateObject(el)}
                              >
                                OSMS PAYSLIP
                              </Link>
                            ) : null}
                          </th>
                        </tr>
                      )
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
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
              Print Statement
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
          <div className="mx-auto my-3 noprint">
            <button
              type="button"
              className="btn btn-success  p-2 rounded"
              onClick={() => {
                router.push(`/TeacherPhotoCorner`);
              }}
            >
              Teacher's Photo Corner
            </button>
          </div>
          <div className="mx-auto my-3 noprint">
            <button
              type="button"
              className="btn btn-info  p-2 rounded"
              onClick={() => {
                router.push(`/TechersAccuitance`);
              }}
            >
              Teacher's Accuitance
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TechSalary;
