"use client";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../context/Store";
import { useRouter } from "next/navigation";
import { readCSVFile, titleCase } from "../../modules/calculatefunctions";
import dynamic from "next/dynamic";
import HRADeclaration from "../../pdfs/HRADeclaration";
import Loader from "../../components/Loader";

export default function HRA() {
  const PDFDownloadLink = dynamic(
    async () =>
      await import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
    {
      ssr: false,
      loading: () => <p>Please Wait...</p>,
    }
  );
  const { state, stateObject } = useGlobalContext();
  const router = useRouter();
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const salaryMonth = month < 5 ? "january" : "july";
  const { tname, school, id } = stateObject;
  const [loader, setLoader] = useState(false);
  const [showModal, setShowModal] = useState(true);
  const [showDownloadBtn, setShowDownloadBtn] = useState(false);
  const [isSpouseEmployed, setIsSpouseEmployed] = useState(false);
  const [limitWarning, setLimitWarning] = useState(false);
  const [salary, setSalary] = useState({
    tname,
    school,
    basic: 0,
    hra: 0,
    salaryMonth,
    year,
    spouseName: "",
    spouseOfficeName: "",
    spouseOfficeAddress: "",
    spouseBasic: "",
    spouseHra: "",
    spouseHouseRenntPaid: "",
  });

  const onChangeRadio = () => {
    setIsSpouseEmployed(!isSpouseEmployed);
    if (isSpouseEmployed) {
      setSalary({
        ...salary,
        spouseName: "",
        spouseOfficeName: "",
        spouseOfficeAddress: "",
        spouseBasic: "",
        spouseHra: "",
        spouseHouseRenntPaid: "",
      });
      setLimitWarning(false);
    }
  };

  const getSalary = async () => {
    setLoader(true);
    const q1 = await readCSVFile(`${salaryMonth}-${year}`);
    const monthSalary = q1?.filter((el) => el.id === id)[0];
    const basicpay = monthSalary?.basic;
    const hra =
      monthSalary?.hraPercent > 10
        ? monthSalary?.hraPercent
        : Math.round(basicpay * monthSalary?.hraPercent);

    setSalary({
      ...salary,
      basic: basicpay,
      hra,
    });
    setLoader(false);
  };
  useEffect(() => {
    getSalary();
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (salary.spouseHra + salary.hra > 12000) {
      setLimitWarning(true);
    } else {
      setLimitWarning(false);
    }
  }, [salary]);
  return (
    <div className="container">
      <h3 className="text-primary">HRA Declaration of {tname}</h3>
      <div className="my-3">
        <button
          type="button"
          className="btn btn-dark m-2"
          onClick={() => router.back()}
        >
          Go Back
        </button>
        <button
          type="button"
          className="btn btn-primary m-2"
          onClick={() => {
            setShowModal(true);
            setShowDownloadBtn(false);
          }}
        >
          Edit Spouse's Data
        </button>
      </div>
      {showModal && (
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
                <h1 className="modal-title fs-5" id="staticBackdropLabel">
                  Enter Spouse Details of {titleCase(salary?.tname)}
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={() => {
                    setShowModal(false);
                    setShowDownloadBtn(true);
                  }}
                ></button>
              </div>
              <div className="modal-body">
                <div className="spouseDetails col-md-6 mx-auto">
                  <h5 className="m-0 p-0">Details of Spouse</h5>
                  <h6 className="m-0 p-0 text-danger text-center">
                    * Leave unchanged and Click Save if Spouse is Un employed or
                    You are Unmarried or you do not want to fill
                  </h6>
                  <div className="mx-auto col-md-6 my-2">
                    <div className="form-check m-1 d-flex justify-content-between align-items-center">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        checked={!isSpouseEmployed}
                        onChange={onChangeRadio}
                        style={{ width: 30, height: 30 }}
                      />
                      <label
                        className="form-check-label m-2 text-success fs-6"
                        htmlFor="flexRadioDefault1"
                      >
                        Spouse is Un Employed or You are Un married
                      </label>
                    </div>
                    <div className="form-check m-1 d-flex justify-content-between align-items-center">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefaul2"
                        checked={isSpouseEmployed}
                        onChange={onChangeRadio}
                        style={{ width: 30, height: 30 }}
                      />
                      <label
                        className="form-check-label m-2 text-success fs-6"
                        htmlFor="flexRadioDefault2"
                      >
                        Spouse is Employed or Get HRA
                      </label>
                    </div>
                  </div>
                  {isSpouseEmployed && (
                    <div>
                      <div className="mb-3">
                        <label htmlFor="date" className="form-label">
                          Name of the Spouse
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Name of the Spouse"
                          value={salary.spouseName}
                          onChange={(e) => {
                            setSalary({
                              ...salary,
                              spouseName: e.target.value,
                            });
                          }}
                        />
                      </div>

                      <div className="mb-3">
                        <label className="form-label">
                          Spouse's Office Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Spouse's Office Name"
                          value={salary.spouseOfficeName}
                          onChange={(e) => {
                            setSalary({
                              ...salary,
                              spouseOfficeName: e.target.value,
                            });
                          }}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">
                          Spouse's Office Address
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Spouse's Office Address"
                          value={salary.spouseOfficeAddress}
                          onChange={(e) => {
                            setSalary({
                              ...salary,
                              spouseOfficeAddress: e.target.value,
                            });
                          }}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Spouse's Basic Pay</label>
                        <input
                          type="number"
                          className="form-control"
                          placeholder="Spouse's Basic Pay"
                          value={salary.spouseBasic}
                          onChange={(e) => {
                            setSalary({
                              ...salary,
                              spouseBasic: parseInt(e.target.value),
                              spouseHra: Math.round(
                                parseInt(e.target.value) * 0.12
                              ),
                            });
                          }}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Spouse's HRA</label>
                        <input
                          type="number"
                          className="form-control"
                          placeholder="Spouse's HRA"
                          value={salary.spouseHra}
                          onChange={(e) => {
                            const parsedHRA = parseInt(e.target.value);
                            setSalary({ ...salary, spouseHra: parsedHRA });
                          }}
                        />
                      </div>
                      {limitWarning && (
                        <div>
                          <h6 className="text-danger">
                            Your & Your Spouse's HRA Exceeds Rs. 12000 Limit
                            Change your HRA
                          </h6>
                          <div className="mb-3">
                            <label className="form-label">Edit Your HRA</label>
                            <input
                              type="number"
                              className="form-control"
                              placeholder="Edit Your HRA"
                              value={salary.hra}
                              onChange={(e) => {
                                setSalary({
                                  ...salary,
                                  hra: parseInt(e.target.value),
                                });
                              }}
                            />
                          </div>
                        </div>
                      )}
                      <div className="mb-3">
                        <label className="form-label">
                          House Rent Paid regarding Govt. Flat
                        </label>
                        <label className="form-label text-danger p-2">
                          {`(* Leave Blank if not applicable)`}
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="House Rent Paid"
                          value={salary.spouseHouseRenntPaid}
                          onChange={(e) => {
                            setSalary({
                              ...salary,
                              spouseHouseRenntPaid: e.target.value,
                            });
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="modal-footer d-flex flex-column">
                <div>
                  <button
                    className="btn btn-primary m-2"
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      setShowDownloadBtn(true);
                    }}
                  >
                    Save
                  </button>

                  <button
                    className="btn btn-danger m-2"
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      setShowDownloadBtn(true);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {salary.tname && showDownloadBtn && (
        <PDFDownloadLink
          document={<HRADeclaration data={salary} />}
          fileName={`HRA Declaration OF ${salary.tname}.pdf`}
          style={{
            textDecoration: "none",
            padding: 11,
            color: "#fff",
            backgroundColor: "darkgreen",
            border: "1px solid #4a4a4a",
            width: "40%",
            borderRadius: 10,
            margin: 20,
          }}
        >
          {({ blob, url, loading, error }) =>
            loading ? "Please Wait..." : `Download HRA Declaration`
          }
        </PDFDownloadLink>
      )}
      {loader && <Loader />}
    </div>
  );
}
