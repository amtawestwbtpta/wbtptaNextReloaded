"use client";
import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Font,
  PDFViewer,
} from "@react-pdf/renderer";
import { INR, printDate } from "../modules/calculatefunctions";
const width = 2480;
const height = 3508;
export default function WBTPTAPaySLip({ data }) {
  const {
    tname,
    desig,
    school,
    empid,
    pan,
    ir,
    addl,
    da,
    hra,
    ma,
    gross,
    ptax,
    gsli,
    udise,
    month,
    netpay,
    basicpay,
    pfund,
    level,
    cell,
    deduction,
    year,
  } = data;
  return (
    <Document
      style={{ margin: 5, padding: 5 }}
      title={`PAYSLIP OF ${tname?.toUpperCase()} OF ${school?.toUpperCase()} FOR THE MONTH OF ${month.toUpperCase()}, ${year}`}
    >
      <Page size="A4" orientation="portrait" style={styles.page}>
        <View style={styles.pageMainView}>
          <Image
            src={`https://raw.githubusercontent.com/ultimate365/jsondata/main/logo.png`}
            style={{ width: 70, alignSelf: "center", marginVertical: 10 }}
            alt="qr-code"
          />

          <View style={styles.columnFlexView}>
            <Text style={styles.title}>
              WEST BENGAL TRINAMOOL PRIMARY TEACHERS' ASSOCIATION
            </Text>
            <Text style={styles.title}>
              * AMTA WEST CIRCLE * HOWRAH GRAMIN DISTRICT *
            </Text>
            <Text style={[styles.title2, { color: "darkgreen" }]}>
              {`* Sikshak Bhawan, Vill.- Joypur Fakirdas, P.O.- Joypur,\n P.S.- Joypur, District- Howrah, PIN-711401. *`}
            </Text>
            <Text style={[styles.title2, { marginTop: 10 }]}>
              PAY SLIP FOR THE MONTH OF {month.toUpperCase()},{year}
            </Text>
          </View>

          <View
            style={[
              styles.rowFlexView,
              { marginTop: 30, alignItems: "flex-start" },
            ]}
          >
            <View style={[styles.columnFlexView, { alignItems: "flex-start" }]}>
              <View style={styles.rowFlexView}>
                <Text style={styles.text2}>EMPLOYEE NAME:&nbsp;</Text>
                <Text style={styles.text}>{tname}</Text>
              </View>
              <View style={styles.rowFlexView}>
                <Text style={styles.text2}>SCHOOL NAME:&nbsp;</Text>
                <Text style={styles.text}>{school}(</Text>
                <Text style={[styles.text2, { paddingLeft: -2 }]}>
                  UDISE:&nbsp;
                </Text>
                <Text style={[styles.text, { paddingLeft: -4 }]}>{udise})</Text>
              </View>
              <View style={styles.rowFlexView}>
                <Text style={styles.text2}>LEVEL:&nbsp;</Text>
                <Text style={styles.text}>{level}</Text>
                <Text style={styles.text2}>CELL:&nbsp;</Text>
                <Text style={styles.text}>{cell}</Text>
              </View>
            </View>
            <View style={[styles.columnFlexView, { alignItems: "flex-start" }]}>
              <View style={styles.rowFlexView}>
                <Text style={styles.text}>Employee ID:&nbsp;</Text>
                <Text style={styles.text2}>{empid}</Text>
              </View>
              <View style={styles.rowFlexView}>
                <Text style={styles.text}>DESIGNATION:&nbsp;</Text>
                <Text style={styles.text2}>{desig}</Text>
              </View>
              <View style={styles.rowFlexView}>
                <Text style={styles.text}>PAN:&nbsp;</Text>
                <Text style={styles.text2}>{pan}</Text>
              </View>
            </View>
          </View>
          <View style={{ borderWidth: 1, marginTop: 20 }}>
            <View style={styles.tableStartBorderView}>
              <View style={styles.view50Center}>
                <Text style={styles.text2}>EARNING(Rs)</Text>
              </View>
              <View style={[styles.view50Center, { borderRightWidth: 0 }]}>
                <Text style={styles.text2}>DEDUCTION(Rs)</Text>
              </View>
            </View>
            <View style={styles.rowStartBorderView}>
              <View style={styles.view50Center}>
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "flex-start",
                    alignContent: "flex-start",
                    width: "100%",
                    paddingHorizontal: 2,
                  }}
                >
                  <View style={styles.salaryView}>
                    <Text style={styles.text2}>BASIC</Text>
                    <Text style={styles.text}>{basicpay}</Text>
                  </View>
                  {desig === "HT" && (
                    <View style={styles.salaryView}>
                      <Text style={styles.text2}>ADDL. REMUN.</Text>
                      <Text style={styles.text}>{addl}</Text>
                    </View>
                  )}
                  <View style={styles.salaryView}>
                    <Text style={styles.text2}>DA</Text>
                    <Text style={styles.text}>{da}</Text>
                  </View>
                  <View style={styles.salaryView}>
                    <Text style={styles.text2}>HRA</Text>
                    <Text style={styles.text}>{hra}</Text>
                  </View>
                  <View style={styles.salaryView}>
                    <Text style={styles.text2}>MA</Text>
                    <Text style={styles.text}>{ma}</Text>
                  </View>
                  {ir > 0 && (
                    <View style={styles.salaryView}>
                      <Text style={styles.text2}>IR</Text>
                      <Text style={styles.text}>{ir}</Text>
                    </View>
                  )}
                </View>
              </View>
              <View
                style={[
                  styles.view50Center,
                  {
                    borderRightWidth: 0,
                    alignItems: "flex-start",
                    alignContent: "flex-start",
                  },
                ]}
              >
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "flex-start",
                    alignContent: "flex-start",
                    width: "100%",
                    paddingHorizontal: 2,
                  }}
                >
                  <View style={styles.salaryView}>
                    <Text style={styles.text2}>GPF</Text>
                    <Text style={styles.text}>{pfund}</Text>
                  </View>
                  <View style={styles.salaryView}>
                    <Text style={styles.text2}>PT</Text>
                    <Text style={styles.text}>{ptax}</Text>
                  </View>
                  <View style={styles.salaryView}>
                    <Text style={styles.text2}>GSLI</Text>
                    <Text style={styles.text}>{gsli}</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.rowStartBorderView}>
              <View style={styles.view50Center}>
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    alignContent: "center",
                    width: "100%",
                    paddingHorizontal: 2,
                  }}
                >
                  <View style={styles.salaryView}>
                    <Text style={styles.text2}>Total:</Text>
                    <Text style={styles.text2}>{gross}</Text>
                  </View>
                </View>
              </View>
              <View style={[styles.view50Center, { borderRightWidth: 0 }]}>
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    alignContent: "center",
                    width: "100%",
                    paddingHorizontal: 2,
                  }}
                >
                  <View
                    style={[styles.salaryView, { justifyContent: "flex-end" }]}
                  >
                    <Text style={styles.text2}>{deduction}</Text>
                  </View>
                </View>
              </View>
            </View>
            <View
              style={[
                styles.rowStartBorderView,
                { borderRightWidth: 0, justifyContent: "flex-start" },
              ]}
            >
              <View
                style={[
                  styles.view25,
                  { borderRightWidth: 0, justifyContent: "flex-start" },
                ]}
              >
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    alignContent: "center",
                    width: "100%",
                    paddingHorizontal: 2,
                  }}
                >
                  <View style={styles.salaryView}>
                    <Text style={styles.text2}>GROSS PAY:</Text>
                    <Text style={styles.text2}>{gross}</Text>
                  </View>
                </View>
              </View>
            </View>
            <View
              style={[
                styles.rowStartBorderView,
                {
                  borderRightWidth: 0,
                  borderBottomWidth: 0,
                  justifyContent: "flex-start",
                },
              ]}
            >
              <View
                style={{ borderRightWidth: 0, justifyContent: "flex-start" }}
              >
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    alignContent: "center",
                    width: "100%",
                    paddingHorizontal: 2,
                    flexDirection: "row",
                  }}
                >
                  <View
                    style={[
                      styles.salaryView,
                      { justifyContent: "flex-start" },
                    ]}
                  >
                    <Text style={styles.text2}>NET PAY:</Text>
                    <Text style={[styles.text2, { marginLeft: 50 }]}>
                      {netpay} ({INR(netpay)})
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View
            style={{
              borderWidth: 0,
              marginTop: 20,
              justifyContent: "flex-start",
            }}
          >
            <Text style={[styles.text, { textAlign: "left" }]}>
              DA: Dearness Allowance, HRA: House Rent Allowance, MA: Medical
              Allowance, IR: Interim Relief.
            </Text>
            <Text style={[styles.text, { textAlign: "left" }]}>
              GPF: General Provident Fund, PT: Professional Tax
            </Text>
            <Text style={[styles.text, { textAlign: "left" }]}>
              GSLI: Group Savings Linked Insurance
            </Text>
          </View>
          <View
            style={{
              borderWidth: 0,
              marginTop: 200,
              justifyContent: "flex-start",
              flexDirection: "row",
              alignItems: "flex-start",
            }}
          >
            <Text style={[styles.text2, { textAlign: "left" }]}>
              Disclaimer:
            </Text>
            <Text style={[styles.text, { textAlign: "left" }]}>
              This Payslip is Only For Reference Purpose. It can not be used as
              a Valid Proof of Salary.Please Use Payslip{"\n"}which is available
              form SIS Office as a Valid Salary Proof.
            </Text>
          </View>
          <View style={styles.break}></View>
          <View style={styles.rowFlexView}>
            <Text style={styles.text2i}>awwbtpta.vercel.app</Text>
            <Text style={styles.text2i}>Page-1</Text>
            <Text style={styles.text2i}>Date of Generation: {printDate()}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}
