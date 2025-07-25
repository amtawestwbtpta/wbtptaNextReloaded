"use client";
import React, { Suspense, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "../../context/Store";

const TeacherPhotoCorner = () => {
  const { state, stateArray } = useGlobalContext();
  const router = useRouter();

  let teacherData = stateArray.sort((a, b) => a.rank - b.rank);

  let school = teacherData[0]?.school;
  useEffect(() => {
    document.title = "WBTPTA AMTA WEST:Teacher's Photo Corner";
    if (!state) {
      router.push("/login");
    }
    // eslint-disable-next-line
  }, []);
  return (
    <Suspense>
      <div className="container text-center mx-auto flex-wrap my-2">
        <h4 className="text-center">TEACHERS' CORNER OF {school}</h4>

        <div className="row mx-auto justify-content-center">
          {teacherData.map((el, index) => {
            return (
              <div
                style={{
                  width: "200px",
                  margin: "10px",
                  border: "1px solid black",
                  borderRadius: "10px",
                  padding: "5px",
                }}
                className="justify-content-center align-items-center text-center"
                key={index}
              >
                <div className="align-items-center">
                  <div
                    style={{
                      width: "100px",
                      height: "130px",
                      margin: "auto",
                      marginBottom: "5px",
                      // borderWidth: "1px",
                      // borderRadius: "5px",
                      // borderColor: "1px solid black",
                    }}
                    className="text-center justify-content-center align-items-center border-1 border-dark"
                  ></div>
                </div>

                <h6 className="m-1 p-0 text-center text-wrap">
                  Name: {el.tname}
                </h6>

                <h6 className="m-1 p-0 text-center text-wrap">
                  Designation: {el.desig}
                </h6>
                <h6 className="m-1 p-0 text-center text-wrap">
                  Mobile: {el.phone}
                </h6>
                <h6 className="m-1 p-0 text-center text-wrap">
                  Date of Birth: {el.dob}
                </h6>
                <h6 className="m-1 p-0 text-center text-wrap">
                  Date of Joining: {el.doj}
                </h6>
                <h6 className="m-1 p-0 text-center text-wrap">
                  DOJ to this School: {el.dojnow}
                </h6>
                <h6 className="m-1 p-0 text-center text-wrap">
                  Date of Retirement: {el.dor}
                </h6>
                <h6 className="m-1 p-0 text-center text-wrap">
                  Training: {el.training}
                </h6>
              </div>
            );
          })}
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
        <div className="mx-auto my-3 noprint">
          <button
            type="button"
            className="btn btn-primary text-white font-weight-bold p-2 rounded"
            onClick={() => {
              if (typeof window !== "undefined") {
                window.print();
              }
            }}
          >
            Print Statement
          </button>
        </div>
      </div>
    </Suspense>
  );
};

export default TeacherPhotoCorner;
