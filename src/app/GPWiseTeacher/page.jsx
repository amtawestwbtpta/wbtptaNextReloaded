"use client";
import React, { useEffect, useState, useContext } from "react";
import { useGlobalContext } from "../../context/Store";
import { useRouter } from "next/navigation";

export default function GPWiseTeacher() {
  const { state, teachersState } = useGlobalContext();
  const router = useRouter();
  const [teacherData, setTeacherData] = useState([]);
  const [gp, setGp] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [clickedTeaches, setClickedTeaches] = useState([]);
  const [isclicked, setIsclicked] = useState(false);
  const [showAssoc, setShowAssoc] = useState(true);
  const userData = async () => {
    let x = teachersState;
    x = x.sort((a, b) => a.school.localeCompare(b.school) && b.rank > a.rank);
    setTeacherData(x);
  };
  useEffect(() => {
    document.title = "WBTPTA AMTA WEST:GP Wise Teachers Data";
    userData();
    if (!state) {
      router.push("/login");
    }
  }, []);
  useEffect(() => {}, [clickedTeaches, teacherData]);
  return (
    <div className="container-fluid my-5">
      <div className="col-md-4 mx-auto mb-3">
        <select
          className="form-select noprint"
          defaultValue={""}
          onChange={(e) => {
            setFilteredData(
              teacherData.filter((el) => el.gp.match(e.target.value))
            );
            setClickedTeaches(
              teacherData.filter((el) => el.gp.match(e.target.value))
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
          <table className="table table-bordered align-middle table-responsive">
            <thead>
              <tr>
                <th style={{ textAlign: "center", verticalAlign: "middle" }}>
                  SL. NO.
                </th>
                <th style={{ textAlign: "center", verticalAlign: "middle" }}>
                  TEACHERS
                </th>
                <th style={{ textAlign: "center", verticalAlign: "middle" }}>
                  MOBILE
                </th>
                <th style={{ textAlign: "center", verticalAlign: "middle" }}>
                  SCHOOL NAME
                </th>
                <th style={{ textAlign: "center", verticalAlign: "middle" }}>
                  Remarks
                </th>
              </tr>
            </thead>
            <tbody>
              {clickedTeaches.map((el, ind) => {
                return (
                  <tr
                    key={el.id}
                    style={{ textAlign: "center", verticalAlign: "middle" }}
                  >
                    <th
                      style={{ textAlign: "center", verticalAlign: "middle" }}
                    >
                      {ind + 1}
                    </th>
                    <th
                      style={{ textAlign: "center", verticalAlign: "middle" }}
                    >
                      {el.tname},
                      {el.hoi === "Yes" ? ` (${el.desig}), (HOI)` : ` (AT)`}
                      {showAssoc && `, (${el.association})`}
                    </th>
                    <th
                      style={{ textAlign: "center", verticalAlign: "middle" }}
                    >
                      {el.phone}
                    </th>
                    <th
                      style={{ textAlign: "center", verticalAlign: "middle" }}
                    >
                      {el.school}
                    </th>
                    <th
                      style={{ textAlign: "center", verticalAlign: "middle" }}
                    ></th>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <button
            type="button"
            className="btn btn-primary text-white font-weight-bold p-2 m-2 noprint rounded"
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
              className="btn btn-success text-white font-weight-bold p-2 m-2 noprint rounded"
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
              className="btn btn-info text-white font-weight-bold p-2 m-2 noprint rounded"
              onClick={() => {
                setClickedTeaches(filteredData);
                setIsclicked(false);
              }}
            >
              All Teachers
            </button>
          )}
          <button
            type="button"
            className="btn btn-dark text-white font-weight-bold p-2 m-2 noprint rounded"
            onClick={() => {
              setShowAssoc(!showAssoc);
            }}
          >
            {showAssoc ? "Hide Association" : "Show Association"}
          </button>
        </div>
      ) : null}
    </div>
  );
}
