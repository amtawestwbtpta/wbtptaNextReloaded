"use client";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../context/Store";
import { useRouter } from "next/navigation";
import {
  getServiceLife,
  monthNamesWithIndex,
  months,
  readCSVFile,
  RoundTo,
  uniqArray,
} from "../../modules/calculatefunctions";
import ServiceConfirmation from "../../pdfs/ServiceConfirmation";
import BenefitProforma from "../../pdfs/BenefitProforma";
import BenefitApplication from "../../pdfs/BenefitApplication";
import dynamic from "next/dynamic";
import NewTeacherArrear from "../../pdfs/NewTeacherArrear";
import AppServiceConfirmation from "../../pdfs/AppServiceConfirmation";
const YearWiseTeachers = () => {
  const PDFDownloadLink = dynamic(
    async () =>
      await import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
    {
      ssr: false,
      loading: () => <p>Please Wait...</p>,
    }
  );
  const { state, teachersState } = useGlobalContext();
  const router = useRouter();
  // const data = teachersState.filter((el) => el.association === "WBTPTA");
  const [data, setData] = useState(teachersState);
  const [showTeacherSelection, setShowTeacherSelection] = useState(true);
  const [isWBTPTA, setIsWBTPTA] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [moreFilteredData, setMoreFilteredData] = useState([]);
  const [monthText, setMonthText] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [joiningMonths, setJoiningMonths] = useState([]);
  const [serviceArray, setServiceArray] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [showConfForm, setShowConfForm] = useState(false);
  const [showProforma, setShowProforma] = useState(false);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [showArrearForm, setShowArrearForm] = useState(false);
  const isReactNativeWebView = () => {
    if (typeof window !== undefined) {
      return window.ReactNativeWebView !== undefined;
    }
  };
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
        const joiningYear = teacher.doj.split("-")[2];
        const joiningMonth = teacher.doj.split("-")[1];
        if (joiningYear === selectedValue) {
          x.push(teacher);
        }
        if (joiningYear === selectedValue) {
          monthNamesWithIndex.map((month) => {
            if (joiningMonth === month.index) {
              y.push(month);
            }
          });
        }
      });
      setSelectedYear(selectedValue);
      setFilteredData(x);
      setMoreFilteredData(x);
      setJoiningMonths(uniqArray(y).sort((a, b) => a.rank - b.rank));
    } else {
      setFilteredData([]);
      setSelectedYear("");
    }
  };
  const handleMonthChange = (month) => {
    let x = [];
    data.map((teacher) => {
      const joiningYear = teacher.doj.split("-")[2];
      const joiningMonth = teacher.doj.split("-")[1];
      if (joiningYear === selectedYear && joiningMonth === month.index) {
        return x.push(teacher);
      }
    });
    setFilteredData(x);
    setMonthText(month.monthName);
  };
  const getData = () => {
    let x = [];
    data.map((teacher) => {
      const joiningYear = teacher.doj.split("-")[2];
      x.push(joiningYear);
      x = uniqArray(x);
      x = x.sort((a, b) => a - b);
    });

    setServiceArray(x);
  };

  const getArrayLength = (year) => {
    let x = [];
    data.map((teacher) => {
      const joiningYear = teacher.doj.split("-")[2];
      if (joiningYear === year) {
        x.push(teacher);
      }
    });
    return x.length;
  };
  const [benefitData, setBenefitData] = useState([]);
  const benefitProforma = async () => {
    if (!showProforma) {
      let fData = [];
      const mData = filteredData.map(async (teacher) => {
        const { doj, id } = teacher;
        const joiningMonth = parseInt(doj?.split("-")[1]);
        const joiningMonthName = monthNamesWithIndex.find(
          (month) => month.rank === joiningMonth
        ).monthName;
        console.log(joiningMonthName);
        const year = new Date().getFullYear();

        const q1 = await readCSVFile(`january-${year}`);
        const januaryMonthSalary = q1?.filter((el) => el.id === id)[0];
        teacher.mbasic = januaryMonthSalary.basic;
        const normalIncrement = RoundTo(
          januaryMonthSalary.basic + januaryMonthSalary.basic * 0.03,
          100
        );
        if (joiningMonth < 7) {
          teacher.basic = RoundTo(
            normalIncrement + normalIncrement * 0.03,
            100
          );
        } else {
          teacher.basic = normalIncrement;
        }

        fData = [...fData, teacher];
      });
      await Promise.all(mData).then(() => {
        setBenefitData(fData);
      });
    }
    setShowProforma(!showProforma);
  };
  useEffect(() => {
    getData();
    //eslint-disable-next-line
  }, []);
  useEffect(() => {
    document.title = `Year Wise ${isWBTPTA ? "WBTPTA" : ""} Teachers List`;
    //eslint-disable-next-line
  }, [data]);
  return (
    <div className="container-fluid my-3">
      {showTeacherSelection ? (
        <div
          className="modal fade show"
          tabIndex="-1"
          role="dialog"
          style={{ display: "block" }}
          aria-modal="true"
        >
          <div className="modal-dialog modal-xl">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">
                  Select Teacher Data
                </h1>
              </div>
              <div className="modal-body">
                <div className="mx-auto my-2 noprint">
                  <div className="m-4 noprint">
                    <button
                      type="button"
                      className="btn btn-primary p-2 rounded"
                      onClick={() => {
                        setData(teachersState);
                        setShowTeacherSelection(false);
                        setIsWBTPTA(false);
                      }}
                    >
                      All Teachers
                    </button>
                  </div>
                  <div className="m-4 noprint">
                    <button
                      type="button"
                      className="btn btn-success p-2 rounded"
                      onClick={() => {
                        setData(
                          teachersState.filter(
                            (el) => el.association === "WBTPTA"
                          )
                        );
                        setShowTeacherSelection(false);
                        setIsWBTPTA(true);
                      }}
                    >
                      Only WBTPTA Teachers
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h3 className="text-center text-primary">
            Year Wise {isWBTPTA ? "WBTPTA" : ""} Teachers List
          </h3>
          <div className="col-md-4 mx-auto mb-3 noprint">
            <select
              className="form-select"
              defaultValue={""}
              onChange={handleChange}
              aria-label="Default select example"
            >
              <option className="text-center text-primary" value="">
                Select Joining Year
              </option>
              {serviceArray.map((el, i) => {
                if (getArrayLength(el) > 0) {
                  return (
                    <option
                      className="text-center text-success text-wrap"
                      key={i}
                      value={el}
                    >
                      {el +
                        " - " +
                        (new Date().getFullYear() - parseInt(el)
                          ? new Date().getFullYear() - parseInt(el)
                          : "This") +
                        " Year - " +
                        getArrayLength(el) +
                        ` ${getArrayLength(el) > 1 ? " Teachers" : " Teacher"}`}
                    </option>
                  );
                }
              })}
            </select>
          </div>
          {selectedYear ? (
            <div className="noprint">
              {joiningMonths.length > 1 && (
                <h4 className="text-center text-primary">
                  Filter By Joining Month
                </h4>
              )}
            </div>
          ) : null}
          <div className="row d-flex justify-content-center noprint">
            {joiningMonths.length > 1 && (
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
                    Select Joining Month
                  </option>
                  {joiningMonths.map((month, index) => {
                    if (
                      moreFilteredData.filter(
                        (m) => m.doj.split("-")[1] === month.index
                      ).length > 0
                    ) {
                      return (
                        <option
                          className="text-center text-success"
                          key={index}
                          value={JSON.stringify(month)}
                        >
                          {month.monthName +
                            " - " +
                            moreFilteredData.filter(
                              (m) => m.doj.split("-")[1] === month.index
                            ).length +
                            ` ${
                              moreFilteredData.filter(
                                (m) => m.doj.split("-")[1] === month.index
                              ).length > 1
                                ? " Teachers"
                                : " Teacher"
                            }`}
                        </option>
                      );
                    }
                  })}
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
                <div className="m-1 noprint">
                  <button
                    type="button"
                    className="btn btn-success p-2 rounded"
                    onClick={() => setShowTable(!showTable)}
                  >
                    {showTable ? "Hide Table Format" : "Show Table Format"}
                  </button>
                </div>
              </div>

              {moreFilteredData.length > 1 ? (
                <div>
                  <h4 className="text-center text-primary">
                    Total{" "}
                    {moreFilteredData.length > 1
                      ? `${moreFilteredData.length} ${
                          isWBTPTA ? "WBTPTA" : ""
                        } Teachers`
                      : `${moreFilteredData.length} ${
                          isWBTPTA ? "WBTPTA" : ""
                        } Teacher`}{" "}
                    Joined on Year {selectedYear}
                  </h4>
                  <h4 className="text-center text-primary">
                    Service Life:{" "}
                    {new Date().getFullYear() - parseInt(selectedYear)}{" "}
                    {new Date().getFullYear() - parseInt(selectedYear) > 1
                      ? "Years"
                      : "Year"}
                  </h4>
                  {monthText && (
                    <div>
                      <h4 className="text-center text-primary">
                        {filteredData.length}
                        {filteredData.length > 1
                          ? " Teachers"
                          : " Teacher"}{" "}
                        Joined on {monthText}
                      </h4>
                      <button
                        type="button"
                        className="btn btn-danger noprint p-2 rounded"
                        onClick={() => {
                          setFilteredData(moreFilteredData);
                          setMonthText("");
                          if (typeof window !== undefined) {
                            let monthSelect =
                              document.getElementById("month-select");
                            if (monthSelect) {
                              monthSelect.value = "";
                            }
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
                    1 {isWBTPTA ? "WBTPTA" : ""} Teacher Joined on{" "}
                    {filteredData.length > 0 &&
                      months[
                        parseInt(filteredData[0].doj?.split("-")[1]) - 1
                      ]}{" "}
                    {selectedYear}
                  </h4>
                  <h4 className="text-center text-primary">
                    Service Life:{" "}
                    {new Date().getFullYear() - parseInt(selectedYear)}{" "}
                    {new Date().getFullYear() - parseInt(selectedYear) > 1
                      ? "Years"
                      : "Year"}
                  </h4>
                </div>
              )}
            </div>
          )}
          <div className="container text-center">
            {!showTable ? (
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
                            <br /> {el.tname} ({`${el.desig}`})
                          </h6>
                          <h6 className="text-center text-black">
                            School:
                            <br /> {el.school}
                          </h6>
                          <h6>
                            <a
                              href={`tel: +91${el.phone}`}
                              className="d-inline-block  text-decoration-none text-black"
                            >
                              Mobile: {el.phone}
                            </a>
                          </h6>

                          <h6
                            className={`text-center text-black`}
                            suppressHydrationWarning
                          >
                            Association:{" "}
                            <span
                              className={`text-center ${
                                el.association === "WBTPTA"
                                  ? "text-success"
                                  : "text-danger"
                              }`}
                            >
                              {el.association}
                            </span>
                          </h6>

                          <h6 className="text-center text-black">
                            Service Life:
                            <br /> {getServiceLife(el.doj)}
                          </h6>
                          <h6 className="text-center text-black">
                            Date of Joining:
                            <br /> {el.doj}
                          </h6>
                          <h6 className="text-center text-black">
                            DOJ at This Post in This School:
                            <br /> {el.dojnow}
                          </h6>
                          <h6 className="text-center text-black">
                            Date of Birth:
                            <br /> {el.dob}
                          </h6>
                          <h6 className="text-center text-black">
                            Date of Retirement:
                            <br /> {el.dor}
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
            ) : (
              <div
                className="m-2 mx-auto"
                style={{
                  overflowX: "auto",
                }}
              >
                <table
                  className="ttable-striped table-hover text-center"
                  style={{
                    verticalAlign: "middle",
                    width: "100%",
                    overflowX: "auto",
                    border: "1px solid",
                    padding: 2,
                  }}
                >
                  <thead>
                    <tr
                      style={{
                        border: "1px solid",
                        padding: 2,
                      }}
                    >
                      <th
                        style={{
                          border: "1px solid",
                          padding: 2,
                        }}
                        scope="col"
                      >
                        Sl
                      </th>
                      <th
                        style={{
                          border: "1px solid",
                          padding: 2,
                        }}
                        scope="col"
                      >
                        Teacher's Name
                      </th>
                      <th
                        style={{
                          border: "1px solid",
                          padding: 2,
                        }}
                        scope="col"
                      >
                        School
                      </th>
                      <th
                        style={{
                          border: "1px solid",
                          padding: 2,
                        }}
                        scope="col"
                      >
                        Date of Joining
                      </th>
                      {/* <th
                        style={{
                          border: "1px solid",
                          padding: 2,
                        }}
                        scope="col"
                      >
                        Mobile
                      </th> */}
                      <th
                        style={{
                          border: "1px solid",
                          padding: 2,
                        }}
                        scope="col"
                      >
                        Remarks
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((el, index) => {
                      return (
                        <tr
                          style={{
                            border: "1px solid",
                            padding: 2,
                          }}
                          key={index}
                        >
                          <td
                            style={{
                              border: "1px solid",
                              padding: 2,
                            }}
                            scope="row"
                          >
                            {index + 1}
                          </td>
                          <td
                            style={{
                              border: "1px solid",
                              padding: 2,
                            }}
                          >
                            {el.tname}
                          </td>
                          <td
                            style={{
                              border: "1px solid",
                              padding: 2,
                            }}
                          >
                            {el.school}
                          </td>
                          <td
                            style={{
                              border: "1px solid",
                              padding: 2,
                            }}
                          >
                            {el.doj}
                          </td>
                          {/* <td
                            style={{
                              border: "1px solid",
                              padding: 2,
                            }}
                          >
                            <a
                              href={`tel: +91${el.phone}`}
                              className="d-inline-block text-decoration-none text-black"
                              style={{ padding: 2 }}
                            >
                              {el.phone}
                            </a>
                          </td> */}
                          <td
                            style={{
                              border: "1px solid",
                              padding: 2,
                            }}
                          ></td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
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
                <div className="m-1 noprint">
                  <button
                    type="button"
                    className="btn btn-success p-2 rounded"
                    onClick={() => setShowTable(!showTable)}
                  >
                    {showTable ? "Hide Table Format" : "Show Table Format"}
                  </button>
                </div>
              </div>
            </div>
          )}
          {state === "admin" && (
            <div className="noprint">
              {new Date().getFullYear() - parseInt(selectedYear) === 2 && (
                <div>
                  <button
                    type="button"
                    className="btn btn-primary m-2 p-2 rounded"
                    onClick={() => setShowConfForm(!showConfForm)}
                  >
                    {showConfForm
                      ? "Hide Confirmation Form"
                      : "Show Confirmation Form"}
                  </button>
                </div>
              )}
              {new Date().getFullYear() - parseInt(selectedYear) <= 2 && (
                <div>
                  <button
                    type="button"
                    className="btn btn-primary m-2 p-2 rounded"
                    onClick={() => setShowArrearForm(!showArrearForm)}
                  >
                    {showArrearForm ? "Hide Arrear Form" : "Show Arrear Form"}
                  </button>
                </div>
              )}
              {new Date().getFullYear() - parseInt(selectedYear) === 2 &&
                showConfForm && (
                  <div className="my-5">
                    <PDFDownloadLink
                      document={<ServiceConfirmation data={filteredData} />}
                      fileName={`Service Confirmation Form.pdf`}
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
                        loading
                          ? "Please Wait..."
                          : "Download Confirmation Proforma"
                      }
                    </PDFDownloadLink>
                    <PDFDownloadLink
                      document={<AppServiceConfirmation data={filteredData} />}
                      fileName={`Service Confirmation Application Form.pdf`}
                      style={{
                        textDecoration: "none",
                        padding: 11,
                        color: "#fff",
                        backgroundColor: "blue",
                        border: "1px solid #4a4a4a",
                        width: "40%",
                        borderRadius: 10,
                        margin: 20,
                      }}
                    >
                      {({ blob, url, loading, error }) =>
                        loading ? "Please Wait..." : "Download Application Form"
                      }
                    </PDFDownloadLink>
                  </div>
                )}

              {showArrearForm && (
                <div className="my-5">
                  <PDFDownloadLink
                    document={<NewTeacherArrear data={filteredData} />}
                    fileName={`Year ${selectedYear} New Teacher Arrear Form.pdf`}
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
                      loading ? "Please Wait..." : "Download Form"
                    }
                  </PDFDownloadLink>
                  {/* <NewTeacherArrear data={filteredData} /> */}
                </div>
              )}
              {(new Date().getFullYear() - parseInt(selectedYear) === 10 ||
                new Date().getFullYear() - parseInt(selectedYear) === 20) && (
                <div>
                  <button
                    type="button"
                    className="btn btn-primary m-2 p-2 rounded"
                    onClick={benefitProforma}
                  >
                    {showProforma
                      ? "Hide Benefit Proforma"
                      : "Show Benefit Proforma"}
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary m-2 p-2 rounded"
                    onClick={() => setShowApplicationForm(!showApplicationForm)}
                  >
                    {showApplicationForm
                      ? "Hide Application Form"
                      : "Show Application Form"}
                  </button>
                </div>
              )}
              {(new Date().getFullYear() - parseInt(selectedYear) === 10 ||
                new Date().getFullYear() - parseInt(selectedYear) === 20) &&
                showProforma && (
                  <div className="my-5">
                    <PDFDownloadLink
                      document={
                        <BenefitProforma
                          data={benefitData}
                          year={parseInt(selectedYear)}
                        />
                      }
                      fileName={`Benefit Proforma of Teachers.pdf`}
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
                        loading ? "Please Wait..." : "Download Benefit Proforma"
                      }
                    </PDFDownloadLink>
                  </div>
                )}
              {(new Date().getFullYear() - parseInt(selectedYear) === 10 ||
                new Date().getFullYear() - parseInt(selectedYear) === 20) &&
                showApplicationForm && (
                  <div className="my-5">
                    <PDFDownloadLink
                      document={
                        <BenefitApplication
                          data={filteredData}
                          year={parseInt(selectedYear)}
                        />
                      }
                      fileName={`Service Confirmation Form.pdf`}
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
                        loading ? "Please Wait..." : "Download Form"
                      }
                    </PDFDownloadLink>
                    {/* <BenefitApplication
                      data={filteredData}
                      year={parseInt(selectedYear)}
                    /> */}
                  </div>
                )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default YearWiseTeachers;
