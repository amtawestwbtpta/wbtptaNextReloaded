"use client";
import React, { useEffect, useState, useContext } from "react";
import { useGlobalContext } from "../../context/Store";
import { useRouter } from "next/navigation";

import { firestore } from "../../context/FirebaseContext";
import { collection, getDocs, query } from "firebase/firestore";

function GpWiseSchool() {
  const { state, teachersState, schoolState } = useGlobalContext();
  const router = useRouter();

  const [teacherData, setTeacherData] = useState([]);
  const [schoolData, setschoolData] = useState([]);
  const [gp, setGp] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [filteredSchool, setFilteredSchool] = useState([]);
  const [clickedTeaches, setClickedTeaches] = useState([]);
  const [isclicked, setIsclicked] = useState(false);

  const userData = async () => {
    setTeacherData(teachersState);
    setschoolData(schoolState);
  };

  useEffect(() => {
    document.title = "WBTPTA AMTA WEST:GP Wise School Data";
    userData();
    if (!state) {
      router.push("/login");
    }
  }, []);
  useEffect(() => {}, [clickedTeaches, teacherData, schoolData]);

  return (
    <div className="container-fluid my-5">
      <div className="noprint col-md-4 mx-auto mb-3">
        <select
          className="form-select"
          defaultValue={""}
          onChange={(e) => {
            setFilteredData(
              teacherData.filter((el) => el.gp.match(e.target.value))
            );
            setClickedTeaches(
              teacherData.filter((el) => el.gp.match(e.target.value))
            );
            setFilteredSchool(
              schoolData.filter((el) => el.gp.match(e.target.value))
            );
            setGp(e.target.value);
            setIsclicked(false);
          }}
          aria-label="Default select example"
        >
          <option value="">Select GP Name</option>
          <option value="AMORAGORI">AMORAGORI</option>
          <option value="BKBATI">BKBATI</option>
          <option value="GAZIPUR">GAZIPUR</option>
          <option value="JHAMTIA">JHAMTIA</option>
          <option value="JHIKIRA">JHIKIRA</option>
          <option value="JOYPUR">JOYPUR</option>
          <option value="NOWPARA">NOWPARA</option>
          <option value="THALIA">THALIA</option>
        </select>
      </div>
      {gp !== "" ? (
        <div className="text-center my-2">
          <h3 className="text-center text-primary">
            All {isclicked && "WBTPTA"} Teacher's Data of {gp}
          </h3>
          <table className="table table-white table-hover table-striped table-borderd align-middle table-responsive">
            <thead>
              <tr>
                <th style={{ textAlign: "center", verticalAlign: "middle" }}>
                  SL. NO.
                </th>
                <th style={{ textAlign: "center", verticalAlign: "middle" }}>
                  SCHOOL NAME
                </th>
                <th style={{ textAlign: "center", verticalAlign: "middle" }}>
                  TOTAL TEACHER
                </th>
                <th style={{ textAlign: "center", verticalAlign: "middle" }}>
                  TOTAL STUDENT
                </th>
                <th style={{ textAlign: "center", verticalAlign: "middle" }}>
                  S/T RATIO
                </th>
                <th style={{ textAlign: "center", verticalAlign: "middle" }}>
                  TEACHERS
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredSchool.map((el, ind) => {
                let selectedSchool = el.udise;
                return (
                  <tr
                    key={el.id}
                    style={{ textAlign: "center", verticalAlign: "middle" }}
                  >
                    <td
                      style={{ textAlign: "center", verticalAlign: "middle" }}
                    >
                      {ind + 1}
                    </td>
                    <td
                      style={{ textAlign: "center", verticalAlign: "middle" }}
                    >
                      {el.school}, ({el.udise})
                    </td>
                    <td
                      style={{ textAlign: "center", verticalAlign: "middle" }}
                    >
                      {
                        teacherData.filter((el) =>
                          el.udise.match(selectedSchool)
                        ).length
                      }
                    </td>
                    <td
                      style={{ textAlign: "center", verticalAlign: "middle" }}
                    >
                      {el.total_student}
                    </td>
                    <td
                      style={{ textAlign: "center", verticalAlign: "middle" }}
                    >
                      {Math.floor(
                        el.total_student /
                          teacherData.filter((el) =>
                            el.udise.match(selectedSchool)
                          ).length
                      )}
                    </td>
                    <td
                      style={{ textAlign: "center", verticalAlign: "middle" }}
                    >
                      {clickedTeaches.filter((el) =>
                        el.udise.match(selectedSchool)
                      ).length ? (
                        clickedTeaches
                          .filter((el) => el.udise.match(selectedSchool))
                          .map((elem, index) => (
                            <div key={elem.id}>
                              ({index + 1}) {elem.tname},
                              {elem.hoi === "Yes"
                                ? ` (${elem.desig}), (HOI),`
                                : ` (AT),`}{" "}
                              ({elem.association})
                            </div>
                          ))
                      ) : (
                        <p>
                          <b>No WBTPTA Teacher</b>
                        </p>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <button
            type="button"
            className="btn btn-primary noprint text-white font-weight-bold p-2 m-5 rounded"
            onClick={() => {
              if (typeof window !== "undefined") {
                window.print();
              }
            }}
          >
            Print
          </button>
          {!isclicked ? (
            <button
              type="button"
              className="btn btn-success noprint text-white font-weight-bold p-2 m-5 rounded"
              onClick={() => {
                setClickedTeaches(
                  filteredData.filter((el) => el.association === "WBTPTA")
                );
                setIsclicked(true);
              }}
            >
              Only WBTPTA Teachers
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-info noprint text-white font-weight-bold p-2 m-5 rounded"
              onClick={() => {
                setClickedTeaches(filteredData);
                setIsclicked(false);
              }}
            >
              All Teachers
            </button>
          )}
        </div>
      ) : null}
    </div>
  );
}

export default GpWiseSchool;
