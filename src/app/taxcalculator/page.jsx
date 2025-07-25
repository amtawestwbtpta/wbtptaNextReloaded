"use client";
import React, { useEffect, useState } from "react";

const TaxCalculator = () => {
  const [inputField, setInputField] = useState({
    junebasic: 0,
    julybasic: 0,
    addl: 0,
    ph: 0,
    ma: 0,
    arrear: 0,
    bonus: 0,
    gpf: 0,
    gsli: 0,
    lic: 0,
    nsc: 0,
    ppf: 0,
    sukanya: 0,
    fd5y: 0,
    hbloan: 0,
    ihbloan: 0,
    tfee: 0,
    mediclaim: 0,
    tdisease: 0,
  });

  const changevalue = (e) => {
    setInputField({ ...inputField, [e.target.name]: parseInt(e.target.value) });
  };

  const [julyBasic, setJulyBasic] = useState(0);

  let junebasic = inputField.junebasic;
  let addl = inputField.addl;
  let ph = inputField.ph;
  let ma = inputField.ma;
  let arrear = inputField.arrear;
  let bonus = inputField.bonus;
  let gpf = inputField.gpf;
  let gsli = inputField.gsli;
  let lic = inputField.lic;
  let nsc = inputField.nsc;
  let ppf = inputField.ppf;
  let sukanya = inputField.sukanya;
  let fd5y = inputField.fd5y;
  let hbloan = inputField.hbloan;
  let ihbloan = inputField.ihbloan;
  let tfee = inputField.tfee;
  let mediclaim = inputField.mediclaim;
  let tdisease = inputField.tdisease;

  let RoundTo = (number, roundto) => roundto * Math.round(number / roundto);

  let getRndInteger = (min, max) =>
    Math.floor(Math.random() * (max - min)) + min;

  const [tgpf, setTgpf] = useState(0);
  const [mda, setMda] = useState(0);
  const [mhra, setMhra] = useState(0);
  const [mgross, setMgross] = useState(0);
  const [mptax, setMptax] = useState(0);
  const [mnetPay, setMnetPay] = useState(0);
  const [jda, setJda] = useState(0);
  const [jhra, setJhra] = useState(0);
  const [jgross, setJgross] = useState(0);
  const [jptax, setJptax] = useState(0);
  const [jnetPay, setJnetPay] = useState(0);
  const [gross, setGross] = useState(0);
  const [ptax, setPtax] = useState(0);
  const [tgross, setTgross] = useState(0);
  const rand = getRndInteger(1000, 3000);
  const [eightyc, setEightyc] = useState(0);
  const [eightyd, setEightyd] = useState(0);
  const [c80, setC80] = useState(0);
  const [phded, setPhded] = useState(0);

  const [totalTaxableIncome, setTotalTaxableIncome] = useState(0);
  const [slabCalculation, setSlabCalculation] = useState(0);
  useEffect(() => {
    setJulyBasic(
      junebasic !== "" ? RoundTo(junebasic + junebasic * 0.03, 100) : ""
    );
    setTgpf(gpf > 0 ? gpf * 12 : 0);
    setMda(Math.round(junebasic * 0.06));
    setMhra(Math.round(junebasic * 0.12));
    setMgross(junebasic + addl + mda + mhra + ma);
    setMptax(
      ph === 1
        ? 0
        : mgross > 40000
        ? 200
        : mgross > 25000
        ? 150
        : mgross > 15000
        ? 130
        : mgross > 10000
        ? 110
        : 0
    );

    setMnetPay(mgross - gpf - mptax - gsli);
    setJda(Math.round(julyBasic * 0.06));
    setJhra(Math.round(julyBasic * 0.12));
    setJgross(julyBasic + addl + jda + jhra + ma);
    setJptax(
      ph === 1
        ? 0
        : jgross > 40000
        ? 200
        : jgross > 25000
        ? 150
        : jgross > 15000
        ? 130
        : jgross > 10000
        ? 110
        : 0
    );
    setJnetPay(jgross - gpf - jptax - gsli);
    setGross(mgross * 4 + jgross * 8);
    setPtax(mptax * 4 + jptax * 8);
    setTgross(gross + arrear + bonus);
    setEightyc(
      gsli * 12 + lic + tgpf + nsc + ppf + sukanya + fd5y + hbloan + tfee
    );
    setEightyd(mediclaim + tdisease + phded);
    setC80(eightyc > 150000 ? 150000 : eightyc);
    setPhded(ph === 1 ? 50000 : 0);
    setTotalTaxableIncome(
      RoundTo(tgross + rand - 50000 - ihbloan - ptax - c80 - eightyd - rand, 10)
    );
    setSlabCalculation(
      totalTaxableIncome > 1000000
        ? Math.round(
            12500 + 100000 + ((totalTaxableIncome - 1000000) * 30) / 100
          )
        : totalTaxableIncome > 500000
        ? Math.round(12500 + ((totalTaxableIncome - 500000) * 20) / 100)
        : totalTaxableIncome > 250000
        ? Math.round(((totalTaxableIncome - 250000) * 5) / 100)
        : totalTaxableIncome < 250000
        ? "NIL"
        : null
    );
  }, [
    junebasic,
    gpf,
    addl,
    mda,
    mhra,
    ma,
    ph,
    mgross,
    mptax,
    gsli,
    julyBasic,
    jda,
    jhra,
    jgross,
    jptax,
    gross,
    arrear,
    bonus,
    lic,
    nsc,
    ppf,
    sukanya,
    fd5y,
    hbloan,
    tfee,
    mediclaim,
    tdisease,
    phded,
    eightyc,
    tgross,
    rand,
    ihbloan,
    ptax,
    c80,
    eightyd,
    totalTaxableIncome,
    tgpf,
  ]);
  useEffect(() => {
    document.title = "WBTPTA AMTA WEST:Tax Calculator";
  }, []);
  return (
    <div className="container my-4">
      <div id="box1" className="my-3">
        <h3 className="text-primary text-center mb-2">
          TAX CALCULATOR: WBTPTA AMTA WEST
        </h3>
        <form id="tax_form" method="POST">
          <div className="row align-items-end">
            <div className="mb-3 col-md-3">
              <h6 className="form-label">JUNE BASIC:</h6>
              <input
                type="number"
                className="form-control"
                id="junebasic"
                name="junebasic"
                placeholder="JUNE BASIC"
                onChange={changevalue}
              />
            </div>
            <div className="mb-3 col-md-3">
              <h6 className="form-label">JULY BASIC:</h6>
              <input
                type="number"
                className="form-control"
                id="julybasic"
                name="julybasic"
                placeholder="JULY BASIC"
                value={julyBasic}
                onChange={changevalue}
              />
            </div>
            <div className="mb-3 col-md-3">
              <h6 className="form-label">Additional Allowance:</h6>
              <input
                type="number"
                className="form-control"
                id="addl"
                name="addl"
                placeholder="Additional Allowance"
                onChange={changevalue}
              />
            </div>
            <div className="mb-3 col-md-3">
              <h6 className="form-label">Is Physically Chalanged ?:</h6>
              <select
                className="form-select form-select-md"
                aria-label=".form-select-md example"
                name="ph"
                id="ph"
                onChange={changevalue}
                defaultValue={0}
                required
              >
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>
            </div>
            <div className="mb-3 col-md-3">
              <h6 className="form-label">Medical Allowance:</h6>
              <input
                type="number"
                className="form-control"
                id="ma"
                name="ma"
                placeholder="Medical Allowance"
                onChange={changevalue}
              />
            </div>
            <div className="mb-3 col-md-3">
              <h6 className="form-label">Arrear:</h6>
              <input
                type="number"
                className="form-control"
                id="arrear"
                name="arrear"
                placeholder="Arrear"
                onChange={changevalue}
              />
            </div>
            <div className="mb-3 col-md-3">
              <h6 className="form-label">Bonus:</h6>
              <input
                type="number"
                className="form-control"
                id="bonus"
                name="bonus"
                placeholder="Bonus"
                onChange={changevalue}
              />
            </div>
            <div className="mb-3 col-md-3">
              <h6 className="form-label">GPF:</h6>
              <input
                type="number"
                className="form-control"
                id="gpf"
                name="gpf"
                placeholder="GPF"
                onChange={changevalue}
              />
            </div>
            <div className="mb-3 col-md-3">
              <h6 className="form-label">GSLI:</h6>
              <input
                type="number"
                className="form-control"
                id="gsli"
                name="gsli"
                placeholder="GSLI"
                onChange={changevalue}
              />
            </div>
            <div className="mb-3 col-md-3">
              <h6 className="form-label">LIC:</h6>
              <input
                type="number"
                className="form-control"
                id="lic"
                name="lic"
                placeholder="LIC"
                onChange={changevalue}
              />
            </div>
            <div className="mb-3 col-md-3">
              <h6 className="form-label">NSC:</h6>
              <input
                type="number"
                className="form-control"
                id="nsc"
                name="nsc"
                placeholder="NSC"
                onChange={changevalue}
              />
            </div>
            <div className="mb-3 col-md-3">
              <h6 className="form-label">PPF:</h6>
              <input
                type="number"
                className="form-control"
                id="ppf"
                name="ppf"
                placeholder="PPF"
                onChange={changevalue}
              />
            </div>
            <div className="mb-3 col-md-3">
              <h6 className="form-label">
                Deposit in Sukanya Samriddhi Account:
              </h6>
              <input
                type="number"
                className="form-control"
                id="sukanya"
                name="sukanya"
                placeholder="Sukanya Samriddhi"
                onChange={changevalue}
              />
            </div>

            <div className="mb-3 col-md-3">
              <h6 className="form-label">
                F.D.in Sch. Bank not less than 5 years:
              </h6>
              <input
                type="number"
                className="form-control"
                id="fd5y"
                name="fd5y"
                placeholder="F.D. not less than 5 years"
                onChange={changevalue}
              />
            </div>
            <div className="mb-3 col-md-3">
              <h6 className="form-label">
                Recovery of Principal Amount of House Building Loan:
              </h6>
              <input
                type="number"
                className="form-control"
                id="hbloan"
                name="hbloan"
                placeholder="Principal Amount"
                onChange={changevalue}
              />
            </div>
            <div className="mb-3 col-md-3">
              <h6 className="form-label">Interest On House Building Loan:</h6>
              <input
                type="number"
                className="form-control"
                id="ihbloan"
                name="ihbloan"
                placeholder="Interest Amount"
                onChange={changevalue}
              />
            </div>
            <div className="mb-3 col-md-3">
              <h6 className="form-label">
                Tution Fees Maximum Rs. 1,00,000/- ( for two childern ):
              </h6>
              <input
                type="number"
                className="form-control"
                id="tfee"
                name="tfee"
                placeholder="Tution Fees"
                onChange={changevalue}
              />
            </div>
            <div className="mb-3 col-md-3">
              <h6 className="form-label">Medical Insurance Premium:</h6>
              <input
                type="number"
                className="form-control"
                id="mediclaim"
                name="mediclaim"
                placeholder="Medical Insurance Premium"
                onChange={changevalue}
              />
            </div>
            <div className="mb-3 col-md-3">
              <h6 className="form-label">
                Medical treatment of dependent person with terminal Disease:
              </h6>
              <input
                type="number"
                className="form-control"
                id="tdisease"
                name="tdisease"
                placeholder="Medical Insurance Premium"
                onChange={changevalue}
              />
            </div>
          </div>
          {junebasic > 17000 ? (
            <div id="tax">
              <div className="mb-3 row">
                <div className="col-md-6">
                  <h3 className="form-label">
                    March to June Gross Salary: {mgross}
                    <br />
                    June Net Salary: {mnetPay}
                  </h3>
                </div>
                <div className="col-md-6">
                  <h3 className="form-label">
                    July to February Gross Salary: {jgross}
                    <br />
                    July Net Salary: {jnetPay}
                  </h3>
                </div>
              </div>
              <h3 className="text-success text-center my-4">
                Calculated Tax Section
              </h3>
              <hr />
              <div className="text-primary row">
                <div className="row col-md-3">
                  <div className="mb-3 col-md-6">
                    <h6 className="text-primary text-left ml-2">
                      Gross Income:
                    </h6>
                  </div>
                  <div className="mb-3 col-md-6">
                    <h6 className="text-primary text-left" id="c">
                      {tgross}
                    </h6>
                  </div>
                </div>
                <div className="row col-md-3">
                  <div className="mb-3 col-md-6">
                    <h6 className="text-primary text-left ml-2">
                      Standard Deduction:
                    </h6>
                  </div>
                  <div className="mb-3 col-md-6">
                    <h6 className="text-primary text-left">50000</h6>
                  </div>
                </div>
                <div className="row col-md-3">
                  <div className="mb-3 col-md-6">
                    <h6 className="text-primary text-left ml-2">
                      80C Deduction:
                    </h6>
                  </div>
                  <div className="mb-3 col-md-6">
                    <h6 className="text-primary text-left" id="c80">
                      {eightyc}
                    </h6>
                  </div>
                </div>
                <div className="row col-md-3">
                  <div className="mb-3 col-md-6">
                    <h6 className="text-primary text-left ml-2">
                      Total Applicable Deduction Under 80C:
                    </h6>
                  </div>
                  <div className="mb-3 col-md-6">
                    <h6 className="text-primary text-left" id="e">
                      {eightyc > 150000 ? c80 : eightyc}
                    </h6>
                  </div>
                </div>
                <div className="row col-md-3">
                  <div className="mb-3 col-md-6">
                    <h6 className="text-primary text-left ml-2">
                      80D Deduction:
                    </h6>
                  </div>
                  <div className="mb-3 col-md-6">
                    <h6 className="text-primary text-left" id="eightyd">
                      {eightyd}
                    </h6>
                  </div>
                </div>
                <div className="row col-md-3">
                  <div className="mb-3 col-md-6">
                    <h6 className="text-primary text-left ml-2">
                      Gross Income After Deduction:
                    </h6>
                  </div>
                  <div className="mb-3 col-md-6">
                    <h6 className="text-primary text-left" id="gad">
                      {totalTaxableIncome}
                    </h6>
                  </div>
                </div>
                {slabCalculation > 12500 ? (
                  <>
                    <div className="row col-md-3 nil">
                      <div className="mb-3 col-md-6">
                        <h6 className="text-primary text-left ml-2">
                          Total Tax Payable:
                        </h6>
                      </div>
                      <div className="mb-3 col-md-6">
                        <h6 className="text-primary text-left" id="totaltax">
                          {slabCalculation}
                        </h6>
                      </div>
                    </div>
                    <div className="row col-md-3 nil">
                      <div className="mb-3 col-md-6">
                        <h6 className="text-primary text-left ml-2">
                          Health & Education Cess (4% of Total Tax):
                        </h6>
                      </div>
                      <div className="mb-3 col-md-6">
                        <h6 className="text-primary text-left" id="edcess">
                          {Math.round((slabCalculation * 4) / 100)}
                        </h6>
                      </div>
                    </div>
                  </>
                ) : null}

                <div className="row col-md-3">
                  <div className="mb-3 col-md-6">
                    <h6 className="text-primary text-left ml-2">
                      Net Tax Payable:
                    </h6>
                  </div>
                  <div className="mb-3 col-md-6">
                    <h6 className="text-primary text-left" id="caltax">
                      {slabCalculation < 12500
                        ? "NIL"
                        : slabCalculation +
                          Math.round((slabCalculation * 4) / 100)}
                    </h6>
                  </div>
                </div>
              </div>
              <hr />
            </div>
          ) : null}
        </form>
      </div>
    </div>
  );
};

export default TaxCalculator;