const styles = StyleSheet.create({
  page: {
    padding: 5,
    margin: 5,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    width: width,
    height: height,
  },
  pageMainView: {
    padding: 30,
    margin: 5,
    backgroundColor: "#FFFFFF",
    alignSelf: "center",
    width: "100%",
    height: "98%",
  },
  title: {
    fontSize: 12,
    fontWeight: "bold",
    fontFamily: "DejaVu",
    textAlign: "center",
  },
  title2: {
    fontSize: 10,
    fontWeight: "bold",
    fontFamily: "DejaVu",
    textAlign: "center",
  },
  titleMain: {
    fontSize: 20,
    fontWeight: "normal",
    fontFamily: "DejaVu",
    textAlign: "center",
  },
  text: {
    fontSize: 8,
    fontFamily: "DejaVuNormal",
    textAlign: "center",
    padding: 2,
  },
  text2: {
    fontSize: 8,
    fontFamily: "DejaVu",
    textAlign: "center",
    padding: 2,
  },
  text2i: {
    fontSize: 8,
    fontFamily: "DejaVuItalic",
    textAlign: "center",
    padding: 2,
  },
  text3: {
    fontSize: 8,
    fontFamily: "DejaVuNormal",
    textAlign: "center",
    transform: "rotate(-60deg)",
  },
  text4: {
    fontSize: 8,
    fontFamily: "DejaVuNormal",
    textAlign: "center",
  },
  text5: {
    fontSize: 9,
    fontFamily: "DejaVuNormal",
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
  secondTableStartView: {
    borderWidth: 1,
    width: "100%",
    height: "auto",
    flexDirection: "row",
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
  SecondView16: {
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 1,
    borderBottomWidth: 0,
    paddingRight: 1,
    width: "16%",
    height: 15,
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
    borderBottomWidth: 0.5,
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
  family: "Kalpurush",
  src: "https://raw.githubusercontent.com/usprys/usprysdata/main/kalpurush.ttf",
});
Font.register({
  family: "Times",
  src: "https://raw.githubusercontent.com/usprys/usprysdata/main/times.ttf",
});
Font.register({
  family: "DejaVu",
  src: "https://raw.githubusercontent.com/amtawestwbtpta/awwbtptadata/main/DejaVuSerif-Bold.ttf",
});
Font.register({
  family: "DejaVuNormal",
  src: "https://raw.githubusercontent.com/amtawestwbtpta/awwbtptadata/main/DejaVuSerif.ttf",
});
Font.register({
  family: "DejaVuItalic",
  src: "https://raw.githubusercontent.com/amtawestwbtpta/awwbtptadata/main/DejaVuSerif-BoldItalic.ttf",
});
