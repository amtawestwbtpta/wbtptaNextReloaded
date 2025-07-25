"use client";
import React, { useEffect } from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
  PDFViewer,
} from "@react-pdf/renderer";
import { IndianFormat, INR, titleCase } from "../modules/calculatefunctions";
const width = 2480;
const height = 3508;

export default function Form16NewRegime({ data }) {
  const {
    tname,
    school,
    pan,
    desig,
    gender,
    fname,
    thisYear,
    nextYear,
    finYear,
    AllGross,
    TotalRoundOffIncome,
    CalculatedIT,
    isUnderRebate,
    eduCess,
    AddedEduCess,
    BankInterest,
    tds,
    GrossRelief,
  } = data;

  return (
    <Document
      style={{ margin: 5, padding: 5 }}
      title={`Form 16 of ${tname} of ${school}`}
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
                  ORIGINAL / DUPLICATE / TRIPLICATE
                </Text>
                <Text style={styles.title}>FORM NO. 16 (PART - B)</Text>
                <Text style={[styles.titleMain, { marginTop: 8 }]}>
                  SEE RULE 31(1)
                </Text>
                <Text style={[styles.titleMain, { marginVertical: 8 }]}>
                  "Certificate under section 203 of the Income-tax Act, 1961
                  {"\n"}
                  For tax deducted at source from income chargeable under the
                  head “Salaries”
                </Text>
              </View>

              <View style={[styles.tableStartBorderView]}>
                <View style={{ width: "50%", borderRightWidth: 1 }}>
                  <Text style={styles.textBold}>
                    Name and Designation of the Employer
                  </Text>
                </View>
                <View style={{ width: "50%" }}>
                  <Text style={styles.textBold}>
                    Name and designation of the Employee
                  </Text>
                </View>
              </View>
              <View style={[styles.tableStartBorderView]}>
                <View style={{ width: "50%", borderRightWidth: 1 }}>
                  <Text style={styles.textBold}> </Text>
                </View>
                <View style={{ width: "50%" }}>
                  <Text style={styles.textBold}>{tname}</Text>
                </View>
              </View>
              <View style={[styles.tableStartBorderView]}>
                <View
                  style={{
                    width: "50%",
                    borderRightWidth: 1,
                    paddingVertical: 8,
                  }}
                >
                  <Text style={styles.textBold}>CHAIRMAN, DPSC, HOWRAH</Text>
                  <Text style={styles.textBold}>18, N.D. MUKHERJEE ROAD</Text>
                  <Text style={styles.textBold}>HOWRAH- 1</Text>
                </View>
                <View
                  style={{
                    width: "50%",
                    justifyContent: "center",
                  }}
                >
                  <View style={{ borderBottomWidth: 1 }}>
                    <Text style={styles.textBold}>{desig}</Text>
                  </View>
                  <View style={{ borderBottomWidth: 1 }}>
                    <Text style={styles.textBold}> </Text>
                  </View>
                  <View>
                    <Text style={styles.textBold}> </Text>
                  </View>
                </View>
              </View>
              <View style={[styles.tableStartBorderView]}>
                <View
                  style={{
                    width: "33%",
                    borderRightWidth: 1,
                  }}
                >
                  <Text style={styles.textBold}>PAN / GIR NO.</Text>
                </View>
                <View
                  style={{
                    width: "33%",
                    borderRightWidth: 1,
                  }}
                >
                  <Text style={styles.textBold}>TAN</Text>
                </View>
                <View
                  style={{
                    width: "33%",
                  }}
                >
                  <Text style={styles.textBold}>PAN / GIR NO.</Text>
                </View>
              </View>
              <View style={[styles.tableStartBorderView]}>
                <View
                  style={{
                    width: "33%",
                    borderRightWidth: 1,
                  }}
                >
                  <Text style={styles.textBold}> </Text>
                </View>
                <View
                  style={{
                    width: "33%",
                    borderRightWidth: 1,
                  }}
                >
                  <Text style={styles.textBold}>CALD02032C</Text>
                </View>
                <View
                  style={{
                    width: "33%",
                  }}
                >
                  <Text style={styles.textBold}>{pan}</Text>
                </View>
              </View>
              <View style={[styles.tableStartBorderView]}>
                <View
                  style={{
                    width: "33%",
                    borderRightWidth: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    height: 40,
                  }}
                >
                  <Text style={styles.textBold}>
                    TDS Circle where Annual Reaturn /{"\n"}Statement Under
                    Section 206 is to be filled
                  </Text>
                </View>
                <View
                  style={{
                    width: "33%",
                    borderRightWidth: 1,
                  }}
                >
                  <View style={{ borderBottomWidth: 1 }}>
                    <Text style={styles.textBold}>PERIOD RETURN</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      width: "100%",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <View style={{ width: "50%", borderRightWidth: 1 }}>
                      <Text style={styles.textBold}>FROM</Text>
                      <Text style={styles.textBold}>{thisYear}</Text>
                    </View>
                    <View style={{ width: "50%" }}>
                      <Text style={styles.textBold}>TO</Text>
                      <Text style={styles.textBold}>{nextYear}</Text>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    width: "33%",
                  }}
                >
                  <Text style={styles.textBold}>ASSESSMENT</Text>
                  <Text style={styles.textBold}>YEAR</Text>
                  <Text style={styles.textBold}>{finYear}</Text>
                </View>
              </View>
              <View style={[styles.tableStartBorderView]}>
                <Text style={styles.titleMain}>
                  DETAILS OF SALARY PAID AND ANY OTHER INCOME AND TAX DEDUCTED
                </Text>
              </View>
              <View
                style={[styles.tableStartBorderView, { borderBottomWidth: 0 }]}
              >
                <View
                  style={{
                    width: "40%",
                    borderRightWidth: 1,
                    padding: 2,
                  }}
                >
                  <Text style={styles.textBold}>1. GROSS SALARY</Text>
                  <Text style={styles.textBold}>
                    (a) Salary as per provisions contained in Section 17(1)
                  </Text>
                </View>
                <View
                  style={{
                    width: "20%",
                    borderRightWidth: 1,
                    padding: 2,
                  }}
                >
                  <Text style={styles.textBold}> </Text>
                  <Text style={styles.textBold}> </Text>
                  <Text style={styles.textBold}> </Text>
                </View>
                <View
                  style={{
                    width: "20%",
                    borderRightWidth: 1,
                    padding: 2,
                  }}
                >
                  <Text style={styles.textBold}> </Text>
                  <Text style={styles.textBold}> </Text>
                  <Text style={styles.textBold}>
                    Rs. {IndianFormat(AllGross)}
                  </Text>
                </View>
                <View
                  style={{
                    width: "20%",
                    padding: 2,
                  }}
                >
                  <Text style={styles.textBold}> </Text>
                  <Text style={styles.textBold}> </Text>
                  <Text style={styles.textBold}> </Text>
                </View>
              </View>
              <View
                style={[styles.tableStartBorderView, { borderBottomWidth: 0 }]}
              >
                <View
                  style={{
                    width: "40%",
                    borderRightWidth: 1,
                    padding: 2,
                  }}
                >
                  <Text style={styles.textBold}>
                    (b) Value of perquisites u/s 17(2)
                  </Text>
                  <Text style={styles.textBold}>
                    (as per Form No. 12BA, wherever applicable)
                  </Text>
                </View>
                <View
                  style={{
                    width: "20%",
                    borderRightWidth: 1,
                    padding: 2,
                  }}
                >
                  <Text style={styles.textBold}> </Text>
                  <Text style={styles.textBold}> </Text>
                </View>
                <View
                  style={{
                    width: "20%",
                    borderRightWidth: 1,
                    padding: 2,
                  }}
                >
                  <Text style={styles.textBold}> </Text>
                  <Text style={styles.textBold}> </Text>
                </View>
                <View
                  style={{
                    width: "20%",
                    padding: 2,
                  }}
                >
                  <Text style={styles.textBold}> </Text>
                  <Text style={styles.textBold}> </Text>
                </View>
              </View>
              <View
                style={[styles.tableStartBorderView, { borderBottomWidth: 0 }]}
              >
                <View
                  style={{
                    width: "40%",
                    borderRightWidth: 1,
                    padding: 2,
                  }}
                >
                  <Text style={styles.textBold}>
                    (c) Profits in lieu of salary under section 17(3)
                  </Text>
                  <Text style={styles.textBold}>
                    (as per Form No. 12BA, wherever applicable)
                  </Text>
                </View>
                <View
                  style={{
                    width: "20%",
                    borderRightWidth: 1,
                    padding: 2,
                  }}
                >
                  <Text style={styles.textBold}> </Text>
                  <Text style={styles.textBold}> </Text>
                </View>
                <View
                  style={{
                    width: "20%",
                    borderRightWidth: 1,
                    padding: 2,
                  }}
                >
                  <Text style={styles.textBold}> </Text>
                  <Text style={styles.textBold}> </Text>
                </View>
                <View
                  style={{
                    width: "20%",
                    padding: 2,
                  }}
                >
                  <Text style={styles.textBold}> </Text>
                  <Text style={styles.textBold}> </Text>
                </View>
              </View>
              <View
                style={[styles.tableStartBorderView, { borderBottomWidth: 0 }]}
              >
                <View
                  style={{
                    width: "40%",
                    borderRightWidth: 1,
                    padding: 2,
                  }}
                >
                  <Text style={styles.textBold}>(d) Total</Text>
                </View>
                <View
                  style={{
                    width: "20%",
                    borderRightWidth: 1,
                    padding: 2,
                  }}
                >
                  <Text style={styles.textBold}> </Text>
                </View>
                <View
                  style={{
                    width: "20%",
                    borderRightWidth: 1,
                    padding: 2,
                  }}
                >
                  <Text style={styles.textBold}>
                    Rs. {IndianFormat(AllGross)}
                  </Text>
                </View>
                <View
                  style={{
                    width: "20%",
                    padding: 2,
                  }}
                >
                  <Text style={styles.textBold}> </Text>
                </View>
              </View>
              <View
                style={[styles.tableStartBorderView, { borderBottomWidth: 0 }]}
              >
                <View
                  style={{
                    width: "40%",
                    borderRightWidth: 1,
                    padding: 2,
                  }}
                >
                  <Text style={styles.textBold}>
                    (2) LESS : Allowance to the extent exempt{"\n"}under Section
                    10
                  </Text>
                </View>
                <View
                  style={{
                    width: "20%",
                    borderRightWidth: 1,
                    padding: 2,
                  }}
                >
                  <Text style={styles.textBold}> </Text>
                  <Text style={styles.textBold}> </Text>
                </View>
                <View
                  style={{
                    width: "20%",
                    borderRightWidth: 1,
                    padding: 2,
                  }}
                >
                  <Text style={styles.textBold}> </Text>
                  <Text style={styles.textBold}> </Text>
                </View>
                <View
                  style={{
                    width: "20%",
                    padding: 2,
                  }}
                >
                  <Text style={styles.textBold}> </Text>
                  <Text style={styles.textBold}> </Text>
                </View>
              </View>
              <View
                style={[styles.tableStartBorderView, { borderBottomWidth: 0 }]}
              >
                <View
                  style={{
                    width: "40%",
                    borderRightWidth: 1,
                    padding: 2,
                  }}
                >
                  <Text style={styles.textBold}>(3) BALANCE (1 – 2)</Text>
                </View>
                <View
                  style={{
                    width: "20%",
                    borderRightWidth: 1,
                    padding: 2,
                  }}
                >
                  <Text style={styles.textBold}> </Text>
                </View>
                <View
                  style={{
                    width: "20%",
                    borderRightWidth: 1,
                    padding: 2,
                  }}
                >
                  <Text style={styles.textBold}>
                    Rs. {IndianFormat(AllGross)}
                  </Text>
                </View>
                <View
                  style={{
                    width: "20%",
                    padding: 2,
                  }}
                >
                  <Text style={styles.textBold}> </Text>
                </View>
              </View>
              <View
                style={[styles.tableStartBorderView, { borderBottomWidth: 0 }]}
              >
                <View
                  style={{
                    width: "40%",
                    borderRightWidth: 1,
                    padding: 2,
                  }}
                >
                  <Text style={styles.textBold}>(4) DEDUCTIONS</Text>
                </View>
                <View
                  style={{
                    width: "20%",
                    borderRightWidth: 1,
                    padding: 2,
                  }}
                >
                  <Text style={styles.textBold}> </Text>
                </View>
                <View
                  style={{
                    width: "20%",
                    borderRightWidth: 1,
                    padding: 2,
                  }}
                >
                  <Text style={styles.textBold}> </Text>
                </View>
                <View
                  style={{
                    width: "20%",
                    padding: 2,
                  }}
                >
                  <Text style={styles.textBold}> </Text>
                </View>
              </View>
              <View
                style={[styles.tableStartBorderView, { borderBottomWidth: 0 }]}
              >
                <View
                  style={{
                    width: "40%",
                    borderRightWidth: 1,
                    padding: 2,
                  }}
                >
                  <Text style={styles.textBold}>a) Standard Deduction</Text>
                </View>
                <View
                  style={{
                    width: "20%",
                    borderRightWidth: 1,
                    padding: 2,
                  }}
                >
                  <Text style={styles.textBold}>Rs. {IndianFormat(75000)}</Text>
                </View>
                <View
                  style={{
                    width: "20%",
                    borderRightWidth: 1,
                    padding: 2,
                  }}
                >
                  <Text style={styles.textBold}> </Text>
                </View>
                <View
                  style={{
                    width: "20%",
                    padding: 2,
                  }}
                >
                  <Text style={styles.textBold}> </Text>
                </View>
              </View>
              {/* <View
                style={[
                  styles.tableStartBorderView,
                  { borderBottomWidth: 0 },
                ]}
              >
                <View
                  style={{
                    width: "40%",
                    borderRightWidth: 1,
                    padding: 2,
                  }}
                >
                  <Text style={styles.textBold}>b) Tax on Employment</Text>
                </View>
                <View
                  style={{
                    width: "20%",
                    borderRightWidth: 1,
                    padding: 2,
                  }}
                >
                  <Text style={styles.textBold}>
                    Rs. {IndianFormat(grossPTax)}
                  </Text>
                </View>
                <View
                  style={{
                    width: "20%",
                    borderRightWidth: 1,
                    padding: 2,
                  }}
                >
                  <Text style={styles.textBold}> </Text>
                </View>
                <View
                  style={{
                    width: "20%",
                    padding: 2,
                  }}
                >
                  <Text style={styles.textBold}> </Text>
                </View>
              </View> */}
              <View
                style={[styles.tableStartBorderView, { borderBottomWidth: 0 }]}
              >
                <View
                  style={{
                    width: "40%",
                    borderRightWidth: 1,
                    padding: 2,
                  }}
                >
                  <Text style={styles.textBold}>5) TOTAL DEDUCTION</Text>
                </View>
                <View
                  style={{
                    width: "20%",
                    borderRightWidth: 1,
                    padding: 2,
                  }}
                >
                  <Text style={styles.textBold}> </Text>
                </View>
                <View
                  style={{
                    width: "20%",
                    borderRightWidth: 1,
                    padding: 2,
                  }}
                >
                  <Text style={styles.textBold}>Rs. {IndianFormat(75000)}</Text>
                </View>
                <View
                  style={{
                    width: "20%",
                    padding: 2,
                  }}
                >
                  <Text style={styles.textBold}> </Text>
                </View>
              </View>
              <View
                style={[styles.tableStartBorderView, { borderBottomWidth: 0 }]}
              >
                <View
                  style={{
                    width: "40%",
                    borderRightWidth: 1,
                    padding: 2,
                  }}
                >
                  <Text style={styles.textBold}>
                    6) TAXABLE INCOME UNDER THE HEAD SALARIES (3-5)
                  </Text>
                </View>
                <View
                  style={{
                    width: "20%",
                    borderRightWidth: 1,
                    padding: 2,
                  }}
                >
                  <Text style={styles.textBold}> </Text>
                  <Text style={styles.textBold}> </Text>
                </View>
                <View
                  style={{
                    width: "20%",
                    borderRightWidth: 1,
                    padding: 2,
                  }}
                >
                  <Text style={styles.textBold}> </Text>
                  <Text style={styles.textBold}> </Text>
                </View>
                <View
                  style={{
                    width: "20%",
                    padding: 2,
                  }}
                >
                  <Text style={styles.textBold}> </Text>
                  <Text style={styles.textBold}>
                    Rs. {IndianFormat(AllGross - 75000)}
                  </Text>
                </View>
              </View>
              <View
                style={[styles.tableStartBorderView, { borderBottomWidth: 0 }]}
              >
                <View
                  style={{
                    width: "40%",
                    borderRightWidth: 1,
                    padding: 2,
                  }}
                >
                  <Text style={styles.textBold}>
                    7) Add : Any other income reported by the employee
                  </Text>
                </View>
                <View
                  style={{
                    width: "20%",
                    borderRightWidth: 1,
                    padding: 2,
                  }}
                >
                  <Text style={styles.textBold}>
                    Rs. {IndianFormat(BankInterest)}
                  </Text>
                  <Text style={styles.textBold}> </Text>
                </View>
                <View
                  style={{
                    width: "20%",
                    borderRightWidth: 1,
                    padding: 2,
                  }}
                >
                  <Text style={styles.textBold}> </Text>
                  <Text style={styles.textBold}> </Text>
                </View>
                <View
                  style={{
                    width: "20%",
                    padding: 2,
                  }}
                >
                  <Text style={styles.textBold}> </Text>
                  <Text style={styles.textBold}> </Text>
                </View>
              </View>
              <View
                style={[styles.tableStartBorderView, { borderBottomWidth: 0 }]}
              >
                <View
                  style={{
                    width: "40%",
                    borderRightWidth: 1,
                    padding: 2,
                  }}
                >
                  <Text style={styles.textBold}>
                    a) GROSS INCOME (Total above 7)
                  </Text>
                </View>
                <View
                  style={{
                    width: "20%",
                    borderRightWidth: 1,
                    padding: 2,
                  }}
                >
                  <Text style={styles.textBold}>
                    Rs. {IndianFormat(AllGross - 75000 + BankInterest)}
                  </Text>
                </View>
                <View
                  style={{
                    width: "20%",
                    borderRightWidth: 1,
                    padding: 2,
                  }}
                >
                  <Text style={styles.textBold}> </Text>
                </View>
                <View
                  style={{
                    width: "20%",
                    padding: 2,
                  }}
                >
                  <Text style={styles.textBold}> </Text>
                </View>
              </View>
              <View
                style={[styles.tableStartBorderView, { borderBottomWidth: 0 }]}
              >
                <View
                  style={{
                    width: "40%",
                    borderRightWidth: 1,
                    padding: 2,
                  }}
                >
                  <Text style={styles.textBold}>
                    b) LESS: Deduction under Section 57
                  </Text>
                </View>
                <View
                  style={{
                    width: "20%",
                    borderRightWidth: 1,
                    padding: 2,
                  }}
                >
                  <Text style={styles.textBold}>NIL</Text>
                </View>
                <View
                  style={{
                    width: "20%",
                    borderRightWidth: 1,
                    padding: 2,
                  }}
                >
                  <Text style={styles.textBold}> </Text>
                </View>
                <View
                  style={{
                    width: "20%",
                    padding: 2,
                  }}
                >
                  <Text style={styles.textBold}> </Text>
                </View>
              </View>
              <View
                style={[styles.tableStartBorderView, { borderBottomWidth: 0 }]}
              >
                <View
                  style={{
                    width: "40%",
                    borderRightWidth: 1,
                    padding: 2,
                  }}
                >
                  <Text style={styles.textBold}>
                    8) TAXABLE INCOME FROM{"\n"}
                    OTHER SOURCES [7(A)-7(B)]
                  </Text>
                </View>
                <View
                  style={{
                    width: "20%",
                    borderRightWidth: 1,
                    padding: 2,
                  }}
                >
                  <Text style={styles.textBold}>
                    Rs. {IndianFormat(AllGross - 75000 + BankInterest)}
                  </Text>
                  <Text style={styles.textBold}> </Text>
                </View>
                <View
                  style={{
                    width: "20%",
                    borderRightWidth: 1,
                    padding: 2,
                  }}
                >
                  <Text style={styles.textBold}> </Text>
                  <Text style={styles.textBold}> </Text>
                </View>
                <View
                  style={{
                    width: "20%",
                    padding: 2,
                  }}
                >
                  <Text style={styles.textBold}> </Text>
                  <Text style={styles.textBold}> </Text>
                </View>
              </View>
              <View
                style={[styles.tableStartBorderView, { borderBottomWidth: 0 }]}
              >
                <View
                  style={{
                    width: "40%",
                    borderRightWidth: 1,
                    padding: 2,
                  }}
                >
                  <Text style={styles.textBold}>
                    9) LESS: Interest paid on dwelling house{"\n"}
                    Under Section 24
                  </Text>
                </View>
                <View
                  style={{
                    width: "20%",
                    borderRightWidth: 1,
                    padding: 2,
                  }}
                >
                  <Text style={styles.textBold}>NIL</Text>
                  <Text style={styles.textBold}> </Text>
                </View>
                <View
                  style={{
                    width: "20%",
                    borderRightWidth: 1,
                    padding: 2,
                  }}
                >
                  <Text style={styles.textBold}> </Text>
                  <Text style={styles.textBold}> </Text>
                </View>
                <View
                  style={{
                    width: "20%",
                    padding: 2,
                  }}
                >
                  <Text style={styles.textBold}> </Text>
                  <Text style={styles.textBold}> </Text>
                </View>
              </View>
              <View style={[styles.tableStartBorderView]}>
                <View
                  style={{
                    width: "40%",
                    borderRightWidth: 1,
                    padding: 2,
                  }}
                >
                  <Text style={styles.textBold}>
                    10) GROSS TOTAL INCOME (6+8-9)
                  </Text>
                </View>
                <View
                  style={{
                    width: "20%",
                    borderRightWidth: 1,
                    padding: 2,
                  }}
                >
                  <Text style={styles.textBold}> </Text>
                </View>
                <View
                  style={{
                    width: "20%",
                    borderRightWidth: 1,
                    padding: 2,
                  }}
                >
                  <Text style={styles.textBold}> </Text>
                </View>
                <View
                  style={{
                    width: "20%",
                    padding: 2,
                  }}
                >
                  <Text style={styles.textBold}>
                    Rs. {IndianFormat(AllGross - 75000 + BankInterest)}
                  </Text>
                </View>
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
              <View
                style={[
                  styles.tableStartBorderView,
                  { flexDirection: "column" },
                ]}
              >
                {/* <View style={[styles.tableStartBorderView]}>
                  <View
                    style={{
                      width: "40%",
                      borderRightWidth: 1,
                      padding: 2,
                    }}
                  >
                    <Text style={styles.textBold}>
                      11) DEDUCTION UNDER{"\n"} CHAPTER VI A (80C TO 80U)
                    </Text>
                  </View>
                  <View
                    style={{
                      width: "20%",
                      borderRightWidth: 1,
                      padding: 2,
                    }}
                  >
                    <Text style={styles.textBold}>GROSS{"\n"} AMOUNT</Text>
                  </View>
                  <View
                    style={{
                      width: "20%",
                      borderRightWidth: 1,
                      padding: 2,
                    }}
                  >
                    <Text style={styles.textBold}>
                      QUALIFYING{"\n"} AMOUNT
                    </Text>
                  </View>
                  <View
                    style={{
                      width: "20%",
                      padding: 2,
                    }}
                  >
                    <Text style={styles.textBold}>
                      DEDUCTION{"\n"} AMOUNT
                    </Text>
                  </View>
                </View>
                <View
                  style={[
                    styles.tableStartBorderView,
                    { borderBottomWidth: 0 },
                  ]}
                >
                  <View
                    style={{
                      width: "40%",
                      borderRightWidth: 1,
                      padding: 2,
                    }}
                  >
                    <Text style={styles.textBold}>G.P.F. SUBSCRIPTION</Text>
                  </View>
                  <View
                    style={{
                      width: "20%",
                      borderRightWidth: 1,
                      padding: 2,
                    }}
                  >
                    <Text style={styles.textBold}>
                      Rs. {IndianFormat(grossGPF)}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: "20%",
                      borderRightWidth: 1,
                      padding: 2,
                    }}
                  >
                    <Text style={styles.textBold}>
                      Rs. {IndianFormat(grossGPF)}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: "20%",
                      padding: 2,
                    }}
                  >
                    <Text style={styles.textBold}>
                      Rs. {IndianFormat(grossGPF)}
                    </Text>
                  </View>
                </View>
                {grossGSLI > 0 && (
                  <View
                    style={[
                      styles.tableStartBorderView,
                      { borderBottomWidth: 0 },
                    ]}
                  >
                    <View
                      style={{
                        width: "40%",
                        borderRightWidth: 1,
                        padding: 2,
                      }}
                    >
                      <Text style={styles.textBold}>
                        G.S.L.I. Subscription
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "20%",
                        borderRightWidth: 1,
                        padding: 2,
                      }}
                    >
                      <Text style={styles.textBold}>
                        Rs. {IndianFormat(grossGSLI)}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "20%",
                        borderRightWidth: 1,
                        padding: 2,
                      }}
                    >
                      <Text style={styles.textBold}>
                        Rs. {IndianFormat(grossGSLI)}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "20%",
                        padding: 2,
                      }}
                    >
                      <Text style={styles.textBold}>
                        Rs. {IndianFormat(grossGSLI)}
                      </Text>
                    </View>
                  </View>
                )}
                {lic > 0 && (
                  <View
                    style={[
                      styles.tableStartBorderView,
                      { borderBottomWidth: 0 },
                    ]}
                  >
                    <View
                      style={{
                        width: "40%",
                        borderRightWidth: 1,
                        padding: 2,
                      }}
                    >
                      <Text style={styles.textBold}>
                        L.I.C. / PLI Premium
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "20%",
                        borderRightWidth: 1,
                        padding: 2,
                      }}
                    >
                      <Text style={styles.textBold}>
                        Rs. {IndianFormat(lic)}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "20%",
                        borderRightWidth: 1,
                        padding: 2,
                      }}
                    >
                      <Text style={styles.textBold}>
                        Rs. {IndianFormat(lic)}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "20%",
                        padding: 2,
                      }}
                    >
                      <Text style={styles.textBold}>
                        Rs. {IndianFormat(lic)}
                      </Text>
                    </View>
                  </View>
                )}
                {nsc > 0 && (
                  <View
                    style={[
                      styles.tableStartBorderView,
                      { borderBottomWidth: 0 },
                    ]}
                  >
                    <View
                      style={{
                        width: "40%",
                        borderRightWidth: 1,
                        padding: 2,
                      }}
                    >
                      <Text style={styles.textBold}>NSC / KVP Purchase</Text>
                    </View>
                    <View
                      style={{
                        width: "20%",
                        borderRightWidth: 1,
                        padding: 2,
                      }}
                    >
                      <Text style={styles.textBold}>
                        Rs. {IndianFormat(nsc)}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "20%",
                        borderRightWidth: 1,
                        padding: 2,
                      }}
                    >
                      <Text style={styles.textBold}>
                        Rs. {IndianFormat(nsc)}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "20%",
                        padding: 2,
                      }}
                    >
                      <Text style={styles.textBold}>
                        Rs. {IndianFormat(nsc)}
                      </Text>
                    </View>
                  </View>
                )}
                {ppf > 0 && (
                  <View
                    style={[
                      styles.tableStartBorderView,
                      { borderBottomWidth: 0 },
                    ]}
                  >
                    <View
                      style={{
                        width: "40%",
                        borderRightWidth: 1,
                        padding: 2,
                      }}
                    >
                      <Text style={styles.textBold}>P.P.F.</Text>
                    </View>
                    <View
                      style={{
                        width: "20%",
                        borderRightWidth: 1,
                        padding: 2,
                      }}
                    >
                      <Text style={styles.textBold}>
                        Rs. {IndianFormat(ppf)}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "20%",
                        borderRightWidth: 1,
                        padding: 2,
                      }}
                    >
                      <Text style={styles.textBold}>
                        Rs. {IndianFormat(ppf)}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "20%",
                        padding: 2,
                      }}
                    >
                      <Text style={styles.textBold}>
                        Rs. {IndianFormat(ppf)}
                      </Text>
                    </View>
                  </View>
                )}
                {mediclaim > 0 && (
                  <View
                    style={[
                      styles.tableStartBorderView,
                      { borderBottomWidth: 0 },
                    ]}
                  >
                    <View
                      style={{
                        width: "40%",
                        borderRightWidth: 1,
                        padding: 2,
                      }}
                    >
                      <Text style={styles.textBold}>
                        80 D Medical Insurance Premium
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "20%",
                        borderRightWidth: 1,
                        padding: 2,
                      }}
                    >
                      <Text style={styles.textBold}>
                        Rs. {IndianFormat(mediclaim)}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "20%",
                        borderRightWidth: 1,
                        padding: 2,
                      }}
                    >
                      <Text style={styles.textBold}>
                        Rs. {IndianFormat(mediclaim)}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "20%",
                        padding: 2,
                      }}
                    >
                      <Text style={styles.textBold}>
                        Rs. {IndianFormat(mediclaim)}
                      </Text>
                    </View>
                  </View>
                )}
                {disabilityDeduction > 0 && (
                  <View
                    style={[
                      styles.tableStartBorderView,
                      { borderBottomWidth: 0 },
                    ]}
                  >
                    <View
                      style={{
                        width: "40%",
                        borderRightWidth: 1,
                        padding: 2,
                      }}
                    >
                      <Text style={styles.textBold}>
                        80U Person with Disability
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "20%",
                        borderRightWidth: 1,
                        padding: 2,
                      }}
                    >
                      <Text style={styles.textBold}>
                        Rs. {IndianFormat(disabilityDeduction)}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "20%",
                        borderRightWidth: 1,
                        padding: 2,
                      }}
                    >
                      <Text style={styles.textBold}>
                        Rs. {IndianFormat(disabilityDeduction)}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "20%",
                        padding: 2,
                      }}
                    >
                      <Text style={styles.textBold}>
                        Rs. {IndianFormat(disabilityDeduction)}
                      </Text>
                    </View>
                  </View>
                )}
                <View
                  style={[
                    styles.tableStartBorderView,
                    { borderBottomWidth: 0 },
                  ]}
                >
                  <View
                    style={{
                      width: "40%",
                      borderRightWidth: 1,
                      padding: 2,
                    }}
                  >
                    <Text style={styles.textBold}>
                      80 TTA Exemption of Savings Bank Interest{"\n"} (
                      Maximum Rs. 10000/-)
                    </Text>
                  </View>
                  <View
                    style={{
                      width: "20%",
                      borderRightWidth: 1,
                      padding: 2,
                    }}
                  >
                    <Text style={styles.textBold}>
                      Rs. {IndianFormat(BankInterest)}
                    </Text>
                    <Text style={styles.textBold}> </Text>
                  </View>
                  <View
                    style={{
                      width: "20%",
                      borderRightWidth: 1,
                      padding: 2,
                    }}
                  >
                    <Text style={styles.textBold}>
                      Rs. {IndianFormat(BankInterest)}
                    </Text>
                    <Text style={styles.textBold}> </Text>
                  </View>
                  <View
                    style={{
                      width: "20%",
                      padding: 2,
                    }}
                  >
                    <Text style={styles.textBold}>
                      Rs. {IndianFormat(BankInterest)}
                    </Text>
                    <Text style={styles.textBold}> </Text>
                  </View>
                </View> */}

                <View
                  style={[
                    styles.tableStartBorderView,
                    { borderBottomWidth: 0 },
                  ]}
                >
                  <View
                    style={{
                      width: "40%",
                      borderRightWidth: 1,
                      padding: 2,
                    }}
                  >
                    <Text style={styles.textBold}>
                      11) TOTAL OR NET TAXABLE INCOME
                    </Text>
                  </View>
                  <View
                    style={{
                      width: "20%",
                      borderRightWidth: 1,
                      padding: 2,
                    }}
                  >
                    <Text style={styles.textBold}> </Text>
                  </View>
                  <View
                    style={{
                      width: "20%",
                      borderRightWidth: 1,
                      padding: 2,
                    }}
                  >
                    <Text style={styles.textBold}> </Text>
                  </View>
                  <View
                    style={{
                      width: "20%",
                      padding: 2,
                    }}
                  >
                    <Text style={styles.textBold}>
                      Rs. {IndianFormat(AllGross - 75000 + BankInterest)}
                    </Text>
                  </View>
                </View>
                <View
                  style={[
                    styles.tableStartBorderView,
                    { borderBottomWidth: 0 },
                  ]}
                >
                  <View
                    style={{
                      width: "40%",
                      borderRightWidth: 1,
                      padding: 2,
                    }}
                  >
                    <Text style={styles.textBold}>12) ROUNDED OFF</Text>
                  </View>
                  <View
                    style={{
                      width: "20%",
                      borderRightWidth: 1,
                      padding: 2,
                    }}
                  >
                    <Text style={styles.textBold}> </Text>
                  </View>
                  <View
                    style={{
                      width: "20%",
                      borderRightWidth: 1,
                      padding: 2,
                    }}
                  >
                    <Text style={styles.textBold}> </Text>
                  </View>
                  <View
                    style={{
                      width: "20%",
                      padding: 2,
                    }}
                  >
                    <Text style={styles.textBold}>
                      Rs. {IndianFormat(TotalRoundOffIncome)}
                    </Text>
                  </View>
                </View>
                <View
                  style={[
                    styles.tableStartBorderView,
                    { borderBottomWidth: 0 },
                  ]}
                >
                  <View
                    style={{
                      width: "40%",
                      borderRightWidth: 1,
                      padding: 2,
                    }}
                  >
                    <Text style={styles.textBold}>
                      13) TAX ON TOTAL OR NET INCOME
                    </Text>
                  </View>
                  <View
                    style={{
                      width: "20%",
                      borderRightWidth: 1,
                      padding: 2,
                    }}
                  >
                    <Text style={styles.textBold}> </Text>
                  </View>
                  <View
                    style={{
                      width: "20%",
                      borderRightWidth: 1,
                      padding: 2,
                    }}
                  >
                    <Text style={styles.textBold}> </Text>
                  </View>
                  <View
                    style={{
                      width: "20%",
                      padding: 2,
                    }}
                  >
                    <Text style={styles.textBold}>
                      Rs. {IndianFormat(CalculatedIT)}
                    </Text>
                  </View>
                </View>
                <View
                  style={[
                    styles.tableStartBorderView,
                    { borderBottomWidth: 0 },
                  ]}
                >
                  <View
                    style={{
                      width: "40%",
                      borderRightWidth: 1,
                      padding: 2,
                    }}
                  >
                    <Text style={styles.textBold}>
                      14) LESS: REBATE U/S. 87A
                    </Text>
                  </View>
                  <View
                    style={{
                      width: "20%",
                      borderRightWidth: 1,
                      padding: 2,
                    }}
                  >
                    <Text style={styles.textBold}> </Text>
                  </View>
                  <View
                    style={{
                      width: "20%",
                      borderRightWidth: 1,
                      padding: 2,
                    }}
                  >
                    <Text style={styles.textBold}> </Text>
                  </View>
                  <View
                    style={{
                      width: "20%",
                      padding: 2,
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
                  style={[
                    styles.tableStartBorderView,
                    { borderBottomWidth: 0 },
                  ]}
                >
                  <View
                    style={{
                      width: "40%",
                      borderRightWidth: 1,
                      padding: 2,
                    }}
                  >
                    <Text style={styles.textBold}>15) TAX ON SURCHARGE</Text>
                  </View>
                  <View
                    style={{
                      width: "20%",
                      borderRightWidth: 1,
                      padding: 2,
                    }}
                  >
                    <Text style={styles.textBold}> </Text>
                  </View>
                  <View
                    style={{
                      width: "20%",
                      borderRightWidth: 1,
                      padding: 2,
                    }}
                  >
                    <Text style={styles.textBold}> </Text>
                  </View>
                  <View
                    style={{
                      width: "20%",
                      padding: 2,
                    }}
                  >
                    <Text style={styles.textBold}>NIL</Text>
                  </View>
                </View>
                <View
                  style={[
                    styles.tableStartBorderView,
                    { borderBottomWidth: 0 },
                  ]}
                >
                  <View
                    style={{
                      width: "40%",
                      borderRightWidth: 1,
                      padding: 2,
                    }}
                  >
                    <Text style={styles.textBold}>
                      16) ADD: EDUCATION CESS {"\n"}
                      (4% OF TAX AND SURCHARGE)
                    </Text>
                  </View>
                  <View
                    style={{
                      width: "20%",
                      borderRightWidth: 1,
                      padding: 2,
                    }}
                  >
                    <Text style={styles.textBold}> </Text>
                    <Text style={styles.textBold}> </Text>
                  </View>
                  <View
                    style={{
                      width: "20%",
                      borderRightWidth: 1,
                      padding: 2,
                    }}
                  >
                    <Text style={styles.textBold}> </Text>
                    <Text style={styles.textBold}> </Text>
                  </View>
                  <View
                    style={{
                      width: "20%",
                      padding: 2,
                    }}
                  >
                    <Text style={styles.textBold}> </Text>
                    <Text style={styles.textBold}>
                      {!isUnderRebate ? `Rs. ${IndianFormat(eduCess)}` : `N/A`}
                    </Text>
                  </View>
                </View>
                <View
                  style={[
                    styles.tableStartBorderView,
                    { borderBottomWidth: 0 },
                  ]}
                >
                  <View
                    style={{
                      width: "40%",
                      borderRightWidth: 1,
                      padding: 2,
                    }}
                  >
                    <Text style={styles.textBold}>
                      17) TOTAL TAX PAYABLE (17+18)
                    </Text>
                  </View>
                  <View
                    style={{
                      width: "20%",
                      borderRightWidth: 1,
                      padding: 2,
                    }}
                  >
                    <Text style={styles.textBold}> </Text>
                  </View>
                  <View
                    style={{
                      width: "20%",
                      borderRightWidth: 1,
                      padding: 2,
                    }}
                  >
                    <Text style={styles.textBold}> </Text>
                  </View>
                  <View
                    style={{
                      width: "20%",
                      padding: 2,
                    }}
                  >
                    <Text style={styles.textBold}>
                      {!isUnderRebate
                        ? `Rs. ${IndianFormat(AddedEduCess)}`
                        : `NIL`}
                    </Text>
                  </View>
                </View>
                <View
                  style={[
                    styles.tableStartBorderView,
                    { borderBottomWidth: 0 },
                  ]}
                >
                  <View
                    style={{
                      width: "40%",
                      borderRightWidth: 1,
                      padding: 2,
                    }}
                  >
                    <Text style={styles.textBold}>
                      18) LESS: REBATE U/S. 89 {"\n"}
                      (Attach Details)
                    </Text>
                  </View>
                  <View
                    style={{
                      width: "20%",
                      borderRightWidth: 1,
                      padding: 2,
                    }}
                  >
                    <Text style={styles.textBold}> </Text>
                    <Text style={styles.textBold}> </Text>
                  </View>
                  <View
                    style={{
                      width: "20%",
                      borderRightWidth: 1,
                      padding: 2,
                    }}
                  >
                    <Text style={styles.textBold}> </Text>
                    <Text style={styles.textBold}> </Text>
                  </View>
                  <View
                    style={{
                      width: "20%",
                      padding: 2,
                    }}
                  >
                    <Text style={styles.textBold}>
                      <Text style={styles.textBold}>N/A </Text>
                      <Text style={styles.textBold}> </Text>
                    </Text>
                  </View>
                </View>
                <View
                  style={[
                    styles.tableStartBorderView,
                    { borderBottomWidth: 0 },
                  ]}
                >
                  <View
                    style={{
                      width: "40%",
                      borderRightWidth: 1,
                      padding: 2,
                    }}
                  >
                    <Text style={styles.textBold}>
                      19) NET TAX PAYABLE (19-20)
                    </Text>
                  </View>
                  <View
                    style={{
                      width: "20%",
                      borderRightWidth: 1,
                      padding: 2,
                    }}
                  >
                    <Text style={styles.textBold}> </Text>
                  </View>
                  <View
                    style={{
                      width: "20%",
                      borderRightWidth: 1,
                      padding: 2,
                    }}
                  >
                    <Text style={styles.textBold}> </Text>
                  </View>
                  <View
                    style={{
                      width: "20%",
                      padding: 2,
                    }}
                  >
                    <Text style={styles.textBold}>
                      {!isUnderRebate
                        ? `Rs. ${IndianFormat(AddedEduCess)}`
                        : `NIL`}
                    </Text>
                  </View>
                </View>
                <View
                  style={[
                    styles.tableStartBorderView,
                    { borderBottomWidth: 0 },
                  ]}
                >
                  <View
                    style={{
                      width: "40%",
                      borderRightWidth: 1,
                      padding: 2,
                    }}
                  >
                    <Text style={styles.textBold}>
                      20) LESS: TAX DEDUCTED AT SOURCE
                    </Text>
                  </View>
                  <View
                    style={{
                      width: "20%",
                      borderRightWidth: 1,
                      padding: 2,
                    }}
                  >
                    <Text style={styles.textBold}> </Text>
                  </View>
                  <View
                    style={{
                      width: "20%",
                      borderRightWidth: 1,
                      padding: 2,
                    }}
                  >
                    <Text style={styles.textBold}> </Text>
                  </View>
                  <View
                    style={{
                      width: "20%",
                      padding: 2,
                    }}
                  >
                    <Text style={styles.textBold}>
                      {tds > 0 ? `Rs. ${IndianFormat(tds)}` : `NIL`}
                    </Text>
                  </View>
                </View>
                <View
                  style={[
                    styles.tableStartBorderView,
                    { borderBottomWidth: 0 },
                  ]}
                >
                  <View
                    style={{
                      width: "40%",
                      borderRightWidth: 1,
                      padding: 2,
                    }}
                  >
                    <Text style={styles.textBold}>
                      21) TAX PAYABLE / REFUNDABLE (21-22)
                    </Text>
                  </View>
                  <View
                    style={{
                      width: "20%",
                      borderRightWidth: 1,
                      padding: 2,
                    }}
                  >
                    <Text style={styles.textBold}> </Text>
                  </View>
                  <View
                    style={{
                      width: "20%",
                      borderRightWidth: 1,
                      padding: 2,
                    }}
                  >
                    <Text style={styles.textBold}> </Text>
                  </View>
                  <View
                    style={{
                      width: "20%",
                      padding: 2,
                    }}
                  >
                    <Text style={styles.textBold}>
                      {!isUnderRebate
                        ? `Rs. ${IndianFormat(AddedEduCess)}`
                        : `NIL`}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={[styles.tableStartBorderView]}>
                <Text style={styles.titleMain}>
                  DETAILS OF TAX DEDUCTED AND DEPOSITED INTO CENTRAL GOVERNMENT
                  ACCOUNT
                </Text>
              </View>
              <View style={[styles.tableStartBorderView]}>
                <View
                  style={{
                    width: "20%",
                    padding: 2,
                  }}
                >
                  <Text style={styles.text2i}>Amount</Text>
                </View>
                <View
                  style={{
                    width: "30%",
                    padding: 2,
                  }}
                >
                  <Text style={styles.text2i}>Date of Payment</Text>
                </View>

                <View
                  style={{
                    width: "50%",
                    padding: 2,
                  }}
                >
                  <Text style={styles.text2i}>
                    Name of the bank and Branch where Tax Deposited
                  </Text>
                </View>
              </View>
              <View
                style={[styles.tableStartBorderView, { height: 80 }]}
              ></View>
              <View
                style={[
                  styles.tableStartBorderView,
                  {
                    flexDirection: "row",
                    justifyContent: "space-around",
                    alignItems: "center",
                    padding: 5,
                    flexWrap: "wrap",
                    textAlign: "justify",
                    gap: 2,
                    width: "100%",
                  },
                ]}
              >
                <Text style={styles.text}>I </Text>
                <Text
                  style={[
                    styles.text,
                    {
                      textDecoration: "underline",
                      textDecorationStyle: "dotted",
                      textAlign: "justify",
                    },
                  ]}
                >
                  {titleCase(tname)}
                </Text>
                {gender === "male" ? (
                  <Text style={styles.text}>
                    {" "}
                    son{" "}
                    <Text
                      style={[
                        styles.text,
                        {
                          textDecoration: "line-through",
                          textAlign: "justify",
                        },
                      ]}
                    >
                      /daughter
                    </Text>{" "}
                    of{" "}
                  </Text>
                ) : (
                  <Text style={styles.text}>
                    {" "}
                    <Text
                      style={[
                        styles.text,
                        {
                          textDecoration: "line-through",
                          textAlign: "justify",
                        },
                      ]}
                    >
                      son/{" "}
                    </Text>
                    daughter of{" "}
                  </Text>
                )}
                <Text
                  style={[
                    styles.text,
                    {
                      textDecoration: "underline",
                      textDecorationStyle: "dotted",
                      textAlign: "justify",
                    },
                  ]}
                >
                  {titleCase(fname)}
                </Text>
                <Text style={styles.text}> working in the capacity of </Text>
                <Text
                  style={[
                    styles.text,
                    {
                      textDecoration: "underline",
                      textDecorationStyle: "dotted",
                      textAlign: "justify",
                    },
                  ]}
                >
                  {desig}
                </Text>
                <Text style={styles.text}>
                  {" "}
                  , (designation) do hereby certify that a sum of{"  "}
                </Text>
                <Text
                  style={[
                    styles.text,
                    {
                      textDecoration: "underline",
                      textDecorationStyle: "dotted",
                      textAlign: "justify",
                    },
                  ]}
                >
                  Rs. {isUnderRebate ? 0 : IndianFormat(AddedEduCess)}
                </Text>
                <Text
                  style={[
                    styles.text,
                    {
                      textDecoration: "underline",
                      textDecorationStyle: "dotted",
                      textAlign: "justify",
                    },
                  ]}
                >
                  {isUnderRebate
                    ? "[Rupees Zero Only (in words)]"
                    : "[ " + INR(AddedEduCess) + " Only (in words)]"}
                </Text>
                <Text style={styles.text}>
                  {" "}
                  has been deducted at source and paid to the credit of the
                  Central Government. I further certify that the information
                  given above is true and correct based on the books of account
                  documents and other available records.
                </Text>
              </View>
              <View
                style={[
                  styles.tableStartBorderView,
                  { padding: 5, marginVertical: 20, borderBottomWidth: 0 },
                ]}
              >
                <View
                  style={{
                    width: "50%",
                    justifyContent: "flex-start",
                    paddingRight: 8,
                  }}
                >
                  <Text
                    style={[
                      styles.textBold,
                      { textAlign: "left", paddingVertical: 8 },
                    ]}
                  >
                    Date…................................................
                  </Text>
                  <Text
                    style={[
                      styles.textBold,
                      { textAlign: "left", paddingVertical: 8 },
                    ]}
                  >
                    Designation…................................................
                  </Text>
                </View>
                <View style={{ width: "50%", justifyContent: "flex-start" }}>
                  <Text
                    style={[
                      styles.textBold,
                      { textAlign: "right", paddingVertical: 8 },
                    ]}
                  >
                    Signature of the person resposible for deduction of tax
                  </Text>
                  <Text
                    style={[
                      styles.textBold,
                      { textAlign: "right", paddingVertical: 8 },
                    ]}
                  >
                    Place…...................................................
                  </Text>
                  <Text
                    style={[
                      styles.textBold,
                      { textAlign: "right", paddingVertical: 8 },
                    ]}
                  >
                    Full
                    Name.......................................................................
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
    fontSize: 14,
    fontWeight: "bold",
    fontFamily: "TimesBold",
    textAlign: "center",
  },
  textBold: {
    fontSize: 11,
    fontWeight: "bold",
    fontFamily: "TimesBold",
    textAlign: "center",
    paddingVertical: 1,
  },
  titleMain: {
    fontSize: 12,
    fontWeight: "bold",
    fontFamily: "TimesBold",
    textAlign: "center",
  },
  text: {
    fontSize: 11,
    fontFamily: "Times",
    textAlign: "justify",
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
    fontFamily: "TimesItalic",
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
    borderBottomWidth: 0.5,
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
    paddingRight: 1,
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
    padding: 2,
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
  family: "TimesItalic",
  src: "https://raw.githubusercontent.com/amtawestwbtpta/awwbtptadata/main/timesBoldItalic.ttf",
});
Font.register({
  family: "TimesBold",
  src: "https://raw.githubusercontent.com/amtawestwbtpta/awwbtptadata/main/timesBold.ttf",
});
