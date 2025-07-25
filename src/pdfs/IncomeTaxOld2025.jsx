"use client";
import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
  PDFViewer,
} from "@react-pdf/renderer";
import { IndianFormat, roundSo } from "../modules/calculatefunctions";
const width = 2480;
const height = 3508;

export default function IncomeTaxOld2025({ data }) {
  const {
    id,
    tname,
    school,
    pan,
    phone,
    disability,
    desig,
    thisYear,
    nextYear,
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
    TotalGross,
    GrossArrear,
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
  } = data;
  return (
    <Document
      style={{ margin: 5, padding: 5 }}
      title={`IT Statement of ${tname} of ${school} OLD 2025`}
    >
      <Page size="A4" orientation="portrait" style={styles.page}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center",
            width: "95%",
          }}
        >
          <View style={styles.pageMainView}>
            <View style={styles.mainBorderView}>
              <Text style={[styles.titleMain, { textDecoration: "underline" }]}>
                STATEMENT OF INCOME TAX (OLD TAX REGIME)
              </Text>
              <View
                style={[
                  styles.tableStartBorderView2,
                  { flexDirection: "column", marginTop: 5, borderWidth: 1 },
                ]}
              >
                <Text style={styles.text3}>
                  FINANCIAL YEAR {finYear} (RELEVANT TO ASSESMENT YEAR{" "}
                  {`${thisYear}-${nextYear}`})
                </Text>
              </View>
              <View
                style={[
                  styles.tableStartBorderView2,
                  { flexDirection: "column", marginTop: 5, borderWidth: 1 },
                ]}
              >
                <Text style={styles.text3}>
                  Howrah District Primary School Council
                </Text>
              </View>
              <View
                style={[
                  styles.tableStartBorderView2,
                  {
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    marginTop: 5,
                    borderWidth: 1,
                    marginBottom: 0,
                  },
                ]}
              >
                <View style={{ width: "10%", borderRightWidth: 1 }}>
                  <Text style={styles.text3}>NAME:-</Text>
                </View>
                <View style={{ width: "50%", borderRightWidth: 1 }}>
                  <Text style={styles.text3}>{tname}</Text>
                </View>
                <View style={{ width: "20%", borderRightWidth: 1 }}>
                  <Text style={styles.text3}>DESIGNATION:-</Text>
                </View>
                <View style={{ width: "20%" }}>
                  <Text style={styles.text3}>{desig}</Text>
                </View>
              </View>
              <View
                style={[
                  styles.tableStartBorderView2,
                  {
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    borderWidth: 0,
                    margin: 0,
                  },
                ]}
              >
                <View style={{ width: "50%" }}>
                  <Text style={styles.text3}> </Text>
                </View>
                <View
                  style={{
                    width: "50%",
                    borderLeftWidth: 1,
                    borderRightWidth: 1,
                  }}
                >
                  <Text
                    style={[
                      styles.text3,
                      { textAlign: "left", paddingLeft: 10 },
                    ]}
                  >
                    PAN NO:- {pan}
                  </Text>
                </View>
              </View>
              <View
                style={[
                  styles.tableStartBorderView2,
                  {
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    margin: 0,
                    borderWidth: 1,
                  },
                ]}
              >
                <Text
                  style={[styles.text3, { textAlign: "left", paddingLeft: 10 }]}
                >
                  NAME OF SCHOOL:- {school}
                </Text>
              </View>
              <View
                style={[
                  styles.tableStartBorderView2,
                  {
                    marginTop: 2,
                    borderWidth: 1,
                    borderBottomWidth: 0,
                  },
                ]}
              >
                <Text style={[styles.text3]}>INCOME FROM THE SALARY HEAD</Text>
              </View>
              <View
                style={[
                  styles.tableStartBorderView2,
                  {
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    borderLeftWidth: 1,
                    borderRightWidth: 1,
                    borderTopWidth: 0,
                    borderBottomWidth: 1,
                  },
                ]}
              >
                <View
                  style={{
                    width: "5%",
                    height: 80,
                    justifyContent: "center",
                    textAlign: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.text}>1</Text>
                </View>
                <View
                  style={{
                    width: "70%",
                    borderWidth: 1,
                    borderTopWidth: 0,
                    borderBottomWidth: 0,
                    height: 80,
                  }}
                >
                  <View
                    style={{
                      width: "100%",
                      borderBottomWidth: 1,
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <View style={{ width: "10%", borderRightWidth: 1 }}>
                      <Text style={styles.text}>a)</Text>
                    </View>
                    <View style={{ width: "70%", borderRightWidth: 1 }}>
                      <Text
                        style={[
                          styles.text,
                          { textAlign: "left", paddingLeft: 2 },
                        ]}
                      >
                        Grass Pay & Allowances from March'{prevYear - 2000} to
                        February, {thisYear}
                      </Text>
                    </View>
                    <View style={{ width: "20%" }}>
                      <Text style={styles.text}>
                        Rs. {IndianFormat(TotalGross)}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      width: "100%",
                      borderBottomWidth: 1,
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <View style={{ width: "10%", borderRightWidth: 1 }}>
                      <Text style={styles.text}>b)</Text>
                    </View>
                    <View style={{ width: "70%", borderRightWidth: 1 }}>
                      <Text
                        style={[
                          styles.text,
                          { textAlign: "left", paddingLeft: 2 },
                        ]}
                      >
                        Arrear Salary if any during the Financial year{" "}
                        {`${prevYear} - ${thisYear}`}
                      </Text>
                    </View>
                    <View style={{ width: "20%" }}>
                      {GrossArrear > 0 ? (
                        <Text style={styles.text}>Rs. {GrossArrear}</Text>
                      ) : (
                        <Text style={styles.text}>NIL</Text>
                      )}
                    </View>
                  </View>
                  <View
                    style={{
                      width: "100%",
                      borderBottomWidth: 1,
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <View style={{ width: "10%", borderRightWidth: 1 }}>
                      <Text style={styles.text}>c)</Text>
                    </View>
                    <View style={{ width: "70%", borderRightWidth: 1 }}>
                      <Text
                        style={[
                          styles.text,
                          { textAlign: "left", paddingLeft: 2 },
                        ]}
                      >
                        Bonus received, if any
                      </Text>
                    </View>
                    <View style={{ width: "20%" }}>
                      {bonus > 0 ? (
                        <Text style={styles.text}>Rs. {bonus}</Text>
                      ) : (
                        <Text style={styles.text}>NIL</Text>
                      )}
                    </View>
                  </View>
                  <View
                    style={{
                      width: "100%",
                      borderBottomWidth: 1,
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <View style={{ width: "10%", borderRightWidth: 1 }}>
                      <Text style={styles.text}>d)</Text>
                    </View>
                    <View style={{ width: "70%", borderRightWidth: 1 }}>
                      <Text
                        style={[
                          styles.text,
                          { textAlign: "left", paddingLeft: 2 },
                        ]}
                      >
                        Honararium / Fees / Commission, if any
                      </Text>
                    </View>
                    <View style={{ width: "20%" }}>
                      <Text style={styles.text}>NIL</Text>
                    </View>
                  </View>
                  <View
                    style={{
                      width: "100%",
                      borderBottomWidth: 1,
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <View style={{ width: "10%", borderRightWidth: 1 }}>
                      <Text style={styles.text}>e)</Text>
                    </View>
                    <View style={{ width: "70%", borderRightWidth: 1 }}>
                      <Text
                        style={[
                          styles.text,
                          { textAlign: "left", paddingLeft: 2 },
                        ]}
                      >
                        Total Income ( a + b + c + d )
                      </Text>
                    </View>
                    <View style={{ width: "20%" }}>
                      <Text style={styles.text}>
                        Rs. {IndianFormat(AllGross)}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      width: "100%",
                      borderBottomWidth: 1,
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <View style={{ width: "10%", borderRightWidth: 1 }}>
                      <Text style={styles.text}>f)</Text>
                    </View>
                    <View style={{ width: "70%", borderRightWidth: 1 }}>
                      <Text
                        style={[
                          styles.text,
                          { textAlign: "left", paddingLeft: 2 },
                        ]}
                      >
                        Less: any overdrawal
                      </Text>
                    </View>
                    <View style={{ width: "20%" }}>
                      <Text style={styles.text}>NIL</Text>
                    </View>
                  </View>
                  <View
                    style={{
                      width: "100%",
                      borderBottomWidth: 0,
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        width: "10%",
                        borderRightWidth: 1,
                        height: 12,
                      }}
                    >
                      <Text style={styles.text}>g)</Text>
                    </View>
                    <View
                      style={{
                        width: "70%",
                        borderRightWidth: 1,
                        height: 12,
                      }}
                    >
                      <Text
                        style={[
                          styles.text,
                          { textAlign: "left", paddingLeft: 2 },
                        ]}
                      >
                        TOTAL INCOML FROM SALARY HEAD ( e - f )
                      </Text>
                    </View>
                    <View style={{ width: "20%", height: 12 }}>
                      <Text style={styles.text}>
                        Rs. {IndianFormat(AllGross)}
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={{ width: "25%", height: 80 }}>
                  <View
                    style={{
                      width: "100%",
                      height: 68,
                      borderBottomWidth: 1,
                    }}
                  ></View>
                  <Text style={styles.text}>Rs. {IndianFormat(AllGross)}</Text>
                </View>
              </View>
              <View
                style={[
                  styles.tableStartBorderView2,
                  {
                    marginTop: 2,
                    borderWidth: 1,
                    borderBottomWidth: 0,
                  },
                ]}
              >
                <Text style={[styles.text3]}>INCOME FROM OTHER SOURCES</Text>
              </View>
              <View
                style={[
                  styles.tableStartBorderView2,
                  {
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    borderLeftWidth: 1,
                    borderRightWidth: 1,
                    borderTopWidth: 0,
                    borderBottomWidth: 1,
                  },
                ]}
              >
                <View
                  style={{
                    width: "5%",
                    height: 105,
                    justifyContent: "center",
                    textAlign: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.text}>2</Text>
                </View>
                <View
                  style={{
                    width: "70%",
                    borderWidth: 1,
                    borderTopWidth: 0,
                    borderBottomWidth: 0,
                    height: 105,
                  }}
                >
                  <View
                    style={{
                      width: "100%",
                      borderBottomWidth: 1,
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <View style={{ width: "10%", borderRightWidth: 1 }}>
                      <Text style={styles.text}>a)</Text>
                    </View>
                    <View style={{ width: "70%", borderRightWidth: 1 }}>
                      <Text
                        style={[
                          styles.text,
                          { textAlign: "left", paddingLeft: 2 },
                        ]}
                      >
                        Pension received , if any
                      </Text>
                    </View>
                    <View style={{ width: "20%" }}>
                      <Text style={styles.text}>NIL</Text>
                    </View>
                  </View>
                  <View
                    style={{
                      width: "100%",
                      borderBottomWidth: 1,
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <View style={{ width: "10%", borderRightWidth: 1 }}>
                      <Text style={styles.text}>b)</Text>
                    </View>
                    <View style={{ width: "70%", borderRightWidth: 1 }}>
                      <Text
                        style={[
                          styles.text,
                          { textAlign: "left", paddingLeft: 2 },
                        ]}
                      >
                        Interest on NSC
                      </Text>
                    </View>
                    <View style={{ width: "20%" }}>
                      {nscInterest > 0 ? (
                        <Text style={styles.text}>Rs. {nscInterest}</Text>
                      ) : (
                        <Text style={styles.text}>NIL</Text>
                      )}
                    </View>
                  </View>
                  <View
                    style={{
                      width: "100%",
                      borderBottomWidth: 1,
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <View style={{ width: "10%", borderRightWidth: 1 }}>
                      <Text style={styles.text}>c)</Text>
                    </View>
                    <View style={{ width: "70%", borderRightWidth: 1 }}>
                      <Text
                        style={[
                          styles.text,
                          { textAlign: "left", paddingLeft: 2 },
                        ]}
                      >
                        Interest of KVP / MIS etc
                      </Text>
                    </View>
                    <View style={{ width: "20%" }}>
                      <Text style={styles.text}>NIL</Text>
                    </View>
                  </View>
                  <View
                    style={{
                      width: "100%",
                      borderBottomWidth: 1,
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <View style={{ width: "10%", borderRightWidth: 1 }}>
                      <Text style={styles.text}>d)</Text>
                    </View>
                    <View style={{ width: "70%", borderRightWidth: 1 }}>
                      <Text
                        style={[
                          styles.text,
                          { textAlign: "left", paddingLeft: 2 },
                        ]}
                      >
                        Bank's Interest , if any ( Savings )
                      </Text>
                    </View>
                    <View style={{ width: "20%" }}>
                      <Text style={styles.text}>
                        Rs. {IndianFormat(BankInterest)}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      width: "100%",
                      borderBottomWidth: 1,
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <View style={{ width: "10%", borderRightWidth: 1 }}>
                      <Text style={styles.text}>e)</Text>
                    </View>
                    <View style={{ width: "70%", borderRightWidth: 1 }}>
                      <Text
                        style={[
                          styles.text,
                          { textAlign: "left", paddingLeft: 2 },
                        ]}
                      >
                        Bank's Interest , if any ( Not from Savings )
                      </Text>
                    </View>
                    <View style={{ width: "20%" }}>
                      <Text style={styles.text}>NIL</Text>
                    </View>
                  </View>
                  <View
                    style={{
                      width: "100%",
                      borderBottomWidth: 1,
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <View style={{ width: "10%", borderRightWidth: 1 }}>
                      <Text style={styles.text}>f)</Text>
                    </View>
                    <View style={{ width: "70%", borderRightWidth: 1 }}>
                      <Text
                        style={[
                          styles.text,
                          { textAlign: "left", paddingLeft: 2 },
                        ]}
                      >
                        Medical Reimbursement
                      </Text>
                    </View>
                    <View style={{ width: "20%" }}>
                      <Text style={styles.text}>NIL</Text>
                    </View>
                  </View>
                  <View
                    style={{
                      width: "100%",
                      borderBottomWidth: 1,
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        width: "10%",
                        borderRightWidth: 1,
                        height: 12,
                      }}
                    >
                      <Text style={styles.text}>g)</Text>
                    </View>
                    <View
                      style={{
                        width: "70%",
                        borderRightWidth: 1,
                        height: 12,
                      }}
                    >
                      <Text
                        style={[
                          styles.text,
                          { textAlign: "left", paddingLeft: 2 },
                        ]}
                      >
                        Transport Allowances
                      </Text>
                    </View>
                    <View style={{ width: "20%", height: 12 }}>
                      <Text style={styles.text}>NIL</Text>
                    </View>
                  </View>
                  <View
                    style={{
                      width: "100%",
                      borderBottomWidth: 1,
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        width: "10%",
                        borderRightWidth: 1,
                        height: 12,
                      }}
                    >
                      <Text style={styles.text}>h)</Text>
                    </View>
                    <View
                      style={{
                        width: "70%",
                        borderRightWidth: 1,
                        height: 12,
                      }}
                    >
                      <Text
                        style={[
                          styles.text,
                          { textAlign: "left", paddingLeft: 2 },
                        ]}
                      >
                        Others, if any( Please Specify )
                      </Text>
                    </View>
                    <View style={{ width: "20%", height: 12 }}>
                      <Text style={styles.text}>NIL</Text>
                    </View>
                  </View>
                  <View
                    style={{
                      width: "100%",
                      borderBottomWidth: 0,
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={[
                        styles.text,
                        { textAlign: "left", paddingLeft: 2 },
                      ]}
                    >
                      TOTAL INCOME FROM OTHER SOURCES
                    </Text>
                  </View>
                </View>

                <View style={{ width: "25%", height: 105 }}>
                  <View
                    style={{
                      width: "100%",
                      height: 94,
                      borderBottomWidth: 1,
                    }}
                  ></View>
                  <Text style={styles.text}>
                    Rs. {IndianFormat(BankInterest)}
                  </Text>
                </View>
              </View>
              <View
                style={[
                  styles.tableStartBorderView2,
                  {
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    borderLeftWidth: 1,
                    borderRightWidth: 1,
                    borderTopWidth: 0,
                    borderBottomWidth: 1,
                  },
                ]}
              >
                <View
                  style={{
                    width: "5%",

                    justifyContent: "center",
                    textAlign: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.text}>3</Text>
                </View>
                <View
                  style={{
                    width: "70%",
                    borderWidth: 1,
                    borderTopWidth: 0,
                    borderBottomWidth: 0,
                  }}
                >
                  <Text
                    style={[styles.text, { textAlign: "left", paddingLeft: 2 }]}
                  >
                    GROSS INCOME
                  </Text>
                </View>

                <View style={{ width: "25%" }}>
                  <Text style={styles.text}>
                    Rs. {IndianFormat(AllGross + BankInterest)}
                  </Text>
                </View>
              </View>
              <View
                style={[
                  styles.tableStartBorderView2,
                  {
                    marginTop: 2,
                    borderWidth: 1,
                    borderBottomWidth: 0,
                    justifyContent: "center",
                    paddingLeft: 5,
                  },
                ]}
              >
                <Text style={[styles.text3]}>
                  LESS:- HOUSE RENT EXEMPTION U/S 10 ( 13 A ) OF I.T. ACT, 1961
                </Text>
              </View>
              <View
                style={[
                  styles.tableStartBorderView2,
                  {
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    borderLeftWidth: 1,
                    borderRightWidth: 1,
                    borderTopWidth: 0,
                    borderBottomWidth: 1,
                  },
                ]}
              >
                <View
                  style={{
                    width: "5%",
                    height: 65,
                    justifyContent: "center",
                    textAlign: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.text}>4</Text>
                </View>
                <View
                  style={{
                    width: "70%",
                    borderWidth: 1,
                    borderTopWidth: 0,
                    borderBottomWidth: 0,
                    height: 65,
                  }}
                >
                  <View
                    style={{
                      width: "100%",
                      borderBottomWidth: 1,
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <View style={{ width: "80%", borderRightWidth: 1 }}>
                      <Text
                        style={[
                          styles.text,
                          { textAlign: "left", paddingLeft: 2 },
                        ]}
                      >
                        H. R. A Received from Employer
                      </Text>
                    </View>
                    <View style={{ width: "12.5%" }}>
                      <Text style={styles.text}> </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      width: "100%",
                      borderBottomWidth: 1,
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <View style={{ width: "10%", borderRightWidth: 1 }}>
                      <Text style={styles.text}>a)</Text>
                    </View>
                    <View style={{ width: "50%", borderRightWidth: 1 }}>
                      <Text
                        style={[
                          styles.text,
                          { textAlign: "left", paddingLeft: 2 },
                        ]}
                      >
                        Actual House Rent Allowance
                      </Text>
                    </View>
                    <View style={{ width: "20%", borderRightWidth: 1 }}>
                      <Text style={styles.text}> </Text>
                    </View>
                    <View style={{ width: "15%" }}>
                      <Text style={styles.text}> </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      width: "100%",
                      borderBottomWidth: 1,
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <View style={{ width: "10%", borderRightWidth: 1 }}>
                      <Text style={styles.text}>b)</Text>
                    </View>
                    <View style={{ width: "50%", borderRightWidth: 1 }}>
                      <Text
                        style={[
                          styles.text,
                          { textAlign: "left", paddingLeft: 2 },
                        ]}
                      >
                        40% of Salary ( For Non Metro City )
                      </Text>
                    </View>
                    <View style={{ width: "20%", borderRightWidth: 1 }}>
                      <Text style={styles.text}> </Text>
                    </View>
                    <View style={{ width: "20%" }}>
                      <Text style={styles.text}> </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      width: "100%",
                      borderBottomWidth: 1,
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <View style={{ width: "10%", borderRightWidth: 1 }}>
                      <Text style={styles.text}>c)</Text>
                    </View>
                    <View style={{ width: "50%", borderRightWidth: 1 }}>
                      <Text
                        style={[
                          styles.text,
                          { textAlign: "left", paddingLeft: 2 },
                        ]}
                      >
                        Rent Paid over 10% of sotary
                      </Text>
                    </View>
                    <View style={{ width: "20%", borderRightWidth: 1 }}>
                      <Text style={styles.text}> </Text>
                    </View>
                    <View style={{ width: "20%" }}>
                      <Text style={styles.text}> </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      width: "100%",
                      borderBottomWidth: 1,
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <View style={{ width: "80%", borderRightWidth: 1 }}>
                      <Text
                        style={[
                          styles.text,
                          { textAlign: "left", paddingLeft: 2 },
                        ]}
                      >
                        Less :- Lower of the above ( a / b / c ) exempted U/S.10
                        ( 13 A )
                      </Text>
                    </View>
                    <View style={{ width: "12.5%" }}>
                      <Text style={styles.text}> </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      width: "100%",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={[
                        styles.text,
                        { textAlign: "left", paddingLeft: 2 },
                      ]}
                    >
                      House Rent Allowance Exempted / Taxable House Rent
                      Allowance
                    </Text>
                  </View>
                </View>

                <View style={{ width: "25%", height: 65 }}>
                  <View
                    style={{
                      width: "100%",
                      height: 56,
                      borderBottomWidth: 1,
                    }}
                  ></View>
                  <Text style={styles.text}>NOT APPLICABLE</Text>
                </View>
                <View
                  style={{
                    width: 85,
                    height: 1,
                    backgroundColor: "black",
                    transform: "rotate(-30deg)",
                    left: 315,
                    top: 32,
                    position: "absolute",
                  }}
                ></View>
              </View>
              <View
                style={[
                  styles.tableStartBorderView2,
                  {
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    borderLeftWidth: 1,
                    borderRightWidth: 1,
                    borderTopWidth: 0,
                    borderBottomWidth: 1,
                  },
                ]}
              >
                <View
                  style={{
                    width: "5%",
                    justifyContent: "center",
                    textAlign: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.text}>5</Text>
                </View>
                <View
                  style={{
                    width: "95%",
                    borderLeftWidth: 1,
                  }}
                >
                  <View
                    style={{
                      width: "100%",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <View style={{ width: "73.7%", borderRightWidth: 1 }}>
                      <Text
                        style={[
                          styles.text,
                          { textAlign: "left", paddingLeft: 2 },
                        ]}
                      >
                        BALANCE ( 3 - 4 )
                      </Text>
                    </View>

                    <View style={{ width: "25%" }}>
                      <Text style={styles.text}>
                        Rs. {IndianFormat(AllGross + BankInterest)}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <View
                style={[
                  styles.tableStartBorderView2,
                  {
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    borderLeftWidth: 1,
                    borderRightWidth: 1,
                    borderTopWidth: 0,
                    borderBottomWidth: 1,
                  },
                ]}
              >
                <View
                  style={{
                    width: "5%",
                    justifyContent: "center",
                    textAlign: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.text}>6</Text>
                </View>
                <View
                  style={{
                    width: "95%",
                    borderLeftWidth: 1,
                  }}
                >
                  <View
                    style={{
                      width: "100%",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <View style={{ width: "73.7%", borderRightWidth: 1 }}>
                      <Text
                        style={[
                          styles.text,
                          { textAlign: "left", paddingLeft: 2 },
                        ]}
                      >
                        Less : - Conveyance / Washing / N.G. Allowance / any
                        Other Allowance
                      </Text>
                    </View>

                    <View style={{ width: "25%" }}>
                      <Text style={styles.text}>NIL</Text>
                    </View>
                  </View>
                </View>
              </View>
              <View
                style={[
                  styles.tableStartBorderView2,
                  {
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    borderLeftWidth: 1,
                    borderRightWidth: 1,
                    borderTopWidth: 0,
                    borderBottomWidth: 1,
                  },
                ]}
              >
                <View
                  style={{
                    width: "5%",
                    justifyContent: "center",
                    textAlign: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.text}>7</Text>
                </View>
                <View
                  style={{
                    width: "95%",
                    borderLeftWidth: 1,
                  }}
                >
                  <View
                    style={{
                      width: "100%",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <View style={{ width: "73.7%", borderRightWidth: 1 }}>
                      <Text
                        style={[
                          styles.text,
                          { textAlign: "left", paddingLeft: 2 },
                        ]}
                      >
                        BALANCE (5-6)
                      </Text>
                    </View>

                    <View style={{ width: "25%" }}>
                      <Text style={styles.text}>
                        Rs. {IndianFormat(AllGross + BankInterest)}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <View
                style={[
                  styles.tableStartBorderView2,
                  {
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    borderLeftWidth: 1,
                    borderRightWidth: 1,
                    borderTopWidth: 0,
                    borderBottomWidth: 1,
                  },
                ]}
              >
                <View
                  style={{
                    width: "5%",
                    justifyContent: "center",
                    textAlign: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.text}>8</Text>
                </View>
                <View
                  style={{
                    width: "95%",
                    borderLeftWidth: 1,
                  }}
                >
                  <View
                    style={{
                      width: "100%",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <View style={{ width: "73.7%", borderRightWidth: 1 }}>
                      <Text
                        style={[
                          styles.text,
                          { textAlign: "left", paddingLeft: 2 },
                        ]}
                      >
                        Less :- Standard Deduction for Salaried
                      </Text>
                    </View>

                    <View style={{ width: "25%" }}>
                      <Text style={styles.text}>Rs. {IndianFormat(50000)}</Text>
                    </View>
                  </View>
                </View>
              </View>
              <View
                style={[
                  styles.tableStartBorderView2,
                  {
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    borderLeftWidth: 1,
                    borderRightWidth: 1,
                    borderTopWidth: 0,
                    borderBottomWidth: 1,
                  },
                ]}
              >
                <View
                  style={{
                    width: "5%",
                    justifyContent: "center",
                    textAlign: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.text}>9</Text>
                </View>
                <View
                  style={{
                    width: "95%",
                    borderLeftWidth: 1,
                  }}
                >
                  <View
                    style={{
                      width: "100%",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <View style={{ width: "73.7%", borderRightWidth: 1 }}>
                      <Text
                        style={[
                          styles.text,
                          { textAlign: "left", paddingLeft: 2 },
                        ]}
                      >
                        BALANCE( 8 - 9 )
                      </Text>
                    </View>

                    <View style={{ width: "25%" }}>
                      <Text style={styles.text}>
                        Rs. {IndianFormat(AllGross + BankInterest - 50000)}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <View
                style={[
                  styles.tableStartBorderView2,
                  {
                    marginTop: 2,
                    borderWidth: 1,
                    borderBottomWidth: 0,
                    justifyContent: "center",
                    paddingLeft: 5,
                  },
                ]}
              >
                <Text style={[styles.text3]}>EXEMPTTON U/ S 16</Text>
              </View>
              <View
                style={[
                  styles.tableStartBorderView2,
                  {
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    borderLeftWidth: 1,
                    borderRightWidth: 1,
                    borderTopWidth: 0,
                    borderBottomWidth: 1,
                  },
                ]}
              >
                <View
                  style={{
                    width: "5%",
                    height: 40,
                    justifyContent: "center",
                    textAlign: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.text}>10</Text>
                </View>
                <View
                  style={{
                    width: "70%",
                    borderWidth: 1,
                    borderTopWidth: 0,
                    borderBottomWidth: 0,
                    height: 40,
                  }}
                >
                  <View
                    style={{
                      width: "100%",
                      borderBottomWidth: 1,
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <View style={{ width: "10%", borderRightWidth: 1 }}>
                      <Text style={styles.text}>a)</Text>
                    </View>
                    <View style={{ width: "70%", borderRightWidth: 1 }}>
                      <Text
                        style={[
                          styles.text,
                          { textAlign: "left", paddingLeft: 2 },
                        ]}
                      >
                        Professional Tax ( P. Tax )
                      </Text>
                    </View>

                    <View style={{ width: "20%" }}>
                      {grossPTax !== 0 ? (
                        <Text style={styles.text}>
                          Rs. {IndianFormat(grossPTax)}
                        </Text>
                      ) : (
                        <Text style={styles.text}>NIL</Text>
                      )}
                    </View>
                  </View>
                  <View
                    style={{
                      width: "100%",
                      borderBottomWidth: 1,
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <View style={{ width: "10%", borderRightWidth: 1 }}>
                      <Text style={styles.text}>b)</Text>
                    </View>
                    <View style={{ width: "70%", borderRightWidth: 1 }}>
                      <Text
                        style={[
                          styles.text,
                          { textAlign: "left", paddingLeft: 2 },
                        ]}
                      >
                        Entertainment Allowance
                      </Text>
                    </View>

                    <View style={{ width: "20%" }}>
                      <Text style={styles.text}>NIL</Text>
                    </View>
                  </View>
                  <View
                    style={{
                      width: "100%",
                      borderBottomWidth: 1,
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <View style={{ width: "10%", borderRightWidth: 1 }}>
                      <Text style={styles.text}>c)</Text>
                    </View>
                    <View style={{ width: "70%", borderRightWidth: 1 }}>
                      <Text
                        style={[
                          styles.text,
                          { textAlign: "left", paddingLeft: 2 },
                        ]}
                      >
                        Leave Travel Allowance
                      </Text>
                    </View>

                    <View style={{ width: "20%" }}>
                      <Text style={styles.text}>NIL</Text>
                    </View>
                  </View>
                  <View
                    style={{
                      width: "100%",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={[
                        styles.text,
                        { textAlign: "left", paddingLeft: 2 },
                      ]}
                    >
                      TOTAL EXEMPTION U/S 16
                    </Text>
                  </View>
                </View>

                <View style={{ width: "25%", height: 40 }}>
                  <View
                    style={{
                      width: "100%",
                      height: 34,
                      borderBottomWidth: 1,
                    }}
                  ></View>
                  {grossPTax !== 0 ? (
                    <Text style={styles.text}>
                      Rs. {IndianFormat(grossPTax)}
                    </Text>
                  ) : (
                    <Text style={styles.text}>NIL</Text>
                  )}
                </View>
              </View>
              <View
                style={[
                  styles.tableStartBorderView2,
                  {
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    borderLeftWidth: 1,
                    borderRightWidth: 1,
                    borderTopWidth: 0,
                    borderBottomWidth: 1,
                  },
                ]}
              >
                <View
                  style={{
                    width: "5%",
                    justifyContent: "center",
                    textAlign: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.text}>11</Text>
                </View>
                <View
                  style={{
                    width: "95%",
                    borderLeftWidth: 1,
                  }}
                >
                  <View
                    style={{
                      width: "100%",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <View style={{ width: "73.7%", borderRightWidth: 1 }}>
                      <Text
                        style={[
                          styles.text,
                          { textAlign: "left", paddingLeft: 2 },
                        ]}
                      >
                        BALANCE( 9 - 10 )
                      </Text>
                    </View>

                    <View style={{ width: "25%" }}>
                      <Text style={styles.text}>
                        Rs.{" "}
                        {IndianFormat(
                          AllGross + BankInterest - 50000 - grossPTax
                        )}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <View
                style={[
                  styles.tableStartBorderView2,
                  {
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    borderLeftWidth: 1,
                    borderRightWidth: 1,
                    borderTopWidth: 0,
                    borderBottomWidth: 1,
                  },
                ]}
              >
                <View
                  style={{
                    width: "5%",
                    justifyContent: "center",
                    textAlign: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.text}>12</Text>
                </View>
                <View
                  style={{
                    width: "95%",
                    borderLeftWidth: 1,
                  }}
                >
                  <View
                    style={{
                      width: "100%",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <View style={{ width: "73.7%", borderRightWidth: 1 }}>
                      <Text
                        style={[
                          styles.text,
                          { textAlign: "left", paddingLeft: 2 },
                        ]}
                      >
                        Less:- House Building Loan Interest U/S 24 ( b )
                      </Text>
                    </View>

                    <View style={{ width: "25%" }}>
                      <Text style={styles.text}>
                        Rs. {IndianFormat(hbLoanInterest)}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <View
                style={[
                  styles.tableStartBorderView2,
                  {
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    borderLeftWidth: 1,
                    borderRightWidth: 1,
                    borderTopWidth: 0,
                    borderBottomWidth: 1,
                  },
                ]}
              >
                <View
                  style={{
                    width: "5%",
                    justifyContent: "center",
                    textAlign: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.text}>13</Text>
                </View>
                <View
                  style={{
                    width: "95%",
                    borderLeftWidth: 1,
                  }}
                >
                  <View
                    style={{
                      width: "100%",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <View style={{ width: "73.7%", borderRightWidth: 1 }}>
                      <Text
                        style={[
                          styles.text,
                          { textAlign: "left", paddingLeft: 2 },
                        ]}
                      >
                        Less:- Loss from House Property U/S 57
                      </Text>
                    </View>

                    <View style={{ width: "25%" }}>
                      <Text style={styles.text}>NIL</Text>
                    </View>
                  </View>
                </View>
              </View>
              <View
                style={[
                  styles.tableStartBorderView2,
                  {
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    borderLeftWidth: 1,
                    borderRightWidth: 1,
                    borderTopWidth: 0,
                    borderBottomWidth: 1,
                  },
                ]}
              >
                <View
                  style={{
                    width: "5%",
                    justifyContent: "center",
                    textAlign: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.text}>14</Text>
                </View>
                <View
                  style={{
                    width: "95%",
                    borderLeftWidth: 1,
                  }}
                >
                  <View
                    style={{
                      width: "100%",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <View style={{ width: "73.7%", borderRightWidth: 1 }}>
                      <Text
                        style={[
                          styles.text,
                          { textAlign: "left", paddingLeft: 2 },
                        ]}
                      >
                        GROSS TOTAL INCOME
                      </Text>
                    </View>

                    <View style={{ width: "25%" }}>
                      <Text style={styles.text}>
                        Rs.{" "}
                        {IndianFormat(
                          AllGross +
                            BankInterest -
                            50000 -
                            grossPTax -
                            hbLoanInterest
                        )}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <View
                style={[
                  styles.tableStartBorderView2,
                  {
                    marginTop: 2,
                    borderWidth: 1,
                    borderBottomWidth: 0,
                    justifyContent: "center",
                    paddingLeft: 5,
                  },
                ]}
              >
                <Text style={[styles.text3]}>
                  DEDUCTION U / S 80 C , 80 CCC, AND 80 CCD ( MAXIMUM LIMIT Rs
                  150000/- )
                </Text>
              </View>
              <View
                style={[
                  styles.tableStartBorderView2,
                  {
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    borderLeftWidth: 1,
                    borderRightWidth: 1,
                    borderTopWidth: 0,
                    borderBottomWidth: 1,
                  },
                ]}
              >
                <View
                  style={{
                    width: "5%",
                    height: 120,
                    justifyContent: "center",
                    textAlign: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.text}>15</Text>
                </View>
                <View
                  style={{
                    width: "70%",
                    borderWidth: 1,
                    borderTopWidth: 0,
                    borderBottomWidth: 0,
                    height: 120,
                  }}
                >
                  <View
                    style={{
                      width: "100%",
                      borderBottomWidth: 1,
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <View style={{ width: "10%", borderRightWidth: 1 }}>
                      <Text style={styles.text}>a)</Text>
                    </View>
                    <View style={{ width: "70%", borderRightWidth: 1 }}>
                      <Text
                        style={[
                          styles.text,
                          { textAlign: "left", paddingLeft: 2 },
                        ]}
                      >
                        G. P. F Subsxiption
                      </Text>
                    </View>

                    <View style={{ width: "20%" }}>
                      <Text style={styles.text}>
                        Rs. {IndianFormat(grossGPF)}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      width: "100%",
                      borderBottomWidth: 1,
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <View style={{ width: "10%", borderRightWidth: 1 }}>
                      <Text style={styles.text}>b)</Text>
                    </View>
                    <View style={{ width: "70%", borderRightWidth: 1 }}>
                      <Text
                        style={[
                          styles.text,
                          { textAlign: "left", paddingLeft: 2 },
                        ]}
                      >
                        G. S. L. I. Subsctiption
                      </Text>
                    </View>

                    <View style={{ width: "20%" }}>
                      {grossGSLI !== 0 ? (
                        <Text style={styles.text}>
                          Rs. {IndianFormat(grossGSLI)}
                        </Text>
                      ) : (
                        <Text style={styles.text}>NIL</Text>
                      )}
                    </View>
                  </View>
                  <View
                    style={{
                      width: "100%",
                      borderBottomWidth: 1,
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <View style={{ width: "10%", borderRightWidth: 1 }}>
                      <Text style={styles.text}>c)</Text>
                    </View>
                    <View style={{ width: "70%", borderRightWidth: 1 }}>
                      <Text
                        style={[
                          styles.text,
                          { textAlign: "left", paddingLeft: 2 },
                        ]}
                      >
                        Recovery of Principal Amount of House Building Loan
                      </Text>
                    </View>

                    <View style={{ width: "20%" }}>
                      {hbLoanInterest !== 0 ? (
                        <Text style={styles.text}>
                          Rs. {IndianFormat(hbLoanInterest)}
                        </Text>
                      ) : (
                        <Text style={styles.text}>NIL</Text>
                      )}
                    </View>
                  </View>
                  <View
                    style={{
                      width: "100%",
                      borderBottomWidth: 1,
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <View style={{ width: "10%", borderRightWidth: 1 }}>
                      <Text style={styles.text}>d)</Text>
                    </View>
                    <View style={{ width: "70%", borderRightWidth: 1 }}>
                      <Text
                        style={[
                          styles.text,
                          { textAlign: "left", paddingLeft: 2 },
                        ]}
                      >
                        L. I. C. I /PLl Premium
                      </Text>
                    </View>

                    <View style={{ width: "20%" }}>
                      {lic !== 0 ? (
                        <Text style={styles.text}>Rs. {IndianFormat(lic)}</Text>
                      ) : (
                        <Text style={styles.text}>NIL</Text>
                      )}
                    </View>
                  </View>
                  <View
                    style={{
                      width: "100%",
                      borderBottomWidth: 1,
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <View style={{ width: "10%", borderRightWidth: 1 }}>
                      <Text style={styles.text}>e)</Text>
                    </View>
                    <View style={{ width: "70%", borderRightWidth: 1 }}>
                      <Text
                        style={[
                          styles.text,
                          { textAlign: "left", paddingLeft: 2 },
                        ]}
                      >
                        Contribution in ULIP
                      </Text>
                    </View>

                    <View style={{ width: "20%" }}>
                      {ulip !== 0 ? (
                        <Text style={styles.text}>
                          Rs. {IndianFormat(ulip)}
                        </Text>
                      ) : (
                        <Text style={styles.text}>NIL</Text>
                      )}
                    </View>
                  </View>
                  <View
                    style={{
                      width: "100%",
                      borderBottomWidth: 1,
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <View style={{ width: "10%", borderRightWidth: 1 }}>
                      <Text style={styles.text}>f)</Text>
                    </View>
                    <View style={{ width: "70%", borderRightWidth: 1 }}>
                      <Text
                        style={[
                          styles.text,
                          { textAlign: "left", paddingLeft: 2 },
                        ]}
                      >
                        Savings under CTD Rule , 1959 / P P F
                      </Text>
                    </View>

                    <View style={{ width: "20%" }}>
                      {ppf !== 0 ? (
                        <Text style={styles.text}>Rs. {IndianFormat(ppf)}</Text>
                      ) : (
                        <Text style={styles.text}>NIL</Text>
                      )}
                    </View>
                  </View>
                  <View
                    style={{
                      width: "100%",
                      borderBottomWidth: 1,
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <View style={{ width: "10%", borderRightWidth: 1 }}>
                      <Text style={styles.text}>g)</Text>
                    </View>
                    <View style={{ width: "70%", borderRightWidth: 1 }}>
                      <Text
                        style={[
                          styles.text,
                          { textAlign: "left", paddingLeft: 2 },
                        ]}
                      >
                        NSC / KVP purchase
                      </Text>
                    </View>

                    <View style={{ width: "20%" }}>
                      {nsc !== 0 ? (
                        <Text style={styles.text}>Rs. {IndianFormat(nsc)}</Text>
                      ) : (
                        <Text style={styles.text}>NIL</Text>
                      )}
                    </View>
                  </View>
                  <View
                    style={{
                      width: "100%",
                      borderBottomWidth: 1,
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <View style={{ width: "10%", borderRightWidth: 1 }}>
                      <Text style={styles.text}>h)</Text>
                    </View>
                    <View style={{ width: "70%", borderRightWidth: 1 }}>
                      <Text
                        style={[
                          styles.text,
                          { textAlign: "left", paddingLeft: 2 },
                        ]}
                      >
                        Interest on NSC deemed to hove been reinvested
                      </Text>
                    </View>

                    <View style={{ width: "20%" }}>
                      {nscInterest !== 0 ? (
                        <Text style={styles.text}>
                          Rs. {IndianFormat(nscInterest)}
                        </Text>
                      ) : (
                        <Text style={styles.text}>NIL</Text>
                      )}
                    </View>
                  </View>
                  <View
                    style={{
                      width: "100%",
                      borderBottomWidth: 1,
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <View style={{ width: "10%", borderRightWidth: 1 }}>
                      <Text style={styles.text}>h)</Text>
                    </View>
                    <View style={{ width: "70%", borderRightWidth: 1 }}>
                      <Text
                        style={[
                          styles.text,
                          { textAlign: "left", paddingLeft: 2 },
                        ]}
                      >
                        Tution Fees Maximum Rs. 1,00,000/- (for two childern )
                      </Text>
                    </View>

                    <View style={{ width: "20%" }}>
                      {tutionFee !== 0 ? (
                        <Text style={styles.text}>
                          Rs. {IndianFormat(tutionFee)}
                        </Text>
                      ) : (
                        <Text style={styles.text}>NIL</Text>
                      )}
                    </View>
                  </View>
                  <View
                    style={{
                      width: "100%",
                      borderBottomWidth: 1,
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <View style={{ width: "10%", borderRightWidth: 1 }}>
                      <Text style={styles.text}>i)</Text>
                    </View>
                    <View style={{ width: "70%", borderRightWidth: 1 }}>
                      <Text
                        style={[
                          styles.text,
                          { textAlign: "left", paddingLeft: 2 },
                        ]}
                      >
                        Stamp Duty / Registration Fee
                      </Text>
                    </View>

                    <View style={{ width: "20%" }}>
                      {stampDuty !== 0 ? (
                        <Text style={styles.text}>
                          Rs. {IndianFormat(stampDuty)}
                        </Text>
                      ) : (
                        <Text style={styles.text}>NIL</Text>
                      )}
                    </View>
                  </View>
                  {sukanya > 0 && (
                    <View
                      style={{
                        width: "100%",
                        borderBottomWidth: 1,
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "center",
                      }}
                    >
                      <View style={{ width: "10%", borderRightWidth: 1 }}>
                        <Text style={styles.text}>j)</Text>
                      </View>
                      <View style={{ width: "70%", borderRightWidth: 1 }}>
                        <Text
                          style={[
                            styles.text,
                            { textAlign: "left", paddingLeft: 2 },
                          ]}
                        >
                          Sukanya Samridhdhi Yojona Premium
                        </Text>
                      </View>

                      <View style={{ width: "20%" }}>
                        {sukanya !== 0 ? (
                          <Text style={styles.text}>
                            Rs. {IndianFormat(sukanya)}
                          </Text>
                        ) : (
                          <Text style={styles.text}>NIL</Text>
                        )}
                      </View>
                    </View>
                  )}
                  <View
                    style={{
                      width: "100%",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={[
                        styles.text,
                        { textAlign: "left", paddingLeft: 2 },
                      ]}
                    >
                      TOTAL
                    </Text>
                  </View>
                </View>

                <View style={{ width: "25%", height: 120 }}>
                  <View
                    style={{
                      width: "100%",
                      height: 115,
                      borderBottomWidth: 1,
                    }}
                  ></View>
                  <Text style={styles.text}>Rs. {IndianFormat(limitVIA)}</Text>
                </View>
              </View>
              <View
                style={{
                  justifyContent: "flex-end",
                  width: "100%",
                  marginTop: 10,
                  marginBottom: 10,
                }}
              >
                <Text
                  style={[
                    styles.text,
                    { textAlign: "right", paddingRight: 20 },
                  ]}
                >
                  Contd...2
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Page>
      <Page size="A4" orientation="portrait" style={styles.page}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center",
            width: "95%",
          }}
        >
          <View style={styles.pageMainView}>
            <View style={styles.mainBorderView}>
              <Text style={[styles.text, { marginTop: 5 }]}>PAGE. 2</Text>

              <View
                style={[
                  styles.tableStartBorderView2,
                  {
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    borderWidth: 1,
                  },
                ]}
              >
                <View
                  style={{
                    width: "5%",
                    justifyContent: "center",
                    textAlign: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.text}>16</Text>
                </View>
                <View
                  style={{
                    width: "95%",
                    borderLeftWidth: 1,
                  }}
                >
                  <View
                    style={{
                      width: "100%",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <View style={{ width: "73.7%", borderRightWidth: 1 }}>
                      <Text
                        style={[
                          styles.text,
                          { textAlign: "left", paddingLeft: 2 },
                        ]}
                      >
                        BALANCE ( 14 - 15 )
                      </Text>
                    </View>

                    <View style={{ width: "25%" }}>
                      <Text style={styles.text}>
                        Rs.{" "}
                        {IndianFormat(
                          AllGross +
                            BankInterest -
                            50000 -
                            grossPTax -
                            hbLoanInterest -
                            limitVIA
                        )}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <View
                style={[
                  styles.tableStartBorderView2,
                  {
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    borderLeftWidth: 1,
                    borderRightWidth: 1,
                    borderTopWidth: 0,
                    borderBottomWidth: 1,
                  },
                ]}
              >
                <View
                  style={{
                    width: "5%",
                    justifyContent: "center",
                    textAlign: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.text}>17</Text>
                </View>
                <View
                  style={{
                    width: "95%",
                    borderLeftWidth: 1,
                  }}
                >
                  <View
                    style={{
                      width: "100%",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <View style={{ width: "73.7%", borderRightWidth: 1 }}>
                      <Text
                        style={[
                          styles.text,
                          { textAlign: "left", paddingLeft: 2 },
                        ]}
                      >
                        Less :- Additional Deduction U/S 80 CCD ( 1B ) NPS (
                        Maximum Rs. 50000/- )
                      </Text>
                    </View>

                    <View style={{ width: "25%" }}>
                      <Text style={styles.text}>NIL</Text>
                    </View>
                  </View>
                </View>
              </View>
              <View
                style={[
                  styles.tableStartBorderView2,
                  {
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    borderLeftWidth: 1,
                    borderRightWidth: 1,
                    borderTopWidth: 0,
                    borderBottomWidth: 1,
                  },
                ]}
              >
                <View
                  style={{
                    width: "5%",
                    justifyContent: "center",
                    textAlign: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.text}>18</Text>
                </View>
                <View
                  style={{
                    width: "95%",
                    borderLeftWidth: 1,
                  }}
                >
                  <View
                    style={{
                      width: "100%",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <View style={{ width: "73.7%", borderRightWidth: 1 }}>
                      <Text
                        style={[
                          styles.text,
                          { textAlign: "left", paddingLeft: 2 },
                        ]}
                      >
                        BALANCE ( 16 - 17 )
                      </Text>
                    </View>

                    <View style={{ width: "25%" }}>
                      <Text style={styles.text}>
                        Rs.{" "}
                        {IndianFormat(
                          AllGross +
                            BankInterest -
                            50000 -
                            grossPTax -
                            hbLoanInterest -
                            limitVIA
                        )}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <View
                style={[
                  styles.tableStartBorderView2,
                  {
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    borderLeftWidth: 1,
                    borderRightWidth: 1,
                    borderTopWidth: 0,
                    borderBottomWidth: 1,
                  },
                ]}
              >
                <Text style={[styles.text3]}>DEDUCTION OF OTHER SECTION</Text>
              </View>
              <View
                style={[
                  styles.tableStartBorderView2,
                  {
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    borderLeftWidth: 1,
                    borderRightWidth: 1,
                    borderTopWidth: 0,
                    borderBottomWidth: 1,
                  },
                ]}
              >
                <View
                  style={{
                    width: "5%",
                    height: 95,
                    justifyContent: "center",
                    textAlign: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.text}>19</Text>
                </View>
                <View
                  style={{
                    width: "70%",
                    borderWidth: 1,
                    borderTopWidth: 0,
                    borderBottomWidth: 0,
                    height: 95,
                  }}
                >
                  <View
                    style={{
                      width: "100%",
                      borderBottomWidth: 1,
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <View style={{ width: "10%", borderRightWidth: 1 }}>
                      <Text style={styles.text}>a)</Text>
                    </View>
                    <View style={{ width: "70%", borderRightWidth: 1 }}>
                      <Text
                        style={[
                          styles.text,
                          { textAlign: "left", paddingLeft: 2 },
                        ]}
                      >
                        80 D Medical Insurance Premium
                      </Text>
                    </View>

                    <View style={{ width: "20%" }}>
                      {mediclaim !== 0 ? (
                        <Text style={styles.text}>
                          Rs. {IndianFormat(mediclaim)}
                        </Text>
                      ) : (
                        <Text style={styles.text}>NIL</Text>
                      )}
                    </View>
                  </View>
                  <View
                    style={{
                      width: "100%",
                      borderBottomWidth: 1,
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <View style={{ width: "10%", borderRightWidth: 1 }}>
                      <Text style={styles.text}>b)</Text>
                    </View>
                    <View style={{ width: "70%", borderRightWidth: 1 }}>
                      <Text
                        style={[
                          styles.text,
                          { textAlign: "left", paddingLeft: 2 },
                        ]}
                      >
                        80 DD Medical Treatment of Handicapped
                      </Text>
                    </View>

                    <View style={{ width: "20%" }}>
                      {handicapTreatment !== 0 ? (
                        <Text style={styles.text}>
                          Rs. {IndianFormat(handicapTreatment)}
                        </Text>
                      ) : (
                        <Text style={styles.text}>NIL</Text>
                      )}
                    </View>
                  </View>
                  <View
                    style={{
                      width: "100%",
                      borderBottomWidth: 1,
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <View style={{ width: "10%", borderRightWidth: 1 }}>
                      <Text style={styles.text}>c)</Text>
                    </View>
                    <View style={{ width: "70%", borderRightWidth: 1 }}>
                      <Text
                        style={[
                          styles.text,
                          { textAlign: "left", paddingLeft: 2 },
                        ]}
                      >
                        80DDB Deduction of Medical Treatment
                      </Text>
                    </View>

                    <View style={{ width: "20%" }}>
                      {terminalDisease !== 0 ? (
                        <Text style={styles.text}>
                          Rs. {IndianFormat(terminalDisease)}
                        </Text>
                      ) : (
                        <Text style={styles.text}>NIL</Text>
                      )}
                    </View>
                  </View>
                  <View
                    style={{
                      width: "100%",
                      borderBottomWidth: 1,
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <View style={{ width: "10%", borderRightWidth: 1 }}>
                      <Text style={styles.text}>d)</Text>
                    </View>
                    <View style={{ width: "70%", borderRightWidth: 1 }}>
                      <Text
                        style={[
                          styles.text,
                          { textAlign: "left", paddingLeft: 2 },
                        ]}
                      >
                        80E Repayment of Loan of Higher Educotion
                      </Text>
                    </View>

                    <View style={{ width: "20%" }}>
                      {educationLoan !== 0 ? (
                        <Text style={styles.text}>
                          Rs. {IndianFormat(educationLoan)}
                        </Text>
                      ) : (
                        <Text style={styles.text}>NIL</Text>
                      )}
                    </View>
                  </View>
                  <View
                    style={{
                      width: "100%",
                      borderBottomWidth: 1,
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <View style={{ width: "10%", borderRightWidth: 1 }}>
                      <Text style={styles.text}>e)</Text>
                    </View>
                    <View style={{ width: "70%", borderRightWidth: 1 }}>
                      <Text
                        style={[
                          styles.text,
                          { textAlign: "left", paddingLeft: 2 },
                        ]}
                      >
                        80G Donation of Charitable Institution
                      </Text>
                    </View>

                    <View style={{ width: "20%" }}>
                      {charity !== 0 ? (
                        <Text style={styles.text}>
                          Rs. {IndianFormat(charity)}
                        </Text>
                      ) : (
                        <Text style={styles.text}>NIL</Text>
                      )}
                    </View>
                  </View>
                  <View
                    style={{
                      width: "100%",
                      borderBottomWidth: 1,
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <View style={{ width: "10%", borderRightWidth: 1 }}>
                      <Text style={styles.text}>f)</Text>
                    </View>
                    <View style={{ width: "70%", borderRightWidth: 1 }}>
                      <Text
                        style={[
                          styles.text,
                          { textAlign: "left", paddingLeft: 2 },
                        ]}
                      >
                        80U Person with Disability
                      </Text>
                    </View>

                    <View style={{ width: "20%" }}>
                      {disabilityDeduction !== 0 ? (
                        <Text style={styles.text}>
                          Rs. {IndianFormat(disabilityDeduction)}
                        </Text>
                      ) : (
                        <Text style={styles.text}>NIL</Text>
                      )}
                    </View>
                  </View>
                  <View
                    style={{
                      width: "100%",
                      borderBottomWidth: 1,
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <View style={{ width: "10%", borderRightWidth: 1 }}>
                      <Text style={styles.text}>g)</Text>
                    </View>
                    <View style={{ width: "70%", borderRightWidth: 1 }}>
                      <Text
                        style={[
                          styles.text,
                          { textAlign: "left", paddingLeft: 2 },
                        ]}
                      >
                        80CCG Rajiv Gandhi Equity Savings Scheme
                      </Text>
                    </View>

                    <View style={{ width: "20%" }}>
                      {rgSaving !== 0 ? (
                        <Text style={styles.text}>
                          Rs. {IndianFormat(rgSaving)}
                        </Text>
                      ) : (
                        <Text style={styles.text}>NIL</Text>
                      )}
                    </View>
                  </View>
                  <View
                    style={{
                      width: "100%",
                      borderBottomWidth: 1,
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <View style={{ width: "10%", borderRightWidth: 1 }}>
                      <Text style={styles.text}>h)</Text>
                    </View>
                    <View style={{ width: "70%", borderRightWidth: 1 }}>
                      <Text
                        style={[
                          styles.text,
                          { textAlign: "left", paddingLeft: 2, fontSize: 8 },
                        ]}
                      >
                        80 TTA Exemption of Savings Bank Interest ( Maximum Rs.
                        10000/- )
                      </Text>
                    </View>

                    <View style={{ width: "20%" }}>
                      <Text style={styles.text}>
                        Rs. {IndianFormat(BankInterest)}
                      </Text>
                    </View>
                  </View>

                  <View
                    style={{
                      width: "100%",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={[
                        styles.text,
                        { textAlign: "left", paddingLeft: 2 },
                      ]}
                    >
                      TOTAL
                    </Text>
                  </View>
                </View>

                <View style={{ width: "25%", height: 95 }}>
                  <View
                    style={{
                      width: "100%",
                      height: 90,
                      borderBottomWidth: 1,
                    }}
                  ></View>
                  <Text style={styles.text}>Rs. {IndianFormat(OtherVIA)}</Text>
                </View>
              </View>
              <View
                style={[
                  styles.tableStartBorderView2,
                  {
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    borderLeftWidth: 1,
                    borderRightWidth: 1,
                    borderTopWidth: 0,
                    borderBottomWidth: 1,
                  },
                ]}
              >
                <View
                  style={{
                    width: "5%",
                    justifyContent: "center",
                    textAlign: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.text}>20</Text>
                </View>
                <View
                  style={{
                    width: "95%",
                    borderLeftWidth: 1,
                  }}
                >
                  <View
                    style={{
                      width: "100%",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <View style={{ width: "73.7%", borderRightWidth: 1 }}>
                      <Text
                        style={[
                          styles.text,
                          { textAlign: "left", paddingLeft: 2 },
                        ]}
                      >
                        TOTAL INCOME ( 18 - 19 )
                      </Text>
                    </View>

                    <View style={{ width: "25%" }}>
                      <Text style={styles.text}>
                        Rs. {IndianFormat(TotalIncome)}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <View
                style={[
                  styles.tableStartBorderView2,
                  {
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    borderLeftWidth: 1,
                    borderRightWidth: 1,
                    borderTopWidth: 0,
                    borderBottomWidth: 1,
                  },
                ]}
              >
                <View
                  style={{
                    width: "5%",
                    justifyContent: "center",
                    textAlign: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.text}>21</Text>
                </View>
                <View
                  style={{
                    width: "95%",
                    borderLeftWidth: 1,
                  }}
                >
                  <View
                    style={{
                      width: "100%",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <View style={{ width: "73.7%", borderRightWidth: 1 }}>
                      <Text
                        style={[
                          styles.text,
                          { textAlign: "left", paddingLeft: 2 },
                        ]}
                      >
                        Total Income Rounded off U/S 288A
                      </Text>
                    </View>

                    <View style={{ width: "25%" }}>
                      <Text style={styles.text}>
                        Rs. {IndianFormat(TotalRoundOffIncome)}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <View
                style={[
                  styles.tableStartBorderView2,
                  {
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",

                    borderRightWidth: 1,
                    borderTopWidth: 0,
                    borderBottomWidth: 0,
                  },
                ]}
              >
                <View
                  style={{
                    width: "60%",
                    borderRightWidth: 1,
                    borderBottomWidth: 1,
                    borderLeftWidth: 1,
                  }}
                >
                  <Text style={[styles.text3]}>Calculation of Tax</Text>
                </View>
                <View style={{ width: "40%" }}>
                  <Text style={[styles.text3]}> </Text>
                </View>
              </View>
              <View
                style={[
                  styles.tableStartBorderView2,
                  {
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    borderLeftWidth: 1,
                    borderRightWidth: 1,
                    borderTopWidth: 0,
                    // borderBottomWidth: 1,
                  },
                ]}
              >
                <View
                  style={{
                    width: "60%",
                    borderWidth: 1,
                    borderTopWidth: 0,
                    borderLeftWidth: 0,
                  }}
                >
                  <View
                    style={{
                      width: "100%",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <View style={{ width: "20%", borderRightWidth: 1 }}>
                      <Text style={styles.text}>Sl. No.</Text>
                    </View>
                    <View style={{ width: "50%", borderRightWidth: 1 }}>
                      <Text style={[styles.text, { textAlign: "center" }]}>
                        Male / Female below 50 Years
                      </Text>
                    </View>

                    <View style={{ width: "30%" }}>
                      <Text style={styles.text}>Amount</Text>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    width: "60%",
                    borderWidth: 1,
                    borderTopWidth: 0,
                    borderLeftWidth: 0,
                  }}
                >
                  <View
                    style={{
                      width: "100%",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <View style={{ width: "20%", borderRightWidth: 1 }}>
                      <Text style={styles.text}>1</Text>
                    </View>
                    <View style={{ width: "50%", borderRightWidth: 1 }}>
                      <Text style={[styles.text, { textAlign: "center" }]}>
                        Up to Rs. 2,50,000 = Nil
                      </Text>
                    </View>

                    <View style={{ width: "5%", borderRightWidth: 1 }}>
                      <Text style={styles.text}>Rs.</Text>
                    </View>
                    <View style={{ width: "25%" }}>
                      <Text style={styles.text}>NIL</Text>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    width: "60%",
                    borderWidth: 1,
                    borderTopWidth: 0,
                    borderLeftWidth: 0,
                  }}
                >
                  <View
                    style={{
                      width: "100%",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <View style={{ width: "20%", borderRightWidth: 1 }}>
                      <Text style={styles.text}>2</Text>
                    </View>
                    <View style={{ width: "50%", borderRightWidth: 1 }}>
                      <Text style={[styles.text, { textAlign: "center" }]}>
                        Rs. 2,50,001 - 5,00,000 = 5%
                      </Text>
                    </View>

                    <View style={{ width: "5%", borderRightWidth: 1 }}>
                      <Text style={styles.text}>Rs.</Text>
                    </View>
                    <View style={{ width: "25%" }}>
                      <Text style={styles.text}>
                        {TotalRoundOffIncome > 250000 &&
                        TotalRoundOffIncome > 500000
                          ? IndianFormat(Math.round(12500))
                          : IndianFormat(CalculatedIT)}
                      </Text>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    width: "60%",
                    borderWidth: 1,
                    borderTopWidth: 0,
                    borderLeftWidth: 0,
                  }}
                >
                  <View
                    style={{
                      width: "100%",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <View style={{ width: "20%", borderRightWidth: 1 }}>
                      <Text style={styles.text}>3</Text>
                    </View>
                    <View style={{ width: "50%", borderRightWidth: 1 }}>
                      <Text style={[styles.text, { textAlign: "center" }]}>
                        Rs. 5,00,001 - 10,00,000 = 20%
                      </Text>
                    </View>

                    <View style={{ width: "5%", borderRightWidth: 1 }}>
                      <Text style={styles.text}>Rs.</Text>
                    </View>
                    <View style={{ width: "25%" }}>
                      <Text style={styles.text}>
                        {TotalRoundOffIncome > 500000 &&
                        TotalRoundOffIncome < 1000000
                          ? IndianFormat(
                              Math.round(
                                ((TotalRoundOffIncome - 500000) * 20) / 100
                              )
                            )
                          : "NIL"}
                      </Text>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    width: "60%",
                    borderWidth: 1,
                    borderTopWidth: 0,
                    borderLeftWidth: 0,
                    borderBottomWidth: 0,
                  }}
                >
                  <View
                    style={{
                      width: "100%",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <View style={{ width: "20%", borderRightWidth: 1 }}>
                      <Text style={styles.text}>4</Text>
                    </View>
                    <View style={{ width: "50%", borderRightWidth: 1 }}>
                      <Text style={[styles.text, { textAlign: "center" }]}>
                        Rs. 10,00,001 and above = 30%
                      </Text>
                    </View>

                    <View style={{ width: "5%", borderRightWidth: 1 }}>
                      <Text style={styles.text}>Rs.</Text>
                    </View>
                    <View style={{ width: "25%" }}>
                      <Text style={styles.text}>
                        {TotalRoundOffIncome > 1000000
                          ? IndianFormat(
                              Math.round(
                                ((TotalRoundOffIncome - 1000000) * 30) / 100
                              )
                            )
                          : "NIL"}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <View
                style={[
                  styles.tableStartBorderView2,
                  {
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    borderLeftWidth: 1,
                    borderRightWidth: 1,
                    borderTopWidth: 0,
                    borderBottomWidth: 1,
                  },
                ]}
              >
                <View
                  style={{
                    width: "5%",
                    justifyContent: "center",
                    textAlign: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.text}>22</Text>
                </View>
                <View
                  style={{
                    width: "95%",
                    borderLeftWidth: 1,
                  }}
                >
                  <View
                    style={{
                      width: "100%",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <View style={{ width: "73.7%", borderRightWidth: 1 }}>
                      <Text
                        style={[
                          styles.text,
                          { textAlign: "left", paddingLeft: 2 },
                        ]}
                      >
                        Tax on Total Income
                      </Text>
                    </View>

                    <View style={{ width: "25%" }}>
                      <Text style={styles.text}>
                        Rs. {IndianFormat(CalculatedIT)}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <View
                style={[
                  styles.tableStartBorderView2,
                  {
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    borderLeftWidth: 1,
                    borderRightWidth: 1,
                    borderTopWidth: 0,
                    borderBottomWidth: 1,
                  },
                ]}
              >
                <View
                  style={{
                    width: "5%",
                    justifyContent: "center",
                    textAlign: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.text}>23</Text>
                </View>
                <View
                  style={{
                    width: "95%",
                    borderLeftWidth: 1,
                  }}
                >
                  <View
                    style={{
                      width: "100%",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <View style={{ width: "73.7%", borderRightWidth: 1 }}>
                      <Text
                        style={[
                          styles.text,
                          { textAlign: "left", paddingLeft: 2 },
                        ]}
                      >
                        Less:- Deduction U/S 87A ( Maximum Rs. 12500 for taxable
                        income up to Rs. 500000/ )
                      </Text>
                    </View>

                    <View style={{ width: "25%" }}>
                      <Text style={styles.text}>
                        {isUnderRebate
                          ? `Rs. ${IndianFormat(CalculatedIT)}`
                          : "NIL"}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <View
                style={[
                  styles.tableStartBorderView2,
                  {
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    borderLeftWidth: 1,
                    borderRightWidth: 1,
                    borderTopWidth: 0,
                    borderBottomWidth: 1,
                  },
                ]}
              >
                <View
                  style={{
                    width: "5%",
                    justifyContent: "center",
                    textAlign: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.text}>24</Text>
                </View>
                <View
                  style={{
                    width: "95%",
                    borderLeftWidth: 1,
                  }}
                >
                  <View
                    style={{
                      width: "100%",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <View style={{ width: "73.7%", borderRightWidth: 1 }}>
                      <Text
                        style={[
                          styles.text,
                          { textAlign: "left", paddingLeft: 2 },
                        ]}
                      >
                        Tax payable ( 22 - 23 )
                      </Text>
                    </View>

                    <View style={{ width: "25%" }}>
                      <Text style={styles.text}>
                        {!isUnderRebate
                          ? `Rs. ${IndianFormat(CalculatedIT)}`
                          : "NIL"}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <View
                style={[
                  styles.tableStartBorderView2,
                  {
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    borderLeftWidth: 1,
                    borderRightWidth: 1,
                    borderTopWidth: 0,
                    borderBottomWidth: 1,
                  },
                ]}
              >
                <View
                  style={{
                    width: "5%",
                    justifyContent: "center",
                    textAlign: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.text}>25</Text>
                </View>
                <View
                  style={{
                    width: "95%",
                    borderLeftWidth: 1,
                  }}
                >
                  <View
                    style={{
                      width: "100%",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <View style={{ width: "73.7%", borderRightWidth: 1 }}>
                      <Text
                        style={[
                          styles.text,
                          { textAlign: "left", paddingLeft: 2 },
                        ]}
                      >
                        Add Educdtion Cess + Health Cess @ 4% on Col no.24
                      </Text>
                    </View>

                    <View style={{ width: "25%" }}>
                      <Text style={styles.text}>
                        {!isUnderRebate
                          ? `Rs. ${IndianFormat(eduCess)}`
                          : "N/A"}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <View
                style={[
                  styles.tableStartBorderView2,
                  {
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    borderLeftWidth: 1,
                    borderRightWidth: 1,
                    borderTopWidth: 0,
                    borderBottomWidth: 1,
                  },
                ]}
              >
                <View
                  style={{
                    width: "5%",
                    justifyContent: "center",
                    textAlign: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.text}>26</Text>
                </View>
                <View
                  style={{
                    width: "95%",
                    borderLeftWidth: 1,
                  }}
                >
                  <View
                    style={{
                      width: "100%",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <View style={{ width: "73.7%", borderRightWidth: 1 }}>
                      <Text
                        style={[
                          styles.text,
                          { textAlign: "left", paddingLeft: 2 },
                        ]}
                      >
                        Add surcharge on col. No.24 ( for taxable income over
                        Rs. 10000000/-)
                      </Text>
                    </View>

                    <View style={{ width: "25%" }}>
                      <Text style={styles.text}>N/A</Text>
                    </View>
                  </View>
                </View>
              </View>
              <View
                style={[
                  styles.tableStartBorderView2,
                  {
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    borderLeftWidth: 1,
                    borderRightWidth: 1,
                    borderTopWidth: 0,
                    borderBottomWidth: 1,
                  },
                ]}
              >
                <View
                  style={{
                    width: "5%",
                    justifyContent: "center",
                    textAlign: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.text}>27</Text>
                </View>
                <View
                  style={{
                    width: "95%",
                    borderLeftWidth: 1,
                  }}
                >
                  <View
                    style={{
                      width: "100%",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <View style={{ width: "73.7%", borderRightWidth: 1 }}>
                      <Text
                        style={[
                          styles.text,
                          { textAlign: "left", paddingLeft: 2 },
                        ]}
                      >
                        Tax Payable ( 24 + 25 + 26 )
                      </Text>
                    </View>

                    <View style={{ width: "25%" }}>
                      <Text style={styles.text}>
                        {!isUnderRebate
                          ? `Rs. ${IndianFormat(AddedEduCess)}`
                          : "NIL"}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <View
                style={[
                  styles.tableStartBorderView2,
                  {
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    borderLeftWidth: 1,
                    borderRightWidth: 1,
                    borderTopWidth: 0,
                    borderBottomWidth: 1,
                  },
                ]}
              >
                <View
                  style={{
                    width: "5%",
                    justifyContent: "center",
                    textAlign: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.text}>28</Text>
                </View>
                <View
                  style={{
                    width: "95%",
                    borderLeftWidth: 1,
                  }}
                >
                  <View
                    style={{
                      width: "100%",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <View style={{ width: "73.7%", borderRightWidth: 1 }}>
                      <Text
                        style={[
                          styles.text,
                          { textAlign: "left", paddingLeft: 2 },
                        ]}
                      >
                        Tax Payable Rounded off U/S 288B
                      </Text>
                    </View>

                    <View style={{ width: "25%" }}>
                      <Text style={styles.text}>
                        {!isUnderRebate
                          ? `Rs. ${IndianFormat(roundSo(AddedEduCess, 10))}`
                          : "NIL"}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <View
                style={[
                  styles.tableStartBorderView2,
                  {
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    borderLeftWidth: 1,
                    borderRightWidth: 1,
                    borderTopWidth: 0,
                    borderBottomWidth: 1,
                  },
                ]}
              >
                <View
                  style={{
                    width: "5%",
                    justifyContent: "center",
                    textAlign: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.text}>29</Text>
                </View>
                <View
                  style={{
                    width: "95%",
                    borderLeftWidth: 1,
                  }}
                >
                  <View
                    style={{
                      width: "100%",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <View style={{ width: "73.7%", borderRightWidth: 1 }}>
                      <Text
                        style={[
                          styles.text,
                          { textAlign: "left", paddingLeft: 2 },
                        ]}
                      >
                        Less:- Relief U/S 89 ( 1 ) [ Attach Form 10 E ]
                      </Text>
                    </View>

                    <View style={{ width: "25%" }}>
                      <Text style={styles.text}>NIL</Text>
                    </View>
                  </View>
                </View>
              </View>
              <View
                style={[
                  styles.tableStartBorderView2,
                  {
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    borderLeftWidth: 1,
                    borderRightWidth: 1,
                    borderTopWidth: 0,
                    borderBottomWidth: 1,
                  },
                ]}
              >
                <View
                  style={{
                    width: "5%",
                    justifyContent: "center",
                    textAlign: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.text}>30</Text>
                </View>
                <View
                  style={{
                    width: "95%",
                    borderLeftWidth: 1,
                  }}
                >
                  <View
                    style={{
                      width: "100%",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <View style={{ width: "73.7%", borderRightWidth: 1 }}>
                      <Text
                        style={[
                          styles.text,
                          { textAlign: "left", paddingLeft: 2 },
                        ]}
                      >
                        Balance Tax + Cess after relief U/S 89 ( 1 ) [ 28 - 29]
                      </Text>
                    </View>

                    <View style={{ width: "25%" }}>
                      <Text style={styles.text}>
                        {!isUnderRebate
                          ? `Rs. ${IndianFormat(roundSo(AddedEduCess, 10))}`
                          : "NIL"}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <View
                style={[
                  styles.tableStartBorderView2,
                  {
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRightWidth: 1,
                    borderTopWidth: 0,
                    borderBottomWidth: 0,
                  },
                ]}
              >
                <View
                  style={{
                    width: "60%",
                    borderRightWidth: 1,
                    borderBottomWidth: 1,
                    borderLeftWidth: 1,
                  }}
                >
                  <Text style={[styles.text3]}>
                    TAX DEDUCT FROM SALARY AS FOLLOWS
                  </Text>
                </View>
                <View style={{ width: "40%" }}>
                  <Text style={[styles.text3]}> </Text>
                </View>
              </View>
              <View
                style={[
                  styles.tableStartBorderView2,
                  {
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    borderLeftWidth: 1,
                    borderRightWidth: 1,
                    borderTopWidth: 0,
                    // borderBottomWidth: 1,
                  },
                ]}
              >
                <View
                  style={{
                    width: "60%",
                    borderWidth: 1,
                    borderTopWidth: 0,
                    borderLeftWidth: 0,
                  }}
                >
                  <View
                    style={{
                      width: "100%",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <View style={{ width: "20%", borderRightWidth: 1 }}>
                      <Text style={styles.text}>Sl. No.</Text>
                    </View>
                    <View style={{ width: "50%", borderRightWidth: 1 }}>
                      <Text style={[styles.text, { textAlign: "center" }]}>
                        Month
                      </Text>
                    </View>

                    <View style={{ width: "30%" }}>
                      <Text style={styles.text}>Amount</Text>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    width: "60%",
                    borderWidth: 1,
                    borderTopWidth: 0,
                    borderLeftWidth: 0,
                  }}
                >
                  <View
                    style={{
                      width: "100%",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <View style={{ width: "20%", borderRightWidth: 1 }}>
                      <Text style={styles.text}>1</Text>
                    </View>
                    <View style={{ width: "50%", borderRightWidth: 1 }}>
                      <Text style={[styles.text, { textAlign: "center" }]}>
                        March, {prevYear}
                      </Text>
                    </View>

                    <View style={{ width: "5%", borderRightWidth: 1 }}>
                      <Text style={styles.text}>Rs.</Text>
                    </View>
                    <View style={{ width: "25%" }}>
                      <Text style={styles.text}>NIL</Text>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    width: "60%",
                    borderWidth: 1,
                    borderTopWidth: 0,
                    borderLeftWidth: 0,
                  }}
                >
                  <View
                    style={{
                      width: "100%",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <View style={{ width: "20%", borderRightWidth: 1 }}>
                      <Text style={styles.text}>2</Text>
                    </View>
                    <View style={{ width: "50%", borderRightWidth: 1 }}>
                      <Text style={[styles.text, { textAlign: "center" }]}>
                        April, {prevYear}
                      </Text>
                    </View>

                    <View style={{ width: "5%", borderRightWidth: 1 }}>
                      <Text style={styles.text}>Rs.</Text>
                    </View>
                    <View style={{ width: "25%" }}>
                      <Text style={styles.text}>NIL</Text>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    width: "60%",
                    borderWidth: 1,
                    borderTopWidth: 0,
                    borderLeftWidth: 0,
                  }}
                >
                  <View
                    style={{
                      width: "100%",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <View style={{ width: "20%", borderRightWidth: 1 }}>
                      <Text style={styles.text}>3</Text>
                    </View>
                    <View style={{ width: "50%", borderRightWidth: 1 }}>
                      <Text style={[styles.text, { textAlign: "center" }]}>
                        May, {prevYear}
                      </Text>
                    </View>

                    <View style={{ width: "5%", borderRightWidth: 1 }}>
                      <Text style={styles.text}>Rs.</Text>
                    </View>
                    <View style={{ width: "25%" }}>
                      <Text style={styles.text}>NIL</Text>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    width: "60%",
                    borderWidth: 1,
                    borderTopWidth: 0,
                    borderLeftWidth: 0,
                  }}
                >
                  <View
                    style={{
                      width: "100%",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <View style={{ width: "20%", borderRightWidth: 1 }}>
                      <Text style={styles.text}>4</Text>
                    </View>
                    <View style={{ width: "50%", borderRightWidth: 1 }}>
                      <Text style={[styles.text, { textAlign: "center" }]}>
                        June, {prevYear}
                      </Text>
                    </View>

                    <View style={{ width: "5%", borderRightWidth: 1 }}>
                      <Text style={styles.text}>Rs.</Text>
                    </View>
                    <View style={{ width: "25%" }}>
                      <Text style={styles.text}>NIL</Text>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    width: "60%",
                    borderWidth: 1,
                    borderTopWidth: 0,
                    borderLeftWidth: 0,
                  }}
                >
                  <View
                    style={{
                      width: "100%",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <View style={{ width: "20%", borderRightWidth: 1 }}>
                      <Text style={styles.text}>5</Text>
                    </View>
                    <View style={{ width: "50%", borderRightWidth: 1 }}>
                      <Text style={[styles.text, { textAlign: "center" }]}>
                        July, {prevYear}
                      </Text>
                    </View>

                    <View style={{ width: "5%", borderRightWidth: 1 }}>
                      <Text style={styles.text}>Rs.</Text>
                    </View>
                    <View style={{ width: "25%" }}>
                      <Text style={styles.text}>NIL</Text>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    width: "60%",
                    borderWidth: 1,
                    borderTopWidth: 0,
                    borderLeftWidth: 0,
                  }}
                >
                  <View
                    style={{
                      width: "100%",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <View style={{ width: "20%", borderRightWidth: 1 }}>
                      <Text style={styles.text}>6</Text>
                    </View>
                    <View style={{ width: "50%", borderRightWidth: 1 }}>
                      <Text style={[styles.text, { textAlign: "center" }]}>
                        August, {prevYear}
                      </Text>
                    </View>

                    <View style={{ width: "5%", borderRightWidth: 1 }}>
                      <Text style={styles.text}>Rs.</Text>
                    </View>
                    <View style={{ width: "25%" }}>
                      <Text style={styles.text}>NIL</Text>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    width: "60%",
                    borderWidth: 1,
                    borderTopWidth: 0,
                    borderLeftWidth: 0,
                  }}
                >
                  <View
                    style={{
                      width: "100%",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <View style={{ width: "20%", borderRightWidth: 1 }}>
                      <Text style={styles.text}>7</Text>
                    </View>
                    <View style={{ width: "50%", borderRightWidth: 1 }}>
                      <Text style={[styles.text, { textAlign: "center" }]}>
                        September, {prevYear}
                      </Text>
                    </View>

                    <View style={{ width: "5%", borderRightWidth: 1 }}>
                      <Text style={styles.text}>Rs.</Text>
                    </View>
                    <View style={{ width: "25%" }}>
                      <Text style={styles.text}>NIL</Text>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    width: "60%",
                    borderWidth: 1,
                    borderTopWidth: 0,
                    borderLeftWidth: 0,
                  }}
                >
                  <View
                    style={{
                      width: "100%",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <View style={{ width: "20%", borderRightWidth: 1 }}>
                      <Text style={styles.text}>8</Text>
                    </View>
                    <View style={{ width: "50%", borderRightWidth: 1 }}>
                      <Text style={[styles.text, { textAlign: "center" }]}>
                        October, {prevYear}
                      </Text>
                    </View>

                    <View style={{ width: "5%", borderRightWidth: 1 }}>
                      <Text style={styles.text}>Rs.</Text>
                    </View>
                    <View style={{ width: "25%" }}>
                      <Text style={styles.text}>NIL</Text>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    width: "60%",
                    borderWidth: 1,
                    borderTopWidth: 0,
                    borderLeftWidth: 0,
                  }}
                >
                  <View
                    style={{
                      width: "100%",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <View style={{ width: "20%", borderRightWidth: 1 }}>
                      <Text style={styles.text}>9</Text>
                    </View>
                    <View style={{ width: "50%", borderRightWidth: 1 }}>
                      <Text style={[styles.text, { textAlign: "center" }]}>
                        November, {prevYear}
                      </Text>
                    </View>

                    <View style={{ width: "5%", borderRightWidth: 1 }}>
                      <Text style={styles.text}>Rs.</Text>
                    </View>
                    <View style={{ width: "25%" }}>
                      <Text style={styles.text}>NIL</Text>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    width: "60%",
                    borderWidth: 1,
                    borderTopWidth: 0,
                    borderLeftWidth: 0,
                  }}
                >
                  <View
                    style={{
                      width: "100%",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <View style={{ width: "20%", borderRightWidth: 1 }}>
                      <Text style={styles.text}>10</Text>
                    </View>
                    <View style={{ width: "50%", borderRightWidth: 1 }}>
                      <Text style={[styles.text, { textAlign: "center" }]}>
                        December, {prevYear}
                      </Text>
                    </View>

                    <View style={{ width: "5%", borderRightWidth: 1 }}>
                      <Text style={styles.text}>Rs.</Text>
                    </View>
                    <View style={{ width: "25%" }}>
                      <Text style={styles.text}>NIL</Text>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    width: "60%",
                    borderWidth: 1,
                    borderTopWidth: 0,
                    borderLeftWidth: 0,
                  }}
                >
                  <View
                    style={{
                      width: "100%",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <View style={{ width: "20%", borderRightWidth: 1 }}>
                      <Text style={styles.text}>11</Text>
                    </View>
                    <View style={{ width: "50%", borderRightWidth: 1 }}>
                      <Text style={[styles.text, { textAlign: "center" }]}>
                        January, {thisYear}
                      </Text>
                    </View>

                    <View style={{ width: "5%", borderRightWidth: 1 }}>
                      <Text style={styles.text}>Rs.</Text>
                    </View>
                    <View style={{ width: "25%" }}>
                      <Text style={styles.text}>
                        {!isUnderRebate > 0 ? " " : "NIL"}
                      </Text>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    width: "60%",
                    borderWidth: 1,
                    borderTopWidth: 0,
                    borderLeftWidth: 0,
                  }}
                >
                  <View
                    style={{
                      width: "100%",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <View style={{ width: "20%", borderRightWidth: 1 }}>
                      <Text style={styles.text}>12</Text>
                    </View>
                    <View style={{ width: "50%", borderRightWidth: 1 }}>
                      <Text style={[styles.text, { textAlign: "center" }]}>
                        February, {thisYear}
                      </Text>
                    </View>

                    <View style={{ width: "5%", borderRightWidth: 1 }}>
                      <Text style={styles.text}>Rs.</Text>
                    </View>
                    <View style={{ width: "25%" }}>
                      <Text style={styles.text}>
                        {!isUnderRebate > 0 ? " " : "NIL"}
                      </Text>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    width: "60%",
                    borderWidth: 1,
                    borderTopWidth: 0,
                    borderLeftWidth: 0,
                    borderBottomWidth: 0,
                  }}
                >
                  <View
                    style={{
                      width: "100%",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <View style={{ width: "20%", borderRightWidth: 1 }}>
                      <Text style={styles.text}> </Text>
                    </View>
                    <View style={{ width: "50%", borderRightWidth: 1 }}>
                      <Text style={[styles.text, { textAlign: "center" }]}>
                        TOTAL
                      </Text>
                    </View>
                    <View style={{ width: "5%", borderRightWidth: 1 }}>
                      <Text style={styles.text}>Rs.</Text>
                    </View>
                    <View style={{ width: "25%" }}>
                      <Text style={styles.text}>
                        {!isUnderRebate > 0 ? " " : "NIL"}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <View
                style={[
                  styles.tableStartBorderView2,
                  {
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    borderLeftWidth: 1,
                    borderRightWidth: 1,
                    borderTopWidth: 0,
                    borderBottomWidth: 1,
                  },
                ]}
              >
                <View
                  style={{
                    width: "5%",
                    justifyContent: "center",
                    textAlign: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.text}>31</Text>
                </View>
                <View
                  style={{
                    width: "95%",
                    borderLeftWidth: 1,
                  }}
                >
                  <View
                    style={{
                      width: "100%",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <View style={{ width: "73.7%", borderRightWidth: 1 }}>
                      <Text
                        style={[
                          styles.text,
                          { textAlign: "left", paddingLeft: 2 },
                        ]}
                      >
                        TAX REFUNDABLE IF ANY
                      </Text>
                    </View>

                    <View style={{ width: "25%" }}>
                      <Text style={styles.text}>NIL</Text>
                    </View>
                  </View>
                </View>
              </View>
              <View
                style={[
                  styles.tableStartBorderView2,
                  {
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    borderWidth: 1,
                    marginTop: 10,
                    height: 20,
                  },
                ]}
              >
                <View
                  style={{
                    width: "12%",
                    justifyContent: "center",
                    textAlign: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.text}>Date:-</Text>
                </View>
                <View
                  style={{
                    width: "88%",
                    borderLeftWidth: 1,
                    height: 20,
                  }}
                >
                  <View
                    style={{
                      width: "100%",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <View style={{ width: "73.7%" }}>
                      <Text
                        style={[
                          styles.text,
                          { textAlign: "left", paddingLeft: 2 },
                        ]}
                      >
                        {" "}
                      </Text>
                    </View>

                    <View style={{ width: "25%" }}>
                      <Text style={styles.text}></Text>
                    </View>
                  </View>
                </View>
              </View>
              <View
                style={[
                  styles.tableStartBorderView2,
                  {
                    flexDirection: "row",
                    justifyContent: "space-around",
                    alignItems: "center",
                    borderWidth: 0,
                    marginTop: 50,
                  },
                ]}
              >
                <View style={{ width: "50%" }}>
                  <Text style={[styles.text]}>Signature of the Employee</Text>
                </View>
                <View style={{ width: "50%" }}>
                  <Text style={[styles.text]}>Signature of the DDO</Text>
                </View>
              </View>
              <View
                style={[
                  styles.tableStartBorderView2,
                  {
                    flexDirection: "row",
                    justifyContent: "space-around",
                    alignItems: "center",
                    borderWidth: 0,
                    marginTop: 5,
                  },
                ]}
              >
                <View style={{ width: "50%" }}>
                  <Text style={[styles.text]}>Designation:-</Text>
                </View>
                <View style={{ width: "50%" }}>
                  <Text style={[styles.text]}> </Text>
                </View>
              </View>
              <View
                style={[
                  styles.tableStartBorderView2,
                  {
                    flexDirection: "row",
                    justifyContent: "space-around",
                    alignItems: "center",
                    borderWidth: 0,
                    marginTop: 5,
                  },
                ]}
              >
                <View style={{ width: "50%" }}>
                  <Text style={[styles.text]}>Section:-</Text>
                </View>
                <View style={{ width: "50%" }}>
                  <Text style={[styles.text]}> </Text>
                </View>
              </View>
              <View
                style={[
                  styles.tableStartBorderView2,
                  {
                    flexDirection: "row",
                    justifyContent: "space-around",
                    alignItems: "flex-end",
                    borderWidth: 0,
                    marginTop: 10,
                  },
                ]}
              >
                <View style={{ width: "50%" }}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "flex-end",
                      marginBottom: 5,
                    }}
                  >
                    <View
                      style={{
                        width: "100%",
                        borderWidth: 1,
                        padding: 5,
                        height: 90,
                        justifyContent: "center",
                        alignItems: "center",
                        marginLeft: 50,
                      }}
                    >
                      <Text style={styles.text}>Verified</Text>
                      <View
                        style={{
                          marginTop: 40,
                          paddingVertical: 5,
                          width: "100%",
                        }}
                      >
                        <View
                          style={{
                            height: 3,
                            borderTopWidth: 1,
                            borderBottomWidth: 1,
                            borderStyle: "dashed",
                          }}
                        ></View>
                        <Text style={[styles.text, { marginTop: 5 }]}></Text>
                        <Text style={styles.text}>
                          SUB INSPECTOR OF SCHOOLS
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={{ width: "40%", borderWidth: 1, marginBottom: 5 }}>
                  <Text style={[styles.text]}>
                    LAST DATE OF SUBMISSION:- 13/01/{thisYear}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Page>

      <Page size="A4" orientation="landscape" style={styles.page}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center",
            width: "95%",
            marginTop: 50,
          }}
        >
          <View style={styles.pageMainView}>
            <View style={styles.mainBorderView}>
              <View style={styles.tableStartBorderView}>
                <Text style={styles.titleMain}>
                  DISTRICT PRIMARY SCHOOL COUNCIL, HOWRAH
                </Text>
              </View>
              <View style={styles.tableStartBorderView}>
                <View
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    textAlign: "center",
                    alignItems: "center",
                  }}
                >
                  {/* 20 */}
                  <View
                    style={{
                      width: "20%",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRightWidth: 1,
                    }}
                  >
                    <View style={{ width: "100%", borderBottomWidth: 1 }}>
                      <Text style={styles.text}>NAME OF THE EMPLOYEE</Text>
                    </View>
                    <View style={{ width: "100%" }}>
                      <Text style={styles.text}>NAME OF THE SCHOOL</Text>
                    </View>
                  </View>
                  {/* 30 */}
                  <View
                    style={{
                      width: "30%",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRightWidth: 1,
                    }}
                  >
                    <View style={{ width: "100%", borderBottomWidth: 1 }}>
                      <Text style={styles.text}>{tname}</Text>
                    </View>
                    <View style={{ width: "100%" }}>
                      <Text style={styles.text}>{school}</Text>
                    </View>
                  </View>
                  {/* 10 Gross */}
                  <View
                    style={{
                      width: "10%",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRightWidth: 1,
                    }}
                  ></View>
                  {/* 10 */}
                  <View
                    style={{
                      width: "10%",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRightWidth: 1,
                      borderLeftWidth: 1,
                    }}
                  >
                    <View style={{ width: "100%", borderBottomWidth: 1 }}>
                      <Text style={styles.text}>DESIGNATION</Text>
                    </View>
                    <View style={{ width: "100%" }}>
                      <Text style={styles.text}>PAN NO.</Text>
                    </View>
                  </View>
                  {/* 20 */}
                  <View
                    style={{
                      width: "30%",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <View style={{ width: "100%", borderBottomWidth: 1 }}>
                      <Text style={styles.text}>{desig}</Text>
                    </View>
                    <View style={{ width: "100%" }}>
                      <Text style={styles.text}>{pan}</Text>
                    </View>
                  </View>
                </View>
              </View>

              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  borderWidth: 1,
                  borderLeftWidth: 0,
                  borderRightWidth: 0,
                  borderTopWidth: 0,
                }}
              >
                <View
                  style={{
                    width: "50%",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      width: "14%",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRightWidth: 1,
                      height: 50,
                    }}
                  >
                    <Text style={styles.text}>MONTH</Text>
                  </View>
                  <View
                    style={{ width: "86%", borderRightWidth: 1, height: 50 }}
                  >
                    <View style={{ width: "100%", borderBottomWidth: 1 }}>
                      <Text style={styles.text}>PAY & ALLOWANCES</Text>
                    </View>
                    <View
                      style={{
                        width: "100%",
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "center",
                      }}
                    >
                      <View
                        style={{
                          width: "12.5%",
                          borderRightWidth: 1,
                          height: 40,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Text style={styles.text}>% D.A</Text>
                      </View>
                      <View
                        style={{
                          width: "12.5%",
                          borderRightWidth: 1,
                          height: 40,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Text style={styles.text}>Basic{"\n"}Pay</Text>
                      </View>
                      <View
                        style={{
                          width: "12.5%",
                          borderRightWidth: 1,
                          height: 40,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Text style={[styles.text, { fontSize: 8 }]}>
                          HT{"\n"}Allowance
                        </Text>
                      </View>
                      <View
                        style={{
                          width: "12.5%",
                          borderRightWidth: 1,
                          height: 40,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Text style={styles.text}>D.A.</Text>
                      </View>
                      <View
                        style={{
                          width: "12.5%",
                          borderRightWidth: 1,
                          height: 40,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Text style={styles.text}>H.R.A.</Text>
                      </View>
                      <View
                        style={{
                          width: "12.5%",
                          borderRightWidth: 1,
                          height: 40,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Text style={styles.text}>M.A.</Text>
                      </View>
                      <View
                        style={{
                          width: "12.5%",
                          borderRightWidth: 1,
                          height: 40,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Text style={[styles.text, { fontSize: 7 }]}>
                          Conveyance{"\n"}Allowance
                        </Text>
                      </View>
                      <View style={{ width: "12.5%" }}>
                        <Text style={styles.text}>BONUS</Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    width: "10%",
                    borderRightWidth: 1,
                    height: 50,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.text}>GROSS</Text>
                </View>
                <View
                  style={{
                    width: "30%",
                    borderRightWidth: 1,
                    height: 50,
                  }}
                >
                  <View style={{ width: "100%", borderBottomWidth: 1 }}>
                    <Text style={styles.text}>DEDUCTION</Text>
                  </View>
                  <View
                    style={{
                      width: "100%",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        width: "25%",
                        borderRightWidth: 1,
                        height: 40,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Text style={styles.text}>GPF</Text>
                    </View>
                    <View
                      style={{
                        width: "25%",
                        borderRightWidth: 1,
                        height: 40,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Text style={styles.text}>GSLI</Text>
                    </View>
                    <View
                      style={{
                        width: "25%",
                        borderRightWidth: 1,
                        height: 40,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Text style={styles.text}>P.TAX</Text>
                    </View>
                    <View
                      style={{
                        width: "25%",
                        height: 40,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Text style={styles.text}>I.TAX</Text>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    width: "10%",
                    height: 50,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text style={styles.text}>NET</Text>
                </View>
              </View>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  borderWidth: 1,
                  borderLeftWidth: 0,
                  borderRightWidth: 0,
                  borderTopWidth: 0,
                }}
              >
                <View
                  style={{
                    width: "50%",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      width: "14%",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRightWidth: 1,
                    }}
                  >
                    <View
                      style={{
                        width: "50%",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRightWidth: 1,
                      }}
                    >
                      <Text style={styles.text}>MAR</Text>
                    </View>
                    <View
                      style={{
                        width: "50%",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.text}>{prevYear}</Text>
                    </View>
                  </View>
                  <View
                    style={{
                      width: "86%",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRightWidth: 1,
                    }}
                  >
                    <View
                      style={{
                        width: "12.5%",
                        borderRightWidth: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.text}>
                        {marchBasic !== 0
                          ? `${Math.round(marchSalary?.daPercent * 100)}%`
                          : ""}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "12.5%",
                        borderRightWidth: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.text}>
                        {marchBasic !== 0 ? marchBasic : ""}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "12.5%",
                        borderRightWidth: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.text}>
                        {marchBasic !== 0
                          ? marchAddl !== 0
                            ? marchAddl
                            : "NIL"
                          : ""}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "12.5%",
                        borderRightWidth: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.text}>
                        {marchBasic !== 0 ? marchDA : ""}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "12.5%",
                        borderRightWidth: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.text}>
                        {marchBasic !== 0 ? marchHRA : ""}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "12.5%",
                        borderRightWidth: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.text}>
                        {marchBasic !== 0
                          ? marchMA !== 0
                            ? marchMA
                            : "NIL"
                          : ""}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "12.5%",
                        borderRightWidth: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.text}> </Text>
                    </View>
                    <View
                      style={{
                        width: "12.5%",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.text}> </Text>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    width: "10%",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRightWidth: 1,
                  }}
                >
                  <Text style={styles.text}>
                    {marchBasic !== 0 ? marchGross : ""}
                  </Text>
                </View>
                <View
                  style={{
                    width: "30%",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRightWidth: 1,
                  }}
                >
                  <View
                    style={{
                      width: "25%",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRightWidth: 1,
                    }}
                  >
                    <Text style={styles.text}>
                      {marchBasic !== 0
                        ? marchGPF !== 0
                          ? marchGPF
                          : "NIL"
                        : ""}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: "25%",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRightWidth: 1,
                    }}
                  >
                    <Text style={styles.text}>
                      {marchBasic !== 0
                        ? marchGSLI !== 0
                          ? marchGSLI
                          : "NIL"
                        : ""}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: "25%",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRightWidth: 1,
                    }}
                  >
                    <Text style={styles.text}>
                      {marchBasic !== 0
                        ? marchPTax !== 0
                          ? marchPTax
                          : "NIL"
                        : ""}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: "25%",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={styles.text}>
                      {marchBasic !== 0 ? "NIL" : ""}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    width: "10%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.text}>
                    {marchBasic !== 0 ? marchNetpay : ""}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  borderWidth: 1,
                  borderLeftWidth: 0,
                  borderRightWidth: 0,
                  borderTopWidth: 0,
                }}
              >
                <View
                  style={{
                    width: "50%",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      width: "14%",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRightWidth: 1,
                    }}
                  >
                    <View
                      style={{
                        width: "50%",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRightWidth: 1,
                      }}
                    >
                      <Text style={styles.text}>APR</Text>
                    </View>
                    <View
                      style={{
                        width: "50%",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.text}>{prevYear}</Text>
                    </View>
                  </View>
                  <View
                    style={{
                      width: "86%",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRightWidth: 1,
                    }}
                  >
                    <View
                      style={{
                        width: "12.5%",
                        borderRightWidth: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.text}>
                        {aprilBasic !== 0
                          ? `${Math.round(aprilSalary?.daPercent * 100)}%`
                          : ""}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "12.5%",
                        borderRightWidth: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.text}>
                        {aprilBasic !== 0 ? aprilBasic : ""}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "12.5%",
                        borderRightWidth: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.text}>
                        {aprilBasic !== 0
                          ? aprilAddl !== 0
                            ? aprilAddl
                            : "NIL"
                          : ""}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "12.5%",
                        borderRightWidth: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.text}>
                        {aprilBasic !== 0 ? aprilDA : ""}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "12.5%",
                        borderRightWidth: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.text}>
                        {aprilBasic !== 0 ? aprilHRA : ""}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "12.5%",
                        borderRightWidth: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.text}>
                        {aprilBasic !== 0
                          ? aprilMA !== 0
                            ? aprilMA
                            : "NIL"
                          : ""}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "12.5%",
                        borderRightWidth: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.text}> </Text>
                    </View>
                    <View
                      style={{
                        width: "12.5%",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.text}> </Text>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    width: "10%",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRightWidth: 1,
                  }}
                >
                  <Text style={styles.text}>
                    {aprilBasic !== 0 ? aprilGross : ""}
                  </Text>
                </View>
                <View
                  style={{
                    width: "30%",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRightWidth: 1,
                  }}
                >
                  <View
                    style={{
                      width: "25%",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRightWidth: 1,
                    }}
                  >
                    <Text style={styles.text}>
                      {aprilBasic !== 0
                        ? aprilGPF !== 0
                          ? aprilGPF
                          : "NIL"
                        : ""}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: "25%",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRightWidth: 1,
                    }}
                  >
                    <Text style={styles.text}>
                      {aprilBasic !== 0
                        ? aprilGSLI !== 0
                          ? aprilGSLI
                          : "NIL"
                        : ""}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: "25%",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRightWidth: 1,
                    }}
                  >
                    <Text style={styles.text}>
                      {aprilBasic !== 0
                        ? aprilPTax !== 0
                          ? aprilPTax
                          : "NIL"
                        : ""}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: "25%",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={styles.text}>
                      {aprilBasic !== 0 ? "NIL" : ""}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    width: "10%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.text}>
                    {aprilBasic !== 0 ? aprilNetpay : ""}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  borderWidth: 1,
                  borderLeftWidth: 0,
                  borderRightWidth: 0,
                  borderTopWidth: 0,
                }}
              >
                <View
                  style={{
                    width: "50%",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      width: "14%",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRightWidth: 1,
                    }}
                  >
                    <View
                      style={{
                        width: "50%",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRightWidth: 1,
                      }}
                    >
                      <Text style={styles.text}>MAY</Text>
                    </View>
                    <View
                      style={{
                        width: "50%",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.text}>{prevYear}</Text>
                    </View>
                  </View>
                  <View
                    style={{
                      width: "86%",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRightWidth: 1,
                    }}
                  >
                    <View
                      style={{
                        width: "12.5%",
                        borderRightWidth: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.text}>
                        {mayBasic !== 0
                          ? `${Math.round(maySalary?.daPercent * 100)}%`
                          : ""}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "12.5%",
                        borderRightWidth: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.text}>
                        {mayBasic !== 0 ? mayBasic : ""}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "12.5%",
                        borderRightWidth: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.text}>
                        {mayBasic !== 0
                          ? mayAddl !== 0
                            ? mayAddl
                            : "NIL"
                          : ""}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "12.5%",
                        borderRightWidth: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.text}>
                        {mayBasic !== 0 ? mayDA : ""}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "12.5%",
                        borderRightWidth: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.text}>
                        {mayBasic !== 0 ? mayHRA : ""}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "12.5%",
                        borderRightWidth: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.text}>
                        {mayBasic !== 0 ? (mayMA !== 0 ? mayMA : "NIL") : ""}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "12.5%",
                        borderRightWidth: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.text}> </Text>
                    </View>
                    <View
                      style={{
                        width: "12.5%",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.text}> </Text>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    width: "10%",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRightWidth: 1,
                  }}
                >
                  <Text style={styles.text}>
                    {mayBasic !== 0 ? mayGross : ""}
                  </Text>
                </View>
                <View
                  style={{
                    width: "30%",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRightWidth: 1,
                  }}
                >
                  <View
                    style={{
                      width: "25%",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRightWidth: 1,
                    }}
                  >
                    <Text style={styles.text}>
                      {mayBasic !== 0 ? (mayGPF !== 0 ? mayGPF : "NIL") : ""}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: "25%",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRightWidth: 1,
                    }}
                  >
                    <Text style={styles.text}>
                      {mayBasic !== 0 ? (mayGSLI !== 0 ? mayGSLI : "NIL") : ""}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: "25%",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRightWidth: 1,
                    }}
                  >
                    <Text style={styles.text}>
                      {mayBasic !== 0 ? (mayPTax !== 0 ? mayPTax : "NIL") : ""}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: "25%",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={styles.text}>
                      {mayBasic !== 0 ? "NIL" : ""}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    width: "10%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.text}>
                    {mayBasic !== 0 ? mayNetpay : ""}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  borderWidth: 1,
                  borderLeftWidth: 0,
                  borderRightWidth: 0,
                  borderTopWidth: 0,
                }}
              >
                <View
                  style={{
                    width: "50%",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      width: "14%",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRightWidth: 1,
                    }}
                  >
                    <View
                      style={{
                        width: "50%",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRightWidth: 1,
                      }}
                    >
                      <Text style={styles.text}>JUN</Text>
                    </View>
                    <View
                      style={{
                        width: "50%",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.text}>{prevYear}</Text>
                    </View>
                  </View>
                  <View
                    style={{
                      width: "86%",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRightWidth: 1,
                    }}
                  >
                    <View
                      style={{
                        width: "12.5%",
                        borderRightWidth: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.text}>
                        {juneBasic !== 0
                          ? `${Math.round(juneSalary?.daPercent * 100)}%`
                          : ""}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "12.5%",
                        borderRightWidth: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.text}>
                        {juneBasic !== 0 ? juneBasic : ""}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "12.5%",
                        borderRightWidth: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.text}>
                        {juneBasic !== 0
                          ? juneAddl !== 0
                            ? juneAddl
                            : "NIL"
                          : ""}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "12.5%",
                        borderRightWidth: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.text}>
                        {juneBasic !== 0 ? juneDA : ""}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "12.5%",
                        borderRightWidth: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.text}>
                        {juneBasic !== 0 ? juneHRA : ""}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "12.5%",
                        borderRightWidth: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.text}>
                        {juneBasic !== 0 ? (juneMA !== 0 ? juneMA : "NIL") : ""}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "12.5%",
                        borderRightWidth: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.text}> </Text>
                    </View>
                    <View
                      style={{
                        width: "12.5%",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.text}> </Text>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    width: "10%",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRightWidth: 1,
                  }}
                >
                  <Text style={styles.text}>
                    {juneBasic !== 0 ? juneGross : ""}
                  </Text>
                </View>
                <View
                  style={{
                    width: "30%",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRightWidth: 1,
                  }}
                >
                  <View
                    style={{
                      width: "25%",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRightWidth: 1,
                    }}
                  >
                    <Text style={styles.text}>
                      {juneBasic !== 0 ? (juneGPF !== 0 ? juneGPF : "NIL") : ""}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: "25%",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRightWidth: 1,
                    }}
                  >
                    <Text style={styles.text}>
                      {juneBasic !== 0
                        ? juneGSLI !== 0
                          ? juneGSLI
                          : "NIL"
                        : ""}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: "25%",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRightWidth: 1,
                    }}
                  >
                    <Text style={styles.text}>
                      {juneBasic !== 0
                        ? junePTax !== 0
                          ? junePTax
                          : "NIL"
                        : ""}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: "25%",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={styles.text}>
                      {juneBasic !== 0 ? "NIL" : ""}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    width: "10%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.text}>
                    {juneBasic !== 0 ? juneNetpay : ""}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  borderWidth: 1,
                  borderLeftWidth: 0,
                  borderRightWidth: 0,
                  borderTopWidth: 0,
                }}
              >
                <View
                  style={{
                    width: "50%",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      width: "14%",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRightWidth: 1,
                    }}
                  >
                    <View
                      style={{
                        width: "50%",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRightWidth: 1,
                      }}
                    >
                      <Text style={styles.text}>JUL</Text>
                    </View>
                    <View
                      style={{
                        width: "50%",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.text}>{prevYear}</Text>
                    </View>
                  </View>
                  <View
                    style={{
                      width: "86%",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRightWidth: 1,
                    }}
                  >
                    <View
                      style={{
                        width: "12.5%",
                        borderRightWidth: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.text}>
                        {julyBasic !== 0
                          ? `${Math.round(julySalary?.daPercent * 100)}%`
                          : ""}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "12.5%",
                        borderRightWidth: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.text}>
                        {julyBasic !== 0 ? julyBasic : ""}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "12.5%",
                        borderRightWidth: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.text}>
                        {julyBasic !== 0
                          ? julyAddl !== 0
                            ? julyAddl
                            : "NIL"
                          : ""}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "12.5%",
                        borderRightWidth: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.text}>
                        {julyBasic !== 0 ? julyDA : ""}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "12.5%",
                        borderRightWidth: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.text}>
                        {julyBasic !== 0 ? julyHRA : ""}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "12.5%",
                        borderRightWidth: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.text}>
                        {julyBasic !== 0 ? (julyMA !== 0 ? julyMA : "NIL") : ""}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "12.5%",
                        borderRightWidth: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.text}> </Text>
                    </View>
                    <View
                      style={{
                        width: "12.5%",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.text}> </Text>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    width: "10%",
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    borderRightWidth: 1,
                  }}
                >
                  <Text style={styles.text}>
                    {julyBasic !== 0 ? julyGross : ""}
                  </Text>
                  <Text style={styles.text}>
                    {aprilIR !== 0 ? `(IR- ${aprilIR})` : ""}
                  </Text>
                </View>
                <View
                  style={{
                    width: "30%",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRightWidth: 1,
                  }}
                >
                  <View
                    style={{
                      width: "25%",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRightWidth: 1,
                    }}
                  >
                    <Text style={styles.text}>
                      {julyBasic !== 0 ? (julyGPF !== 0 ? julyGPF : "NIL") : ""}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: "25%",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRightWidth: 1,
                    }}
                  >
                    <Text style={styles.text}>
                      {julyBasic !== 0
                        ? julyGSLI !== 0
                          ? julyGSLI
                          : "NIL"
                        : ""}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: "25%",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRightWidth: 1,
                    }}
                  >
                    <Text style={styles.text}>
                      {julyBasic !== 0
                        ? julyPTax !== 0
                          ? julyPTax
                          : "NIL"
                        : ""}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: "25%",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={styles.text}>
                      {julyBasic !== 0 ? "NIL" : ""}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    width: "10%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.text}>
                    {julyBasic !== 0 ? julyNetpay : ""}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  borderWidth: 1,
                  borderLeftWidth: 0,
                  borderRightWidth: 0,
                  borderTopWidth: 0,
                }}
              >
                <View
                  style={{
                    width: "50%",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      width: "14%",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRightWidth: 1,
                    }}
                  >
                    <View
                      style={{
                        width: "50%",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRightWidth: 1,
                      }}
                    >
                      <Text style={styles.text}>AUG</Text>
                    </View>
                    <View
                      style={{
                        width: "50%",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.text}>{prevYear}</Text>
                    </View>
                  </View>
                  <View
                    style={{
                      width: "86%",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRightWidth: 1,
                    }}
                  >
                    <View
                      style={{
                        width: "12.5%",
                        borderRightWidth: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.text}>
                        {augustBasic !== 0
                          ? `${Math.round(augustSalary?.daPercent * 100)}%`
                          : ""}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "12.5%",
                        borderRightWidth: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.text}>
                        {augustBasic !== 0 ? augustBasic : ""}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "12.5%",
                        borderRightWidth: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.text}>
                        {augustBasic !== 0
                          ? augustAddl !== 0
                            ? augustAddl
                            : "NIL"
                          : ""}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "12.5%",
                        borderRightWidth: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.text}>
                        {augustBasic !== 0 ? augustDA : ""}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "12.5%",
                        borderRightWidth: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.text}>
                        {augustBasic !== 0 ? augustHRA : ""}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "12.5%",
                        borderRightWidth: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.text}>
                        {augustBasic !== 0
                          ? augustMA !== 0
                            ? augustMA
                            : "NIL"
                          : ""}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "12.5%",
                        borderRightWidth: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.text}> </Text>
                    </View>
                    <View
                      style={{
                        width: "12.5%",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.text}> </Text>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    width: "10%",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRightWidth: 1,
                  }}
                >
                  <Text style={styles.text}>
                    {augustBasic !== 0 ? augustGross : ""}
                  </Text>
                </View>
                <View
                  style={{
                    width: "30%",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRightWidth: 1,
                  }}
                >
                  <View
                    style={{
                      width: "25%",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRightWidth: 1,
                    }}
                  >
                    <Text style={styles.text}>
                      {augustBasic !== 0
                        ? augustGPF !== 0
                          ? augustGPF
                          : "NIL"
                        : ""}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: "25%",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRightWidth: 1,
                    }}
                  >
                    <Text style={styles.text}>
                      {augustBasic !== 0
                        ? augustGSLI !== 0
                          ? augustGSLI
                          : "NIL"
                        : ""}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: "25%",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRightWidth: 1,
                    }}
                  >
                    <Text style={styles.text}>
                      {augustBasic !== 0
                        ? augustPTax !== 0
                          ? augustPTax
                          : "NIL"
                        : ""}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: "25%",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={styles.text}>
                      {augustBasic !== 0 ? "NIL" : ""}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    width: "10%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.text}>
                    {augustBasic !== 0 ? augustNetpay : ""}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  borderWidth: 1,
                  borderLeftWidth: 0,
                  borderRightWidth: 0,
                  borderTopWidth: 0,
                }}
              >
                <View
                  style={{
                    width: "50%",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      width: "14%",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRightWidth: 1,
                    }}
                  >
                    <View
                      style={{
                        width: "50%",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRightWidth: 1,
                      }}
                    >
                      <Text style={styles.text}>SEP</Text>
                    </View>
                    <View
                      style={{
                        width: "50%",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.text}>{prevYear}</Text>
                    </View>
                  </View>
                  <View
                    style={{
                      width: "86%",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRightWidth: 1,
                    }}
                  >
                    <View
                      style={{
                        width: "12.5%",
                        borderRightWidth: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.text}>
                        {septemberBasic !== 0
                          ? `${Math.round(septemberSalary?.daPercent * 100)}%`
                          : ""}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "12.5%",
                        borderRightWidth: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.text}>
                        {septemberBasic !== 0 ? septemberBasic : ""}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "12.5%",
                        borderRightWidth: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.text}>
                        {septemberBasic !== 0
                          ? septemberAddl !== 0
                            ? septemberAddl
                            : "NIL"
                          : ""}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "12.5%",
                        borderRightWidth: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.text}>
                        {septemberBasic !== 0 ? septemberDA : ""}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "12.5%",
                        borderRightWidth: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.text}>
                        {septemberBasic !== 0 ? septemberHRA : ""}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "12.5%",
                        borderRightWidth: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.text}>
                        {septemberBasic !== 0
                          ? septemberMA !== 0
                            ? septemberMA
                            : "NIL"
                          : ""}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "12.5%",
                        borderRightWidth: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.text}> </Text>
                    </View>
                    <View
                      style={{
                        width: "12.5%",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.text}> </Text>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    width: "10%",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRightWidth: 1,
                  }}
                >
                  <Text style={styles.text}>
                    {septemberBasic !== 0 ? septemberGross : ""}
                  </Text>
                </View>
                <View
                  style={{
                    width: "30%",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRightWidth: 1,
                  }}
                >
                  <View
                    style={{
                      width: "25%",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRightWidth: 1,
                    }}
                  >
                    <Text style={styles.text}>
                      {septemberBasic !== 0
                        ? septemberGPF !== 0
                          ? septemberGPF
                          : "NIL"
                        : ""}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: "25%",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRightWidth: 1,
                    }}
                  >
                    <Text style={styles.text}>
                      {septemberBasic !== 0
                        ? septemberGSLI !== 0
                          ? septemberGSLI
                          : "NIL"
                        : ""}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: "25%",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRightWidth: 1,
                    }}
                  >
                    <Text style={styles.text}>
                      {septemberBasic !== 0
                        ? septemberPTax !== 0
                          ? septemberPTax
                          : "NIL"
                        : ""}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: "25%",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={styles.text}>
                      {septemberBasic !== 0 ? "NIL" : ""}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    width: "10%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.text}>
                    {septemberBasic !== 0 ? septemberNetpay : ""}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  borderWidth: 1,
                  borderLeftWidth: 0,
                  borderRightWidth: 0,
                  borderTopWidth: 0,
                }}
              >
                <View
                  style={{
                    width: "50%",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      width: "14%",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRightWidth: 1,
                    }}
                  >
                    <View
                      style={{
                        width: "50%",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRightWidth: 1,
                      }}
                    >
                      <Text style={styles.text}>OCT</Text>
                    </View>
                    <View
                      style={{
                        width: "50%",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.text}>{prevYear}</Text>
                    </View>
                  </View>
                  <View
                    style={{
                      width: "86%",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRightWidth: 1,
                    }}
                  >
                    <View
                      style={{
                        width: "12.5%",
                        borderRightWidth: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.text}>
                        {octoberBasic !== 0
                          ? `${Math.round(octoberSalary?.daPercent * 100)}%`
                          : ""}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "12.5%",
                        borderRightWidth: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.text}>
                        {octoberBasic !== 0 ? octoberBasic : ""}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "12.5%",
                        borderRightWidth: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.text}>
                        {octoberBasic !== 0
                          ? octoberAddl !== 0
                            ? octoberAddl
                            : "NIL"
                          : ""}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "12.5%",
                        borderRightWidth: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.text}>
                        {octoberBasic !== 0 ? octoberDA : ""}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "12.5%",
                        borderRightWidth: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.text}>
                        {octoberBasic !== 0 ? octoberHRA : ""}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "12.5%",
                        borderRightWidth: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.text}>
                        {octoberBasic !== 0
                          ? octoberMA !== 0
                            ? octoberMA
                            : "NIL"
                          : ""}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "12.5%",
                        borderRightWidth: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.text}> </Text>
                    </View>
                    <View
                      style={{
                        width: "12.5%",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.text}> </Text>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    width: "10%",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRightWidth: 1,
                  }}
                >
                  <Text style={styles.text}>
                    {octoberBasic !== 0 ? octoberGross : ""}
                  </Text>
                </View>
                <View
                  style={{
                    width: "30%",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRightWidth: 1,
                  }}
                >
                  <View
                    style={{
                      width: "25%",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRightWidth: 1,
                    }}
                  >
                    <Text style={styles.text}>
                      {octoberBasic !== 0
                        ? octoberGPF !== 0
                          ? octoberGPF
                          : "NIL"
                        : ""}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: "25%",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRightWidth: 1,
                    }}
                  >
                    <Text style={styles.text}>
                      {octoberBasic !== 0
                        ? octoberGSLI !== 0
                          ? octoberGSLI
                          : "NIL"
                        : ""}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: "25%",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRightWidth: 1,
                    }}
                  >
                    <Text style={styles.text}>
                      {octoberBasic !== 0
                        ? octoberPTax !== 0
                          ? octoberPTax
                          : "NIL"
                        : ""}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: "25%",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={styles.text}>
                      {octoberBasic !== 0 ? "NIL" : ""}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    width: "10%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.text}>
                    {octoberBasic !== 0 ? octoberNetpay : ""}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  borderWidth: 1,
                  borderLeftWidth: 0,
                  borderRightWidth: 0,
                  borderTopWidth: 0,
                }}
              >
                <View
                  style={{
                    width: "50%",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      width: "14%",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRightWidth: 1,
                    }}
                  >
                    <View
                      style={{
                        width: "50%",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRightWidth: 1,
                      }}
                    >
                      <Text style={styles.text}>NOV</Text>
                    </View>
                    <View
                      style={{
                        width: "50%",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.text}>{prevYear}</Text>
                    </View>
                  </View>
                  <View
                    style={{
                      width: "86%",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRightWidth: 1,
                    }}
                  >
                    <View
                      style={{
                        width: "12.5%",
                        borderRightWidth: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.text}>
                        {novemberBasic !== 0
                          ? `${Math.round(novemberSalary?.daPercent * 100)}%`
                          : ""}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "12.5%",
                        borderRightWidth: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.text}>
                        {novemberBasic !== 0 ? novemberBasic : ""}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "12.5%",
                        borderRightWidth: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.text}>
                        {novemberBasic !== 0
                          ? novemberAddl !== 0
                            ? novemberAddl
                            : "NIL"
                          : ""}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "12.5%",
                        borderRightWidth: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.text}>
                        {novemberBasic !== 0 ? novemberDA : ""}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "12.5%",
                        borderRightWidth: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.text}>
                        {novemberBasic !== 0 ? novemberHRA : ""}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "12.5%",
                        borderRightWidth: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.text}>
                        {novemberBasic !== 0
                          ? novemberMA !== 0
                            ? novemberMA
                            : "NIL"
                          : ""}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "12.5%",
                        borderRightWidth: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.text}> </Text>
                    </View>
                    <View
                      style={{
                        width: "12.5%",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.text}> </Text>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    width: "10%",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRightWidth: 1,
                  }}
                >
                  <Text style={styles.text}>
                    {novemberBasic !== 0 ? novemberGross : ""}
                  </Text>
                </View>
                <View
                  style={{
                    width: "30%",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRightWidth: 1,
                  }}
                >
                  <View
                    style={{
                      width: "25%",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRightWidth: 1,
                    }}
                  >
                    <Text style={styles.text}>
                      {novemberBasic !== 0
                        ? novemberGPF !== 0
                          ? novemberGPF
                          : "NIL"
                        : ""}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: "25%",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRightWidth: 1,
                    }}
                  >
                    <Text style={styles.text}>
                      {novemberBasic !== 0
                        ? novemberGSLI !== 0
                          ? novemberGSLI
                          : "NIL"
                        : ""}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: "25%",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRightWidth: 1,
                    }}
                  >
                    <Text style={styles.text}>
                      {novemberBasic !== 0
                        ? novemberPTax !== 0
                          ? novemberPTax
                          : "NIL"
                        : ""}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: "25%",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={styles.text}>
                      {novemberBasic !== 0 ? "NIL" : ""}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    width: "10%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.text}>
                    {novemberBasic !== 0 ? novemberNetpay : ""}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  borderWidth: 1,
                  borderLeftWidth: 0,
                  borderRightWidth: 0,
                  borderTopWidth: 0,
                }}
              >
                <View
                  style={{
                    width: "50%",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      width: "14%",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRightWidth: 1,
                    }}
                  >
                    <View
                      style={{
                        width: "50%",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRightWidth: 1,
                      }}
                    >
                      <Text style={styles.text}>DEC</Text>
                    </View>
                    <View
                      style={{
                        width: "50%",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.text}>{prevYear}</Text>
                    </View>
                  </View>
                  <View
                    style={{
                      width: "86%",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRightWidth: 1,
                    }}
                  >
                    <View
                      style={{
                        width: "12.5%",
                        borderRightWidth: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.text}>
                        {decemberBasic !== 0
                          ? `${Math.round(decemberSalary?.daPercent * 100)}%`
                          : ""}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "12.5%",
                        borderRightWidth: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.text}>
                        {decemberBasic !== 0 ? decemberBasic : ""}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "12.5%",
                        borderRightWidth: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.text}>
                        {decemberBasic !== 0
                          ? decemberAddl !== 0
                            ? decemberAddl
                            : "NIL"
                          : ""}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "12.5%",
                        borderRightWidth: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.text}>
                        {decemberBasic !== 0 ? decemberDA : ""}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "12.5%",
                        borderRightWidth: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.text}>
                        {decemberBasic !== 0 ? decemberHRA : ""}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "12.5%",
                        borderRightWidth: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.text}>
                        {decemberBasic !== 0
                          ? decemberMA !== 0
                            ? decemberMA
                            : "NIL"
                          : ""}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "12.5%",
                        borderRightWidth: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.text}> </Text>
                    </View>
                    <View
                      style={{
                        width: "12.5%",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.text}> </Text>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    width: "10%",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRightWidth: 1,
                  }}
                >
                  <Text style={styles.text}>
                    {decemberBasic !== 0 ? decemberGross : ""}
                  </Text>
                </View>
                <View
                  style={{
                    width: "30%",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRightWidth: 1,
                  }}
                >
                  <View
                    style={{
                      width: "25%",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRightWidth: 1,
                    }}
                  >
                    <Text style={styles.text}>
                      {decemberBasic !== 0
                        ? decemberGPF !== 0
                          ? decemberGPF
                          : "NIL"
                        : ""}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: "25%",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRightWidth: 1,
                    }}
                  >
                    <Text style={styles.text}>
                      {decemberBasic !== 0
                        ? decemberGSLI !== 0
                          ? decemberGSLI
                          : "NIL"
                        : ""}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: "25%",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRightWidth: 1,
                    }}
                  >
                    <Text style={styles.text}>
                      {decemberBasic !== 0
                        ? decemberPTax !== 0
                          ? decemberPTax
                          : "NIL"
                        : ""}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: "25%",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={styles.text}>
                      {decemberBasic !== 0 ? "NIL" : ""}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    width: "10%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.text}>
                    {decemberBasic !== 0 ? decemberNetpay : ""}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  borderWidth: 1,
                  borderLeftWidth: 0,
                  borderRightWidth: 0,
                  borderTopWidth: 0,
                }}
              >
                <View
                  style={{
                    width: "50%",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      width: "14%",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRightWidth: 1,
                    }}
                  >
                    <View
                      style={{
                        width: "50%",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRightWidth: 1,
                      }}
                    >
                      <Text style={styles.text}>JAN</Text>
                    </View>
                    <View
                      style={{
                        width: "50%",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.text}>{thisYear}</Text>
                    </View>
                  </View>
                  <View
                    style={{
                      width: "86%",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRightWidth: 1,
                    }}
                  >
                    <View
                      style={{
                        width: "12.5%",
                        borderRightWidth: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.text}>
                        {januaryBasic !== 0
                          ? `${Math.round(januarySalary?.daPercent * 100)}%`
                          : ""}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "12.5%",
                        borderRightWidth: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.text}>
                        {januaryBasic !== 0 ? januaryBasic : ""}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "12.5%",
                        borderRightWidth: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.text}>
                        {januaryBasic !== 0
                          ? januaryAddl !== 0
                            ? januaryAddl
                            : "NIL"
                          : ""}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "12.5%",
                        borderRightWidth: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.text}>
                        {januaryBasic !== 0 ? januaryDA : ""}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "12.5%",
                        borderRightWidth: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.text}>
                        {januaryBasic !== 0 ? januaryHRA : ""}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "12.5%",
                        borderRightWidth: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.text}>
                        {januaryBasic !== 0
                          ? januaryMA !== 0
                            ? januaryMA
                            : "NIL"
                          : ""}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "12.5%",
                        borderRightWidth: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.text}> </Text>
                    </View>
                    <View
                      style={{
                        width: "12.5%",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.text}> </Text>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    width: "10%",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRightWidth: 1,
                  }}
                >
                  <Text style={styles.text}>
                    {januaryBasic !== 0 ? januaryGross : ""}
                  </Text>
                </View>
                <View
                  style={{
                    width: "30%",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRightWidth: 1,
                  }}
                >
                  <View
                    style={{
                      width: "25%",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRightWidth: 1,
                    }}
                  >
                    <Text style={styles.text}>
                      {januaryBasic !== 0
                        ? januaryGPF !== 0
                          ? januaryGPF
                          : "NIL"
                        : ""}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: "25%",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRightWidth: 1,
                    }}
                  >
                    <Text style={styles.text}>
                      {januaryBasic !== 0
                        ? januaryGSLI !== 0
                          ? januaryGSLI
                          : "NIL"
                        : ""}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: "25%",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRightWidth: 1,
                    }}
                  >
                    <Text style={styles.text}>
                      {januaryBasic !== 0
                        ? januaryPTax !== 0
                          ? januaryPTax
                          : "NIL"
                        : ""}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: "25%",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={styles.text}>
                      {januaryBasic !== 0 ? "NIL" : ""}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    width: "10%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.text}>
                    {januaryBasic !== 0 ? januaryNetpay : ""}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  borderWidth: 1,
                  borderLeftWidth: 0,
                  borderRightWidth: 0,
                  borderTopWidth: 0,
                }}
              >
                <View
                  style={{
                    width: "50%",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      width: "14%",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRightWidth: 1,
                    }}
                  >
                    <View
                      style={{
                        width: "50%",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRightWidth: 1,
                      }}
                    >
                      <Text style={styles.text}>FEB</Text>
                    </View>
                    <View
                      style={{
                        width: "50%",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.text}>{thisYear}</Text>
                    </View>
                  </View>
                  <View
                    style={{
                      width: "86%",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRightWidth: 1,
                    }}
                  >
                    <View
                      style={{
                        width: "12.5%",
                        borderRightWidth: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.text}>
                        {februaryBasic !== 0
                          ? `${Math.round(februarySalary?.daPercent * 100)}%`
                          : ""}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "12.5%",
                        borderRightWidth: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.text}>
                        {februaryBasic !== 0 ? februaryBasic : ""}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "12.5%",
                        borderRightWidth: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.text}>
                        {februaryBasic !== 0
                          ? februaryAddl !== 0
                            ? februaryAddl
                            : "NIL"
                          : ""}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "12.5%",
                        borderRightWidth: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.text}>
                        {februaryBasic !== 0 ? februaryDA : ""}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "12.5%",
                        borderRightWidth: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.text}>
                        {februaryBasic !== 0 ? februaryHRA : ""}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "12.5%",
                        borderRightWidth: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.text}>
                        {februaryBasic !== 0
                          ? februaryMA !== 0
                            ? februaryMA
                            : "NIL"
                          : ""}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "12.5%",
                        borderRightWidth: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.text}> </Text>
                    </View>
                    <View
                      style={{
                        width: "12.5%",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.text}> </Text>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    width: "10%",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRightWidth: 1,
                  }}
                >
                  <Text style={styles.text}>
                    {februaryBasic !== 0 ? februaryGross : ""}
                  </Text>
                </View>
                <View
                  style={{
                    width: "30%",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRightWidth: 1,
                  }}
                >
                  <View
                    style={{
                      width: "25%",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRightWidth: 1,
                    }}
                  >
                    <Text style={styles.text}>
                      {februaryBasic !== 0
                        ? februaryGPF !== 0
                          ? februaryGPF
                          : "NIL"
                        : ""}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: "25%",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRightWidth: 1,
                    }}
                  >
                    <Text style={styles.text}>
                      {februaryBasic !== 0
                        ? februaryGSLI !== 0
                          ? februaryGSLI
                          : "NIL"
                        : ""}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: "25%",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRightWidth: 1,
                    }}
                  >
                    <Text style={styles.text}>
                      {februaryBasic !== 0
                        ? februaryPTax !== 0
                          ? februaryPTax
                          : "NIL"
                        : ""}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: "25%",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={styles.text}>
                      {februaryBasic !== 0 ? "NIL" : ""}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    width: "10%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.text}>
                    {februaryBasic !== 0 ? februaryNetpay : ""}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    width: "50%",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      width: "14%",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRightWidth: 1,
                    }}
                  >
                    <Text style={styles.text}>TOTAL</Text>
                  </View>
                  <View
                    style={{
                      width: "86%",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRightWidth: 1,
                    }}
                  >
                    <View
                      style={{
                        width: "12.5%",
                        borderRightWidth: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.text}> </Text>
                    </View>
                    <View
                      style={{
                        width: "12.5%",
                        borderRightWidth: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.text}>
                        {grossBasic !== 0 ? grossBasic : ""}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "12.5%",
                        borderRightWidth: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.text}>
                        {grossAddl !== 0 ? grossAddl : "NIL"}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "12.5%",
                        borderRightWidth: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.text}>
                        {grossDA !== 0 ? grossDA : ""}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "12.5%",
                        borderRightWidth: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.text}>
                        {grossHRA !== 0 ? grossHRA : ""}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "12.5%",
                        borderRightWidth: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.text}>
                        {grossMA !== 0 ? grossMA : "NIL"}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "12.5%",
                        borderRightWidth: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.text}>NIL</Text>
                    </View>
                    <View
                      style={{
                        width: "12.5%",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.text}>
                        {bonus !== 0 ? bonus : "NIL"}{" "}
                      </Text>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    width: "10%",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRightWidth: 1,
                  }}
                >
                  <Text style={styles.text}>
                    {GrossPAY !== 0 ? GrossPAY : ""}
                  </Text>
                </View>
                <View
                  style={{
                    width: "30%",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRightWidth: 1,
                  }}
                >
                  <View
                    style={{
                      width: "25%",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRightWidth: 1,
                    }}
                  >
                    <Text style={styles.text}>
                      {grossGPF !== 0 ? grossGPF : "NIL"}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: "25%",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRightWidth: 1,
                    }}
                  >
                    <Text style={styles.text}>
                      {grossGSLI !== 0 ? grossGSLI : "NIL"}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: "25%",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRightWidth: 1,
                    }}
                  >
                    <Text style={styles.text}>
                      {grossPTax !== 0 ? grossPTax : "NIL"}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: "25%",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={styles.text}> </Text>
                  </View>
                </View>
                <View
                  style={{
                    width: "10%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.text}>
                    {grossNetpay !== 0 ? grossNetpay : ""}
                  </Text>
                </View>
              </View>
            </View>
            {/* <View
                style={{
                  marginTop: 60,
                  justifyContent: "flex-end",
                  alignItems: "flex-end",
                }}
              >
                <Text style={styles.text}>SIGNATURE OF THE INCUMBENT</Text>
              </View> */}
            <View
              style={{
                marginTop: 90,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <View
                style={{
                  width: "30%",
                  borderWidth: 1,
                  padding: 5,
                  height: 90,
                  justifyContent: "flex-end",
                }}
              >
                <Text style={styles.text}>Verified and Counter Signature</Text>
                <View
                  style={{
                    marginTop: 40,
                    paddingVertical: 5,
                  }}
                >
                  <View
                    style={{
                      height: 3,
                      borderTopWidth: 1,
                      borderBottomWidth: 1,
                      borderStyle: "dashed",
                    }}
                  ></View>
                  <Text style={[styles.text, { marginTop: 5 }]}></Text>
                  <Text style={styles.text}>SUB INSPECTOR OF SCHOOLS</Text>
                </View>
              </View>
              <View
                style={{
                  width: "30%",
                  borderWidth: 1,
                  padding: 5,
                  height: 90,
                  justifyContent: "flex-end",
                }}
              >
                <View
                  style={{
                    marginTop: 30,
                    paddingVertical: 5,
                  }}
                >
                  <View
                    style={{
                      height: 3,
                      borderTopWidth: 1,
                      borderBottomWidth: 1,
                      borderStyle: "dashed",
                    }}
                  ></View>
                  <Text style={[styles.text, { marginTop: 5 }]}>
                    SIGNATURE OF THE INCUMBENT
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}
const styles = StyleSheet.create({
  page: {
    padding: 2,
    margin: 2,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    width: width,
    height: height,
  },
  pageMainView: {
    padding: 2,
    margin: 2,
    backgroundColor: "#FFFFFF",
    alignSelf: "center",
    width: "100%",
    height: "98%",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "TimesBold",
    textAlign: "center",
    padding: 2,
  },
  textBold: {
    fontSize: 10,
    fontWeight: "bold",
    fontFamily: "TimesBold",
    textAlign: "center",
  },
  titleMain: {
    fontSize: 14,
    fontWeight: "normal",
    fontFamily: "Arial",
    textAlign: "center",
  },
  text: {
    fontSize: 9,
    fontFamily: "ArialItalic",
    textAlign: "center",
  },
  text2: {
    fontSize: 14,
    fontFamily: "Arial",
    textAlign: "center",
    padding: 2,
  },
  text3: {
    fontSize: 12,
    fontFamily: "ArialItalic",
    textAlign: "center",
    padding: 2,
  },
  text2i: {
    fontSize: 8,
    fontFamily: "ArialItalic",
    textAlign: "center",
    padding: 2,
  },

  text4: {
    fontSize: 8,
    fontFamily: "Times",
    textAlign: "center",
  },
  text5: {
    fontSize: 9,
    fontFamily: "Times",
    textAlign: "center",
  },
  headingView: {
    // border: "1px solid",
    borderWidth: 1,
    width: "100%",
    height: "auto",
  },
  salaryView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignContent: "center",
    width: "100%",
  },
  tableStartView: {
    borderTopWidth: 0,
    borderLeftWidth: 0.5,
    borderRightWidth: 0,
    borderBottomWidth: 0.5,
    width: "100%",
    height: "auto",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  tableStartBorderView: {
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 1,
    width: "100%",
    height: "auto",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  tableStartBorderView2: {
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 1,
    width: "95%",
    height: "auto",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  mainBorderView: {
    borderWidth: 1,
    width: "100%",
    height: "auto",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  view88H20: {
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 1,
    borderBottomWidth: 0,
    paddingRight: 1,
    width: "8.78%",
    height: 20,
  },
  view16: {
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 1,
    borderBottomWidth: 0,
    paddingRight: 1,
    width: "16%",
    height: 32,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  view16H0: {
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 1,
    borderBottomWidth: 0,
    width: "16%",
    height: 14,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  view32H0: {
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 1,
    borderBottomWidth: 0,
    width: "32%",
    height: 14,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  view10: {
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 1,
    borderBottomWidth: 0,
    paddingRight: 1,
    width: "10%",
    height: 32,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  view10H0: {
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 1,
    borderBottomWidth: 0,
    paddingRight: 1,
    width: "10%",
    height: 14,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  SecondView10: {
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 1,
    borderBottomWidth: 0,
    paddingRight: 1,
    width: "10%",
    height: 15,
  },
  view5: {
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 1,
    borderBottomWidth: 0,
    paddingRight: 1,
    width: "5%",
    height: 73,
    justifyContent: "center",
    alignItems: "center",
  },
  view25: {
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 1,
    width: "25%",
    justifyContent: "center",
    alignItems: "center",
  },
  view50: {
    width: "50%",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  view50Center: {
    width: "50%",
    height: 14,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    borderRightWidth: 1,
  },

  rowStartView: {
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0.5,
    width: "100%",
    height: "auto",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  rowStartBorderView: {
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 1,
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    alignContent: "center",
  },
  rowWrapView: {
    paddingRight: 1,
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  rowFlexView: {
    paddingRight: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center",
  },
  columnFlexView: {
    paddingRight: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  rowFlexViewEvenly: {
    paddingRight: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignContent: "center",
    alignItems: "center",
  },
  break: {
    borderBottomWidth: 1,
    width: "100%",
    height: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  secondRowView: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    alignContent: "center",
    paddingHorizontal: 5,
  },
});
Font.register({
  family: "Algerian",
  src: "https://raw.githubusercontent.com/amtawestwbtpta/awwbtptadata/main/Arial.ttf",
});
Font.register({
  family: "Times",
  src: "https://raw.githubusercontent.com/amtawestwbtpta/awwbtptadata/main/times.ttf",
});
Font.register({
  family: "TimesBold",
  src: "https://raw.githubusercontent.com/amtawestwbtpta/awwbtptadata/main/timesBold.ttf",
});
Font.register({
  family: "Arial",
  src: "https://raw.githubusercontent.com/amtawestwbtpta/awwbtptadata/main/arial.ttf",
});
Font.register({
  family: "ArialItalic",
  src: "https://raw.githubusercontent.com/amtawestwbtpta/awwbtptadata/main/ariali.ttf",
});
