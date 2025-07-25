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
export default function BenefitApplication({ data, year }) {
  const currentYear = new Date().getFullYear();

  return (
    // <PDFViewer
    //   style={{
    //     width: width / 3,
    //     height: height / 3,
    //   }}
    // >
    <Document title="Service Confirmation Form">
      {data.map((teacher, index) => {
        const teacherYear = currentYear - year;
        const dojParts = teacher?.doj?.split("-") || [];
        const newDate =
          dojParts.length === 3
            ? `${dojParts[0]}-${dojParts[1]}-${
                parseInt(dojParts[2]) + teacherYear
              }`
            : "";
        let incrementDate = `01-07-${parseInt(dojParts[2]) + teacherYear}`;
        if (parseInt(dojParts[1]) >= 7) {
          incrementDate = `${dojParts[0]}-${dojParts[1]}-${
            parseInt(dojParts[2]) + teacherYear
          }`;
        }
        return (
          <Page
            size="A4"
            orientation="portrait"
            style={styles.page}
            key={index}
          >
            <View style={styles.pageMainView}>
              <View style={styles.contentContainer}>
                <Text style={styles.text}>To,</Text>
                <Text style={styles.text}>The Chairman,</Text>
                <Text style={styles.text}>
                  Howrah District Primary School Council,
                </Text>
                <Text style={styles.text}>
                  18, Nityadhan Mukherjee Road, Howrah- 711101.
                </Text>
                <Text style={styles.text}>Through:</Text>
                <Text style={styles.text}>The Sub- Inspector of Schools</Text>
                <Text style={styles.text}>Amta West Circle.</Text>

                <View style={styles.checkContainer}>
                  <Image
                    source={{
                      uri: "https://raw.githubusercontent.com/amtawestwbtpta/awwbtptadata/main/check.png",
                    }}
                    style={[
                      styles.checkImage,
                      { left: teacherYear === 20 ? 312 : 290 },
                    ]}
                  />
                  {teacherYear === 20 ? (
                    <Text style={styles.subjectText}>
                      Sub: Application for taking
                      <Text style={styles.strikethrough}> 10 /</Text> 20 years
                      benefit
                    </Text>
                  ) : (
                    <Text style={styles.subjectText}>
                      Sub: Application for taking 10
                      <Text style={styles.strikethrough}> / 20</Text> years
                      benefit
                    </Text>
                  )}
                  <Text style={styles.referenceText}>
                    As per G.O. No. 437-SE(P&B)/SL/SS-408/19; Dt.- 13/12/2019
                  </Text>
                </View>

                <Text style={styles.text}>Sir,</Text>
                <Text style={styles.paragraph}>
                  I {teacher?.tname},
                  {teacher?.desig === "AT" ? " A.T." : " H.T."} of{" "}
                  {teacher?.school} under Amta West Circle, joined my first
                  school named
                  ...................................................................................
                  under
                  ..............................................................
                  on {teacher?.doj} as per DPSC Howrah's Memo no.
                  ................................................. Dt.
                  ................................... . I had completed my{" "}
                  {teacherYear === 20 ? (
                    <Text>
                      <Text style={styles.strikethrough}>10 / </Text>
                      20
                    </Text>
                  ) : (
                    <Text>
                      10
                      <Text style={styles.strikethrough}> / 20</Text>
                    </Text>
                  )}{" "}
                  years of continuous satisfactory service on {newDate}. I want
                  to take my{" "}
                  {teacherYear === 20 ? (
                    <Text>
                      <Text style={styles.strikethrough}>10 </Text>/ 20
                    </Text>
                  ) : (
                    <Text>
                      10
                      <Text style={styles.strikethrough}> / 20</Text>
                    </Text>
                  )}{" "}
                  years benefit (one additional increment in the same level) on{" "}
                  {incrementDate} as per G.O. No. 437- SE(P&B)/SL/SS-408/19;
                  Dt.- 13/12/2019.
                </Text>
                <Image
                  source={{
                    uri: "https://raw.githubusercontent.com/amtawestwbtpta/awwbtptadata/main/check.png",
                  }}
                  style={[
                    styles.checkImage,
                    { left: teacherYear === 20 ? 426 : 402, top: 244 },
                  ]}
                />
                <Image
                  source={{
                    uri: "https://raw.githubusercontent.com/amtawestwbtpta/awwbtptadata/main/check.png",
                  }}
                  style={[
                    styles.checkImage,
                    { left: teacherYear === 20 ? 298 : 275, top: 262 },
                  ]}
                />

                <Text style={styles.paragraph}>
                  So, sir please take necessary action for the purpose.
                </Text>

                <Text style={styles.signature}>Yours faithfully,</Text>
                <Text style={styles.date}>Date:</Text>
                <Text style={styles.signatureLine}>
                  ..............................................
                </Text>
                <Text style={styles.designation}>
                  {teacher?.desig === "AT"
                    ? "Assistant Teacher"
                    : "Head Teacher"}
                  ,
                </Text>
                <Text style={styles.schoolName}>{teacher?.school}</Text>
                <Text style={styles.circle}>Amta West Circle</Text>
              </View>
            </View>
          </Page>
        );
      })}
    </Document>
    // </PDFViewer>
  );
}

const styles = StyleSheet.create({
  page: {
    padding: 10,
    margin: 10,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    width: width,
    height: height,
  },
  pageMainView: {
    padding: 5,
    margin: 5,
    backgroundColor: "#FFFFFF",
    width: "100%",
    height: "98%",
  },
  contentContainer: {
    width: "95%",
  },
  text: {
    fontSize: 12,
    fontFamily: "Times",
    textAlign: "justify",
    lineHeight: 1.5,
  },
  checkContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  checkImage: {
    width: 10,
    height: 10,
    position: "absolute",
    top: -6,
  },
  subjectText: {
    fontSize: 12,
    fontFamily: "Times",
    textAlign: "center",
  },
  strikethrough: {
    textDecoration: "line-through",
  },
  referenceText: {
    fontSize: 12,
    fontFamily: "Times",
    textAlign: "left",
    marginLeft: 50,
  },
  paragraph: {
    fontSize: 12,
    fontFamily: "Times",
    textAlign: "justify",
    lineHeight: 1.5,
    textIndent: 30,
    marginTop: 5,
  },
  signature: {
    fontSize: 12,
    fontFamily: "Times",
    textAlign: "right",
    marginRight: 50,
    marginTop: 20,
  },
  date: {
    fontSize: 12,
    fontFamily: "Times",
    textAlign: "left",
    marginTop: 30,
  },
  signatureLine: {
    fontSize: 12,
    fontFamily: "Times",
    textAlign: "right",
    marginRight: 30,
    marginTop: 10,
  },
  designation: {
    fontSize: 12,
    fontFamily: "Times",
    textAlign: "right",
    marginRight: 50,
    marginTop: 5,
  },
  schoolName: {
    fontSize: 12,
    fontFamily: "Times",
    textAlign: "right",
    marginRight: 30,
  },
  circle: {
    fontSize: 12,
    fontFamily: "Times",
    textAlign: "right",
    marginRight: 50,
    marginTop: 5,
  },
});

Font.register({
  family: "Times",
  src: "https://raw.githubusercontent.com/amtawestwbtpta/awwbtptadata/main/times.ttf",
});
