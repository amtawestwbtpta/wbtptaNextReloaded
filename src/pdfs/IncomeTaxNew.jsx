"use client";
import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import { IndianFormat, round2dec } from "../modules/calculatefunctions";
const width = 2480;
const height = 3508;

export default function IncomeTaxNew({ data }) {
  const {
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
  } = data;
  return (
    <Document
      style={{ margin: 5, padding: 5 }}
      title={`IT Statement of ${tname} of ${school}`}
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
              <View
                style={[
                  styles.tableStartBorderView,
                  { flexDirection: "column" },
                ]}
              >
                <Text style={styles.titleMain}>
                  HOWRAH DISTRICT PRIMARY SCHOOL COUNCIL
                </Text>
                <Text style={styles.text2}>DECLARATION OF INCOME TAX</Text>
                <Text style={styles.text3}>
                  FOR THE FINANCIAL YEAR {`${prevYear} - ${thisYear}`} RELATION
                  TO ASSESMENT YEAR {finYear}
                </Text>
              </View>
              <View style={[styles.tableStartBorderView, { height: 5 }]}></View>
              <View
                style={[
                  styles.tableStartBorderView,
                  { flexDirection: "column" },
                ]}
              >
                <View
                  style={[
                    styles.rowStartBorderView,
                    {
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      borderBottomWidth: 0,
                    },
                  ]}
                >
                  <Text style={styles.text}>Name of the Teacher: </Text>
                  <Text style={[styles.textBold, { marginLeft: 5 }]}>
                    {tname}
                  </Text>
                </View>
                <View
                  style={[
                    styles.rowStartBorderView,
                    {
                      flexDirection: "row",
                      justifyContent: "space-between",
                      borderBottomWidth: 0,
                      width: "100%",
                    },
                  ]}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      borderBottomWidth: 0,
                      width: "20%",
                    }}
                  >
                    <Text style={styles.text}>Designation: </Text>
                    <Text style={[styles.textBold, { marginLeft: 5 }]}>
                      {desig}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      borderBottomWidth: 0,
                      width: "30%",
                    }}
                  >
                    <Text style={styles.text}>Circle: </Text>
                    <Text style={[styles.textBold, { marginLeft: 5 }]}>
                      AMTA WEST CIRCLE
                    </Text>
                  </View>
                </View>
                <View
                  style={[
                    styles.rowStartBorderView,
                    {
                      flexDirection: "row",
                      justifyContent: "space-between",
                      borderBottomWidth: 0,
                      width: "100%",
                    },
                  ]}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      borderBottomWidth: 0,
                      width: "60%",
                    }}
                  >
                    <Text style={styles.text}>School: </Text>
                    <Text style={[styles.textBold, { marginLeft: 5 }]}>
                      {school}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      borderBottomWidth: 0,
                      width: "30%",
                    }}
                  >
                    <Text style={styles.text}>Mobile No: </Text>
                    <Text style={[styles.textBold, { marginLeft: 5 }]}>
                      {phone}
                    </Text>
                  </View>
                </View>
              </View>

              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  borderBottomWidth: 0,
                }}
              >
                <View
                  style={[
                    styles.rowStartBorderView,
                    {
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      borderBottomWidth: 1,
                      borderRightWidth: 1,
                      width: "60%",
                      padding: 2,
                    },
                  ]}
                >
                  <View
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <Text style={[styles.text, { paddingRight: 30 }]}>
                      PAN:{" "}
                    </Text>
                  </View>
                  <View
                    style={{
                      borderWidth: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={[
                        styles.textBold,
                        { marginHorizontal: 5, padding: 1 },
                      ]}
                    >
                      {pan?.slice(0, 1)}
                    </Text>
                  </View>
                  <View
                    style={{
                      borderRightWidth: 1,
                      borderTopWidth: 1,
                      borderBottomWidth: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={[
                        styles.textBold,
                        { marginHorizontal: 5, padding: 1 },
                      ]}
                    >
                      {pan?.slice(1, 2)}
                    </Text>
                  </View>
                  <View
                    style={{
                      borderRightWidth: 1,
                      borderTopWidth: 1,
                      borderBottomWidth: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={[
                        styles.textBold,
                        { marginHorizontal: 5, padding: 1 },
                      ]}
                    >
                      {pan?.slice(2, 3)}
                    </Text>
                  </View>
                  <View
                    style={{
                      borderRightWidth: 1,
                      borderTopWidth: 1,
                      borderBottomWidth: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={[
                        styles.textBold,
                        { marginHorizontal: 5, padding: 1 },
                      ]}
                    >
                      {pan?.slice(3, 4)}
                    </Text>
                  </View>
                  <View
                    style={{
                      borderRightWidth: 1,
                      borderTopWidth: 1,
                      borderBottomWidth: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={[
                        styles.textBold,
                        { marginHorizontal: 5, padding: 1 },
                      ]}
                    >
                      {pan?.slice(4, 5)}
                    </Text>
                  </View>
                  <View
                    style={{
                      borderRightWidth: 1,
                      borderTopWidth: 1,
                      borderBottomWidth: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={[
                        styles.textBold,
                        { marginHorizontal: 5, padding: 1 },
                      ]}
                    >
                      {pan?.slice(5, 6)}
                    </Text>
                  </View>
                  <View
                    style={{
                      borderRightWidth: 1,
                      borderTopWidth: 1,
                      borderBottomWidth: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={[
                        styles.textBold,
                        { marginHorizontal: 5, padding: 1 },
                      ]}
                    >
                      {pan?.slice(6, 7)}
                    </Text>
                  </View>
                  <View
                    style={{
                      borderRightWidth: 1,
                      borderTopWidth: 1,
                      borderBottomWidth: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={[
                        styles.textBold,
                        { marginHorizontal: 5, padding: 1 },
                      ]}
                    >
                      {pan?.slice(7, 8)}
                    </Text>
                  </View>
                  <View
                    style={{
                      borderRightWidth: 1,
                      borderTopWidth: 1,
                      borderBottomWidth: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={[
                        styles.textBold,
                        { marginHorizontal: 5, padding: 1 },
                      ]}
                    >
                      {pan?.slice(8, 9)}
                    </Text>
                  </View>
                  <View
                    style={{
                      borderRightWidth: 1,
                      borderTopWidth: 1,
                      borderBottomWidth: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={[
                        styles.textBold,
                        { marginHorizontal: 5, padding: 1 },
                      ]}
                    >
                      {pan?.slice(9, 10)}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    borderRightWidth: 1,
                    borderBottomWidth: 1,
                    width: "20%",
                  }}
                ></View>
                <View style={{ width: "20%" }}></View>
              </View>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  borderBottomWidth: 0,
                }}
              >
                <View
                  style={{
                    borderRightWidth: 1,
                    borderBottomWidth: 1,
                    width: "60%",
                  }}
                >
                  <Text style={[styles.text, { textAlign: "left" }]}>
                    1. GROSS SLARY INCOME (Salary +Arrear Salary +Bonus)
                  </Text>
                </View>
                <View
                  style={{
                    borderRightWidth: 1,
                    borderBottomWidth: 1,
                    width: "20%",
                  }}
                >
                  <Text style={styles.textBold}>
                    Rs. {IndianFormat(AllGross)}
                  </Text>
                </View>
                <View style={{ width: "20%" }}></View>
              </View>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                }}
              >
                <View
                  style={{
                    borderRightWidth: 1,
                    borderBottomWidth: 1,
                    width: "60%",
                  }}
                >
                  <Text style={[styles.text, { textAlign: "left" }]}>
                    2. Less: Exemption of HRA under Sec 10(13A) the least of the
                    following
                  </Text>
                </View>
                <View
                  style={{
                    borderRightWidth: 1,
                    borderBottomWidth: 1,
                    width: "20%",
                  }}
                >
                  <Text style={styles.textBold}></Text>
                </View>
                <View style={{ width: "20%" }}></View>
              </View>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                }}
              >
                <View
                  style={{
                    borderRightWidth: 1,
                    borderBottomWidth: 1,
                    width: "60%",
                  }}
                >
                  <Text style={[styles.text, { textAlign: "left" }]}>
                    a) Actual HRA Received
                  </Text>
                </View>
                <View
                  style={{
                    borderRightWidth: 1,
                    borderBottomWidth: 1,
                    width: "20%",
                  }}
                >
                  <Text style={styles.textBold}></Text>
                </View>
                <View style={{ width: "20%" }}></View>
              </View>
              <View
                style={{
                  width: 110,
                  height: 2,
                  backgroundColor: "black",
                  transform: "rotate(-24deg)",
                  left: 330,
                  top: 160,
                  position: "absolute",
                }}
              ></View>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                }}
              >
                <View
                  style={{
                    borderRightWidth: 1,
                    borderBottomWidth: 1,
                    width: "60%",
                  }}
                >
                  <Text style={[styles.text, { textAlign: "left" }]}>
                    b) Rent Paid in excess of 10% of Salary (Basic + DA)
                  </Text>
                </View>
                <View
                  style={{
                    borderRightWidth: 1,
                    borderBottomWidth: 1,
                    width: "20%",
                  }}
                >
                  <Text style={styles.textBold}></Text>
                </View>
                <View style={{ width: "20%" }}></View>
              </View>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                }}
              >
                <View
                  style={{
                    borderRightWidth: 1,
                    borderBottomWidth: 1,
                    width: "60%",
                  }}
                >
                  <Text style={[styles.text, { textAlign: "left" }]}>
                    c) 40% of Salary (Basic + DA)
                  </Text>
                </View>
                <View
                  style={{
                    borderRightWidth: 1,
                    borderBottomWidth: 1,
                    width: "20%",
                  }}
                >
                  <Text style={styles.textBold}></Text>
                </View>
                <View style={{ width: "20%" }}></View>
              </View>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  borderBottomWidth: 1,
                }}
              >
                <View style={{ borderRightWidth: 1, width: "60%" }}>
                  <Text style={[styles.text, { textAlign: "left" }]}></Text>
                </View>
                <View style={{ borderRightWidth: 1, width: "20%" }}>
                  <Text style={styles.textBold}>
                    Rs. {IndianFormat(AllGross)}
                  </Text>
                </View>
                <View style={{ width: "20%" }}></View>
              </View>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  borderBottomWidth: 1,
                }}
              >
                <View style={{ borderRightWidth: 1, width: "80%" }}>
                  <Text style={[styles.text, { textAlign: "left" }]}>
                    3. Less: P. Tax under section 16(iii)
                  </Text>
                </View>
                <View style={{ width: "20%" }}>
                  <Text style={styles.textBold}>
                    {grossPTax !== 0 ? `Rs. ${IndianFormat(grossPTax)}` : "NIL"}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  borderBottomWidth: 1,
                }}
              >
                <View style={{ borderRightWidth: 1, width: "80%" }}>
                  <Text style={[styles.text, { textAlign: "left" }]}>
                    4. Less: Standard Deduction for Salaried & Pensioner
                    (Rs.75,000)
                  </Text>
                </View>
                <View style={{ width: "20%" }}>
                  <Text style={styles.textBold}>Rs. {IndianFormat(75000)}</Text>
                </View>
              </View>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  borderBottomWidth: 1,
                }}
              >
                <View style={{ borderRightWidth: 1, width: "80%" }}>
                  <Text style={[styles.text, { textAlign: "left" }]}>
                    5. Income chargeable under the head Salaries (1-2-3-4)
                  </Text>
                </View>
                <View style={{ width: "20%" }}>
                  <Text style={styles.textBold}>
                    Rs. {IndianFormat(AllGross - 75000)}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  borderBottomWidth: 1,
                }}
              >
                <View style={{ borderRightWidth: 1, width: "80%" }}>
                  <Text style={[styles.text, { textAlign: "left" }]}>
                    6. Income under any head other than salaries (From Schedule
                    OS)
                  </Text>
                </View>
                <View style={{ width: "20%" }}>
                  <Text style={styles.textBold}>
                    Rs. {IndianFormat(BankInterest)}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  borderBottomWidth: 1,
                }}
              >
                <View style={{ borderRightWidth: 1, width: "80%" }}>
                  <Text style={[styles.text, { textAlign: "left" }]}>
                    7. Interest on House Building Loan
                  </Text>
                </View>
                <View style={{ width: "20%" }}>
                  <Text style={styles.textBold}>NOT APPLICABLE</Text>
                </View>
              </View>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  borderBottomWidth: 1,
                }}
              >
                <View style={{ borderRightWidth: 1, width: "80%" }}>
                  <Text style={[styles.text, { textAlign: "left" }]}>
                    8. Gross Total Income [(5+6)-7)
                  </Text>
                </View>
                <View style={{ width: "20%" }}>
                  <Text style={styles.textBold}>
                    Rs. {IndianFormat(GrossTotalIncome)}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  borderBottomWidth: 1,
                }}
              >
                <View style={{ borderRightWidth: 1, width: "80%" }}>
                  <Text style={[styles.text, { textAlign: "left" }]}>
                    9. Deduction under Chapter VIA (From Schedule-VIA){"\n"}
                    Aggregate amount of deductions admissible U /S 80C, 80CCC
                    and 80CCD(I) (Limited to Rs.1,50,000/-)
                  </Text>
                </View>
                <View style={{ width: "20%" }}>
                  <Text style={styles.textBold}>NOT APPLICABLE</Text>
                </View>
              </View>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  borderBottomWidth: 1,
                }}
              >
                <View style={{ borderRightWidth: 1, width: "80%" }}>
                  <Text style={[styles.text, { textAlign: "left" }]}>
                    10. Amount deduction under section 80CCD(B)
                  </Text>
                </View>
                <View style={{ width: "20%" }}>
                  <Text style={styles.textBold}>NOT APPLICABLE</Text>
                </View>
              </View>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  borderBottomWidth: 1,
                }}
              >
                <View style={{ borderRightWidth: 1, width: "80%" }}>
                  <Text style={[styles.text, { textAlign: "left" }]}>
                    11. Amount deduction under any other provision(s) Chapter
                    VI-A (From Schedule- Other VIA)
                  </Text>
                </View>
                <View style={{ width: "20%" }}>
                  <Text style={styles.textBold}>NOT APPLICABLE</Text>
                </View>
              </View>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  borderBottomWidth: 1,
                }}
              >
                <View style={{ borderRightWidth: 1, width: "80%" }}>
                  <Text style={[styles.text, { textAlign: "left" }]}>
                    12. Total Income (8-9-10-11)
                  </Text>
                </View>
                <View style={{ width: "20%" }}>
                  <Text style={styles.textBold}>
                    Rs. {IndianFormat(GrossTotalIncome)}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  borderBottomWidth: 1,
                }}
              >
                <View style={{ borderRightWidth: 1, width: "80%" }}>
                  <Text style={[styles.text, { textAlign: "left" }]}>
                    13. Rounding Off of Total Income U/S288A (SI No 12) (If the
                    last figure of Total Income is five of more, the amount
                    shall be increased to the next higher amount which is a
                    multiple of ten)
                  </Text>
                </View>
                <View style={{ width: "20%" }}>
                  <Text style={styles.textBold}>
                    Rs. {IndianFormat(TotalRoundOffIncome)}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  borderBottomWidth: 1,
                }}
              >
                <View style={{ borderRightWidth: 1, width: "80%" }}>
                  <Text style={[styles.text, { textAlign: "left" }]}>
                    14. Income Tax on Total Income
                  </Text>
                </View>
                <View style={{ width: "20%" }}>
                  <Text style={styles.textBold}>
                    Rs. {IndianFormat(CalculatedIT)}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  borderBottomWidth: 1,
                }}
              >
                <View style={{ borderRightWidth: 1, width: "80%" }}>
                  <Text style={[styles.text, { textAlign: "left" }]}>
                    15. Less: Rebate U/S 87A
                  </Text>
                </View>
                <View
                  style={{
                    width: "20%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.textBold}>
                    {GrossRelief > 0
                      ? `Rs. ${IndianFormat(GrossRelief)}`
                      : "NIL"}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  borderBottomWidth: 1,
                }}
              >
                <View style={{ borderRightWidth: 1, width: "80%" }}>
                  <Text style={[styles.text, { textAlign: "left" }]}>
                    16. Total Tax Payable (14-15)
                  </Text>
                </View>
                <View style={{ width: "20%" }}>
                  <Text style={styles.textBold}>
                    {IncomeTaxAfterRelief > 0
                      ? `Rs. ${IndianFormat(IncomeTaxAfterRelief)}`
                      : "NIL"}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  borderBottomWidth: 1,
                }}
              >
                <View style={{ borderRightWidth: 1, width: "80%" }}>
                  <Text style={[styles.text, { textAlign: "left" }]}>
                    17. Add: Health & Education Cess (4% of 16)
                  </Text>
                </View>
                <View style={{ width: "20%" }}>
                  <Text style={styles.textBold}>
                    {IncomeTaxAfterRelief > 0
                      ? `Rs. ${IndianFormat(eduCess)}`
                      : "NIL"}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  borderBottomWidth: 1,
                }}
              >
                <View style={{ borderRightWidth: 1, width: "80%" }}>
                  <Text style={[styles.text, { textAlign: "left" }]}>
                    18. Income Tax Relief U/S 89(When salary, etc. is paid in
                    arrear of advance)
                  </Text>
                </View>
                <View style={{ width: "20%" }}>
                  <Text style={styles.textBold}>NIL</Text>
                </View>
              </View>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  borderBottomWidth: 1,
                }}
              >
                <View style={{ borderRightWidth: 1, width: "80%" }}>
                  <Text style={[styles.text, { textAlign: "left" }]}>
                    19. Net Tax Payable [(16+17)-18]
                  </Text>
                </View>
                <View style={{ width: "20%" }}>
                  <Text style={styles.textBold}>
                    {AddedEduCess > 0
                      ? `Rs. ${IndianFormat(AddedEduCess)}`
                      : "NIL"}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  borderBottomWidth: 1,
                }}
              >
                <View style={{ borderRightWidth: 1, width: "80%" }}>
                  <Text style={[styles.text, { textAlign: "left" }]}>
                    20. Total amount of Tax Deducted at Source (TDS) upto Jan
                    2023
                  </Text>
                </View>
                <View style={{ width: "20%" }}>
                  <Text style={styles.textBold}>
                    {AddedEduCess > 0
                      ? tds !== 0
                        ? `Rs. ${IndianFormat(tds)}`
                        : "NIL"
                      : "N/A"}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  borderBottomWidth: 1,
                }}
              >
                <View style={{ borderRightWidth: 1, width: "80%" }}>
                  <Text style={[styles.text, { textAlign: "left" }]}>
                    21. TDS Payable in Feb 2023/ Excess Tax deduction
                  </Text>
                </View>
                <View style={{ width: "20%" }}>
                  <Text style={styles.textBold}>
                    {AddedEduCess > 0
                      ? `Rs. ${IndianFormat(AddedEduCess - tds)}`
                      : "N/A"}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  width: "30%",

                  padding: 20,
                  width: 200,
                  height: 60,
                  marginLeft: -200,
                  marginTop: 40,
                  marginBottom: 20,
                  borderWidth: 2,
                  justifyContent: "flex-start",
                  alignItems: "center",
                  alignSelf: "center",
                  alignContent: "center",
                }}
              >
                <Text style={[styles.textBold, { marginTop: 20 }]}>
                  Incumbent’s Signature
                </Text>
              </View>
              <View
                style={{
                  width: "100%",

                  padding: 1,
                  borderTopWidth: 1,
                  borderBottomWidth: 1,
                }}
              >
                <Text
                  style={[styles.title, { textAlign: "center", fontSize: 12 }]}
                >
                  Short Tax deduction from salary will not be allowed as per
                  I.T. Rules 1961
                </Text>
              </View>
              <View
                style={{
                  width: "100%",

                  padding: 1,
                  borderBottomWidth: 1,
                }}
              >
                <Text
                  style={[styles.title, { textAlign: "center", fontSize: 12 }]}
                >
                  HRA exemption will not be allowed without proper receipt with
                  PAN of House owner
                </Text>
              </View>
              <View
                style={{
                  width: "100%",

                  padding: 1,
                  borderBottomWidth: 1,
                }}
              >
                <Text
                  style={[styles.title, { textAlign: "center", fontSize: 12 }]}
                >
                  Without supporting documents and deduction will be allowed
                </Text>
              </View>
              <View
                style={{
                  width: "100%",

                  padding: 1,
                }}
              >
                <Text
                  style={[styles.title, { textAlign: "center", fontSize: 12 }]}
                >
                  Last Date of submission 11/01/{thisYear}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Page>
      <Page size="A4" orientation="portrait" style={styles.page}>
        <View style={{ width: "95%" }}>
          <View style={styles.pageMainView}>
            <View
              style={{
                width: "100%",
                padding: 1,
                borderWidth: 1,
              }}
            >
              <Text
                style={[styles.title, { textAlign: "center", fontSize: 12 }]}
              >
                DISTRICT PRIMARY SCHOOL COUNCIL, HOWRAH
              </Text>
            </View>
            <View
              style={{
                width: "100%",
                height: 2,
                padding: 0,
                borderWidth: 0,
              }}
            ></View>

            <View
              style={[
                styles.rowStartBorderView,
                {
                  flexDirection: "row",
                  justifyContent: "space-between",
                  borderWidth: 1,
                  width: "100%",
                },
              ]}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  borderBottomWidth: 0,
                  width: "70%",
                }}
              >
                <View style={{ borderRightWidth: 1, padding: 2 }}>
                  <Text style={styles.text}>Name of the Teacher: </Text>
                </View>
                <View style={{ borderRightWidth: 1, padding: 2, width: "70%" }}>
                  <Text style={[styles.textBold, { marginLeft: 5 }]}>
                    {tname}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  borderBottomWidth: 0,
                  width: "30%",
                }}
              >
                <View style={{ borderRightWidth: 1, padding: 2 }}>
                  <Text style={styles.text}>PAN: </Text>
                </View>
                <View style={{ padding: 2 }}>
                  <Text style={[styles.textBold, { marginLeft: 20 }]}>
                    {pan}
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                width: "100%",
                height: 2,
                padding: 0,
                borderWidth: 0,
              }}
            ></View>
            <View
              style={[
                styles.rowStartBorderView,
                {
                  borderWidth: 1,
                  width: "100%",
                },
              ]}
            >
              <Text
                style={[styles.title, { textAlign: "center", fontSize: 12 }]}
              >
                Schedule - OS (Income from Other Sources)
              </Text>
            </View>
            <View
              style={{
                width: "100%",
                height: 2,
                padding: 0,
                borderWidth: 0,
              }}
            ></View>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                borderWidth: 1,
              }}
            >
              <View
                style={{
                  borderRightWidth: 1,
                  width: "10%",
                  padding: 1,
                }}
              >
                <Text style={styles.text}>a)</Text>
              </View>
              <View
                style={{
                  borderRightWidth: 1,
                  width: "70%",
                  padding: 1,
                }}
              >
                <Text style={[styles.text, { textAlign: "left" }]}>
                  Interest from Bank (SB)
                </Text>
              </View>

              <View style={{ width: "20%", padding: 1 }}>
                <Text style={[styles.textBold, { textAlign: "center" }]}>
                  Rs. {IndianFormat(BankInterest)}
                </Text>
              </View>
            </View>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                borderWidth: 1,
                borderTopWidth: 0,
              }}
            >
              <View
                style={{
                  borderRightWidth: 1,
                  width: "10%",
                  padding: 1,
                }}
              >
                <Text style={styles.text}> b)</Text>
              </View>
              <View
                style={{
                  borderRightWidth: 1,
                  width: "70%",
                  padding: 1,
                }}
              >
                <Text style={[styles.text, { textAlign: "left" }]}>
                  Interest from Bank (FD)
                </Text>
              </View>

              <View style={{ width: "20%", padding: 1 }}>
                <Text style={[styles.textBold, { textAlign: "center" }]}>
                  NIL
                </Text>
              </View>
            </View>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                borderWidth: 1,
                borderTopWidth: 0,
              }}
            >
              <View
                style={{
                  borderRightWidth: 1,
                  width: "10%",
                  padding: 1,
                }}
              >
                <Text style={styles.text}> c)</Text>
              </View>
              <View
                style={{
                  borderRightWidth: 1,
                  width: "70%",
                  padding: 1,
                }}
              >
                <Text style={[styles.text, { textAlign: "left" }]}>
                  Interest from NSC
                </Text>
              </View>

              <View style={{ width: "20%", padding: 1 }}>
                <Text style={[styles.textBold, { textAlign: "center" }]}>
                  NIL
                </Text>
              </View>
            </View>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                borderWidth: 1,
                borderTopWidth: 0,
              }}
            >
              <View
                style={{
                  borderRightWidth: 1,
                  width: "10%",
                  padding: 1,
                }}
              >
                <Text style={styles.text}> d)</Text>
              </View>
              <View
                style={{
                  borderRightWidth: 1,
                  width: "70%",
                  padding: 1,
                }}
              >
                <Text style={[styles.text, { textAlign: "left" }]}>
                  Interest from Bond
                </Text>
              </View>

              <View style={{ width: "20%", padding: 1 }}>
                <Text style={[styles.textBold, { textAlign: "center" }]}>
                  NIL
                </Text>
              </View>
            </View>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                borderWidth: 1,
                borderTopWidth: 0,
              }}
            >
              <View
                style={{
                  borderRightWidth: 1,
                  width: "10%",
                  padding: 1,
                }}
              >
                <Text style={styles.text}> e)</Text>
              </View>
              <View
                style={{
                  borderRightWidth: 1,
                  width: "70%",
                  padding: 1,
                }}
              >
                <Text style={[styles.text, { textAlign: "left" }]}>
                  Divident from Share
                </Text>
              </View>

              <View style={{ width: "20%", padding: 1 }}>
                <Text style={[styles.textBold, { textAlign: "center" }]}>
                  NIL
                </Text>
              </View>
            </View>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                borderWidth: 1,
                borderTopWidth: 0,
              }}
            >
              <View
                style={{
                  borderRightWidth: 1,
                  width: "10%",
                  padding: 1,
                }}
              >
                <Text style={styles.text}> f)</Text>
              </View>
              <View
                style={{
                  borderRightWidth: 1,
                  width: "70%",
                  padding: 1,
                }}
              >
                <Text style={[styles.text, { textAlign: "left" }]}></Text>
              </View>

              <View style={{ width: "20%", padding: 1 }}>
                <Text style={[styles.textBold, { textAlign: "center" }]}></Text>
              </View>
            </View>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                borderWidth: 1,
                borderTopWidth: 0,
              }}
            >
              <View
                style={{
                  borderRightWidth: 1,
                  width: "10%",
                  padding: 1,
                }}
              >
                <Text style={styles.text}> g)</Text>
              </View>
              <View
                style={{
                  borderRightWidth: 1,
                  width: "70%",
                  padding: 1,
                }}
              >
                <Text style={[styles.text, { textAlign: "left" }]}></Text>
              </View>

              <View style={{ width: "20%", padding: 1 }}>
                <Text style={[styles.textBold, { textAlign: "center" }]}></Text>
              </View>
            </View>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                borderWidth: 1,
                borderTopWidth: 0,
              }}
            >
              <View
                style={{
                  borderRightWidth: 1,
                  width: "10%",
                  padding: 1,
                }}
              >
                <Text style={styles.text}> h)</Text>
              </View>
              <View
                style={{
                  borderRightWidth: 1,
                  width: "70%",
                  padding: 1,
                }}
              >
                <Text style={[styles.text, { textAlign: "left" }]}>
                  Family Pension:
                </Text>
              </View>

              <View style={{ width: "20%", padding: 1 }}>
                <Text style={[styles.textBold, { textAlign: "center" }]}>
                  NIL
                </Text>
              </View>
            </View>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                borderWidth: 1,
                borderTopWidth: 0,
              }}
            >
              <View
                style={{
                  borderRightWidth: 1,
                  width: "80%",
                  padding: 1,
                }}
              >
                <Text style={[styles.textBold, { textAlign: "center" }]}>
                  Income under any head other than the head "Salaries"
                </Text>
              </View>

              <View style={{ width: "20%", padding: 1 }}>
                <Text style={[styles.textBold, { textAlign: "center" }]}>
                  Rs. {IndianFormat(BankInterest)}
                </Text>
              </View>
            </View>
            <View
              style={{
                width: "100%",
                height: 2,
                padding: 0,
                borderWidth: 0,
              }}
            ></View>
            <View
              style={{
                width: "100%",
                padding: 1,
                borderWidth: 1,
              }}
            >
              <Text style={[styles.textBold, { textAlign: "center" }]}>
                Schedule- VIA : (Deductions under Chapter VIA)
              </Text>
            </View>
            <View
              style={{
                width: "100%",
                height: 2,
                padding: 0,
                borderWidth: 0,
              }}
            ></View>
            <View
              style={{
                width: "100%",
                padding: 1,
                borderWidth: 1,
              }}
            >
              <Text
                style={[styles.textBold, { textAlign: "left", paddingLeft: 5 }]}
              >
                A) U/S 80 C:
              </Text>
              {/* <Image
                  source={{ uri: NAIMAGEURL }}
                  style={{
                    height: 240,
                    width: 240,
                    marginBottom: 0,
                    marginLeft: 300,

                    position: "absolute",
                  }}
                /> */}
            </View>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                borderWidth: 1,
                borderTopWidth: 0,
              }}
            >
              <View
                style={{
                  borderRightWidth: 1,
                  width: "80%",
                  padding: 1,
                }}
              >
                <Text style={[styles.text, { textAlign: "left" }]}>
                  a) Contribution of GPF
                </Text>
              </View>

              <View style={{ width: "20%", padding: 1 }}>
                <Text style={[styles.textBold, { textAlign: "center" }]}>
                  NOT APPLICABLE
                </Text>
              </View>
            </View>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                borderWidth: 1,
                borderTopWidth: 0,
              }}
            >
              <View
                style={{
                  borderRightWidth: 1,
                  width: "80%",
                  padding: 1,
                }}
              >
                <Text style={[styles.text, { textAlign: "left" }]}>
                  b) Deposit in Sukanya Samriddhi Account
                </Text>
              </View>

              <View style={{ width: "20%", padding: 1 }}>
                <Text style={[styles.textBold, { textAlign: "center" }]}>
                  NOT APPLICABLE
                </Text>
              </View>
            </View>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                borderWidth: 1,
                borderTopWidth: 0,
              }}
            >
              a) Income upto Rs. 3,00,000/-
              <View
                style={{
                  borderRightWidth: 1,
                  width: "80%",
                  padding: 1,
                }}
              >
                <Text style={[styles.text, { textAlign: "left" }]}>
                  c) NSC / Others
                </Text>
              </View>
              <View style={{ width: "20%", padding: 1 }}>
                <Text style={[styles.textBold, { textAlign: "center" }]}>
                  NOT APPLICABLE
                </Text>
              </View>
            </View>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                borderWidth: 1,
                borderTopWidth: 0,
              }}
            >
              <View
                style={{
                  borderRightWidth: 1,
                  width: "80%",
                  padding: 1,
                }}
              >
                <Text style={[styles.text, { textAlign: "left" }]}>
                  d) ULIP /ELSS
                </Text>
              </View>

              <View style={{ width: "20%", padding: 1 }}>
                <Text style={[styles.textBold, { textAlign: "center" }]}>
                  NOT APPLICABLE
                </Text>
              </View>
            </View>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                borderWidth: 1,
                borderTopWidth: 0,
              }}
            >
              <View
                style={{
                  borderRightWidth: 1,
                  width: "80%",
                  padding: 1,
                }}
              >
                <Text style={[styles.text, { textAlign: "left" }]}>
                  e) Repayment of Housing Loan (Principal)
                </Text>
              </View>

              <View style={{ width: "20%", padding: 1 }}>
                <Text style={[styles.textBold, { textAlign: "center" }]}>
                  NOT APPLICABLE
                </Text>
              </View>
            </View>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                borderWidth: 1,
                borderTopWidth: 0,
              }}
            >
              <View
                style={{
                  borderRightWidth: 1,
                  width: "80%",
                  padding: 1,
                }}
              >
                <Text style={[styles.text, { textAlign: "left" }]}>
                  f) Interest on NSC (upto 5th Year)
                </Text>
              </View>

              <View style={{ width: "20%", padding: 1 }}>
                <Text style={[styles.textBold, { textAlign: "center" }]}>
                  NOT APPLICABLE
                </Text>
              </View>
            </View>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                borderWidth: 1,
                borderTopWidth: 0,
              }}
            >
              <View
                style={{
                  borderRightWidth: 1,
                  width: "80%",
                  padding: 1,
                }}
              >
                <Text style={[styles.text, { textAlign: "left" }]}>g)PPF</Text>
              </View>

              <View style={{ width: "20%", padding: 1 }}>
                <Text style={[styles.textBold, { textAlign: "center" }]}>
                  NOT APPLICABLE
                </Text>
              </View>
            </View>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                borderWidth: 1,
                borderTopWidth: 0,
              }}
            >
              <View
                style={{
                  borderRightWidth: 1,
                  width: "80%",
                  padding: 1,
                }}
              >
                <Text style={[styles.text, { textAlign: "left" }]}>
                  h) LIC Premium
                </Text>
              </View>

              <View style={{ width: "20%", padding: 1 }}>
                <Text style={[styles.textBold, { textAlign: "center" }]}>
                  NOT APPLICABLE
                </Text>
              </View>
            </View>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                borderWidth: 1,
                borderTopWidth: 0,
              }}
            >
              <View
                style={{
                  borderRightWidth: 1,
                  width: "80%",
                  padding: 1,
                }}
              >
                <Text style={[styles.text, { textAlign: "left" }]}>
                  i) UC Premium
                </Text>
              </View>

              <View style={{ width: "20%", padding: 1 }}>
                <Text style={[styles.textBold, { textAlign: "center" }]}>
                  NOT APPLICABLE
                </Text>
              </View>
            </View>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                borderWidth: 1,
                borderTopWidth: 0,
              }}
            >
              <View
                style={{
                  borderRightWidth: 1,
                  width: "80%",
                  padding: 1,
                }}
              >
                <Text style={[styles.text, { textAlign: "left" }]}>
                  j) Tution Fees
                </Text>
              </View>

              <View style={{ width: "20%", padding: 1 }}>
                <Text style={[styles.textBold, { textAlign: "center" }]}>
                  NOT APPLICABLE
                </Text>
              </View>
            </View>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                borderWidth: 1,
                borderTopWidth: 0,
              }}
            >
              <View
                style={{
                  borderRightWidth: 1,
                  width: "80%",
                  padding: 1,
                }}
              >
                <Text style={[styles.text, { textAlign: "left" }]}>
                  l) GSLI
                </Text>
              </View>

              <View style={{ width: "20%", padding: 1 }}>
                <Text style={[styles.textBold, { textAlign: "center" }]}>
                  NOT APPLICABLE
                </Text>
              </View>
            </View>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                borderWidth: 1,
                borderTopWidth: 0,
              }}
            >
              <View
                style={{
                  //  borderRightWidth: 1,
                  width: "80%",
                  padding: 1,
                }}
              >
                <Text
                  style={[
                    styles.textBold,
                    { textAlign: "left", paddingLeft: 5 },
                  ]}
                >
                  B) U/S 80 CCC:
                </Text>
              </View>

              {/* <View style={{ width: "20%", padding: 1 }}>
           <Text style={[styles.textBold, { textAlign: "center" }]}></Text>
         </View> */}
            </View>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                borderWidth: 1,
                borderTopWidth: 0,
              }}
            >
              <View
                style={{
                  borderRightWidth: 1,
                  width: "80%",
                  padding: 1,
                }}
              >
                <Text style={[styles.text, { textAlign: "left" }]}>
                  a) Annuity Plan for UC Pension Fund & 80 CCC
                </Text>
              </View>

              <View style={{ width: "20%", padding: 1 }}>
                <Text style={[styles.textBold, { textAlign: "center" }]}>
                  NOT APPLICABLE
                </Text>
              </View>
            </View>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                borderWidth: 1,
                borderTopWidth: 0,
              }}
            >
              <View
                style={{
                  borderRightWidth: 1,
                  width: "80%",
                  padding: 1,
                }}
              >
                <Text style={[styles.textBold, { textAlign: "center" }]}>
                  Total Deduction under A & B above (Limited to Rs. 1,50,000/-)
                </Text>
              </View>

              <View style={{ width: "20%", padding: 1 }}>
                <Text style={[styles.textBold, { textAlign: "center" }]}>
                  NOT APPLICABLE
                </Text>
              </View>
            </View>
            <View
              style={{
                width: "100%",
                height: 2,
                padding: 0,
                borderWidth: 0,
              }}
            ></View>
            <View
              style={{
                width: "100%",
                padding: 1,
                borderWidth: 1,
              }}
            >
              <Text style={[styles.textBold, { textAlign: "center" }]}>
                Schedule - Other VIA
              </Text>
            </View>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                borderWidth: 1,
                borderTopWidth: 0,
              }}
            >
              <View
                style={{
                  borderRightWidth: 1,
                  width: "80%",
                  padding: 1,
                }}
              >
                <Text style={[styles.text, { textAlign: "left" }]}>
                  A) U/S 80CCD (18) : New Pension Scheme (Limit upto
                  Rs.50,000/-)
                </Text>
              </View>

              <View style={{ width: "20%", padding: 1 }}>
                <Text style={[styles.textBold, { textAlign: "center" }]}>
                  NOT APPLICABLE
                </Text>
              </View>
            </View>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                borderWidth: 1,
                borderTopWidth: 0,
              }}
            >
              <View
                style={{
                  borderRightWidth: 1,
                  width: "80%",
                  padding: 1,
                }}
              >
                <Text style={[styles.text, { textAlign: "left" }]}>
                  B) U/S 80D: Premium on Med. Insurance (Mediclaim) Policy
                </Text>
              </View>

              <View style={{ width: "20%", padding: 1 }}>
                <Text style={[styles.textBold, { textAlign: "center" }]}>
                  NOT APPLICABLE
                </Text>
              </View>
            </View>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                borderWidth: 1,
                borderTopWidth: 0,
              }}
            >
              <View
                style={{
                  borderRightWidth: 1,
                  width: "80%",
                  padding: 1,
                }}
              >
                <Text style={[styles.text, { textAlign: "left" }]}>
                  C) U/S 80DD: Maintenance & treatment of a dependent disabled
                </Text>
              </View>

              <View style={{ width: "20%", padding: 1 }}>
                <Text style={[styles.textBold, { textAlign: "center" }]}>
                  NOT APPLICABLE
                </Text>
              </View>
            </View>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                borderWidth: 1,
                borderTopWidth: 0,
              }}
            >
              <View
                style={{
                  borderRightWidth: 1,
                  width: "80%",
                  padding: 1,
                }}
              >
                <Text style={[styles.text, { textAlign: "left" }]}>
                  D) U/S 80DDB : Medical treatment of dependent person with
                  terminal Disease
                </Text>
              </View>

              <View style={{ width: "20%", padding: 1 }}>
                <Text style={[styles.textBold, { textAlign: "center" }]}>
                  NOT APPLICABLE
                </Text>
              </View>
            </View>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                borderWidth: 1,
                borderTopWidth: 0,
              }}
            >
              <View
                style={{
                  borderRightWidth: 1,
                  width: "80%",
                  padding: 1,
                }}
              >
                <Text style={[styles.text, { textAlign: "left" }]}>
                  E) U/S 80E : Repayment of Interest of paid on Education Loan
                </Text>
              </View>

              <View style={{ width: "20%", padding: 1 }}>
                <Text style={[styles.textBold, { textAlign: "center" }]}>
                  NOT APPLICABLE
                </Text>
              </View>
            </View>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                borderWidth: 1,
                borderTopWidth: 0,
              }}
            >
              <View
                style={{
                  borderRightWidth: 1,
                  width: "80%",
                  padding: 1,
                }}
              >
                <Text style={[styles.text, { textAlign: "left" }]}>
                  F) U/S 80U : Tax-payee with disability
                </Text>
              </View>

              <View style={{ width: "20%", padding: 1 }}>
                <Text style={[styles.textBold, { textAlign: "center" }]}>
                  NOT APPLICABLE
                </Text>
              </View>
            </View>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                borderWidth: 1,
                borderTopWidth: 0,
              }}
            >
              <View
                style={{
                  borderRightWidth: 1,
                  width: "80%",
                  padding: 1,
                }}
              >
                <Text style={[styles.text, { textAlign: "left" }]}>
                  G) U/S 80TTA: Deduction in respect of interest on Deposits in
                  savings accounts
                </Text>
              </View>

              <View style={{ width: "20%", padding: 1 }}>
                <Text style={[styles.textBold, { textAlign: "center" }]}>
                  NOT APPLICABLE
                </Text>
              </View>
            </View>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                borderWidth: 1,
                borderTopWidth: 0,
              }}
            >
              <View
                style={{
                  borderRightWidth: 1,
                  width: "80%",
                  padding: 1,
                }}
              >
                <Text style={[styles.text, { textAlign: "left" }]}>
                  H) U/S 80G : Deduction in respect of Donation to certain fund,
                  Charitable institutions
                </Text>
              </View>

              <View style={{ width: "20%", padding: 1 }}>
                <Text style={[styles.textBold, { textAlign: "center" }]}>
                  NOT APPLICABLE
                </Text>
              </View>
            </View>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                borderWidth: 1,
                borderTopWidth: 0,
              }}
            >
              <View
                style={{
                  borderRightWidth: 1,
                  width: "80%",
                  padding: 1,
                }}
              >
                <Text style={[styles.text, { textAlign: "left" }]}>I)</Text>
              </View>

              <View style={{ width: "20%", padding: 1 }}>
                <Text style={[styles.textBold, { textAlign: "center" }]}></Text>
              </View>
            </View>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                borderWidth: 1,
                borderTopWidth: 0,
              }}
            >
              <View
                style={{
                  borderRightWidth: 1,
                  width: "80%",
                  padding: 1,
                }}
              >
                <Text style={[styles.textBold, { textAlign: "center" }]}>
                  Total Amount deductible under any other provision (s) of
                  Chapter VI-A
                </Text>
              </View>

              <View style={{ width: "20%", padding: 1 }}>
                <Text style={[styles.textBold, { textAlign: "center" }]}>
                  NOT APPLICABLE
                </Text>
              </View>
            </View>
            <View
              style={{
                width: "100%",
                padding: 1,
                borderWidth: 1,
              }}
            >
              <Text style={[styles.textBold, { textAlign: "center" }]}>
                Income Tax Structure: F.Y. {finYear}
              </Text>
            </View>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                borderWidth: 1,
                borderTopWidth: 0,
              }}
            >
              <View
                style={{
                  borderRightWidth: 1,
                  width: "80%",
                  padding: 1,
                }}
              >
                <Text style={[styles.textBold, { textAlign: "center" }]}>
                  a) Income upto Rs. Rs.3,00,000/-
                </Text>
              </View>

              <View style={{ width: "20%", padding: 1 }}>
                <Text style={[styles.textBold, { textAlign: "center" }]}>
                  NIL
                </Text>
              </View>
            </View>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                borderWidth: 1,
                borderTopWidth: 0,
              }}
            >
              <View
                style={{
                  borderRightWidth: 1,
                  width: "80%",
                  padding: 1,
                }}
              >
                <Text style={[styles.textBold, { textAlign: "center" }]}>
                  b) Income from Rs.3,00,001/- to Rs.7,00,000/-: @5%
                </Text>
              </View>

              <View style={{ width: "20%", padding: 1 }}>
                <Text style={[styles.textBold, { textAlign: "center" }]}>
                  {FiveITTax > 0
                    ? `Rs. ${IndianFormat(Math.floor(FiveIT * 0.05))}`
                    : "NIL"}
                </Text>
              </View>
            </View>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                borderWidth: 1,
                borderTopWidth: 0,
              }}
            >
              <View
                style={{
                  borderRightWidth: 1,
                  width: "80%",
                  padding: 1,
                }}
              >
                <Text style={[styles.textBold, { textAlign: "center" }]}>
                  c) Income from 7,00,001/- to Rs. 10,00,000/-: @10%
                </Text>
              </View>

              <View style={{ width: "20%", padding: 1 }}>
                <Text style={[styles.textBold, { textAlign: "center" }]}>
                  {TenITTax > 0
                    ? `Rs. ${IndianFormat(Math.floor(TenIT * 0.1))}`
                    : "NIL"}
                </Text>
              </View>
            </View>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                borderWidth: 1,
                borderTopWidth: 0,
              }}
            >
              <View
                style={{
                  borderRightWidth: 1,
                  width: "80%",
                  padding: 1,
                }}
              >
                <Text style={[styles.textBold, { textAlign: "center" }]}>
                  d) Income from 10,00,001/- to Rs. 12,00,000/-: @15%
                </Text>
              </View>

              <View style={{ width: "20%", padding: 1 }}>
                <Text style={[styles.textBold, { textAlign: "center" }]}>
                  {FifteenITTax > 0
                    ? `Rs. ${IndianFormat(Math.floor(FifteenIT * 0.15))}`
                    : "NIL"}
                </Text>
              </View>
            </View>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                borderWidth: 1,
                borderTopWidth: 0,
              }}
            >
              <View
                style={{
                  borderRightWidth: 1,
                  width: "80%",
                  padding: 1,
                }}
              >
                <Text style={[styles.textBold, { textAlign: "center" }]}>
                  e) Income from 12,00,001/- to Rs. 15,00,000/-: @20%
                </Text>
              </View>

              <View style={{ width: "20%", padding: 1 }}>
                <Text style={[styles.textBold, { textAlign: "center" }]}>
                  {TwentyITTax > 0
                    ? `Rs. ${IndianFormat(Math.floor(TwentyIT * 0.2))}`
                    : "NIL"}
                </Text>
              </View>
            </View>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                borderWidth: 1,
                borderTopWidth: 0,
              }}
            >
              <View
                style={{
                  borderRightWidth: 1,
                  width: "80%",
                  padding: 1,
                }}
              >
                <Text style={[styles.textBold, { textAlign: "center" }]}>
                  f) Income exceeding Rs. 15,00,000/-: @30%
                </Text>
              </View>

              <View style={{ width: "20%", padding: 1 }}>
                <Text style={[styles.textBold, { textAlign: "center" }]}>
                  {ThirtyITTax > 0
                    ? `Rs. ${IndianFormat(Math.floor(ThirtyIT * 0.3))}`
                    : "NIL"}
                </Text>
              </View>
            </View>
            <View
              style={{
                padding: 5,
                width: 200,
                height: 60,
                marginLeft: 270,
                marginTop: 45,
                marginBottom: 0,
                borderWidth: 2,
                justifyContent: "flex-start",
                alignItems: "center",
                alignSelf: "center",
                alignContent: "center",
              }}
            >
              <Text style={[styles.textBold, { margin: 2, marginTop: 30 }]}>
                Incumbent’s Signature
              </Text>
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
                <Text style={styles.title}>
                  DISTRICT PRIMARY SCHOOL COUNCIL, HOWRAH
                </Text>
              </View>
              <View style={styles.rowStartBorderView}>
                <Text style={styles.title}>NAME: {tname}</Text>
              </View>
              <View style={styles.rowStartBorderView}>
                <Text style={styles.title}>PAN NO.: {pan}</Text>
              </View>

              <View style={styles.rowStartBorderView}>
                <View style={styles.view16}>
                  <Text style={styles.text}>{finYear}</Text>
                </View>
                <View style={styles.view10}>
                  <Text style={styles.text}>% D.A</Text>
                </View>
                <View style={styles.view16}>
                  <Text style={styles.text}>Basic{"\n"}Pay</Text>
                </View>
                <View style={styles.view10}>
                  <Text style={[styles.text, { fontSize: 8 }]}>
                    HT{"\n"}Allowance
                  </Text>
                </View>
                <View style={styles.view16}>
                  <Text style={styles.text}>D.A.</Text>
                </View>
                <View style={styles.view16}>
                  <Text style={styles.text}>H.R.A.</Text>
                </View>
                <View style={styles.view16}>
                  <Text style={styles.text}>M.A.</Text>
                </View>
                <View style={styles.view10}>
                  <Text style={[styles.text, { fontSize: 8 }]}>ARREAR</Text>
                </View>
                <View style={styles.view16}>
                  <Text style={[styles.text, { fontSize: 8 }]}>
                    Conveyance{"\n"}Allowance
                  </Text>
                </View>
                <View style={styles.view16}>
                  <Text style={styles.text}>BONUS</Text>
                </View>
                <View style={styles.view16}>
                  <Text style={styles.text}>GROSS</Text>
                </View>
                <View style={styles.view16}>
                  <Text style={styles.text}>GPF</Text>
                </View>
                <View style={styles.view16}>
                  <Text style={styles.text}>GSLI</Text>
                </View>
                <View style={styles.view10}>
                  <Text style={styles.text}>P.TAX</Text>
                </View>
                <View style={[styles.view10, { borderRightWidth: 0 }]}>
                  <Text style={styles.text}>TDS</Text>
                </View>
              </View>
              <View style={styles.rowStartBorderView}>
                <View style={[styles.rowFlexView, { width: "16%" }]}>
                  <View style={styles.view50Center}>
                    <Text style={styles.textBold}>MAR</Text>
                  </View>
                  <View style={styles.view50Center}>
                    <Text style={styles.textBold}>{prevYear}</Text>
                  </View>
                </View>
                <View style={styles.view10H0}>
                  <Text style={styles.text}>
                    {marchBasic !== 0
                      ? `${Math.round(marchSalary?.daPercent * 100)}%`
                      : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {marchBasic !== 0 ? marchBasic : ""}
                  </Text>
                </View>
                <View style={styles.view10H0}>
                  <Text style={styles.text}>
                    {marchBasic !== 0
                      ? marchAddl !== 0
                        ? marchAddl
                        : "NIL"
                      : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {marchBasic !== 0 ? marchDA : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {marchBasic !== 0 ? marchHRA : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {" "}
                    {marchBasic !== 0 ? (marchMA !== 0 ? marchMA : "NIL") : ""}
                  </Text>
                </View>
                <View style={styles.view10H0}>
                  <Text style={styles.text}>{""}</Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>{""}</Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>{""}</Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {marchBasic !== 0 ? marchGross : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {marchBasic !== 0
                      ? marchGPF !== 0
                        ? marchGPF
                        : "NIL"
                      : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {marchBasic !== 0
                      ? marchGSLI !== 0
                        ? marchGSLI
                        : "NIL"
                      : ""}
                  </Text>
                </View>
                <View style={styles.view10H0}>
                  <Text style={styles.text}>
                    {marchBasic !== 0
                      ? marchPTax !== 0
                        ? marchPTax
                        : "NIL"
                      : ""}
                  </Text>
                </View>
                <View style={[styles.view10H0, { borderRightWidth: 0 }]}>
                  <Text style={styles.text}>
                    {marchBasic !== 0 ? "NIL" : ""}
                  </Text>
                </View>
              </View>
              <View style={styles.rowStartBorderView}>
                <View style={[styles.rowFlexView, { width: "16%" }]}>
                  <View style={styles.view50Center}>
                    <Text style={styles.textBold}>APR</Text>
                  </View>
                  <View style={styles.view50Center}>
                    <Text style={styles.textBold}>{prevYear}</Text>
                  </View>
                </View>
                <View style={styles.view10H0}>
                  <Text style={styles.text}>
                    {aprilBasic !== 0
                      ? `${Math.round(aprilSalary?.daPercent * 100)}%`
                      : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {aprilBasic !== 0 ? aprilBasic : ""}
                  </Text>
                </View>
                <View style={styles.view10H0}>
                  <Text style={styles.text}>
                    {aprilBasic !== 0
                      ? aprilAddl !== 0
                        ? aprilAddl
                        : "NIL"
                      : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {aprilBasic !== 0 ? aprilDA : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {aprilBasic !== 0 ? aprilHRA : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {" "}
                    {aprilBasic !== 0 ? (aprilMA !== 0 ? aprilMA : "NIL") : ""}
                  </Text>
                </View>
                <View style={styles.view10H0}>
                  <Text style={styles.text}>{""}</Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>{""}</Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>{""}</Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {aprilBasic !== 0 ? aprilGross : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {aprilBasic !== 0
                      ? aprilGPF !== 0
                        ? aprilGPF
                        : "NIL"
                      : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {aprilBasic !== 0
                      ? aprilGSLI !== 0
                        ? aprilGSLI
                        : "NIL"
                      : ""}
                  </Text>
                </View>
                <View style={styles.view10H0}>
                  <Text style={styles.text}>
                    {aprilBasic !== 0
                      ? aprilPTax !== 0
                        ? aprilPTax
                        : "NIL"
                      : ""}
                  </Text>
                </View>
                <View style={[styles.view10H0, { borderRightWidth: 0 }]}>
                  <Text style={styles.text}>
                    {aprilBasic !== 0 ? "NIL" : ""}
                  </Text>
                </View>
              </View>
              <View style={styles.rowStartBorderView}>
                <View style={[styles.rowFlexView, { width: "16%" }]}>
                  <View style={styles.view50Center}>
                    <Text style={styles.textBold}>MAY</Text>
                  </View>
                  <View style={styles.view50Center}>
                    <Text style={styles.textBold}>{prevYear}</Text>
                  </View>
                </View>
                <View style={styles.view10H0}>
                  <Text style={styles.text}>
                    {mayBasic !== 0
                      ? `${Math.round(maySalary?.daPercent * 100)}%`
                      : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {mayBasic !== 0 ? mayBasic : ""}
                  </Text>
                </View>
                <View style={styles.view10H0}>
                  <Text style={styles.text}>
                    {mayBasic !== 0 ? (mayAddl !== 0 ? mayAddl : "NIL") : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>{mayBasic !== 0 ? mayDA : ""}</Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {mayBasic !== 0 ? mayHRA : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {" "}
                    {mayBasic !== 0 ? (mayMA !== 0 ? mayMA : "NIL") : ""}
                  </Text>
                </View>
                <View style={styles.view10H0}>
                  <Text style={styles.text}>{""}</Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>{""}</Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>{""}</Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {mayBasic !== 0 ? mayGross : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {mayBasic !== 0 ? (mayGPF !== 0 ? mayGPF : "NIL") : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {mayBasic !== 0 ? (mayGSLI !== 0 ? mayGSLI : "NIL") : ""}
                  </Text>
                </View>
                <View style={styles.view10H0}>
                  <Text style={styles.text}>
                    {mayBasic !== 0 ? (mayPTax !== 0 ? mayPTax : "NIL") : ""}
                  </Text>
                </View>
                <View style={[styles.view10H0, { borderRightWidth: 0 }]}>
                  <Text style={styles.text}>{mayBasic !== 0 ? "NIL" : ""}</Text>
                </View>
              </View>
              <View style={styles.rowStartBorderView}>
                <View style={[styles.rowFlexView, { width: "16%" }]}>
                  <View style={styles.view50Center}>
                    <Text style={styles.textBold}>JUN</Text>
                  </View>
                  <View style={styles.view50Center}>
                    <Text style={styles.textBold}>{prevYear}</Text>
                  </View>
                </View>
                <View style={styles.view10H0}>
                  <Text style={styles.text}>
                    {juneBasic !== 0
                      ? `${Math.round(juneSalary?.daPercent * 100)}%`
                      : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {juneBasic !== 0 ? juneBasic : ""}
                  </Text>
                </View>
                <View style={styles.view10H0}>
                  <Text style={styles.text}>
                    {juneBasic !== 0 ? (juneAddl !== 0 ? juneAddl : "NIL") : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {juneBasic !== 0 ? juneDA : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {juneBasic !== 0 ? juneHRA : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {" "}
                    {juneBasic !== 0 ? (juneMA !== 0 ? juneMA : "NIL") : ""}
                  </Text>
                </View>
                <View style={styles.view10H0}>
                  <Text style={styles.text}>{""}</Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>{""}</Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>{""}</Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {juneBasic !== 0 ? juneGross : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {juneBasic !== 0 ? (juneGPF !== 0 ? juneGPF : "NIL") : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {juneBasic !== 0 ? (juneGSLI !== 0 ? juneGSLI : "NIL") : ""}
                  </Text>
                </View>
                <View style={styles.view10H0}>
                  <Text style={styles.text}>
                    {juneBasic !== 0 ? (junePTax !== 0 ? junePTax : "NIL") : ""}
                  </Text>
                </View>
                <View style={[styles.view10H0, { borderRightWidth: 0 }]}>
                  <Text style={styles.text}>
                    {juneBasic !== 0 ? "NIL" : ""}
                  </Text>
                </View>
              </View>
              <View style={styles.rowStartBorderView}>
                <View style={[styles.rowFlexView, { width: "16%" }]}>
                  <View style={styles.view50Center}>
                    <Text style={styles.textBold}>JUL</Text>
                  </View>
                  <View style={styles.view50Center}>
                    <Text style={styles.textBold}>{prevYear}</Text>
                  </View>
                </View>
                <View style={styles.view10H0}>
                  <Text style={styles.text}>
                    {julyBasic !== 0
                      ? `${Math.round(julySalary?.daPercent * 100)}%`
                      : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {julyBasic !== 0 ? julyBasic : ""}
                  </Text>
                </View>
                <View style={styles.view10H0}>
                  <Text style={styles.text}>
                    {julyBasic !== 0 ? (julyAddl !== 0 ? julyAddl : "NIL") : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {julyBasic !== 0 ? julyDA : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {julyBasic !== 0 ? julyHRA : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {" "}
                    {julyBasic !== 0 ? (julyMA !== 0 ? julyMA : "NIL") : ""}
                  </Text>
                </View>
                <View style={styles.view10H0}>
                  <Text style={styles.text}>
                    {aprilBasic !== 0 ? aprilIR : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>{""}</Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>{""}</Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {julyBasic !== 0 ? julyGross : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {julyBasic !== 0 ? (julyGPF !== 0 ? julyGPF : "NIL") : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {julyBasic !== 0 ? (julyGSLI !== 0 ? julyGSLI : "NIL") : ""}
                  </Text>
                </View>
                <View style={styles.view10H0}>
                  <Text style={styles.text}>
                    {julyBasic !== 0 ? (julyPTax !== 0 ? julyPTax : "NIL") : ""}
                  </Text>
                </View>
                <View style={[styles.view10H0, { borderRightWidth: 0 }]}>
                  <Text style={styles.text}>
                    {julyBasic !== 0 ? "NIL" : ""}
                  </Text>
                </View>
              </View>
              <View style={styles.rowStartBorderView}>
                <View style={[styles.rowFlexView, { width: "16%" }]}>
                  <View style={styles.view50Center}>
                    <Text style={styles.textBold}>AUG</Text>
                  </View>
                  <View style={styles.view50Center}>
                    <Text style={styles.textBold}>{prevYear}</Text>
                  </View>
                </View>
                <View style={styles.view10H0}>
                  <Text style={styles.text}>
                    {augustBasic !== 0
                      ? `${Math.round(augustSalary?.daPercent * 100)}%`
                      : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {augustBasic !== 0 ? augustBasic : ""}
                  </Text>
                </View>
                <View style={styles.view10H0}>
                  <Text style={styles.text}>
                    {augustBasic !== 0
                      ? augustAddl !== 0
                        ? augustAddl
                        : "NIL"
                      : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {augustBasic !== 0 ? augustDA : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {augustBasic !== 0 ? augustHRA : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {" "}
                    {augustBasic !== 0
                      ? augustMA !== 0
                        ? augustMA
                        : "NIL"
                      : ""}
                  </Text>
                </View>
                <View style={styles.view10H0}>
                  <Text style={styles.text}>{""}</Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>{""}</Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>{""}</Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {augustBasic !== 0 ? augustGross : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {augustBasic !== 0
                      ? augustGPF !== 0
                        ? augustGPF
                        : "NIL"
                      : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {augustBasic !== 0
                      ? augustGSLI !== 0
                        ? augustGSLI
                        : "NIL"
                      : ""}
                  </Text>
                </View>
                <View style={styles.view10H0}>
                  <Text style={styles.text}>
                    {augustBasic !== 0
                      ? augustPTax !== 0
                        ? augustPTax
                        : "NIL"
                      : ""}
                  </Text>
                </View>
                <View style={[styles.view10H0, { borderRightWidth: 0 }]}>
                  <Text style={styles.text}>
                    {augustBasic !== 0 ? "NIL" : ""}
                  </Text>
                </View>
              </View>
              <View style={styles.rowStartBorderView}>
                <View style={[styles.rowFlexView, { width: "16%" }]}>
                  <View style={styles.view50Center}>
                    <Text style={styles.textBold}>SEP</Text>
                  </View>
                  <View style={styles.view50Center}>
                    <Text style={styles.textBold}>{prevYear}</Text>
                  </View>
                </View>
                <View style={styles.view10H0}>
                  <Text style={styles.text}>
                    {septemberBasic !== 0
                      ? `${Math.round(septemberSalary?.daPercent * 100)}%`
                      : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {septemberBasic !== 0 ? septemberBasic : ""}
                  </Text>
                </View>
                <View style={styles.view10H0}>
                  <Text style={styles.text}>
                    {septemberBasic !== 0
                      ? septemberAddl !== 0
                        ? septemberAddl
                        : "NIL"
                      : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {septemberBasic !== 0 ? septemberDA : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {septemberBasic !== 0 ? septemberHRA : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {" "}
                    {septemberBasic !== 0
                      ? septemberMA !== 0
                        ? septemberMA
                        : "NIL"
                      : ""}
                  </Text>
                </View>
                <View style={styles.view10H0}>
                  <Text style={styles.text}>{""}</Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>{""}</Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>{""}</Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {septemberBasic !== 0 ? septemberGross : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {septemberBasic !== 0
                      ? septemberGPF !== 0
                        ? septemberGPF
                        : "NIL"
                      : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {septemberBasic !== 0
                      ? septemberGSLI !== 0
                        ? septemberGSLI
                        : "NIL"
                      : ""}
                  </Text>
                </View>
                <View style={styles.view10H0}>
                  <Text style={styles.text}>
                    {septemberBasic !== 0
                      ? septemberPTax !== 0
                        ? septemberPTax
                        : "NIL"
                      : ""}
                  </Text>
                </View>
                <View style={[styles.view10H0, { borderRightWidth: 0 }]}>
                  <Text style={styles.text}>
                    {septemberBasic !== 0 ? "NIL" : ""}
                  </Text>
                </View>
              </View>
              <View style={styles.rowStartBorderView}>
                <View style={[styles.rowFlexView, { width: "16%" }]}>
                  <View style={styles.view50Center}>
                    <Text style={styles.textBold}>OCT</Text>
                  </View>
                  <View style={styles.view50Center}>
                    <Text style={styles.textBold}>{prevYear}</Text>
                  </View>
                </View>
                <View style={styles.view10H0}>
                  <Text style={styles.text}>
                    {octoberBasic !== 0
                      ? `${Math.round(octoberSalary?.daPercent * 100)}%`
                      : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {octoberBasic !== 0 ? octoberBasic : ""}
                  </Text>
                </View>
                <View style={styles.view10H0}>
                  <Text style={styles.text}>
                    {octoberBasic !== 0
                      ? octoberAddl !== 0
                        ? octoberAddl
                        : "NIL"
                      : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {octoberBasic !== 0 ? octoberDA : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {octoberBasic !== 0 ? octoberHRA : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {" "}
                    {octoberBasic !== 0
                      ? octoberMA !== 0
                        ? octoberMA
                        : "NIL"
                      : ""}
                  </Text>
                </View>
                <View style={styles.view10H0}>
                  <Text style={styles.text}>{""}</Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>{""}</Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>{""}</Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {octoberBasic !== 0 ? octoberGross : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {octoberBasic !== 0
                      ? octoberGPF !== 0
                        ? octoberGPF
                        : "NIL"
                      : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {octoberBasic !== 0
                      ? octoberGSLI !== 0
                        ? octoberGSLI
                        : "NIL"
                      : ""}
                  </Text>
                </View>
                <View style={styles.view10H0}>
                  <Text style={styles.text}>
                    {octoberBasic !== 0
                      ? octoberPTax !== 0
                        ? octoberPTax
                        : "NIL"
                      : ""}
                  </Text>
                </View>
                <View style={[styles.view10H0, { borderRightWidth: 0 }]}>
                  <Text style={styles.text}>
                    {octoberBasic !== 0 ? "NIL" : ""}
                  </Text>
                </View>
              </View>
              <View style={styles.rowStartBorderView}>
                <View style={[styles.rowFlexView, { width: "16%" }]}>
                  <View style={styles.view50Center}>
                    <Text style={styles.textBold}>NOV</Text>
                  </View>
                  <View style={styles.view50Center}>
                    <Text style={styles.textBold}>{prevYear}</Text>
                  </View>
                </View>
                <View style={styles.view10H0}>
                  <Text style={styles.text}>
                    {novemberBasic !== 0
                      ? `${Math.round(novemberSalary?.daPercent * 100)}%`
                      : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {novemberBasic !== 0 ? novemberBasic : ""}
                  </Text>
                </View>
                <View style={styles.view10H0}>
                  <Text style={styles.text}>
                    {novemberBasic !== 0
                      ? novemberAddl !== 0
                        ? novemberAddl
                        : "NIL"
                      : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {novemberBasic !== 0 ? novemberDA : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {novemberBasic !== 0 ? novemberHRA : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {" "}
                    {novemberBasic !== 0
                      ? novemberMA !== 0
                        ? novemberMA
                        : "NIL"
                      : ""}
                  </Text>
                </View>
                <View style={styles.view10H0}>
                  <Text style={styles.text}>{""}</Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>{""}</Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>{""}</Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {novemberBasic !== 0 ? novemberGross : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {novemberBasic !== 0
                      ? novemberGPF !== 0
                        ? novemberGPF
                        : "NIL"
                      : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {novemberBasic !== 0
                      ? novemberGSLI !== 0
                        ? novemberGSLI
                        : "NIL"
                      : ""}
                  </Text>
                </View>
                <View style={styles.view10H0}>
                  <Text style={styles.text}>
                    {novemberBasic !== 0
                      ? novemberPTax !== 0
                        ? novemberPTax
                        : "NIL"
                      : ""}
                  </Text>
                </View>
                <View style={[styles.view10H0, { borderRightWidth: 0 }]}>
                  <Text style={styles.text}>
                    {novemberBasic !== 0 ? "NIL" : ""}
                  </Text>
                </View>
              </View>
              <View style={styles.rowStartBorderView}>
                <View style={[styles.rowFlexView, { width: "16%" }]}>
                  <View style={styles.view50Center}>
                    <Text style={styles.textBold}>DEC</Text>
                  </View>
                  <View style={styles.view50Center}>
                    <Text style={styles.textBold}>{prevYear}</Text>
                  </View>
                </View>
                <View style={styles.view10H0}>
                  <Text style={styles.text}>
                    {decemberBasic !== 0
                      ? `${Math.round(decemberSalary?.daPercent * 100)}%`
                      : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {decemberBasic !== 0 ? decemberBasic : ""}
                  </Text>
                </View>
                <View style={styles.view10H0}>
                  <Text style={styles.text}>
                    {decemberBasic !== 0
                      ? decemberAddl !== 0
                        ? decemberAddl
                        : "NIL"
                      : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {decemberBasic !== 0 ? decemberDA : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {decemberBasic !== 0 ? decemberHRA : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {" "}
                    {decemberBasic !== 0
                      ? decemberMA !== 0
                        ? decemberMA
                        : "NIL"
                      : ""}
                  </Text>
                </View>
                <View style={styles.view10H0}>
                  <Text style={styles.text}>{""}</Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>{""}</Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>{""}</Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {decemberBasic !== 0 ? decemberGross : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {decemberBasic !== 0
                      ? decemberGPF !== 0
                        ? decemberGPF
                        : "NIL"
                      : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {decemberBasic !== 0
                      ? decemberGSLI !== 0
                        ? decemberGSLI
                        : "NIL"
                      : ""}
                  </Text>
                </View>
                <View style={styles.view10H0}>
                  <Text style={styles.text}>
                    {decemberBasic !== 0
                      ? decemberPTax !== 0
                        ? decemberPTax
                        : "NIL"
                      : ""}
                  </Text>
                </View>
                <View style={[styles.view10H0, { borderRightWidth: 0 }]}>
                  <Text style={styles.text}>
                    {decemberBasic !== 0 ? "NIL" : ""}
                  </Text>
                </View>
              </View>
              <View style={styles.rowStartBorderView}>
                <View style={[styles.rowFlexView, { width: "16%" }]}>
                  <View style={styles.view50Center}>
                    <Text style={styles.textBold}>JAN</Text>
                  </View>
                  <View style={styles.view50Center}>
                    <Text style={styles.textBold}>{thisYear}</Text>
                  </View>
                </View>
                <View style={styles.view10H0}>
                  <Text style={styles.text}>
                    {januaryBasic !== 0
                      ? `${Math.round(januarySalary?.daPercent * 100)}%`
                      : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {januaryBasic !== 0 ? januaryBasic : ""}
                  </Text>
                </View>
                <View style={styles.view10H0}>
                  <Text style={styles.text}>
                    {januaryBasic !== 0
                      ? januaryAddl !== 0
                        ? januaryAddl
                        : "NIL"
                      : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {januaryBasic !== 0 ? januaryDA : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {januaryBasic !== 0 ? januaryHRA : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {" "}
                    {januaryBasic !== 0
                      ? januaryMA !== 0
                        ? januaryMA
                        : "NIL"
                      : ""}
                  </Text>
                </View>
                <View style={styles.view10H0}>
                  <Text style={styles.text}>{""}</Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>{""}</Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>{""}</Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {januaryBasic !== 0 ? januaryGross : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {januaryBasic !== 0
                      ? januaryGPF !== 0
                        ? januaryGPF
                        : "NIL"
                      : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {januaryBasic !== 0
                      ? januaryGSLI !== 0
                        ? januaryGSLI
                        : "NIL"
                      : ""}
                  </Text>
                </View>
                <View style={styles.view10H0}>
                  <Text style={styles.text}>
                    {januaryBasic !== 0
                      ? januaryPTax !== 0
                        ? januaryPTax
                        : "NIL"
                      : ""}
                  </Text>
                </View>
                <View style={[styles.view10H0, { borderRightWidth: 0 }]}>
                  <Text style={styles.text}>
                    {januaryBasic !== 0 ? "NIL" : ""}
                  </Text>
                </View>
              </View>
              <View style={styles.rowStartBorderView}>
                <View style={[styles.rowFlexView, { width: "16%" }]}>
                  <View style={styles.view50Center}>
                    <Text style={styles.textBold}>FEB</Text>
                  </View>
                  <View style={styles.view50Center}>
                    <Text style={styles.textBold}>{thisYear}</Text>
                  </View>
                </View>
                <View style={styles.view10H0}>
                  <Text style={styles.text}>
                    {februaryBasic !== 0
                      ? `${Math.round(februarySalary?.daPercent * 100)}%`
                      : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {februaryBasic !== 0 ? februaryBasic : ""}
                  </Text>
                </View>
                <View style={styles.view10H0}>
                  <Text style={styles.text}>
                    {februaryBasic !== 0
                      ? februaryAddl !== 0
                        ? februaryAddl
                        : "NIL"
                      : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {februaryBasic !== 0 ? februaryDA : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {februaryBasic !== 0 ? februaryHRA : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {" "}
                    {februaryBasic !== 0
                      ? februaryMA !== 0
                        ? februaryMA
                        : "NIL"
                      : ""}
                  </Text>
                </View>
                <View style={styles.view10H0}>
                  <Text style={styles.text}>{""}</Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>{""}</Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>{""}</Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {februaryBasic !== 0 ? februaryGross : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {februaryBasic !== 0
                      ? februaryGPF !== 0
                        ? februaryGPF
                        : "NIL"
                      : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {februaryBasic !== 0
                      ? februaryGSLI !== 0
                        ? februaryGSLI
                        : "NIL"
                      : ""}
                  </Text>
                </View>
                <View style={styles.view10H0}>
                  <Text style={styles.text}>
                    {februaryBasic !== 0
                      ? februaryPTax !== 0
                        ? februaryPTax
                        : "NIL"
                      : ""}
                  </Text>
                </View>
                <View style={[styles.view10H0, { borderRightWidth: 0 }]}>
                  <Text style={styles.text}>
                    {februaryBasic !== 0 ? "NIL" : ""}
                  </Text>
                </View>
              </View>
              <View
                style={[styles.rowStartBorderView, { borderBottomWidth: 0 }]}
              >
                <View style={styles.view16H0}>
                  <Text style={styles.text}>TOTAL</Text>
                </View>
                <View style={styles.view10H0}>
                  <Text style={styles.text}> </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>{grossBasic}</Text>
                </View>
                <View style={styles.view10H0}>
                  <Text style={styles.text}>
                    {grossAddl !== 0 ? grossAddl : "NIL"}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>{grossDA}</Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>{grossHRA}</Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {grossMA !== 0 ? grossMA : "NIL"}
                  </Text>
                </View>
                <View style={styles.view10H0}>
                  <Text style={styles.text}>
                    {aprilBasic !== 0 ? aprilIR : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>NIL</Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>{bonus !== 0 ? bonus : "NIL"}</Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>{GrossPAY}</Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {grossGPF !== 0 ? grossGPF : "NIL"}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {grossGSLI !== 0 ? grossGSLI : "NIL"}
                  </Text>
                </View>
                <View style={styles.view10H0}>
                  <Text style={styles.text}>{grossPTax}</Text>
                </View>
                <View style={[styles.view10H0, { borderRightWidth: 0 }]}>
                  <Text style={styles.text}>NIL</Text>
                </View>
              </View>
            </View>
            <View
              style={{
                marginTop: 60,
                justifyContent: "flex-end",
                alignItems: "flex-end",
              }}
            >
              <Text style={styles.text}>SIGNATURE OF THE INCUMBENT</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}
const styles = StyleSheet.create({
  page: {
    paddingRight: 5,
    margin: 5,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    width: width,
    height: height,
  },
  pageMainView: {
    paddingRight: 5,
    margin: 5,
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
    fontSize: 16,
    fontWeight: "normal",
    fontFamily: "Algerian",
    textAlign: "center",
  },
  text: {
    fontSize: 10,
    fontFamily: "Times",
    textAlign: "center",
  },
  text2: {
    fontSize: 14,
    fontFamily: "Algerian",
    textAlign: "center",
    padding: 2,
  },
  text3: {
    fontSize: 12,
    fontFamily: "Algerian",
    textAlign: "center",
    padding: 2,
  },
  text2i: {
    fontSize: 8,
    fontFamily: "Times",
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
    height: "auto",
    flexDirection: "row",
    justifyContent: "center",
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
  src: "https://raw.githubusercontent.com/amtawestwbtpta/awwbtptadata/main/Algerian.ttf",
});
Font.register({
  family: "Times",
  src: "https://raw.githubusercontent.com/amtawestwbtpta/awwbtptadata/main/times.ttf",
});
Font.register({
  family: "TimesBold",
  src: "https://raw.githubusercontent.com/amtawestwbtpta/awwbtptadata/main/timesBold.ttf",
});
