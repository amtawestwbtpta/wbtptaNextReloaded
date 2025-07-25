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
import Check from "../images/check.png";
const width = 2480;
const height = 3508;
export default function ServiceConfirmation({ data, year }) {
  const currentYear = new Date().getFullYear();
  const teacherYear = currentYear - year;
  return (
    // <PDFViewer style={{ height, width }}>
      <Document
        style={{ margin: 5, padding: 5 }}
        title={`Service Confirmation Form`}
      >
        {data.map((teacher, index) => {
          return (
            <Page
              size="A4"
              orientation="portrait"
              style={styles.page}
              key={index}
            >
              <View style={styles.pageMainView}>
                <View style={{ width: "95%", margin:2,padding:2 }}>
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
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      marginVertical: 10,
                    }}
                  >
                    <View>
                      <Image
                        src={Check.src}
                        style={{
                          width: 10,
                          height: 10,
                          position: "absolute",
                          marginLeft: teacherYear === 20 ? 50 : 28,
                          marginTop: -7,
                        }}
                      />
                    </View>
                    {teacherYear === 20 ? (
                      <Text style={[styles.text, { textAlign: "center" }]}>
                        Sub: Application for taking
                        <Text
                          style={[
                            styles.text,
                            {
                              textDecoration: "line-through",
                            },
                          ]}
                        >
                          10 /
                        </Text>{" "}
                        20 years benefit
                      </Text>
                    ) : (
                      <Text style={[styles.text, { textAlign: "center" }]}>
                        Sub: Application for taking 10{" "}
                        <Text
                          style={[
                            styles.text,
                            {
                              textDecoration: "line-through",
                            },
                          ]}
                        >
                          / 20
                        </Text>{" "}
                        years benefit
                      </Text>
                    )}
                    <Text
                      style={[
                        styles.text,
                        { textAlign: "left", marginLeft: 50 },
                      ]}
                    >
                      As per G.O. No. 437-SE(P&B)/SL/SS-408/19; Dt.- 13/12/2019
                    </Text>
                  </View>
                  <Text style={styles.text}>Sir,</Text>
                  <Text style={[styles.text, { textIndent: 30 }]}>
                    I {teacher?.tname},
                    {teacher?.desig === "AT" ? " A.T." : " H.T."} of{" "}
                    {teacher?.school} under Amta West Circle, joined my first
                    school named
                    {` ................................................................................... `}
                    under
                    {
                      " .............................................................. "
                    }
                    on {teacher?.doj} as per DPSC Howrah&#8217;s Memo no.
                    {" ................................................. "}
                    {" Dt. "}
                    {"  .................................. "}. I had completed
                    my{" "}
                    {teacherYear === 20 ? (
                      <Text style={[styles.text]}>
                        <Text
                          style={[
                            styles.text,
                            {
                              textDecoration: "line-through",
                            },
                          ]}
                        >
                          10 /{" "}
                        </Text>
                        20
                      </Text>
                    ) : (
                      <Text style={[styles.text]}>
                        {" "}
                        10{" "}
                        <Text
                          style={[
                            styles.text,
                            {
                              textDecoration: "line-through",
                            },
                          ]}
                        >
                          / 20
                        </Text>
                      </Text>
                    )}{" "}
                    years of continuous satisfactory service on{" "}
                    {parseInt(teacher?.doj?.slice(0, 2)) - 1 <= 9
                      ? "0" + (parseInt(teacher?.doj?.slice(0, 2)) - 1)
                      : parseInt(teacher?.doj?.slice(0, 2)) - 1}
                    -{teacher?.doj?.slice(3, 5)}-
                    {parseInt(teacher?.doj?.slice(6, 10)) + teacherYear}. I want
                    to take my{" "}
                    {teacherYear === 20 ? (
                      <Text style={[styles.text]}>
                        <Text
                          style={[
                            styles.text,
                            {
                              textDecoration: "line-through",
                            },
                          ]}
                        >
                          10{" "}
                        </Text>
                        / 20
                      </Text>
                    ) : (
                      <Text style={[styles.text]}>
                        {" "}
                        10{" "}
                        <Text
                          style={[
                            styles.text,
                            {
                              textDecoration: "line-through",
                            },
                          ]}
                        >
                          / 20
                        </Text>
                      </Text>
                    )}{" "}
                    years benefit (one additional increment in the same level)
                    on{" "}
                    {parseInt(teacher?.doj?.slice(3, 5)) >= 7 ? (
                      <Text style={[styles.text, { textAlign: "left" }]}>
                        {teacher?.doj?.slice(0, 2)}-{teacher?.doj?.slice(3, 5)}-
                        {parseInt(teacher?.doj?.slice(6, 10)) + teacherYear}
                      </Text>
                    ) : (
                      <Text style={[styles.text, { textAlign: "left" }]}>
                        01-07-{currentYear}
                      </Text>
                    )}{" "}
                    as per G.O. No. 437- SE(P&B)/SL/SS-408/19; Dt.- 13/12/2019.
                  </Text>
                  <Text
                    style={[styles.text, { textAlign: "left", textIndent: 30 }]}
                  >
                    So, sir please take necessary action for the purpose.
                  </Text>
                  <Text
                    style={[
                      styles.text,
                      { textAlign: "right", marginRight: 50 },
                    ]}
                  >
                    Yours faithfully,
                  </Text>
                  <Text style={[styles.text, { textAlign: "left" }]}>
                    Date:
                  </Text>
                  <Text
                    style={[
                      styles.text,
                      { textAlign: "right", marginRight: 30 },
                    ]}
                  >
                    ..............................................
                  </Text>
                  <Text
                    style={[
                      styles.text,
                      { textAlign: "right", marginRight: 50 },
                    ]}
                  >
                    {teacher?.desig === "AT"
                      ? "Assistant Teacher"
                      : "Head Teacher"}
                    ,
                  </Text>
                  <Text
                    style={[
                      styles.text,
                      {
                        textAlign: "right",
                        marginRight: 30,
                        fontSize: teacher?.school?.length > 25 ? 12 : 16,
                      },
                    ]}
                  >
                    {teacher?.school}
                  </Text>
                  <Text
                    style={[
                      styles.text,
                      { textAlign: "right", marginRight: 50 },
                    ]}
                  >
                    Amta West Circle
                  </Text>
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
    alignSelf: "center",
    width: width,
    height: height,
  },
  pageMainView: {
    padding: 10,
    margin: 10,
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
    fontSize: 14,
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
  family: "Comic",
  src: "https://raw.githubusercontent.com/amtawestwbtpta/awwbtptadata/main/comicbd.ttf",
});
