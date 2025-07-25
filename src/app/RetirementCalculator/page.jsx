"use client";
import React, { useState } from "react";
import { getMonthDays } from "../../modules/calculatefunctions";

function RetirementCalculator() {
  const [joiningDate, setJoiningDate] = useState("");
  const [retirementDate, setRetirementDate] = useState("");

  const calculateRetirementDate = () => {
    if (joiningDate) {
      const joinedYear = parseInt(joiningDate.substring(0, 4), 10);
      const joinedMonth = parseInt(joiningDate.substring(5, 7), 10);
      const currentYear = new Date().getFullYear();
      const retirementYear = joinedYear + 60;

      let retirementMonth = joinedMonth;
      let retirementDay = new Date(
        retirementYear,
        retirementMonth,
        0
      ).getDate();

      if (currentYear >= retirementYear) {
        retirementMonth = 12;
        retirementDay = new Date(retirementYear, retirementMonth, 0).getDate();
      }

      if (new Date(joiningDate).getDate() === 1 && retirementMonth === 1) {
        setRetirementDate(
          `${retirementDay.toString().padStart(2, "0")}-12-${
            retirementYear - 1
          }`
        );
      } else if (
        new Date(joiningDate).getDate() === 1 &&
        retirementMonth === 2
      ) {
        setRetirementDate(`31-01-${retirementYear}`);
      } else if (
        new Date(joiningDate).getDate() === 1 &&
        retirementMonth === 3 &&
        (retirementYear / 4) % 1 === 0
      ) {
        setRetirementDate(`29-02-${retirementYear}`);
      } else if (
        new Date(joiningDate).getDate() === 1 &&
        retirementMonth === 12
      ) {
        setRetirementDate(`30-11-${retirementYear}`);
      } else if (
        new Date(joiningDate).getDate() === 1 &&
        retirementMonth === 3
      ) {
        setRetirementDate(`28-02-${retirementYear}`);
      } else if (new Date(joiningDate).getDate() === 1) {
        setRetirementDate(
          `${getMonthDays[retirementMonth]}-${(retirementMonth - 1)
            .toString()
            .padStart(2, "0")}-${retirementYear}`
        );
      } else {
        setRetirementDate(
          `${retirementDay.toString().padStart(2, "0")}-${retirementMonth
            .toString()
            .padStart(2, "0")}-${retirementYear}`
        );
      }
    } else {
      alert("Please enter a valid joining date.");
      return;
    }
  };
  const [startDate, setStartDate] = useState("");
  const [stDate, setStDate] = useState("");
  const [numDays, setNumDays] = useState(0);
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState("");

  const calculateEndDate = () => {
    if (!startDate || numDays <= 0) {
      setError("Please enter a valid date and positive number of days");
      setEndDate("");
      return;
    }

    try {
      const dateObj = new Date(startDate);
      if (isNaN(dateObj.getTime())) throw new Error("Invalid date");

      const newDate = new Date(dateObj);
      newDate.setDate(newDate.getDate() + parseInt(numDays) - 1);

      setStDate(
        dateObj.toISOString().split("T")[0].split("-").reverse().join("-")
      );
      setEndDate(
        newDate.toISOString().split("T")[0].split("-").reverse().join("-")
      );
      setError("");
    } catch (err) {
      setError("Invalid date format");
      setEndDate("");
    }
  };

  return (
    <div className="container">
      <div className="my-3">
        <h3 className="my-3 text-center text-primary">
          Retirement Date Calculator
        </h3>
        <h5 className="mb-3 text-center text-primary" htmlFor="joiningDate">
          Set Date Of Birth:
        </h5>
        <input
          type="date"
          className="form-control mb-3"
          id="joiningDate"
          value={joiningDate}
          onChange={(e) => setJoiningDate(e.target.value)}
        />
        <button
          className="btn btn-sm btn-primary mb-3"
          onClick={calculateRetirementDate}
        >
          Calculate
        </button>
        <br />

        {retirementDate && (
          <h5 className="mb-3 text-center text-primary">
            Your retirement date will be: {retirementDate}
          </h5>
        )}
      </div>
      <div className="col-md-6 mx-auto mt-5">
        <div className="card p-4 shadow-sm">
          <h2 className="mb-4">Date Calculator</h2>

          <div className="row g-3">
            <div className="col-md-6">
              <label htmlFor="startDate" className="form-label">
                Start Date
              </label>
              <input
                type="date"
                id="startDate"
                className="form-control"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="numDays" className="form-label">
                Number of Days
              </label>
              <input
                type="number"
                id="numDays"
                className="form-control"
                value={numDays}
                min="1"
                onChange={(e) => setNumDays(e.target.value)}
              />
            </div>
          </div>

          {error && <div className="alert alert-danger mt-3">{error}</div>}

          <div>
            <button className="btn btn-primary mt-4" onClick={calculateEndDate}>
              Calculate End Date
            </button>
          </div>

          {endDate && (
            <div className="mt-4 p-3 bg-light rounded">
              <h5>Result:</h5>
              <p className="mb-1">Start Date: {stDate}</p>
              <p className="mb-1">Days Added: {numDays}</p>
              <p className="mb-0 fw-bold">End Date: {endDate}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default RetirementCalculator;
