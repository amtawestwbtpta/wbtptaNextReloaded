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
import Check from "../images/check.png";
import { RoundTo } from "../modules/calculatefunctions";
const width = 2480;
const height = 3508;
export default function BenefitProforma({ data, year }) {
  const currentYear = new Date().getFullYear();
  const teacherYear = currentYear - year;
  return (
      <Document
        style={{ margin: 5, padding: 5 }}
        title={`Benefit Proforma of Teachers`}
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
                <Text style={[styles.title, { textDecoration: "underline" }]}>
                  DISTRICT PRIMARY SCHOOL COUNCIL, HOWRAH
                </Text>
                <View>
                  <Image
                    src={Check.src}
                    style={{
                      width: 10,
                      height: 10,
                      position: "absolute",
                      marginLeft: teacherYear === 20 ? 376 : 350,
                    }}
                  />
                </View>

                <Text
                  style={[
                    styles.title2,
                    {
                      textDecoration: "underline",
                      textDecorationStyle: "dotted",
                    },
                  ]}
                >
                  PROFORMA FOR OPTION & FIXATION OF PAY FOR CAS FOR 10 / 20
                  YEARS UNDER ROPA ‘19
                </Text>
                <Text
                  style={[
                    styles.title,
                    {
                      position: "absolute",
                      marginTop: 21,
                      marginLeft: teacherYear === 20 ? 348 : 371,
                    },
                  ]}
                >
                  .....
                </Text>

                <Text style={styles.text}>
                  In terms of Memorandum, Vide No.-437-SE(P&B) SL/SS-408/19 Dt.
                  13.12.2019 of the School Education Department (Planning &
                  Budget Branch), Govt. of W.B.
                </Text>
                <View style={{ marginVertical: 10 }}>
                  <Text style={styles.titleMain}>
                    PART- A :: OPTION (to be filled in by incumbent)
                  </Text>
                </View>
                {teacherYear === 20 ? (
                  <Text
                    style={[styles.text, { textAlign: "left", textIndent: 30 }]}
                  >
                    I{" "}
                    <Text
                      style={[
                        styles.text,
                        {
                          textDecoration: "underline",
                          textDecorationStyle: "dotted",
                        },
                      ]}
                    >
                      {teacher?.tname}
                    </Text>{" "}
                    do hereby opt to avail the benefit of Career Advancement
                    Scheme for Completion of{" "}
                    <Text
                      style={[
                        styles.text,
                        {
                          textDecoration: "line-through",
                        },
                      ]}
                    >
                      10 years OR
                    </Text>{" "}
                    20 years of continuous service under ROPA'2019 with effect
                    from{" "}
                    <Text
                      style={[
                        styles.text,
                        {
                          textDecoration: "underline",
                          textDecorationStyle: "dotted",
                        },
                      ]}
                    >
                      01/07/{currentYear}{" "}
                    </Text>{" "}
                    i.e., w.e.f. the date of my entitlement* or with effect from
                    1st Day of July {currentYear} i.e., w.e.f the date of next
                    increment*
                  </Text>
                ) : (
                  <Text
                    style={[styles.text, { textAlign: "left", textIndent: 30 }]}
                  >
                    I{" "}
                    <Text
                      style={[
                        styles.text,
                        {
                          textDecoration: "underline",
                          textDecorationStyle: "dotted",
                        },
                      ]}
                    >
                      {teacher?.tname}
                    </Text>{" "}
                    do hereby opt to avail the benefit of Career Advancement
                    Scheme for Completion of 10 years{" "}
                    <Text
                      style={[
                        styles.text,
                        {
                          textDecoration: "line-through",
                        },
                      ]}
                    >
                      OR 20 years
                    </Text>{" "}
                    of continuous service under ROPA'2019 with effect from{" "}
                    <Text
                      style={[
                        styles.text,
                        {
                          textDecoration: "underline",
                          textDecorationStyle: "dotted",
                        },
                      ]}
                    >
                      01/07/{currentYear}{" "}
                    </Text>
                    i.e., w.e.f. the date of my entitlement* or with effect from
                    1st Day of July {currentYear} i.e., w.e.f the date of next
                    increment*
                  </Text>
                )}
                <View style={{ marginVertical: 10 }}>
                  <Text style={[styles.text, { textAlign: "left" }]}>
                    <Text
                      style={[
                        styles.text,
                        { textDecoration: "underline", fontWeight: "heavy" },
                      ]}
                    >
                      Declaration:
                    </Text>{" "}
                    I hereby undertake to refund to the Government any amount
                    which may be drawn by me in excess of what is admissible to
                    me on account of erroneous fixation of pay in the revised
                    pay structure as soon as the fact of such excess drawl comes
                    / brought to my notice.
                  </Text>
                </View>
                <View
                  style={{
                    justifyContent: "flex-start",
                    flexDirection: "row",
                    alignItems: "flex-start",
                    marginBottom: 5,
                  }}
                >
                  <Text style={[styles.text, { textAlign: "left" }]}>
                    Date: {teacher?.doj?.slice(0, 2)}.
                    {teacher?.doj?.slice(3, 5)}.
                    {parseInt(teacher?.doj?.slice(6, 10)) + teacherYear}
                    {"\n"}
                    Place: JOYPUR
                  </Text>
                  <Text
                    style={[
                      styles.text,
                      {
                        textAlign: "left",
                        marginLeft: teacher?.school?.length > 30 ? 100 : 130,
                      },
                    ]}
                  >
                    Signature of the Teacher:{"\n"}
                    Name with designation: {teacher?.tname} (
                    {teacher?.desig === "AT" ? "A.T." : "H.T."}){"\n"}
                    Name of the School:{" "}
                    <Text
                      style={[
                        styles.text,
                        { fontSize: teacher?.school?.length > 30 ? 10 : 12 },
                      ]}
                    >
                      {teacher?.school}
                    </Text>
                    {"\n"}
                    Name of the Circle: AMTA WEST
                  </Text>
                </View>
                <View
                  style={{
                    marginBottom: 5,
                    height: 3,
                    backgroundColor: "black",
                  }}
                ></View>
                <View style={{ marginBottom: 5 }}>
                  <Text style={styles.titleMain}>
                    PART- B :: FIXATION (to be filled in by Circle end)
                  </Text>
                </View>
                <View
                  style={{
                    justifyContent: "center",
                    flexDirection: "row",
                    alignItems: "flex-start",
                    width: "100%",
                  }}
                >
                  <View style={{ width: "5%" }}>
                    <Text style={[styles.text, { textAlign: "left" }]}>1.</Text>
                  </View>
                  <View style={{ width: "45%" }}>
                    <Text style={[styles.text, { textAlign: "left" }]}>
                      Name of the Teacher
                    </Text>
                  </View>
                  <View style={{ width: "50%" }}>
                    <Text style={[styles.text, { textAlign: "left" }]}>
                      : {teacher?.tname}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    justifyContent: "center",
                    flexDirection: "row",
                    alignItems: "flex-start",
                    width: "100%",
                  }}
                >
                  <View style={{ width: "5%" }}>
                    <Text style={[styles.text, { textAlign: "left" }]}>3.</Text>
                  </View>
                  <View style={{ width: "45%" }}>
                    <Text style={[styles.text, { textAlign: "left" }]}>
                      Name of the Circle
                    </Text>
                  </View>
                  <View style={{ width: "50%" }}>
                    <Text style={[styles.text, { textAlign: "left" }]}>
                      : AMTA WEST
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    justifyContent: "center",
                    flexDirection: "row",
                    alignItems: "flex-start",
                    width: "100%",
                  }}
                >
                  <View style={{ width: "5%" }}>
                    <Text style={[styles.text, { textAlign: "left" }]}>4.</Text>
                  </View>
                  <View style={{ width: "45%" }}>
                    <Text style={[styles.text, { textAlign: "left" }]}>
                      Designation
                    </Text>
                  </View>
                  <View style={{ width: "50%" }}>
                    <Text style={[styles.text, { textAlign: "left" }]}>
                      :{" "}
                      {teacher?.desig === "AT"
                        ? "Assistant Teacher"
                        : "Head Teacher"}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    justifyContent: "center",
                    flexDirection: "row",
                    alignItems: "flex-start",
                    width: "100%",
                  }}
                >
                  <View style={{ width: "5%" }}>
                    <Text style={[styles.text, { textAlign: "left" }]}>5.</Text>
                  </View>
                  <View style={{ width: "45%" }}>
                    <Text style={[styles.text, { textAlign: "left" }]}>
                      Date of Joining into Service
                    </Text>
                  </View>
                  <View style={{ width: "50%" }}>
                    <Text style={[styles.text, { textAlign: "left" }]}>
                      : {teacher?.doj}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    justifyContent: "center",
                    flexDirection: "row",
                    alignItems: "flex-start",
                    width: "100%",
                  }}
                >
                  <View style={{ width: "5%" }}>
                    <Text style={[styles.text, { textAlign: "left" }]}>6.</Text>
                  </View>
                  <View style={{ width: "45%" }}>
                    {teacherYear === 20 ? (
                      <Text style={[styles.text, { textAlign: "left" }]}>
                        Date of Completion of{" "}
                        <Text
                          style={[
                            styles.text,
                            { textDecoration: "line-through" },
                          ]}
                        >
                          10/
                        </Text>{" "}
                        20 Years
                      </Text>
                    ) : (
                      <Text style={[styles.text, { textAlign: "left" }]}>
                        Date of Completion of 10{" "}
                        <Text
                          style={[
                            styles.text,
                            { textDecoration: "line-through" },
                          ]}
                        >
                          /20
                        </Text>{" "}
                        Years
                      </Text>
                    )}
                    <Text style={[styles.text, { textAlign: "left" }]}>
                      (After taking LWP if any, into account)
                    </Text>
                    <Image
                      src={Check.src}
                      style={{
                        width: 10,
                        height: 10,
                        position: "absolute",
                        marginLeft: teacherYear === 20 ? 145 : 125,
                        marginTop: -5,
                      }}
                    />
                  </View>
                  <View style={{ width: "50%" }}>
                    <Text style={[styles.text, { textAlign: "left" }]}>
                      :{" "}
                      {parseInt(teacher?.doj?.slice(0, 2)) - 1 <= 9
                        ? "0" + (parseInt(teacher?.doj?.slice(0, 2)) - 1)
                        : parseInt(teacher?.doj?.slice(0, 2)) - 1}
                      -{teacher?.doj?.slice(3, 5)}-
                      {parseInt(teacher?.doj?.slice(6, 10)) + teacherYear}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    justifyContent: "center",
                    flexDirection: "row",
                    alignItems: "flex-start",
                    width: "100%",
                  }}
                >
                  <View style={{ width: "5%" }}>
                    <Text style={[styles.text, { textAlign: "left" }]}>7.</Text>
                  </View>
                  <View style={{ width: "45%" }}>
                    <Text style={[styles.text, { textAlign: "left" }]}>
                      Date of OPTION for availing this benefit
                    </Text>
                  </View>
                  <View style={{ width: "50%" }}>
                    <Text style={[styles.text, { textAlign: "left" }]}>
                      : {teacher?.doj?.slice(0, 2)}-{teacher?.doj?.slice(3, 5)}-
                      {parseInt(teacher?.doj?.slice(6, 10)) + teacherYear}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    justifyContent: "center",
                    flexDirection: "row",
                    alignItems: "flex-start",
                    width: "100%",
                  }}
                >
                  <View style={{ width: "5%" }}>
                    <Text style={[styles.text, { textAlign: "left" }]}>8.</Text>
                  </View>
                  <View style={{ width: "45%" }}>
                    <Text style={[styles.text, { textAlign: "left" }]}>
                      Existing Basic Pay (With Level)
                    </Text>
                  </View>
                  <View style={{ width: "50%" }}>
                    {parseInt(teacher?.doj?.slice(3, 5)) >= 7 ? (
                      <Text style={[styles.text, { textAlign: "left" }]}>
                        : Rs. {teacher?.basic} ({ropa(teacher?.basic).lv},{" "}
                        {ropa(teacher?.basic).ce}) (01-07-{currentYear})
                      </Text>
                    ) : (
                      <Text style={[styles.text, { textAlign: "left" }]}>
                        : Rs. {teacher?.mbasic} ({ropa(teacher?.mbasic).lv},{" "}
                        {ropa(teacher?.mbasic).ce}) (01-07-{currentYear - 1})
                      </Text>
                    )}
                  </View>
                </View>
                <View
                  style={{
                    justifyContent: "center",
                    flexDirection: "row",
                    alignItems: "flex-start",
                    width: "100%",
                  }}
                >
                  <View style={{ width: "5%" }}>
                    <Text style={[styles.text, { textAlign: "left" }]}>9.</Text>
                  </View>
                  <View style={{ width: "45%" }}>
                    <Text style={[styles.text, { textAlign: "left" }]}>
                      Next higher of the amount at serial no. 8
                    </Text>
                    <Text style={[styles.text, { textAlign: "left" }]}>
                      above in the same level
                    </Text>
                  </View>
                  <View style={{ width: "50%" }}>
                    {parseInt(teacher?.doj?.slice(3, 5)) >= 7 ? (
                      <Text style={[styles.text, { textAlign: "left" }]}>
                        : Rs.{" "}
                        {RoundTo(teacher?.basic + teacher?.basic * 0.03, 100)} (
                        {ropa(teacher?.basic).lv},{" "}
                        {
                          ropa(
                            RoundTo(teacher?.basic + teacher?.basic * 0.03, 100)
                          ).ce
                        }
                        )
                      </Text>
                    ) : (
                      <Text style={[styles.text, { textAlign: "left" }]}>
                        : Rs. {teacher?.mbasic} ({ropa(teacher?.mbasic).lv},{" "}
                        {ropa(teacher?.mbasic).ce})
                      </Text>
                    )}
                  </View>
                </View>
                <View
                  style={{
                    justifyContent: "center",
                    flexDirection: "row",
                    alignItems: "flex-start",
                    width: "100%",
                  }}
                >
                  <View style={{ width: "5%" }}>
                    <Text style={[styles.text, { textAlign: "left" }]}>
                      10.
                    </Text>
                  </View>
                  <View style={{ width: "45%" }}>
                    <Text style={[styles.text, { textAlign: "left" }]}>
                      Basic Pay fixed at (as per serial no. 9)
                    </Text>
                  </View>
                  <View style={{ width: "50%" }}>
                    <Text style={[styles.text, { textAlign: "left" }]}>
                      {parseInt(teacher?.doj?.slice(3, 5)) >= 7 ? (
                        <Text style={[styles.text, { textAlign: "left" }]}>
                          : Rs.{" "}
                          {RoundTo(teacher?.basic + teacher?.basic * 0.03, 100)}{" "}
                          ({ropa(teacher?.basic).lv},{" "}
                          {
                            ropa(
                              RoundTo(
                                teacher?.basic + teacher?.basic * 0.03,
                                100
                              )
                            ).ce
                          }
                          )
                        </Text>
                      ) : (
                        <Text style={[styles.text, { textAlign: "left" }]}>
                          : Rs. {teacher?.mbasic} ({ropa(teacher?.mbasic).lv},{" "}
                          {ropa(teacher?.mbasic).ce})
                        </Text>
                      )}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    justifyContent: "center",
                    flexDirection: "row",
                    alignItems: "flex-start",
                    width: "100%",
                  }}
                >
                  <View style={{ width: "5%" }}>
                    <Text style={[styles.text, { textAlign: "left" }]}>
                      11.
                    </Text>
                  </View>
                  <View style={{ width: "45%" }}>
                    <Text style={[styles.text, { textAlign: "left" }]}>
                      Date of Effect
                    </Text>
                  </View>
                  <View style={{ width: "50%" }}>
                    {parseInt(teacher?.doj?.slice(3, 5)) >= 7 ? (
                      <Text style={[styles.text, { textAlign: "left" }]}>
                        : {teacher?.doj?.slice(0, 2)}-
                        {teacher?.doj?.slice(3, 5)}-
                        {parseInt(teacher?.doj?.slice(6, 10)) + teacherYear}
                      </Text>
                    ) : (
                      <Text style={[styles.text, { textAlign: "left" }]}>
                        : 01-07-{currentYear}
                      </Text>
                    )}
                  </View>
                </View>
                <View
                  style={{
                    justifyContent: "center",
                    flexDirection: "row",
                    alignItems: "flex-start",
                    width: "100%",
                  }}
                >
                  <View style={{ width: "5%" }}>
                    <Text style={[styles.text, { textAlign: "left" }]}>
                      12.
                    </Text>
                  </View>
                  <View style={{ width: "45%" }}>
                    <Text style={[styles.text, { textAlign: "left" }]}>
                      Date of Next Increment
                    </Text>
                  </View>
                  <View style={{ width: "50%" }}>
                    {parseInt(teacher?.doj?.slice(3, 5)) >= 7 ? (
                      <Text style={[styles.text, { textAlign: "left" }]}>
                        : 01-07-{currentYear + 1}
                      </Text>
                    ) : (
                      <Text style={[styles.text, { textAlign: "left" }]}>
                        : 01-07-{currentYear}
                      </Text>
                    )}
                  </View>
                </View>
                <Text style={[styles.text, { textAlign: "left" }]}>
                  Checked and verified with service Book and other relevant
                  records and found in order & forwarded to the DPSC, Howrah for
                  its approval.
                </Text>
                <View
                  style={{
                    justifyContent: "flex-end",
                    alignItems: "center",
                    marginVertical: 10,
                    marginLeft: 350,
                  }}
                >
                  <Text style={[styles.text, { textAlign: "right" }]}>
                    ............................................
                  </Text>
                  <Text style={[styles.text, { textAlign: "right" }]}>
                    Signature of the SI/S
                  </Text>
                </View>
                <View
                  style={{
                    justifyContent: "flex-start",
                    alignItems: "center",
                    flexDirection: "row",
                    marginLeft: 50,
                  }}
                >
                  <Text style={[styles.text, { textAlign: "center" }]}>
                    Memo No-
                  </Text>
                  <Text
                    style={[
                      styles.text,
                      { textAlign: "center", marginLeft: 280 },
                    ]}
                  >
                    Date
                  </Text>
                </View>
                <View>
                  <Text style={[styles.text, { textAlign: "center" }]}>
                    ===================================================================================
                  </Text>
                </View>
                <View
                  style={{
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexDirection: "row",
                    marginTop: 10,
                  }}
                >
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={[styles.text, { textAlign: "center" }]}>
                      DA
                    </Text>
                    <Text style={[styles.text, { textAlign: "center" }]}>
                      DPSC. Howrah
                    </Text>
                  </View>
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={[styles.text, { textAlign: "center" }]}>
                      HC
                    </Text>
                    <Text style={[styles.text, { textAlign: "center" }]}>
                      DPSC. Howrah
                    </Text>
                  </View>
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={[styles.text, { textAlign: "center" }]}>
                      COF
                    </Text>
                    <Text style={[styles.text, { textAlign: "center" }]}>
                      DPSC. Howrah
                    </Text>
                  </View>
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={[styles.text, { textAlign: "center" }]}>
                      Secretary
                    </Text>
                    <Text style={[styles.text, { textAlign: "center" }]}>
                      DPSC. Howrah
                    </Text>
                  </View>
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={[styles.text, { textAlign: "center" }]}>
                      Chairman
                    </Text>
                    <Text style={[styles.text, { textAlign: "center" }]}>
                      DPSC. Howrah
                    </Text>
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
    paddingRight: 15,
    margin: 5,
    backgroundColor: "#FFFFFF",
    alignSelf: "center",
    width: "100%",
    height: "98%",
  },
  title: {
    fontSize: 18,
    fontFamily: "AgencyBold",
    fontWeight: "heavy",
    textAlign: "center",
  },
  title2: {
    fontSize: 16,
    fontFamily: "Agency",
    textAlign: "center",
    marginVertical: 5,
  },
  titleMain: {
    fontSize: 16,
    fontWeight: "heavy",
    fontFamily: "AgencyBold",
    textAlign: "center",
    textDecoration: "underline",
  },
  titleTab: {
    fontSize: 14,
    fontWeight: "heavy",
    fontFamily: "Arial",
    textAlign: "left",
    textDecoration: "underline",
  },
  text: {
    fontSize: 12,
    fontFamily: "Arial",
    textAlign: "center",
    fontWeight: "heavy",
    padding: 2,
    lineHeight: 1.3,
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
  family: "Arial",
  src: "https://raw.githubusercontent.com/amtawestwbtpta/awwbtptadata/main/arial.ttf",
});

Font.register({
  family: "AgencyBold",
  src: "https://raw.githubusercontent.com/amtawestwbtpta/awwbtptadata/main/AgencyBold.ttf",
});
Font.register({
  family: "Agency",
  src: "https://raw.githubusercontent.com/amtawestwbtpta/awwbtptadata/main/AGENCYR.TTF",
});
