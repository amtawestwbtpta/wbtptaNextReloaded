"use client";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../context/Store";
import {
  getRetirementLife,
  monthNamesWithIndex,
  months,
  uniqArray,
} from "../../modules/calculatefunctions";
import { useRouter } from "next/navigation";

const Retirement = () => {
  const { state, teachersState } = useGlobalContext();
  const router = useRouter();
  const data = teachersState;
  const [filteredData, setFilteredData] = useState([]);
  const [moreFilteredData, setMoreFilteredData] = useState([]);
  const [monthText, setMonthText] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [RetirementMonths, setRetirementMonths] = useState([]);
  const [serviceArray, setServiceArray] = useState([]);

  const handleChange = (e) => {
    if (e.target.value !== "") {
      if (typeof window !== undefined) {
        let monthSelect = document.getElementById("month-select");
        if (monthSelect) {
          monthSelect.value = "";
        }
      }
      setMonthText("");
      const selectedValue = e.target.value;
      let x = [];
      let y = [];
      data.map((teacher) => {
        const RetirementYear = teacher.dor.split("-")[2];
        const RetirementMonth = teacher.dor.split("-")[1];
        if (RetirementYear === selectedValue) {
          x.push(teacher);
        }
        if (RetirementYear === selectedValue) {
          monthNamesWithIndex.map((month) => {
            if (RetirementMonth === month.index) {
              y.push(month);
            }
          });
        }
      });
      setSelectedYear(selectedValue);
      setFilteredData(x);
      setMoreFilteredData(x);
      setRetirementMonths(uniqArray(y).sort((a, b) => a.rank - b.rank));
    } else {
      setFilteredData([]);
      setSelectedYear("");
    }
  };
  const handleMonthChange = (month) => {
    let x = [];
    data.map((teacher) => {
      const RetirementYear = teacher.dor.split("-")[2];
      const RetirementMonth = teacher.dor.split("-")[1];
      if (RetirementYear === selectedYear && RetirementMonth === month.index) {
        return x.push(teacher);
      }
    });
    setFilteredData(x);
    setMonthText(month.monthName);
  };
  const getData = () => {
    let x = [];
    data.map((teacher) => {
      const RetirementYear = teacher.dor.split("-")[2];
      x.push(RetirementYear);
      x = uniqArray(x);
      x = x.sort((a, b) => a - b);
    });

    setServiceArray(x);
  };

  const getArrayLength = (year) => {
    let x = [];
    data.map((teacher) => {
      const RetirementYear = teacher.dor.split("-")[2];
      if (RetirementYear === year) {
        x.push(teacher);
      }
    });
    return x.length;
  };

  useEffect(() => {
    getData();
    //eslint-disable-next-line
  }, []);
  return (
    <div className="container-fluid my-3">
      <h3 className="text-center text-primary">Year Wise Teachers</h3>
      <div className="col-md-4 mx-auto mb-3 noprint">
        <select
          className="form-select"
          defaultValue={""}
          onChange={handleChange}
          aria-label="Default select example"
        >
          <option className="text-center text-primary" value="">
            Select Retirement Year
          </option>
          {serviceArray.map((el) => (
            <option
              className="text-center text-success text-wrap"
              key={el.id}
              value={el}
            >
              {el +
                " - " +
                (parseInt(el) - new Date().getFullYear()) +
                " Year - " +
                getArrayLength(el) +
                ` ${getArrayLength(el) > 1 ? " Teachers" : " Teacher"}`}
            </option>
          ))}
        </select>
      </div>
      {selectedYear ? (
        <div className="noprint">
          {RetirementMonths.length > 1 && (
            <h4 className="text-center text-primary">
              Filter By Retirement Month
            </h4>
          )}
        </div>
      ) : null}
      <div className="row d-flex justify-content-center noprint">
        {RetirementMonths.length > 1 && (
          <div className="col-md-4 mx-auto mb-3 noprint">
            <select
              className="form-select"
              id="month-select"
              defaultValue={""}
              onChange={(e) => {
                if (e.target.value) {
                  handleMonthChange(JSON.parse(e.target.value));
                } else {
                  setMonthText("");
                  setFilteredData(moreFilteredData);
                  if (typeof window !== undefined) {
                    document.getElementById("month-select").value = "";
                  }
                }
              }}
              aria-label="Default select example"
            >
              <option value="" className="text-center text-primary">
                Select Retirement Month
              </option>
              {RetirementMonths.map((month, index) => (
                <option
                  className="text-center text-success"
                  key={index}
                  value={JSON.stringify(month)}
                >
                  {month.monthName +
                    " - " +
                    moreFilteredData.filter(
                      (m) => m.dor.split("-")[1] === month.index
                    ).length +
                    ` ${
                      moreFilteredData.filter(
                        (m) => m.dor.split("-")[1] === month.index
                      ).length > 1
                        ? " Teachers"
                        : " Teacher"
                    }`}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
      {filteredData.length > 0 && (
        <div>
          <div className="d-flex flex-row justify-content-center m-2">
            <div className="m-1 noprint">
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
            <div className="m-1 noprint">
              <button
                type="button"
                className="btn btn-warning  p-2 rounded"
                onClick={() => router.back()}
              >
                Go Back
              </button>
            </div>
          </div>

          {moreFilteredData.length > 1 ? (
            <div>
              <h4 className="text-center text-primary">
                {moreFilteredData.length > 1
                  ? `Total ${moreFilteredData.length} Teachers`
                  : `Total ${moreFilteredData.length} Teacher`}{" "}
                will be Retired on Year {selectedYear}
              </h4>
              {monthText && (
                <div>
                  <h4 className="text-center text-primary">
                    {filteredData.length}
                    {filteredData.length > 1 ? " Teachers" : " Teacher"} will be
                    Retired on {monthText}
                  </h4>
                  <button
                    type="button"
                    className="btn btn-danger noprint p-2 rounded"
                    onClick={() => {
                      setFilteredData(moreFilteredData);
                      setMonthText("");

                      let monthSelect = document.getElementById("month-select");
                      if (monthSelect) {
                        monthSelect.value = "";
                      }
                    }}
                  >
                    Clear Filter
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div>
              <h4 className="text-center text-primary">
                1 Teacher will be Retired on{" "}
                {filteredData.length > 0 &&
                  months[parseInt(filteredData[0].doj?.split("-")[1]) - 1]}{" "}
                {selectedYear}
              </h4>
            </div>
          )}
        </div>
      )}
      <div className="container text-center">
        <div className="row d-flex justify-content-center">
          {selectedYear ? (
            filteredData.length > 0 ? (
              filteredData.map((el, index) => {
                return (
                  <div
                    key={index}
                    className="rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2 nobreak"
                    style={{ backgroundColor: "seashell" }}
                  >
                    <h6 className="text-center text-black">
                      {index + 1}) Teacher's Name:
                      <br /> {el?.tname} ({`${el?.desig}`})
                    </h6>
                    <h6 className="text-center text-black">
                      School:
                      <br /> {el?.school}
                    </h6>
                    <h6 className="text-center text-black">
                      Association:
                      <br /> {el?.association}
                    </h6>
                    <h6>
                      <a
                        href={`tel: +91${el?.phone}`}
                        className="d-inline-block  text-decoration-none text-black"
                      >
                        Mobile: {el?.phone}
                      </a>
                    </h6>
                    <h6 className="text-center text-black">
                      Service Life:
                      <br /> {getRetirementLife(el?.doj, el?.dor)}
                    </h6>
                    <h6 className="text-center text-black">
                      Date of Joining:
                      <br /> {el?.doj}
                    </h6>
                    <h6 className="text-center text-black">
                      DOJ at This Post in This School:
                      <br /> {el?.dojnow}
                    </h6>
                    <h6 className="text-center text-black">
                      Date of Birth:
                      <br /> {el?.dob}
                    </h6>
                    <h6 className="text-center text-black">
                      Date of Retirement:
                      <br /> {el?.dor}
                    </h6>
                  </div>
                );
              })
            ) : (
              <h4 className="text-center text-primary">
                No Teachers found for the selected Year.
              </h4>
            )
          ) : null}
        </div>
      </div>{" "}
      {filteredData.length > 0 && (
        <div>
          <div className="d-flex flex-row justify-content-center m-2">
            <div className="m-1 noprint">
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
            <div className="m-1 noprint">
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
      )}
    </div>
  );
};

export default Retirement;
