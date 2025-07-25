"use client";
import React, { Suspense, useEffect, useState } from "react";
import { useGlobalContext } from "../../context/Store";
import { useRouter, useSearchParams } from "next/navigation";
import {
  IndianFormat,
  ptaxCalc,
  randBetween,
  roundSo,
  CalculateIncomeTax,
  CalculateNewIncomeTax,
} from "../../modules/calculatefunctions";
import IncomeTaxNew from "../../pdfs/IncomeTaxNew";
import dynamic from "next/dynamic";
import { firestore } from "../../context/FirebaseContext";
import Loader from "../../components/Loader";
import axios from "axios";
import { collection, getDocs, query } from "firebase/firestore";
import IncomeTaxNew2025 from "../../pdfs/IncomeTaxNew2025";

export default function IncomeTaxNewSection() {
  const PDFDownloadLink = dynamic(
    async () =>
      await import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
    {
      ssr: false,
      loading: () => <p>Please Wait...</p>,
    }
  );
  const NAIMAGEURL =
    "https://raw.githubusercontent.com/amtawestwbtpta/awwbtptadata/main/NEW%20TAX%20NA.png";
  const router = useRouter();
  const searchParams = useSearchParams();
  const data = JSON.parse(searchParams.get("data"));
  const [loader, setLoader] = useState(false);
  const {
    deductionState,
    setDeductionState,
    indSalaryState,
    setIndSalaryState,
  } = useGlobalContext();
  const { id, tname, school, pan, phone, disability, desig } = data;
  const date = new Date();
  const month = date.getMonth() + 1;
  let thisYear, nextYear, prevYear;
  if (month < 4) {
    thisYear = date.getFullYear();
    nextYear = date.getFullYear() + 1;
    prevYear = date.getFullYear() - 1;
  } else {
    thisYear = date.getFullYear() - 1;
    nextYear = date.getFullYear();
    prevYear = date.getFullYear() - 2;
  }
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
  const finYear = `${thisYear}-${nextYear}`;
  const marchSalary = march.filter((el) => el.id === id)[0];
  const marchArrear = marchSalary?.arrear;
  const marchBasic = marchSalary?.basic;
  const marchAddl = marchSalary?.addl;
  const marchDA = Math.round(marchSalary?.basic * marchSalary?.daPercent);
  const marchHRA = Math.round(marchSalary?.basic * marchSalary?.hraPercent);
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
  const aprilHRA = Math.round(aprilSalary?.basic * aprilSalary?.hraPercent);
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
  const mayHRA = Math.round(maySalary?.basic * maySalary?.hraPercent);
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
  const juneHRA = Math.round(juneSalary?.basic * juneSalary?.hraPercent);
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
  const aprilIR = Math.round(aprilSalary?.basic * 0.04);
  const julyHRA = Math.round(julySalary?.basic * julySalary?.hraPercent);
  const julyMA = julySalary?.ma;
  const julyGross = julyBasic + julyDA + julyHRA + julyAddl + julyMA + aprilIR;
  const julyGPF = julySalary?.gpf;
  const julyGSLI = julySalary?.gsli;
  const julyPTax = disability === "YES" ? 0 : ptaxCalc(julyGross);
  const julyNetpay = julyGross - julyGPF - julyGSLI - julyPTax;
  const augustSalary = august.filter((el) => el.id === id)[0];
  const augustArrear = augustSalary?.arrear;
  const augustBasic = augustSalary?.basic;
  const augustAddl = augustSalary?.addl;
  const augustDA = Math.round(augustSalary?.basic * augustSalary?.daPercent);
  const augustHRA = Math.round(augustSalary?.basic * augustSalary?.hraPercent);
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
  const septemberHRA = Math.round(
    septemberSalary?.basic * septemberSalary?.hraPercent
  );
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
  const octoberDA = Math.round(octoberSalary?.basic * octoberSalary?.daPercent);
  const octoberHRA = Math.round(
    octoberSalary?.basic * octoberSalary?.hraPercent
  );
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
  const novemberHRA = Math.round(
    novemberSalary?.basic * novemberSalary?.hraPercent
  );
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
  const decemberHRA = Math.round(
    decemberSalary?.basic * decemberSalary?.hraPercent
  );
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
  const januaryDA = Math.round(januarySalary?.basic * januarySalary?.daPercent);
  const januaryHRA = Math.round(
    januarySalary?.basic * januarySalary?.hraPercent
  );
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
  const februaryHRA = Math.round(
    februarySalary?.basic * februarySalary?.hraPercent
  );
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
    februaryNetpay;
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
  const ThirtyIT = GrossTotalIncome > 1500000 ? GrossTotalIncome - 1500000 : 0;
  const ThirtyITTax = ThirtyIT * 0.3;
  const TwentyIT =
    GrossTotalIncome > 1200000 ? GrossTotalIncome - 1200000 - ThirtyIT : 0;
  const TwentyITTax = TwentyIT * 0.2;
  const FifteenIT =
    GrossTotalIncome > 1000000
      ? GrossTotalIncome - 1000000 - ThirtyIT - TwentyIT
      : 0;
  const FifteenITTax = FifteenIT * 0.15;
  const TenIT =
    GrossTotalIncome > 700000
      ? GrossTotalIncome - 700000 - ThirtyIT - TwentyIT - FifteenIT
      : 0;
  const TenITTax = TenIT * 0.1;
  const FiveIT =
    GrossTotalIncome > 300000
      ? GrossTotalIncome - 300000 - ThirtyIT - TwentyIT - FifteenIT - TenIT
      : 0;
  const FiveITTax = FiveIT * 0.05;
  const CalculatedIT = Math.floor(
    ThirtyITTax + TwentyITTax + FifteenITTax + TenITTax + FiveITTax
  ); //H46
  const cal1 = GrossTotalIncome > 700000 ? GrossTotalIncome : 0; //G67
  const cal2 = GrossTotalIncome > 700000 ? cal1 - 700000 : 0; //G68
  const cal3 = GrossTotalIncome < 700001 ? Math.min(CalculatedIT, 25000) : 0; //G66
  const cal4 = GrossTotalIncome > 700000 ? CalculatedIT - cal2 : 0; //H67
  const cal5 = cal4 > 0 ? true : false; //H68
  const cal6 = cal5 ? cal4 : 0; //H66
  const GrossRelief = cal3 + cal6; //J66
  const IncomeTaxAfterRelief = Math.floor(CalculatedIT - GrossRelief);
  const eduCess = Math.floor(IncomeTaxAfterRelief * 0.04);
  const AddedEduCess = IncomeTaxAfterRelief + eduCess;

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
    } else {
      setLoader(false);
    }
  };

  const getSalary = async () => {
    setLoader(true);
    const q1 = await axios.get(
      "https://raw.githubusercontent.com/amtawestwbtpta/salary/main/march.json"
    );
    const q2 = await axios.get(
      "https://raw.githubusercontent.com/amtawestwbtpta/salary/main/april.json"
    );
    const q3 = await axios.get(
      "https://raw.githubusercontent.com/amtawestwbtpta/salary/main/may.json"
    );
    const q4 = await axios.get(
      "https://raw.githubusercontent.com/amtawestwbtpta/salary/main/june.json"
    );
    const q5 = await axios.get(
      "https://raw.githubusercontent.com/amtawestwbtpta/salary/main/july.json"
    );
    const q6 = await axios.get(
      "https://raw.githubusercontent.com/amtawestwbtpta/salary/main/august.json"
    );
    const q7 = await axios.get(
      "https://raw.githubusercontent.com/amtawestwbtpta/salary/main/september.json"
    );
    const q8 = await axios.get(
      "https://raw.githubusercontent.com/amtawestwbtpta/salary/main/october.json"
    );
    const q9 = await axios.get(
      "https://raw.githubusercontent.com/amtawestwbtpta/salary/main/november.json"
    );
    const q10 = await axios.get(
      "https://raw.githubusercontent.com/amtawestwbtpta/salary/main/december.json"
    );
    const q11 = await axios.get(
      "https://raw.githubusercontent.com/amtawestwbtpta/salary/main/january.json"
    );
    const q12 = await axios.get(
      "https://raw.githubusercontent.com/amtawestwbtpta/salary/main/february.json"
    );
    setMarch(q1.data);
    setApril(q2.data);
    setMay(q3.data);
    setJune(q4.data);
    setJuly(q5.data);
    setAugust(q6.data);
    setSeptember(q7.data);
    setOctober(q8.data);
    setNovember(q9.data);
    setDecember(q10.data);
    setJanuary(q11.data);
    setFebruary(q12.data);
    setIndSalaryState({
      march: q1.data,
      april: q2.data,
      may: q3.data,
      june: q4.data,
      july: q5.data,
      august: q6.data,
      september: q7.data,
      october: q8.data,
      november: q9.data,
      december: q10.data,
      january: q11.data,
      february: q12.data,
    });
    setLoader(false);
  };

  useEffect(() => {
    getDeduction();
    if (indSalaryState.march.length === 0) {
      getSalary();
    } else {
      setMarch(indSalaryState.march);
      setApril(indSalaryState.april);
      setMay(indSalaryState.may);
      setJune(indSalaryState.june);
      setJuly(indSalaryState.july);
      setAugust(indSalaryState.august);
      setSeptember(indSalaryState.september);
      setOctober(indSalaryState.october);
      setNovember(indSalaryState.november);
      setDecember(indSalaryState.december);
      setJanuary(indSalaryState.january);
      setFebruary(indSalaryState.february);
    }
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    // eslint-disable-next-line
  }, [
    march,
    april,
    may,
    june,
    july,
    august,
    september,
    october,
    november,
    december,
    january,
    february,
  ]);
  return (
    <Suspense>
      <div className="container timesFont">
        {loader ? (
          <Loader />
        ) : (
          <div>
            <div className="mx-auto my-3 noprint">
              <h3>NEW REGIME</h3>
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
              <button
                type="button"
                className="btn btn-success text-white font-weight-bold m-2 p-2 rounded"
                onClick={() => {
                  router.push(`/incometaxOld?data=${JSON.stringify(data)}`);
                }}
              >
                Go To Old Regime
              </button>
            </div>

            <div className="mx-auto noprint mb-5">
              <button
                type="button"
                className="btn btn-info text-white font-weight-bold m-2 p-2 rounded"
                onClick={() => router.back()}
              >
                Go Back
              </button>
            </div>
            <div className="mx-auto noprint mb-5">
              <PDFDownloadLink
                document={
                  <IncomeTaxNew
                    data={{
                      tname,
                      school,
                      pan,
                      phone,
                      desig,
                      thisYear,
                      prevYear,
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
                      TwentyIT,
                      TwentyITTax,
                      FifteenIT,
                      FifteenITTax,
                      TenIT,
                      TenITTax,
                      FiveIT,
                      FiveITTax,
                    }}
                  />
                }
                fileName={`IT Statement of ${tname} NEW TAX REGIME.pdf`}
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
                  loading ? "Please Wait..." : "Download IT Statement"
                }
              </PDFDownloadLink>
            </div>
            <div className="mx-auto noprint mb-5">
              <PDFDownloadLink
                document={
                  <IncomeTaxNew2025
                    data={{
                      tname,
                      school,
                      pan,
                      phone,
                      desig,
                      thisYear,
                      prevYear,
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
                    }}
                  />
                }
                fileName={`IT Statement of ${tname} NEW TAX REGIME 2025.pdf`}
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
                  loading ? "Please Wait..." : "Download 2025 IT Statement"
                }
              </PDFDownloadLink>
            </div>
            <table
              className="nobreak"
              style={{ border: "2px solid", width: "100%", padding: 5 }}
            >
              <thead>
                <tr>
                  <th
                    colSpan={3}
                    suppressHydrationWarning
                    style={{ width: "100%", padding: 2 }}
                  >
                    <h4 className="algerian">
                      HOWRAH DISTRICT PRIMARY SCHOOL COUNCIL
                    </h4>
                  </th>
                </tr>
                <tr>
                  <th
                    colSpan={3}
                    suppressHydrationWarning
                    style={{ width: "100%", padding: 2 }}
                  >
                    <h5 className="algerian">DECLARATION OF INCOME TAX</h5>
                  </th>
                </tr>
                <tr style={{ borderBottomWidth: 2 }}>
                  <th
                    colSpan={3}
                    suppressHydrationWarning
                    style={{ width: "100%", padding: 2 }}
                  >
                    <h5 className="algerian">
                      FOR THE FINANCIAL YEAR {`${prevYear} - ${thisYear}`}{" "}
                      RELATION TO ASSESMENT YEAR {finYear}
                    </h5>
                  </th>
                </tr>
                <tr>
                  <th
                    colSpan={3}
                    suppressHydrationWarning
                    style={{ width: "100%", padding: 2 }}
                  >
                    <h5
                      className="timesfont"
                      style={{ textAlign: "left", padding: 2 }}
                    >
                      Name of the Teacher: <b>{tname}</b>
                    </h5>
                  </th>
                </tr>
                <tr>
                  <th
                    colSpan={3}
                    suppressHydrationWarning
                    style={{ width: "100%", padding: 2 }}
                  >
                    <div
                      className="d-flex flex-row p-2"
                      style={{
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      <h5
                        className="timesfont"
                        style={{ textAlign: "left", padding: 2 }}
                      >
                        Designation: <b>{desig}</b>
                      </h5>

                      <h5
                        className="timesfont"
                        style={{ textAlign: "left", padding: 2 }}
                      >
                        Circle: <b>AMTA WEST CIRCLE</b>
                      </h5>
                    </div>
                  </th>
                </tr>
                <tr style={{ borderBottomWidth: 2 }}>
                  <th
                    colSpan={3}
                    suppressHydrationWarning
                    style={{ width: "100%", padding: 2 }}
                  >
                    <div
                      className="d-flex flex-row p-2"
                      style={{
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      <h5
                        className="timesfont"
                        style={{ textAlign: "left", padding: 2 }}
                      >
                        School:
                      </h5>
                      <h5
                        className="timesfont"
                        style={{ textAlign: "left", padding: 2 }}
                      >
                        <b>{school}</b>
                      </h5>

                      <h5
                        className="timesfont"
                        style={{ textAlign: "left", padding: 2 }}
                      >
                        Mobile No: <b>{phone}</b>
                      </h5>
                    </div>
                  </th>
                </tr>
                <tr style={{ borderBottomWidth: 2 }}>
                  <th
                    suppressHydrationWarning
                    style={{ width: "70%", padding: 0, borderRightWidth: 2 }}
                  >
                    <div className="d-flex flex-row justify-content-end ">
                      <table
                        style={{ borderWidth: 0, width: "70%", padding: 5 }}
                      >
                        <thead>
                          <tr>
                            <th
                              style={{
                                width: "30%",
                                textAlign: "left",
                                padding: 2,
                              }}
                              suppressHydrationWarning
                            >
                              PAN
                            </th>
                            <th
                              style={{
                                borderLeftWidth: 2,
                                borderRightWidth: 2,
                              }}
                            >
                              {pan?.slice(0, 1)}
                            </th>
                            <th style={{ borderRightWidth: 2 }}>
                              {pan?.slice(1, 2)}
                            </th>
                            <th style={{ borderRightWidth: 2 }}>
                              {pan?.slice(2, 3)}
                            </th>
                            <th style={{ borderRightWidth: 2 }}>
                              {pan?.slice(3, 4)}
                            </th>
                            <th style={{ borderRightWidth: 2 }}>
                              {pan?.slice(4, 5)}
                            </th>
                            <th style={{ borderRightWidth: 2 }}>
                              {pan?.slice(5, 6)}
                            </th>
                            <th style={{ borderRightWidth: 2 }}>
                              {pan?.slice(6, 7)}
                            </th>
                            <th style={{ borderRightWidth: 2 }}>
                              {pan?.slice(7, 8)}
                            </th>
                            <th style={{ borderRightWidth: 2 }}>
                              {pan?.slice(8, 9)}
                            </th>
                            <th style={{ borderRightWidth: 0 }}>
                              {pan?.slice(9, 10)}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th></th>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </th>
                  <th style={{ borderRightWidth: 2 }}></th>
                  <th
                    rowSpan={5}
                    style={{ borderRightWidth: 0, width: "20%" }}
                  ></th>
                </tr>
                <tr style={{ borderBottomWidth: 2 }}>
                  <th
                    style={{
                      borderRightWidth: 2,
                      textAlign: "left",
                      padding: 2,
                    }}
                  >
                    1. GROSS SLARY INCOME (Salary +Arrear Salary +Bonus)
                  </th>
                  <th style={{ borderRightWidth: 2 }}>
                    Rs. {IndianFormat(AllGross)}
                  </th>
                </tr>
                <tr
                  style={{ borderBottomWidth: 2 }}
                  suppressHydrationWarning={true}
                >
                  <th
                    style={{
                      borderRightWidth: 2,
                      textAlign: "left",
                      padding: 2,
                    }}
                  >
                    2. Less: Exemption of HRA under Sec 10(13A) the least of the
                    following
                  </th>
                  <th style={{ borderRightWidth: 2 }}></th>
                  {/* <div
                    style={{
                      width: 120,
                      height: 2,
                      backgroundColor: "black",
                      transform: "rotate(-60deg)",
                      marginLeft: -235,
                      marginTop: 50,
                      position: "absolute",
                    }}
                  ></div> */}
                </tr>

                <tr style={{ borderBottomWidth: 2 }}>
                  <th
                    style={{
                      borderRightWidth: 2,
                      textAlign: "left",
                      padding: 2,
                    }}
                  >
                    a) Actual HRA Received
                  </th>
                  <th style={{ borderRightWidth: 2 }}></th>
                </tr>
                <tr style={{ borderBottomWidth: 2 }}>
                  <th
                    style={{
                      borderRightWidth: 2,
                      textAlign: "left",
                      padding: 2,
                    }}
                  >
                    b) Rent Paid in excess of 10% of Salary (Basic + DA)
                  </th>
                  <th style={{ borderRightWidth: 2 }}></th>
                </tr>
                <tr style={{ borderBottomWidth: 2 }}>
                  <th
                    style={{
                      borderRightWidth: 2,
                      textAlign: "left",
                      padding: 2,
                    }}
                  >
                    c) 40% of Salary (Basic + DA)
                  </th>
                  <th style={{ borderRightWidth: 2 }}></th>
                  <th style={{ borderRightWidth: 2 }}>
                    Rs. {IndianFormat(AllGross)}
                  </th>
                </tr>
                <tr style={{ borderBottomWidth: 2 }}>
                  <th
                    colSpan={2}
                    style={{
                      borderRightWidth: 2,
                      textAlign: "left",
                      padding: 2,
                    }}
                  >
                    3. Less: P. Tax under section 16(iii)
                  </th>
                  <th>NIL</th>
                </tr>
                <tr style={{ borderBottomWidth: 2 }}>
                  <th
                    colSpan={2}
                    style={{
                      borderRightWidth: 2,
                      textAlign: "left",
                      padding: 2,
                    }}
                  >
                    4. Less: Standard Deduction for Salaried & Pensioner
                    (Rs.75,000)
                  </th>
                  <th>Rs. {IndianFormat(75000)}</th>
                </tr>
                <tr style={{ borderBottomWidth: 2 }}>
                  <th
                    colSpan={2}
                    style={{
                      borderRightWidth: 2,
                      textAlign: "left",
                      padding: 2,
                    }}
                  >
                    5. Income chargeable under the head Salaries (1-2-3-4)
                  </th>
                  <th>Rs. {IndianFormat(AllGross - 75000)}</th>
                </tr>
                <tr style={{ borderBottomWidth: 2 }}>
                  <th
                    colSpan={2}
                    style={{
                      borderRightWidth: 2,
                      textAlign: "left",
                      padding: 2,
                    }}
                  >
                    6. Income under any head other than salaries (From Schedule
                    OS)
                  </th>
                  <th>Rs. {IndianFormat(BankInterest)}</th>
                </tr>
                <tr style={{ borderBottomWidth: 2 }}>
                  <th
                    colSpan={2}
                    style={{
                      borderRightWidth: 2,
                      textAlign: "left",
                      padding: 2,
                    }}
                  >
                    7. Interest on House Building Loan
                  </th>
                  <th>NOT APPLICABLE</th>
                </tr>
                <tr style={{ borderBottomWidth: 2 }}>
                  <th
                    colSpan={2}
                    style={{
                      borderRightWidth: 2,
                      textAlign: "left",
                      padding: 2,
                    }}
                  >
                    8. Gross Total Income [(5+6)-7)
                  </th>
                  <th>Rs. {IndianFormat(GrossTotalIncome)}</th>
                </tr>
                <tr style={{ borderBottomWidth: 2 }}>
                  <th
                    colSpan={2}
                    style={{
                      borderRightWidth: 2,
                      textAlign: "left",
                      padding: 2,
                    }}
                  >
                    9. Deduction under Chapter VIA (From Schedule-VIA)
                    <br />
                    Aggregate amount of deductions admissible U /S 80C, 80CCC
                    and 80CCD(I) (Limited to Rs.1,50,000/-)
                  </th>
                  <th>NOT APPLICABLE</th>
                </tr>
                <tr style={{ borderBottomWidth: 2 }}>
                  <th
                    colSpan={2}
                    style={{
                      borderRightWidth: 2,
                      textAlign: "left",
                      padding: 2,
                    }}
                  >
                    10. Amount deduction under section 80CCD(B)
                  </th>
                  <th>NOT APPLICABLE</th>
                </tr>
                <tr style={{ borderBottomWidth: 2 }}>
                  <th
                    colSpan={2}
                    style={{
                      borderRightWidth: 2,
                      textAlign: "left",
                      padding: 2,
                    }}
                  >
                    11. Amount deduction under any other provision(s) Chapter
                    VI-A (From Schedule- Other VIA)
                  </th>
                  <th>Rs. {IndianFormat(BankInterest)}</th>
                </tr>
                <tr style={{ borderBottomWidth: 2 }}>
                  <th
                    colSpan={2}
                    style={{
                      borderRightWidth: 2,
                      textAlign: "left",
                      padding: 2,
                    }}
                  >
                    12. Total Income (8-9-10-11)
                  </th>
                  <th>Rs. {IndianFormat(GrossTotalIncome)}</th>
                </tr>
                <tr style={{ borderBottomWidth: 2 }}>
                  <th
                    colSpan={2}
                    style={{
                      borderRightWidth: 2,
                      textAlign: "left",
                      padding: 2,
                    }}
                  >
                    13. Rounding Off of Total Income U/S288A (SI No 12) (If the
                    last figure of Total Income is five of more, the amount
                    shall be increased to the next higher amount which is a
                    multiple of ten)
                  </th>
                  <th>Rs. {IndianFormat(TotalRoundOffIncome)}</th>
                </tr>
                <tr style={{ borderBottomWidth: 2 }}>
                  <th
                    colSpan={2}
                    style={{
                      borderRightWidth: 2,
                      textAlign: "left",
                      padding: 2,
                    }}
                  >
                    14. Income Tax on Total Income
                  </th>
                  <th>Rs. {IndianFormat(CalculatedIT)}</th>
                </tr>
                <tr style={{ borderBottomWidth: 2 }}>
                  <th
                    colSpan={2}
                    style={{
                      borderRightWidth: 2,
                      textAlign: "left",
                      padding: 2,
                    }}
                  >
                    15. Less: Rebate U/S 87A
                  </th>
                  <th>
                    {GrossRelief > 0
                      ? `Rs. ${IndianFormat(GrossRelief)}`
                      : "NIL"}
                  </th>
                </tr>
                <tr style={{ borderBottomWidth: 2 }}>
                  <th
                    colSpan={2}
                    style={{
                      borderRightWidth: 2,
                      textAlign: "left",
                      padding: 2,
                    }}
                  >
                    16. Total Tax Payable (14-15)
                  </th>
                  <th>
                    {IncomeTaxAfterRelief > 0
                      ? `Rs. ${IndianFormat(IncomeTaxAfterRelief)}`
                      : "NIL"}
                  </th>
                </tr>
                <tr style={{ borderBottomWidth: 2 }}>
                  <th
                    colSpan={2}
                    style={{
                      borderRightWidth: 2,
                      textAlign: "left",
                      padding: 2,
                    }}
                  >
                    17. Add: Health & Education Cess (4% of 16)
                  </th>
                  <th>
                    {IncomeTaxAfterRelief > 0
                      ? `Rs. ${IndianFormat(eduCess)}`
                      : "NIL"}
                  </th>
                </tr>
                <tr style={{ borderBottomWidth: 2 }}>
                  <th
                    colSpan={2}
                    style={{
                      borderRightWidth: 2,
                      textAlign: "left",
                      padding: 2,
                    }}
                  >
                    18. Income Tax Relief U/S 89(When salary, etc. is paid in
                    arrear of advance)
                  </th>
                  <th>NIL</th>
                </tr>
                <tr style={{ borderBottomWidth: 2 }}>
                  <th
                    colSpan={2}
                    style={{
                      borderRightWidth: 2,
                      textAlign: "left",
                      padding: 2,
                    }}
                  >
                    19. Net Tax Payable [(16+17)-18]
                  </th>
                  <th>
                    {AddedEduCess > 0
                      ? `Rs. ${IndianFormat(AddedEduCess)}`
                      : "NIL"}
                  </th>
                </tr>
                <tr style={{ borderBottomWidth: 2 }}>
                  <th
                    colSpan={2}
                    style={{
                      borderRightWidth: 2,
                      textAlign: "left",
                      padding: 2,
                    }}
                  >
                    20. Total amount of Tax Deducted at Source (TDS) upto Jan
                    2023
                  </th>
                  <th>
                    {AddedEduCess > 0
                      ? tds !== 0
                        ? `Rs. ${IndianFormat(tds)}`
                        : "NIL"
                      : "N/A"}
                  </th>
                </tr>
                <tr style={{ borderBottomWidth: 2 }}>
                  <th
                    colSpan={2}
                    style={{
                      borderRightWidth: 2,
                      textAlign: "left",
                      padding: 2,
                    }}
                  >
                    21. TDS Payable in Feb 2023/ Excess Tax deduction
                  </th>
                  <th>
                    {AddedEduCess > 0
                      ? `Rs. ${IndianFormat(AddedEduCess - tds)}`
                      : "N/A"}
                  </th>
                </tr>
                <tr style={{ borderBottomWidth: 2 }}>
                  <th
                    colSpan={3}
                    style={{
                      padding: 2,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    suppressHydrationWarning
                  >
                    <div
                      style={{
                        border: "3px solid black",
                        width: 300,
                        height: 40,
                        marginLeft: 50,
                        marginTop: 60,
                        marginBottom: 20,
                      }}
                    >
                      <h4>Incumbent’s Signature</h4>
                    </div>
                  </th>
                </tr>
                <tr style={{ borderBottomWidth: 2 }}>
                  <th
                    colSpan={3}
                    style={{
                      padding: 2,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    suppressHydrationWarning
                  >
                    <h4>
                      Short Tax deduction from salary will not be allowed as per
                      I.T. Rules 1961
                    </h4>
                  </th>
                </tr>
                <tr style={{ borderBottomWidth: 2 }}>
                  <th
                    colSpan={3}
                    style={{
                      padding: 2,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    suppressHydrationWarning
                  >
                    <h4>
                      HRA exemption will not be allowed without proper receipt
                      with PAN of House owner
                    </h4>
                  </th>
                </tr>
                <tr style={{ borderBottomWidth: 2 }}>
                  <th
                    colSpan={3}
                    style={{
                      padding: 2,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    suppressHydrationWarning
                  >
                    <h4>
                      Without supporting documents and deduction will be allowed
                    </h4>
                  </th>
                </tr>
                <tr>
                  <th
                    colSpan={3}
                    style={{
                      padding: 2,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    suppressHydrationWarning
                  >
                    <h4>Last Date of submission 11/01/{thisYear}</h4>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th></th>
                </tr>
              </tbody>
            </table>
            <div className="my-5 nobreak">
              <div
                style={{
                  border: "2px solid",
                  width: "100%",
                  marginTop: 10,
                  marginBottom: 10,
                }}
              >
                <h5 className="fw-bold">
                  DISTRICT PRIMARY SCHOOL COUNCIL, HOWRAH
                </h5>
              </div>
              <table style={{ border: "1px solid", width: "100%", padding: 5 }}>
                <thead>
                  <tr>
                    <th
                      suppressHydrationWarning
                      style={{
                        borderRight: "1px solid",
                        padding: 5,
                        width: "20%",
                      }}
                    >
                      <h5 className="fw-bold">Name of the Teacher</h5>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{
                        borderRight: "1px solid",
                        padding: 5,
                        width: "50%",
                      }}
                    >
                      <h5 className="fw-bold text-start">{tname}</h5>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{
                        borderRight: "1px solid",
                        padding: 5,
                        width: "10%",
                      }}
                    >
                      <h5 className="fw-bold">PAN</h5>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ padding: 5, width: "20%" }}
                    >
                      <h5 className="fw-bold">{pan}</h5>
                    </th>
                  </tr>
                </thead>
                <tbody></tbody>
              </table>
              <div
                style={{
                  border: "2px solid",
                  width: "100%",
                  marginTop: 10,
                  marginBottom: 10,
                }}
              >
                <h5 className="fw-bold">
                  Schedule - OS (Income from Other Sources)
                </h5>
              </div>
              <table style={{ border: "1px solid", width: "100%", padding: 5 }}>
                <thead>
                  <tr style={{ border: "2px solid" }}>
                    <th
                      suppressHydrationWarning
                      style={{ borderRight: "1px solid", padding: 2 }}
                    >
                      a)
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{
                        borderRight: "1px solid",
                        padding: 2,
                        textAlign: "left",
                      }}
                    >
                      Interest from Bank (SB)
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ padding: 2, width: "20%" }}
                    >
                      Rs. {IndianFormat(BankInterest)}
                    </th>
                  </tr>
                  <tr style={{ border: "2px solid" }}>
                    <th
                      suppressHydrationWarning
                      style={{ borderRight: "1px solid", padding: 2 }}
                    >
                      b)
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{
                        borderRight: "1px solid",
                        padding: 2,
                        textAlign: "left",
                      }}
                    >
                      Interest from Bank (FD)
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ padding: 2, width: "20%" }}
                    >
                      NIL
                    </th>
                  </tr>
                  <tr style={{ border: "2px solid" }}>
                    <th
                      suppressHydrationWarning
                      style={{ borderRight: "1px solid", padding: 2 }}
                    >
                      c)
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{
                        borderRight: "1px solid",
                        padding: 2,
                        textAlign: "left",
                      }}
                    >
                      Interest from NSC
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ padding: 2, width: "20%" }}
                    >
                      NIL
                    </th>
                  </tr>
                  <tr style={{ border: "2px solid" }}>
                    <th
                      suppressHydrationWarning
                      style={{ borderRight: "1px solid", padding: 2 }}
                    >
                      d)
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{
                        borderRight: "1px solid",
                        padding: 2,
                        textAlign: "left",
                      }}
                    >
                      Interest from Bond
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ padding: 2, width: "20%" }}
                    >
                      NIL
                    </th>
                  </tr>
                  <tr style={{ border: "2px solid" }}>
                    <th
                      suppressHydrationWarning
                      style={{ borderRight: "1px solid", padding: 2 }}
                    >
                      e)
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{
                        borderRight: "1px solid",
                        padding: 2,
                        textAlign: "left",
                      }}
                    >
                      Divident from Share
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ padding: 2, width: "20%" }}
                    >
                      NIL
                    </th>
                  </tr>
                  <tr style={{ border: "2px solid" }}>
                    <th
                      suppressHydrationWarning
                      style={{ borderRight: "1px solid", padding: 2 }}
                    >
                      f)
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{
                        borderRight: "1px solid",
                        padding: 2,
                        textAlign: "left",
                      }}
                    ></th>
                    <th
                      suppressHydrationWarning
                      style={{ padding: 2, width: "20%" }}
                    ></th>
                  </tr>
                  <tr style={{ border: "2px solid" }}>
                    <th
                      suppressHydrationWarning
                      style={{ borderRight: "1px solid", padding: 2 }}
                    >
                      g)
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{
                        borderRight: "1px solid",
                        padding: 2,
                        textAlign: "left",
                      }}
                    ></th>
                    <th
                      suppressHydrationWarning
                      style={{ padding: 2, width: "20%" }}
                    ></th>
                  </tr>
                  <tr style={{ border: "2px solid" }}>
                    <th
                      suppressHydrationWarning
                      style={{ borderRight: "1px solid", padding: 2 }}
                    >
                      h)
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{
                        borderRight: "1px solid",
                        padding: 2,
                        textAlign: "left",
                      }}
                    >
                      Family Pension:
                    </th>
                    <th suppressHydrationWarning style={{ width: "20%" }}>
                      NIL
                    </th>
                  </tr>
                  <tr style={{ border: "2px solid" }}>
                    <th
                      suppressHydrationWarning
                      style={{ borderRight: "1px solid" }}
                      colSpan={2}
                    >
                      Income under any head other than the head "Salaries"
                    </th>

                    <th suppressHydrationWarning style={{ width: "20%" }}>
                      Rs. {IndianFormat(BankInterest)}
                    </th>
                  </tr>
                </thead>
                <tbody></tbody>
              </table>
              <div
                style={{
                  border: "2px solid",
                  width: "100%",
                  marginTop: 10,
                }}
              >
                <h5 className="fw-bold">
                  Schedule- VIA : (Deductions under Chapter VIA)
                </h5>
              </div>
              <div
                style={{
                  border: "2px solid",
                  width: "100%",

                  marginBottom: 10,
                }}
              >
                <h5 className="fw-bold">
                  (U/S80C to 80U) Requisite paper, copies of policies,
                  Certificate etc. to be enclose)
                </h5>
              </div>

              <table style={{ border: "1px solid", width: "100%", padding: 5 }}>
                <thead>
                  <tr style={{ border: "2px solid" }}>
                    <th
                      suppressHydrationWarning
                      style={{ borderRight: "1px solid", padding: 2 }}
                      colSpan={2}
                    >
                      <h5
                        className="fw-bold text-start"
                        style={{ paddingLeft: 20 }}
                      >
                        A) U/S 80 C:
                      </h5>
                    </th>
                  </tr>
                  <tr style={{ border: "2px solid" }}>
                    <th
                      suppressHydrationWarning
                      className="text-start"
                      style={{ borderRight: "1px solid", padding: 2 }}
                    >
                      a) Contribution of GPF
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ padding: 2, width: "20%" }}
                    >
                      NOT APPLICABLE
                    </th>
                  </tr>
                  <tr style={{ border: "2px solid" }}>
                    <th
                      suppressHydrationWarning
                      className="text-start"
                      style={{ borderRight: "1px solid", padding: 2 }}
                    >
                      b) Deposit in Sukanya Samriddhi Account
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ padding: 2, width: "20%" }}
                    >
                      NOT APPLICABLE
                    </th>
                  </tr>
                  <tr style={{ border: "2px solid" }}>
                    <th
                      suppressHydrationWarning
                      className="text-start"
                      style={{ borderRight: "1px solid", padding: 2 }}
                    >
                      c) NSC / Others
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ padding: 2, width: "20%" }}
                    >
                      NOT APPLICABLE
                    </th>
                  </tr>
                  <tr style={{ border: "2px solid" }}>
                    <th
                      suppressHydrationWarning
                      className="text-start"
                      style={{ borderRight: "1px solid", padding: 2 }}
                    >
                      d) ULIP /ELSS
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ padding: 2, width: "20%" }}
                    >
                      NOT APPLICABLE
                    </th>
                  </tr>
                  <tr style={{ border: "2px solid" }}>
                    <th
                      suppressHydrationWarning
                      className="text-start"
                      style={{ borderRight: "1px solid", padding: 2 }}
                    >
                      e) Repayment of Housing Loan (Principal)
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ padding: 2, width: "20%" }}
                    >
                      NOT APPLICABLE
                    </th>
                  </tr>
                  <tr style={{ border: "2px solid" }}>
                    <th
                      suppressHydrationWarning
                      className="text-start"
                      style={{ borderRight: "1px solid", padding: 2 }}
                    >
                      f) Interest on NSC (upto 5th Year)
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ padding: 2, width: "20%" }}
                    >
                      NOT APPLICABLE
                    </th>
                  </tr>
                  <tr style={{ border: "2px solid" }}>
                    <th
                      suppressHydrationWarning
                      className="text-start"
                      style={{ borderRight: "1px solid", padding: 2 }}
                    >
                      g)PPF
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ padding: 2, width: "20%" }}
                    >
                      NOT APPLICABLE
                    </th>
                  </tr>
                  <tr style={{ border: "2px solid" }}>
                    <th
                      suppressHydrationWarning
                      className="text-start"
                      style={{ borderRight: "1px solid", padding: 2 }}
                    >
                      h) LIC Premium
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ padding: 2, width: "20%" }}
                    >
                      NOT APPLICABLE
                    </th>
                  </tr>
                  <tr style={{ border: "2px solid" }}>
                    <th
                      suppressHydrationWarning
                      className="text-start"
                      style={{ borderRight: "1px solid", padding: 2 }}
                    >
                      i) UC Premium
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ padding: 2, width: "20%" }}
                    >
                      NOT APPLICABLE
                    </th>
                  </tr>
                  <tr style={{ border: "2px solid" }}>
                    <th
                      suppressHydrationWarning
                      className="text-start"
                      style={{ borderRight: "1px solid", padding: 2 }}
                    >
                      j) Tution Fees
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ padding: 2, width: "20%" }}
                    >
                      NOT APPLICABLE
                    </th>
                  </tr>
                  <tr style={{ border: "2px solid" }}>
                    <th
                      suppressHydrationWarning
                      className="text-start"
                      style={{ borderRight: "1px solid", padding: 2 }}
                    >
                      k) F.D.in Sch. Bank not less than 5 years
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ padding: 2, width: "20%" }}
                    >
                      NOT APPLICABLE
                    </th>
                  </tr>
                  <tr style={{ border: "2px solid" }}>
                    <th
                      suppressHydrationWarning
                      className="text-start"
                      style={{ borderRight: "1px solid", padding: 2 }}
                    >
                      l) GSLI
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ padding: 2, width: "20%" }}
                    >
                      NOT APPLICABLE
                    </th>
                  </tr>
                  <tr style={{ border: "2px solid" }}>
                    <th
                      suppressHydrationWarning
                      style={{ borderRight: "1px solid", padding: 2 }}
                    >
                      <h5 className="fw-bold">
                        Total Deduction under A & B above (Limited to Rs.
                        1,50,000/-)
                      </h5>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ padding: 2, width: "20%" }}
                    >
                      <h5 className="fw-bold">NOT APPLICABLE</h5>
                    </th>
                  </tr>
                </thead>
                <tbody></tbody>
              </table>
              <table
                style={{
                  border: "1px solid",
                  width: "100%",
                  padding: 5,
                  marginTop: 10,
                }}
              >
                <thead>
                  <tr style={{ border: "2px solid" }}>
                    <th
                      suppressHydrationWarning
                      style={{ borderRight: "1px solid", padding: 2 }}
                      colSpan={2}
                    >
                      <h5
                        className="fw-bold text-start"
                        style={{ paddingLeft: 20 }}
                      >
                        Schedule - Other VIA
                      </h5>
                    </th>
                  </tr>
                  <tr style={{ border: "2px solid" }}>
                    <th
                      suppressHydrationWarning
                      className="text-start"
                      style={{ borderRight: "1px solid", padding: 2 }}
                    >
                      A) U/S 80CCD (18) : New Pension Scheme (Limit upto
                      Rs.50,000/-)
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ padding: 2, width: "20%" }}
                    >
                      NOT APPLICABLE
                    </th>
                  </tr>
                  <tr style={{ border: "2px solid" }}>
                    <th
                      suppressHydrationWarning
                      className="text-start"
                      style={{ borderRight: "1px solid", padding: 2 }}
                    >
                      B) U/S 80D: Premium on Med. Insurance (Mediclaim) Policy
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ padding: 2, width: "20%" }}
                    >
                      NOT APPLICABLE
                    </th>
                  </tr>
                  <tr style={{ border: "2px solid" }}>
                    <th
                      suppressHydrationWarning
                      className="text-start"
                      style={{ borderRight: "1px solid", padding: 2 }}
                    >
                      C) U/S 80DD: Maintenance & treatment of a dependent
                      disabled
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ padding: 2, width: "20%" }}
                    >
                      NOT APPLICABLE
                    </th>
                  </tr>
                  <tr style={{ border: "2px solid" }}>
                    <th
                      suppressHydrationWarning
                      className="text-start"
                      style={{ borderRight: "1px solid", padding: 2 }}
                    >
                      D) U/S 80DDB : Medical treatment of dependent person with
                      terminal Disease
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ padding: 2, width: "20%" }}
                    >
                      NOT APPLICABLE
                    </th>
                  </tr>
                  <tr style={{ border: "2px solid" }}>
                    <th
                      suppressHydrationWarning
                      className="text-start"
                      style={{ borderRight: "1px solid", padding: 2 }}
                    >
                      E) U/S 80E : Repayment of Interest of paid on Education
                      Loan
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ padding: 2, width: "20%" }}
                    >
                      NOT APPLICABLE
                    </th>
                  </tr>
                  <tr style={{ border: "2px solid" }}>
                    <th
                      suppressHydrationWarning
                      className="text-start"
                      style={{ borderRight: "1px solid", padding: 2 }}
                    >
                      F) U/S 80U : Tax-payee with disability
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ padding: 2, width: "20%" }}
                    >
                      NOT APPLICABLE
                    </th>
                  </tr>
                  <tr style={{ border: "2px solid" }}>
                    <th
                      suppressHydrationWarning
                      className="text-start"
                      style={{ borderRight: "1px solid", padding: 2 }}
                    >
                      G) U/S 80TTA: Deduction in respect of interest on Deposits
                      in savings accounts
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ padding: 2, width: "20%" }}
                    >
                      NOT APPLICABLE
                    </th>
                  </tr>
                  <tr style={{ border: "2px solid" }}>
                    <th
                      suppressHydrationWarning
                      className="text-start"
                      style={{ borderRight: "1px solid", padding: 2 }}
                    >
                      H) U/S 80G : Deduction in respect of Donation to certain
                      fund, Charitable institutions
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ padding: 2, width: "20%" }}
                    >
                      NOT APPLICABLE
                    </th>
                  </tr>
                  <tr style={{ border: "2px solid" }}>
                    <th
                      suppressHydrationWarning
                      className="text-start"
                      style={{ borderRight: "1px solid", padding: 2 }}
                    >
                      I)
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ padding: 2, width: "20%" }}
                    ></th>
                  </tr>
                  <tr style={{ border: "2px solid" }}>
                    <th
                      suppressHydrationWarning
                      style={{ borderRight: "1px solid", padding: 2 }}
                    >
                      <h5 className="fw-bold">
                        Total Amount deductible under any other provision (s) of
                        Chapter VI-A
                      </h5>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ padding: 2, width: "20%" }}
                    >
                      <h5 className="fw-bold">NOT APPLICABLE</h5>
                    </th>
                  </tr>
                </thead>
                <tbody></tbody>
              </table>
              <table
                style={{
                  border: "1px solid",
                  width: "100%",
                  padding: 5,
                  marginTop: 10,
                }}
              >
                <thead>
                  <tr style={{ border: "2px solid" }}>
                    <th
                      colSpan={2}
                      suppressHydrationWarning
                      style={{ borderRight: "1px solid", padding: 2 }}
                    >
                      <h5 className="fw-bold">
                        Income Tax Structure: F.Y. {finYear}
                      </h5>
                    </th>
                  </tr>
                  <tr style={{ border: "2px solid" }}>
                    <th
                      suppressHydrationWarning
                      className="text-end"
                      style={{ borderRight: "1px solid", padding: 2 }}
                    >
                      a) Income upto Rs. 3,00,000/-
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ padding: 2, width: "20%" }}
                    >
                      NIL
                    </th>
                  </tr>
                  <tr style={{ border: "2px solid" }}>
                    <th
                      suppressHydrationWarning
                      className="text-end"
                      style={{ borderRight: "1px solid", padding: 2 }}
                    >
                      b) Income from Rs.3,00,001/- to Rs.7,00,000/-: @5%
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ padding: 2, width: "20%" }}
                    >
                      {FiveITTax > 0
                        ? `Rs. ${IndianFormat(Math.floor(FiveIT * 0.05))}`
                        : "NIL"}
                    </th>
                  </tr>
                  <tr style={{ border: "2px solid" }}>
                    <th
                      suppressHydrationWarning
                      className="text-end"
                      style={{ borderRight: "1px solid", padding: 2 }}
                    >
                      c) Income from 7,00,001/- to Rs. 10,00,000/-: @10%
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ padding: 2, width: "20%" }}
                    >
                      {TenITTax > 0
                        ? `Rs. ${IndianFormat(Math.floor(TenIT * 0.1))}`
                        : "NIL"}
                    </th>
                  </tr>
                  <tr style={{ border: "2px solid" }}>
                    <th
                      suppressHydrationWarning
                      className="text-end"
                      style={{ borderRight: "1px solid", padding: 2 }}
                    >
                      d) Income from 10,00,001/- to Rs. 12,00,000/-: @15%
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ padding: 2, width: "20%" }}
                    >
                      {FifteenITTax > 0
                        ? `Rs. ${IndianFormat(Math.floor(FifteenIT * 0.15))}`
                        : "NIL"}
                    </th>
                  </tr>
                  <tr style={{ border: "2px solid" }}>
                    <th
                      suppressHydrationWarning
                      className="text-end"
                      style={{ borderRight: "1px solid", padding: 2 }}
                    >
                      e) Income from 12,00,001/- to Rs. 15,00,000/-: @20%
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ padding: 2, width: "20%" }}
                    >
                      {TwentyITTax > 0
                        ? `Rs. ${IndianFormat(Math.floor(TwentyIT * 0.2))}`
                        : "NIL"}
                    </th>
                  </tr>
                  <tr style={{ border: "2px solid" }}>
                    <th
                      suppressHydrationWarning
                      className="text-end"
                      style={{ borderRight: "1px solid", padding: 2 }}
                    >
                      f) Income exceeding Rs. 15,00,000/-: @30%
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ padding: 2, width: "20%" }}
                    >
                      {ThirtyITTax > 0
                        ? `Rs. ${IndianFormat(Math.floor(ThirtyIT * 0.3))}`
                        : "NIL"}
                    </th>
                  </tr>
                </thead>
                <tbody></tbody>
              </table>
            </div>
            <div className="my-5">
              <table
                className="nobreak"
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <thead>
                  <tr>
                    <th
                      colSpan={16}
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h5 className="fw-bold">
                        DISTRICT PRIMARY SCHOOL COUNCIL, HOWRAH
                      </h5>
                    </th>
                  </tr>
                  <tr>
                    <th
                      colSpan={16}
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h5 className="fw-bold">NAME: {tname}</h5>
                    </th>
                  </tr>
                  <tr>
                    <th
                      colSpan={16}
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h5 className="fw-bold">PAN NO.: {pan}</h5>
                    </th>
                  </tr>
                  <tr>
                    <th
                      colSpan={2}
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold" style={{ fontSize: 16 }}>
                        {finYear}
                      </h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "10%", padding: 5 }}
                    >
                      <h6 className="fw-bold">% D.A</h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold">Basic Pay</h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold">HT Allowance</h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold">D.A.</h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold">H.R.A.</h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold">M.A.</h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold">ARREAR</h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold">Conveyance Allowance</h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold">BONUS</h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h5 className="fw-bold">GROSS</h5>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold">GPF</h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold">GSLI</h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold">P.TAX</h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold">TDS</h6>
                    </th>
                  </tr>
                  <tr>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "20%", padding: 5 }}
                    >
                      <h6 className="fw-bold">MAR</h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "20%", padding: 5 }}
                    >
                      <h6 className="fw-bold">{prevYear}</h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "10%", padding: 5 }}
                    >
                      <h6 className="fw-bold">
                        {marchBasic !== 0
                          ? `${Math.round(marchSalary?.daPercent * 100)}%`
                          : ""}
                      </h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold">
                        {marchBasic !== 0 ? marchBasic : ""}
                      </h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold">
                        {marchBasic !== 0
                          ? marchAddl !== 0
                            ? marchAddl
                            : "NIL"
                          : ""}
                      </h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold">
                        {marchBasic !== 0 ? marchDA : ""}
                      </h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold">
                        {marchBasic !== 0 ? marchHRA : ""}
                      </h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold">
                        {marchBasic !== 0
                          ? marchMA !== 0
                            ? marchMA
                            : "NIL"
                          : ""}
                      </h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold"></h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold"></h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold"></h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold">
                        {marchBasic !== 0 ? marchGross : ""}
                      </h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold">
                        {marchBasic !== 0
                          ? marchGPF !== 0
                            ? marchGPF
                            : "NIL"
                          : ""}
                      </h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold">
                        {marchBasic !== 0
                          ? marchGSLI !== 0
                            ? marchGSLI
                            : "NIL"
                          : ""}
                      </h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold">
                        {marchBasic !== 0
                          ? marchPTax !== 0
                            ? marchPTax
                            : "NIL"
                          : ""}
                      </h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold">
                        {marchBasic !== 0 ? "NIL" : ""}
                      </h6>
                    </th>
                  </tr>
                  <tr>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "20%", padding: 5 }}
                    >
                      <h6 className="fw-bold">APR</h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "20%", padding: 5 }}
                    >
                      <h6 className="fw-bold">{prevYear}</h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "10%", padding: 5 }}
                    >
                      <h6 className="fw-bold">
                        {aprilBasic !== 0
                          ? `${Math.round(aprilSalary?.daPercent * 100)}%`
                          : ""}
                      </h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold">
                        {aprilBasic !== 0 ? aprilBasic : ""}
                      </h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold">
                        {aprilBasic !== 0
                          ? aprilAddl !== 0
                            ? aprilAddl
                            : "NIL"
                          : ""}
                      </h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold">
                        {aprilBasic !== 0 ? aprilDA : ""}
                      </h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold">
                        {aprilBasic !== 0 ? aprilHRA : ""}
                      </h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold">
                        {aprilBasic !== 0
                          ? aprilMA !== 0
                            ? aprilMA
                            : "NIL"
                          : ""}
                      </h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold"></h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold"></h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold"></h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold">
                        {aprilBasic !== 0 ? aprilGross : ""}
                      </h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold">
                        {aprilBasic !== 0
                          ? aprilGPF !== 0
                            ? aprilGPF
                            : "NIL"
                          : ""}
                      </h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold">
                        {aprilBasic !== 0
                          ? aprilGSLI !== 0
                            ? aprilGSLI
                            : "NIL"
                          : ""}
                      </h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold">
                        {aprilBasic !== 0
                          ? aprilPTax !== 0
                            ? aprilPTax
                            : "NIL"
                          : ""}
                      </h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold">
                        {aprilBasic !== 0 ? "NIL" : ""}
                      </h6>
                    </th>
                  </tr>
                  <tr>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "20%", padding: 5 }}
                    >
                      <h6 className="fw-bold">MAY</h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "20%", padding: 5 }}
                    >
                      <h6 className="fw-bold">{prevYear}</h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "10%", padding: 5 }}
                    >
                      <h6 className="fw-bold">
                        {mayBasic !== 0
                          ? `${Math.round(maySalary?.daPercent * 100)}%`
                          : ""}
                      </h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold">
                        {mayBasic !== 0 ? mayBasic : ""}
                      </h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold">
                        {mayBasic !== 0
                          ? mayAddl !== 0
                            ? mayAddl
                            : "NIL"
                          : ""}
                      </h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold">{mayBasic !== 0 ? mayDA : ""}</h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold">
                        {mayBasic !== 0 ? mayHRA : ""}
                      </h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold">
                        {mayBasic !== 0 ? (mayMA !== 0 ? mayMA : "NIL") : ""}
                      </h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold"></h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold"></h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold"></h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold">
                        {mayBasic !== 0 ? mayGross : ""}
                      </h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold">
                        {mayBasic !== 0 ? (mayGPF !== 0 ? mayGPF : "NIL") : ""}
                      </h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold">
                        {mayBasic !== 0
                          ? mayGSLI !== 0
                            ? mayGSLI
                            : "NIL"
                          : ""}
                      </h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold">
                        {mayBasic !== 0
                          ? mayPTax !== 0
                            ? mayPTax
                            : "NIL"
                          : ""}
                      </h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold">{mayBasic !== 0 ? "NIL" : ""}</h6>
                    </th>
                  </tr>
                  <tr>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "20%", padding: 5 }}
                    >
                      <h6 className="fw-bold">JUN</h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "20%", padding: 5 }}
                    >
                      <h6 className="fw-bold">{prevYear}</h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "10%", padding: 5 }}
                    >
                      <h6 className="fw-bold">
                        {juneBasic !== 0
                          ? `${Math.round(juneSalary?.daPercent * 100)}%`
                          : ""}
                      </h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold">
                        {juneBasic !== 0 ? juneBasic : ""}
                      </h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold">
                        {juneBasic !== 0
                          ? juneAddl !== 0
                            ? juneAddl
                            : "NIL"
                          : ""}
                      </h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold">
                        {juneBasic !== 0 ? juneDA : ""}
                      </h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold">
                        {juneBasic !== 0 ? juneHRA : ""}
                      </h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold">
                        {juneBasic !== 0 ? (juneMA !== 0 ? juneMA : "NIL") : ""}
                      </h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold"></h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold"></h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold"></h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold">
                        {juneBasic !== 0 ? juneGross : ""}
                      </h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold">
                        {juneBasic !== 0
                          ? juneGPF !== 0
                            ? juneGPF
                            : "NIL"
                          : ""}
                      </h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold">
                        {juneBasic !== 0
                          ? juneGSLI !== 0
                            ? juneGSLI
                            : "NIL"
                          : ""}
                      </h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold">
                        {juneBasic !== 0
                          ? junePTax !== 0
                            ? junePTax
                            : "NIL"
                          : ""}
                      </h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold">
                        {juneBasic !== 0 ? "NIL" : ""}
                      </h6>
                    </th>
                  </tr>
                  <tr>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "20%", padding: 5 }}
                    >
                      <h6 className="fw-bold">JUL</h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "20%", padding: 5 }}
                    >
                      <h6 className="fw-bold">{prevYear}</h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "10%", padding: 5 }}
                    >
                      <h6 className="fw-bold">
                        {julyBasic !== 0
                          ? `${Math.round(julySalary?.daPercent * 100)}%`
                          : ""}
                      </h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold">
                        {julyBasic !== 0 ? julyBasic : ""}
                      </h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold">
                        {julyBasic !== 0
                          ? julyAddl !== 0
                            ? julyAddl
                            : "NIL"
                          : ""}
                      </h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold">
                        {julyBasic !== 0 ? julyDA : ""}
                      </h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold">
                        {julyBasic !== 0 ? julyHRA : ""}
                      </h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold">
                        {julyBasic !== 0 ? (julyMA !== 0 ? julyMA : "NIL") : ""}
                      </h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold">
                        {aprilBasic !== 0 ? aprilIR : ""}
                      </h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold"></h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold"></h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold">
                        {julyBasic !== 0 ? julyGross : ""}
                      </h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold">
                        {julyBasic !== 0
                          ? julyGPF !== 0
                            ? julyGPF
                            : "NIL"
                          : ""}
                      </h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold">
                        {julyBasic !== 0
                          ? julyGSLI !== 0
                            ? julyGSLI
                            : "NIL"
                          : ""}
                      </h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold">
                        {julyBasic !== 0
                          ? julyPTax !== 0
                            ? julyPTax
                            : "NIL"
                          : ""}
                      </h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold">
                        {julyBasic !== 0 ? "NIL" : ""}
                      </h6>
                    </th>
                  </tr>
                  <tr>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "20%", padding: 5 }}
                    >
                      <h6 className="fw-bold">AUG</h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "20%", padding: 5 }}
                    >
                      <h6 className="fw-bold">{prevYear}</h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "10%", padding: 5 }}
                    >
                      <h6 className="fw-bold">
                        {augustBasic !== 0
                          ? `${Math.round(augustSalary?.daPercent * 100)}%`
                          : ""}
                      </h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold">
                        {augustBasic !== 0 ? augustBasic : ""}
                      </h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold">
                        {augustBasic !== 0
                          ? augustAddl !== 0
                            ? augustAddl
                            : "NIL"
                          : ""}
                      </h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold">
                        {augustBasic !== 0 ? augustDA : ""}
                      </h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold">
                        {augustBasic !== 0 ? augustHRA : ""}
                      </h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold">
                        {augustBasic !== 0
                          ? augustMA !== 0
                            ? augustMA
                            : "NIL"
                          : ""}
                      </h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold"></h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold"></h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold"></h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold">
                        {augustBasic !== 0 ? augustGross : ""}
                      </h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold">
                        {augustBasic !== 0
                          ? augustGPF !== 0
                            ? augustGPF
                            : "NIL"
                          : ""}
                      </h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold">
                        {augustBasic !== 0
                          ? augustGSLI !== 0
                            ? augustGSLI
                            : "NIL"
                          : ""}
                      </h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold">
                        {augustBasic !== 0
                          ? augustPTax !== 0
                            ? augustPTax
                            : "NIL"
                          : ""}
                      </h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold">
                        {augustBasic !== 0 ? "NIL" : ""}
                      </h6>
                    </th>
                  </tr>
                  <tr>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "20%", padding: 5 }}
                    >
                      <h6 className="fw-bold">SEP</h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "20%", padding: 5 }}
                    >
                      <h6 className="fw-bold">{prevYear}</h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "10%", padding: 5 }}
                    >
                      <h6 className="fw-bold">
                        {septemberBasic !== 0
                          ? `${Math.round(septemberSalary?.daPercent * 100)}%`
                          : ""}
                      </h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold">
                        {septemberBasic !== 0 ? septemberBasic : ""}
                      </h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold">
                        {septemberBasic !== 0
                          ? septemberAddl !== 0
                            ? septemberAddl
                            : "NIL"
                          : ""}
                      </h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold">
                        {septemberBasic !== 0 ? septemberDA : ""}
                      </h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold">
                        {septemberBasic !== 0 ? septemberHRA : ""}
                      </h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold">
                        {septemberBasic !== 0
                          ? septemberMA !== 0
                            ? septemberMA
                            : "NIL"
                          : ""}
                      </h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold"></h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold"></h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold"></h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold">
                        {septemberBasic !== 0 ? septemberGross : ""}
                      </h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold">
                        {septemberBasic !== 0
                          ? septemberGPF !== 0
                            ? septemberGPF
                            : "NIL"
                          : ""}
                      </h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold">
                        {septemberBasic !== 0
                          ? septemberGSLI !== 0
                            ? septemberGSLI
                            : "NIL"
                          : ""}
                      </h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold">
                        {septemberBasic !== 0
                          ? septemberPTax !== 0
                            ? septemberPTax
                            : "NIL"
                          : ""}
                      </h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold">
                        {septemberBasic !== 0 ? "NIL" : ""}
                      </h6>
                    </th>
                  </tr>
                  <tr>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "20%", padding: 5 }}
                    >
                      <h6 className="fw-bold">OCT</h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "20%", padding: 5 }}
                    >
                      <h6 className="fw-bold">{prevYear}</h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "10%", padding: 5 }}
                    >
                      <h6 className="fw-bold">
                        {octoberBasic !== 0
                          ? `${Math.round(octoberSalary?.daPercent * 100)}%`
                          : ""}
                      </h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold">
                        {octoberBasic !== 0 ? octoberBasic : ""}
                      </h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold">
                        {octoberBasic !== 0
                          ? octoberAddl !== 0
                            ? octoberAddl
                            : "NIL"
                          : ""}
                      </h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold">
                        {octoberBasic !== 0 ? octoberDA : ""}
                      </h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold">
                        {octoberBasic !== 0 ? octoberHRA : ""}
                      </h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold">
                        {octoberBasic !== 0
                          ? octoberMA !== 0
                            ? octoberMA
                            : "NIL"
                          : ""}
                      </h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold"></h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold"></h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold"></h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold">
                        {octoberBasic !== 0 ? octoberGross : ""}
                      </h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold">
                        {octoberBasic !== 0
                          ? octoberGPF !== 0
                            ? octoberGPF
                            : "NIL"
                          : ""}
                      </h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold">
                        {octoberBasic !== 0
                          ? octoberGSLI !== 0
                            ? octoberGSLI
                            : "NIL"
                          : ""}
                      </h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold">
                        {octoberBasic !== 0
                          ? octoberPTax !== 0
                            ? octoberPTax
                            : "NIL"
                          : ""}
                      </h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold">
                        {octoberBasic !== 0 ? "NIL" : ""}
                      </h6>
                    </th>
                  </tr>
                  <tr>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "20%", padding: 5 }}
                    >
                      <h6 className="fw-bold">NOV</h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "20%", padding: 5 }}
                    >
                      <h6 className="fw-bold">{prevYear}</h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "10%", padding: 5 }}
                    >
                      <h6 className="fw-bold">
                        {novemberBasic !== 0
                          ? `${Math.round(novemberSalary?.daPercent * 100)}%`
                          : ""}
                      </h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold">
                        {novemberBasic !== 0 ? novemberBasic : ""}
                      </h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold">
                        {novemberBasic !== 0
                          ? novemberAddl !== 0
                            ? novemberAddl
                            : "NIL"
                          : ""}
                      </h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold">
                        {novemberBasic !== 0 ? novemberDA : ""}
                      </h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold">
                        {novemberBasic !== 0 ? novemberHRA : ""}
                      </h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold">
                        {novemberBasic !== 0
                          ? novemberMA !== 0
                            ? novemberMA
                            : "NIL"
                          : ""}
                      </h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold"></h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold"></h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold"></h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold">
                        {novemberBasic !== 0 ? novemberGross : ""}
                      </h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold">
                        {novemberBasic !== 0
                          ? novemberGPF !== 0
                            ? novemberGPF
                            : "NIL"
                          : ""}
                      </h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold">
                        {novemberBasic !== 0
                          ? novemberGSLI !== 0
                            ? novemberGSLI
                            : "NIL"
                          : ""}
                      </h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold">
                        {novemberBasic !== 0
                          ? novemberPTax !== 0
                            ? novemberPTax
                            : "NIL"
                          : ""}
                      </h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold">
                        {novemberBasic !== 0 ? "NIL" : ""}
                      </h6>
                    </th>
                  </tr>
                  <tr>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "20%", padding: 5 }}
                    >
                      <h6 className="fw-bold">DEC</h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "20%", padding: 5 }}
                    >
                      <h6 className="fw-bold">{prevYear}</h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "10%", padding: 5 }}
                    >
                      <h6 className="fw-bold">
                        {decemberBasic !== 0
                          ? `${Math.round(decemberSalary?.daPercent * 100)}%`
                          : ""}
                      </h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold">
                        {decemberBasic !== 0 ? decemberBasic : ""}
                      </h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold">
                        {decemberBasic !== 0
                          ? decemberAddl !== 0
                            ? decemberAddl
                            : "NIL"
                          : ""}
                      </h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold">
                        {decemberBasic !== 0 ? decemberDA : ""}
                      </h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold">
                        {decemberBasic !== 0 ? decemberHRA : ""}
                      </h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold">
                        {decemberBasic !== 0
                          ? decemberMA !== 0
                            ? decemberMA
                            : "NIL"
                          : ""}
                      </h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold"></h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold"></h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold"></h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold">
                        {decemberBasic !== 0 ? decemberGross : ""}
                      </h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold">
                        {decemberBasic !== 0
                          ? decemberGPF !== 0
                            ? decemberGPF
                            : "NIL"
                          : ""}
                      </h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold">
                        {decemberBasic !== 0
                          ? decemberGSLI !== 0
                            ? decemberGSLI
                            : "NIL"
                          : ""}
                      </h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold">
                        {decemberBasic !== 0
                          ? decemberPTax !== 0
                            ? decemberPTax
                            : "NIL"
                          : ""}
                      </h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold">
                        {decemberBasic !== 0 ? "NIL" : ""}
                      </h6>
                    </th>
                  </tr>
                  <tr>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "20%", padding: 5 }}
                    >
                      <h6 className="fw-bold">JAN</h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "20%", padding: 5 }}
                    >
                      <h6 className="fw-bold">{thisYear}</h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "10%", padding: 5 }}
                    >
                      <h6 className="fw-bold">
                        {januaryBasic !== 0
                          ? `${Math.round(januarySalary?.daPercent * 100)}%`
                          : ""}
                      </h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold">
                        {januaryBasic !== 0 ? januaryBasic : ""}
                      </h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold">
                        {januaryBasic !== 0
                          ? januaryAddl !== 0
                            ? januaryAddl
                            : "NIL"
                          : ""}
                      </h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold">
                        {januaryBasic !== 0 ? januaryDA : ""}
                      </h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold">
                        {januaryBasic !== 0 ? januaryHRA : ""}
                      </h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold">
                        {januaryBasic !== 0
                          ? januaryMA !== 0
                            ? januaryMA
                            : "NIL"
                          : ""}
                      </h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold"></h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold"></h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold"></h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold">
                        {januaryBasic !== 0 ? januaryGross : ""}
                      </h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold">
                        {januaryBasic !== 0
                          ? januaryGPF !== 0
                            ? januaryGPF
                            : "NIL"
                          : ""}
                      </h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold">
                        {januaryBasic !== 0
                          ? januaryGSLI !== 0
                            ? januaryGSLI
                            : "NIL"
                          : ""}
                      </h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold">
                        {januaryBasic !== 0
                          ? januaryPTax !== 0
                            ? januaryPTax
                            : "NIL"
                          : ""}
                      </h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold">
                        {januaryBasic !== 0 ? "NIL" : ""}
                      </h6>
                    </th>
                  </tr>
                  <tr>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "20%", padding: 5 }}
                    >
                      <h6 className="fw-bold">FEB</h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "20%", padding: 5 }}
                    >
                      <h6 className="fw-bold">{thisYear}</h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "10%", padding: 5 }}
                    >
                      <h6 className="fw-bold">
                        {februaryBasic !== 0
                          ? `${Math.round(februarySalary?.daPercent * 100)}%`
                          : ""}
                      </h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold">
                        {februaryBasic !== 0 ? februaryBasic : ""}
                      </h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold">
                        {februaryBasic !== 0
                          ? februaryAddl !== 0
                            ? februaryAddl
                            : "NIL"
                          : ""}
                      </h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold">
                        {februaryBasic !== 0 ? februaryDA : ""}
                      </h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold">
                        {februaryBasic !== 0 ? februaryHRA : ""}
                      </h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold">
                        {februaryBasic !== 0
                          ? februaryMA !== 0
                            ? februaryMA
                            : "NIL"
                          : ""}
                      </h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold"></h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold"></h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold"></h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold">
                        {februaryBasic !== 0 ? februaryGross : ""}
                      </h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold">
                        {februaryBasic !== 0
                          ? februaryGPF !== 0
                            ? februaryGPF
                            : "NIL"
                          : ""}
                      </h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold">
                        {februaryBasic !== 0
                          ? februaryGSLI !== 0
                            ? februaryGSLI
                            : "NIL"
                          : ""}
                      </h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold">
                        {februaryBasic !== 0
                          ? februaryPTax !== 0
                            ? februaryPTax
                            : "NIL"
                          : ""}
                      </h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{ border: "1px solid", width: "100%", padding: 5 }}
                    >
                      <h6 className="fw-bold">
                        {februaryBasic !== 0 ? "NIL" : ""}
                      </h6>
                    </th>
                  </tr>
                  <tr>
                    <th
                      colSpan={2}
                      suppressHydrationWarning
                      style={{
                        border: "1px solid",
                        borderBottom: 0,
                        width: "100%",
                        padding: 5,
                      }}
                    >
                      <h5 className="fw-bold">TOTAL</h5>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{
                        border: "1px solid",
                        borderBottom: 0,
                        width: "10%",
                        padding: 5,
                      }}
                    >
                      <h6 className="fw-bold"></h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{
                        border: "1px solid",
                        borderBottom: 0,
                        width: "100%",
                        padding: 5,
                      }}
                    >
                      <h6 className="fw-bold">{grossBasic}</h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{
                        border: "1px solid",
                        borderBottom: 0,
                        width: "100%",
                        padding: 5,
                      }}
                    >
                      <h6 className="fw-bold">
                        {grossAddl !== 0 ? grossAddl : "NIL"}
                      </h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{
                        border: "1px solid",
                        borderBottom: 0,
                        width: "100%",
                        padding: 5,
                      }}
                    >
                      <h6 className="fw-bold">{grossDA}</h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{
                        border: "1px solid",
                        borderBottom: 0,
                        width: "100%",
                        padding: 5,
                      }}
                    >
                      <h6 className="fw-bold">{grossHRA}</h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{
                        border: "1px solid",
                        borderBottom: 0,
                        width: "100%",
                        padding: 5,
                      }}
                    >
                      <h6 className="fw-bold">
                        {grossMA !== 0 ? grossMA : "NIL"}
                      </h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{
                        border: "1px solid",
                        borderBottom: 0,
                        width: "100%",
                        padding: 5,
                      }}
                    >
                      <h6 className="fw-bold">
                        {aprilBasic !== 0 ? aprilIR : ""}
                      </h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{
                        border: "1px solid",
                        borderBottom: 0,
                        width: "100%",
                        padding: 5,
                      }}
                    >
                      <h6 className="fw-bold">NIL</h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{
                        border: "1px solid",
                        borderBottom: 0,
                        width: "100%",
                        padding: 5,
                      }}
                    >
                      <h6 className="fw-bold">{bonus !== 0 ? bonus : "NIL"}</h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{
                        border: "1px solid",
                        borderBottom: 0,
                        width: "100%",
                        padding: 5,
                      }}
                    >
                      <h6 className="fw-bold">{GrossPAY}</h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{
                        border: "1px solid",
                        borderBottom: 0,
                        width: "100%",
                        padding: 5,
                      }}
                    >
                      <h6 className="fw-bold">
                        {grossGPF !== 0 ? grossGPF : "NIL"}
                      </h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{
                        border: "1px solid",
                        borderBottom: 0,
                        width: "100%",
                        padding: 5,
                      }}
                    >
                      <h6 className="fw-bold">
                        {grossGSLI !== 0 ? grossGSLI : "NIL"}
                      </h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{
                        border: "1px solid",
                        borderBottom: 0,
                        width: "100%",
                        padding: 5,
                      }}
                    >
                      <h6 className="fw-bold">{grossPTax}</h6>
                    </th>
                    <th
                      suppressHydrationWarning
                      style={{
                        border: "1px solid",
                        borderBottom: 0,
                        width: "100%",
                        padding: 5,
                      }}
                    >
                      <h6 className="fw-bold">NIL</h6>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th></th>
                  </tr>
                </tbody>
              </table>
            </div>
            <div
              className="my-5"
              style={{
                marginTop: 60,
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "flex-end",
                paddingRight: 20,
              }}
            >
              <h5>SIGNATURE OF THE INCUMBENT</h5>
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

            <div className="mx-auto noprint mb-5">
              <button
                type="button"
                className="btn btn-info text-white font-weight-bold m-2 p-2 rounded"
                onClick={() => router.back()}
              >
                Go Back
              </button>
            </div>
          </div>
        )}
      </div>
    </Suspense>
  );
}
