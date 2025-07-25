"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  excelCeilingRound,
  IndianFormat,
  monthNamesWithIndex,
  ptaxCalc,
} from "../../modules/calculatefunctions";
import { useRouter } from "next/navigation";
import AICPI from "./aicpi.json";
import OLDDA from "./oldDA.json";
export default function MonthlyDAArrear() {
  const yearRef = useRef();
  const DADifference = [
    {
      year: 2008,
      Jan: 0,
      Feb: 0,
      Mar: 0,
      Apr: 0.1,
      May: 0.1,
      Jun: 0.06,
      Jul: 0.1,
      Aug: 0.1,
      Sep: 0.1,
      Oct: 0.1,
      Nov: 0.07,
      Dec: 0.07,
    },
    {
      year: 2009,
      Jan: 0.13,
      Feb: 0.13,
      Mar: 0.1,
      Apr: 0.06,
      May: 0.06,
      Jun: 0.06,
      Jul: 0.11,
      Aug: 0.11,
      Sep: 0.11,
      Oct: 0.11,
      Nov: 0.11,
      Dec: 0.05,
    },
    {
      year: 2010,
      Jan: 0.13,
      Feb: 0.13,
      Mar: 0.13,
      Apr: 0.08,
      May: 0.08,
      Jun: 0.08,
      Jul: 0.18,
      Aug: 0.18,
      Sep: 0.18,
      Oct: 0.18,
      Nov: 0.18,
      Dec: 0.1,
    },
    {
      year: 2011,
      Jan: 0.16,
      Feb: 0.16,
      Mar: 0.16,
      Apr: 0.16,
      May: 0.16,
      Jun: 0.16,
      Jul: 0.23,
      Aug: 0.23,
      Sep: 0.23,
      Oct: 0.23,
      Nov: 0.23,
      Dec: 0.23,
    },
    {
      year: 2012,
      Jan: 0.2,
      Feb: 0.2,
      Mar: 0.2,
      Apr: 0.2,
      May: 0.2,
      Jun: 0.2,
      Jul: 0.27,
      Aug: 0.27,
      Sep: 0.27,
      Oct: 0.27,
      Nov: 0.27,
      Dec: 0.27,
    },
    {
      year: 2013,
      Jan: 0.28,
      Feb: 0.28,
      Mar: 0.28,
      Apr: 0.28,
      May: 0.28,
      Jun: 0.28,
      Jul: 0.38,
      Aug: 0.38,
      Sep: 0.38,
      Oct: 0.38,
      Nov: 0.38,
      Dec: 0.38,
    },
    {
      year: 2014,
      Jan: 0.42,
      Feb: 0.42,
      Mar: 0.42,
      Apr: 0.42,
      May: 0.42,
      Jun: 0.42,
      Jul: 0.49,
      Aug: 0.49,
      Sep: 0.49,
      Oct: 0.49,
      Nov: 0.49,
      Dec: 0.49,
    },
    {
      year: 2015,
      Jan: 0.48,
      Feb: 0.48,
      Mar: 0.48,
      Apr: 0.48,
      May: 0.48,
      Jun: 0.48,
      Jul: 0.54,
      Aug: 0.54,
      Sep: 0.54,
      Oct: 0.54,
      Nov: 0.54,
      Dec: 0.54,
    },
    {
      year: 2016,
      Jan: 0.5,
      Feb: 0.5,
      Mar: 0.5,
      Apr: 0.5,
      May: 0.5,
      Jun: 0.5,
      Jul: 0.57,
      Aug: 0.57,
      Sep: 0.57,
      Oct: 0.57,
      Nov: 0.57,
      Dec: 0.57,
    },
    {
      year: 2017,
      Jan: 0.51,
      Feb: 0.51,
      Mar: 0.51,
      Apr: 0.51,
      May: 0.51,
      Jun: 0.51,
      Jul: 0.54,
      Aug: 0.54,
      Sep: 0.54,
      Oct: 0.54,
      Nov: 0.54,
      Dec: 0.54,
    },
    {
      year: 2018,
      Jan: 0.42,
      Feb: 0.42,
      Mar: 0.42,
      Apr: 0.42,
      May: 0.42,
      Jun: 0.42,
      Jul: 0.48,
      Aug: 0.48,
      Sep: 0.48,
      Oct: 0.48,
      Nov: 0.48,
      Dec: 0.48,
    },
    {
      year: 2019,
      Jan: 0.29,
      Feb: 0.29,
      Mar: 0.29,
      Apr: 0.29,
      May: 0.29,
      Jun: 0.29,
      Jul: 0.39,
      Aug: 0.39,
      Sep: 0.39,
      Oct: 0.39,
      Nov: 0.39,
      Dec: 0.39,
    },
  ];
  const yearArray = [
    2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019,
  ];
  const [showYear, setShowYear] = useState(yearArray);
  const router = useRouter();
  const [name, setName] = useState("");
  const [school, setSchool] = useState("");
  const [designation, setDesignation] = useState("ASSISTANT TEACHER");
  const [selectedYear, setSelectedYear] = useState("");
  const [joiningPeriod, setJoiningPeriod] = useState("before");
  const [joiningDate, setJoiningDate] = useState("");
  const [basicPay, setBasicPay] = useState("");
  const [arrearDiff, setArrearDiff] = useState(0);
  const [twentyFiveArrear, setTwentyFiveArrear] = useState(0);
  const [arrears, setArrears] = useState([]);
  const [showCalculation, setShowCalculation] = useState(false);
  const [totalArrear, setTotalArrear] = useState(0);
  const [disabiality, setDisabiality] = useState(false);
  // ... other state variables ...
  const [showPromotionSection, setShowPromotionSection] = useState(false);
  const [promotions, setPromotions] = useState([{ date: "", amount: "" }]);
  const handleJoiningPeriodChange = () => {
    if (joiningPeriod === "before") {
      setJoiningPeriod("between");
    } else {
      setJoiningPeriod("before");
    }
  };
  // Add new promotion fields
  const addPromotion = () => {
    setPromotions([...promotions, { date: "", amount: "" }]);
  };

  // Remove promotion fields
  const removePromotion = (index) => {
    const updated = promotions.filter((_, i) => i !== index);
    setPromotions(updated);
  };

  // Handle promotion input changes
  const handlePromotionChange = (index, field, value) => {
    const updated = promotions.map((promo, i) =>
      i === index ? { ...promo, [field]: value } : promo
    );
    setPromotions(updated);
  };
  const handleJoiningDateChange = (e) => {
    setJoiningDate(e.target.value);
    let year = new Date(e.target.value).getFullYear();
    let arr = [];
    yearArray.map((item) => {
      if (joiningPeriod === "between" && year <= item) {
        arr = [...arr, item];
      }
    });
    setShowYear(arr);
  };

  const calculateArrears = () => {
    if (!basicPay || (joiningPeriod === "between" && !joiningDate)) {
      alert("Please fill all required fields");
      return;
    }

    const initialBasic = parseFloat(basicPay);
    if (isNaN(initialBasic)) {
      alert("Invalid Basic Pay amount");
      return;
    }

    const validPromotions = promotions
      .filter((p) => p.date && !isNaN(parseFloat(p.amount)))
      .map((p) => ({
        date: new Date(p.date),
        amount: parseFloat(p.amount),
      }))
      .sort((a, b) => a.date - b.date);

    let currentBasic = initialBasic;
    let results = [];
    let grandTotalArrear = 0;
    let grandTotalBasic = 0;
    const joinDate = new Date(joiningDate);

    const startYear =
      joiningPeriod === "between" ? joinDate.getFullYear() : 2008;
    const startMonth =
      joiningPeriod === "between" ? joinDate.getMonth() + 1 : 4;

    for (let year = startYear; year <= 2019; year++) {
      let yearlyBasic = 0;
      let yearlyArrear = 0;
      const yearData = DADifference.find((d) => d.year === year) || {};

      for (let month = 1; month <= 12; month++) {
        if (month === 7) {
          const shouldApply =
            joiningPeriod === "before"
              ? year >= 2008
              : year > joinDate.getFullYear();

          if (shouldApply) {
            currentBasic = excelCeilingRound(currentBasic * 1.03, 10);
          }
        }
        if (year === startYear && month < startMonth) continue;
        if (year === 2019 && month > 12) break;

        const monthStart = new Date(year, month - 1);
        const monthEnd = new Date(year, month, 0);
        const daysInMonth = monthEnd.getDate();
        const monthName = monthStart.toLocaleString("default", {
          month: "short",
        });
        const daRate = yearData[monthName] || 0;

        const monthPromotions = validPromotions.filter(
          (p) => p.date >= monthStart && p.date <= monthEnd
        );

        let periods = [];
        let cursorDate = new Date(monthStart);

        for (const promo of monthPromotions) {
          const promoDate = new Date(promo.date);
          if (promoDate > cursorDate) {
            const preEnd = new Date(promoDate);
            if (preEnd.getDate() !== monthStart.getDate()) {
              preEnd.setDate(preEnd.getDate() - 1);

              periods.push({
                start: new Date(cursorDate),
                end: preEnd,
                basic: currentBasic,
              });
            }
          }

          periods.push({
            start: new Date(promoDate),
            end: new Date(monthEnd),
            basic: promo.amount,
          });

          cursorDate = new Date(monthEnd);
          cursorDate.setDate(cursorDate.getDate() + 1);
          currentBasic = promo.amount;
        }

        if (cursorDate <= monthEnd) {
          periods.push({
            start: new Date(cursorDate),
            end: new Date(monthEnd),
            basic: currentBasic,
          });
        }

        for (const period of periods) {
          let startDay = period.start.getDate();
          const endDay = period.end.getDate();
          let days = endDay - startDay + 1;

          if (
            year === startYear &&
            month === startMonth &&
            joiningPeriod === "between"
          ) {
            const joinDay = joinDate.getDate();
            startDay = joinDay;
            days = Math.max(
              0,
              Math.min(endDay, daysInMonth) - Math.max(startDay, joinDay) + 1
            );
          }

          if (days <= 0) continue;

          const basicContribution = period.basic * (days / daysInMonth);
          const arrearContribution = basicContribution * daRate;

          results.push({
            year,
            month: monthName,
            period: `${endDay - startDay + 1}D`,
            basicPay: Math.round(basicContribution),
            daRate: daRate ? `${(daRate * 100).toFixed(0)}%` : "0%",
            arrear: Math.round(arrearContribution),
          });

          yearlyBasic += basicContribution;
          yearlyArrear += arrearContribution;
        }
      }

      if (yearlyArrear > 0) {
        results.push({
          year: year.toString(),
          month: "Yearly Grand Total",
          basicPay: Math.round(yearlyBasic),
          daRate: "-",
          arrear: Math.round(yearlyArrear),
        });
        grandTotalBasic += yearlyBasic;
        grandTotalArrear += yearlyArrear;
      }
    }

    results.push({
      year: "From 2008 To 2019",
      month: "Grand Total",
      basicPay: Math.round(grandTotalBasic),
      daRate: "-",
      arrear: Math.round(grandTotalArrear),
    });
    const filteredResults = results.filter((row) => row.year == selectedYear);
    let ad = 0;
    filteredResults.slice(0, filteredResults.length - 1).map((row) => {
      const aicpi = AICPI.find(
        (aicpi) =>
          aicpi.year == row.year &&
          aicpi.month == monthNamesWithIndex[row.month]
      );
      const oldDAData = OLDDA.find(
        (oldda) =>
          oldda.year == row.year &&
          oldda.month == monthNamesWithIndex[row.month]
      );
      const { basicPay, month } = row;
      const da = Math.round(basicPay * (aicpi[month] / 100));
      const hra = Math.round(basicPay * 0.15);
      const ma = 300;
      const gross = basicPay + da + hra + ma;
      const ptax = disabiality ? 0 : ptaxCalc(gross);
      const oldDA = Math.round(basicPay * (oldDAData[month] / 100));
      const oldGross = basicPay + oldDA + hra + ma;
      const oldPtax = disabiality ? 0 : ptaxCalc(oldGross);
      const grossArrear = gross - oldGross;
      const ptaxDiff = ptax - oldPtax;
      const diff = grossArrear - ptaxDiff;
      ad += diff;
    });
    setArrearDiff(ad);
    setTwentyFiveArrear(Math.round(ad / 4));
    setArrears(filteredResults);
    setTotalArrear(grandTotalArrear);
    setShowCalculation(true);
  };
  const handleReset = () => {
    setJoiningPeriod("before");
    setJoiningDate("");
    setBasicPay("");
    setShowPromotionSection(false);
    setPromotions([{ date: "", amount: "" }]);
    setArrears([]);
    setTotalArrear(0);
    setName("");
    setSchool("");
    setDesignation("ASSISTANT TEACHER");
    setSelectedYear("");
    yearRef.current.value = "";
    setDisabiality(false);
    setArrearDiff(0);
    setShowYear(yearArray);
    setTwentyFiveArrear(0);
    setShowCalculation(false);
  };
  useEffect(() => {}, [showYear, selectedYear]);
  return (
    <div className="container-fluid my-3">
      <div className="mb-3 noprint">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => router.back()}
        >
          Back
        </button>
      </div>
      <div className="mx-auto noprint">
        <div className="card p-3 mb-4 mx-auto">
          <div className="form-group mb-3 mx-auto">
            <div className="mb-3">
              <span className="" htmlFor="name">
                Your Name
              </span>
              <input
                className="form-control"
                type="text"
                id="name"
                placeholder="Enter Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <span className="" htmlFor="school">
                Your School
              </span>
              <input
                className="form-control"
                type="text"
                id="school"
                placeholder="Enter Your School"
                value={school}
                onChange={(e) => setSchool(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <span className="" htmlFor="Designation">
                Your Designation
              </span>
              <input
                className="form-control"
                type="text"
                id="Designation"
                placeholder="Enter Your Designation"
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
              />
            </div>

            <div className="form-group mb-3 mx-auto">
              <label className="mb-3 fs-5">Select Joining Period:</label>
              <div className="mx-auto">
                <div className="mx-auto mb-3 d-flex flex-column justify-content-between align-items-center">
                  <div className="form-check form-switch mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="joiningBefore"
                      checked={joiningPeriod === "before"}
                      onChange={handleJoiningPeriodChange}
                    />
                  </div>
                  <label className="" htmlFor="joiningBefore">
                    Joined before 01/04/2008
                  </label>
                </div>
                <div className="mx-auto d-flex flex-column justify-content-between align-items-center">
                  <div className="form-check form-switch mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="joiningAfter"
                      checked={joiningPeriod === "between"}
                      onChange={handleJoiningPeriodChange}
                    />
                  </div>
                  <label className="" htmlFor="joiningAfter">
                    Joined between 01/04/2008 and 31/12/2019
                  </label>
                </div>
              </div>
            </div>

            {joiningPeriod === "between" && (
              <div className="mx-auto">
                <div className="mb-3 mx-auto">
                  <label className="mb-3" htmlFor="joiningDate">
                    Actual Joining Date:
                  </label>
                  <div className="">
                    <input
                      type="date"
                      id="joiningDate"
                      className="form-control"
                      defaultValue={""}
                      onChange={handleJoiningDateChange}
                      min="2008-04-01"
                      max="2019-12-31"
                    />
                  </div>
                </div>
              </div>
            )}
            <div className="mx-auto">
              <div className="mb-3 mx-auto">
                <label className=" mb-3" htmlFor="basicpay">
                  {joiningPeriod === "before"
                    ? "Basic Pay (incl. Grade Pay) as on 01/04/2008:"
                    : "Basic Pay (incl. Grade Pay) as on Actual Joining Date:"}
                </label>
                <div className="">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter Basic Pay (incl. Grade Pay)"
                    aria-label="basicpay"
                    aria-describedby="basicpay"
                    value={basicPay}
                    onChange={(e) => setBasicPay(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="mb-3 d-flex flex-column justify-content-between align-items-center mx-auto">
              <div className="form-check form-switch">
                <input
                  className="form-check-input mb-3"
                  type="checkbox"
                  id="disabilty"
                  checked={disabiality}
                  onChange={(e) => setDisabiality(e.target.checked)}
                />
              </div>
              <label className=" mx-auto">Is Physically Changed?</label>
            </div>
            {/* Promotion Section */}
            <div className="mb-3 d-flex flex-column justify-content-between align-items-center mx-auto">
              <div className="form-check form-switch">
                <input
                  className="form-check-input mb-3"
                  type="checkbox"
                  id="promotionToggle"
                  checked={showPromotionSection}
                  onChange={(e) => setShowPromotionSection(e.target.checked)}
                />
              </div>
              <label className=" mx-auto">
                Had Promotion/Pay Revision during 2008-2019?
              </label>
            </div>

            {showPromotionSection && (
              <div className="card p-3 mb-4 mx-auto">
                <div className="promotion-section">
                  <h5 className="mb-3">Promotion/Revision Details</h5>

                  <div className="promotion-list">
                    {promotions.map((promo, index) => (
                      <div key={index} className="promotion-item mb-3">
                        <h5 className="text-success">Promotion {index + 1}:</h5>
                        <div className="row g-3 align-items-end">
                          <div className="col-md-5">
                            <label className="form-label">
                              Effective Date:
                            </label>
                            <input
                              type="date"
                              className="form-control"
                              value={promo.date}
                              onChange={(e) =>
                                handlePromotionChange(
                                  index,
                                  "date",
                                  e.target.value
                                )
                              }
                              min="2008-04-01"
                              max="2019-12-31"
                            />
                          </div>

                          <div className="col-md-5">
                            <label className="form-label">
                              Revised Basic Pay (incl. Grade Pay):
                            </label>
                            <input
                              type="number"
                              className="form-control"
                              value={promo.amount}
                              onChange={(e) =>
                                handlePromotionChange(
                                  index,
                                  "amount",
                                  e.target.value
                                )
                              }
                              placeholder="Enter Revised Basic Pay"
                              min={
                                basicPay ? parseFloat(basicPay) + 1 : undefined
                              }
                            />
                          </div>

                          <div className="col-md-2 d-flex align-items-end">
                            {index > 0 && (
                              <button
                                type="button"
                                className="btn btn-outline-danger w-100"
                                onClick={() => removePromotion(index)}
                              >
                                <i className="bi bi-dash-circle-fill">
                                  {" "}
                                  Remove
                                </i>
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-3">
                    <button
                      type="button"
                      className="btn btn-outline-success"
                      onClick={addPromotion}
                    >
                      <i className="bi bi-plus-lg me-2"></i>
                      Add Another Promotion
                    </button>
                  </div>

                  <div className="alert alert-info mt-3 mb-0">
                    <small>
                      <i className="bi bi-info-circle me-2"></i>
                      Add promotions in chronological order. Each revision
                      amount must be greater than previous basic pay.
                    </small>
                  </div>
                </div>
              </div>
            )}
            <div className="mb-3">
              <p className="mb-3" htmlFor="selectedYear">
                Select Salary Year
              </p>
              <select
                className="form-select"
                ref={yearRef}
                id="selectedYear"
                aria-label="Default select example"
                defaultValue={""}
                onChange={(e) => {
                  setSelectedYear(e.target.value);
                  setShowCalculation(false);
                }}
              >
                <option value={""}>Select Salary Year</option>
                {showYear.map((year, index) => (
                  <option value={year} key={index}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mx-auto my-3 d-flex justify-content-between">
            <div>
              <button
                className="btn btn-primary"
                onClick={calculateArrears}
                disabled={
                  !basicPay ||
                  selectedYear === "" ||
                  name === "" ||
                  school === "" ||
                  (joiningPeriod === "between" && !joiningDate) ||
                  (showPromotionSection &&
                    promotions.some(
                      (promo) =>
                        !promo.date ||
                        !promo.amount ||
                        parseFloat(promo.amount) <= parseFloat(basicPay) ||
                        new Date(promo.date) < new Date("2008-04-01") ||
                        new Date(promo.date) > new Date("2019-12-31") ||
                        (joiningPeriod === "between" &&
                          new Date(promo.date) <= new Date(joiningDate))
                    ))
                }
              >
                Calculate
              </button>
              <button
                type="button"
                className="btn btn-secondary ms-2"
                onClick={handleReset}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
      {showCalculation && (
        <div>
          <div className="mt-4">
            <div className="table-responsive">
              <table
                className="table table-striped table-bordered table-hover border-black"
                style={{ fontSize: 10 }}
              >
                <thead className="thead-dark">
                  <tr>
                    <th colSpan={18}>:-: ARREAR CLAIM FOR 25% D.A :-:</th>
                  </tr>
                  <tr>
                    <th colSpan={4}>NAME OF THE EMPLOYEE :</th>
                    <th colSpan={10}>
                      <p className="text-start p-0 m-0">{name}</p>
                    </th>
                    <th colSpan={2}>YEAR</th>
                    <th colSpan={2}>{selectedYear}</th>
                  </tr>
                  <tr>
                    <th colSpan={18}></th>
                  </tr>
                  <tr>
                    <th colSpan={4}>NAME OF THE OFFICE/SCHOOL :</th>
                    <th colSpan={14} style={{ verticalAlign: "middle" }}>
                      <p className="text-start p-0 m-0">{school}</p>
                    </th>
                  </tr>
                  <tr>
                    <th colSpan={4}>DESIGNATION :</th>
                    <th colSpan={14} style={{ verticalAlign: "middle" }}>
                      <p className="text-start p-0 m-0">{designation}</p>
                    </th>
                  </tr>
                  <tr>
                    <th colSpan={18}></th>
                  </tr>
                  <tr>
                    <th rowSpan={2} style={{ verticalAlign: "middle" }}>
                      Month
                    </th>
                    <th colSpan={6}>To Be Drawn</th>
                    <th rowSpan={2} style={{ verticalAlign: "middle" }}></th>
                    <th colSpan={6}>Already Drawn</th>
                    <th rowSpan={2} style={{ verticalAlign: "middle" }}>
                      Gross Arrear
                    </th>
                    <th rowSpan={2} style={{ verticalAlign: "middle" }}>
                      Eceess P.Tax
                    </th>
                    <th colSpan={2}>% of D.A.</th>
                  </tr>
                  <tr>
                    <th>Basic</th>
                    <th>D.A.</th>
                    <th>H.R.A.</th>
                    <th>M.A.</th>
                    <th>Gross</th>
                    <th>P.Tax</th>
                    <th>Basic</th>
                    <th>D.A.</th>
                    <th>H.R.A.</th>
                    <th>M.A.</th>
                    <th>Gross</th>
                    <th>P.Tax</th>
                    <th>AICPI</th>
                    <th>Old</th>
                  </tr>
                </thead>
                <tbody>
                  {arrears.length > 0 &&
                    arrears.slice(0, arrears.length - 1).map((row, index) => {
                      const aicpi = AICPI.find(
                        (aicpi) =>
                          aicpi.year == row.year &&
                          aicpi.month == monthNamesWithIndex[row.month]
                      );
                      const oldDAData = OLDDA.find(
                        (oldda) =>
                          oldda.year == row.year &&
                          oldda.month == monthNamesWithIndex[row.month]
                      );
                      const { basicPay, month, year } = row;
                      const da = Math.round(basicPay * (aicpi[month] / 100));
                      const hra = Math.round(basicPay * 0.15);
                      const ma = 300;
                      const gross = basicPay + da + hra + ma;
                      const ptax = disabiality ? 0 : ptaxCalc(gross);
                      const oldDA = Math.round(
                        basicPay * (oldDAData[month] / 100)
                      );
                      const oldGross = basicPay + oldDA + hra + ma;
                      const oldPtax = disabiality ? 0 : ptaxCalc(oldGross);
                      const grossArrear = gross - oldGross;
                      const ptaxDiff = ptax - oldPtax;

                      return (
                        <tr key={index}>
                          <td>{`${month}-${year?.toString()?.slice(2, 4)}`}</td>
                          <td>{basicPay}</td>
                          <td>{da}</td>
                          <td>{hra}</td>
                          <td>{ma}</td>
                          <td>{gross}</td>
                          <td>{ptax === 0 ? "NIL" : ptax}</td>
                          <td></td>
                          <td>{basicPay}</td>
                          <td>{oldDA}</td>
                          <td>{hra}</td>
                          <td>{ma}</td>
                          <td>{oldGross}</td>
                          <td>{oldPtax === 0 ? "NIL" : oldPtax}</td>
                          <td>{grossArrear}</td>
                          <td>{ptaxDiff === 0 ? "NIL" : ptaxDiff}</td>
                          <td>{aicpi[month]}</td>
                          <td>{oldDAData[month]}</td>
                        </tr>
                      );
                    })}
                  <tr>
                    <th colSpan={11}></th>
                    <th colSpan={3}>Net Arrear for this Year =</th>
                    <th>{arrearDiff}</th>
                    <th colSpan={3}></th>
                  </tr>
                  <tr>
                    <th colSpan={11}></th>
                    <th colSpan={3}>25% Arrear for this Year =</th>
                    <th>{twentyFiveArrear}</th>
                    <th colSpan={3}></th>
                  </tr>
                  <tr></tr>
                  <tr>
                    <th colSpan={18}>
                      <p className="fs-5 text-center">
                        25% Arrear D.A of {name} ({designation}) for the Year{" "}
                        {selectedYear} as per order of the Supreme Court SLP ( C
                        ) Nos. 22628-22630/2022, Dated 16th May of 2025 is Rs.{" "}
                        {IndianFormat(twentyFiveArrear)}/-
                      </p>
                    </th>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="noprint">
            <button
              type="button"
              className="btn btn-secondary ms-2"
              onClick={handleReset}
            >
              Reset
            </button>
            <button
              type="button"
              className="btn btn-primary ms-2"
              onClick={() => {
                if (typeof window !== undefined) {
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
