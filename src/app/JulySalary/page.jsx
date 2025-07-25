"use client";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../context/Store";
import { useRouter } from "next/navigation";
import { DA, HRA } from "../../modules/constants";
import axios from "axios";
import Loader from "../../components/Loader";
import { readCSVFile } from "../../modules/calculatefunctions";

const JulySalary = () => {
  const router = useRouter();
  const { state, teachersState } = useGlobalContext();
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState(teachersState);
  const [isclicked, setIsclicked] = useState(false);
  const [july, setJuly] = useState([]);
  const [april, setApril] = useState([]);
  const year = new Date().getFullYear();
  const getSalary = async () => {
    setLoader(true);
    const q1 = await readCSVFile(`april-${year}`);
    const q5 = await readCSVFile(`july-${year}`);
    setApril(q1);
    setJuly(q5);
    setLoader(false);
  };
  useEffect(() => {
    !isclicked
      ? (document.title = "WBTPTA AMTA WEST:All Teacher's July Salary Data")
      : (document.title =
          "WBTPTA AMTA WEST:All WBTPTA Teacher's July Salary Data");
    //eslint-disable-next-line
  }, [isclicked, april, july]);
  useEffect(() => {
    if (state !== "admin") {
      router.push("/logout");
    }
    getSalary();
    //eslint-disable-next-line
  }, []);

  return (
    <div>
      {loader ? (
        <Loader />
      ) : (
        <div className="container-fluid mx-auto">
          <button
            type="button"
            className="btn btn-success btn-sm noprint m-3"
            onClick={() => {
              if (typeof window !== "undefined") {
                window.print();
              }
            }}
          >
            Print
          </button>
          <button
            type="button"
            className="btn btn-primary btn-sm noprint m-3"
            onClick={() => router.back()}
          >
            Go Back
          </button>
          {!isclicked ? (
            <button
              type="button"
              className="btn btn-success text-white btn-sm font-weight-bold m-2 noprint rounded"
              onClick={() => {
                setData(
                  teachersState.filter((el) => el.association === "WBTPTA")
                );
                setIsclicked(true);
              }}
            >
              Only WBTPTA Teachers
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-info text-white btn-sm font-weight-bold m-2 noprint rounded"
              onClick={() => {
                setData(teachersState);
                setIsclicked(false);
              }}
            >
              All Teachers
            </button>
          )}
          <h3 className="text-center text-primary mb-3">
            {!isclicked
              ? `All Teacher's July ${year} Salary Data`
              : `All WBTPTA Teacher's July ${year} Salary Data`}
          </h3>
          <table className="table table-responsive table-bordered table-white table-striped text-center table-hover text-black">
            <thead>
              <tr>
                <th>Sl</th>
                <th>Teacher Name</th>
                <th>School Name</th>
                <th>Desig.</th>
                <th>Basic Pay</th>
                <th>Da</th>
                <th>HRA</th>
                <th>Addl.</th>
                <th>MA</th>
                {year === 2024 && <th>IR</th>}
                <th>Gross Pay</th>
                <th>GPF</th>
                <th>GSLI</th>
                <th>PTAX</th>
                <th>NET PAY</th>
              </tr>
            </thead>
            <tbody>
              {data.map((el, ind) => {
                let id = el?.id;
                const aprilData = april.filter((item) => item.id === id)[0];
                const filteredData = july.filter((item) => item.id === id)[0];
                let basic = filteredData?.basic;
                let da = Math.round(basic * filteredData?.daPercent);
                let hra =
                  filteredData?.hraPercent < 1
                    ? Math.round(basic * filteredData?.hraPercent)
                    : filteredData?.hraPercent;
                let addl = filteredData?.addl;
                let ma = filteredData?.ma;
                const ir =
                  year === 2024 ? aprilData?.basic * aprilData?.daPercent : 0;
                let gross = basic + da + hra + addl + ma + ir;
                let gpf = filteredData?.gpf;
                let gsli = filteredData?.gsli;
                let disability = el.disability;
                let ptax;
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
                let netpay = gross - gpf - gsli - ptax;

                if (basic !== 0) {
                  return (
                    <tr key={ind} className="nobreak">
                      <td className="nobreak">{ind + 1}</td>
                      <td className="nobreak">
                        <p className="m-0 p-0" style={{ fontSize: 11 }}>
                          {el.tname}
                        </p>
                      </td>
                      <td className="nobreak">
                        <p className="m-0 p-0" style={{ fontSize: 11 }}>
                          {el.school}
                        </p>
                      </td>
                      <td className="nobreak">{el.desig}</td>
                      <td className="nobreak">{basic}</td>
                      <td className="nobreak">{da}</td>
                      <td className="nobreak">{hra}</td>
                      <td className="nobreak">{addl}</td>
                      <td className="nobreak">{ma}</td>
                      {year === 2024 && ir != 0 && (
                        <td className="nobreak">{ir != 0 ? ir : "NIL"}</td>
                      )}
                      <td className="nobreak">{gross}</td>
                      <td className="nobreak">{gpf}</td>
                      <td className="nobreak">{gsli}</td>
                      <td className="nobreak">{ptax}</td>
                      <td className="nobreak">{netpay}</td>
                    </tr>
                  );
                }
              })}
            </tbody>
          </table>
          <button
            type="button"
            className="btn btn-success btn-sm noprint m-3"
            onClick={() => {
              if (typeof window !== "undefined") {
                window.print();
              }
            }}
          >
            Print
          </button>
          <button
            type="button"
            className="btn btn-primary btn-sm noprint m-3"
            onClick={() => router.back()}
          >
            Go Back
          </button>
          {!isclicked ? (
            <button
              type="button"
              className="btn btn-success text-white btn-sm font-weight-bold m-2 noprint rounded"
              onClick={() => {
                setData(
                  teachersState.filter((el) => el.association === "WBTPTA")
                );
                setIsclicked(true);
              }}
            >
              Only WBTPTA Teachers
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-info text-white btn-sm font-weight-bold m-2 noprint rounded"
              onClick={() => {
                setData(teachersState);
                setIsclicked(false);
              }}
            >
              All Teachers
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default JulySalary;
