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
const width = 2480;
const height = 3508;

export default function HRADeclaration({ data }) {
  const {
    tname,
    school,
    basic,
    hra,
    salaryMonth,
    year,
    spouseName,
    spouseOfficeName,
    spouseOfficeAddress,
    spouseBasic,
    spouseHra,
    spouseHouseRenntPaid,
  } = data;
  return (
    // <PDFViewer
    //   style={{
    //     width: width / 3,
    //     height: height / 3,
    //     alignSelf: "center",
    //   }}
    // >
    <Document
      style={{ margin: 5, padding: 5 }}
      title={`HRA Declaration OF ${tname}`}
    >
      <Page size="A4" orientation="portrait" style={styles.page}>
        <View style={styles.pageMainView}>
          <Text style={styles.titleMain}>
            DISTRICT PRIMARY SCHOOL COUNCIL, HOWRAH
          </Text>
          <Text style={styles.title}>
            HOUSE RENT DECLARATION FORM. (AS ON JANUARY/JULY {year})
          </Text>
          <Image
            source={{
              uri: "https://raw.githubusercontent.com/amtawestwbtpta/awwbtptadata/main/check.png",
            }}
            style={{
              height: 10,
              width: 10,
              position: "absolute",
              marginTop: 28,
              marginLeft: salaryMonth === "january" ? 400 : 460,
            }}
          />
          <Text style={[styles.text, { marginTop: 0 }]}>
            (Go No- 97SE(B), Dt-07.03.2001)
          </Text>
          <Text style={styles.textBoldunderLine}>PART-A</Text>
          <Text style={[styles.text, { textAlign: "left" }]}>
            I am Married/ Unmarried/ Widow/ Widower: ( Strike out which are not
            applicable)
          </Text>

          <View style={styles.rowView}>
            <View style={{ width: "30%" }}>
              <Text style={styles.rowText}>1. Name of the Teacher:</Text>
            </View>
            <View style={[{ width: "60%" }, styles.underLineView]}>
              <Text style={styles.underLineText}>{tname}</Text>
            </View>
          </View>
          <View style={styles.rowView}>
            <View style={{ width: "30%" }}>
              <Text style={styles.rowText}>2. Name of the School: </Text>
            </View>
            <View style={[{ width: "60%" }, styles.underLineView]}>
              <Text style={styles.underLineText}>{school}</Text>
            </View>
          </View>
          <View style={styles.rowView}>
            <View style={{ width: "30%" }}>
              <Text style={styles.rowText}>3. Name of the Circle: </Text>
            </View>
            <View style={[{ width: "60%" }, styles.underLineView]}>
              <Text style={styles.underLineText}>AMTA WEST CIRCLE</Text>
            </View>
          </View>
          <View style={styles.rowView}>
            <View style={{ width: "40%" }}>
              <Text style={styles.rowText}>
                4. Present Basic Pay per Month:{" "}
              </Text>
            </View>
            <View style={[{ width: "50%" }, styles.underLineView]}>
              <Text style={styles.underLineText}>Rs. {basic}</Text>
            </View>
          </View>
          <View style={styles.rowView}>
            <View style={{ width: "50%" }}>
              <Text style={styles.rowText}>
                5. House Rent Allowance Drawn Per month:
              </Text>
            </View>
            <View style={[{ width: "40%" }, styles.underLineView]}>
              <Text style={styles.underLineText}>Rs. {hra}</Text>
            </View>
          </View>
          <Text style={[styles.text, { textAlign: "left", marginTop: 5 }]}>
            I do hereby declare that the details furnished in{" "}
            <Text style={styles.textBold}>PART-A</Text> are true at the best of
            my knowledge
          </Text>
          <View
            style={[
              styles.rowView,
              { justifyContent: "space-between", marginTop: 30 },
            ]}
          >
            <View style={{ width: "50%" }}>
              <Text style={styles.rowText}>Date -</Text>
            </View>
            <View style={[{ width: "40%" }]}>
              <Text style={styles.textBold}>Signature of the Employee</Text>
            </View>
          </View>
          <Text style={[styles.textBoldunderLine, { marginVertical: 5 }]}>
            PART-B
          </Text>
          <Text style={[styles.text, { textAlign: "left" }]}>
            My wife/husband is / was{" "}
            <Text style={styles.textBoldunderLine}>not in service</Text> under
            the Government of India or Government undertaking or any
            Statutory/Local body, Educational Institution/ Private Organization.
          </Text>
          <Text style={[styles.textBold, { marginVertical: 5 }]}>OR</Text>
          <Text style={[styles.text, { textAlign: "left" }]}>
            My wife/husband is / was{" "}
            <Text style={styles.textBoldunderLine}>in service</Text> under the
            Government of India or Government undertaking or any Statutory/Local
            body, Educational Institution/ Private Organization and following
            are the particulars of her/his employment and pay etc drawn by him/
            her:
          </Text>
          <View style={styles.rowView}>
            <View style={{ width: "30%" }}>
              <Text style={styles.rowText}>1. Name:</Text>
            </View>
            <View style={[{ width: "60%" }, styles.underLineView]}>
              <Text style={styles.underLineText}>
                {spouseName && spouseName}
              </Text>
            </View>
          </View>
          <View style={styles.rowView}>
            <View style={{ width: "30%" }}>
              <Text style={styles.rowText}>2. Name of the Office: </Text>
            </View>
            <View style={[{ width: "60%" }, styles.underLineView]}>
              <Text style={styles.underLineText}>
                {spouseOfficeName && spouseOfficeName}
              </Text>
            </View>
          </View>
          <View style={styles.rowView}>
            <View style={{ width: "30%" }}>
              <Text style={styles.rowText}>3. Address of Office: </Text>
            </View>
            <View style={[{ width: "60%" }, styles.underLineView]}>
              <Text style={styles.underLineText}>
                {spouseOfficeAddress && spouseOfficeAddress}
              </Text>
            </View>
          </View>
          <View style={styles.rowView}>
            <View style={{ width: "40%" }}>
              <Text style={styles.rowText}>
                4. Present Basic Pay per Month:{" "}
              </Text>
            </View>
            <View style={[{ width: "50%" }, styles.underLineView]}>
              <Text style={styles.underLineText}>
                {spouseBasic && `Rs. ${spouseBasic}`}
              </Text>
            </View>
          </View>
          <View style={styles.rowView}>
            <View style={{ width: "50%" }}>
              <Text style={styles.rowText}>5. House Rent Drawn Per month:</Text>
            </View>
            <View style={[{ width: "40%" }, styles.underLineView]}>
              <Text style={styles.underLineText}>
                {spouseHra && `Rs. ${spouseHra}`}
              </Text>
            </View>
          </View>
          <View style={styles.rowView}>
            <View style={{ width: "50%" }}>
              <Text style={styles.rowText}>
                6. House Rent Paid regarding Govt. Flat:
              </Text>
            </View>
            <View style={[{ width: "40%" }, styles.underLineView]}>
              <Text style={styles.underLineText}>
                {spouseHouseRenntPaid && `Rs. ${spouseHouseRenntPaid}`}
              </Text>
            </View>
          </View>
          <Text style={[styles.text, { textAlign: "left", marginTop: 5 }]}>
            I do hereby declare that the details furnished in{" "}
            <Text style={styles.textBold}>PART-B</Text> are true at the best of
            my knowledge
          </Text>
          <View
            style={[
              styles.rowView,
              { justifyContent: "space-between", marginTop: 30 },
            ]}
          >
            <View style={{ width: "50%" }}>
              <Text style={styles.rowText}>Date -</Text>
            </View>
            <View style={[{ width: "40%" }]}>
              <Text style={styles.textBold}>Signature of the Spouse</Text>
            </View>
          </View>
          <Text style={[styles.text, { textAlign: "left" }]}>
            Enclosure: Spouse’s Salary certificate. [Department with
            Designation]: -
          </Text>
          <Text style={styles.textBold}>
            (Strike out which is not applicable)
          </Text>
        </View>
      </Page>
    </Document>
    // </PDFViewer>
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
    padding: 5,
    margin: 5,
    backgroundColor: "#FFFFFF",
    alignSelf: "center",
    width: "98%",
    height: "98%",
  },
  titleMain: {
    fontSize: 22,
    fontFamily: "Algerian",
    textAlign: "center",
    textDecoration: "underline",
  },
  title: {
    fontSize: 16,
    fontFamily: "Algerian",
    textAlign: "center",
  },
  text: {
    marginTop: 2,
    fontSize: 14,
    fontFamily: "Times",
    textAlign: "center",
    lineHeight: 1.5,
  },
  rowText: {
    marginTop: 2,
    fontSize: 14,
    fontFamily: "Times",
    textAlign: "left",
    lineHeight: 1.5,
  },
  textBold: {
    marginTop: 2,
    fontSize: 14,
    fontFamily: "TimesBD",
    textAlign: "center",
    lineHeight: 1.5,
  },
  textBoldunderLine: {
    marginTop: 2,
    fontSize: 14,
    fontFamily: "TimesBD",
    textAlign: "center",
    lineHeight: 1.5,
    textDecoration: "underline",
  },

  underLineText: {
    fontSize: 14,
    fontFamily: "Times",
    textAlign: "center",
  },
  checkImage: {
    width: 10,
    height: 10,
    position: "absolute",
    marginTop: -7,
  },
  rowView: {
    marginTop: 2,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  underLineView: {
    borderBottomWidth: 1,
    borderBottomStyle: "dotted",
  },
});
Font.register({
  family: "Times",
  src: "https://raw.githubusercontent.com/amtawestwbtpta/awwbtptadata/main/times.ttf",
});
Font.register({
  family: "TimesBD",
  src: "https://raw.githubusercontent.com/amtawestwbtpta/awwbtptadata/main/timesBold.ttf",
});
Font.register({
  family: "Algerian",
  src: "https://raw.githubusercontent.com/amtawestwbtpta/awwbtptadata/main/Algerian.ttf",
});
