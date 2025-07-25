"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "../../context/Store";
import {
  months,
  readCSVFile,
  titleCase,
} from "../../modules/calculatefunctions";
import { DA, HRA, PREV6DA, PREVDA } from "../../modules/constants";
import axios from "axios";
import Loader from "../../components/Loader";
const TechersAccuitance = () => {
  const { state, stateArray } = useGlobalContext();
  const router = useRouter();
  const [filteredData, setFilteredData] = useState([]);
  const [mainData, setMainData] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [school, setSchool] = useState("");
  const [editTeacher, setEditTeacher] = useState({});
  const [year, setYear] = useState(new Date().getFullYear() - 1);
  useEffect(() => {
    if (!state) {
      router.push("/logout");
    }

    // eslint-disable-next-line
  }, []);

  const [march, setMarch] = useState([]);
  const [april, setApril] = useState([]);
  const [may, setMay] = useState([]);
  const [june, setJune] = useState([]);
  const [july, setJuly] = useState([]);
  const [august, setAugust] = useState([]);
  const [september, setSeptember] = useState([]);
  const [october, setOctober] = useState([]);
  const [november, setNovember] = useState([]);
  const [december, setDecember] = useState([]);
  const [january, setJanuary] = useState([]);
  const [february, setFebruary] = useState([]);
  const getModifiedSalary = async (year) => {
    setShowTable(false);
    const q1 = await readCSVFile(`january-${year}`);
    const q2 = await readCSVFile(`february-${year}`);
    const q3 = await readCSVFile(`march-${year}`);
    const q4 = await readCSVFile(`april-${year}`);
    const q5 = await readCSVFile(`may-${year}`);
    const q6 = await readCSVFile(`june-${year}`);
    const q7 = await readCSVFile(`july-${year}`);
    const q8 = await readCSVFile(`august-${year}`);
    const q9 = await readCSVFile(`september-${year}`);
    const q10 = await readCSVFile(`october-${year}`);
    const q11 = await readCSVFile(`november-${year}`);
    const q12 = await readCSVFile(`december-${year}`);

    setJanuary(q1);
    setFebruary(q2);
    setMarch(q3);
    setApril(q4);
    setMay(q5);
    setJune(q6);
    setJuly(q7);
    setAugust(q8);
    setSeptember(q9);
    setOctober(q10);
    setNovember(q11);
    setDecember(q12);
    setShowTable(true);
  };
  useEffect(() => {
    let monthArray = [
      { month: "January", value: true },
      { month: "February", value: true },
      { month: "March", value: true },
      { month: "April", value: true },
      { month: "May", value: true },
      { month: "June", value: true },
      { month: "July", value: true },
      { month: "August", value: true },
      { month: "September", value: true },
      { month: "October", value: true },
      { month: "November", value: true },
      { month: "December", value: true },
    ];
    let x = [];

    stateArray.map((el) => {
      let mainObj = el;
      let newObj = { ...mainObj, monthData: monthArray };
      return x.push(newObj);
    });
    setFilteredData(x);
    setMainData(x);
    setSchool(stateArray[0]?.school);
    setShowTable(true);
    document.title = `Accuitance Register of ${
      stateArray[0]?.school
    } for the Year ${
      new Date().getFullYear() - 1
    }- ${new Date().getFullYear()}`;
    // eslint-disable-next-line
  }, [stateArray]);

  useEffect(() => {
    // eslint-disable-next-line
  }, [
    year,
    filteredData,
    mainData,
    january,
    february,
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
  ]);
  useEffect(() => {
    // getSalary();
    getModifiedSalary(year);
    // eslint-disable-next-line
  }, []);

  return (
    <div className="container-fluid my-5">
      {showTable ? (
        <>
          <div className="table-resposive text-center my-2">
            <div className="noprint my-3 mx-auto">
              <h3 className="text-center text-primary">
                Acquittance Register of {titleCase(school)} for the Year {year}
              </h3>
              <div
                className="rounded p-2 col-md-4 mx-auto"
                style={{ backgroundColor: "#a19e9d" }}
              >
                <h4 className="text-black">Select Year</h4>
                <button
                  type="button"
                  className="btn btn-primary m-2"
                  onClick={() => {
                    setYear(new Date().getFullYear() - 2);
                    getModifiedSalary(new Date().getFullYear() - 2);
                    if (typeof window !== undefined) {
                      let trList = document.querySelectorAll("tr");
                      let divList = document.querySelectorAll("div");
                      for (let i = 0; i < trList.length; i++) {
                        trList[i].classList.remove("d-none");
                      }
                      for (let i = 0; i < divList.length; i++) {
                        divList[i].classList.remove("d-none");
                      }
                    }
                  }}
                >
                  {new Date().getFullYear() - 2}
                </button>
                <button
                  type="button"
                  className="btn btn-success m-2"
                  onClick={() => {
                    setYear(new Date().getFullYear() - 1);
                    getModifiedSalary(new Date().getFullYear() - 1);
                    if (typeof window !== undefined) {
                      let trList = document.querySelectorAll("tr");
                      let divList = document.querySelectorAll("div");
                      for (let i = 0; i < trList.length; i++) {
                        trList[i].classList.remove("d-none");
                      }
                      for (let i = 0; i < divList.length; i++) {
                        divList[i].classList.remove("d-none");
                      }
                    }
                  }}
                >
                  {new Date().getFullYear() - 1}
                </button>
                <button
                  type="button"
                  className="btn btn-warning m-2"
                  onClick={() => {
                    setYear(new Date().getFullYear());
                    getModifiedSalary(new Date().getFullYear());
                    if (typeof window !== undefined) {
                      let trList = document.querySelectorAll("tr");
                      let divList = document.querySelectorAll("div");
                      for (let i = 0; i < trList.length; i++) {
                        trList[i].classList.remove("d-none");
                      }
                      for (let i = 0; i < divList.length; i++) {
                        divList[i].classList.remove("d-none");
                      }
                    }
                  }}
                >
                  {new Date().getFullYear()}
                </button>
              </div>

              <div
                className="rounded p-2 m-2 col-md-4 mx-auto"
                style={{ backgroundColor: "#a19e9d" }}
              >
                <h4 className="text-black">Remove Teacher</h4>
                <table className="table table-hover table-sm table-bordered border-black border-1 align-middle table-responsive text-center rounded">
                  <thead>
                    <tr>
                      <th
                        className="text-center"
                        style={{ border: "1px solid" }}
                      >
                        SL. NO.
                      </th>
                      <th
                        className="text-center"
                        style={{ border: "1px solid" }}
                      >
                        TEACHER'S NAME
                      </th>
                      <th
                        className="text-center"
                        style={{ border: "1px solid" }}
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {mainData.map((teacher, index) => (
                      <tr key={index} className="teacher-tr">
                        <td
                          className="text-center"
                          style={{ border: "1px solid" }}
                        >
                          {index + 1}
                        </td>
                        <td
                          className="text-center"
                          style={{ border: "1px solid" }}
                        >
                          {teacher.tname}
                        </td>
                        <td
                          className="text-center"
                          style={{ border: "1px solid" }}
                        >
                          {filteredData.filter((t) => t.id === teacher.id)
                            .length > 0 ? (
                            <button
                              type="button"
                              className="btn btn-danger btn-sm m-1"
                              onClick={() => {
                                const updatedArray = filteredData.filter(
                                  (t) => t.id !== teacher.id
                                );
                                setFilteredData(updatedArray);
                              }}
                            >
                              Remove
                            </button>
                          ) : (
                            <button
                              type="button"
                              className="btn btn-success btn-sm m-1"
                              onClick={() => {
                                const updatedArray = [
                                  ...filteredData,
                                  teacher,
                                ].sort((a, b) => a.rank - b.rank);
                                setFilteredData(updatedArray);
                              }}
                            >
                              Add
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mx-auto my-3 noprint">
              <button
                type="button"
                className="btn btn-primary text-white font-weight-bold p-2 rounded"
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
                className="btn btn-warning  font-weight-bold p-2 rounded"
                onClick={() => router.back()}
              >
                Go Back
              </button>
            </div>
            <div className="table-resposive-md" style={{ overflowX: "scroll" }}>
              {months
                .slice(
                  0,
                  year === new Date().getFullYear()
                    ? new Date().getMonth()
                    : months.length
                )
                .map((month, index) => (
                  <div
                    className={`container-fluid nobreak my-2 ${month}-table`}
                    key={index}
                  >
                    <h3 className="text-black font-weight-bold m-2">
                      HOWRAH DISTRICT PRIMARY SCHOOL COUNCIL
                    </h3>
                    <h5 className="text-black m-2">
                      ACQUITTANCE ROLL OF {school}, AMTA WEST CIRCLE
                    </h5>
                    <h5 className="text-black m-2">
                      FOR THE MONTH OF {month.toUpperCase()}, {year}
                    </h5>
                    <div className="d-flex flex-row text-center mx-auto justify-content-center align-items-center my-1">
                      <div className="noprint m-2">
                        <button
                          type="button"
                          className="btn btn-danger font-weight-bold p-2 rounded"
                          onClick={() => {
                            if (typeof window !== undefined) {
                              document
                                .querySelector(`.${month}-table`)
                                .classList.add("d-none");
                            }
                          }}
                        >
                          Remove Month
                        </button>
                      </div>
                    </div>
                    <table
                      className="table table-hover table-sm table-bordered border-black border-1 align-middle table-responsive text-center text-black"
                      id="team-list"
                    >
                      <thead>
                        <tr>
                          <th
                            className="text-center"
                            style={{ border: "1px solid" }}
                          >
                            SL. NO.
                          </th>
                          <th
                            className="text-center"
                            style={{ border: "1px solid" }}
                          >
                            TEACHER'S NAME
                          </th>
                          <th
                            className="text-center"
                            style={{ border: "1px solid" }}
                          >
                            DESIG-
                            <br />
                            NATION
                          </th>
                          <th
                            className="text-center"
                            style={{ border: "1px solid" }}
                          >
                            BASIC PAY
                          </th>
                          <th
                            className="text-center"
                            style={{ border: "1px solid" }}
                          >
                            <p style={{ fontSize: 8 }}>
                              ADDL.
                              <br />
                              ALLOWANCE
                            </p>
                          </th>
                          <th
                            className="text-center"
                            style={{ border: "1px solid" }}
                          >
                            DA
                          </th>
                          <th
                            className="text-center"
                            style={{ border: "1px solid" }}
                          >
                            HRA
                          </th>
                          <th
                            className="text-center"
                            style={{ border: "1px solid" }}
                          >
                            MA
                          </th>
                          {year === 2024 && index === 6 ? (
                            <th
                              className="text-center"
                              style={{ border: "1px solid" }}
                            >
                              IR
                            </th>
                          ) : null}
                          <th
                            className="text-center"
                            style={{ border: "1px solid" }}
                          >
                            GROSS
                            <br /> SALARY
                          </th>
                          <th
                            className="text-center"
                            style={{ border: "1px solid" }}
                          >
                            GPF
                          </th>
                          <th
                            className="text-center"
                            style={{ border: "1px solid" }}
                          >
                            GSLI
                          </th>
                          <th
                            className="text-center"
                            style={{ border: "1px solid" }}
                          >
                            PTAX
                          </th>
                          <th
                            className="text-center text-wrap"
                            style={{ border: "1px solid" }}
                          >
                            TOTAL
                            <br /> DEDUCTION
                          </th>
                          <th
                            className="text-center"
                            style={{ border: "1px solid" }}
                          >
                            NET
                            <br /> SALARY
                          </th>
                          <th
                            className="text-center"
                            style={{ border: "1px solid" }}
                          >
                            SIGNATURE OF THE TEACHER
                          </th>
                          <th
                            className="text-center noprint"
                            style={{ border: "1px solid" }}
                          >
                            ACTION
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredData.map((el, ind) => {
                          const id = el?.id;
                          let disability = el?.disability;
                          let da,
                            basicpay,
                            addl,
                            hra,
                            ma,
                            ptax,
                            pfund,
                            gsli,
                            gross;

                          const marchSalary = march.filter(
                            (e) => e.id === id
                          )[0];
                          const aprilSalary = april.filter(
                            (e) => e.id === id
                          )[0];
                          const ir = Math.round(aprilSalary?.basic * 0.04);
                          const maySalary = may.filter((e) => e.id === id)[0];
                          const juneSalary = june.filter((e) => e.id === id)[0];
                          const julySalary = july.filter((e) => e.id === id)[0];
                          const augustSalary = august.filter(
                            (e) => e.id === id
                          )[0];
                          const septemberSalary = september.filter(
                            (e) => e.id === id
                          )[0];
                          const octoberSalary = october.filter(
                            (e) => e.id === id
                          )[0];
                          const novemberSalary = november.filter(
                            (e) => e.id === id
                          )[0];
                          const decemberSalary = december.filter(
                            (e) => e.id === id
                          )[0];
                          const januarySalary = january.filter(
                            (e) => e.id === id
                          )[0];
                          const februarySalary = february.filter(
                            (e) => e.id === id
                          )[0];

                          if (index === 0) {
                            basicpay = januarySalary?.basic;
                            da = Math.round(
                              basicpay * januarySalary?.daPercent
                            );
                            hra =
                              januarySalary?.hraPercent > 10
                                ? januarySalary?.hraPercent
                                : Math.round(
                                    basicpay * januarySalary?.hraPercent
                                  );
                            addl = januarySalary?.addl;
                            pfund = januarySalary?.gpf;
                            gsli = januarySalary?.gsli;
                            ma = januarySalary?.ma;
                          } else if (index === 1) {
                            basicpay = februarySalary?.basic;
                            da = Math.round(
                              basicpay * februarySalary?.daPercent
                            );
                            hra =
                              februarySalary?.hraPercent > 10
                                ? februarySalary?.hraPercent
                                : Math.round(
                                    basicpay * februarySalary?.hraPercent
                                  );
                            addl = februarySalary?.addl;
                            pfund = februarySalary?.gpf;
                            gsli = februarySalary?.gsli;
                            ma = februarySalary?.ma;
                          } else if (index === 2) {
                            basicpay = marchSalary?.basic;
                            da = Math.round(basicpay * marchSalary?.daPercent);
                            hra =
                              marchSalary?.hraPercent > 10
                                ? marchSalary?.hraPercent
                                : Math.round(
                                    basicpay * marchSalary?.hraPercent
                                  );
                            addl = marchSalary?.addl;
                            pfund = marchSalary?.gpf;
                            gsli = marchSalary?.gsli;
                            ma = marchSalary?.ma;
                          } else if (index === 3) {
                            basicpay = aprilSalary?.basic;
                            da = Math.round(basicpay * aprilSalary?.daPercent);
                            hra =
                              aprilSalary?.hraPercent > 10
                                ? aprilSalary?.hraPercent
                                : Math.round(
                                    basicpay * aprilSalary?.hraPercent
                                  );
                            addl = aprilSalary?.addl;
                            pfund = aprilSalary?.gpf;
                            gsli = aprilSalary?.gsli;
                            ma = aprilSalary?.ma;
                          } else if (index === 4) {
                            basicpay = maySalary?.basic;
                            da = Math.round(basicpay * maySalary?.daPercent);
                            hra =
                              maySalary?.hraPercent > 10
                                ? maySalary?.hraPercent
                                : Math.round(basicpay * maySalary?.hraPercent);
                            addl = maySalary?.addl;
                            pfund = maySalary?.gpf;
                            gsli = maySalary?.gsli;
                            ma = maySalary?.ma;
                          } else if (index === 5) {
                            basicpay = juneSalary?.basic;
                            da = Math.round(basicpay * juneSalary?.daPercent);
                            hra =
                              juneSalary?.hraPercent > 10
                                ? juneSalary?.hraPercent
                                : Math.round(basicpay * juneSalary?.hraPercent);
                            addl = juneSalary?.addl;
                            pfund = juneSalary?.gpf;
                            gsli = juneSalary?.gsli;
                            ma = juneSalary?.ma;
                          } else if (index === 6) {
                            basicpay = julySalary?.basic;
                            da = Math.round(basicpay * julySalary?.daPercent);
                            hra =
                              julySalary?.hraPercent > 10
                                ? julySalary?.hraPercent
                                : Math.round(basicpay * julySalary?.hraPercent);
                            addl = julySalary?.addl;
                            pfund = julySalary?.gpf;
                            gsli = julySalary?.gsli;
                            ma = julySalary?.ma;
                          } else if (index === 7) {
                            basicpay = augustSalary?.basic;
                            da = Math.round(basicpay * augustSalary?.daPercent);
                            hra =
                              augustSalary?.hraPercent > 10
                                ? augustSalary?.hraPercent
                                : Math.round(
                                    basicpay * augustSalary?.hraPercent
                                  );
                            addl = augustSalary?.addl;
                            pfund = augustSalary?.gpf;
                            gsli = augustSalary?.gsli;
                            ma = augustSalary?.ma;
                          } else if (index === 8) {
                            basicpay = septemberSalary?.basic;
                            da = Math.round(
                              basicpay * septemberSalary?.daPercent
                            );
                            hra =
                              septemberSalary?.hraPercent > 10
                                ? septemberSalary?.hraPercent
                                : Math.round(
                                    basicpay * septemberSalary?.hraPercent
                                  );
                            addl = septemberSalary?.addl;
                            pfund = septemberSalary?.gpf;
                            gsli = septemberSalary?.gsli;
                            ma = septemberSalary?.ma;
                          } else if (index === 9) {
                            basicpay = octoberSalary?.basic;
                            da = Math.round(
                              basicpay * octoberSalary?.daPercent
                            );
                            hra =
                              octoberSalary?.hraPercent > 10
                                ? octoberSalary?.hraPercent
                                : Math.round(
                                    basicpay * octoberSalary?.hraPercent
                                  );
                            addl = octoberSalary?.addl;
                            pfund = octoberSalary?.gpf;
                            gsli = octoberSalary?.gsli;
                            ma = octoberSalary?.ma;
                          } else if (index === 10) {
                            basicpay = novemberSalary?.basic;
                            da = Math.round(
                              basicpay * novemberSalary?.daPercent
                            );
                            hra =
                              novemberSalary?.hraPercent > 10
                                ? novemberSalary?.hraPercent
                                : Math.round(
                                    basicpay * novemberSalary?.hraPercent
                                  );
                            addl = novemberSalary?.addl;
                            pfund = novemberSalary?.gpf;
                            gsli = novemberSalary?.gsli;
                            ma = novemberSalary?.ma;
                          } else if (index === 11) {
                            basicpay = decemberSalary?.basic;
                            da = Math.round(
                              basicpay * decemberSalary?.daPercent
                            );
                            hra =
                              decemberSalary?.hraPercent > 10
                                ? decemberSalary?.hraPercent
                                : Math.round(
                                    basicpay * decemberSalary?.hraPercent
                                  );
                            addl = decemberSalary?.addl;
                            pfund = decemberSalary?.gpf;
                            gsli = decemberSalary?.gsli;
                            ma = decemberSalary?.ma;
                          }

                          if (year === 2024 && index === 6) {
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

                          let netpay = gross - deduction;

                          if (
                            el.monthData[index].value &&
                            basicpay !== 0 &&
                            basicpay !== undefined
                          ) {
                            return (
                              <tr
                                key={ind}
                                id={`tr${
                                  el.id + "-" + ind + "-" + month + "-" + index
                                }`}
                              >
                                <td
                                  className="text-center"
                                  style={{ border: "1px solid" }}
                                >
                                  {/* {ind + 1} */}
                                </td>
                                <td
                                  className="text-center"
                                  style={{ border: "1px solid" }}
                                  onClick={() => console.log(basicpay)}
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
                                {year === 2024 && index === 6 && (
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
                                  {deduction}
                                </td>
                                <td
                                  className="text-center"
                                  style={{ border: "1px solid" }}
                                >
                                  {netpay}
                                </td>
                                <th
                                  className="text-center"
                                  style={{ border: "1px solid", height: 100 }}
                                ></th>
                                <td
                                  className="text-center noprint"
                                  style={{ border: "1px solid" }}
                                >
                                  <button
                                    type="button"
                                    className="btn btn-danger text-white font-weight-bold p-2 rounded"
                                    onClick={() => {
                                      if (typeof window !== undefined) {
                                        document
                                          .getElementById(
                                            `tr${
                                              el.id +
                                              "-" +
                                              ind +
                                              "-" +
                                              month +
                                              "-" +
                                              index
                                            }`
                                          )
                                          .classList.add("d-none");
                                      }
                                    }}
                                  >
                                    Remove Teacher
                                  </button>
                                </td>
                              </tr>
                            );
                          }
                        })}
                      </tbody>
                    </table>
                  </div>
                ))}
            </div>
          </div>
          <div className="mx-auto my-3 noprint">
            <button
              type="button"
              className="btn btn-primary text-white font-weight-bold p-2 rounded"
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
              className="btn btn-warning  font-weight-bold p-2 rounded"
              onClick={() => router.back()}
            >
              Go Back
            </button>
          </div>
        </>
      ) : (
        <Loader center content="loading" size="lg" />
      )}
    </div>
  );
};

export default TechersAccuitance;
