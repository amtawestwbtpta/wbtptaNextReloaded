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
} from "../../modules/calculatefunctions";
import DataTable from "react-data-table-component";
import { firestore } from "../../context/FirebaseContext";
import Loader from "../../components/Loader";
import axios from "axios";
import { collection, doc, getDocs, query, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import Link from "next/link";

export default function Page() {
  const router = useRouter();
  const {
    deductionState,
    setDeductionState,
    teachersState,
    salaryState,
    setSalaryState,
  } = useGlobalContext();
  const [salary, setSalary] = useState([]);
  const [loader, setLoader] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");
  const [schSearch, setSchSearch] = useState("");
  const [showDeductionForm, setShowDeductionForm] = useState(false);
  const [filterClicked, setFilterClicked] = useState(false);
  const [showTableFormat, setShowTableFormat] = useState(false);
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
  const columns = [
    {
      name: "Sl",
      selector: (row, ind) =>
        filterClicked ? ind + 1 : salary.findIndex((i) => i.id === row.id) + 1,
      width: "2",
      center: +true,
    },
    {
      name: "Teacher Name",
      selector: (row) => row.tname,
      sortable: true,
      wrap: true,
      center: +true,
    },
    {
      name: "School Name",
      selector: (row) => row.school,
      sortable: true,
      wrap: true,
      center: +true,
    },
    {
      name: "Gross Salary",
      selector: (row) => `₹ ${IndianFormat(row?.AllGross)}`,
      sortable: true,
      wrap: true,
      center: +true,
    },
    {
      name: "Gross 80C",
      selector: (teacher) =>
        teacher?.limit80C !== 0
          ? `₹ ${IndianFormat(teacher?.limit80C)}`
          : "NIL",
      sortable: true,
      wrap: true,
      center: +true,
    },
    {
      name: "Gross 80D",
      selector: (teacher) =>
        teacher?.Gross80D !== 0
          ? `₹ ${IndianFormat(teacher?.Gross80D)}`
          : "NIL",
      sortable: true,
      wrap: true,
      center: +true,
    },
    {
      name: "Taxable Income",
      selector: (teacher) =>
        teacher?.TaxableIncome !== 0
          ? `₹ ${IndianFormat(teacher?.TaxableIncome)}`
          : "NIL",
      sortable: true,
      wrap: true,
      center: +true,
    },
    {
      name: "Net Tax OLD",
      selector: (teacher) =>
        teacher?.NetTax !== 0 ? `₹ ${IndianFormat(teacher?.NetTax)}` : "NIL",
      sortable: true,
      wrap: true,
      center: +true,
    },
    {
      name: "Net Tax NEW",
      selector: (teacher) =>
        teacher?.AddedEduCess !== 0
          ? `₹ ${IndianFormat(teacher?.AddedEduCess)}`
          : "NIL",
      sortable: true,
      wrap: true,
      center: +true,
    },
    {
      name: "Update Deduction",
      cell: (row) => (
        <button
          type="button"
          className="btn btn-sm btn-warning"
          onClick={() => {
            const fData = deductionState.filter((d) => d.id === row?.id)[0];
            setTeacherDeduction(fData);
            setShowDeductionForm(true);
            setLoader(false);
          }}
        >
          Update Deduction
        </button>
      ),
    },
    {
      name: "IT Statement OLD Regime",
      cell: (row) => {
        const fData = teachersState.filter(
          (teacher) => teacher?.id === row.id
        )[0];
        const { id, tname, school, pan, phone, disability, desig } = fData;
        const data = {
          id,
          tname,
          school,
          pan,
          phone,
          disability,
          desig,
        };
        return (
          <Link
            className="btn btn-sm btn-success"
            href={`/incometaxOld?data=${JSON.stringify(data)}`}
          >
            IT Statement OLD Regime
          </Link>
        );
      },
      omit: deductionState.length === 0,
    },
    {
      name: "IT Statement NEW Regime",
      cell: (row) => {
        const fData = teachersState.filter(
          (teacher) => teacher?.id === row.id
        )[0];
        const { id, tname, school, pan, phone, disability, desig } = fData;
        const data = {
          id,
          tname,
          school,
          pan,
          phone,
          disability,
          desig,
        };
        return (
          <Link
            className="btn btn-sm btn-primary"
            href={`/incometaxNew?data=${JSON.stringify(data)}`}
          >
            IT Statement NEW Regime
          </Link>
        );
      },
      omit: deductionState.length === 0,
    },
    {
      name: "Form 16",
      cell: (row) => {
        const fData = teachersState.filter(
          (teacher) => teacher?.id === row.id
        )[0];
        const { id, tname, school, pan, disability, desig, fname } = fData;
        const data = {
          id,
          tname,
          school,
          pan,
          disability,
          desig,
          fname,
        };
        return (
          <Link
            className="btn btn-sm btn-info"
            href={`/Form16New?data=${JSON.stringify(data)}`}
          >
            Form 16
          </Link>
        );
      },
      omit: deductionState.length === 0,
    },
  ];

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
        let y = deductionState.filter((el) => el.id !== teacherDeduction.id);
        y = [...y, teacherDeduction];
        const newData = y.sort((a, b) => {
          if (a.tname < b.tname) {
            return -1;
          }
          if (a.tname > b.tname) {
            return 1;
          }
        });
        setDeductionState(newData);
        toast.success("Deduction Updated Successfully!");
      })
      .catch((e) => {
        setLoader(false);
        toast.error("Error Updating Deduction!");
        console.log(e);
      });
  };
  const getSalary = async () => {
    setLoader(true);
    const q1 = await axios.get(
      "https://raw.githubusercontent.com/amtawestwbtpta/salary/main/Salary.json"
    );
    setSalary(q1.data);
    setFilteredData(q1.data);
    setSalaryState(q1.data);
    setLoader(false);
  };
  useEffect(() => {
    getDeduction();
    if (salaryState.length === 0) {
      getSalary();
    } else {
      setSalary(salaryState);
      setFilteredData(salaryState);
    }
    // eslint-disable-next-line
  }, []);
  return (
    <div className="container-fluid">
      {loader ? (
        <Loader />
      ) : (
        <div>
          <div className="my-3">
            <div className="noprint">
              <div className="buttons">
                <button
                  type="button"
                  className="btn btn-primary m-2"
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
                  className="btn btn-success m-2"
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
                  className="btn btn-info m-2"
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
                <button
                  type="button"
                  className="btn btn-warning m-2"
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
                {salary.length !== filteredData.length && (
                  <button
                    type="button"
                    className="btn btn-danger m-2"
                    onClick={() => {
                      setFilteredData(salary);
                      setFilterClicked(false);
                    }}
                  >
                    Clear Filter
                  </button>
                )}
              </div>
              <div>
                {showTableFormat ? (
                  <>
                    <button
                      type="button"
                      className="btn btn-danger m-2"
                      onClick={() => {
                        setShowTableFormat(false);
                      }}
                    >
                      Hide Table Format
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary text-white font-weight-bold p-2 m-2 noprint rounded"
                      onClick={() => {
                        if (typeof window !== "undefined") {
                          window.print();
                        }
                      }}
                    >
                      Print
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    className="btn btn-danger m-2"
                    onClick={() => {
                      setShowTableFormat(true);
                    }}
                  >
                    Show Table Format
                  </button>
                )}
              </div>
            </div>

            <h3 className="text-black">All Teacher IT Data</h3>
            <div>
              {!showTableFormat ? (
                <DataTable
                  columns={columns}
                  data={filteredData}
                  pagination
                  paginationPerPage={30}
                  highlightOnHover
                  fixedHeader
                  subHeader
                  subHeaderComponent={
                    <div>
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
                  }
                  subHeaderAlign="right"
                />
              ) : (
                <table
                  style={{
                    border: "1px solid",
                    width: "100%",
                  }}
                  className="container-fluid"
                >
                  <thead
                    style={{
                      border: "1px solid",
                    }}
                  >
                    <tr>
                      <th
                        style={{
                          border: "1px solid",
                        }}
                      >
                        SL
                      </th>
                      <th
                        style={{
                          border: "1px solid",
                        }}
                      >
                        Name
                      </th>
                      <th
                        style={{
                          border: "1px solid",
                        }}
                      >
                        School
                      </th>
                      <th
                        style={{
                          border: "1px solid",
                        }}
                      >
                        Gross Salary
                      </th>
                      <th
                        style={{
                          border: "1px solid",
                        }}
                      >
                        Gross 80C
                      </th>
                      <th
                        style={{
                          border: "1px solid",
                        }}
                      >
                        Gross 80D
                      </th>
                      <th
                        style={{
                          border: "1px solid",
                        }}
                      >
                        Taxable Income
                      </th>
                      <th
                        style={{
                          border: "1px solid",
                        }}
                      >
                        Net Tax OLD
                      </th>
                      <th
                        style={{
                          border: "1px solid",
                        }}
                      >
                        Net Tax NEW
                      </th>
                      <th
                        className="noprint"
                        style={{
                          border: "1px solid",
                        }}
                      >
                        Update Deduction
                      </th>
                      <th
                        className="noprint"
                        style={{
                          border: "1px solid",
                        }}
                      >
                        IT Statement OLD Regime
                      </th>
                      <th
                        className="noprint"
                        style={{
                          border: "1px solid",
                        }}
                      >
                        IT Statement NEW Regime
                      </th>
                      <th
                        className="noprint"
                        style={{
                          border: "1px solid",
                        }}
                      >
                        Form 16
                      </th>
                    </tr>
                  </thead>
                  <tbody
                    style={{
                      border: "1px solid",
                    }}
                  >
                    {filteredData.map((teacher, index) => {
                      if (teacher?.AllGross !== 0) {
                        return (
                          <tr
                            style={{
                              border: "1px solid",
                            }}
                            key={index}
                          >
                            <td
                              style={{
                                border: "1px solid",
                              }}
                              className="p-2"
                            >
                              {filterClicked
                                ? index + 1
                                : salary.findIndex(
                                    (i) => i.id === teacher?.id
                                  ) + 1}
                            </td>
                            <td
                              style={{
                                border: "1px solid",
                              }}
                            >
                              {teacher?.tname}
                            </td>
                            <td
                              style={{
                                border: "1px solid",
                              }}
                            >
                              {teacher?.school}
                            </td>
                            <td
                              style={{
                                border: "1px solid",
                              }}
                            >
                              ₹ {IndianFormat(teacher?.AllGross)}
                            </td>
                            <td
                              style={{
                                border: "1px solid",
                              }}
                            >
                              {teacher?.limit80C !== 0
                                ? `₹ ${IndianFormat(teacher?.limit80C)}`
                                : "NIL"}
                            </td>
                            <td
                              style={{
                                border: "1px solid",
                              }}
                            >
                              {teacher?.Gross80D !== 0
                                ? `₹ ${IndianFormat(teacher?.Gross80D)}`
                                : "NIL"}
                            </td>
                            <td
                              style={{
                                border: "1px solid",
                              }}
                            >
                              {teacher?.TaxableIncome !== 0
                                ? `₹ ${IndianFormat(teacher?.TaxableIncome)}`
                                : "NIL"}
                            </td>
                            <td
                              style={{
                                border: "1px solid",
                              }}
                            >
                              {teacher?.NetTax !== 0
                                ? `₹ ${IndianFormat(teacher?.NetTax)}`
                                : "NIL"}
                            </td>
                            <td
                              style={{
                                border: "1px solid",
                              }}
                            >
                              {teacher?.AddedEduCess !== 0
                                ? `₹ ${IndianFormat(teacher?.AddedEduCess)}`
                                : "NIL"}
                            </td>
                            <td
                              className="noprint"
                              style={{
                                border: "1px solid",
                              }}
                              suppressHydrationWarning
                            >
                              <button
                                type="button"
                                className="btn btn-sm btn-warning p-2 m-2"
                                onClick={() => {
                                  const fData = deductionState.filter(
                                    (d) => d.id === teacher?.id
                                  )[0];
                                  setTeacherDeduction(fData);
                                  setShowDeductionForm(true);
                                  setLoader(false);
                                }}
                              >
                                Update Deduction
                              </button>
                            </td>
                            <td
                              className="noprint"
                              style={{
                                border: "1px solid",
                              }}
                              suppressHydrationWarning
                            >
                              <button
                                type="button"
                                className="btn btn-sm btn-success p-2 m-2"
                                onClick={() => {
                                  const fData = teachersState.filter(
                                    (item) => item?.id === teacher?.id
                                  )[0];
                                  const {
                                    id,
                                    tname,
                                    school,
                                    pan,
                                    phone,
                                    disability,
                                    desig,
                                  } = fData;
                                  const data = {
                                    id,
                                    tname,
                                    school,
                                    pan,
                                    phone,
                                    disability,
                                    desig,
                                  };
                                  router.push(
                                    `/incometaxOld?data=${JSON.stringify(data)}`
                                  );
                                }}
                              >
                                IT Statement OLD Regime
                              </button>
                            </td>
                            <td
                              className="noprint"
                              style={{
                                border: "1px solid",
                              }}
                              suppressHydrationWarning
                            >
                              <button
                                type="button"
                                className="btn btn-sm btn-primary p-2 m-2"
                                onClick={() => {
                                  const fData = teachersState.filter(
                                    (item) => item?.id === teacher?.id
                                  )[0];
                                  const {
                                    id,
                                    tname,
                                    school,
                                    pan,
                                    phone,
                                    disability,
                                    desig,
                                  } = fData;
                                  const data = {
                                    id,
                                    tname,
                                    school,
                                    pan,
                                    phone,
                                    disability,
                                    desig,
                                  };
                                  router.push(
                                    `/incometaxNew?data=${JSON.stringify(data)}`
                                  );
                                }}
                              >
                                IT Statement NEW Regime
                              </button>
                            </td>
                            <td
                              className="noprint"
                              style={{
                                border: "1px solid",
                              }}
                              suppressHydrationWarning
                            >
                              <button
                                type="button"
                                className="btn btn-sm btn-info p-2 m-2"
                                onClick={() => {
                                  const fData = teachersState.filter(
                                    (item) => item?.id === teacher?.id
                                  )[0];
                                  const {
                                    id,
                                    tname,
                                    school,
                                    pan,
                                    disability,
                                    desig,
                                    fname,
                                  } = fData;
                                  const data = {
                                    id,
                                    tname,
                                    school,
                                    pan,
                                    disability,
                                    desig,
                                    fname,
                                  };
                                  router.push(
                                    `/Form16New?data=${JSON.stringify(data)}`
                                  );
                                }}
                              >
                                Form 16
                              </button>
                            </td>
                          </tr>
                        );
                      }
                    })}
                  </tbody>
                </table>
              )}
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
                          className="btn btn-success"
                          onClick={() => {
                            setShowDeductionForm(false);
                            updateTeacherDeduction();
                          }}
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger"
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
            <button
              type="button"
              className="btn btn-primary text-white font-weight-bold p-2 m-2 noprint rounded"
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
