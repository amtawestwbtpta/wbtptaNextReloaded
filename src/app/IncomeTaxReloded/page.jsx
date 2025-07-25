"use client";
import React, { Suspense, useEffect, useState } from "react";
import { useGlobalContext } from "../../context/Store";
import { useRouter } from "next/navigation";
import {
  IndianFormat,
  ptaxCalc,
  randBetween,
  roundSo,
  CalculateIncomeTax,
  readCSVFile,
} from "../../modules/calculatefunctions";
import { firestore } from "../../context/FirebaseContext";
import Loader from "../../components/Loader";
import axios from "axios";
import { collection, doc, getDocs, query, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import dynamic from "next/dynamic";
import IncomeTaxNew2025 from "../../pdfs/IncomeTaxNew2025";
import IncomeTaxOld2025 from "../../pdfs/IncomeTaxOld2025";
import Form16New from "../../pdfs/Form16New";
import Form16NewRegime from "../../pdfs/Form16NewRegime";
export default function IncomeTaxReloded() {
  const PDFDownloadLink = dynamic(
    async () =>
      await import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
    {
      ssr: false,
      loading: () => <p className="m-0 p-0">Please Wait...</p>,
    }
  );
  const router = useRouter();
  const {
    deductionState,
    setDeductionState,
    teachersState,
    setSalaryState,
    setIndSalaryState,
    state,
  } = useGlobalContext();
  const [salary, setSalary] = useState([]);
  const [loader, setLoader] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");
  const [schSearch, setSchSearch] = useState("");
  const [showDeductionForm, setShowDeductionForm] = useState(false);
  const [showForm16, setShowForm16] = useState(false);
  const [showForm16New, setShowForm16New] = useState(false);
  const [filterClicked, setFilterClicked] = useState(false);
  const [teacherDeduction, setTeacherDeduction] = useState({
    id: "",
    tname: "",
    hbLoanPrincipal: "",
    hbLoanInterest: "",
    lic: "",
    ulip: "",
    ppf: "",
    nsc: "",
    nscInterest: "",
    tutionFee: "",
    sukanya: "",
    stampDuty: "",
    mediclaim: "",
    terminalDisease: "",
    handicapTreatment: "",
    educationLoan: "",
    charity: "",
    disability: "",
    rgSaving: "",
    otherIncome: "",
    fd: "",
    tds: "",
  });
  const [newITData, setNewITDa] = useState({
    tname: "",
    school: "",
    pan: "",
    phone: "",
    desig: "",
    gender: "",
    thisYear: "",
    prevYear: "",
    nextYear: "",
    finYear: "",
    marchSalary: "",
    marchBasic: "",
    marchAddl: "",
    marchDA: "",
    marchHRA: "",
    marchMA: "",
    marchGross: "",
    marchGPF: "",
    marchGSLI: "",
    bonus: "",
    marchPTax: "",
    aprilSalary: "",
    aprilBasic: "",
    aprilAddl: "",
    aprilDA: "",
    aprilHRA: "",
    aprilMA: "",
    aprilGross: "",
    aprilGPF: "",
    aprilGSLI: "",
    aprilPTax: "",
    maySalary: "",
    mayBasic: "",
    mayAddl: "",
    mayDA: "",
    mayHRA: "",
    mayMA: "",
    mayGross: "",
    mayGPF: "",
    mayGSLI: "",
    mayPTax: "",
    juneSalary: "",
    juneBasic: "",
    juneAddl: "",
    juneDA: "",
    juneHRA: "",
    juneMA: "",
    juneGross: "",
    juneGPF: "",
    juneGSLI: "",
    junePTax: "",
    julySalary: "",
    julyBasic: "",
    julyAddl: "",
    julyDA: "",
    aprilIR: "",
    julyHRA: "",
    julyMA: "",
    julyGross: "",
    julyGPF: "",
    julyGSLI: "",
    julyPTax: "",
    augustSalary: "",
    augustBasic: "",
    augustAddl: "",
    augustDA: "",
    augustHRA: "",
    augustMA: "",
    augustGross: "",
    augustGPF: "",
    augustGSLI: "",
    augustPTax: "",
    septemberSalary: "",
    septemberBasic: "",
    septemberAddl: "",
    septemberDA: "",
    septemberHRA: "",
    septemberMA: "",
    septemberGross: "",
    septemberGPF: "",
    septemberGSLI: "",
    septemberPTax: "",
    octoberSalary: "",
    octoberBasic: "",
    octoberAddl: "",
    octoberDA: "",
    octoberHRA: "",
    octoberMA: "",
    octoberGross: "",
    octoberGPF: "",
    octoberGSLI: "",
    octoberPTax: "",
    novemberSalary: "",
    novemberBasic: "",
    novemberAddl: "",
    novemberDA: "",
    novemberHRA: "",
    novemberMA: "",
    novemberGross: "",
    novemberGPF: "",
    novemberGSLI: "",
    novemberPTax: "",
    decemberSalary: "",
    decemberBasic: "",
    decemberAddl: "",
    decemberDA: "",
    decemberHRA: "",
    decemberMA: "",
    decemberGross: "",
    decemberGPF: "",
    decemberGSLI: "",
    decemberPTax: "",
    januarySalary: "",
    januaryBasic: "",
    januaryAddl: "",
    januaryDA: "",
    januaryHRA: "",
    januaryMA: "",
    januaryGross: "",
    januaryGPF: "",
    januaryGSLI: "",
    januaryPTax: "",
    februarySalary: "",
    februaryBasic: "",
    februaryAddl: "",
    februaryDA: "",
    februaryHRA: "",
    februaryMA: "",
    februaryGross: "",
    februaryGPF: "",
    februaryGSLI: "",
    februaryPTax: "",
    grossBasic: "",
    grossAddl: "",
    grossDA: "",
    grossHRA: "",
    grossMA: "",
    GrossPAY: "",
    grossGPF: "",
    grossGSLI: "",
    grossPTax: "",
    AllGross: "",
    GrossTotalIncome: "",
    TotalRoundOffIncome: "",
    CalculatedIT: "",
    eduCess: "",
    AddedEduCess: "",
    BankInterest: "",
    tds: "",
    GrossRelief: "",
    IncomeTaxAfterRelief: "",
    ThirtyIT: "",
    ThirtyITTax: "",
    TwentyIT: "",
    TwentyITTax: "",
    FifteenIT: "",
    FifteenITTax: "",
    TenIT: "",
    TenITTax: "",
    FiveIT: "",
    FiveITTax: "",
    marchNetpay: "",
    aprilNetpay: "",
    mayNetpay: "",
    juneNetpay: "",
    julyNetpay: "",
    augustNetpay: "",
    septemberNetpay: "",
    octoberNetpay: "",
    novemberNetpay: "",
    decemberNetpay: "",
    januaryNetpay: "",
    februaryNetpay: "",
    grossNetpay: "",
    TotalGross: "",
    GrossArrear: "",
  });
  const [oldITData, setOldITData] = useState({
    id: "",
    tname: "",
    fname: "",
    school: "",
    pan: "",
    phone: "",
    disability: "",
    desig: "",
    gender: "",
    thisYear: "",
    nextYear: "",
    prevYear: "",
    finYear: "",
    BankInterest: "",
    teacherDeduction: "",
    hbLoanPrincipal: "",
    hbLoanInterest: "",
    lic: "",
    ulip: "",
    ppf: "",
    nsc: "",
    nscInterest: "",
    tutionFee: "",
    sukanya: "",
    stampDuty: "",
    mediclaim: "",
    terminalDisease: "",
    handicapTreatment: "",
    educationLoan: "",
    charity: "",
    disabilityDeduction: "",
    rgSaving: "",
    otherIncome: "",
    fd: "",
    tds: "",
    marchSalary: "",
    marchBasic: "",
    marchAddl: "",
    marchDA: "",
    marchHRA: "",
    marchMA: "",
    marchGross: "",
    marchGPF: "",
    marchGSLI: "",
    bonus: "",
    marchPTax: "",
    aprilSalary: "",
    aprilBasic: "",
    aprilAddl: "",
    aprilDA: "",
    aprilHRA: "",
    aprilMA: "",
    aprilGross: "",
    aprilGPF: "",
    aprilGSLI: "",
    aprilPTax: "",
    maySalary: "",
    mayBasic: "",
    mayAddl: "",
    mayDA: "",
    mayHRA: "",
    mayMA: "",
    mayGross: "",
    mayGPF: "",
    mayGSLI: "",
    mayPTax: "",
    juneSalary: "",
    juneBasic: "",
    juneAddl: "",
    juneDA: "",
    juneHRA: "",
    juneMA: "",
    juneGross: "",
    juneGPF: "",
    juneGSLI: "",
    junePTax: "",
    julySalary: "",
    julyBasic: "",
    julyAddl: "",
    julyDA: "",
    aprilIR: "",
    julyHRA: "",
    julyMA: "",
    julyGross: "",
    julyGPF: "",
    julyGSLI: "",
    julyPTax: "",
    augustSalary: "",
    augustBasic: "",
    augustAddl: "",
    augustDA: "",
    augustHRA: "",
    augustMA: "",
    augustGross: "",
    augustGPF: "",
    augustGSLI: "",
    augustPTax: "",
    septemberSalary: "",
    septemberBasic: "",
    septemberAddl: "",
    septemberDA: "",
    septemberHRA: "",
    septemberMA: "",
    septemberGross: "",
    septemberGPF: "",
    septemberGSLI: "",
    septemberPTax: "",
    octoberSalary: "",
    octoberBasic: "",
    octoberAddl: "",
    octoberDA: "",
    octoberHRA: "",
    octoberMA: "",
    octoberGross: "",
    octoberGPF: "",
    octoberGSLI: "",
    octoberPTax: "",
    novemberSalary: "",
    novemberBasic: "",
    novemberAddl: "",
    novemberDA: "",
    novemberHRA: "",
    novemberMA: "",
    novemberGross: "",
    novemberGPF: "",
    novemberGSLI: "",
    novemberPTax: "",
    decemberSalary: "",
    decemberBasic: "",
    decemberAddl: "",
    decemberDA: "",
    decemberHRA: "",
    decemberMA: "",
    decemberGross: "",
    decemberGPF: "",
    decemberGSLI: "",
    decemberPTax: "",
    januarySalary: "",
    januaryBasic: "",
    januaryAddl: "",
    januaryDA: "",
    januaryHRA: "",
    januaryMA: "",
    januaryGross: "",
    januaryGPF: "",
    januaryGSLI: "",
    januaryPTax: "",
    februarySalary: "",
    februaryBasic: "",
    februaryAddl: "",
    februaryDA: "",
    februaryHRA: "",
    februaryMA: "",
    februaryGross: "",
    februaryGPF: "",
    februaryGSLI: "",
    februaryPTax: "",
    grossBasic: "",
    grossAddl: "",
    grossDA: "",
    grossHRA: "",
    grossMA: "",
    GrossPAY: "",
    grossGPF: "",
    grossGSLI: "",
    grossPTax: "",
    AllGross: "",
    GrossTotalIncome: "",
    deductionVIA: "",
    limitVIA: "",
    OtherVIA: "",
    TotalIncome: "",
    TotalRoundOffIncome: "",
    CalculatedIT: "",
    isUnderRebate: "",
    eduCess: "",
    AddedEduCess: "",
    TotalGross: "",
    GrossArrear: "",
    marchNetpay: "",
    aprilNetpay: "",
    mayNetpay: "",
    juneNetpay: "",
    julyNetpay: "",
    augustNetpay: "",
    septemberNetpay: "",
    octoberNetpay: "",
    novemberNetpay: "",
    decemberNetpay: "",
    januaryNetpay: "",
    februaryNetpay: "",
    grossNetpay: "",
  });
  const [TeacherData, setTeacherData] = useState({
    id: "",
    tname: "",
    school: "",
    pan: "",
    phone: "",
    disability: "",
    desig: "",
  });
  const date = new Date();
  const month = date.getMonth() + 1;
  // let thisYear, nextYear, prevYear;
  // if (month < 4) {
  // thisYear = date.getFullYear();
  // nextYear = date.getFullYear() + 1;
  // prevYear = date.getFullYear() - 1;
  // } else {
  //   thisYear = date.getFullYear() - 1;
  //   nextYear = date.getFullYear();
  //   prevYear = date.getFullYear() - 2;
  // }
  // const finYear = `${thisYear}-${nextYear}`;
  const [thisYear, setThisYear] = useState(date.getFullYear());
  const [nextYear, setNextYear] = useState(date.getFullYear() + 1);
  const [prevYear, setPrevYear] = useState(date.getFullYear() - 1);
  const [finYear, setFinYear] = useState(`${thisYear}-${nextYear}`);
  const yearArray = [2024, 2025, 2026];
  const [showYearSelection, setShowYearSelection] = useState(true);
  const [showNewModal, setShowNewModal] = useState(false);
  const [showOldModal, setShowOldModal] = useState(false);
  const [march, setMarch] = useState([]);
  const [april, setApril] = useState([]);
  const [may, setMay] = useState([]);
  const [june, setJune] = useState([]);
  const [july, setJuly] = useState([]);
  const [august, setAugust] = useState([]);
  const [september, setSeptember] = useState([]);
  const [october, setOctober] = useState([]);
  const [november, setNovember] = useState([]);
  const [december, setDecember] = useState([]);
  const [january, setJanuary] = useState([]);
  const [february, setFebruary] = useState([]);
  const calCulateOldIT = async (data) => {
    const { id, tname, fname, school, pan, phone, disability, desig, gender } =
      data;
    const marchSalary = march.filter((el) => el.id === id)[0];
    const marchArrear = marchSalary?.arrear;
    const marchBasic = marchSalary?.basic;
    const marchAddl = marchSalary?.addl;
    const marchDA = Math.round(marchSalary?.basic * marchSalary?.daPercent);
    const marchHRA =
      marchSalary?.hraPercent > 10
        ? marchSalary?.hraPercent
        : Math.round(marchSalary?.basic * marchSalary?.hraPercent);
    const marchMA = marchSalary?.ma;
    const marchGross = marchBasic + marchDA + marchHRA + marchAddl + marchMA;
    const marchGPF = marchSalary?.gpf;
    const marchGSLI = marchSalary?.gsli;
    const bonus = marchSalary?.bonus;
    const marchPTax = disability === "YES" ? 0 : ptaxCalc(marchGross);
    const marchNetpay = marchGross - marchGPF - marchGSLI - marchPTax;
    const aprilSalary = april.filter((el) => el.id === id)[0];
    const aprilArrear = aprilSalary?.arrear;
    const aprilBasic = aprilSalary?.basic;
    const aprilAddl = aprilSalary?.addl;
    const aprilDA = Math.round(aprilSalary?.basic * aprilSalary?.daPercent);
    const aprilHRA =
      aprilSalary?.hraPercent > 10
        ? aprilSalary?.hraPercent
        : Math.round(aprilSalary?.basic * aprilSalary?.hraPercent);
    const aprilMA = aprilSalary?.ma;
    const aprilGross = aprilBasic + aprilDA + aprilHRA + aprilAddl + aprilMA;
    const aprilGPF = aprilSalary?.gpf;
    const aprilGSLI = aprilSalary?.gsli;
    const aprilPTax = disability === "YES" ? 0 : ptaxCalc(aprilGross);
    const aprilNetpay = aprilGross - aprilGPF - aprilGSLI - aprilPTax;
    const maySalary = may.filter((el) => el.id === id)[0];
    const mayArrear = maySalary?.arrear;
    const mayBasic = maySalary?.basic;
    const mayAddl = maySalary?.addl;
    const mayDA = Math.round(maySalary?.basic * maySalary?.daPercent);
    const mayHRA =
      maySalary?.hraPercent > 10
        ? maySalary?.hraPercent
        : Math.round(maySalary?.basic * maySalary?.hraPercent);
    const mayMA = maySalary?.ma;
    const mayGross = mayBasic + mayDA + mayHRA + mayAddl + mayMA;
    const mayGPF = maySalary?.gpf;
    const mayGSLI = maySalary?.gsli;
    const mayPTax = disability === "YES" ? 0 : ptaxCalc(mayGross);
    const mayNetpay = mayGross - mayGPF - mayGSLI - mayPTax;
    const juneSalary = june.filter((el) => el.id === id)[0];
    const juneArrear = juneSalary?.arrear;
    const juneBasic = juneSalary?.basic;
    const juneAddl = juneSalary?.addl;
    const juneDA = Math.round(juneSalary?.basic * juneSalary?.daPercent);
    const juneHRA =
      juneSalary?.hraPercent > 10
        ? juneSalary?.hraPercent
        : Math.round(juneSalary?.basic * juneSalary?.hraPercent);
    const juneMA = juneSalary?.ma;
    const juneGross = juneBasic + juneDA + juneHRA + juneAddl + juneMA;
    const juneGPF = juneSalary?.gpf;
    const juneGSLI = juneSalary?.gsli;
    const junePTax = disability === "YES" ? 0 : ptaxCalc(juneGross);
    const juneNetpay = juneGross - juneGPF - juneGSLI - junePTax;
    const julySalary = july.filter((el) => el.id === id)[0];
    const julyArrear = julySalary?.arrear;
    const julyBasic = julySalary?.basic;
    const julyAddl = julySalary?.addl;
    const julyDA = Math.round(julySalary?.basic * julySalary?.daPercent);
    const aprilIR = year == 2024 ? Math.round(aprilSalary?.basic * 0.04) : 0;
    const julyHRA =
      julySalary?.hraPercent > 10
        ? julySalary?.hraPercent
        : Math.round(julySalary?.basic * julySalary?.hraPercent);
    const julyMA = julySalary?.ma;
    const julyGross =
      julyBasic + julyDA + julyHRA + julyAddl + julyMA + aprilIR;
    const julyGPF = julySalary?.gpf;
    const julyGSLI = julySalary?.gsli;
    const julyPTax = disability === "YES" ? 0 : ptaxCalc(julyGross);
    const julyNetpay = julyGross - julyGPF - julyGSLI - julyPTax;
    const augustSalary = august.filter((el) => el.id === id)[0];
    const augustArrear = augustSalary?.arrear;
    const augustBasic = augustSalary?.basic;
    const augustAddl = augustSalary?.addl;
    const augustDA = Math.round(augustSalary?.basic * augustSalary?.daPercent);
    const augustHRA =
      augustSalary?.hraPercent > 10
        ? augustSalary?.hraPercent
        : Math.round(augustSalary?.basic * augustSalary?.hraPercent);
    const augustMA = augustSalary?.ma;
    const augustGross =
      augustBasic + augustDA + augustHRA + augustAddl + augustMA;
    const augustGPF = augustSalary?.gpf;
    const augustGSLI = augustSalary?.gsli;
    const augustPTax = disability === "YES" ? 0 : ptaxCalc(augustGross);
    const augustNetpay = augustGross - augustGPF - augustGSLI - augustPTax;
    const septemberSalary = september.filter((el) => el.id === id)[0];
    const septemberArrear = septemberSalary?.arrear;
    const septemberBasic = septemberSalary?.basic;
    const septemberAddl = septemberSalary?.addl;
    const septemberDA = Math.round(
      septemberSalary?.basic * septemberSalary?.daPercent
    );
    const septemberHRA =
      septemberSalary?.hraPercent > 10
        ? septemberSalary?.hraPercent
        : Math.round(septemberSalary?.basic * septemberSalary?.hraPercent);
    const septemberMA = septemberSalary?.ma;
    const septemberGross =
      septemberBasic + septemberDA + septemberHRA + septemberAddl + septemberMA;
    const septemberGPF = septemberSalary?.gpf;
    const septemberGSLI = septemberSalary?.gsli;
    const septemberPTax = disability === "YES" ? 0 : ptaxCalc(septemberGross);
    const septemberNetpay =
      septemberGross - septemberGPF - septemberGSLI - septemberPTax;
    const octoberSalary = october.filter((el) => el.id === id)[0];
    const octoberArrear = octoberSalary?.arrear;
    const octoberBasic = octoberSalary?.basic;
    const octoberAddl = octoberSalary?.addl;
    const octoberDA = Math.round(
      octoberSalary?.basic * octoberSalary?.daPercent
    );
    const octoberHRA =
      octoberSalary?.hraPercent > 10
        ? octoberSalary?.hraPercent
        : Math.round(octoberSalary?.basic * octoberSalary?.hraPercent);
    const octoberMA = octoberSalary?.ma;
    const octoberGross =
      octoberBasic + octoberDA + octoberHRA + octoberAddl + octoberMA;
    const octoberGPF = octoberSalary?.gpf;
    const octoberGSLI = octoberSalary?.gsli;
    const octoberPTax = disability === "YES" ? 0 : ptaxCalc(octoberGross);
    const octoberNetpay = octoberGross - octoberGPF - octoberGSLI - octoberPTax;
    const novemberSalary = november.filter((el) => el.id === id)[0];
    const novemberArrear = novemberSalary?.arrear;
    const novemberBasic = novemberSalary?.basic;
    const novemberAddl = novemberSalary?.addl;
    const novemberDA = Math.round(
      novemberSalary?.basic * novemberSalary?.daPercent
    );
    const novemberHRA =
      novemberSalary?.hraPercent > 10
        ? novemberSalary?.hraPercent
        : Math.round(novemberSalary?.basic * novemberSalary?.hraPercent);
    const novemberMA = novemberSalary?.ma;
    const novemberGross =
      novemberBasic + novemberDA + novemberHRA + novemberAddl + novemberMA;
    const novemberGPF = novemberSalary?.gpf;
    const novemberGSLI = novemberSalary?.gsli;
    const novemberPTax = disability === "YES" ? 0 : ptaxCalc(novemberGross);
    const novemberNetpay =
      novemberGross - novemberGPF - novemberGSLI - novemberPTax;
    const decemberSalary = december.filter((el) => el.id === id)[0];
    const decemberArrear = decemberSalary?.arrear;
    const decemberBasic = decemberSalary?.basic;
    const decemberAddl = decemberSalary?.addl;
    const decemberDA = Math.round(
      decemberSalary?.basic * decemberSalary?.daPercent
    );
    const decemberHRA =
      decemberSalary?.hraPercent > 10
        ? decemberSalary?.hraPercent
        : Math.round(decemberSalary?.basic * decemberSalary?.hraPercent);
    const decemberMA = decemberSalary?.ma;
    const decemberGross =
      decemberBasic + decemberDA + decemberHRA + decemberAddl + decemberMA;
    const decemberGPF = decemberSalary?.gpf;
    const decemberGSLI = decemberSalary?.gsli;
    const decemberPTax = disability === "YES" ? 0 : ptaxCalc(decemberGross);
    const decemberNetpay =
      decemberGross - decemberGPF - decemberGSLI - decemberPTax;
    const januarySalary = january.filter((el) => el.id === id)[0];
    const januaryArrear = januarySalary?.arrear;
    const januaryBasic = januarySalary?.basic;
    const januaryAddl = januarySalary?.addl;
    const januaryDA = Math.round(
      januarySalary?.basic * januarySalary?.daPercent
    );
    const januaryHRA =
      januarySalary?.hraPercent > 10
        ? januarySalary?.hraPercent
        : Math.round(januarySalary?.basic * januarySalary?.hraPercent);
    const januaryMA = januarySalary?.ma;
    const januaryGross =
      januaryBasic + januaryDA + januaryHRA + januaryAddl + januaryMA;
    const januaryGPF = januarySalary?.gpf;
    const januaryGSLI = januarySalary?.gsli;
    const januaryPTax = disability === "YES" ? 0 : ptaxCalc(januaryGross);
    const januaryNetpay = januaryGross - januaryGPF - januaryGSLI - januaryPTax;
    const februarySalary = february.filter((el) => el.id === id)[0];
    const februaryArrear = februarySalary?.arrear;
    const februaryBasic = februarySalary?.basic;
    const februaryAddl = februarySalary?.addl;
    const februaryDA = Math.round(
      februarySalary?.basic * februarySalary?.daPercent
    );
    const februaryHRA =
      februarySalary?.hraPercent > 10
        ? februarySalary?.hraPercent
        : Math.round(februarySalary?.basic * februarySalary?.hraPercent);
    const februaryMA = februarySalary?.ma;
    const februaryGross =
      februaryBasic + februaryDA + februaryHRA + februaryAddl + februaryMA;
    const februaryGPF = februarySalary?.gpf;
    const februaryGSLI = februarySalary?.gsli;
    const februaryPTax = disability === "YES" ? 0 : ptaxCalc(februaryGross);
    const februaryNetpay =
      februaryGross - februaryGPF - februaryGSLI - februaryPTax;
    const grossBasic =
      marchBasic +
      aprilBasic +
      mayBasic +
      juneBasic +
      julyBasic +
      augustBasic +
      septemberBasic +
      octoberBasic +
      novemberBasic +
      decemberBasic +
      januaryBasic +
      februaryBasic;
    const grossAddl =
      marchAddl +
      aprilAddl +
      mayAddl +
      juneAddl +
      julyAddl +
      augustAddl +
      septemberAddl +
      octoberAddl +
      novemberAddl +
      decemberAddl +
      januaryAddl +
      februaryAddl;
    const grossDA =
      marchDA +
      aprilDA +
      mayDA +
      juneDA +
      julyDA +
      augustDA +
      septemberDA +
      octoberDA +
      novemberDA +
      decemberDA +
      januaryDA +
      februaryDA;
    const grossHRA =
      marchHRA +
      aprilHRA +
      mayHRA +
      juneHRA +
      julyHRA +
      augustHRA +
      septemberHRA +
      octoberHRA +
      novemberHRA +
      decemberHRA +
      januaryHRA +
      februaryHRA;
    const grossMA =
      marchMA +
      aprilMA +
      mayMA +
      juneMA +
      julyMA +
      augustMA +
      septemberMA +
      octoberMA +
      novemberMA +
      decemberMA +
      januaryMA +
      februaryMA;
    const TotalGross =
      marchGross +
      aprilGross +
      mayGross +
      juneGross +
      julyGross +
      augustGross +
      septemberGross +
      octoberGross +
      novemberGross +
      decemberGross +
      januaryGross +
      februaryGross;
    const GrossPAY =
      marchGross +
      aprilGross +
      mayGross +
      juneGross +
      julyGross +
      augustGross +
      septemberGross +
      octoberGross +
      novemberGross +
      decemberGross +
      januaryGross +
      februaryGross +
      bonus;
    const grossGPF =
      marchGPF +
      aprilGPF +
      mayGPF +
      juneGPF +
      julyGPF +
      augustGPF +
      septemberGPF +
      octoberGPF +
      novemberGPF +
      decemberGPF +
      januaryGPF +
      februaryGPF;
    const grossGSLI =
      marchGSLI +
      aprilGSLI +
      mayGSLI +
      juneGSLI +
      julyGSLI +
      augustGSLI +
      septemberGSLI +
      octoberGSLI +
      novemberGSLI +
      decemberGSLI +
      januaryGSLI +
      februaryGSLI;
    const grossPTax =
      marchPTax +
      aprilPTax +
      mayPTax +
      junePTax +
      julyPTax +
      augustPTax +
      septemberPTax +
      octoberPTax +
      novemberPTax +
      decemberPTax +
      januaryPTax +
      februaryPTax;
    const grossNetpay =
      marchNetpay +
      aprilNetpay +
      mayNetpay +
      juneNetpay +
      julyNetpay +
      augustNetpay +
      septemberNetpay +
      octoberNetpay +
      novemberNetpay +
      decemberNetpay +
      januaryNetpay +
      februaryNetpay +
      bonus;
    const BankInterest = randBetween(500, 2000);
    const teacherDeduction = deductionState?.filter((el) => el.id === id)[0];
    const hbLoanPrincipal = teacherDeduction?.hbLoanPrincipal;
    const hbLoanInterest = teacherDeduction?.hbLoanInterest;
    const lic = teacherDeduction?.lic;
    const ulip = teacherDeduction?.ulip;
    const ppf = teacherDeduction?.ppf;
    const nsc = teacherDeduction?.nsc;
    const nscInterest = teacherDeduction?.nscInterest;
    const tutionFee = teacherDeduction?.tutionFee;
    const sukanya = teacherDeduction?.sukanya;
    const stampDuty = teacherDeduction?.stampDuty;
    const mediclaim = teacherDeduction?.mediclaim;
    const terminalDisease = teacherDeduction?.terminalDisease;
    const handicapTreatment = teacherDeduction?.handicapTreatment;
    const educationLoan = teacherDeduction?.educationLoan;
    const charity = teacherDeduction?.charity;
    const disabilityDeduction = teacherDeduction?.disability;
    const rgSaving = teacherDeduction?.rgSaving;
    const otherIncome = teacherDeduction?.otherIncome;
    const fd = teacherDeduction?.fd;
    const tds = teacherDeduction?.tds;
    const AllGross =
      GrossPAY +
      marchArrear +
      aprilArrear +
      mayArrear +
      juneArrear +
      julyArrear +
      augustArrear +
      septemberArrear +
      octoberArrear +
      novemberArrear +
      decemberArrear +
      januaryArrear +
      februaryArrear +
      otherIncome;
    const GrossArrear =
      marchArrear +
      aprilArrear +
      mayArrear +
      juneArrear +
      julyArrear +
      augustArrear +
      septemberArrear +
      octoberArrear +
      novemberArrear +
      decemberArrear +
      januaryArrear +
      februaryArrear;
    const GrossTotalIncome =
      AllGross - grossPTax - 50000 + BankInterest - hbLoanInterest;
    const deductionVIA =
      grossGPF +
      sukanya +
      nsc +
      ulip +
      hbLoanPrincipal +
      nsc +
      ppf +
      lic +
      tutionFee +
      fd +
      grossGSLI +
      nscInterest;
    const limitVIA = deductionVIA >= 150000 ? 150000 : deductionVIA;
    const OtherVIA =
      BankInterest +
      mediclaim +
      disabilityDeduction +
      terminalDisease +
      educationLoan +
      charity +
      handicapTreatment;
    const TotalIncome = GrossTotalIncome - limitVIA - OtherVIA;
    const TotalRoundOffIncome = roundSo(TotalIncome, 10);
    const CalculatedIT = CalculateIncomeTax(TotalRoundOffIncome);
    const isUnderRebate = CalculatedIT >= 12500 ? false : true;
    const eduCess = CalculatedIT * 0.04;
    const AddedEduCess = CalculatedIT + CalculatedIT * 0.04;
    setOldITData({
      id,
      tname,
      fname,
      school,
      pan,
      phone,
      disability,
      desig,
      gender,
      thisYear,
      nextYear,
      prevYear,
      finYear,
      BankInterest,
      teacherDeduction,
      hbLoanPrincipal,
      hbLoanInterest,
      lic,
      ulip,
      ppf,
      nsc,
      nscInterest,
      tutionFee,
      sukanya,
      stampDuty,
      mediclaim,
      terminalDisease,
      handicapTreatment,
      educationLoan,
      charity,
      disabilityDeduction,
      rgSaving,
      otherIncome,
      fd,
      tds,
      marchSalary,
      marchBasic,
      marchAddl,
      marchDA,
      marchHRA,
      marchMA,
      marchGross,
      marchGPF,
      marchGSLI,
      bonus,
      marchPTax,
      aprilSalary,
      aprilBasic,
      aprilAddl,
      aprilDA,
      aprilHRA,
      aprilMA,
      aprilGross,
      aprilGPF,
      aprilGSLI,
      aprilPTax,
      maySalary,
      mayBasic,
      mayAddl,
      mayDA,
      mayHRA,
      mayMA,
      mayGross,
      mayGPF,
      mayGSLI,
      mayPTax,
      juneSalary,
      juneBasic,
      juneAddl,
      juneDA,
      juneHRA,
      juneMA,
      juneGross,
      juneGPF,
      juneGSLI,
      junePTax,
      julySalary,
      julyBasic,
      julyAddl,
      julyDA,
      aprilIR,
      julyHRA,
      julyMA,
      julyGross,
      julyGPF,
      julyGSLI,
      julyPTax,
      augustSalary,
      augustBasic,
      augustAddl,
      augustDA,
      augustHRA,
      augustMA,
      augustGross,
      augustGPF,
      augustGSLI,
      augustPTax,
      septemberSalary,
      septemberBasic,
      septemberAddl,
      septemberDA,
      septemberHRA,
      septemberMA,
      septemberGross,
      septemberGPF,
      septemberGSLI,
      septemberPTax,
      octoberSalary,
      octoberBasic,
      octoberAddl,
      octoberDA,
      octoberHRA,
      octoberMA,
      octoberGross,
      octoberGPF,
      octoberGSLI,
      octoberPTax,
      novemberSalary,
      novemberBasic,
      novemberAddl,
      novemberDA,
      novemberHRA,
      novemberMA,
      novemberGross,
      novemberGPF,
      novemberGSLI,
      novemberPTax,
      decemberSalary,
      decemberBasic,
      decemberAddl,
      decemberDA,
      decemberHRA,
      decemberMA,
      decemberGross,
      decemberGPF,
      decemberGSLI,
      decemberPTax,
      januarySalary,
      januaryBasic,
      januaryAddl,
      januaryDA,
      januaryHRA,
      januaryMA,
      januaryGross,
      januaryGPF,
      januaryGSLI,
      januaryPTax,
      februarySalary,
      februaryBasic,
      februaryAddl,
      februaryDA,
      februaryHRA,
      februaryMA,
      februaryGross,
      februaryGPF,
      februaryGSLI,
      februaryPTax,
      grossBasic,
      grossAddl,
      grossDA,
      grossHRA,
      grossMA,
      GrossPAY,
      grossGPF,
      grossGSLI,
      grossPTax,
      AllGross,
      GrossTotalIncome,
      deductionVIA,
      limitVIA,
      OtherVIA,
      TotalIncome,
      TotalRoundOffIncome,
      CalculatedIT,
      isUnderRebate,
      eduCess,
      AddedEduCess,
      TotalGross,
      GrossArrear,
      marchNetpay,
      aprilNetpay,
      mayNetpay,
      juneNetpay,
      julyNetpay,
      augustNetpay,
      septemberNetpay,
      octoberNetpay,
      novemberNetpay,
      decemberNetpay,
      januaryNetpay,
      februaryNetpay,
      grossNetpay,
    });
  };
  const calCulateNewIT = async (data, year) => {
    const { id, tname, school, pan, phone, disability, desig, gender } = data;
    const marchSalary = march.filter((el) => el.id === id)[0];
    const marchArrear = marchSalary?.arrear;
    const marchBasic = marchSalary?.basic;
    const marchAddl = marchSalary?.addl;
    const marchDA = Math.round(marchSalary?.basic * marchSalary?.daPercent);
    const marchHRA =
      marchSalary?.hraPercent > 10
        ? marchSalary?.hraPercent
        : Math.round(marchSalary?.basic * marchSalary?.hraPercent);
    const marchMA = marchSalary?.ma;
    const marchGross = marchBasic + marchDA + marchHRA + marchAddl + marchMA;
    const marchGPF = marchSalary?.gpf;
    const marchGSLI = marchSalary?.gsli;
    const bonus = marchSalary?.bonus;
    const marchPTax = disability === "YES" ? 0 : ptaxCalc(marchGross);
    const marchNetpay = marchGross - marchGPF - marchGSLI - marchPTax;
    const aprilSalary = april.filter((el) => el.id === id)[0];
    const aprilArrear = aprilSalary?.arrear;
    const aprilBasic = aprilSalary?.basic;
    const aprilAddl = aprilSalary?.addl;
    const aprilDA = Math.round(aprilSalary?.basic * aprilSalary?.daPercent);
    const aprilHRA =
      aprilSalary?.hraPercent > 10
        ? aprilSalary?.hraPercent
        : Math.round(aprilSalary?.basic * aprilSalary?.hraPercent);
    const aprilMA = aprilSalary?.ma;
    const aprilGross = aprilBasic + aprilDA + aprilHRA + aprilAddl + aprilMA;
    const aprilGPF = aprilSalary?.gpf;
    const aprilGSLI = aprilSalary?.gsli;
    const aprilPTax = disability === "YES" ? 0 : ptaxCalc(aprilGross);
    const aprilNetpay = aprilGross - aprilGPF - aprilGSLI - aprilPTax;
    const maySalary = may.filter((el) => el.id === id)[0];
    const mayArrear = maySalary?.arrear;
    const mayBasic = maySalary?.basic;
    const mayAddl = maySalary?.addl;
    const mayDA = Math.round(maySalary?.basic * maySalary?.daPercent);
    const mayHRA =
      maySalary?.hraPercent > 10
        ? maySalary?.hraPercent
        : Math.round(maySalary?.basic * maySalary?.hraPercent);
    const mayMA = maySalary?.ma;
    const mayGross = mayBasic + mayDA + mayHRA + mayAddl + mayMA;
    const mayGPF = maySalary?.gpf;
    const mayGSLI = maySalary?.gsli;
    const mayPTax = disability === "YES" ? 0 : ptaxCalc(mayGross);
    const mayNetpay = mayGross - mayGPF - mayGSLI - mayPTax;
    const juneSalary = june.filter((el) => el.id === id)[0];
    const juneArrear = juneSalary?.arrear;
    const juneBasic = juneSalary?.basic;
    const juneAddl = juneSalary?.addl;
    const juneDA = Math.round(juneSalary?.basic * juneSalary?.daPercent);
    const juneHRA =
      juneSalary?.hraPercent > 10
        ? juneSalary?.hraPercent
        : Math.round(juneSalary?.basic * juneSalary?.hraPercent);
    const juneMA = juneSalary?.ma;
    const juneGross = juneBasic + juneDA + juneHRA + juneAddl + juneMA;
    const juneGPF = juneSalary?.gpf;
    const juneGSLI = juneSalary?.gsli;
    const junePTax = disability === "YES" ? 0 : ptaxCalc(juneGross);
    const juneNetpay = juneGross - juneGPF - juneGSLI - junePTax;
    const julySalary = july.filter((el) => el.id === id)[0];
    const julyArrear = julySalary?.arrear;
    const julyBasic = julySalary?.basic;
    const julyAddl = julySalary?.addl;
    const julyDA = Math.round(julySalary?.basic * julySalary?.daPercent);
    const aprilIR = year == 2024 ? Math.round(aprilSalary?.basic * 0.04) : 0;
    const julyHRA =
      julySalary?.hraPercent > 10
        ? julySalary?.hraPercent
        : Math.round(julySalary?.basic * julySalary?.hraPercent);
    const julyMA = julySalary?.ma;
    const julyGross =
      julyBasic + julyDA + julyHRA + julyAddl + julyMA + aprilIR;
    const julyGPF = julySalary?.gpf;
    const julyGSLI = julySalary?.gsli;
    const julyPTax = disability === "YES" ? 0 : ptaxCalc(julyGross);
    const julyNetpay = julyGross - julyGPF - julyGSLI - julyPTax;
    const augustSalary = august.filter((el) => el.id === id)[0];
    const augustArrear = augustSalary?.arrear;
    const augustBasic = augustSalary?.basic;
    const augustAddl = augustSalary?.addl;
    const augustDA = Math.round(augustSalary?.basic * augustSalary?.daPercent);
    const augustHRA =
      augustSalary?.hraPercent > 10
        ? augustSalary?.hraPercent
        : Math.round(augustSalary?.basic * augustSalary?.hraPercent);
    const augustMA = augustSalary?.ma;
    const augustGross =
      augustBasic + augustDA + augustHRA + augustAddl + augustMA;
    const augustGPF = augustSalary?.gpf;
    const augustGSLI = augustSalary?.gsli;
    const augustPTax = disability === "YES" ? 0 : ptaxCalc(augustGross);
    const augustNetpay = augustGross - augustGPF - augustGSLI - augustPTax;
    const septemberSalary = september.filter((el) => el.id === id)[0];
    const septemberArrear = septemberSalary?.arrear;
    const septemberBasic = septemberSalary?.basic;
    const septemberAddl = septemberSalary?.addl;
    const septemberDA = Math.round(
      septemberSalary?.basic * septemberSalary?.daPercent
    );
    const septemberHRA =
      septemberSalary?.hraPercent > 10
        ? septemberSalary?.hraPercent
        : Math.round(septemberSalary?.basic * septemberSalary?.hraPercent);
    const septemberMA = septemberSalary?.ma;
    const septemberGross =
      septemberBasic + septemberDA + septemberHRA + septemberAddl + septemberMA;
    const septemberGPF = septemberSalary?.gpf;
    const septemberGSLI = septemberSalary?.gsli;
    const septemberPTax = disability === "YES" ? 0 : ptaxCalc(septemberGross);
    const septemberNetpay =
      septemberGross - septemberGPF - septemberGSLI - septemberPTax;
    const octoberSalary = october.filter((el) => el.id === id)[0];
    const octoberArrear = octoberSalary?.arrear;
    const octoberBasic = octoberSalary?.basic;
    const octoberAddl = octoberSalary?.addl;
    const octoberDA = Math.round(
      octoberSalary?.basic * octoberSalary?.daPercent
    );
    const octoberHRA =
      octoberSalary?.hraPercent > 10
        ? octoberSalary?.hraPercent
        : Math.round(octoberSalary?.basic * octoberSalary?.hraPercent);
    const octoberMA = octoberSalary?.ma;
    const octoberGross =
      octoberBasic + octoberDA + octoberHRA + octoberAddl + octoberMA;
    const octoberGPF = octoberSalary?.gpf;
    const octoberGSLI = octoberSalary?.gsli;
    const octoberPTax = disability === "YES" ? 0 : ptaxCalc(octoberGross);
    const octoberNetpay = octoberGross - octoberGPF - octoberGSLI - octoberPTax;
    const novemberSalary = november.filter((el) => el.id === id)[0];
    const novemberArrear = novemberSalary?.arrear;
    const novemberBasic = novemberSalary?.basic;
    const novemberAddl = novemberSalary?.addl;
    const novemberDA = Math.round(
      novemberSalary?.basic * novemberSalary?.daPercent
    );
    const novemberHRA =
      novemberSalary?.hraPercent > 10
        ? novemberSalary?.hraPercent
        : Math.round(novemberSalary?.basic * novemberSalary?.hraPercent);
    const novemberMA = novemberSalary?.ma;
    const novemberGross =
      novemberBasic + novemberDA + novemberHRA + novemberAddl + novemberMA;
    const novemberGPF = novemberSalary?.gpf;
    const novemberGSLI = novemberSalary?.gsli;
    const novemberPTax = disability === "YES" ? 0 : ptaxCalc(novemberGross);
    const novemberNetpay =
      novemberGross - novemberGPF - novemberGSLI - novemberPTax;
    const decemberSalary = december.filter((el) => el.id === id)[0];
    const decemberArrear = decemberSalary?.arrear;
    const decemberBasic = decemberSalary?.basic;
    const decemberAddl = decemberSalary?.addl;
    const decemberDA = Math.round(
      decemberSalary?.basic * decemberSalary?.daPercent
    );
    const decemberHRA =
      decemberSalary?.hraPercent > 10
        ? decemberSalary?.hraPercent
        : Math.round(decemberSalary?.basic * decemberSalary?.hraPercent);
    const decemberMA = decemberSalary?.ma;
    const decemberGross =
      decemberBasic + decemberDA + decemberHRA + decemberAddl + decemberMA;
    const decemberGPF = decemberSalary?.gpf;
    const decemberGSLI = decemberSalary?.gsli;
    const decemberPTax = disability === "YES" ? 0 : ptaxCalc(decemberGross);
    const decemberNetpay =
      decemberGross - decemberGPF - decemberGSLI - decemberPTax;
    const januarySalary = january.filter((el) => el.id === id)[0];
    const januaryArrear = januarySalary?.arrear;
    const januaryBasic = januarySalary?.basic;
    const januaryAddl = januarySalary?.addl;
    const januaryDA = Math.round(
      januarySalary?.basic * januarySalary?.daPercent
    );
    const januaryHRA =
      januarySalary?.hraPercent > 10
        ? januarySalary?.hraPercent
        : Math.round(januarySalary?.basic * januarySalary?.hraPercent);
    const januaryMA = januarySalary?.ma;
    const januaryGross =
      januaryBasic + januaryDA + januaryHRA + januaryAddl + januaryMA;
    const januaryGPF = januarySalary?.gpf;
    const januaryGSLI = januarySalary?.gsli;
    const januaryPTax = disability === "YES" ? 0 : ptaxCalc(januaryGross);
    const januaryNetpay = januaryGross - januaryGPF - januaryGSLI - januaryPTax;
    const februarySalary = february.filter((el) => el.id === id)[0];
    const februaryArrear = februarySalary?.arrear;
    const februaryBasic = februarySalary?.basic;
    const februaryAddl = februarySalary?.addl;
    const februaryDA = Math.round(
      februarySalary?.basic * februarySalary?.daPercent
    );
    const februaryHRA =
      februarySalary?.hraPercent > 10
        ? februarySalary?.hraPercent
        : Math.round(februarySalary?.basic * februarySalary?.hraPercent);
    const februaryMA = februarySalary?.ma;
    const februaryGross =
      februaryBasic + februaryDA + februaryHRA + februaryAddl + februaryMA;
    const februaryGPF = februarySalary?.gpf;
    const februaryGSLI = februarySalary?.gsli;
    const februaryPTax = disability === "YES" ? 0 : ptaxCalc(februaryGross);
    const februaryNetpay =
      februaryGross - februaryGPF - februaryGSLI - februaryPTax;
    const grossBasic =
      marchBasic +
      aprilBasic +
      mayBasic +
      juneBasic +
      julyBasic +
      augustBasic +
      septemberBasic +
      octoberBasic +
      novemberBasic +
      decemberBasic +
      januaryBasic +
      februaryBasic;
    const grossAddl =
      marchAddl +
      aprilAddl +
      mayAddl +
      juneAddl +
      julyAddl +
      augustAddl +
      septemberAddl +
      octoberAddl +
      novemberAddl +
      decemberAddl +
      januaryAddl +
      februaryAddl;
    const grossDA =
      marchDA +
      aprilDA +
      mayDA +
      juneDA +
      julyDA +
      augustDA +
      septemberDA +
      octoberDA +
      novemberDA +
      decemberDA +
      januaryDA +
      februaryDA;
    const grossHRA =
      marchHRA +
      aprilHRA +
      mayHRA +
      juneHRA +
      julyHRA +
      augustHRA +
      septemberHRA +
      octoberHRA +
      novemberHRA +
      decemberHRA +
      januaryHRA +
      februaryHRA;
    const grossMA =
      marchMA +
      aprilMA +
      mayMA +
      juneMA +
      julyMA +
      augustMA +
      septemberMA +
      octoberMA +
      novemberMA +
      decemberMA +
      januaryMA +
      februaryMA;
    const TotalGross =
      marchGross +
      aprilGross +
      mayGross +
      juneGross +
      julyGross +
      augustGross +
      septemberGross +
      octoberGross +
      novemberGross +
      decemberGross +
      januaryGross +
      februaryGross;
    const GrossArrear =
      marchArrear +
      aprilArrear +
      mayArrear +
      juneArrear +
      julyArrear +
      augustArrear +
      septemberArrear +
      octoberArrear +
      novemberArrear +
      decemberArrear +
      januaryArrear +
      februaryArrear;
    const GrossPAY =
      marchGross +
      aprilGross +
      mayGross +
      juneGross +
      julyGross +
      augustGross +
      septemberGross +
      octoberGross +
      novemberGross +
      decemberGross +
      januaryGross +
      februaryGross +
      bonus;
    const grossGPF =
      marchGPF +
      aprilGPF +
      mayGPF +
      juneGPF +
      julyGPF +
      augustGPF +
      septemberGPF +
      octoberGPF +
      novemberGPF +
      decemberGPF +
      januaryGPF +
      februaryGPF;
    const grossGSLI =
      marchGSLI +
      aprilGSLI +
      mayGSLI +
      juneGSLI +
      julyGSLI +
      augustGSLI +
      septemberGSLI +
      octoberGSLI +
      novemberGSLI +
      decemberGSLI +
      januaryGSLI +
      februaryGSLI;
    const grossPTax =
      marchPTax +
      aprilPTax +
      mayPTax +
      junePTax +
      julyPTax +
      augustPTax +
      septemberPTax +
      octoberPTax +
      novemberPTax +
      decemberPTax +
      januaryPTax +
      februaryPTax;
    const grossNetpay =
      marchNetpay +
      aprilNetpay +
      mayNetpay +
      juneNetpay +
      julyNetpay +
      augustNetpay +
      septemberNetpay +
      octoberNetpay +
      novemberNetpay +
      decemberNetpay +
      januaryNetpay +
      februaryNetpay +
      bonus;
    const BankInterest = randBetween(500, 2000);
    const teacherDeduction = deductionState?.filter((el) => el.id === id)[0];
    const otherIncome = teacherDeduction?.otherIncome;
    const tds = teacherDeduction?.tds;
    const AllGross =
      GrossPAY +
      marchArrear +
      aprilArrear +
      mayArrear +
      juneArrear +
      julyArrear +
      augustArrear +
      septemberArrear +
      octoberArrear +
      novemberArrear +
      decemberArrear +
      januaryArrear +
      februaryArrear +
      otherIncome;
    const GrossTotalIncome = AllGross - 75000 + BankInterest; //H36
    const TotalRoundOffIncome = roundSo(GrossTotalIncome, 10);
    let ThirtyIT,
      ThirtyITTax,
      TwentyIT,
      TwentyITTax,
      FifteenIT,
      FifteenITTax,
      TenIT,
      TenITTax,
      FiveIT,
      FiveITTax,
      CalculatedIT,
      GrossRelief,
      IncomeTaxAfterRelief,
      eduCess,
      AddedEduCess;
    let TwentyFiveIT = 0;
    let TwentyFiveITTax = 0;
    if (year === 2024) {
      ThirtyIT = GrossTotalIncome > 1500000 ? GrossTotalIncome - 1500000 : 0;
      ThirtyITTax = ThirtyIT * 0.3;
      TwentyIT =
        GrossTotalIncome > 1200000 ? GrossTotalIncome - 1200000 - ThirtyIT : 0;
      TwentyITTax = TwentyIT * 0.2;
      FifteenIT =
        GrossTotalIncome > 1000000
          ? GrossTotalIncome - 1000000 - ThirtyIT - TwentyIT
          : 0;
      FifteenITTax = FifteenIT * 0.15;
      TenIT =
        GrossTotalIncome > 700000
          ? GrossTotalIncome - 700000 - ThirtyIT - TwentyIT - FifteenIT
          : 0;
      TenITTax = TenIT * 0.1;
      FiveIT =
        GrossTotalIncome > 300000
          ? GrossTotalIncome - 300000 - ThirtyIT - TwentyIT - FifteenIT - TenIT
          : 0;
      FiveITTax = FiveIT * 0.05;
      CalculatedIT = Math.floor(
        ThirtyITTax + TwentyITTax + FifteenITTax + TenITTax + FiveITTax
      ); //H46
      const cal1 = GrossTotalIncome > 700000 ? GrossTotalIncome : 0; //G67
      const cal2 = GrossTotalIncome > 700000 ? cal1 - 700000 : 0; //G68
      const cal3 =
        GrossTotalIncome < 700001 ? Math.min(CalculatedIT, 25000) : 0; //G66
      const cal4 = GrossTotalIncome > 700000 ? CalculatedIT - cal2 : 0; //H67
      const cal5 = cal4 > 0 ? true : false; //H68
      const cal6 = cal5 ? cal4 : 0; //H66
      GrossRelief = cal3 + cal6; //J66
      IncomeTaxAfterRelief = Math.floor(CalculatedIT - GrossRelief);
      eduCess = Math.floor(IncomeTaxAfterRelief * 0.04);
      AddedEduCess = IncomeTaxAfterRelief + eduCess;
    } else if (year === 2025) {
      ThirtyIT = GrossTotalIncome > 2400000 ? GrossTotalIncome - 2400000 : 0;
      ThirtyITTax = ThirtyIT * 0.3;
      TwentyFiveIT =
        GrossTotalIncome > 2000000 ? GrossTotalIncome - 2000000 : 0;
      TwentyFiveITTax = TwentyFiveIT * 0.25;
      TwentyIT =
        GrossTotalIncome > 1600000
          ? GrossTotalIncome - 1600000 - ThirtyIT - TwentyFiveIT
          : 0;
      TwentyITTax = TwentyIT * 0.2;
      FifteenIT =
        GrossTotalIncome > 1200000
          ? GrossTotalIncome - 1200000 - ThirtyIT - TwentyFiveIT - TwentyIT
          : 0;
      FifteenITTax = FifteenIT * 0.15;
      TenIT =
        GrossTotalIncome > 800000
          ? GrossTotalIncome -
            800000 -
            ThirtyIT -
            TwentyFiveIT -
            TwentyIT -
            FifteenIT
          : 0;
      TenITTax = TenIT * 0.1;
      FiveIT =
        GrossTotalIncome > 400000
          ? GrossTotalIncome -
            400000 -
            ThirtyIT -
            TwentyFiveIT -
            TwentyIT -
            FifteenIT -
            TenIT
          : 0;
      FiveITTax = FiveIT * 0.05;
      CalculatedIT = Math.floor(
        ThirtyITTax +
          TwentyFiveITTax +
          TwentyITTax +
          FifteenITTax +
          TenITTax +
          FiveITTax
      ); //H46
      const cal1 = GrossTotalIncome > 1200000 ? GrossTotalIncome : 0; //G67
      const cal2 = GrossTotalIncome > 1200000 ? cal1 - 700000 : 0; //G68
      const cal3 =
        GrossTotalIncome < 1200001 ? Math.min(CalculatedIT, 60000) : 0; //G66
      const cal4 = GrossTotalIncome > 1200000 ? CalculatedIT - cal2 : 0; //H67
      const cal5 = cal4 > 0 ? true : false; //H68
      const cal6 = cal5 ? cal4 : 0; //H66
      GrossRelief = cal3 + cal6; //J66
      IncomeTaxAfterRelief = Math.floor(CalculatedIT - GrossRelief);
      eduCess = Math.floor(IncomeTaxAfterRelief * 0.04);
      AddedEduCess = IncomeTaxAfterRelief + eduCess;
    }
    setNewITDa({
      tname,
      school,
      pan,
      phone,
      desig,
      gender,
      thisYear,
      prevYear,
      nextYear,
      finYear,
      marchSalary,
      marchBasic,
      marchAddl,
      marchDA,
      marchHRA,
      marchMA,
      marchGross,
      marchGPF,
      marchGSLI,
      bonus,
      marchPTax,
      aprilSalary,
      aprilBasic,
      aprilAddl,
      aprilDA,
      aprilHRA,
      aprilMA,
      aprilGross,
      aprilGPF,
      aprilGSLI,
      aprilPTax,
      maySalary,
      mayBasic,
      mayAddl,
      mayDA,
      mayHRA,
      mayMA,
      mayGross,
      mayGPF,
      mayGSLI,
      mayPTax,
      juneSalary,
      juneBasic,
      juneAddl,
      juneDA,
      juneHRA,
      juneMA,
      juneGross,
      juneGPF,
      juneGSLI,
      junePTax,
      julySalary,
      julyBasic,
      julyAddl,
      julyDA,
      aprilIR,
      julyHRA,
      julyMA,
      julyGross,
      julyGPF,
      julyGSLI,
      julyPTax,
      augustSalary,
      augustBasic,
      augustAddl,
      augustDA,
      augustHRA,
      augustMA,
      augustGross,
      augustGPF,
      augustGSLI,
      augustPTax,
      septemberSalary,
      septemberBasic,
      septemberAddl,
      septemberDA,
      septemberHRA,
      septemberMA,
      septemberGross,
      septemberGPF,
      septemberGSLI,
      septemberPTax,
      octoberSalary,
      octoberBasic,
      octoberAddl,
      octoberDA,
      octoberHRA,
      octoberMA,
      octoberGross,
      octoberGPF,
      octoberGSLI,
      octoberPTax,
      novemberSalary,
      novemberBasic,
      novemberAddl,
      novemberDA,
      novemberHRA,
      novemberMA,
      novemberGross,
      novemberGPF,
      novemberGSLI,
      novemberPTax,
      decemberSalary,
      decemberBasic,
      decemberAddl,
      decemberDA,
      decemberHRA,
      decemberMA,
      decemberGross,
      decemberGPF,
      decemberGSLI,
      decemberPTax,
      januarySalary,
      januaryBasic,
      januaryAddl,
      januaryDA,
      januaryHRA,
      januaryMA,
      januaryGross,
      januaryGPF,
      januaryGSLI,
      januaryPTax,
      februarySalary,
      februaryBasic,
      februaryAddl,
      februaryDA,
      februaryHRA,
      februaryMA,
      februaryGross,
      februaryGPF,
      februaryGSLI,
      februaryPTax,
      grossBasic,
      grossAddl,
      grossDA,
      grossHRA,
      grossMA,
      GrossPAY,
      grossGPF,
      grossGSLI,
      grossPTax,
      AllGross,
      GrossTotalIncome,
      TotalRoundOffIncome,
      CalculatedIT,
      eduCess,
      AddedEduCess,
      BankInterest,
      tds,
      GrossRelief,
      IncomeTaxAfterRelief,
      ThirtyIT,
      ThirtyITTax,
      TwentyFiveIT,
      TwentyFiveITTax,
      TwentyIT,
      TwentyITTax,
      FifteenIT,
      FifteenITTax,
      TenIT,
      TenITTax,
      FiveIT,
      FiveITTax,
      marchNetpay,
      aprilNetpay,
      mayNetpay,
      juneNetpay,
      julyNetpay,
      augustNetpay,
      septemberNetpay,
      octoberNetpay,
      novemberNetpay,
      decemberNetpay,
      januaryNetpay,
      februaryNetpay,
      grossNetpay,
      TotalGross,
      GrossArrear,
      year,
    });
  };

  const getDeduction = async () => {
    if (deductionState.length === 0) {
      setLoader(true);
      const q = query(collection(firestore, "deduction"));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({
        // doc.data() is never undefined for query doc snapshots
        ...doc.data(),
        id: doc.id,
      }));
      setDeductionState(data);
      setLoader(false);
    }
  };
  const updateTeacherDeduction = async () => {
    const docRef = doc(firestore, "deduction", teacherDeduction.id);
    setLoader(true);
    await updateDoc(docRef, teacherDeduction)
      .then(() => {
        setLoader(false);
        const newData = deductionState.map((item) =>
          item.id === teacherDeduction.id ? teacherDeduction : item
        );
        setDeductionState(newData);
        toast.success("Deduction Updated Successfully!");
        setShowDeductionForm(false);
        setLoader(false);
      })
      .catch((e) => {
        setLoader(false);
        toast.error("Error Updating Deduction!");
        console.log(e);
      });
  };
  const getSalary = async (year) => {
    setLoader(true);
    const respronse = await axios.get(
      `https://raw.githubusercontent.com/amtawestwbtpta/salaryRemodified/main/Salary-${year}.json`
    );
    const data = respronse.data;
    const onlyWbtptaTeachers = data?.filter(
      (teacher) => teacher?.association === "WBTPTA"
    );
    setSalary(state === "admin" ? data : onlyWbtptaTeachers);
    setFilteredData(state === "admin" ? data : onlyWbtptaTeachers);
    setSalaryState(data);
    setLoader(false);
  };
  const getMonthlySalary = async (thisYear, prevYear) => {
    setLoader(false);
    const q1 = await readCSVFile(`january-${thisYear}`);
    const q2 = await readCSVFile(`february-${thisYear}`);
    const q3 = await readCSVFile(`march-${prevYear}`);
    const q4 = await readCSVFile(`april-${prevYear}`);
    const q5 = await readCSVFile(`may-${prevYear}`);
    const q6 = await readCSVFile(`june-${prevYear}`);
    const q7 = await readCSVFile(`july-${prevYear}`);
    const q8 = await readCSVFile(`august-${prevYear}`);
    const q9 = await readCSVFile(`september-${prevYear}`);
    const q10 = await readCSVFile(`october-${prevYear}`);
    const q11 = await readCSVFile(`november-${prevYear}`);
    const q12 = await readCSVFile(`december-${prevYear}`);

    setJanuary(q1);
    setFebruary(q2);
    setMarch(q3);
    setApril(q4);
    setMay(q5);
    setJune(q6);
    setJuly(q7);
    setAugust(q8);
    setSeptember(q9);
    setOctober(q10);
    setNovember(q11);
    setDecember(q12);
    setLoader(true);
    setIndSalaryState({
      march: q1,
      april: q2,
      may: q3,
      june: q4,
      july: q5,
      august: q6,
      september: q7,
      october: q8,
      november: q9,
      december: q10,
      january: q11,
      february: q12,
    });
    setLoader(false);
  };

  useEffect(() => {
    getDeduction();

    // eslint-disable-next-line
  }, [salary, filteredData]);

  return (
    <div className="container-fluid">
      {loader ? (
        <Loader />
      ) : showYearSelection ? (
        <div
          className="modal fade show"
          tabIndex="-1"
          role="dialog"
          style={{ display: "block" }}
          aria-modal="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">
                  Select Financial Year
                </h1>
              </div>
              <div className="modal-body">
                <div className="col-md-6 mx-auto noprint my-5">
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    defaultValue={""}
                    onChange={(e) => {
                      const selectedFinYear = e.target.value;
                      if (selectedFinYear !== "Select Financial Year") {
                        setFinYear(selectedFinYear);
                        setShowYearSelection(false);
                        const yearParts = selectedFinYear.split("-");
                        const startYear = parseInt(yearParts[0]);
                        const endYear = parseInt(yearParts[1]);
                        setThisYear(startYear + 1);
                        setPrevYear(startYear);
                        setNextYear(endYear + 1);

                        getMonthlySalary(startYear + 1, startYear);
                        getSalary(startYear);
                      } else {
                        toast.error("Please select a valid financial year.");
                      }
                    }}
                  >
                    <option>Select Financial Year</option>
                    {yearArray
                      .slice(0, yearArray.length - 1)
                      .map((year, index) => (
                        <option
                          value={`${yearArray[index]}-${yearArray[index + 1]}`}
                          key={index}
                        >
                          {yearArray[index]}-{yearArray[index + 1]}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
              <div className="modal-footer"></div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="my-3">
            <div className="noprint">
              <div className="buttons">
                <button
                  type="button"
                  className="btn btn-sm btn-primary m-2"
                  onClick={() => {
                    const fData = filteredData.filter(
                      (salary) => salary?.AllGross >= 500000
                    );
                    if (fData.length !== 0) {
                      setFilteredData(fData);
                    } else {
                      setFilteredData(
                        salary.filter((salary) => salary?.AllGross >= 500000)
                      );
                    }
                    setFilterClicked(true);
                  }}
                >
                  Above Five Lakh
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-success m-2"
                  onClick={() => {
                    const fData = filteredData.filter(
                      (salary) => salary?.AllGross <= 500000
                    );
                    if (fData.length !== 0) {
                      setFilteredData(fData);
                    } else {
                      setFilteredData(
                        salary.filter((salary) => salary?.AllGross <= 500000)
                      );
                    }
                    setFilterClicked(true);
                  }}
                >
                  Below Five Lakh
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-info m-2"
                  onClick={() => {
                    const fData = filteredData.filter(
                      (salary) => salary?.NetTax !== 0
                    );
                    if (fData.length !== 0) {
                      setFilteredData(fData);
                    } else {
                      setFilteredData(
                        salary.filter((salary) => salary?.NetTax !== 0)
                      );
                    }
                    setFilterClicked(true);
                  }}
                >
                  Taxable Teachers
                </button>
                {state === "admin" && (
                  <button
                    type="button"
                    className="btn btn-sm btn-warning m-2"
                    onClick={() => {
                      const fData = filteredData.filter(
                        (salary) => salary?.association === "WBTPTA"
                      );
                      if (fData.length !== 0) {
                        setFilteredData(fData);
                      } else {
                        setFilteredData(
                          salary.filter(
                            (salary) => salary?.association === "WBTPTA"
                          )
                        );
                      }
                      setFilterClicked(true);
                    }}
                  >
                    Only WBTPTA Teachers
                  </button>
                )}
                {salary.length !== filteredData.length && (
                  <button
                    type="button"
                    className="btn btn-sm btn-danger m-2"
                    onClick={() => {
                      setFilteredData(salary);
                      setFilterClicked(false);
                      setSearch("");
                      setSchSearch("");
                    }}
                  >
                    Clear Filter
                  </button>
                )}
              </div>
              <div>
                <button
                  type="button"
                  className="btn btn-sm btn-primary text-white font-weight-bold p-2 m-2 noprint rounded"
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      window.print();
                    }
                  }}
                >
                  Print
                </button>
              </div>
            </div>
            <div>
              <button
                type="button"
                className="btn btn-sm btn-dark text-white font-weight-bold p-2 m-2 noprint rounded"
                onClick={() => setShowYearSelection(true)}
              >
                Change Financial Year
              </button>
            </div>

            <h3 className="text-black">All Teacher IT Data</h3>
            <div>
              <div className="mx-auto">
                <div className="col-md-4 mx-auto noprint">
                  <div className="mb-2">
                    <input
                      type="text"
                      placeholder="Search by Teacher"
                      className="form-control"
                      value={search}
                      onChange={(e) => {
                        setSearch(e.target.value);
                        setFilteredData(
                          salary.filter((el) =>
                            el.tname
                              .toLowerCase()
                              .includes(e.target.value.toLowerCase())
                          )
                        );
                      }}
                    />
                  </div>
                  <div className="mb-2">
                    <input
                      type="text"
                      placeholder="Search by School"
                      className="form-control"
                      value={schSearch}
                      onChange={(e) => {
                        setSchSearch(e.target.value);
                        setFilteredData(
                          salary.filter((el) =>
                            el.school
                              .toLowerCase()
                              .includes(e.target.value.toLowerCase())
                          )
                        );
                      }}
                    />
                  </div>
                </div>
                <div className="mx-auto  d-flex flex-row justify-content-evenly flex-wrap">
                  {filteredData.map((row, index) => {
                    if (
                      row?.AllGross !== 0 &&
                      teachersState.filter((teacher) => teacher.id === row.id)
                        .length > 0
                    ) {
                      return (
                        <div
                          className="rounded shadow-sm text-center col-md-2 m-2 p-2 nobreak"
                          style={{ backgroundColor: "seashell" }}
                          key={index}
                        >
                          <p className="m-0 p-0">
                            SL:{" "}
                            {filterClicked
                              ? index + 1
                              : salary.findIndex((i) => i.id === row.id) + 1}
                          </p>
                          <p className="m-0 p-0">Teacher Name: {row.tname}</p>
                          <p className="m-0 p-0">School Name: {row.school}</p>
                          <p className="m-0 p-0">
                            Gross Salary: {`₹ ${IndianFormat(row?.AllGross)}`}
                          </p>
                          <p className="m-0 p-0">
                            Gross 80C:{" "}
                            {row?.limit80C !== 0
                              ? `₹ ${IndianFormat(row?.limit80C)}`
                              : "NIL"}
                          </p>
                          <p className="m-0 p-0">
                            Gross 80D:{" "}
                            {row?.Gross80D !== 0
                              ? `₹ ${IndianFormat(row?.Gross80D)}`
                              : "NIL"}
                          </p>
                          <p className="m-0 p-0">
                            Taxable Income:{" "}
                            {row?.TaxableIncome !== 0
                              ? `₹ ${IndianFormat(row?.TaxableIncome)}`
                              : "NIL"}
                          </p>
                          <p className="m-0 p-0">
                            Net Tax OLD:{" "}
                            {row?.NetTax !== 0
                              ? `₹ ${IndianFormat(row?.NetTax)}`
                              : "NIL"}
                          </p>
                          <p className="m-0 p-0">
                            Net Tax NEW:{" "}
                            {row?.AddedEduCess !== 0
                              ? `₹ ${IndianFormat(row?.AddedEduCess)}`
                              : "NIL"}
                          </p>
                          <div>
                            {state === "admin" && (
                              <button
                                type="button"
                                className="btn btn-sm btn-warning m-1 noprint"
                                onClick={() => {
                                  const fData = deductionState.filter(
                                    (d) => d.id === row?.id
                                  )[0];
                                  setTeacherDeduction(fData);
                                  setShowDeductionForm(true);
                                  setLoader(false);
                                }}
                              >
                                Update Deduction
                              </button>
                            )}
                            <button
                              type="button"
                              className="btn btn-sm btn-success m-1 noprint"
                              onClick={() => {
                                const fData = teachersState.filter(
                                  (teacher) => teacher?.id === row.id
                                )[0];
                                calCulateOldIT(fData);
                                setTeacherData(fData);
                                setShowOldModal(true);
                              }}
                            >
                              IT Old Regime
                            </button>
                            <button
                              type="button"
                              className="btn btn-sm btn-primary m-1 noprint"
                              onClick={() => {
                                const fData = teachersState.filter(
                                  (teacher) => teacher?.id === row.id
                                )[0];
                                calCulateNewIT(fData, prevYear);
                                setTeacherData(fData);
                                setShowNewModal(true);
                              }}
                            >
                              IT New Regime
                            </button>
                          </div>
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
            </div>
            <div className="my-3">
              {showDeductionForm && (
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
                        <h1
                          className="modal-title fs-5"
                          id="staticBackdropLabel"
                        >
                          Set Deduction Data of {teacherDeduction.tname}
                        </h1>
                        <button
                          type="button"
                          className="btn-close"
                          aria-label="Close"
                          onClick={() => {
                            setShowDeductionForm(false);
                          }}
                        ></button>
                      </div>
                      <div className="modal-body">
                        <div className="col-md-6 row mx-auto justify-content-center align-items-baseline">
                          <div className="mb-3 col-md-4">
                            <label htmlFor="date" className="form-label">
                              LIC
                            </label>
                            <input
                              type="number"
                              className="form-control col-md-4"
                              placeholder="LIC"
                              value={teacherDeduction.lic}
                              onChange={(e) => {
                                if (e.target.value) {
                                  setTeacherDeduction({
                                    ...teacherDeduction,
                                    lic: parseInt(e.target.value),
                                  });
                                } else {
                                  setTeacherDeduction({
                                    lic: "",
                                  });
                                }
                              }}
                            />
                          </div>
                          <div className="mb-3 col-md-4">
                            <label htmlFor="date" className="form-label">
                              PPF
                            </label>
                            <input
                              type="number"
                              className="form-control "
                              placeholder="PPF"
                              value={teacherDeduction.ppf}
                              onChange={(e) => {
                                if (e.target.value) {
                                  setTeacherDeduction({
                                    ...teacherDeduction,
                                    ppf: parseInt(e.target.value),
                                  });
                                } else {
                                  setTeacherDeduction({
                                    ppf: "",
                                  });
                                }
                              }}
                            />
                          </div>
                          <div className="mb-3 col-md-4">
                            <label htmlFor="date" className="form-label">
                              Homeloan Principal
                            </label>
                            <input
                              type="number"
                              className="form-control "
                              placeholder="Homeloan Principal"
                              value={teacherDeduction.hbLoanPrincipal}
                              onChange={(e) => {
                                if (e.target.value) {
                                  setTeacherDeduction({
                                    ...teacherDeduction,
                                    hbLoanPrincipal: parseInt(e.target.value),
                                  });
                                } else {
                                  setTeacherDeduction({
                                    hbLoanPrincipal: "",
                                  });
                                }
                              }}
                            />
                          </div>
                          <div className="mb-3 col-md-4">
                            <label htmlFor="date" className="form-label">
                              Homeloan Interest
                            </label>
                            <input
                              type="number"
                              className="form-control "
                              placeholder="Homeloan Interest"
                              value={teacherDeduction.hbLoanInterest}
                              onChange={(e) => {
                                if (e.target.value) {
                                  setTeacherDeduction({
                                    ...teacherDeduction,
                                    hbLoanInterest: parseInt(e.target.value),
                                  });
                                } else {
                                  setTeacherDeduction({
                                    hbLoanInterest: "",
                                  });
                                }
                              }}
                            />
                          </div>
                          <div className="mb-3 col-md-4">
                            <label htmlFor="date" className="form-label">
                              Mediclaim
                            </label>
                            <input
                              type="number"
                              className="form-control "
                              placeholder="Mediclaim"
                              value={teacherDeduction.mediclaim}
                              onChange={(e) => {
                                if (e.target.value) {
                                  setTeacherDeduction({
                                    ...teacherDeduction,
                                    mediclaim: parseInt(e.target.value),
                                  });
                                } else {
                                  setTeacherDeduction({
                                    mediclaim: "",
                                  });
                                }
                              }}
                            />
                          </div>
                          <div className="mb-3 col-md-4">
                            <label htmlFor="date" className="form-label">
                              Sukanya
                            </label>
                            <input
                              type="number"
                              className="form-control "
                              placeholder="Sukanya"
                              value={teacherDeduction.sukanya}
                              onChange={(e) => {
                                if (e.target.value) {
                                  setTeacherDeduction({
                                    ...teacherDeduction,
                                    sukanya: parseInt(e.target.value),
                                  });
                                } else {
                                  setTeacherDeduction({
                                    sukanya: "",
                                  });
                                }
                              }}
                            />
                          </div>
                          <div className="mb-3 col-md-4">
                            <label htmlFor="date" className="form-label">
                              NSC
                            </label>
                            <input
                              type="number"
                              className="form-control "
                              placeholder="NSC"
                              value={teacherDeduction.nsc}
                              onChange={(e) => {
                                if (e.target.value) {
                                  setTeacherDeduction({
                                    ...teacherDeduction,
                                    nsc: parseInt(e.target.value),
                                  });
                                } else {
                                  setTeacherDeduction({
                                    nsc: "",
                                  });
                                }
                              }}
                            />
                          </div>
                          <div className="mb-3 col-md-4">
                            <label htmlFor="date" className="form-label">
                              Interest on NSC
                            </label>
                            <input
                              type="number"
                              className="form-control "
                              placeholder="Interest on NSC"
                              value={teacherDeduction.nscInterest}
                              onChange={(e) => {
                                if (e.target.value) {
                                  setTeacherDeduction({
                                    ...teacherDeduction,
                                    nscInterest: parseInt(e.target.value),
                                  });
                                } else {
                                  setTeacherDeduction({
                                    nscInterest: "",
                                  });
                                }
                              }}
                            />
                          </div>
                          <div className="mb-3 col-md-4">
                            <label htmlFor="date" className="form-label">
                              Tution Fees
                            </label>
                            <input
                              type="number"
                              className="form-control "
                              placeholder="Tution Fees"
                              value={teacherDeduction.tutionFee}
                              onChange={(e) => {
                                if (e.target.value) {
                                  setTeacherDeduction({
                                    ...teacherDeduction,
                                    tutionFee: parseInt(e.target.value),
                                  });
                                } else {
                                  setTeacherDeduction({
                                    tutionFee: "",
                                  });
                                }
                              }}
                            />
                          </div>
                          <div className="mb-3 col-md-4">
                            <label htmlFor="date" className="form-label">
                              F.D. (5 Year)
                            </label>
                            <input
                              type="number"
                              className="form-control "
                              placeholder="Tution Fees"
                              value={teacherDeduction.fd}
                              onChange={(e) => {
                                if (e.target.value) {
                                  setTeacherDeduction({
                                    ...teacherDeduction,
                                    fd: parseInt(e.target.value),
                                  });
                                } else {
                                  setTeacherDeduction({
                                    fd: "",
                                  });
                                }
                              }}
                            />
                          </div>
                          <div className="mb-3 col-md-4">
                            <label htmlFor="date" className="form-label">
                              Disabled dependent Treatment
                            </label>
                            <input
                              type="number"
                              className="form-control "
                              placeholder="Disabled dependent Treatment"
                              value={teacherDeduction.handicapTreatment}
                              onChange={(e) => {
                                if (e.target.value) {
                                  setTeacherDeduction({
                                    ...teacherDeduction,
                                    handicapTreatment: parseInt(e.target.value),
                                  });
                                } else {
                                  setTeacherDeduction({
                                    handicapTreatment: "",
                                  });
                                }
                              }}
                            />
                          </div>
                          <div className="mb-3 col-md-4">
                            <label htmlFor="date" className="form-label">
                              Terminal Disease
                            </label>
                            <input
                              type="number"
                              className="form-control "
                              placeholder="terminal Disease"
                              value={teacherDeduction.terminalDisease}
                              onChange={(e) => {
                                if (e.target.value) {
                                  setTeacherDeduction({
                                    ...teacherDeduction,
                                    terminalDisease: parseInt(e.target.value),
                                  });
                                } else {
                                  setTeacherDeduction({
                                    terminalDisease: "",
                                  });
                                }
                              }}
                            />
                          </div>
                          <div className="mb-3 col-md-4">
                            <label htmlFor="date" className="form-label">
                              Education Loan Interest
                            </label>
                            <input
                              type="number"
                              className="form-control "
                              placeholder="Education Loan Interest"
                              value={teacherDeduction.educationLoan}
                              onChange={(e) => {
                                if (e.target.value) {
                                  setTeacherDeduction({
                                    ...teacherDeduction,
                                    educationLoan: parseInt(e.target.value),
                                  });
                                } else {
                                  setTeacherDeduction({
                                    educationLoan: "",
                                  });
                                }
                              }}
                            />
                          </div>
                          <div className="mb-3 col-md-4">
                            <label htmlFor="date" className="form-label">
                              Disabled Teacher
                            </label>
                            <input
                              type="number"
                              className="form-control "
                              placeholder="Disabled Teacher"
                              value={teacherDeduction.disability}
                              onChange={(e) => {
                                if (e.target.value) {
                                  setTeacherDeduction({
                                    ...teacherDeduction,
                                    disability: parseInt(e.target.value),
                                  });
                                } else {
                                  setTeacherDeduction({
                                    disability: "",
                                  });
                                }
                              }}
                            />
                          </div>
                          <div className="mb-3 col-md-4">
                            <label htmlFor="date" className="form-label">
                              Charity
                            </label>
                            <input
                              type="number"
                              className="form-control "
                              placeholder="Charity"
                              value={teacherDeduction.charity}
                              onChange={(e) => {
                                if (e.target.value) {
                                  setTeacherDeduction({
                                    ...teacherDeduction,
                                    charity: parseInt(e.target.value),
                                  });
                                } else {
                                  setTeacherDeduction({
                                    charity: "",
                                  });
                                }
                              }}
                            />
                          </div>
                          <div className="mb-3 col-md-4">
                            <label htmlFor="date" className="form-label">
                              ULIP /ELSS
                            </label>
                            <input
                              type="number"
                              className="form-control "
                              placeholder="ULIP /ELSS"
                              value={teacherDeduction.ulip}
                              onChange={(e) => {
                                if (e.target.value) {
                                  setTeacherDeduction({
                                    ...teacherDeduction,
                                    ulip: parseInt(e.target.value),
                                  });
                                } else {
                                  setTeacherDeduction({
                                    ulip: "",
                                  });
                                }
                              }}
                            />
                          </div>
                          <div className="mb-3 col-md-4">
                            <label htmlFor="date" className="form-label">
                              TDS Submitted
                            </label>
                            <input
                              type="number"
                              className="form-control "
                              placeholder="TDS Submitted"
                              value={teacherDeduction.tds}
                              onChange={(e) => {
                                if (e.target.value) {
                                  setTeacherDeduction({
                                    ...teacherDeduction,
                                    tds: parseInt(e.target.value),
                                  });
                                } else {
                                  setTeacherDeduction({
                                    tds: "",
                                  });
                                }
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-sm btn-success"
                          onClick={() => {
                            updateTeacherDeduction();
                          }}
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          className="btn btn-sm btn-danger"
                          onClick={() => {
                            setShowDeductionForm(false);
                          }}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="my-3">
              {showOldModal && (
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
                        <h1
                          className="modal-title fs-5"
                          id="staticBackdropLabel"
                        >
                          IT Statement OLD Regime of {TeacherData.tname}
                        </h1>
                        <button
                          type="button"
                          className="btn-close"
                          aria-label="Close"
                          onClick={() => {
                            setShowOldModal(false);
                            setShowForm16(false);
                          }}
                        ></button>
                      </div>
                      <div className="modal-body">
                        <div className="mx-auto noprint my-5">
                          <PDFDownloadLink
                            document={<IncomeTaxOld2025 data={oldITData} />}
                            fileName={`IT Statement of ${TeacherData.tname} OLD TAX REGIME 2025.pdf`}
                            style={{
                              textDecoration: "none",
                              padding: "10px",
                              color: "#fff",
                              backgroundColor: "purple",
                              border: "1px solid #4a4a4a",
                              width: "40%",
                              borderRadius: 10,
                            }}
                          >
                            {({ blob, url, loading, error }) =>
                              loading
                                ? "Please Wait..."
                                : "Download 2025 IT Statement"
                            }
                          </PDFDownloadLink>
                          <div className="my-5">
                            <p className="my-1">
                              Bank Interest : Rs.{" "}
                              {IndianFormat(oldITData?.BankInterest)}
                            </p>
                            <p className="my-1">
                              Income Tax : Rs.{" "}
                              {IndianFormat(oldITData?.AddedEduCess)}
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          className="btn btn-success m-2"
                          onClick={() => setShowForm16(!showForm16)}
                        >
                          {showForm16 ? "Hide Form 16" : "Show Form 16"}
                        </button>
                        {showForm16 && (
                          <div className="mx-auto noprint my-5">
                            <PDFDownloadLink
                              document={<Form16New data={oldITData} />}
                              fileName={`Form 16 of ${TeacherData.tname} of ${TeacherData.school}.pdf`}
                              style={{
                                textDecoration: "none",
                                padding: "10px",
                                color: "#fff",
                                backgroundColor: "navy",
                                border: "1px solid #4a4a4a",
                                width: "40%",
                                borderRadius: 10,
                              }}
                            >
                              {({ blob, url, loading, error }) =>
                                loading ? "Please Wait..." : "Download Form 16"
                              }
                            </PDFDownloadLink>
                          </div>
                        )}
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-sm btn-danger"
                          onClick={() => {
                            setShowOldModal(false);
                            setShowForm16(false);
                          }}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="my-3">
              {showNewModal && (
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
                        <h1
                          className="modal-title fs-5"
                          id="staticBackdropLabel"
                        >
                          IT Statement New Regime of {TeacherData.tname}
                        </h1>
                        <button
                          type="button"
                          className="btn-close"
                          aria-label="Close"
                          onClick={() => {
                            setShowNewModal(false);
                            setShowForm16New(false);
                          }}
                        ></button>
                      </div>
                      <div className="modal-body">
                        <div className="mx-auto noprint my-5">
                          <PDFDownloadLink
                            document={<IncomeTaxNew2025 data={newITData} />}
                            fileName={`IT Statement of ${TeacherData.tname} NEW TAX REGIME 2025.pdf`}
                            style={{
                              textDecoration: "none",
                              padding: "10px",
                              color: "#fff",
                              backgroundColor: "purple",
                              border: "1px solid #4a4a4a",
                              width: "40%",
                              borderRadius: 10,
                            }}
                          >
                            {({ blob, url, loading, error }) =>
                              loading
                                ? "Please Wait..."
                                : "Download 2025 IT Statement"
                            }
                          </PDFDownloadLink>
                          <div className="my-5">
                            <p className="my-1">
                              Bank Interest : Rs.{" "}
                              {IndianFormat(newITData?.BankInterest)}
                            </p>
                            <p className="my-1">
                              Income Tax : Rs.{" "}
                              {IndianFormat(newITData?.AddedEduCess)}
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          className="btn btn-success m-2"
                          onClick={() => setShowForm16New(!showForm16New)}
                        >
                          {showForm16New ? "Hide Form 16" : "Show Form 16"}
                        </button>
                        {showForm16New && (
                          <div className="mx-auto noprint my-5">
                            <PDFDownloadLink
                              document={<Form16NewRegime data={newITData} />}
                              fileName={`Form 16 of ${TeacherData.tname} of ${TeacherData.school}.pdf`}
                              style={{
                                textDecoration: "none",
                                padding: "10px",
                                color: "#fff",
                                backgroundColor: "navy",
                                border: "1px solid #4a4a4a",
                                width: "40%",
                                borderRadius: 10,
                              }}
                            >
                              {({ blob, url, loading, error }) =>
                                loading ? "Please Wait..." : "Download Form 16"
                              }
                            </PDFDownloadLink>
                          </div>
                        )}
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-sm btn-danger"
                          onClick={() => {
                            setShowNewModal(false);
                            setShowForm16New(false);
                          }}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <button
              type="button"
              className="btn btn-sm btn-primary text-white font-weight-bold p-2 m-2 noprint rounded"
              onClick={() => {
                if (typeof window !== "undefined") {
                  window.print();
                }
              }}
            >
              Print
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
