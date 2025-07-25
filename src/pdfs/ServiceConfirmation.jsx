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
import ropa from "../modules/ropa";
const width = 2480;
const height = 3508;

export default function ServiceConfirmation({ data }) {
  return (
      <Document
        style={{ margin: 5, padding: 5 }}
        title={`Service Confirmation Form`}
      >
        {data.map((teacher, index) => {
          const level = ropa(teacher?.basic).lv;
          return (
            <Page
              size="A4"
              orientation="portrait"
              style={styles.page}
              key={index}
            >
              <View style={styles.pageMainView}>
                <Text style={styles.title}>OFFICE OF THE</Text>
                <Text style={styles.title2}>
                  DISTRICT PRIMARY SCHOOL COUNCIL, HOWRAH
                </Text>
                <Text style={[styles.title, { textDecoration: "underline" }]}>
                  TEACHER’S SERVICE CONFIRMATION ORDER
                </Text>
                <View style={[styles.rowFlexView, { marginVertical: 10 }]}>
                  <Text style={styles.title}>Memo No……………………….</Text>
                  <Text style={styles.title}>Date……………………….</Text>
                </View>
                <Text style={styles.text}>
                  The undernoted teacher is continuing the service more than 2
                  (Two) Years from the date of his / her service as noted below.
                  On being satisfied on the reports of the Head Teacher / TIC of
                  the respective school and as recommended by the concerned Sub-
                  Inspector of Schools and in exercise of the power conferred
                  upon the undersigned under the West Bengal Primary School
                  Teachers’ Recruitment Rules 2001 & as amended time to time, do
                  hereby declare that the service of the undernoted teacher is
                  confirmed from the date following the date of completion of
                  two years of service as detailed below: -
                </Text>
                <View style={{ marginVertical: 10 }}>
                  <View style={styles.secondTableStartView}>
                    <View style={styles.rowStartBorderView}>
                      <View style={[styles.view25, { width: "30%" }]}>
                        <Text style={styles.text2}>Name of the Incumbent</Text>
                        <Text style={styles.text2}>(1)</Text>
                      </View>
                      <View style={[styles.view25, { width: "20%" }]}>
                        <Text style={styles.text2}>Designation</Text>
                        <Text style={styles.text2}>(2)</Text>
                      </View>
                      <View style={[styles.view25, { width: "20%" }]}>
                        <Text style={styles.text2}>Scale of Pay</Text>
                        <Text style={styles.text2}>(3)</Text>
                      </View>
                      <View
                        style={[
                          styles.view25,
                          { borderRightWidth: 0, width: "30%" },
                        ]}
                      >
                        <Text style={styles.text2}>
                          Date of Joining in Service
                        </Text>
                        <Text style={styles.text2}>(4)</Text>
                      </View>
                    </View>
                    <View
                      style={[
                        styles.rowStartBorderView,
                        { borderBottomWidth: 0 },
                      ]}
                    >
                      <View
                        style={[styles.view25, { width: "30%", height: 40 }]}
                      >
                        <Text style={styles.text2}>{teacher?.tname}</Text>
                      </View>
                      <View
                        style={[styles.view25, { width: "20%", height: 40 }]}
                      >
                        <Text style={styles.text2}>
                          {teacher?.desig === "HT"
                            ? "HEAD TEACHER"
                            : "ASSISTANT TEACHER"}
                        </Text>
                      </View>
                      <View
                        style={[styles.view25, { width: "20%", height: 40 }]}
                      >
                        <Text
                          style={styles.text2}
                        >{`${level}\nAS PER\nROPA’ 2019`}</Text>
                      </View>
                      <View
                        style={[
                          styles.view25,
                          { borderRightWidth: 0, width: "30%", height: 40 },
                        ]}
                      >
                        <Text style={styles.text2}>
                          {teacher?.doj?.split("-")?.join(".")}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={{ marginVertical: 10 }}>
                  <View style={styles.secondTableStartView}>
                    <View style={styles.rowStartBorderView}>
                      <View style={[styles.view25, { width: "40%" }]}>
                        <Text style={styles.text2}>
                          Name of the School now attached
                        </Text>
                        <Text style={styles.text2}>(5)</Text>
                      </View>

                      <View style={[styles.view25, { width: "25%" }]}>
                        <Text style={styles.text2}>Name of the Circle</Text>
                        <Text style={styles.text2}>(6)</Text>
                      </View>
                      <View
                        style={[
                          styles.view25,
                          { borderRightWidth: 0, width: "35%" },
                        ]}
                      >
                        <Text style={styles.text2}>
                          {`Date of declaration of Service\nConfirmation`}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={[
                        styles.rowStartBorderView,
                        { borderBottomWidth: 0 },
                      ]}
                    >
                      <View
                        style={[styles.view25, { width: "40%", height: 40 }]}
                      >
                        <Text style={styles.text2}>{teacher?.school}</Text>
                      </View>

                      <View
                        style={[styles.view25, { width: "25%", height: 40 }]}
                      >
                        <Text style={styles.text2}>AMTA WEST</Text>
                      </View>
                      <View
                        style={[
                          styles.view25,
                          { borderRightWidth: 0, width: "35%", height: 40 },
                        ]}
                      >
                        <Text style={styles.text2}>
                          {teacher?.doj?.slice(0, 2)}.
                          {teacher?.doj?.slice(3, 5)}.
                          {parseInt(teacher?.doj?.slice(6, 10)) + 2}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={{ marginTop: 80 }}>
                  <View style={styles.rowFlexView}>
                    <View
                      style={{ justifyContent: "center", alignItems: "center" }}
                    >
                      <Text style={styles.text2}>Recommended by the</Text>
                      <Text style={styles.text2}>HT/TIC</Text>
                    </View>
                    <View
                      style={{ justifyContent: "center", alignItems: "center" }}
                    >
                      <Text style={styles.text2}>
                        Comments and Recommendation of the
                      </Text>
                      <Text style={styles.text2}>
                        Sub- Inspector of Schools
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={{ marginTop: 20 }}>
                  <View style={styles.rowFlexView}>
                    <View
                      style={{ justifyContent: "center", alignItems: "center" }}
                    >
                      <Text style={styles.text2}>
                        Approved, The Service Confirmation be noted in
                      </Text>
                      <Text style={styles.text2}>
                        Service Book of the teacher
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={{ marginTop: 80 }}>
                  <View style={styles.rowFlexView}>
                    <View
                      style={{ justifyContent: "center", alignItems: "center" }}
                    >
                      <Text style={styles.text2}>
                        ----------------------------------
                      </Text>
                      <Text style={styles.text2}>Dealing Assistant</Text>
                      <Text style={styles.text2}>DPSC, Howrah</Text>
                    </View>
                    <View
                      style={{ justifyContent: "center", alignItems: "center" }}
                    >
                      <Text style={styles.text2}>
                        ----------------------------------
                      </Text>
                      <Text style={styles.text2}>Secretary</Text>
                      <Text style={styles.text2}>DPSC, Howrah</Text>
                    </View>
                    <View
                      style={{ justifyContent: "center", alignItems: "center" }}
                    >
                      <Text style={styles.text2}>
                        ----------------------------------
                      </Text>
                      <Text style={styles.text2}>Chairman</Text>
                      <Text style={styles.text2}>DPSC, Howrah</Text>
                    </View>
                  </View>
                </View>
              </View>
            </Page>
          );
        })}
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
    padding: 10,
    margin: 5,
    backgroundColor: "#FFFFFF",
    alignSelf: "center",
    width: "100%",
    height: "98%",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Arial",
    textAlign: "center",
  },
  title2: {
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Comic",
    textAlign: "center",
    marginVertical: 10,
  },
  titleMain: {
    fontSize: 20,
    fontWeight: "normal",
    fontFamily: "Arial",
    textAlign: "center",
  },
  text: {
    fontSize: 16,
    fontFamily: "Arial",
    textAlign: "left",
  },
  text2: {
    fontSize: 14,
    fontFamily: "Arial",
    textAlign: "center",
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
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
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
  family: "Times",
  src: "https://raw.githubusercontent.com/amtawestwbtpta/awwbtptadata/main/times.ttf",
});
Font.register({
  family: "Arial",
  src: "https://raw.githubusercontent.com/amtawestwbtpta/awwbtptadata/main/arial.ttf",
});
Font.register({
  family: "Comic",
  src: "https://raw.githubusercontent.com/amtawestwbtpta/awwbtptadata/main/comicbd.ttf",
});
