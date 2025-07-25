"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import * as XLSX from "xlsx";
export default function HolisticPRCard() {
  const router = useRouter();
  const [showFPage, setShowFpage] = useState(true);
  const [showIPage, setShowIpage] = useState(false);
  const [showSchPart, setShowSchPart] = useState(true);
  const [showStudentPart, setShowStudentPart] = useState(false);
  const [schoolName, setSchoolName] = useState("");
  const [udise, setUdise] = useState("");
  const [address, setAddress] = useState("");
  const [village, setVillage] = useState("");
  const [circle, setCircle] = useState("AMTA WEST");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [showModal, setShowModal] = useState(true);
  const fileRef = useRef();
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("");
  const handleFileUpload = (e) => {
    setError("");
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name.split(".").slice(0, -1).join("."));
    const extension = file.name.split(".").pop().toLowerCase();

    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        if (["xlsx", "xls", "csv"].includes(extension)) {
          // Process Excel/CSV files
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: "array", cellDates: true });
          const worksheet = workbook.Sheets[workbook.SheetNames[0]];
          const json = XLSX.utils.sheet_to_json(worksheet, { raw: true });

          const processedData = json.map((row) => {
            const processedRow = {};
            Object.entries(row).forEach(([key, value]) => {
              processedRow[key] = processExcelValue(value);
            });
            return processedRow;
          });

          setData(processedData);
        } else if (extension === "json") {
          // Process JSON files
          const jsonString = e.target.result; // Directly use the text result
          const parsedData = JSON.parse(jsonString);

          const processedData = parsedData
            .filter((item) => item.nclass !== 0)
            .map((row) => {
              const processedRow = {};
              Object.entries(row).forEach(([key, value]) => {
                processedRow[key] = processJsonValue(value);
              });
              return processedRow;
            });

          setData(processedData);
        } else {
          setError("Unsupported file type");
        }
      } catch (err) {
        setError("Error processing file: " + err.message);
      }
    };

    if (extension === "json") {
      reader.readAsText(file); // Read JSON as text
    } else {
      reader.readAsArrayBuffer(file); // Read Excel files as array buffer
    }
    fileRef.current.value = "";
  };
  const processExcelValue = (value) => {
    if (value instanceof Date) {
      const day = String(value.getDate()).padStart(2, "0");
      const month = String(value.getMonth() + 1).padStart(2, "0");
      const year = value.getFullYear();
      return `${day}-${month}-${year}`;
    }
    if (typeof value === "number") {
      const strVal = String(value);
      if (strVal.length > 9 || (strVal.startsWith("0") && strVal.length > 1)) {
        return strVal;
      }
      return value;
    }
    return value;
  };

  const processJsonValue = (value) => {
    if (typeof value === "number") {
      const strVal = String(value);
      if (strVal.length > 9 || (strVal.startsWith("0") && strVal.length > 1)) {
        return strVal;
      }
      return value;
    }
    return value;
  };
  const downloadFile = (format) => {
    if (data.length === 0) return;

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    switch (format) {
      case "json":
        const jsonBlob = new Blob([JSON.stringify(data)], {
          type: "application/json",
        });
        const jsonUrl = URL.createObjectURL(jsonBlob);
        downloadFileHelper(jsonUrl, `${fileName}.json`);
        break;

      case "csv":
        const csv = XLSX.utils.sheet_to_csv(worksheet);
        const csvBlob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const csvUrl = URL.createObjectURL(csvBlob);
        downloadFileHelper(csvUrl, `${fileName}.csv`);
        break;

      case "xlsx":
        XLSX.writeFile(workbook, `${fileName}.xlsx`);
        break;
    }
  };

  const downloadFileHelper = (url, filename) => {
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };
  useEffect(() => {
    document.title = `${
      schoolName !== "" ? schoolName : "My School's"
    }:Holistic Progress Report Card`;

    //eslint-disable-next-line
  }, [schoolName]);

  return (
    <div className="container-fluid">
      {showModal ? (
        <div
          className="modal fade show"
          tabIndex="-1"
          role="dialog"
          style={{ display: "block" }}
          aria-modal="true"
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">
                  Enter Your School Descriptions
                </h1>
              </div>
              <div className="modal-body">
                <div className="mx-auto ">
                  <div className="mb-3">
                    <div className="input-group mb-3">
                      <span className="input-group-text" id="school">
                        School Name*
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="School Name"
                        aria-label="School Name"
                        aria-describedby="school"
                        value={schoolName}
                        onChange={(e) =>
                          setSchoolName(e.target.value.toUpperCase())
                        }
                      />
                    </div>
                    <div className="input-group mb-3">
                      <span className="input-group-text" id="UDISE">
                        UDISE*
                      </span>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="UDISE"
                        aria-label="UDISE"
                        aria-describedby="UDISE"
                        value={udise}
                        onChange={(e) => {
                          if (e.target.value.length <= 11) {
                            setUdise(e.target.value);
                          }
                        }}
                      />
                    </div>
                    <div className="input-group mb-3">
                      <span className="input-group-text" id="schoolAddress">
                        Address*
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="School Address"
                        aria-label="School Address"
                        aria-describedby="schoolAddress"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </div>
                    <div className="input-group mb-3">
                      <span className="input-group-text" id="Village">
                        Village / Ward*
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Village / Ward"
                        aria-label="Village"
                        aria-describedby="Village"
                        value={village}
                        onChange={(e) => setVillage(e.target.value)}
                      />
                    </div>
                    <div className="input-group mb-3">
                      <span className="input-group-text" id="Circle">
                        Circle*
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Circle"
                        aria-label="Circle"
                        aria-describedby="Circle"
                        value={circle}
                        onChange={(e) => setCircle(e.target.value)}
                      />
                    </div>
                    <div className="input-group mb-3">
                      <span className="input-group-text" id="mobile">
                        HOI's Mobile*
                      </span>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="HOI's Mobile"
                        aria-label="mobile"
                        aria-describedby="mobile"
                        value={mobile}
                        onChange={(e) => {
                          if (e.target.value.length <= 10) {
                            setMobile(e.target.value);
                          }
                        }}
                      />
                    </div>
                    <div className="input-group mb-3">
                      <span className="input-group-text" id="Email">
                        School Email
                      </span>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="School Email"
                        aria-label="Email"
                        aria-describedby="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="input-group mb-3">
                      <span className="input-group-text" id="Website">
                        School Website
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="School Website"
                        aria-label="Website"
                        aria-describedby="Website"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                      />
                    </div>
                    <div className="input-group mb-3 mx-auto text-center">
                      <span className="input-group-text" id="Webfile">
                        To Download Reequired Excel File click{" "}
                        <a
                          href="https://raw.githubusercontent.com/ultimate365/webData/main/students.xlsx"
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ marginLeft: 5 }}
                        >
                          Here
                        </a>
                      </span>
                    </div>
                    <div className="input-group mb-3">
                      <input
                        type="file"
                        ref={fileRef}
                        accept=".xlsx,.xls,.csv,.json"
                        onChange={handleFileUpload}
                        className="form-control"
                      />
                    </div>
                    {fileName !== "" && (
                      <div className="row justify-content-center">
                        <div className="col-md-6">
                          <div className="alert alert-success">
                            {fileName} Added
                          </div>
                        </div>
                      </div>
                    )}
                    {error && (
                      <div className="row justify-content-center">
                        <div className="col-md-6">
                          <div className="alert alert-danger">{error}</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <div className="my-2">
                  <button
                    type="button"
                    className="btn btn-danger m-2"
                    onClick={() => {
                      if (
                        schoolName !== "" &&
                        udise !== "" &&
                        address !== "" &&
                        village !== "" &&
                        circle !== "" &&
                        mobile !== "" &&
                        fileName !== ""
                      ) {
                        setShowModal(false);
                      } else {
                        //eslint-disable-next-line
                        alert("Please Fillup All Details");
                      }
                    }}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="noprint">
            <div className="col-md-12">
              {data.length > 0 && (
                <div className="mt-4">
                  <div className="row justify-content-center mb-3">
                    <div className="col-auto">
                      <button
                        onClick={() => downloadFile("json")}
                        className="btn btn-primary me-2"
                      >
                        Download JSON
                      </button>
                      <button
                        onClick={() => downloadFile("csv")}
                        className="btn btn-secondary me-2"
                      >
                        Download CSV
                      </button>
                      <button
                        onClick={() => downloadFile("xlsx")}
                        className="btn btn-success me-2"
                      >
                        Download Excel
                      </button>
                      <button
                        onClick={() => setShowModal(true)}
                        className="btn btn-info me-2"
                      >
                        Re Edit Details
                      </button>
                    </div>
                  </div>
                </div>
              )}
              <h3>Holistic Progress Report Card</h3>
              <button
                className="btn btn-sm btn-danger my-3 mx-2"
                onClick={() => {
                  router.back();
                }}
              >
                Back
              </button>
              <button
                className="btn btn-sm btn-info my-3 mx-2"
                onClick={() => {
                  if (typeof window !== "undefined") {
                    window.print();
                  }
                }}
              >
                Print
              </button>
            </div>
            <div className="col-md-12">
              <button
                className="btn btn-sm btn-dark m-1"
                onClick={() => {
                  setShowFpage(true);
                  setShowIpage(false);
                }}
              >
                Front Page
              </button>
              <button
                className="btn btn-sm btn-success m-1"
                onClick={() => {
                  setShowFpage(false);
                  setShowIpage(true);
                }}
              >
                Inside Page
              </button>
            </div>
          </div>
          <div className="col-md-12 my-2">
            {showFPage && (
              <div className="row mx-auto text-start timesFont">
                {data
                  .filter((item) => item.nclass !== 0)
                  .map((el, index) => {
                    return (
                      <div
                        style={{
                          width: 203,
                          height: 417,
                          justifyContent: "flex-start",
                          alignItems: "center",
                          alignSelf: "center",
                          margin: 10,
                          padding: 2,
                          fontSize: 16,
                          // borderWidth: 0.5,
                          // borderStyle: "dashed",
                        }}
                        className="justify-content-center align-items-center text-start nobreak"
                        key={index}
                      >
                        <div
                          style={{
                            justifyContent: "flex-end",
                            alignItems: "flex-start",
                            alignSelf: "center",
                            width: "100%",
                            height: 50,
                          }}
                        >
                          <p className="m-0 p-0 text-start">
                            {el?.student_name}
                          </p>
                        </div>
                        <div
                          style={{
                            justifyContent: "flex-end",
                            alignItems: "flex-start",
                            alignSelf: "center",
                            width: "100%",
                            height: 50,
                          }}
                        >
                          <p className="m-0 p-0 text-start">{el?.birthdate}</p>
                        </div>
                        <div
                          style={{
                            justifyContent: "flex-end",
                            alignItems: "flex-start",
                            alignSelf: "center",
                            width: "100%",
                            height: 50,
                          }}
                        >
                          <p className="m-0 p-0 text-start">{el?.student_id}</p>
                        </div>
                        <div
                          style={{
                            justifyContent: "flex-end",
                            alignItems: "flex-start",
                            alignSelf: "center",
                            width: "100%",
                            height: 50,
                          }}
                        >
                          <p className="m-0 p-0 text-start">{el?.aadhaar}</p>
                        </div>
                        <div
                          style={{
                            justifyContent: "flex-end",
                            alignItems: "flex-start",
                            alignSelf: "center",
                            width: "100%",
                            height: 50,
                          }}
                        >
                          <p className="m-0 p-0 text-start">{el?.bloodGroup}</p>
                        </div>
                        <div
                          style={{
                            justifyContent: "flex-end",
                            alignItems: "flex-start",
                            alignSelf: "center",
                            width: "100%",
                            height: 50,
                          }}
                        >
                          <p className="m-0 p-0 text-start">
                            {el?.father_name}
                          </p>
                        </div>
                        <div
                          style={{
                            justifyContent: "flex-end",
                            alignItems: "flex-start",
                            alignSelf: "center",
                            width: "100%",
                            height: 50,
                          }}
                        >
                          <p className="m-0 p-0 text-start">
                            {el?.mother_name}
                          </p>
                        </div>
                        <div
                          style={{
                            justifyContent: "flex-end",
                            alignItems: "flex-start",
                            alignSelf: "center",
                            width: "100%",
                            height: 50,
                          }}
                        >
                          <p className="m-0 p-0 text-start">
                            {el?.guardians_name}
                          </p>
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
            {showIPage && (
              <div>
                <div className="noprint">
                  <button
                    className="btn btn-sm btn-primary my-3 mx-2"
                    onClick={() => {
                      setShowSchPart(true);
                      setShowStudentPart(false);
                    }}
                  >
                    School Part
                  </button>
                  <button
                    className="btn btn-sm btn-warning my-3 mx-2"
                    onClick={() => {
                      setShowSchPart(false);
                      setShowStudentPart(true);
                    }}
                  >
                    Student Part
                  </button>
                </div>
                {showSchPart && (
                  <div>
                    <div className="row mx-auto text-start ben">
                      {data
                        .filter((item) => item.nclass !== 0)
                        .map((el, index) => {
                          return (
                            <div
                              style={{
                                width: 530,
                                height: 160,
                                // borderWidth: 0.5,
                                justifyContent: "flex-start",
                                alignItems: "center",
                                alignSelf: "center",
                                margin: 5,
                                padding: 5,
                                paddingLeft: 5,
                                // borderStyle: "dashed",
                                marginBottom: 5,
                              }}
                              className="justify-content-center align-items-center text-start nobreak"
                              key={index}
                            >
                              <div
                                className="row justify-content-start align-items-center text-start"
                                style={{
                                  width: "100%",
                                  fontSize: 10,
                                  height: 20,
                                }}
                              >
                                <div style={{ width: "40%" }}>
                                  <p className="m-0 p-0 text-start">
                                    বিদ্যালয়ের নাম (Name of the School) :
                                  </p>
                                </div>
                                <div
                                  style={{
                                    borderBottomWidth: 1,
                                    borderBottomStyle: "dotted",
                                    width: "60%",
                                  }}
                                >
                                  <p className="m-0 p-0 text-start">
                                    {schoolName}
                                  </p>
                                </div>
                              </div>
                              <div
                                className="row justify-content-center align-items-center text-start"
                                style={{
                                  width: "100%",
                                  fontSize: 10,
                                  height: 10,
                                }}
                              >
                                <div
                                  style={{
                                    borderBottomWidth: 1,
                                    borderBottomStyle: "dotted",
                                    width: "95%",
                                  }}
                                >
                                  <p className="m-0 p-0 text-start"></p>
                                </div>
                              </div>
                              <div
                                className="row justify-content-start align-items-start text-start"
                                style={{
                                  width: "100%",
                                  fontSize: 10,
                                  height: 20,
                                }}
                              >
                                <div style={{ width: "20%" }}>
                                  <p className="m-0 p-0 text-start">
                                    গ্রাম / ওয়ার্ড :
                                    <br />
                                    Village / Ward
                                  </p>
                                </div>
                                <div
                                  style={{
                                    borderBottomWidth: 1,
                                    borderBottomStyle: "dotted",
                                    width: "20%",
                                  }}
                                >
                                  <p className="m-0 p-0 text-start">
                                    {village}
                                  </p>
                                </div>
                                <div style={{ width: "10%" }}>
                                  <p className="m-0 p-0 text-start">
                                    চক্র :
                                    <br />
                                    (CIRCLE)
                                  </p>
                                </div>
                                <div
                                  style={{
                                    borderBottomWidth: 1,
                                    borderBottomStyle: "dotted",
                                    width: "15%",
                                  }}
                                >
                                  <p className="m-0 p-0 text-start">{circle}</p>
                                </div>
                                <div style={{ width: "15%" }}>
                                  <p className="m-0 p-0 text-start">
                                    জেলা :
                                    <br />
                                    (DISTRICT)
                                  </p>
                                </div>
                                <div
                                  style={{
                                    borderBottomWidth: 1,
                                    borderBottomStyle: "dotted",
                                    width: "15%",
                                  }}
                                >
                                  <p className="m-0 p-0 text-start">HOWRAH</p>
                                </div>
                              </div>
                              <div
                                className="row justify-content-start align-items-center text-start mt-2"
                                style={{
                                  width: "100%",
                                  fontSize: 10,
                                  height: 20,
                                }}
                              >
                                <div style={{ width: "30%" }}>
                                  <p className="m-0 p-0 text-start">
                                    বিদ্যালয়ের ইউডাইস + কোড :
                                    <br />
                                    UDISE + Code of School
                                  </p>
                                </div>
                                {udise.split("").map((code, ind) => (
                                  <div
                                    style={{
                                      borderWidth: 1,
                                      borderStyle: "solid",
                                      borderLeftWidth: ind > 0 ? 0 : 1,
                                      width: "4%",
                                    }}
                                    key={ind}
                                  >
                                    <p className="m-0 p-0 text-start">{code}</p>
                                  </div>
                                ))}
                              </div>
                              <div
                                className="row justify-content-start align-items-center text-start mt-2"
                                style={{
                                  width: "100%",
                                  fontSize: 10,
                                  height: 15,
                                }}
                              >
                                <div style={{ width: "20%" }}>
                                  <p className="m-0 p-0 text-start">
                                    বিদ্যালয়ের ই-মেল :
                                    <br />
                                    Email of School
                                  </p>
                                </div>
                                <div
                                  style={{
                                    borderBottomWidth: 1,
                                    borderBottomStyle: "dotted",

                                    width: "30%",
                                  }}
                                >
                                  <p className="m-0 p-0 text-start">{email}</p>
                                </div>
                                <div style={{ width: "25%" }}>
                                  <p className="m-0 p-0 text-start">
                                    বিদ্যালয়ের ওয়েবসাইট :
                                    <br />
                                    School Website
                                  </p>
                                </div>
                                <div
                                  style={{
                                    borderBottomWidth: 1,
                                    borderBottomStyle: "dotted",

                                    width: "25%",
                                  }}
                                >
                                  <p className="m-0 p-0 text-start">{""}</p>
                                </div>
                              </div>
                              <div
                                className="row justify-content-start align-items-center text-start mt-3"
                                style={{
                                  width: "100%",
                                  fontSize: 10,
                                  height: 20,
                                }}
                              >
                                <div style={{ width: "30%" }}>
                                  <p className="m-0 p-0 text-start">
                                    বিদ্যালয়ের দূরাভাষ নং :
                                    <br />
                                    Phone No. of School
                                  </p>
                                </div>
                                <div
                                  style={{
                                    borderBottomWidth: 1,
                                    borderBottomStyle: "dotted",

                                    width: "30%",
                                  }}
                                >
                                  <p className="m-0 p-0 text-start">{mobile}</p>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                )}
                {showStudentPart && (
                  <div>
                    <div className="row mx-auto text-start ben">
                      {data
                        .filter((item) => item.nclass !== 0)
                        .map((el, index) => {
                          return (
                            <div
                              style={{
                                width: 570,
                                height: 280,
                                // borderWidth: 0.5,
                                justifyContent: "flex-start",
                                alignItems: "center",
                                alignSelf: "center",
                                margin: 5,
                                padding: 5,
                                paddingLeft: 5,
                                // borderStyle: "dashed",
                                marginBottom: 5,
                              }}
                              className="justify-content-center align-items-center text-start nobreak"
                              key={index}
                            >
                              <div
                                className="row justify-content-center align-items-start text-start"
                                style={{
                                  width: "100%",
                                  fontSize: 10,
                                  height: 20,
                                }}
                              >
                                <div className="col-md-5">
                                  <p className="m-0 p-0 text-start">
                                    ছাত্রী/ছাত্রের নাম (Name of the student):{" "}
                                  </p>
                                </div>
                                <div
                                  style={{
                                    borderBottomWidth: 1,
                                    borderBottomStyle: "dotted",
                                  }}
                                  className="col-md-7"
                                >
                                  <p className="m-0 p-0 text-start">
                                    {el?.student_name}
                                  </p>
                                </div>
                              </div>
                              <div
                                className="row justify-content-center align-items-start text-start"
                                style={{
                                  width: "100%",
                                  fontSize: 10,
                                  height: 20,
                                }}
                              >
                                <div style={{ width: "14%" }}>
                                  <p className="m-0 p-0 text-start">
                                    শ্রেণী (Class) :
                                  </p>
                                </div>
                                <div
                                  style={{
                                    borderBottomWidth: 1,
                                    borderBottomStyle: "dotted",
                                    width: "11%",
                                  }}
                                >
                                  <p className="m-0 p-0 text-start">
                                    {el?.class?.split(" (A)")[0]}
                                  </p>
                                </div>
                                <div style={{ width: "17%" }}>
                                  <p className="m-0 p-0 text-start">
                                    বিভাগ (Section) :
                                  </p>
                                </div>
                                <div
                                  style={{
                                    borderBottomWidth: 1,
                                    borderBottomStyle: "dotted",
                                    width: "6%",
                                  }}
                                >
                                  <p className="m-0 p-0 text-start">A</p>
                                </div>
                                <div style={{ width: "20%" }}>
                                  <p className="m-0 p-0 text-start">
                                    ক্রমিক নং (Roll no.) :
                                  </p>
                                </div>
                                <div
                                  style={{
                                    borderBottomWidth: 1,
                                    borderBottomStyle: "dotted",
                                    width: "6%",
                                  }}
                                >
                                  <p className="m-0 p-0 text-start">
                                    {el?.roll_no}
                                  </p>
                                </div>
                                <div style={{ width: "16%" }}>
                                  <p className="m-0 p-0 text-start">
                                    লিঙ্গ (Gender) :
                                  </p>
                                </div>
                                <div
                                  style={{
                                    borderBottomWidth: 1,
                                    borderBottomStyle: "dotted",
                                    width: "8%",
                                  }}
                                >
                                  <p className="m-0 p-0 text-start">
                                    {el?.gender}
                                  </p>
                                </div>
                              </div>
                              <div
                                className="row justify-content-center align-items-end text-start"
                                style={{
                                  width: "100%",
                                  fontSize: 10,
                                  height: 20,
                                }}
                              >
                                <div style={{ width: "25%" }}>
                                  <p className="m-0 p-0 text-start">
                                    জন্ম তারিখ (Date of Birth):{" "}
                                  </p>
                                </div>
                                <div
                                  style={{
                                    borderBottomWidth: 1,
                                    borderBottomStyle: "dotted",
                                    width: "75%",
                                  }}
                                >
                                  <p className="m-0 p-0 text-start">
                                    {el?.birthdate}
                                  </p>
                                </div>
                              </div>
                              <div
                                className="row"
                                style={{
                                  width: "100%",
                                  fontSize: 10,
                                  justifyContent: "left",
                                  alignItems: "flex-start",
                                  height: 20,
                                }}
                              >
                                <div style={{ width: "40%" }}>
                                  <p className="m-0 p-0 text-start">
                                    বাংলার শিক্ষা পোর্টালে শিক্ষার্থীর ক্রমাঙ্ক
                                    :
                                    <br />
                                    Student's ID of BSP
                                  </p>
                                </div>
                                <div
                                  style={{
                                    borderBottomWidth: 1,
                                    borderBottomStyle: "dotted",
                                    width: "60%",
                                  }}
                                >
                                  <p className="m-0 p-0 text-start">
                                    {el?.student_id}
                                  </p>
                                </div>
                              </div>
                              <div
                                className="row justify-content-start align-items-center text-start mt-2"
                                style={{
                                  width: "100%",
                                  fontSize: 10,
                                  height: 20,
                                }}
                              >
                                <div style={{ width: "30%" }}>
                                  <p className="m-0 p-0 text-start">
                                    আধার নং (Aadhaar No.) :
                                  </p>
                                </div>
                                <div
                                  style={{
                                    borderBottomWidth: 1,
                                    borderBottomStyle: "dotted",
                                    width: "70%",
                                  }}
                                >
                                  <p className="m-0 p-0 text-start">
                                    {el?.aadhaar}
                                  </p>
                                </div>
                              </div>
                              <div
                                className="row justify-content-start align-items-center text-start"
                                style={{
                                  width: "100%",
                                  fontSize: 8,
                                  height: 25,
                                }}
                              >
                                <div style={{ width: "22%" }}>
                                  <p className="m-0 p-0 text-start">
                                    রক্তের গ্রুপ (Blood Group) :
                                  </p>
                                </div>
                                <div
                                  style={{
                                    borderBottomWidth: 1,
                                    borderBottomStyle: "dotted",
                                    width: "10.71%",
                                  }}
                                >
                                  <p className="m-0 p-0 text-start">
                                    {el?.bloodGroup}
                                  </p>
                                </div>
                                <div style={{ width: "15%" }}>
                                  <p className="m-0 p-0 text-start">
                                    উচ্চতা (Height) :
                                  </p>
                                </div>
                                <div
                                  style={{
                                    borderBottomWidth: 1,
                                    borderBottomStyle: "dotted",
                                    width: "10%",
                                  }}
                                >
                                  <p className="m-0 p-0 text-start">
                                    {el?.height}
                                  </p>
                                </div>
                                <div style={{ width: "18%" }}>
                                  <p className="m-0 p-0 text-start">
                                    ওজন (Weight) :
                                  </p>
                                </div>
                                <div
                                  style={{
                                    borderBottomWidth: 1,
                                    borderBottomStyle: "dotted",
                                    width: "8%",
                                  }}
                                >
                                  <p className="m-0 p-0 text-start">
                                    {el?.weight}
                                  </p>
                                </div>
                              </div>
                              <div
                                className="row justify-content-center align-items-end text-start"
                                style={{
                                  width: "100%",
                                  fontSize: 10,
                                  height: 20,
                                }}
                              >
                                <div style={{ width: "40%" }}>
                                  <p className="m-0 p-0 text-start">
                                    পিতার নাম (Father's Name):{" "}
                                  </p>
                                </div>
                                <div
                                  style={{
                                    borderBottomWidth: 1,
                                    borderBottomStyle: "dotted",
                                    width: "60%",
                                  }}
                                >
                                  <p className="m-0 p-0 text-start">
                                    {el?.father_name}
                                  </p>
                                </div>
                              </div>
                              <div
                                className="row justify-content-center align-items-end text-start"
                                style={{
                                  width: "100%",
                                  fontSize: 10,
                                  height: 20,
                                }}
                              >
                                <div style={{ width: "40%" }}>
                                  <p className="m-0 p-0 text-start">
                                    মাতার নাম (Mother's Name):{" "}
                                  </p>
                                </div>
                                <div
                                  style={{
                                    borderBottomWidth: 1,
                                    borderBottomStyle: "dotted",
                                    width: "60%",
                                  }}
                                >
                                  <p className="m-0 p-0 text-start">
                                    {el?.mother_name}
                                  </p>
                                </div>
                              </div>
                              <div
                                className="row justify-content-center align-items-end text-start"
                                style={{
                                  width: "100%",
                                  fontSize: 10,
                                  height: 20,
                                }}
                              >
                                <div style={{ width: "40%" }}>
                                  <p className="m-0 p-0 text-start">
                                    অভিভাবিকা / অভিভাবকের নাম (Gurdian's Name):{" "}
                                  </p>
                                </div>
                                <div
                                  style={{
                                    borderBottomWidth: 1,
                                    borderBottomStyle: "dotted",
                                    width: "60%",
                                  }}
                                >
                                  <p className="m-0 p-0 text-start">
                                    {el?.guardians_name}
                                  </p>
                                </div>
                              </div>
                              <div
                                className="row justify-content-center align-items-end text-start"
                                style={{
                                  width: "100%",
                                  fontSize: 10,
                                  height: 20,
                                }}
                              >
                                <div style={{ width: "35%" }}>
                                  <p className="m-0 p-0 text-start">
                                    দূরাভাষ নং (Contact No.):{" "}
                                  </p>
                                </div>
                                <div
                                  style={{
                                    borderBottomWidth: 1,
                                    borderBottomStyle: "dotted",
                                    width: "65%",
                                  }}
                                >
                                  <p className="m-0 p-0 text-start">
                                    {el?.mobile === "0"
                                      ? ""
                                      : el?.mobile === "9999999999"
                                      ? ""
                                      : el?.mobile === "7872882343"
                                      ? ""
                                      : el?.mobile === "7679230482"
                                      ? ""
                                      : el?.mobile === "9933684468"
                                      ? ""
                                      : el?.mobile}
                                  </p>
                                </div>
                              </div>
                              <div
                                className="row justify-content-center align-items-end text-start"
                                style={{
                                  width: "100%",
                                  fontSize: 10,
                                  height: 20,
                                }}
                              >
                                <div style={{ width: "35%" }}>
                                  <p className="m-0 p-0 text-start">
                                    শিক্ষার্থীর ঠিকানা (Student's Address):{" "}
                                  </p>
                                </div>
                                <div
                                  style={{
                                    borderBottomWidth: 1,
                                    borderBottomStyle: "dotted",
                                    width: "65%",
                                  }}
                                >
                                  <p className="m-0 p-0 text-start">
                                    {el?.address ? el?.address : address}
                                  </p>
                                </div>
                              </div>
                              <div
                                className="row justify-content-start align-items-end text-start"
                                style={{
                                  width: "100%",
                                  fontSize: 10,
                                  height: 20,
                                }}
                              >
                                <div style={{ width: "35%" }}>
                                  <p className="m-0 p-0 text-start">
                                    Whether 'Divyang' (CWSN) (Yes /No):{" "}
                                  </p>
                                </div>
                                <div
                                  style={{
                                    borderBottomWidth: 1,
                                    borderBottomStyle: "dotted",
                                    width: "50%",
                                  }}
                                >
                                  <p className="m-0 p-0 text-start">
                                    {el?.disability ? el.disability : "NO"}
                                  </p>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
