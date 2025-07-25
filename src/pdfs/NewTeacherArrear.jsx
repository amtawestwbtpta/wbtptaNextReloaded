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

export default function NewTeacherArrear({ data }) {
  return (
    //<PDFViewer style={{ height: height / 3, width: width / 3 }}>
    <Document
      style={{ margin: 5, padding: 5 }}
      title={`New Teacher Arrear Form`}
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
              <Text style={styles.text}>To,</Text>
              <Text style={styles.text}>The Chairman,</Text>
              <Text style={styles.text}>District Primary School Council,</Text>
              <Text style={styles.text}>Howrah.</Text>
              <View style={{ alignSelf: "center", marginVertical: 5 }}>
                <Text style={styles.text}>
                  Through: The Sub-Inspector of Schools, Amta West Circle.
                </Text>
              </View>
              <View style={{ alignSelf: "center", marginVertical: 5 }}>
                <Text
                  style={[
                    styles.title,
                    {
                      textDecoration: "underline",
                      textDecorationStyle: "wavy",
                    },
                  ]}
                >
                  Sub: Prayer for Arrear Payment w.e.f.{" "}
                  {"                          "} to
                  {"                          "}.
                </Text>
              </View>
              <View style={{ marginLeft: 20, marginTop: 10 }}>
                <Text style={styles.text}>Respected Sir,</Text>
              </View>
              <View tyle={{ marginTop: 5 }}>
                <Text style={[styles.text, { textIndent: 50 }]}>
                  With due respect I,{" "}
                  <Text
                    style={[
                      styles.text,
                      {
                        textDecoration: "underline",
                        textDecorationStyle: "dotted",
                        marginHorizontal: 5,
                      },
                    ]}
                  >
                    {teacher?.tname}
                  </Text>
                  , A.T. of{" "}
                  <Text
                    style={[
                      styles.text,
                      {
                        textDecoration: "underline",
                        textDecorationStyle: "dotted",
                        marginHorizontal: 5,
                      },
                    ]}
                  >
                    {teacher?.school}
                  </Text>
                  , under Amta West Circle, beg to state that, I have joined to
                  this service on{" "}
                  <Text
                    style={[
                      styles.text,
                      {
                        textDecoration: "underline",
                        textDecorationStyle: "dotted",
                        marginHorizontal: 5,
                      },
                    ]}
                  >
                    {teacher?.doj}
                  </Text>{" "}
                  at ...................... vide DPSC, Howrah’s Memo
                  No................................. Dated
                  ............................
                </Text>
                <Text style={[styles.text, { textIndent: 50 }]}>
                  I am receiving my regular salary since
                  ..................................... But I have pending
                  arrear from{" "}
                  <Text
                    style={[
                      styles.text,
                      {
                        textDecoration: "underline",
                        textDecorationStyle: "dotted",
                        marginHorizontal: 5,
                      },
                    ]}
                  >
                    {"                          "}
                  </Text>{" "}
                  to .................................
                </Text>
                <Text style={[styles.text, { textIndent: 50 }]}>
                  So, Sir if you kindly think of my prayer and take necessary
                  action to get my pending arrear soon, I will be very grateful
                  to you.
                </Text>
                <Text style={[styles.text, { textIndent: 50 }]}>
                  Thanking you,
                </Text>
                <Text style={[styles.text, { alignSelf: "flex-end" }]}>
                  yours faithfully
                </Text>
              </View>
              <View style={{ marginVertical: 20 }}>
                <Text style={styles.text}>
                  Date: .................................
                </Text>
              </View>
              <View style={{ marginVertical: 20 }}>
                <Text style={styles.text}>
                  Memo No.: ................................. Date:
                  .................................
                </Text>
                <Text style={[styles.text, { marginTop: 10 }]}>
                  Copy forwarded to the Chairman, DPSC, Howrah for kind
                  information and taking necessary action.
                </Text>
              </View>
            </View>
          </Page>
        );
      })}
    </Document>
    //</PDFViewer>
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
    width: "98%",
    height: "98%",
  },
  title: {
    fontSize: 16,
    fontFamily: "TimesBold",
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
    fontFamily: "Times",
    textAlign: "left",
    lineHeight: 1.5,
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
  family: "TimesBold",
  src: "https://raw.githubusercontent.com/amtawestwbtpta/awwbtptadata/main/timesBold.ttf",
});
