"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "../../context/Store";
import {
  getServiceAge,
  getServiceLife,
} from "../../modules/calculatefunctions";
const TechSalary = () => {
  const { state, teachersState } = useGlobalContext();
  const router = useRouter();
  const data = teachersState.filter((el) => el.association === "WBTPTA");
  const [filteredData, setFilteredData] = useState([]);
  const [serviceLife, setServiceLife] = useState("");
  const [addValue, setAddValue] = useState(0);
  const [target, setTarget] = useState("");
  const serviceLifeRange = [
    {
      id: 1,
      serviceLife: "0 - 1 Years",
      value: [0],
      target: "1 Year",
      addValue: 1,
    },
    {
      id: 2,
      serviceLife: "1 - 2 Years",
      value: [1, 2],
      target: "2 Years",
      addValue: 2,
    },
    {
      id: 3,
      serviceLife: "9 - 10 Years",
      value: [9, 10],
      target: "10 Years",
      addValue: 10,
    },
    {
      id: 4,
      serviceLife: "17 - 18 Years",
      value: [17, 18],
      target: "18 Years",
      addValue: 18,
    },
    {
      id: 5,
      serviceLife: "19 - 20 Years",
      value: [19, 20],
      target: "20 Years",
      addValue: 20,
    },
    {
      id: 6,
      serviceLife: "58 - 60 Years",
      value: [58, 59, 60],
      target: "60 Years",
      addValue: 60,
    },
  ];
  const handleChange = (e) => {
    if (e.target.value !== "") {
      const parsedValue = JSON.parse(e.target.value);

      const selectedValue = parsedValue.value;
      let x = [];
      data.map((teacher) => {
        return selectedValue.map((range) => {
          if (getServiceAge(teacher.doj) === range) {
            return x.push(teacher);
          } else if (parsedValue.id === 6) {
            if (getServiceAge(teacher.dob) === range) {
              return x.push(teacher);
            }
          }
        });
      });
      setFilteredData(x);
      setServiceLife(parsedValue.serviceLife);
      setTarget(parsedValue.target);
      setAddValue(parsedValue.addValue);
    } else {
      setFilteredData([]);
      setServiceLife("");
    }
  };
  useEffect(() => {
    if (!state) {
      router.push("/login");
    }
    document.title = `All Teacher's Service Life`;
    // eslint-disable-next-line
  }, []);

  useEffect(() => {}, [filteredData, data, serviceLife]);
  return (
    <div className="container-fluid my-3">
      <h3 className="text-center text-primary">Teacher's Service Life</h3>

      <div className="col-md-4 mx-auto mb-3 noprint">
        <select
          className="form-select"
          defaultValue={""}
          onChange={handleChange}
          aria-label="Default select example"
        >
          <option value="">Select Service Life</option>
          {serviceLifeRange.map((el) => (
            <option key={el.id} value={JSON.stringify(el)}>
              {el.serviceLife}
            </option>
          ))}
        </select>
      </div>

      {filteredData.length > 0 && (
        <div>
          <div className="d-flex flex-row justify-content-center m-2">
            <div className="m-1 noprint">
              <button
                type="button"
                className="btn btn-primary text-white font-weight-bold p-2 rounded"
                onClick={() => {
                  if (typeof window !== undefined) {
                    window.print();
                  }
                }}
              >
                Print Page
              </button>
            </div>
            <div className="m-1 noprint">
              <button
                type="button"
                className="btn btn-warning  p-2 rounded"
                onClick={() => router.back()}
              >
                Go Back
              </button>
            </div>
          </div>
          <h4 className="text-center text-primary">
            Service Life: {serviceLife}
          </h4>
          <h4 className="text-center text-primary">
            Total {filteredData.length} Teachers
          </h4>
        </div>
      )}
      <div className="container text-center">
        <div className="row d-flex justify-content-center">
          {serviceLife !== "" ? (
            filteredData.length > 0 ? (
              filteredData.map((el, index) => {
                const date = parseInt(el.doj?.split("-")[0]);
                const month = el.doj?.split("-")[1];
                const year = parseInt(el.doj?.split("-")[2]);
                return (
                  <div
                    key={index}
                    className="rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2 nobreak"
                    style={{ backgroundColor: "seashell" }}
                  >
                    <h6 className="text-center text-black">
                      Teacher's Name:
                      <br /> {el.tname} ({`${el.desig}`})
                    </h6>
                    <h6 className="text-center text-black">
                      School:
                      <br /> {el.school}
                    </h6>
                    <h6>
                      <a
                        href={`tel: +91${el.phone}`}
                        className="d-inline-block  text-decoration-none text-black"
                      >
                        Mobile: {el.phone}
                      </a>
                    </h6>
                    <h6 className="text-center text-black">
                      Date of Joining:
                      <br /> {el.doj}
                    </h6>

                    <h6 className="text-center text-black">
                      Service Life:
                      <br /> {getServiceLife(el.doj)}
                    </h6>
                    {serviceLife !== "58 - 60 Years" ? (
                      <h6 className="text-center text-black">
                        Date of Completion of {target}:<br />
                        {date - 1 > 9 ? date - 1 : `0${date - 1}`}-{month}-
                        {year + addValue}
                      </h6>
                    ) : (
                      <div>
                        <h6 className="text-center text-black">
                          Date of Birth: {el.dob}
                        </h6>
                        <h6 className="text-center text-black">
                          Date of Retirement: {el.dor}
                        </h6>
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <h6 className="text-center text-black">
                No Teachers found for the selected service life.
              </h6>
            )
          ) : (
            <h6 className="text-center text-black">
              Please Select Any Year Range From Above Choice
            </h6>
          )}
        </div>
      </div>
      <div className="d-flex flex-row justify-content-center m-2">
        <div className="m-1 noprint">
          <button
            type="button"
            className="btn btn-primary text-white font-weight-bold p-2 rounded"
            onClick={() => {
              if (typeof window !== undefined) {
                window.print();
              }
            }}
          >
            Print Page
          </button>
        </div>
        <div className="m-1 noprint">
          <button
            type="button"
            className="btn btn-warning  p-2 rounded"
            onClick={() => router.back()}
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default TechSalary;
