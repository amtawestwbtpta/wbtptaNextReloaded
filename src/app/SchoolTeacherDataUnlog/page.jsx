"use client";
import React, { useEffect, useState } from "react";

const SchoolTeacherDataUnlog = () => {
  const [teacherData, setTeacherData] = useState([]);
  const [schoolData, setschoolData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filteredSchool, setFilteredSchool] = useState([]);

  useEffect(() => {
    document.title = "WBTPTA AMTA WEST:School Wise Teacher Data";

    // eslint-disable-next-line
  }, []);
  const userData = async () => {
    fetch(
      "https://raw.githubusercontent.com/amtawestwbtpta/awwbtptadata/main/allteachers.json"
    )
      .then((res) => res.json())
      .then((data) => setTeacherData(data));
    fetch(
      "https://raw.githubusercontent.com/amtawestwbtpta/awwbtptadata/main/schools.json"
    )
      .then((res) => res.json())
      .then((data) => setschoolData(data));
  };

  useEffect(() => {
    userData();
  }, []);

  return (
    <div className="container my-5">
      <div className="col-md-6 mx-auto mb-3">
        <select
          className="form-select"
          defaultValue={""}
          onChange={(e) => {
            setFilteredData(
              teacherData.filter((el) => el.udise.match(e.target.value))
            );

            setFilteredSchool(
              schoolData.filter((el) => el.udise.match(e.target.value))
            );
          }}
          aria-label="Default select example"
        >
          <option value="">Select School Name</option>
          {schoolData.length > 0
            ? schoolData.map((el) => {
                return (
                  <option key={el.id} value={el.udise}>
                    {el.school}
                  </option>
                );
              })
            : null}
        </select>
      </div>
      {filteredSchool.length > 0 ? (
        <div className="container my-3 mx-auto">
          <div className="row my-3">
            <div className="col-md-6">
              <h4 className="text-primary text center">
                SCHOOL NAME: {filteredSchool[0].school}
              </h4>
            </div>
            <div className="col-md-6">
              <h4 className="text-primary text center">
                GP NAME: {filteredSchool[0].gp}
              </h4>
            </div>
          </div>
          <div className="row">
            <div className="col-md-3 m-1">
              <h6 className="text-primary text center">
                UDISE: {filteredSchool[0].udise}
              </h6>
            </div>
            <div className="col-md-3 m-1">
              <h6 className="text-primary text center">
                Total Teacher: {filteredData.length}
              </h6>
            </div>
            <div className="col-md-3 m-1">
              <h6 className="text-primary text center">
                Total Student {filteredSchool[0].year - 1}:{" "}
                {filteredSchool[0].student}
              </h6>
            </div>
            <div className="col-md-3 m-1">
              <h6 className="text-primary text center">
                Total Student {filteredSchool[0].year}:{" "}
                {filteredSchool[0].student}
              </h6>
            </div>
          </div>
          <div className="row my-2">
            <div className="col-md-3 m-1">
              <h6 className="text-primary text center">
                No. of Pre Primary Students: {filteredSchool[0].pp}
              </h6>
            </div>
            <div className="col-md-3 m-1">
              <h6 className="text-primary text center">
                No. of Class I Students: {filteredSchool[0].i}
              </h6>
            </div>
            <div className="col-md-3 m-1">
              <h6 className="text-primary text center">
                No. of Class II Students: {filteredSchool[0].ii}
              </h6>
            </div>
            <div className="col-md-3 m-1">
              <h6 className="text-primary text center">
                No. of Class III Students: {filteredSchool[0].iii}
              </h6>
            </div>
            <div className="col-md-3 m-1">
              <h6 className="text-primary text center">
                No. of Class IV Students: {filteredSchool[0].iv}
              </h6>
            </div>
            {filteredSchool[0].v > 0 ? (
              <div className="col-md-3 m-1">
                <h6 className="text-primary text center">
                  No. of Class V Students: {filteredSchool[0].v}
                </h6>
              </div>
            ) : null}
          </div>
          <div className="my-2">
            {(filteredData.length > 2 &&
              filteredSchool[0].total_student >= 100 &&
              Math.floor(
                filteredSchool[0].total_student / filteredData.length
              ) >= 40) ||
            (filteredData.length > 2 &&
              filteredSchool[0].total_student < 100 &&
              Math.floor(
                filteredSchool[0].total_student / filteredData.length
              ) > 35) ||
            (filteredData.length <= 2 &&
              Math.floor(
                filteredSchool[0].total_student / filteredData.length
              ) > 35) ? (
              <div>
                <h4 className="m-0 text-danger text-center">
                  Student Teacher Ratio is{" "}
                  {Math.floor(
                    filteredSchool[0].total_student / filteredData.length
                  )}
                  , Less Teacher
                </h4>
                <br />
              </div>
            ) : (filteredData.length > 2 &&
                Math.floor(
                  filteredSchool[0].total_student / filteredData.length
                ) >= 30) ||
              filteredData.length <= 2 ||
              Math.floor(
                filteredSchool[0].total_student / filteredData.length
              ) <= 30 ? (
              <div>
                <h4 className="m-0 text-success text-center">
                  Student Teacher Ratio is{" "}
                  {Math.floor(
                    filteredSchool[0].total_student / filteredData.length
                  )}
                  , Normal
                </h4>
                <br />
              </div>
            ) : (
              <div>
                <h4 className="m-0 text-danger text-center">
                  Student Teacher Ratio is{" "}
                  {Math.floor(
                    filteredSchool[0].total_student / filteredData.length
                  )}
                  , Excess Teacher
                </h4>
                <br />
              </div>
            )}
          </div>
        </div>
      ) : null}

      <div className="row mx-auto my-3 rounded justify-content-evenly">
        {filteredData.map((el) => {
          return (
            <div className="col-md-3 m-2 p-2 rounded bg-light" key={el.id}>
              <h6 className="text-center text-primary">
                Teacher Name: {el.tname}
              </h6>
              <h6 className="text-center text-primary">
                Designation: {el.desig}
              </h6>
              <h6
                className={
                  el.association === "WBTPTA" ? "text-primary" : "text-danger"
                }
              >
                Association: {el.association}
              </h6>
              {el.association === "WBTPTA" ? (
                <>
                  {el.gender === "male" ? (
                    <h6>
                      <a
                        href={`tel: +91${el.phone}`}
                        className="d-inline-block mb-1  p-0 text-decoration-none"
                      >
                        Phone: {el.phone}
                      </a>
                    </h6>
                  ) : null}
                </>
              ) : null}
              {el.hoi === "Yes" ? (
                <h6 className="text-success">Head of The Institute</h6>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SchoolTeacherDataUnlog;
