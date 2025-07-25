"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "../context/Store";
import Loader from "./Loader";
import Link from "next/link";
import { firestore } from "../context/FirebaseContext";
import { collection, getDocs, query, where } from "firebase/firestore";
import { decryptObjData } from "../modules/encryption";
import { DA, HRA } from "../modules/constants";
import { GetMonthName } from "../modules/calculatefunctions";
const TechSalary = (props) => {
  const data = props.data;
  const { state, setStateArray, teachersState, setStateObject } =
    useGlobalContext();
  const router = useRouter();
  const [filteredData, setFilteredData] = useState([]);
  let udise;
  let school;
  let userDcryptedDetails;
  if (!data) {
    userDcryptedDetails = decryptObjData("tid");
    udise = userDcryptedDetails.udise;
    school = userDcryptedDetails.school;
  } else {
    udise = data[0].udise;
    school = data[0].school;
  }
  const [showTable, setShowTable] = useState(false);

  const userData = async () => {
    const data = teachersState.filter((el) => el.udise === udise);
    setFilteredData(data);
    setShowTable(true);
  };

  useEffect(() => {
    if (!state) {
      router.push("/logout");
    }
    userData();
    document.title = `All Teacher's Salary Data of ${school}`;
    // eslint-disable-next-line
  }, []);

  return (
    <div className="container-fluid my-5">
      {showTable ? (
        <>
          <div className="table-resposive text-center my-2">
            <h3 className="text-center text-primary">
              All Teacher's Salary Data for The Month of{" "}
              {GetMonthName(new Date().getMonth())} of {school}
            </h3>
            <div className="table-resposive-md" style={{ overflowX: "scroll" }}>
              <table className="table table-info table-hover table-striped table-borderd align-middle table-responsive">
                <thead>
                  <tr>
                    <th>SL. NO.</th>
                    <th>TEACHER'S NAME</th>
                    <th>DESIGNATION</th>
                    <th>BASIC PAY</th>
                    <th>
                      ADDL.
                      <br />
                      ALLOWANCE
                    </th>
                    <th>DA</th>
                    <th>HRA</th>
                    <th>MA</th>
                    <th>GROSS PAY</th>
                    <th>GPF</th>
                    <th>GSLI</th>
                    <th>PTAX</th>
                    <th>NETPAY</th>
                    <th className="noprint">PRINT PAYSLIP</th>
                  </tr>
                </thead>
                <tbody id="tbody">
                  {filteredData.map((el, ind) => {
                    let basic = el.basic;
                    let mbasic = el.mbasic;
                    let addl = el.addl;
                    let ma = el.ma;
                    let gpf = el.gpf;
                    let gsli = el.gsli;
                    let disability = el.disability;
                    let date = new Date();

                    // console.log(junelast)
                    let basicpay;
                    let ptax;
                    if (
                      date.getMonth() === 0 ||
                      date.getMonth() === 1 ||
                      date.getMonth() === 3
                    ) {
                      basicpay = basic;
                    } else {
                      basicpay = mbasic;
                    }
                    let da = Math.round(basicpay * DA);
                    let hra = Math.round(basicpay * HRA);

                    let gross = basicpay + da + hra + addl + ma;
                    // console.log(gross)

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

                    let deduction = gsli + gpf + ptax;

                    let netpay = gross - deduction;
                    return (
                      <tr key={el.id}>
                        <td>{ind + 1}</td>
                        <td>{el.tname}</td>
                        <td>{el.desig}</td>
                        <td>{basicpay}</td>
                        <td>{addl}</td>
                        <td>{da}</td>
                        <td>{hra}</td>
                        <td>{ma}</td>
                        <td>{gross}</td>
                        <td>{gpf}</td>
                        <td>{gsli}</td>
                        <td>{ptax}</td>
                        <td>{netpay}</td>
                        <th className="noprint">
                          {el.association === "WBTPTA" ? (
                            <Link
                              className="btn btn-info text-decoration-none"
                              href={`/payslipwbtpta`}
                              onClick={() => setStateObject(el)}
                            >
                              PRINT PAYSLIP
                            </Link>
                          ) : null}
                        </th>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
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
              className="btn btn-success  font-weight-bold p-2 rounded"
              onClick={() => {
                router.push(`/TeacherPhotoCorner`);
                setStateArray(filteredData);
              }}
            >
              Teacher's Photo Corner
            </button>
          </div>
        </>
      ) : (
        <Loader center content="loading" size="lg" />
      )}
    </div>
  );
};

export default TechSalary;
