"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { decryptObjData, getCookie } from "../../modules/encryption";
import {
  GetMonthName,
  INR,
  IndianFormat,
} from "../../modules/calculatefunctions";
import { useGlobalContext } from "../../context/Store";
import ropa from "../../modules/ropa";
import axios from "axios";
import Loader from "../../components/Loader";
import Image from "next/image";
import TypedAnimation from "../../components/TypedAnimation";
const page = () => {
  const { state } = useGlobalContext();
  const router = useRouter();
  const [tooltip, setTooltip] = useState(false);
  let teacherdetails,
    userdetails,
    udise,
    tname,
    desig,
    disability,
    school,
    gp,
    url,
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
    basicpay,
    ma,
    pfund,
    ptax,
    gsli,
    addl,
    fname,
    id,
    da,
    hra,
    gross,
    netpay,
    level,
    cell,
    ir;
  let details = getCookie("tid");
  if (details) {
    teacherdetails = decryptObjData("tid");
    userdetails = decryptObjData("uid");
    id = teacherdetails.id;
    udise = teacherdetails.udise;
    tname = teacherdetails.tname;
    desig = teacherdetails.desig;
    disability = teacherdetails.disability;
    school = teacherdetails.school;
    gp = teacherdetails.gp;
    url = userdetails.url;
    phone = teacherdetails.phone;
    email = teacherdetails.email;
    dob = teacherdetails.dob;
    doj = teacherdetails.doj;
    dojnow = teacherdetails.dojnow;
    dor = teacherdetails.dor;
    bank = teacherdetails.bank;
    account = teacherdetails.account;
    ifsc = teacherdetails.ifsc;
    empid = teacherdetails.empid;
    training = teacherdetails.training;
    pan = teacherdetails.pan;
    address = teacherdetails.address;
    fname = teacherdetails.fname;
  }

  const [hide, setHide] = useState(false);
  const today = new Date();
  const year = today.getFullYear();
  const [month, setMonth] = useState(GetMonthName(today.getMonth()));
  const [salary, setSalary] = useState({
    basic: 0,
    da: 0.14,
    pfund: 0,
    gsli: 0,
    ma: 0,
    addl: 0,
    ir: 0,
    hra: 0,
    gross: 0,
    netpay: 0,
    ptax: 0,
    level: 0,
    cell: 0,
    deduction: 0,
    id,
    tname,
    desig,
    school,
    disability,
    empid,
    pan,
    udise,
    bank,
    account,
    ifsc,
    month: month,
    year: year,
    basicpay,
    today: today,
  });
  const [showLoader, setShowLoader] = useState(false);
  const getModifiedSalary = async () => {
    setShowLoader(true);
    const q1 = await axios.get(
      `https://raw.githubusercontent.com/amtawestwbtpta/salaryRemodified/main/${month.toLowerCase()}-${year}.json`
    );
    const q2 = await axios.get(
      `https://raw.githubusercontent.com/amtawestwbtpta/salaryRemodified/main/april-2024.json`
    );
    const monthSalary = q1.data?.filter((el) => el.id === id)[0];
    const aprilSalary = q2.data?.filter((el) => el.id === id)[0];
    if (month === "July" && year === 2024 && aprilSalary?.basic > 0) {
      ir = Math.round(aprilSalary?.basic * 0.04);
    } else {
      ir = 0;
    }
    basicpay = monthSalary?.basic;
    da = Math.round(basicpay * monthSalary?.daPercent);
    hra =
      monthSalary?.hraPercent > 10
        ? monthSalary?.hraPercent
        : Math.round(basicpay * monthSalary?.hraPercent);
    addl = monthSalary?.addl;
    ma = monthSalary?.ma;
    pfund = monthSalary?.gpf;
    gsli = monthSalary?.gsli;
    level = ropa(basicpay).lv;
    cell = ropa(basicpay).ce;
    gross = basicpay + da + ir + hra + addl + ma;
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

    let deduction = gsli + pfund + ptax;

    netpay = gross - deduction;
    setSalary({
      ...salary,
      level,
      cell,
      basicpay,
      basic: basicpay,
      da,
      ir,
      hra,
      addl,
      ma,
      pfund,
      gross,
      ptax,
      netpay,
      deduction,
      gsli,
      month,
      year,
    });
    setShowLoader(false);
  };
  useEffect(() => {
    document.title = "WBTPTA AMTA WEST:Dashboard";

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (!state) {
      router.push("/login");
    }
    getModifiedSalary();
    // eslint-disable-next-line
  }, []);
  return (
    <div className="container my-2">
      {showLoader ? (
        <Loader />
      ) : (
        <div suppressHydrationWarning>
          <div
            className="col-md-3 mx-auto "
            onMouseEnter={() => setTooltip(true)}
            onMouseLeave={() => setTooltip(false)}
          >
            <Image
              src={url}
              alt="profile"
              width={200}
              height={200}
              className="profileImage"
              onClick={() => router.push("/ChangePhoto")}
              suppressContentEditableWarning
              suppressHydrationWarning
            />
            <div className="mx-auto">
              {tooltip && (
                <span className="text-success">Change Profile Photo</span>
              )}
            </div>
          </div>
          <div className="mx-auto my-2" style={{ height: "120px" }}>
            {tname && (
              <TypedAnimation
                title={`Welcome ${tname},<br /> ${desig}, of <br /> ${school}`}
              />
            )}
          </div>

          <button
            type="button"
            className="btn rounded btn-info my-3"
            onClick={(e) => {
              hide === false
                ? (e.currentTarget.textContent = "Hide Your Data")
                : (e.currentTarget.textContent = "Show Your Data");

              setHide(!hide);
            }}
          >
            Show Your Data
          </button>
          <div className="container text-center d-flex flex-column justify-content-center">
            {hide ? (
              <div className="row d-flex justify-content-center text-black">
                <div className="bg-info rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
                  <div>
                    <label>Teacher Name: </label>
                  </div>
                  <div>
                    <p>{tname}</p>
                  </div>
                </div>

                <div className="bg-info rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
                  <div>
                    <label>Father's Name: </label>
                  </div>
                  <div>
                    <p>{fname}</p>
                  </div>
                </div>

                <div className="bg-info rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
                  <div>
                    <label>School Name: </label>
                  </div>
                  <div>
                    <p>{school}</p>
                  </div>
                </div>

                <div className="bg-info rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
                  <div>
                    <label>UDISE: </label>
                  </div>
                  <div>
                    <p>{udise}</p>
                  </div>
                </div>

                <div className="bg-info rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
                  <div>
                    <label>Designation: </label>
                  </div>
                  <div>
                    <p>{desig}</p>
                  </div>
                </div>
                <div className="bg-info rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
                  <div>
                    <label>Gram Panchayet: </label>
                  </div>
                  <div>
                    <p>{gp}</p>
                  </div>
                </div>

                <div className="bg-info rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
                  <div>
                    <label>Mobile: </label>
                  </div>
                  <div>
                    <a
                      href="tel: +91{phone}"
                      className="d-inline-block fs-6 text-decoration-none text-dark"
                    >
                      {phone}
                    </a>
                    <br />
                  </div>
                </div>
                <div className="bg-info rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
                  <div>
                    <label>Email: &nbsp; </label>
                  </div>
                  <div className="blank"></div>
                  <div>
                    <p>{email}</p>
                  </div>
                </div>
                <div className="bg-info rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
                  <div>
                    <label>Date of Birth: </label>
                  </div>
                  <div>
                    <p>{dob}</p>
                  </div>
                </div>

                <div className="bg-info rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
                  <div>
                    <label>Date of Joining: </label>
                  </div>
                  <div>
                    <p>{doj}</p>
                  </div>
                </div>

                <div className="bg-info rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
                  <div>
                    <label>DOJ in Present School: </label>
                  </div>
                  <div>
                    <p>{dojnow}</p>
                  </div>
                </div>

                <div className="bg-info rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
                  <div>
                    <label>Date of Retirement: </label>
                  </div>
                  <div>
                    <p>{dor}</p>
                  </div>
                </div>

                <div className="bg-info rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
                  <div>
                    <label>Employee ID: </label>
                  </div>
                  <div>
                    <p>{empid}</p>
                  </div>
                </div>

                <div className="bg-info rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
                  <div>
                    <label>Training: </label>
                  </div>
                  <div>
                    <p>{training}</p>
                  </div>
                </div>

                <div className="bg-info rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
                  <div>
                    <label>PAN: </label>
                  </div>
                  <div>
                    <p>{pan}</p>
                  </div>
                </div>

                <div className="bg-info rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
                  <div>
                    <label>Address: </label>
                  </div>
                  <div>
                    <p>{address}</p>
                  </div>
                </div>

                <div className="bg-info rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
                  <div>
                    <label>BANK: </label>
                  </div>
                  <div>
                    <p>{bank}</p>
                  </div>
                </div>

                <div className="bg-info rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
                  <div>
                    <label>Account No: </label>
                  </div>
                  <div>
                    <p>{account}</p>
                  </div>
                </div>

                <div className="bg-info rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
                  <div>
                    <label>IFS Code: </label>
                  </div>
                  <div>
                    <p>{ifsc}</p>
                    <p id="ifsc" className="text-wrap"></p>
                  </div>
                </div>

                <div className="bg-info rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
                  <div>
                    <label>BASIC: </label>
                  </div>
                  <div>
                    <p>{IndianFormat(salary.basicpay)}</p>
                  </div>
                </div>
                <div className="bg-info rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
                  <div>
                    <label>DA: </label>
                  </div>
                  <div>
                    <p>{IndianFormat(salary.da)}</p>
                  </div>
                </div>

                <div className="bg-info rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
                  <div>
                    <label>HRA: </label>
                  </div>
                  <div>
                    <p>{IndianFormat(salary.hra)}</p>
                  </div>
                </div>

                {salary.ma > 0 && (
                  <div className="bg-info rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
                    <div>
                      <label>MA: </label>
                    </div>
                    <div>
                      <p>{IndianFormat(salary.ma)}</p>
                    </div>
                  </div>
                )}
                {salary.addl > 0 && (
                  <div className="bg-info rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
                    <div>
                      <label>ADDL. REMUN.: </label>
                    </div>
                    <div>
                      <p>{IndianFormat(salary.addl)}</p>
                    </div>
                  </div>
                )}

                <div className="bg-info rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
                  <div>
                    <label>Gross Pay: </label>
                  </div>
                  <div>
                    <p>{IndianFormat(salary.gross)}</p>
                  </div>
                </div>

                {salary.pfund > 0 && (
                  <div className="bg-info rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
                    <div>
                      <label>GPF: </label>
                    </div>
                    <div>
                      <p>{IndianFormat(salary.pfund)}</p>
                    </div>
                  </div>
                )}

                {salary.ptax > 0 && (
                  <div className="bg-info rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
                    <div>
                      <label>P. TAX: </label>
                    </div>
                    <div>
                      <p>{IndianFormat(salary.ptax)}</p>
                    </div>
                  </div>
                )}

                {salary.gsli > 0 && (
                  <div className="bg-info rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
                    <div>
                      <label>GSLI: </label>
                    </div>
                    <div>
                      <p>{IndianFormat(salary.gsli)}</p>
                    </div>
                  </div>
                )}

                <div className="bg-info rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
                  <div>
                    <label>Netpay: </label>
                  </div>
                  <div>
                    <p>{IndianFormat(salary.netpay)}</p>
                  </div>
                </div>

                <div className="bg-info rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
                  <div>
                    <label>Netpay in Words: </label>
                  </div>
                  <div>
                    <p>{INR(salary.netpay)}</p>
                  </div>
                </div>
              </div>
            ) : null}
            <div>
              <Link className="btn btn-primary m-2 rounded" href="/update_self">
                Update Profile
              </Link>
              {/* <Link className="btn btn-success m-2 rounded" href="/AiChatBot">
                Chat With AI
              </Link> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
