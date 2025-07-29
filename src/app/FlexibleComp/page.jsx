"use client";
import React, { useEffect, useState } from "react";
import {
  createDownloadLink,
  getValues,
  uniq,
} from "../../modules/calculatefunctions";
import { useGlobalContext } from "../../context/Store";
import { useRouter } from "next/navigation";
import { gpEngNames, keysData } from "../../modules/constants";
import dynamic from "next/dynamic";
import FlexibleTeacherList from "../../pdfs/FlexibleTeacherList";
function FlexibleComp() {
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
  const [teacherData, setTeacherData] = useState(keysData);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [fetchedData, setFetchedData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isclicked, setIsclicked] = useState(false);
  const [search, setSearch] = useState("");
  const [heading, setHeading] = useState("");
  const [fkey, setFkey] = useState("");
  const [fvalue, setFvalue] = useState("");
  const [firstItem, setFirstItem] = useState(0);
  const [visibleItems, setVisibleItems] = useState(10);
  const [showDownloadBtn, setShowDownloadBtn] = useState(false);
  const [showPagination, setShowPagination] = useState(true);
  const loadMore = () => {
    setVisibleItems((prevVisibleItems) => prevVisibleItems + 10);
    setFirstItem((prevFirstItem) => prevFirstItem + 10);
  };
  const loadPrev = () => {
    setVisibleItems((prevVisibleItems) => prevVisibleItems - 10);
    setFirstItem((prevFirstItem) => prevFirstItem - 10);
  };

  const userData = async () => {
    setFetchedData(teachersState);
    setFilteredData(teachersState);
  };

  function handleSelect(e) {
    const value = e.target.value;
    let y = [];

    y = [...selectedKeys, value];
    if (y.filter((el) => el === value).length > 1) {
      y = uniq(y);
    }
    setSelectedKeys(y);
    setTeacherData(teacherData.filter((el) => el.keyName !== value));
    if (typeof window !== undefined) {
      document.getElementById("selectForm").value = "";
    }
  }

  useEffect(() => {
    if (!state) {
      router.push("/logout");
    }
    //eslint-disable-next-line
  }, []);
  useEffect(() => {
    document.title = heading.toUpperCase()?.split(" ")?.join("_");
  }, [selectedKeys, teacherData, heading]);
  useEffect(() => {
    userData();
  }, []);
  return (
    <div className="container-fluid my-5 mx-auto">
      {!isSubmitted ? (
        <>
          <div className="noprint col-md-4 mx-auto mb-3">
            <select
              className="form-select"
              defaultValue={""}
              onChange={handleSelect}
              aria-label="Default select example"
              id="selectForm"
            >
              <option value="">Select Key Name</option>
              {teacherData
                .sort((a, b) => a.keyName.localeCompare(b.keyName))
                .map((el, ind) => (
                  <option value={el.keyName} key={ind}>
                    {el.displayName}
                  </option>
                ))}
            </select>
          </div>
          {selectedKeys.length > 0 && (
            <>
              <div className=" justify-content-center align-items-center mx-auto">
                {selectedKeys.map((el, ind) => {
                  const currentKey = keysData.filter(
                    (keys) => keys.keyName === el
                  )[0];
                  return (
                    <span
                      className={`btn btn-sm btn-${
                        (ind + 1) % 2 === 0 ? "primary" : "success"
                      } fs-6 m-1`}
                      key={ind}
                      onClick={() => {
                        setSelectedKeys(
                          selectedKeys.filter((keys) => keys !== el)
                        );
                        const currentKey = keysData.filter(
                          (keys) => keys.keyName === el
                        )[0];
                        setTeacherData([...teacherData, currentKey]);
                      }}
                    >
                      {currentKey.displayName} <i className={` bi bi-x `}></i>
                    </span>
                  );
                })}
              </div>
              <button
                type="button"
                className="btn btn-info noprint text-white font-weight-bold p-2 m-5 rounded"
                onClick={() => {
                  setIsSubmitted(true);
                }}
              >
                Submit
              </button>
            </>
          )}
        </>
      ) : (
        <>
          <div>
            <input
              className="form-control w-50 noprint"
              type="text"
              value={search}
              placeholder="Enter Teacher Name"
              onChange={(e) => {
                setSearch(e.target.value);
                setFilteredData(
                  fetchedData.filter((el) => {
                    return el.tname
                      .toLowerCase()
                      .includes(search.toLowerCase());
                  })
                );
              }}
            />
            <div className="my-2">
              <input
                className="form-control w-50 noprint"
                type="text"
                value={heading}
                placeholder="Enter Table Heading"
                onChange={(e) => {
                  setHeading(e.target.value);
                }}
              />
            </div>
            <div className="my-2 row justify-content-center align-items-center mx-auto">
              <input
                className="form-control w-25  m-2 noprint"
                type="text"
                value={fkey}
                placeholder="Enter Key Name"
                onChange={(e) => {
                  setFkey(e.target.value);
                }}
                style={{ height: 50 }}
              />
              <input
                className="form-control  m-2 noprint"
                type="text"
                value="="
                placeholder="Condition"
                disabled
                style={{ height: 50, width: 50 }}
              />

              <input
                className="form-control w-25  m-2 noprint"
                type="text"
                value={fvalue}
                placeholder="Enter Value"
                onChange={(e) => {
                  setFvalue(e.target.value);
                }}
                style={{ height: 50 }}
              />
              {fkey !== "" && fvalue !== "" && (
                <div className="">
                  <button
                    type="button"
                    className="btn btn-info noprint text-white font-weight-bold p-2 m-5 rounded"
                    style={{ height: 50, width: 100 }}
                    onClick={() => {
                      const fData = filteredData.filter((el) => {
                        return el[fkey?.toString()?.toLowerCase()]
                          ?.toString()
                          ?.toLowerCase()
                          ?.includes(fvalue?.toString()?.toLowerCase());
                      });
                      setFilteredData(
                        fData.length > 0
                          ? fData
                          : fetchedData.filter((el) => {
                              return el[fkey?.toString()?.toLowerCase()]
                                ?.toString()
                                ?.toLowerCase()
                                ?.includes(fvalue?.toString()?.toLowerCase());
                            })
                      );
                      setShowDownloadBtn(false);
                    }}
                  >
                    Filter
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger noprint text-white font-weight-bold p-2 m-5 rounded"
                    style={{ height: 50, width: 100 }}
                    onClick={() => {
                      setFilteredData(fetchedData);
                      setFkey("");
                      setFvalue("");
                      setShowDownloadBtn(false);
                    }}
                  >
                    Clear
                  </button>
                </div>
              )}
            </div>
            <div className="my-2 noprint">
              <button
                type="button"
                className="btn btn-success noprint text-white font-weight-bold p-2 m-5 rounded"
                onClick={() => {
                  const fData = filteredData.filter((el) =>
                    fetchedData.filter((el) => el.association !== "WBTPTA")
                  );
                  if (fData.length > 0) {
                    setFilteredData(
                      fetchedData.filter((el) => el.association === "WBTPTA")
                    );
                  } else {
                    setFilteredData(
                      filteredData.filter((el) => el.association === "WBTPTA")
                    );
                  }
                  setShowDownloadBtn(false);
                }}
              >
                Filter WBTPTA
              </button>
              <button
                type="button"
                className="btn btn-danger noprint text-white font-weight-bold p-2 m-5 rounded"
                onClick={() => {
                  setIsSubmitted(false);
                  setSelectedKeys([]);
                  setTeacherData(keysData);
                  setHeading("");
                  setFkey("");
                  setFvalue("");
                  setFirstItem(0);
                  setVisibleItems(10);
                  setShowPagination(true);
                  setFilteredData(fetchedData);
                  setShowDownloadBtn(false);
                }}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-success noprint text-white font-weight-bold p-2 m-5 rounded"
                onClick={() => {
                  setShowDownloadBtn(!showDownloadBtn);
                }}
              >
                {showDownloadBtn ? "Hide Download" : "Show Download"}
              </button>
              <div>
                {gpEngNames.map((el, ind) => (
                  <button
                    type="button"
                    className="btn btn-primary m-1"
                    key={ind}
                    onClick={() => {
                      setFilteredData(
                        filteredData.filter((tea) => tea.gp === el)
                      );
                    }}
                  >
                    {el}
                  </button>
                ))}
              </div>
            </div>
            {showDownloadBtn && (
              <div className="my-4">
                <PDFDownloadLink
                  document={
                    <FlexibleTeacherList
                      data={filteredData}
                      title={
                        heading
                          ? heading.toUpperCase()?.split(" ")?.join("_")
                          : "Teachers List"
                      }
                      selectedKeys={selectedKeys}
                    />
                  }
                  fileName={`${
                    heading
                      ? heading.toUpperCase()?.split(" ")?.join("_")
                      : "Teachers List"
                  }.pdf`}
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
                {/* <FlexibleTeacherList
                  data={filteredData}
                  title={heading ? heading.toUpperCase()?.split(" ")?.join("_") : "Teachers List"}
                  selectedKeys={selectedKeys}
                /> */}
              </div>
            )}
            <h3 className="text-center mx-auto">{heading.toUpperCase()}</h3>
            <table className="table table-white table-hover table-striped table-borderd align-middle table-responsive mx-auto text-center">
              <thead>
                <tr className="text-center">
                  <th className="text-center">Sl No.</th>
                  {selectedKeys.map((el, ind) => {
                    const currentKey = keysData.filter(
                      (keys) => keys.keyName === el
                    )[0];
                    return (
                      <th className="text-center" key={ind}>
                        {currentKey.displayName}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {getValues(
                  selectedKeys,
                  filteredData.slice(firstItem, visibleItems),
                  firstItem
                )}
              </tbody>
            </table>
          </div>

          {showPagination && (
            <div>
              {firstItem >= 10 && (
                <button
                  type="button"
                  className="btn btn-info noprint text-white font-weight-bold p-2 m-5 rounded"
                  onClick={() => {
                    setFirstItem(0);
                    setVisibleItems(10);
                  }}
                >
                  <i className="bi bi-chevron-bar-left"></i>
                </button>
              )}
              {firstItem >= 10 && (
                <button
                  type="button"
                  className="btn btn-primary noprint text-white font-weight-bold p-2 m-5 rounded"
                  onClick={loadPrev}
                >
                  <i className="bi bi-chevron-left"></i>
                </button>
              )}
              {visibleItems < filteredData.length && (
                <button
                  type="button"
                  className="btn btn-success noprint text-white font-weight-bold p-2 m-5 rounded"
                  onClick={loadMore}
                >
                  <i className="bi bi-chevron-right"></i>
                </button>
              )}
              {visibleItems < filteredData.length && (
                <button
                  type="button"
                  className="btn btn-warning noprint text-white font-weight-bold p-2 m-5 rounded"
                  onClick={() => {
                    setFirstItem(filteredData.length - 10);
                    setVisibleItems(filteredData.length);
                  }}
                >
                  <i className="bi bi-chevron-bar-right"></i>
                </button>
              )}
            </div>
          )}
          {showPagination ? (
            <button
              type="button"
              className="btn btn-warning noprint text-white font-weight-bold p-2 m-5 rounded"
              onClick={() => {
                setFirstItem(0);
                setVisibleItems(filteredData.length);
                setShowPagination(false);
              }}
            >
              Hide Pagination
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-warning noprint text-white font-weight-bold p-2 m-5 rounded"
              onClick={() => {
                setFirstItem(0);
                setVisibleItems(10);
                setShowPagination(true);
              }}
            >
              Show Pagination
            </button>
          )}
          <button
            type="button"
            className="btn btn-info noprint text-white font-weight-bold p-2 m-5 rounded"
            onClick={() => {
              if (typeof window !== undefined) {
                window.print();
                setShowDownloadBtn(false);
              }
            }}
            style={{ height: 50, width: 100 }}
          >
            Print
          </button>
          {!isclicked ? (
            <button
              type="button"
              className="btn btn-primary noprint text-white font-weight-bold p-2 m-5 rounded"
              onClick={() => {
                setFilteredData(
                  filteredData.filter((el) => el.association === "WBTPTA")
                );
                setIsclicked(true);
                if (showPagination) {
                  setFirstItem(0);
                  setVisibleItems(10);
                } else {
                  setFirstItem(0);
                  setVisibleItems(filteredData.length);
                }
                setShowDownloadBtn(false);
              }}
            >
              Only WBTPTA Teachers
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-warning noprint text-white font-weight-bold p-2 m-5 rounded"
              onClick={() => {
                setFilteredData(fetchedData);
                setIsclicked(false);
                if (showPagination) {
                  setFirstItem(0);
                  setVisibleItems(10);
                } else {
                  setFirstItem(0);
                  setVisibleItems(filteredData.length);
                }
                setShowDownloadBtn(false);
              }}
            >
              All Teachers
            </button>
          )}
          <button
            type="button"
            className="btn btn-success noprint text-white font-weight-bold p-2 m-5 rounded"
            onClick={() => {
              createDownloadLink(filteredData, "teachers");
            }}
          >
            Download
          </button>
          <div>
            <button
              type="button"
              className="btn btn-danger noprint text-white font-weight-bold p-2 m-5 rounded"
              onClick={() => {
                setIsSubmitted(false);
                setSelectedKeys([]);
                setTeacherData(keysData);
                setHeading("");
                setFirstItem(0);
                setVisibleItems(10);
                setFkey("");
                setFvalue("");
                setShowPagination(true);
                setFilteredData(fetchedData);
                setShowDownloadBtn(false);
              }}
            >
              Close
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default FlexibleComp;
