"use client";
import React, { useEffect, useState } from "react";
import {
  excelCeilingRound,
  IndianFormat,
} from "../../modules/calculatefunctions";
import { useRouter } from "next/navigation";
export default function DAArrearCalculation() {
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
  const router = useRouter();
  const [joiningPeriod, setJoiningPeriod] = useState("before");
  const [joiningDate, setJoiningDate] = useState("");
  const [basicPay, setBasicPay] = useState("");
  const [arrears, setArrears] = useState([]);
  const [totalArrear, setTotalArrear] = useState(0);
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

  const handleReset = () => {
    setJoiningPeriod("before");
    setJoiningDate("");
    setBasicPay("");
    setShowPromotionSection(false);
    setPromotions([{ date: "", amount: "" }]);
    setArrears([]);
    setTotalArrear(0);
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
            basicPay: IndianFormat(Math.round(basicContribution)),
            daRate: daRate ? `${(daRate * 100).toFixed(0)}%` : "0%",
            arrear: IndianFormat(Math.round(arrearContribution)),
          });

          yearlyBasic += basicContribution;
          yearlyArrear += arrearContribution;
        }
      }

      if (yearlyArrear > 0) {
        results.push({
          year: year.toString(),
          month: "Yearly Grand Total",
          basicPay: IndianFormat(Math.round(yearlyBasic)),
          daRate: "-",
          arrear: IndianFormat(Math.round(yearlyArrear)),
        });
        grandTotalBasic += yearlyBasic;
        grandTotalArrear += yearlyArrear;
      }
    }

    results.push({
      year: "From 2008 To 2019",
      month: "Grand Total",
      basicPay: IndianFormat(Math.round(grandTotalBasic)),
      daRate: "-",
      arrear: IndianFormat(Math.round(grandTotalArrear)),
    });

    setArrears(results);
    setTotalArrear(grandTotalArrear);
  };

  useEffect(() => {
    //eslint-disable-next-line
  }, [arrears]);
  return (
    <div className="container my-4">
      <div className="my-3">
        <h2 className="mb-4 text-primary for">WBTPTA AMTA WEST CIRCLE</h2>
        <h2 className="mb-4">DA Arrear Calculator</h2>
        <h5 className="mb-4">
          For West Bengal State Government Employees (April 2008 - December
          2019)
        </h5>
        <img
          src="https://wbpay.in/wp-content/smush-webp/2025/05/Arrear-DA-Calculator-780x470.jpg.webp"
          alt="daimage"
          className="rounded img-fluid img-thumbnail"
        />
      </div>
      <div className="mb-3">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => router.push("/monthlyDAArrear")}
        >
          Yearwise
        </button>
      </div>
      <div className="mx-auto">
        <div className="card p-3 mb-4 mx-auto">
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
                    value={joiningDate}
                    onChange={(e) => setJoiningDate(e.target.value)}
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
                          <label className="form-label">Effective Date:</label>
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
                              <i className="bi bi-dash-circle-fill"> Remove</i>
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
                    Add promotions in chronological order. Each revision amount
                    must be greater than previous basic pay.
                  </small>
                </div>
              </div>
            </div>
          )}
          <div className="mx-auto my-3 d-flex justify-content-between">
            <div>
              <button
                className="btn btn-primary"
                onClick={calculateArrears}
                disabled={
                  !basicPay ||
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

      {arrears.length > 0 && (
        <div className="mt-4">
          <div className="table-responsive">
            <table className="table table-striped table-bordered table-hover">
              <thead className="thead-dark">
                <tr>
                  <th>Month & Year</th>
                  <th>Basic Pay (₹)</th>
                  <th>DA Difference (%)</th>
                  <th>Monthly Arrear (₹)</th>
                </tr>
              </thead>
              <tbody>
                {arrears.map((row, index) => {
                  if (
                    row.month === "Yearly Grand Total" ||
                    row.month === "Grand Total"
                  ) {
                    return (
                      <tr key={index} className="table-active">
                        <td>{`${row.month} ${row.year}`}</td>
                        <td>₹ {row.basicPay}</td>
                        <td>{row.daRate}</td>
                        <td>₹ {row.arrear}</td>
                      </tr>
                    );
                  } else {
                    return (
                      <tr key={index}>
                        <td>{`${row.month} ${row.year} (${row.period})`}</td>
                        <td>₹ {row.basicPay}</td>
                        <td>{row.daRate}</td>
                        <td>₹ {row.arrear}</td>
                      </tr>
                    );
                  }
                })}
              </tbody>
            </table>
          </div>

          <div className="alert alert-success mt-3">
            <h4>
              Grand Total Arrear: ₹ {IndianFormat(Math.round(totalArrear))}
            </h4>
            <h5>
              25% of Total Arrear (Indicative): ₹{" "}
              {IndianFormat(Math.round(totalArrear * 0.25))}
            </h5>
          </div>
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
      )}
    </div>
  );
}
