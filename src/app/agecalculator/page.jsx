"use client";
import React, { useEffect, useState } from "react";

const AgeCalculator = () => {
  const [dob, setDob] = useState("");
  const [toggle, setToggle] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [age, setAge] = useState({ years: 0, months: 0, days: 0 });

  const calculateAgeOnSameDay = () => {
    const birthDate = new Date(dob);
    const currentDate = new Date();

    let ageYears = currentDate.getFullYear() - birthDate.getFullYear();
    let ageMonths = currentDate.getMonth() - birthDate.getMonth();
    let ageDays = currentDate.getDate() - birthDate.getDate();

    if (ageDays < 0) {
      ageMonths -= 1;
      const daysInPreviousMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        0
      ).getDate();
      ageDays += daysInPreviousMonth;
    }

    if (ageMonths < 0) {
      ageYears -= 1;
      ageMonths += 12;
    }

    setAge({ years: ageYears, months: ageMonths, days: ageDays });
  };

  const calculateAgeBetweenDates = () => {
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);

    let ageYears = endDateObj.getFullYear() - startDateObj.getFullYear();
    let ageMonths = endDateObj.getMonth() - startDateObj.getMonth();
    let ageDays = endDateObj.getDate() - startDateObj.getDate();

    if (ageDays < 0) {
      ageMonths -= 1;
      const daysInPreviousMonth = new Date(
        endDateObj.getFullYear(),
        endDateObj.getMonth(),
        0
      ).getDate();
      ageDays += daysInPreviousMonth;
    }

    if (ageMonths < 0) {
      ageYears -= 1;
      ageMonths += 12;
    }

    setAge({ years: ageYears, months: ageMonths, days: ageDays });
  };
  useEffect(() => {
    document.title = "WBTPTA AMTA WEST:Amaging Age Calculator";
  }, []);
  const toggleCalculator = (e) => {
    toggle === true
      ? (e.currentTarget.textContent = "Calculate Age between Dates")
      : (e.currentTarget.textContent = "Calculate Age on Same Day");
    setToggle(!toggle);
    setAge({ years: 0, months: 0, days: 0 });
  };

  return (
    <div className="container mt-5">
      <h1>Age Calculator</h1>
      <button className="btn btn-info m-3" onClick={toggleCalculator}>
        Calculate Age between Dates
      </button>
      <div className="">
        {!toggle && (
          <div className=" mx-auto col-md-6">
            <div className="form-group">
              <label htmlFor="dob">Date of Birth:</label>
              <input
                type="date"
                id="dob"
                className="form-control"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              />
            </div>
            <button
              className="btn btn-primary m-3"
              onClick={calculateAgeOnSameDay}
            >
              Calculate Age on Same Day
            </button>
            <h2>Age on Same Day:</h2>
            <p>
              {age.years} years, {age.months} months, {age.days} days
            </p>
          </div>
        )}

        {toggle && (
          <div className="mx-auto col-md-6">
            <div className="form-group">
              <label htmlFor="startDate">Start Date:</label>
              <input
                type="date"
                id="startDate"
                className="form-control"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="endDate">End Date:</label>
              <input
                type="date"
                id="endDate"
                className="form-control"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <button
              className="btn btn-primary m-3"
              onClick={calculateAgeBetweenDates}
            >
              Calculate Age between Dates
            </button>
            <h2>Age between Dates:</h2>
            <p>
              {age.years} years, {age.months} months, {age.days} days
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AgeCalculator;
