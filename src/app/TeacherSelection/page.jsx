"use client";

import { useState, useEffect } from "react";
import { useGlobalContext } from "../../context/Store";
import TeacherList from "../../pdfs/TeacherList";
import dynamic from "next/dynamic";
import Loader from "../../components/Loader";
const TeacherTransferComponent = () => {
  const PDFDownloadLink = dynamic(
    async () =>
      await import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
    {
      ssr: false,
      loading: () => <Loader />,
    }
  );
  const { teachersState } = useGlobalContext();
  const asSorted = teachersState.sort((a, b) => {
    if (a.gp < b.gp) {
      return -1;
    }
    if (a.gp > b.gp) {
      return 1;
    }
    if (a.school < b.school) {
      return -1;
    }
    if (a.school > b.school) {
      return 1;
    }
    return a.rank - b.rank;
  });
  const [data, setData] = useState([]);
  const [showTeacherSelection, setShowTeacherSelection] = useState(true);
  const [title, setTitle] = useState("Teacher List");
  // State management
  const [leftList, setLeftList] = useState([]);
  const [rightList, setRightList] = useState([]);
  const [showTable, setShowTable] = useState(false);

  // Search and pagination states
  const [leftSearch, setLeftSearch] = useState("");
  const [rightSearch, setRightSearch] = useState("");
  const [currentLeftPage, setCurrentLeftPage] = useState(1);
  const [currentRightPage, setCurrentRightPage] = useState(1);
  const [reportPage, setReportPage] = useState(1);
  const itemsPerPage = 10;

  // Filtered lists
  const filteredLeft = leftList.filter((teacher) =>
    teacher.tname.toLowerCase().includes(leftSearch.toLowerCase())
  );

  const filteredRight = rightList.filter((teacher) =>
    teacher.tname.toLowerCase().includes(rightSearch.toLowerCase())
  );

  // Pagination calculations
  const leftPageCount = Math.ceil(filteredLeft.length / itemsPerPage);
  const rightPageCount = Math.ceil(filteredRight.length / itemsPerPage);
  const reportPageCount = Math.ceil(rightList.length / itemsPerPage);
  // Paginated lists
  const paginatedLeft = filteredLeft.slice(
    (currentLeftPage - 1) * itemsPerPage,
    currentLeftPage * itemsPerPage
  );

  const paginatedRight = filteredRight.slice(
    (currentRightPage - 1) * itemsPerPage,
    currentRightPage * itemsPerPage
  );
  const paginatedReport = rightList.slice(
    (reportPage - 1) * itemsPerPage,
    reportPage * itemsPerPage
  );
  // Move item from left to right
  const moveToRight = async (teacher) => {
    setLeftList(leftList.filter((item) => item.id !== teacher.id));
    setRightList(await sortTeacher([...rightList, teacher]));
    setLeftSearch(""); // Clear search after transfer
  };

  // Move item from right to left
  const moveToLeft = async (teacher) => {
    setRightList(rightList.filter((item) => item.id !== teacher.id));
    setLeftList(await sortTeacher([...leftList, teacher]));
    setRightSearch(""); // Clear search after transfer
  };

  // Move all items from left to right
  const moveAllToRight = async () => {
    setRightList(await sortTeacher([...rightList, ...filteredLeft]));
    setLeftList(
      leftList.filter((item) => !filteredLeft.some((t) => t.id === item.id))
    );
    setLeftSearch("");
  };

  // Move all items from right to left
  const moveAllToLeft = async () => {
    setLeftList(await sortTeacher([...leftList, ...filteredRight]));
    setRightList(
      rightList.filter((item) => !filteredRight.some((t) => t.id === item.id))
    );
    setRightSearch("");
  };

  // Handle complete action
  const handleComplete = () => {
    setShowTable(true);
    setReportPage(1);
  };

  const sortTeacher = async (teachers) => {
    const newDatas = teachers.sort((a, b) => {
      if (a.gp < b.gp) {
        return -1;
      }
      if (a.gp > b.gp) {
        return 1;
      }
      if (a.school < b.school) {
        return -1;
      }
      if (a.school > b.school) {
        return 1;
      }
      return a.rank - b.rank;
    });
    return newDatas;
  };
  // Initialize lists
  useEffect(() => {
    setLeftList(data);
    setRightList([]);
    //eslint-disable-next-line
  }, []);
  useEffect(() => {
    document.title = `Teacher Selection System`;
    //eslint-disable-next-line
  }, [data, leftList, rightList, filteredLeft, filteredRight]);
  return (
    <div className="container-fluid mt-1">
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
                        setData(asSorted);
                        setLeftList(asSorted);
                        setRightList([]);
                        setShowTeacherSelection(false);
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
                          asSorted.filter((el) => el.association === "WBTPTA")
                        );
                        setLeftList(
                          asSorted.filter((el) => el.association === "WBTPTA")
                        );
                        setRightList([]);
                        setShowTeacherSelection(false);
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
          {!showTable && (
            <button
              type="button"
              className="btn btn-success p-2 rounded noprint"
              onClick={() => {
                setShowTeacherSelection(true);
              }}
            >
              Show Teacher Selection
            </button>
          )}
          <h1 className="text-center mb-4 noprint">Teacher Selection System</h1>

          {!showTable ? (
            <>
              <div className="row mb-4">
                <div className="col-md-12 text-center">
                  <div className="alert alert-info">
                    <strong>Instructions:</strong> Search for teachers, select
                    them to transfer between boxes, then click "Complete
                    Selection" to generate the report.
                  </div>
                </div>
              </div>

              <div className="row">
                {/* Left Box */}
                <div className="col-md-5 border rounded p-3 bg-light shadow-sm">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="mb-0">Available Teachers</h4>
                    <span className="badge bg-primary">
                      {filteredLeft.length} teachers
                    </span>
                  </div>

                  {/* Search input */}
                  <div className="input-group mb-3">
                    <span className="input-group-text">
                      <i className="bi bi-search"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search teachers..."
                      value={leftSearch}
                      onChange={(e) => {
                        setLeftSearch(e.target.value);
                        setCurrentLeftPage(1);
                      }}
                    />
                    <button
                      className="btn btn-outline-secondary"
                      onClick={() => setLeftSearch("")}
                      disabled={!leftSearch}
                    >
                      Clear
                    </button>
                  </div>

                  {/* Teacher list */}
                  <div
                    className="list-group mb-3"
                    style={{ maxHeight: "400px", overflowY: "auto" }}
                  >
                    {paginatedLeft.length > 0 ? (
                      paginatedLeft.map((teacher) => (
                        <button
                          key={teacher.id}
                          type="button"
                          className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                          onClick={() => moveToRight(teacher)}
                        >
                          {teacher.tname}
                          <span className="badge bg-primary rounded-pill">
                            <i className="bi bi-arrow-right"></i>
                          </span>
                        </button>
                      ))
                    ) : (
                      <div className="text-center py-4 text-muted">
                        {leftSearch
                          ? "No matching teachers found"
                          : "No teachers available"}
                      </div>
                    )}
                  </div>

                  {/* Pagination */}
                  <div className="d-flex justify-content-between align-items-center">
                    <button
                      className="btn btn-outline-primary"
                      onClick={moveAllToRight}
                      disabled={filteredLeft.length === 0}
                    >
                      Move All
                    </button>

                    <div>
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() =>
                          setCurrentLeftPage((prev) => Math.max(prev - 1, 1))
                        }
                        disabled={currentLeftPage === 1}
                      >
                        <i className="bi bi-chevron-left"></i>
                      </button>

                      <span className="mx-2">
                        Page {currentLeftPage} of {leftPageCount || 1}
                      </span>

                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() =>
                          setCurrentLeftPage((prev) =>
                            Math.min(prev + 1, leftPageCount)
                          )
                        }
                        disabled={
                          currentLeftPage === leftPageCount ||
                          leftPageCount === 0
                        }
                      >
                        <i className="bi bi-chevron-right"></i>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Middle Controls */}
                <div className="col-md-2 d-flex flex-column justify-content-center align-items-center">
                  <button
                    className="btn btn-primary mb-3 px-4 py-2"
                    onClick={moveAllToRight}
                    disabled={filteredLeft.length === 0}
                  >
                    <i className="bi bi-arrow-right fs-4"></i>
                  </button>

                  <button
                    className="btn btn-primary px-4 py-2"
                    onClick={moveAllToLeft}
                    disabled={filteredRight.length === 0}
                  >
                    <i className="bi bi-arrow-left fs-4"></i>
                  </button>

                  <div className="text-center mt-4 text-muted">
                    <small>Click arrows to transfer all</small>
                  </div>
                </div>

                {/* Right Box */}
                <div className="col-md-5 border rounded p-3 bg-light shadow-sm">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="mb-0">Selected Teachers</h4>
                    <span className="badge bg-success">
                      {filteredRight.length} selected
                    </span>
                  </div>

                  {/* Search input */}
                  <div className="input-group mb-3">
                    <span className="input-group-text">
                      <i className="bi bi-search"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search selected..."
                      value={rightSearch}
                      onChange={(e) => {
                        setRightSearch(e.target.value);
                        setCurrentRightPage(1);
                      }}
                    />
                    <button
                      className="btn btn-outline-secondary"
                      onClick={() => setRightSearch("")}
                      disabled={!rightSearch}
                    >
                      Clear
                    </button>
                  </div>

                  {/* Teacher list */}
                  <div
                    className="list-group mb-3"
                    style={{ maxHeight: "400px", overflowY: "auto" }}
                  >
                    {paginatedRight.length > 0 ? (
                      paginatedRight.map((teacher) => (
                        <button
                          key={teacher.id}
                          type="button"
                          className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                          onClick={() => moveToLeft(teacher)}
                        >
                          {teacher.tname}
                          <span className="badge bg-danger rounded-pill">
                            <i className="bi bi-x"></i>
                          </span>
                        </button>
                      ))
                    ) : (
                      <div className="text-center py-4 text-muted">
                        {rightSearch
                          ? "No matching teachers found"
                          : "No teachers selected"}
                      </div>
                    )}
                  </div>

                  {/* Pagination */}
                  <div className="d-flex justify-content-between align-items-center">
                    <button
                      className="btn btn-outline-danger"
                      onClick={moveAllToLeft}
                      disabled={filteredRight.length === 0}
                    >
                      Remove All
                    </button>

                    <div>
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() =>
                          setCurrentRightPage((prev) => Math.max(prev - 1, 1))
                        }
                        disabled={currentRightPage === 1}
                      >
                        <i className="bi bi-chevron-left"></i>
                      </button>

                      <span className="mx-2">
                        Page {currentRightPage} of {rightPageCount || 1}
                      </span>

                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() =>
                          setCurrentRightPage((prev) =>
                            Math.min(prev + 1, rightPageCount)
                          )
                        }
                        disabled={
                          currentRightPage === rightPageCount ||
                          rightPageCount === 0
                        }
                      >
                        <i className="bi bi-chevron-right"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mx-auto col-md-6 m-2">
                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <i className="bi bi-card-heading"> Title</i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Title"
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                  />
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() => setTitle("")}
                    disabled={!title}
                  >
                    Clear
                  </button>
                </div>
              </div>
              {/* Complete Button */}
              <div className="row mt-4">
                <div className="col text-center">
                  <button
                    className="btn btn-primary btn-lg px-5 py-3"
                    onClick={handleComplete}
                    disabled={rightList.length === 0 || title === ""}
                  >
                    <i className="bi bi-check-circle me-2"></i>
                    Complete Selection
                  </button>
                </div>
              </div>
            </>
          ) : (
            /* Table View */
            <div className="container-fluid">
              <div className="noprint">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h2>Selected Teachers Report</h2>
                  <button
                    className="btn btn-secondary"
                    onClick={() => setShowTable(false)}
                  >
                    <i className="bi bi-arrow-left me-2"></i>
                    Back to Selection
                  </button>
                </div>
              </div>

              <div className="card shadow-sm m-0 p-0">
                {/* <div className="card-header bg-primary text-white">
                  <h5 className="mb-0">Teacher Transfer Summary</h5>
                </div> */}
                <div className="card-body">
                  <table className="table table-striped table-bordered">
                    <thead className="table-dark">
                      <tr>
                        <th>Sl</th>
                        <th>Name</th>
                        <th>School</th>
                        <th>GP</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedReport.map((teacher, index) => (
                        <tr key={teacher.id}>
                          <td>{(reportPage - 1) * itemsPerPage + index + 1}</td>
                          <td>{teacher.tname}</td>
                          <td>{teacher.school}</td>
                          <td>{teacher.gp}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <div className="d-flex justify-content-between align-items-center mt-3">
                    <div className="text-muted">
                      Generated on:{" "}
                      {new Date()
                        .toISOString()
                        .split("T")[0]
                        .split("-")
                        .reverse()
                        .join("-")}{" "}
                      at {new Date().toLocaleTimeString()}
                    </div>
                    <div>
                      Total Teachers: <strong>{rightList.length}</strong>
                    </div>
                  </div>
                  {/* Report Pagination */}
                  <div className="d-flex justify-content-center mt-4">
                    <nav>
                      <ul className="pagination">
                        <li
                          className={`page-item ${
                            reportPage === 1 ? "disabled" : ""
                          }`}
                        >
                          <button
                            className="page-link"
                            onClick={() =>
                              setReportPage((prev) => Math.max(prev - 1, 1))
                            }
                          >
                            <i className="bi bi-chevron-left"></i>
                          </button>
                        </li>

                        {Array.from(
                          { length: Math.min(5, reportPageCount) },
                          (_, i) => {
                            const page =
                              Math.max(
                                1,
                                Math.min(reportPageCount - 4, reportPage - 2)
                              ) + i;
                            if (page > reportPageCount) return null;
                            return (
                              <li
                                key={page}
                                className={`page-item ${
                                  page === reportPage ? "active" : ""
                                }`}
                              >
                                <button
                                  className="page-link"
                                  onClick={() => setReportPage(page)}
                                >
                                  {page}
                                </button>
                              </li>
                            );
                          }
                        )}

                        <li
                          className={`page-item ${
                            reportPage === reportPageCount ? "disabled" : ""
                          }`}
                        >
                          <button
                            className="page-link"
                            onClick={() =>
                              setReportPage((prev) =>
                                Math.min(prev + 1, reportPageCount)
                              )
                            }
                          >
                            <i className="bi bi-chevron-right"></i>
                          </button>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>

              <div className="my-4">
                <PDFDownloadLink
                  document={<TeacherList data={rightList} title={title} />}
                  fileName={`${title}.pdf`}
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
                    loading ? "Please Wait..." : "Download Teacher List"
                  }
                </PDFDownloadLink>
                {/* <TeacherList data={rightList} title={title} /> */}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TeacherTransferComponent;
