"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "../../context/Store";
import { NumInWords } from "../../modules/calculatefunctions";
import { DA, HRA } from "../../modules/constants";

const ViewDetails = () => {
  const { state, stateObject } = useGlobalContext();
  const router = useRouter();

  useEffect(() => {
    if (state !== "admin") {
      localStorage.clear();
      router.push("/logout");
    }
  }, []);

  let details = stateObject;
  let {
    udise,
    tname,
    desig,
    school,
    disability,
    gp,
    phone,
    email,
    dob,
    doj,
    dojnow,
    dor,
    bank,
    account,
    ifsc,
    empid,
    training,
    pan,
    address,
    // basic,
    // mbasic,
    // addl,
    // ma,
    // gpf,
    // gpfprev,
    // julyGpf,
    // gsli,
    fname,
    question,
    hoi,
    dataYear,
  } = details;

  let date = new Date();
  // let basicpay;
  // let ptax;
  // let junelast = new Date(`${date.getFullYear()}-07-31`);
  // if (dataYear === new Date().getFullYear()) {
  //   if (date >= junelast) {
  //     basicpay = basic;
  //   } else {
  //     basicpay = mbasic;
  //   }
  // } else {
  //   basicpay = basic;
  // }
  // let da = Math.round(basicpay * DA);
  // let hra = Math.round(basicpay * HRA);

  // let gross = basicpay + da + hra + addl + ma;

  // if (gross > 40000) {
  //   ptax = 200;
  // } else if (gross > 25000) {
  //   ptax = 150;
  // } else if (gross > 15000) {
  //   ptax = 130;
  // } else if (gross > 10000) {
  //   ptax = 110;
  // } else {
  //   ptax = 0;
  // }

  // if (disability === "YES") {
  //   ptax = 0;
  // }

  // let deduction = gsli + gpf + ptax;

  // let netpay = gross - deduction;
  const ifsc_ser = () => {
    fetch(`https://ifsc.razorpay.com/${ifsc}`)
      .then((res) => res.json())
      .then((data) => {
        if (typeof window !== undefined) {
          document.getElementById("ifsc").innerHTML =
            "<P>Bank Details<br>Bank Name: " +
            data.BANK +
            "<br/>" +
            "Branch: " +
            data.BRANCH +
            "<br/>" +
            "Address: " +
            data.ADDRESS +
            "<br/>" +
            "IFSC: " +
            data.IFSC +
            "<br/>" +
            "MICR: " +
            data.MICR +
            "<br/></p>";
        }
      });
  };
  useEffect(() => {
    ifsc_ser();
    // eslint-disable-next-line
  }, []);
  return (
    <div className="container my-5 text-center d-flex flex-column justify-content-center">
      <h3 className="text-primary my-3 text center">
        Details of {tname} of {school}
      </h3>
      <div className="row d-flex justify-content-center text-black">
        <div className="bg-light rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
          <div>
            <label>Teacher Name: </label>
          </div>
          <div>
            <p>{tname}</p>
          </div>
        </div>

        <div className="bg-light rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
          <div>
            <label>Father's Name: </label>
          </div>
          <div>
            <p>{fname}</p>
          </div>
        </div>

        <div className="bg-light rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
          <div>
            <label>School Name: </label>
          </div>
          <div>
            <p>{school}</p>
          </div>
        </div>

        <div className="bg-light rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
          <div>
            <label>UDISE: </label>
          </div>
          <div>
            <p>{udise}</p>
          </div>
        </div>

        <div className="bg-light rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
          <div>
            <label>Designation: </label>
          </div>
          <div>
            <p>{desig}</p>
          </div>
        </div>
        {disability === "YES" ? (
          <div className="bg-light rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
            <div>
              <label>Is Disable? </label>
            </div>
            <div>
              <p>{disability}</p>
            </div>
          </div>
        ) : null}
        <div className="bg-light rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
          <div>
            <label>Is HOI? </label>
          </div>
          <div>
            <p>{hoi}</p>
          </div>
        </div>
        <div className="bg-light rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
          <div>
            <label>Gram Panchayet: </label>
          </div>
          <div>
            <p>{gp}</p>
          </div>
        </div>

        <div className="bg-light rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
          <div>
            <label>Mobile: </label>
          </div>
          <div>
            <a
              href={`tel: +91${phone}`}
              className="d-inline-block fs-6 text-decoration-none text-dark"
            >
              {phone}
            </a>
            <br />
          </div>
        </div>
        <div className="bg-light rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
          <div>
            <label>Email: &nbsp; </label>
          </div>
          <div className="blank"></div>
          <div>
            <p>{email}</p>
          </div>
        </div>
        <div className="bg-light rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
          <div>
            <label>Date of Birth: </label>
          </div>
          <div>
            <p>{dob}</p>
          </div>
        </div>

        <div className="bg-light rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
          <div>
            <label>Date of Joining: </label>
          </div>
          <div>
            <p>{doj}</p>
          </div>
        </div>

        <div className="bg-light rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
          <div>
            <label>DOJ in Present School: </label>
          </div>
          <div>
            <p>{dojnow}</p>
          </div>
        </div>

        <div className="bg-light rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
          <div>
            <label>Date of Retirement: </label>
          </div>
          <div>
            <p>{dor}</p>
          </div>
        </div>

        <div className="bg-light rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
          <div>
            <label>Employee ID: </label>
          </div>
          <div>
            <p>{empid}</p>
          </div>
        </div>

        <div className="bg-light rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
          <div>
            <label>Training: </label>
          </div>
          <div>
            <p>{training}</p>
          </div>
        </div>

        <div className="bg-light rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
          <div>
            <label>PAN: </label>
          </div>
          <div>
            <p>{pan}</p>
          </div>
        </div>

        <div className="bg-light rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
          <div>
            <label>Address: </label>
          </div>
          <div>
            <p>{address}</p>
          </div>
        </div>

        <div className="bg-light rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
          <div>
            <label>BANK: </label>
          </div>
          <div>
            <p>{bank}</p>
          </div>
        </div>

        <div className="bg-light rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
          <div>
            <label>Account No: </label>
          </div>
          <div>
            <p>{account}</p>
          </div>
        </div>

        <div
          className="bg-light rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2"
          id="ifsc"
        ></div>
        {question === "admin" ? (
          <div className="bg-light rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
            <div>
              <label>Question Access: </label>
            </div>
            <div>
              <p>{question}</p>
            </div>
          </div>
        ) : null}
      </div>
      <div className="col-md-4 mx-auto">
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
          className="btn btn-info btn-sm noprint m-3"
          onClick={() => router.push("/EditTeacher")}
        >
          Edit Details
        </button>
        <button
          type="button"
          className="btn btn-primary btn-sm noprint m-3"
          onClick={() => router.back()}
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default ViewDetails;
