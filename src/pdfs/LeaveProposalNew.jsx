"use client";
import React, { useEffect } from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
  Image,
  PDFViewer,
} from "@react-pdf/renderer";
import { calStrLength } from "../modules/calculatefunctions";
const width = 2480;
const height = 3508;

export default function LeaveProposalNew({ data }) {
  const {
    tname,
    school,
    desig,
    doj,
    phone,
    leaveNature,
    leaveReason,
    leaveDays,
    hpayLeave,
    startingDate,
    endingDate,
    childBirthDate,
    village,
    po,
    hoi,
    gender,
    serviceAge,
    earnedLeave,
    balanceLeave,
    lineOne,
    lineTwo,
    lineThree,
    lineFour,
    lineFive,
    lineSix,
  } = data;

  return (
    // <PDFViewer style={{ height: height / 3, width: width / 3 }}>
    <Document
      style={{ margin: 5, padding: 5 }}
      title={`Leave Proposal Form of ${tname} of ${school}`}
    >
      <Page size="A4" orientation="portrait" style={styles.page}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center",
            width: "98%",
          }}
        >
          <View style={styles.pageMainView}>
            <Text style={styles.title}>OFFICE OF THE</Text>
            <View
              style={{
                width: 200,
                height: 30,
                backgroundColor: "black",
                position: "absolute",
                borderRadius: 5,
                right: 4,
                marginTop: 3,
                top: -5,
              }}
            ></View>
            <View
              style={{
                width: 200,
                height: 30,
                borderWidth: 2,
                borderBottomWidth: 0,
                backgroundColor: "white",
                position: "absolute",
                borderRadius: 5,
                right: 6,
                top: -5,
              }}
            >
              <Text style={[styles.textBold, { marginTop: 5 }]}>
                To be submitted in triplicate
              </Text>
            </View>

            <Text style={[styles.title, { marginTop: 10 }]}>
              HOWRAH DISTRICT PRIMARY SCHOOL COUNCIL
            </Text>
            <View
              style={{ height: 2, backgroundColor: "black", width: "100%" }}
            ></View>
            <View
              style={{
                width: 200,
                height: 30,
                borderWidth: 2,
                backgroundColor: "white",
                borderRadius: 5,
                marginTop: 5,
                alignSelf: "center",
              }}
            >
              <Text
                style={[
                  styles.titleMain,
                  { marginTop: 5, textDecoration: "underline" },
                ]}
              >
                LEAVE PROPOSAL
              </Text>
            </View>

            <View
              style={{
                marginTop: 5,
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "baseline",
              }}
            >
              <Text style={styles.text}></Text>

              <View style={{ width: "30%" }}>
                <Text style={styles.text}>1. NAME OF THE TEACHER: </Text>
              </View>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderBottomStyle: "dotted",
                  width: "70%",
                }}
              >
                <Text style={styles.text}>{tname}</Text>
              </View>
            </View>
            <View
              style={{
                marginTop: 2,
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "baseline",
              }}
            >
              <Text style={styles.text}></Text>

              <View style={{ width: "20%" }}>
                <Text style={styles.text}>2. DESIGNATION </Text>
              </View>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderBottomStyle: "dotted",
                  width: "25%",
                }}
              >
                <Text style={styles.text}>
                  {desig === "AT" ? "ASSISTANT TEACHER" : "HEAD TEACHER"}
                </Text>
              </View>
              <View style={{ width: "30%" }}>
                <Text style={styles.text}>DATE OF APPOINTMENT </Text>
              </View>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderBottomStyle: "dotted",
                  width: "25%",
                }}
              >
                <Text style={styles.text}>{doj}</Text>
              </View>
            </View>
            <View
              style={{
                marginTop: 5,
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "baseline",
              }}
            >
              <View style={{ width: "30%" }}>
                <Text style={styles.text}>3. NAME OF THE SCHOOL: </Text>
              </View>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderBottomStyle: "dotted",
                  width: "60%",
                }}
              >
                <Text style={styles.text}>{school}</Text>
              </View>
            </View>
            <View
              style={{
                marginTop: 5,
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "baseline",
              }}
            >
              <View style={{ width: "15%" }}>
                <Text style={styles.text}>4. CIRCLE </Text>
              </View>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderBottomStyle: "dotted",
                  width: "30%",
                }}
              >
                <Text style={styles.text}>AMTA WEST</Text>
              </View>
              <View style={{ width: "30%" }}>
                <Text style={styles.text}>CONTACT NO </Text>
              </View>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderBottomStyle: "dotted",
                  width: "30%",
                }}
              >
                <Text style={styles.text}>{phone}</Text>
              </View>
            </View>
            <View
              style={{
                marginTop: 5,
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "baseline",
              }}
            >
              <View style={{ width: "30%" }}>
                <Text style={styles.text}>5. REASON OF LEAVE: </Text>
              </View>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderBottomStyle: "dotted",
                  width: "60%",
                }}
              >
                <Text style={styles.text}>
                  {leaveNature} LEAVE{" "}
                  {leaveReason !== "" && `, (${leaveReason})`}
                </Text>
              </View>
            </View>
            <View
              style={{
                marginTop: 7,
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "baseline",
              }}
            >
              <View style={{ width: "100%" }}>
                <Text style={styles.text}>
                  6(a). NATURE OF LEAVE PRAYED FOR: HPL/ COMMUTED/ MATERNITY/
                  MEDICAL/ LWP/ CCL/{" "}
                </Text>

                <Image
                  source={{
                    uri: "https://raw.githubusercontent.com/amtawestwbtpta/awwbtptadata/main/check.png",
                  }}
                  style={{
                    height: 10,
                    width: 10,
                    position: "absolute",
                    marginTop: leaveNature === "PATERNITY" ? 15 : -5,
                    marginLeft:
                      leaveNature === "HPL"
                        ? 250
                        : leaveNature === "COMMUTED"
                        ? 300
                        : leaveNature === "MATERNITY"
                        ? 390
                        : leaveNature === "MEDICAL"
                        ? 450
                        : leaveNature === "LWP"
                        ? 500
                        : leaveNature === "CCL"
                        ? 535
                        : leaveNature === "PATERNITY"
                        ? 60
                        : 250,
                  }}
                />
              </View>
            </View>
            <View
              style={{
                marginTop: 5,
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "baseline",
              }}
            >
              <View style={{ width: "15%" }}>
                <Text style={styles.text}>PATERNITY </Text>
              </View>
              <View style={{ width: "10%", marginLeft: -20 }}>
                <Text style={styles.text}>ETC</Text>
              </View>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderBottomStyle: "dotted",
                  width: "60%",
                }}
              >
                <Text style={styles.text}>{leaveNature} LEAVE</Text>
              </View>
            </View>
            <View
              style={{
                marginTop: 5,
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "baseline",
              }}
            >
              <View style={{ width: "50%" }}>
                <Text style={styles.text}>
                  (b). PERIOD OF LEAVE PRAYED FOR FROM
                </Text>
              </View>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderBottomStyle: "dotted",
                  width: "10%",
                }}
              >
                <Text style={styles.text}>{startingDate}</Text>
              </View>
              <View
                style={{
                  width: "5%",
                }}
              >
                <Text style={styles.text}>To</Text>
              </View>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderBottomStyle: "dotted",
                  width: "10%",
                }}
              >
                <Text style={styles.text}>{endingDate}</Text>
              </View>
              <View
                style={{
                  width: "5%",
                }}
              >
                <Text style={styles.text}>=</Text>
              </View>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderBottomStyle: "dotted",
                  width: "10%",
                }}
              >
                <Text style={styles.text}>{leaveDays}</Text>
              </View>
              <View
                style={{
                  width: "10%",
                }}
              >
                <Text style={styles.text}>Days</Text>
              </View>
            </View>
            <View
              style={{
                marginTop: 5,
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "baseline",
              }}
            >
              <View style={{ width: "80%" }}>
                <Text style={[styles.text, { fontSize: 12 }]}>
                  7. DATE OF CHILD’S BIRTH AS PER M.C. (IN CASE OF MATERNITY
                  LEAVE ONLY)
                </Text>
              </View>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderBottomStyle: "dotted",
                  width: "20%",
                }}
              >
                <Text style={[styles.text, { fontSize: 12 }]}>
                  {leaveNature === "MATERNITY" ? childBirthDate : "-"}
                </Text>
              </View>
            </View>
            <View
              style={{
                marginTop: 5,
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "baseline",
              }}
            >
              <View style={{ width: "100%" }}>
                <Text style={styles.text}>
                  8. ENCLOSURES: TREATMENT CERTIFICATE/ MEDICAL CERTIFICATE OF
                  FITNESS/ JOINING REPORT
                </Text>
                {leaveNature === "MATERNITY" || leaveNature === "MEDICAL" ? (
                  <View>
                    <Image
                      source={{
                        uri: "https://raw.githubusercontent.com/amtawestwbtpta/awwbtptadata/main/check.png",
                      }}
                      style={{
                        height: 10,
                        width: 10,
                        position: "absolute",
                        marginTop: -25,
                        marginLeft: 200,
                      }}
                    />
                    <Image
                      source={{
                        uri: "https://raw.githubusercontent.com/amtawestwbtpta/awwbtptadata/main/check.png",
                      }}
                      style={{
                        height: 10,
                        width: 10,
                        position: "absolute",
                        marginTop: -25,
                        marginLeft: 350,
                      }}
                    />
                    <Image
                      source={{
                        uri: "https://raw.githubusercontent.com/amtawestwbtpta/awwbtptadata/main/check.png",
                      }}
                      style={{
                        height: 10,
                        width: 10,
                        position: "absolute",
                        marginTop: -22,
                        marginLeft: 500,
                      }}
                    />
                  </View>
                ) : (
                  <View>
                    <Image
                      source={{
                        uri: "https://raw.githubusercontent.com/amtawestwbtpta/awwbtptadata/main/check.png",
                      }}
                      style={{
                        height: 10,
                        width: 10,
                        position: "absolute",
                        marginTop: -22,
                        marginLeft: 500,
                      }}
                    />
                  </View>
                )}
              </View>
            </View>
            <View
              style={{
                marginTop: 5,
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "baseline",
              }}
            >
              <View style={{ width: "60%" }}>
                <Text style={styles.text}>
                  DUELY CERTIFIED BY THE HEAD TEACHER & S.I.S. OF
                </Text>
              </View>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderBottomStyle: "dotted",
                  width: "20%",
                }}
              >
                <Text style={styles.text}>AMTA WEST</Text>
              </View>
              <View
                style={{
                  width: "20%",
                }}
              >
                <Text style={styles.text}>CIRCLE, HOWRAH</Text>
              </View>
            </View>
            <View
              style={{
                marginTop: 40,
                marginBottom: 10,
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "baseline",
              }}
            >
              <View style={{ width: "60%" }}>
                <Text style={styles.textBold}>
                  RECOMMENDATION AND SIGNATURE OF THE H.T/ T.I.C
                </Text>
              </View>
              <View style={{ width: "40%" }}>
                <Text style={styles.textBold}>SIGNATURE OF TEACHER</Text>
              </View>
            </View>
            <View
              style={{ height: 2, backgroundColor: "black", width: "100%" }}
            ></View>
            <View
              style={{
                width: 220,
                height: 25,
                borderWidth: 2,
                backgroundColor: "white",
                borderRadius: 5,
                marginTop: 3,
                marginBottom: 3,
                alignSelf: "center",
              }}
            >
              <Text style={[styles.titleMain, { textDecoration: "underline" }]}>
                TO BE FILLED BY THE S.I/S
              </Text>
            </View>
            <View style={styles.tableStartBorderView}>
              <View style={[styles.rowStartView, { padding: 0 }]}>
                <Text style={styles.text}>
                  Leave Account to be furnished by the S.I./S
                </Text>
              </View>
              <View style={[styles.rowStartView, { padding: 0 }]}>
                <View
                  style={{
                    borderRightWidth: 1,
                    width: "10%",
                    height: 100,
                    justifyContent: "center",
                  }}
                >
                  <Text style={styles.text}>Year</Text>
                </View>
                <View
                  style={{
                    borderRightWidth: 1,
                    width: "10%",
                    justifyContent: "center",
                    alignItems: "center",
                    height: 100,
                  }}
                >
                  <Text style={[styles.text, { padding: 0 }]}>
                    Leave{"\n"}earned &{"\n"}nature of{"\n"}Leave
                  </Text>
                  <Text style={[styles.text, { padding: 0 }]}>_______</Text>
                  <Text
                    style={[
                      styles.textBold,
                      { marginTop: 2, fontSize: 8.5, padding: 0 },
                    ]}
                  >{`${leaveNature}\nLEAVE`}</Text>
                  <Text style={[styles.text, { marginTop: -12 }]}>_______</Text>
                </View>

                <View
                  style={{
                    width: "30%",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    borderRightWidth: 1,
                  }}
                >
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      borderBottomWidth: 1,
                      height: 20,
                      width: "100%",
                    }}
                  >
                    <Text style={styles.text}>Leave Enjoyed</Text>
                  </View>
                  <View
                    style={{
                      justifyContent: "space-around",
                      alignItems: "center",
                      flexDirection: "row",
                      height: 80,
                    }}
                  >
                    <View
                      style={{
                        borderRightWidth: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        height: 80,
                        width: "22%",
                      }}
                    >
                      <Text
                        style={[
                          styles.text,
                          { textAlign: "center", marginRight: 5 },
                        ]}
                      >
                        Leave{"\n"}from
                      </Text>
                    </View>
                    <View
                      style={{
                        borderRightWidth: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        height: 80,
                        width: "23%",
                      }}
                    >
                      <Text
                        style={[
                          styles.text,
                          { textAlign: "center", marginRight: 5 },
                        ]}
                      >
                        Leave{"\n"}To
                      </Text>
                    </View>
                    <View
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        height: 80,
                        width: "24%",
                      }}
                    >
                      <Text
                        style={[
                          styles.text,
                          { textAlign: "center", marginRight: 5 },
                        ]}
                      >
                        No. of{"\n"}
                        Days
                      </Text>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    width: "20%",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    borderRightWidth: 1,
                  }}
                >
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      borderBottomWidth: 1,
                      height: 20,
                    }}
                  >
                    <Text style={styles.text}>Nature of Leave</Text>
                  </View>

                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "row",
                      height: 80,
                    }}
                  >
                    <View
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        height: 80,
                        width: "30%",
                      }}
                    >
                      <Text
                        style={[
                          styles.text,
                          { textAlign: "center", marginRight: 5 },
                        ]}
                      >
                        HPL
                      </Text>
                    </View>
                    <View
                      style={{
                        height: 80,
                        borderLeftWidth: 1,
                      }}
                    >
                      <Text style={styles.text}>
                        Commuted/{"\n"}
                        Maternity/{"\n"}
                        Medical/{"\n"}
                        LWP/ CCL/{"\n"}
                        Paternity etc.
                      </Text>
                      {leaveNature !== "HPL" && (
                        <Image
                          source={{
                            uri: "https://raw.githubusercontent.com/amtawestwbtpta/awwbtptadata/main/check.png",
                          }}
                          style={{
                            height: 15,
                            width: 15,
                            position: "absolute",
                            marginLeft: 0,
                            marginTop:
                              leaveNature === "COMMUTED"
                                ? 0
                                : leaveNature === "MATERNITY"
                                ? 15
                                : leaveNature === "MEDICAL"
                                ? 28
                                : leaveNature === "LWP"
                                ? 45
                                : leaveNature === "CCL"
                                ? 42
                                : leaveNature === "PATERNITY"
                                ? 60
                                : 60,
                          }}
                        />
                      )}
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    borderRightWidth: 1,
                    width: "10%",
                    justifyContent: "center",
                    alignItems: "center",
                    height: 100,
                  }}
                >
                  <Text style={styles.text}>
                    Balance{"\n"}
                    of Leave{"\n"}
                  </Text>
                  <Text
                    style={[styles.textBold, { marginTop: 10, fontSize: 8.5 }]}
                  >
                    {leaveNature !== "MATERNITY" && `${leaveNature}`}
                  </Text>
                </View>
                <View
                  style={{
                    width: "20%",
                    justifyContent: "center",
                    alignItems: "center",
                    height: 100,
                  }}
                >
                  <Text style={styles.text}>
                    Previous{"\n"}Leave{"\n"}sanctioned by{"\n"}D.P.S.C with
                    {"\n"}Memo No. &{"\n"}Date
                  </Text>
                </View>
              </View>
              <View style={[styles.rowStartView, { padding: 0 }]}>
                <View
                  style={{
                    borderRightWidth: 1,
                    width: "10%",
                    height: 20,
                  }}
                >
                  <Text style={styles.text}>1</Text>
                </View>
                <View
                  style={{
                    borderRightWidth: 1,
                    width: "10%",
                    justifyContent: "center",
                    alignItems: "center",
                    height: 20,
                  }}
                >
                  <Text style={styles.text}>2</Text>
                </View>
                <View
                  style={{
                    borderRightWidth: 1,
                    width: "8%",
                    justifyContent: "center",
                    alignItems: "center",
                    height: 20,
                  }}
                >
                  <Text style={styles.text}>3</Text>
                </View>
                <View
                  style={{
                    borderRightWidth: 1,
                    width: "10%",
                    justifyContent: "center",
                    alignItems: "center",
                    height: 20,
                  }}
                >
                  <Text style={styles.text}>4</Text>
                </View>
                <View
                  style={{
                    borderRightWidth: 1,
                    width: "12%",
                    justifyContent: "center",
                    alignItems: "center",
                    height: 20,
                  }}
                >
                  <Text style={styles.text}>5</Text>
                </View>
                <View
                  style={{
                    borderRightWidth: 1,
                    width: "7%",
                    justifyContent: "center",
                    alignItems: "center",
                    height: 20,
                  }}
                >
                  <Text style={styles.text}>6</Text>
                </View>
                <View
                  style={{
                    borderRightWidth: 1,
                    width: "13%",
                    justifyContent: "center",
                    alignItems: "center",
                    height: 20,
                  }}
                >
                  <Text style={styles.text}>7</Text>
                </View>
                <View
                  style={{
                    borderRightWidth: 1,
                    width: "10%",
                    justifyContent: "center",
                    alignItems: "center",
                    height: 20,
                  }}
                >
                  <Text style={styles.text}>(2-5)=8</Text>
                </View>

                <View
                  style={{
                    width: "20%",
                    justifyContent: "center",
                    alignItems: "center",
                    height: 20,
                  }}
                >
                  <Text style={styles.text}>9</Text>
                </View>
              </View>
              <View style={[styles.rowStartView, { padding: 0 }]}>
                <View
                  style={{
                    borderRightWidth: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    width: "10%",
                    height: lineOne?.c1 !== "" ? 40 : 20,
                  }}
                >
                  <Text
                    style={
                      calStrLength(lineOne?.c1) > 5 ? styles.text2 : styles.text
                    }
                  >
                    {lineOne?.c1}
                  </Text>
                </View>
                <View
                  style={{
                    borderRightWidth: 1,
                    width: "10%",
                    justifyContent: "center",
                    alignItems: "center",
                    height: lineOne?.c1 !== "" ? 40 : 20,
                  }}
                >
                  <Text style={styles.text}>{lineOne?.c2}</Text>
                </View>
                <View
                  style={{
                    borderRightWidth: 1,
                    width: "8%",
                    justifyContent: "center",
                    alignItems: "center",
                    height: lineOne?.c1 !== "" ? 40 : 20,
                  }}
                >
                  <Text style={styles.text2}>{lineOne?.c3}</Text>
                </View>
                <View
                  style={{
                    borderRightWidth: 1,
                    width: "10%",
                    justifyContent: "center",
                    alignItems: "center",
                    height: lineOne?.c1 !== "" ? 40 : 20,
                  }}
                >
                  <Text style={styles.text2}>{lineOne?.c4}</Text>
                </View>
                <View
                  style={{
                    borderRightWidth: 1,
                    width: "12%",
                    justifyContent: "center",
                    alignItems: "center",
                    height: lineOne?.c1 !== "" ? 40 : 20,
                  }}
                >
                  <Text style={styles.text}>{lineOne?.c5}</Text>
                </View>
                <View
                  style={{
                    borderRightWidth: 1,
                    width: "7%",
                    justifyContent: "center",
                    alignItems: "center",
                    height: lineOne?.c1 !== "" ? 40 : 20,
                  }}
                >
                  <Text style={styles.text}>{lineOne?.c6}</Text>
                </View>
                <View
                  style={{
                    borderRightWidth: 1,
                    width: "13%",
                    justifyContent: "center",
                    alignItems: "center",
                    height: lineOne?.c1 !== "" ? 40 : 20,
                  }}
                >
                  <Text
                    style={
                      calStrLength(lineOne?.c7) > 5 ? styles.text2 : styles.text
                    }
                  >
                    {lineOne?.c7}
                  </Text>
                </View>
                <View
                  style={{
                    borderRightWidth: 1,
                    width: "10%",
                    justifyContent: "center",
                    alignItems: "center",
                    height: lineOne?.c1 !== "" ? 40 : 20,
                  }}
                >
                  <Text style={styles.text}>{lineOne?.c8}</Text>
                </View>

                <View
                  style={{
                    width: "20%",
                    justifyContent: "center",
                    alignItems: "center",
                    height: lineOne?.c1 !== "" ? 40 : 20,
                  }}
                >
                  <Text style={styles.text}>{lineOne?.c9}</Text>
                </View>
              </View>

              <View style={[styles.rowStartView, { padding: 0 }]}>
                <View
                  style={{
                    borderRightWidth: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    width: "10%",
                    height: lineTwo?.c1 !== "" ? 40 : 20,
                  }}
                >
                  <Text
                    style={
                      calStrLength(lineTwo?.c1) > 5 ? styles.text2 : styles.text
                    }
                  >
                    {lineTwo?.c1}
                  </Text>
                </View>
                <View
                  style={{
                    borderRightWidth: 1,
                    width: "10%",
                    justifyContent: "center",
                    alignItems: "center",
                    height: lineTwo?.c1 !== "" ? 40 : 20,
                  }}
                >
                  <Text style={styles.text}>{lineTwo?.c2}</Text>
                </View>
                <View
                  style={{
                    borderRightWidth: 1,
                    width: "8%",
                    justifyContent: "center",
                    alignItems: "center",
                    height: lineTwo?.c1 !== "" ? 40 : 20,
                  }}
                >
                  <Text style={styles.text2}>{lineTwo?.c3}</Text>
                </View>
                <View
                  style={{
                    borderRightWidth: 1,
                    width: "10%",
                    justifyContent: "center",
                    alignItems: "center",
                    height: lineTwo?.c1 !== "" ? 40 : 20,
                  }}
                >
                  <Text style={styles.text2}>{lineTwo?.c4}</Text>
                </View>
                <View
                  style={{
                    borderRightWidth: 1,
                    width: "12%",
                    justifyContent: "center",
                    alignItems: "center",
                    height: lineTwo?.c1 !== "" ? 40 : 20,
                  }}
                >
                  <Text style={styles.text}>{lineTwo?.c5}</Text>
                </View>
                <View
                  style={{
                    borderRightWidth: 1,
                    width: "7%",
                    justifyContent: "center",
                    alignItems: "center",
                    height: lineTwo?.c1 !== "" ? 40 : 20,
                  }}
                >
                  <Text style={styles.text}>{lineTwo?.c6}</Text>
                </View>
                <View
                  style={{
                    borderRightWidth: 1,
                    width: "13%",
                    justifyContent: "center",
                    alignItems: "center",
                    height: lineTwo?.c1 !== "" ? 40 : 20,
                  }}
                >
                  <Text
                    style={
                      calStrLength(lineTwo?.c7) > 5 ? styles.text2 : styles.text
                    }
                  >
                    {lineTwo?.c7}
                  </Text>
                </View>
                <View
                  style={{
                    borderRightWidth: 1,
                    width: "10%",
                    justifyContent: "center",
                    alignItems: "center",
                    height: lineTwo?.c1 !== "" ? 40 : 20,
                  }}
                >
                  <Text style={styles.text}>{lineTwo?.c8}</Text>
                </View>

                <View
                  style={{
                    width: "20%",
                    justifyContent: "center",
                    alignItems: "center",
                    height: lineTwo?.c1 !== "" ? 40 : 20,
                  }}
                >
                  <Text style={styles.text}>{lineTwo?.c9}</Text>
                </View>
              </View>

              {/* Data begins here */}

              <View style={[styles.rowStartView, { padding: 0 }]}>
                <View
                  style={{
                    borderRightWidth: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    width: "10%",
                    height: lineThree?.c1 !== "" ? 40 : 20,
                  }}
                >
                  <Text
                    style={
                      calStrLength(lineThree?.c1) > 5
                        ? styles.text2
                        : styles.text
                    }
                  >
                    {lineThree?.c1}
                  </Text>
                </View>
                <View
                  style={{
                    borderRightWidth: 1,
                    width: "10%",
                    justifyContent: "center",
                    alignItems: "center",
                    height: lineThree?.c1 !== "" ? 40 : 20,
                  }}
                >
                  <Text
                    style={
                      calStrLength(lineThree?.c2) > 18
                        ? styles.text2
                        : styles.text
                    }
                  >
                    {lineThree?.c2}
                  </Text>
                </View>
                <View
                  style={{
                    borderRightWidth: 1,
                    width: "8%",
                    justifyContent: "center",
                    alignItems: "center",
                    height: lineThree?.c1 !== "" ? 40 : 20,
                  }}
                >
                  <Text style={styles.text2}>{lineThree?.c3}</Text>
                </View>
                <View
                  style={{
                    borderRightWidth: 1,
                    width: "10%",
                    justifyContent: "center",
                    alignItems: "center",
                    height: lineThree?.c1 !== "" ? 40 : 20,
                  }}
                >
                  <Text style={styles.text2}>{lineThree?.c4}</Text>
                </View>
                <View
                  style={{
                    borderRightWidth: 1,
                    width: "12%",
                    justifyContent: "center",
                    alignItems: "center",
                    height: lineThree?.c1 !== "" ? 40 : 20,
                  }}
                >
                  <Text style={styles.text}>{lineThree?.c5}</Text>
                </View>
                <View
                  style={{
                    borderRightWidth: 1,
                    width: "7%",
                    justifyContent: "center",
                    alignItems: "center",
                    height: lineThree?.c1 !== "" ? 40 : 20,
                  }}
                >
                  <Text style={styles.text}>{lineThree?.c6}</Text>
                </View>
                <View
                  style={{
                    borderRightWidth: 1,
                    width: "13%",
                    justifyContent: "center",
                    alignItems: "center",
                    height: lineThree?.c1 !== "" ? 40 : 20,
                  }}
                >
                  <Text
                    style={
                      calStrLength(lineThree?.c7) > 5
                        ? styles.text2
                        : styles.text
                    }
                  >
                    {lineThree?.c7}
                  </Text>
                </View>
                <View
                  style={{
                    borderRightWidth: 1,
                    width: "10%",
                    justifyContent: "center",
                    alignItems: "center",
                    height: lineThree?.c1 !== "" ? 40 : 20,
                  }}
                >
                  <Text style={styles.text}>{lineThree?.c8}</Text>
                </View>

                <View
                  style={{
                    width: "20%",
                    justifyContent: "center",
                    alignItems: "center",
                    height: lineThree?.c1 !== "" ? 40 : 20,
                  }}
                >
                  <Text style={styles.text}>{lineThree?.c9}</Text>
                </View>
              </View>

              <View style={[styles.rowStartView, { padding: 0 }]}>
                <View
                  style={{
                    borderRightWidth: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    width: "10%",
                    height: lineFour?.c1 !== "" ? 40 : 20,
                  }}
                >
                  <Text
                    style={
                      calStrLength(lineFour?.c1) > 5
                        ? styles.text2
                        : styles.text
                    }
                  >
                    {lineFour?.c1}
                  </Text>
                </View>
                <View
                  style={{
                    borderRightWidth: 1,
                    width: "10%",
                    justifyContent: "center",
                    alignItems: "center",
                    height: lineFour?.c1 !== "" ? 40 : 20,
                  }}
                >
                  <Text
                    style={
                      calStrLength(lineFour?.c2) > 5
                        ? styles.text2
                        : styles.text
                    }
                  >
                    {lineFour?.c2}{" "}
                  </Text>
                </View>
                <View
                  style={{
                    borderRightWidth: 1,
                    width: "8%",
                    justifyContent: "center",
                    alignItems: "center",
                    height: lineFour?.c1 !== "" ? 40 : 20,
                  }}
                >
                  <Text style={styles.text2}>{lineFour?.c3}</Text>
                </View>
                <View
                  style={{
                    borderRightWidth: 1,
                    width: "10%",
                    justifyContent: "center",
                    alignItems: "center",
                    height: lineFour?.c1 !== "" ? 40 : 20,
                  }}
                >
                  <Text style={styles.text2}>{lineFour?.c4}</Text>
                </View>
                <View
                  style={{
                    borderRightWidth: 1,
                    width: "12%",
                    justifyContent: "center",
                    alignItems: "center",
                    height: lineFour?.c1 !== "" ? 40 : 20,
                  }}
                >
                  <Text style={styles.text}>{lineFour?.c5}</Text>
                </View>
                <View
                  style={{
                    borderRightWidth: 1,
                    width: "7%",
                    justifyContent: "center",
                    alignItems: "center",
                    height: lineFour?.c1 !== "" ? 40 : 20,
                  }}
                >
                  <Text style={styles.text}>{lineFour?.c6}</Text>
                </View>
                <View
                  style={{
                    borderRightWidth: 1,
                    width: "13%",
                    justifyContent: "center",
                    alignItems: "center",
                    height: lineFour?.c1 !== "" ? 40 : 20,
                  }}
                >
                  <Text
                    style={
                      calStrLength(lineFour?.c7) > 5
                        ? styles.text2
                        : styles.text
                    }
                  >
                    {lineFour?.c7}
                  </Text>
                </View>
                <View
                  style={{
                    borderRightWidth: 1,
                    width: "10%",
                    justifyContent: "center",
                    alignItems: "center",
                    height: lineFour?.c1 !== "" ? 40 : 20,
                  }}
                >
                  <Text style={styles.text}>{lineFour?.c8}</Text>
                </View>

                <View
                  style={{
                    width: "20%",
                    justifyContent: "center",
                    alignItems: "center",
                    height: lineFour?.c1 !== "" ? 40 : 20,
                  }}
                >
                  <Text style={styles.text}>{lineFour?.c9}</Text>
                </View>
              </View>

              <View style={[styles.rowStartView, { padding: 0 }]}>
                <View
                  style={{
                    borderRightWidth: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    width: "10%",
                    height: lineFive?.c1 !== "" ? 40 : 20,
                  }}
                >
                  <Text
                    style={
                      calStrLength(lineFive?.c1) > 5
                        ? styles.text2
                        : styles.text
                    }
                  >
                    {lineFive?.c1}
                  </Text>
                </View>
                <View
                  style={{
                    borderRightWidth: 1,
                    width: "10%",
                    justifyContent: "center",
                    alignItems: "center",
                    height: lineFive?.c1 !== "" ? 40 : 20,
                  }}
                >
                  <Text style={styles.text}>{lineFive?.c2}</Text>
                </View>
                <View
                  style={{
                    borderRightWidth: 1,
                    width: "8%",
                    justifyContent: "center",
                    alignItems: "center",
                    height: lineFive?.c1 !== "" ? 40 : 20,
                  }}
                >
                  <Text style={styles.text2}>{lineFive?.c3}</Text>
                </View>
                <View
                  style={{
                    borderRightWidth: 1,
                    width: "10%",
                    justifyContent: "center",
                    alignItems: "center",
                    height: lineFive?.c1 !== "" ? 40 : 20,
                  }}
                >
                  <Text style={styles.text2}>{lineFive?.c4}</Text>
                </View>
                <View
                  style={{
                    borderRightWidth: 1,
                    width: "12%",
                    justifyContent: "center",
                    alignItems: "center",
                    height: lineFive?.c1 !== "" ? 40 : 20,
                  }}
                >
                  <Text style={styles.text}>{lineFive?.c5}</Text>
                </View>
                <View
                  style={{
                    borderRightWidth: 1,
                    width: "7%",
                    justifyContent: "center",
                    alignItems: "center",
                    height: lineFive?.c1 !== "" ? 40 : 20,
                  }}
                >
                  <Text style={styles.text}>{lineFive?.c6}</Text>
                </View>
                <View
                  style={{
                    borderRightWidth: 1,
                    width: "13%",
                    justifyContent: "center",
                    alignItems: "center",
                    height: lineFive?.c1 !== "" ? 40 : 20,
                  }}
                >
                  <Text
                    style={
                      calStrLength(lineFive?.c7) > 5
                        ? styles.text2
                        : styles.text
                    }
                  >
                    {lineFive?.c7}
                  </Text>
                </View>
                <View
                  style={{
                    borderRightWidth: 1,
                    width: "10%",
                    justifyContent: "center",
                    alignItems: "center",
                    height: lineFive?.c1 !== "" ? 40 : 20,
                  }}
                >
                  <Text style={styles.text}>{lineFive?.c8}</Text>
                </View>

                <View
                  style={{
                    width: "20%",
                    justifyContent: "center",
                    alignItems: "center",
                    height: lineFive?.c1 !== "" ? 40 : 20,
                  }}
                >
                  <Text style={styles.text}>{lineFive?.c9}</Text>
                </View>
              </View>
              <View style={[styles.rowStartView, { padding: 0 }]}>
                <View
                  style={{
                    borderRightWidth: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    width: "10%",
                    height: lineSix?.c1 !== "" ? 40 : 20,
                  }}
                >
                  <Text
                    style={
                      calStrLength(lineSix?.c1) > 5 ? styles.text2 : styles.text
                    }
                  >
                    {lineSix?.c1}
                  </Text>
                </View>
                <View
                  style={{
                    borderRightWidth: 1,
                    width: "10%",
                    justifyContent: "center",
                    alignItems: "center",
                    height: lineSix?.c1 !== "" ? 40 : 20,
                  }}
                >
                  <Text style={styles.text}>{lineSix?.c2}</Text>
                </View>
                <View
                  style={{
                    borderRightWidth: 1,
                    width: "8%",
                    justifyContent: "center",
                    alignItems: "center",
                    height: lineSix?.c1 !== "" ? 40 : 20,
                  }}
                >
                  <Text style={styles.text2}>{lineSix?.c3}</Text>
                </View>
                <View
                  style={{
                    borderRightWidth: 1,
                    width: "10%",
                    justifyContent: "center",
                    alignItems: "center",
                    height: lineSix?.c1 !== "" ? 40 : 20,
                  }}
                >
                  <Text style={styles.text2}>{lineSix?.c4}</Text>
                </View>
                <View
                  style={{
                    borderRightWidth: 1,
                    width: "12%",
                    justifyContent: "center",
                    alignItems: "center",
                    height: lineSix?.c1 !== "" ? 40 : 20,
                  }}
                >
                  <Text style={styles.text}>{lineSix?.c5}</Text>
                </View>
                <View
                  style={{
                    borderRightWidth: 1,
                    width: "7%",
                    justifyContent: "center",
                    alignItems: "center",
                    height: lineSix?.c1 !== "" ? 40 : 20,
                  }}
                >
                  <Text style={styles.text}>{lineSix?.c6}</Text>
                </View>
                <View
                  style={{
                    borderRightWidth: 1,
                    width: "13%",
                    justifyContent: "center",
                    alignItems: "center",
                    height: lineSix?.c1 !== "" ? 40 : 20,
                  }}
                >
                  <Text
                    style={
                      calStrLength(lineSix?.c7) < 5 ? styles.text : styles.text2
                    }
                  >
                    {lineSix?.c7}
                  </Text>
                </View>
                <View
                  style={{
                    borderRightWidth: 1,
                    width: "10%",
                    justifyContent: "center",
                    alignItems: "center",
                    height: lineSix?.c1 !== "" ? 40 : 20,
                  }}
                >
                  <Text style={styles.text}>{lineSix?.c8}</Text>
                </View>

                <View
                  style={{
                    width: "20%",
                    justifyContent: "center",
                    alignItems: "center",
                    height: lineSix?.c1 !== "" ? 40 : 20,
                  }}
                >
                  <Text style={styles.text}>{lineSix?.c9}</Text>
                </View>
              </View>
              <View style={[styles.rowStartView, { padding: 0 }]}>
                <View
                  style={{
                    borderRightWidth: 1,
                    width: "10%",
                    height: 20,
                  }}
                >
                  <Text style={styles.text}> </Text>
                </View>
                <View
                  style={{
                    borderRightWidth: 1,
                    width: "10%",
                    justifyContent: "center",
                    alignItems: "center",
                    height: 20,
                  }}
                >
                  <Text style={styles.text}></Text>
                </View>
                <View
                  style={{
                    borderRightWidth: 1,
                    width: "8%",
                    justifyContent: "center",
                    alignItems: "center",
                    height: 20,
                  }}
                >
                  <Text style={styles.text}></Text>
                </View>
                <View
                  style={{
                    borderRightWidth: 1,
                    width: "10%",
                    justifyContent: "center",
                    alignItems: "center",
                    height: 20,
                  }}
                >
                  <Text style={styles.text}></Text>
                </View>
                <View
                  style={{
                    borderRightWidth: 1,
                    width: "12%",
                    justifyContent: "center",
                    alignItems: "center",
                    height: 20,
                  }}
                >
                  <Text style={styles.text}></Text>
                </View>
                <View
                  style={{
                    borderRightWidth: 1,
                    width: "7%",
                    justifyContent: "center",
                    alignItems: "center",
                    height: 20,
                  }}
                >
                  <Text style={styles.text}></Text>
                </View>
                <View
                  style={{
                    borderRightWidth: 1,
                    width: "13%",
                    justifyContent: "center",
                    alignItems: "center",
                    height: 20,
                  }}
                >
                  <Text style={styles.text}></Text>
                </View>
                <View
                  style={{
                    borderRightWidth: 1,
                    width: "10%",
                    justifyContent: "center",
                    alignItems: "center",
                    height: 20,
                  }}
                >
                  <Text style={styles.text}></Text>
                </View>

                <View
                  style={{
                    width: "20%",
                    justifyContent: "center",
                    alignItems: "center",
                    height: 20,
                  }}
                >
                  <Text style={styles.text}></Text>
                </View>
              </View>
              <View
                style={[
                  styles.rowStartView,
                  { padding: 0, borderBottomWidth: 0 },
                ]}
              >
                <View
                  style={{
                    borderRightWidth: 1,
                    width: "10%",
                    height: 20,
                  }}
                >
                  <Text style={styles.text}> </Text>
                </View>
                <View
                  style={{
                    borderRightWidth: 1,
                    width: "10%",
                    justifyContent: "center",
                    alignItems: "center",
                    height: 20,
                  }}
                >
                  <Text style={styles.text}></Text>
                </View>
                <View
                  style={{
                    borderRightWidth: 1,
                    width: "8%",
                    justifyContent: "center",
                    alignItems: "center",
                    height: 20,
                  }}
                >
                  <Text style={styles.text}></Text>
                </View>
                <View
                  style={{
                    borderRightWidth: 1,
                    width: "10%",
                    justifyContent: "center",
                    alignItems: "center",
                    height: 20,
                  }}
                >
                  <Text style={styles.text}></Text>
                </View>
                <View
                  style={{
                    borderRightWidth: 1,
                    width: "12%",
                    justifyContent: "center",
                    alignItems: "center",
                    height: 20,
                  }}
                >
                  <Text style={styles.text}></Text>
                </View>
                <View
                  style={{
                    borderRightWidth: 1,
                    width: "7%",
                    justifyContent: "center",
                    alignItems: "center",
                    height: 20,
                  }}
                >
                  <Text style={styles.text}></Text>
                </View>
                <View
                  style={{
                    borderRightWidth: 1,
                    width: "13%",
                    justifyContent: "center",
                    alignItems: "center",
                    height: 20,
                  }}
                >
                  <Text style={styles.text}></Text>
                </View>
                <View
                  style={{
                    borderRightWidth: 1,
                    width: "10%",
                    justifyContent: "center",
                    alignItems: "center",
                    height: 20,
                  }}
                >
                  <Text style={styles.text}></Text>
                </View>

                <View
                  style={{
                    width: "20%",
                    justifyContent: "center",
                    alignItems: "center",
                    height: 20,
                  }}
                >
                  <Text style={styles.text}></Text>
                </View>
              </View>
            </View>
            <View
              style={{ width: "40%", alignSelf: "flex-end", marginTop: 20 }}
            >
              <Text style={styles.textBold}>
                Signature of the S.I./S with seal
              </Text>
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
            width: "98%",
          }}
        >
          <View style={styles.pageMainView}>
            <View
              style={{
                width: 400,
                height: 25,
                backgroundColor: "black",
                position: "absolute",
                borderRadius: 5,
                marginTop: 3,
                top: -5,
                alignSelf: "center",
              }}
            ></View>
            <View
              style={{
                width: 400,
                height: 25,
                borderWidth: 2,
                borderBottomWidth: 0,
                backgroundColor: "white",
                position: "absolute",
                borderRadius: 5,
                top: -5,
                alignSelf: "center",
              }}
            >
              <Text
                style={[
                  styles.title,
                  {
                    textDecoration: "underline",
                    textDecorationStyle: "double",
                  },
                ]}
              >
                R E C O M E N D A T I O N
              </Text>
            </View>
            <View
              style={{
                marginTop: 30,
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "baseline",
                width: "100%",
                marginLeft: -20,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "baseline",
                  width: "60%",
                }}
              >
                <View style={{ width: "20%" }}>
                  <Text style={styles.text}>Memo No. </Text>
                </View>
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderBottomStyle: "dotted",
                    width: "50%",
                  }}
                >
                  <Text style={styles.text}> </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "baseline",
                  width: "50%",
                  marginLeft: 30,
                }}
              >
                <View style={{ width: "20%" }}>
                  <Text style={styles.text}>Date </Text>
                </View>
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderBottomStyle: "dotted",
                    width: "50%",
                  }}
                >
                  <Text style={styles.text}> </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                marginTop: 5,
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "baseline",
                width: "100%",
                marginLeft: -20,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "baseline",
                  width: "70%",
                }}
              >
                <View style={{ width: "20%" }}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "baseline",
                    }}
                  >
                    <Text
                      style={[
                        styles.text,
                        {
                          textDecoration:
                            gender === "male" ? "none" : "line-through",
                        },
                      ]}
                    >
                      Sri/{" "}
                    </Text>
                    <Text
                      style={[
                        styles.text,
                        {
                          textDecoration:
                            gender === "female" ? "none" : "line-through",
                        },
                      ]}
                    >
                      {" "}
                      Smt{" "}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderBottomStyle: "dotted",
                    width: "80%",
                  }}
                >
                  <Text style={styles.text}>{tname}</Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "baseline",
                  width: "30%",
                  marginLeft: 5,
                }}
              >
                <View style={{ width: "35%" }}>
                  <Text style={styles.text}>Teacher of</Text>
                </View>
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderBottomStyle: "dotted",
                    width: "65%",
                  }}
                >
                  <Text style={styles.text}>{school?.split(" ")[0]}</Text>
                </View>
              </View>
            </View>
            <View
              style={{
                marginTop: 5,
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "baseline",
                width: "100%",
                marginLeft: -20,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "baseline",
                  width: "60%",
                }}
              >
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderBottomStyle: "dotted",
                    width: "90%",
                  }}
                >
                  <Text
                    style={[styles.text, { textAlign: "left", marginLeft: 10 }]}
                  >
                    {school
                      ?.split(" ")
                      ?.slice(1, school?.split(" ").length)
                      .join(" ")}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "baseline",
                  width: "40%",
                  marginLeft: 5,
                }}
              >
                <View style={{ width: "20%" }}>
                  <Text style={styles.text}>Vill.</Text>
                </View>
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderBottomStyle: "dotted",
                    width: "70%",
                  }}
                >
                  <Text
                    style={village.length > 20 ? styles.text2 : styles.text}
                  >
                    {village?.toUpperCase()}
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                marginTop: 5,
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "baseline",
                width: "100%",
                marginLeft: -20,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "baseline",
                  width: "60%",
                }}
              >
                <View style={{ width: "20%" }}>
                  <Text style={styles.text}>P.O.</Text>
                </View>
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderBottomStyle: "dotted",
                    width: "80%",
                  }}
                >
                  <Text
                    style={[styles.text, { textAlign: "left", marginLeft: 10 }]}
                  >
                    {po?.toUpperCase()}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "baseline",
                  width: "40%",
                  marginLeft: 5,
                }}
              >
                <View style={{ width: "70%" }}>
                  <Text style={styles.text}>Whose date of appointment is</Text>
                </View>
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderBottomStyle: "dotted",
                    width: "30%",
                  }}
                >
                  <Text style={styles.text}>{doj}</Text>
                </View>
              </View>
            </View>
            <Text style={[styles.text, { marginTop: 5, textAlign: "left" }]}>
              has been provisionally granted leave as follows subject to the
              approval of the Council.
            </Text>
            <View
              style={{
                marginTop: 5,
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "baseline",
                width: "80%",
                marginLeft: -35,
              }}
            >
              {leaveNature !== "HPL" && (
                <Image
                  source={{
                    uri: "https://raw.githubusercontent.com/amtawestwbtpta/awwbtptadata/main/check.png",
                  }}
                  style={{
                    height: 10,
                    width: 10,
                    position: "absolute",
                    marginTop: -5,
                    marginLeft:
                      leaveNature === "COMMUTED"
                        ? 60
                        : leaveNature === "MATERNITY"
                        ? 120
                        : leaveNature === "MEDICAL"
                        ? 170
                        : leaveNature === "LWP"
                        ? 210
                        : leaveNature === "CCL"
                        ? 245
                        : leaveNature === "PATERNITY"
                        ? 285
                        : 300,
                  }}
                />
              )}
              <View style={{ width: "80%" }}>
                <Text style={styles.text}>
                  Commuted/ Maternity/ Medical/ LWP/ CCL/ Paternity etc.
                </Text>
              </View>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderBottomStyle: "dotted",
                  width: "20%",
                }}
              >
                <Text
                  style={[styles.text, { textAlign: "left", marginLeft: 10 }]}
                >
                  {leaveNature}
                </Text>
              </View>
            </View>
            <View
              style={{
                marginTop: 5,
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "baseline",
                width: "100%",
                marginLeft: -8,
              }}
            >
              <View style={{ width: "10%" }}>
                <Text style={styles.text}>from</Text>
              </View>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderBottomStyle: "dotted",
                  width: "20%",
                }}
              >
                <Text style={styles.text}>{startingDate}</Text>
              </View>
              <View style={{ width: "10%" }}>
                <Text style={styles.text}>to</Text>
              </View>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderBottomStyle: "dotted",
                  width: "20%",
                }}
              >
                <Text style={styles.text}>{endingDate}</Text>
              </View>
              <View style={{ width: "10%" }}>
                <Text style={styles.text}>for</Text>
              </View>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderBottomStyle: "dotted",
                  width: "30%",
                }}
              >
                <Text style={styles.text}>{leaveDays}</Text>
              </View>
              <View style={{ width: "30%" }}>
                <Text style={styles.text}> days in lieu</Text>
              </View>
            </View>
            <View
              style={{
                marginTop: 5,
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                width: "100%",
              }}
            >
              <View
                style={{
                  borderBottomWidth: 1,
                  borderBottomStyle: "dotted",
                  width: "30%",
                }}
              >
                <Text style={styles.text}>{hpayLeave}</Text>
              </View>
              <View style={{ width: "10%" }}>
                <Text style={styles.text}>of</Text>
              </View>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderBottomStyle: "dotted",
                  width: "30%",
                }}
              >
                <Text style={styles.text}>
                  {leaveNature === "MATERNITY" ||
                  leaveNature === "PATERNITY" ||
                  leaveNature === "CCL" ||
                  leaveNature === "MEDICAL"
                    ? "-"
                    : earnedLeave}
                </Text>
              </View>
              <View style={{ width: "30%" }}>
                <Text style={styles.text}>
                  days HPL from{" "}
                  <Text
                    style={[
                      styles.text,
                      {
                        textDecoration:
                          gender === "male" ? "none" : "line-through",
                      },
                    ]}
                  >
                    his/{" "}
                  </Text>
                  <Text
                    style={[
                      styles.text,
                      {
                        textDecoration:
                          gender === "female" ? "none" : "line-through",
                      },
                    ]}
                  >
                    {" "}
                    her{" "}
                  </Text>{" "}
                  credit.
                </Text>
              </View>
            </View>
            <View
              style={{
                width: "40%",
                alignSelf: "flex-end",
                marginTop: 30,
                marginBottom: 10,
              }}
            >
              <Text style={styles.textBold}>
                Signature of the S.I./S with seal
              </Text>
            </View>
            <View
              style={{ height: 2, backgroundColor: "black", width: "100%" }}
            ></View>
            <View
              style={{
                width: 400,
                height: 25,
                backgroundColor: "black",
                position: "absolute",
                borderRadius: 5,
                marginTop: 3,
                left: 91,
                top: 265,
                alignSelf: "center",
              }}
            ></View>
            <View
              style={{
                width: 400,
                height: 25,
                borderWidth: 2,
                borderBottomWidth: 0,
                backgroundColor: "white",
                position: "absolute",
                borderRadius: 5,
                top: 265,
                alignSelf: "center",
              }}
            >
              <Text
                style={[
                  styles.title,
                  {
                    textDecoration: "underline",
                    textDecorationStyle: "double",
                  },
                ]}
              >
                L E A V E{"    "}S A N C T I O N I N G{"    "}O R D E R
              </Text>
            </View>
            <View
              style={{
                marginTop: 40,
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "baseline",
                width: "100%",
                marginLeft: -20,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "baseline",
                  width: "60%",
                }}
              >
                <View style={{ width: "20%" }}>
                  <Text style={styles.text}>Memo No. </Text>
                </View>
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderBottomStyle: "dotted",
                    width: "50%",
                  }}
                >
                  <Text style={styles.text}> </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "baseline",
                  width: "50%",
                  marginLeft: 30,
                }}
              >
                <View style={{ width: "20%" }}>
                  <Text style={styles.text}>Date </Text>
                </View>
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderBottomStyle: "dotted",
                    width: "50%",
                  }}
                >
                  <Text style={styles.text}> </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                marginTop: 5,
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "baseline",
                width: "100%",
                marginLeft: -100,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "baseline",
                  width: "80%",
                }}
              >
                <View style={{ width: "20%" }}>
                  <Text style={styles.text}>To : </Text>
                </View>
                <View
                  style={{
                    width: "40%",
                  }}
                >
                  <Text style={styles.text}>The Sub Inspector of Schools,</Text>
                </View>
              </View>
            </View>
            <View
              style={{
                marginTop: 5,
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "baseline",
                width: "100%",
                marginLeft: -35,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "baseline",
                  width: "80%",
                }}
              >
                <View style={{ width: "20%" }}>
                  <Text style={styles.text}></Text>
                </View>
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderBottomStyle: "dotted",
                    width: "40%",
                  }}
                >
                  <Text style={styles.text}>Amta West</Text>
                </View>
                <View style={{ width: "20%" }}>
                  <Text style={styles.text}> Circle, Howrah</Text>
                </View>
              </View>
            </View>
            <View
              style={{
                marginTop: 5,
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "baseline",
                width: "100%",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "baseline",
                  width: "80%",
                  marginLeft: 50,
                }}
              >
                <View style={{ width: "60%" }}>
                  <Text style={styles.text}>
                    The undersigned has to inform{" "}
                    <Text
                      style={[
                        styles.text,
                        {
                          textDecoration:
                            gender === "male" ? "none" : "line-through",
                        },
                      ]}
                    >
                      him/{" "}
                    </Text>
                    <Text
                      style={[
                        styles.text,
                        {
                          textDecoration:
                            gender === "female" ? "none" : "line-through",
                        },
                      ]}
                    >
                      {" "}
                      her{" "}
                    </Text>{" "}
                    that
                  </Text>
                </View>
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderBottomStyle: "dotted",
                    width: "20%",
                  }}
                >
                  <Text style={styles.text}>{leaveDays}</Text>
                </View>
                <View style={{ width: "20%" }}>
                  <Text style={styles.text}> days of</Text>
                </View>
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderBottomStyle: "dotted",
                    width: "20%",
                  }}
                >
                  <Text style={styles.text}>{leaveNature}</Text>
                </View>
              </View>
            </View>
            <View
              style={{
                marginTop: 5,
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "baseline",
                width: "100%",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "baseline",
                  width: "80%",
                  marginLeft: 10,
                }}
              >
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderBottomStyle: "dotted",
                    width: "30%",
                  }}
                >
                  <Text style={styles.text}> </Text>
                </View>
                <View style={{ width: "40%" }}>
                  <Text style={styles.text}> leave for the period from </Text>
                </View>
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderBottomStyle: "dotted",
                    width: "20%",
                  }}
                >
                  <Text style={styles.text}>{startingDate}</Text>
                </View>
                <View style={{ width: "20%" }}>
                  <Text style={styles.text}> to </Text>
                </View>
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderBottomStyle: "dotted",
                    width: "20%",
                  }}
                >
                  <Text style={styles.text}>{endingDate}</Text>
                </View>
              </View>
            </View>
            <View
              style={{
                marginTop: 5,
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "baseline",
                width: "100%",
              }}
            >
              <View
                style={{
                  width: "50%",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "baseline",
                  }}
                >
                  <Text style={styles.text}>
                    {" "}
                    is hereby sectioned in favour of{" "}
                  </Text>
                  <Text
                    style={[
                      styles.text,
                      {
                        textDecoration:
                          gender === "male" ? "none" : "line-through",
                      },
                    ]}
                  >
                    Sri/{" "}
                  </Text>
                  <Text
                    style={[
                      styles.text,
                      {
                        textDecoration:
                          gender === "female" ? "none" : "line-through",
                      },
                    ]}
                  >
                    {" "}
                    Smt{" "}
                  </Text>
                </View>
              </View>

              <View
                style={{
                  borderBottomWidth: 1,
                  borderBottomStyle: "dotted",
                  width: "50%",
                }}
              >
                <Text style={styles.text}>{tname}</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "baseline",
                  width: "30%",
                }}
              >
                <Text
                  style={[
                    styles.text,
                    {
                      textDecoration: desig === "AT" ? "none" : "line-through",
                    },
                  ]}
                >
                  {" "}
                  A.T/{" "}
                </Text>

                <Text
                  style={[
                    styles.text,
                    {
                      textDecoration: desig === "HT" ? "none" : "line-through",
                    },
                  ]}
                >
                  {" "}
                  H.T/{" "}
                </Text>

                <Text
                  style={[
                    styles.text,
                    {
                      textDecoration:
                        desig !== "HT" && hoi === "Yes"
                          ? "none"
                          : "line-through",
                    },
                  ]}
                >
                  {" "}
                  T.I.C{" "}
                </Text>
                <Image
                  source={{
                    uri: "https://raw.githubusercontent.com/amtawestwbtpta/awwbtptadata/main/check.png",
                  }}
                  style={{
                    height: 10,
                    width: 10,
                    position: "absolute",
                    marginTop: -6,
                    marginLeft: desig === "AT" ? 10 : 43,
                  }}
                />
                {desig !== "HT" && hoi === "Yes" && (
                  <Image
                    source={{
                      uri: "https://raw.githubusercontent.com/amtawestwbtpta/awwbtptadata/main/check.png",
                    }}
                    style={{
                      height: 10,
                      width: 10,
                      position: "absolute",
                      marginTop: -6,
                      marginLeft: 78,
                    }}
                  />
                )}
              </View>
            </View>
            <View
              style={{
                marginTop: 5,
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "baseline",
                width: "100%",
                marginLeft: -48,
              }}
            >
              <View
                style={{
                  width: "20%",
                }}
              >
                <Text style={styles.text}> of </Text>
              </View>

              <View
                style={{
                  borderBottomWidth: 1,
                  borderBottomStyle: "dotted",
                  width: "70%",
                }}
              >
                <Text style={styles.text}>{school}</Text>
              </View>
            </View>
            <View
              style={{
                marginTop: 5,
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "baseline",
                width: "100%",
                marginLeft: -20,
              }}
            >
              <View
                style={{
                  width: "40%",
                }}
              >
                <Text style={styles.text}>
                  {" "}
                  with full pay{" "}
                  <Text
                    style={[
                      styles.text,
                      {
                        textDecoration: "line-through",
                      },
                    ]}
                  >
                    / without pay
                  </Text>{" "}
                  in lieu of{" "}
                </Text>
              </View>

              <View
                style={{
                  borderBottomWidth: 1,
                  borderBottomStyle: "dotted",
                  width: "20%",
                }}
              >
                <Text style={styles.text}>{hpayLeave}</Text>
              </View>
              <View
                style={{
                  width: "40%",
                }}
              >
                <Text style={styles.text}>
                  days half pay leave on{" "}
                  <Text
                    style={[
                      styles.text,
                      {
                        textDecoration:
                          leaveNature === "MEDICAL" ||
                          leaveNature === "MATERNITY"
                            ? "none"
                            : "line-through",
                      },
                    ]}
                  >
                    {" "}
                    Medical ground/
                  </Text>
                </Text>
              </View>
            </View>
            <View
              style={{
                marginTop: 5,
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "baseline",
                width: "100%",
              }}
            >
              <Text
                style={[
                  styles.text,
                  {
                    textDecoration:
                      leaveNature === "HPL" ||
                      leaveNature === "COMMUTED" ||
                      leaveNature === "LWP" ||
                      leaveNature === "CCL" ||
                      leaveNature === "PATERNITY"
                        ? "none"
                        : "line-through",
                  },
                ]}
              >
                {" "}
                private affairs.{" "}
              </Text>
            </View>
            <View
              style={{
                marginTop: 5,
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "baseline",
                width: "100%",
                marginLeft: 50,
              }}
            >
              <Text style={styles.text}>
                {" "}
                The order should be recorded in the Service Book of the
                concerned teacher.{" "}
              </Text>
            </View>
            <View
              style={{
                width: "40%",
                alignSelf: "flex-end",
                marginTop: 30,
                marginBottom: 10,
              }}
            >
              <Text style={styles.text}>Chairman,</Text>
              <Text style={styles.text}>
                District Primary School Council, Howrah
              </Text>
            </View>
            <View
              style={{
                marginTop: 5,
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "baseline",
                width: "100%",
                marginLeft: -20,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "baseline",
                  width: "60%",
                }}
              >
                <View style={{ width: "20%" }}>
                  <Text style={styles.text}>Memo No. </Text>
                </View>
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderBottomStyle: "dotted",
                    width: "50%",
                  }}
                >
                  <Text style={styles.text}> </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "baseline",
                  width: "50%",
                  marginLeft: 30,
                }}
              >
                <View style={{ width: "20%" }}>
                  <Text style={styles.text}>Date </Text>
                </View>
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderBottomStyle: "dotted",
                    width: "50%",
                  }}
                >
                  <Text style={styles.text}> </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                marginTop: 20,
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "baseline",
                width: "100%",
              }}
            >
              <Text style={styles.text}>
                Copy forwarded for information to:
              </Text>
            </View>
            <View
              style={{
                marginTop: 5,
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "baseline",
                width: "100%",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "baseline",
                  width: "60%",
                }}
              >
                <View style={{ width: "20%" }}>
                  <Text style={styles.text}>1. The D.A </Text>
                </View>
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderBottomStyle: "dotted",
                    width: "80%",
                  }}
                >
                  <Text style={styles.text}> AMTA WEST </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "baseline",
                  width: "30%",
                  marginLeft: 30,
                }}
              >
                <Text style={styles.text}> Circle, D.P.S.C., Howrah</Text>
              </View>
            </View>
            <View
              style={{
                marginTop: 5,
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "baseline",
                width: "100%",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "baseline",
                  width: "60%",
                }}
              >
                <View style={{ width: "20%" }}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "baseline",
                    }}
                  >
                    <Text style={[styles.text]}>2.</Text>
                    <Text
                      style={[
                        styles.text,
                        {
                          textDecoration:
                            gender === "male" ? "none" : "line-through",
                        },
                      ]}
                    >
                      Sri/{" "}
                    </Text>
                    <Text
                      style={[
                        styles.text,
                        {
                          textDecoration:
                            gender === "female" ? "none" : "line-through",
                        },
                      ]}
                    >
                      {" "}
                      Smt{" "}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderBottomStyle: "dotted",
                    width: "80%",
                  }}
                >
                  <Text style={styles.text}> {tname} </Text>
                </View>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "baseline",
                  width: "30%",
                }}
              >
                <Text
                  style={[
                    styles.text,
                    {
                      textDecoration: desig === "AT" ? "none" : "line-through",
                    },
                  ]}
                >
                  {" "}
                  A.T/{" "}
                </Text>

                <Text
                  style={[
                    styles.text,
                    {
                      textDecoration: desig === "HT" ? "none" : "line-through",
                    },
                  ]}
                >
                  {" "}
                  H.T/{" "}
                </Text>

                <Text
                  style={[
                    styles.text,
                    {
                      textDecoration:
                        desig !== "HT" && hoi === "Yes"
                          ? "none"
                          : "line-through",
                    },
                  ]}
                >
                  {" "}
                  T.I.C{" "}
                </Text>
                <Text style={styles.text}> of </Text>
                <Image
                  source={{
                    uri: "https://raw.githubusercontent.com/amtawestwbtpta/awwbtptadata/main/check.png",
                  }}
                  style={{
                    height: 10,
                    width: 10,
                    position: "absolute",
                    marginTop: -6,
                    marginLeft: desig === "AT" ? 10 : 43,
                  }}
                />
                {desig !== "HT" && hoi === "Yes" && (
                  <Image
                    source={{
                      uri: "https://raw.githubusercontent.com/amtawestwbtpta/awwbtptadata/main/check.png",
                    }}
                    style={{
                      height: 10,
                      width: 10,
                      position: "absolute",
                      marginTop: -6,
                      marginLeft: 78,
                    }}
                  />
                )}
              </View>
            </View>
            <View
              style={{
                marginTop: 5,
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "baseline",
                width: "100%",
                marginLeft: -10,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "baseline",
                  width: "60%",
                }}
              >
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderBottomStyle: "dotted",
                    width: "90%",
                  }}
                >
                  <Text style={styles.text}> {school} </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "baseline",
                  width: "30%",
                  marginLeft: -30,
                }}
              >
                <Text style={styles.text}>Amta West Circle, Howrah.</Text>
              </View>
            </View>
            <View
              style={{
                width: "40%",
                alignSelf: "flex-end",
                marginTop: 30,
                marginBottom: 10,
              }}
            >
              <Text style={styles.text}>Secretary,</Text>
              <Text style={styles.text}>
                District Primary School Council, Howrah
              </Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
    // </PDFViewer>
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
    fontSize: 18,
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
    fontSize: 14,
    fontWeight: "bold",
    fontFamily: "TimesBold",
    textAlign: "center",
  },
  text: {
    fontSize: 12.5,
    padding: 1,
    fontFamily: "Times",
    textAlign: "center",
  },
  text3: {
    fontSize: 12.5,
    padding: 1,
    textAlign: "center",
  },
  text2: {
    fontSize: 9,
    padding: 1,
    fontFamily: "Times",
    textAlign: "center",
  },

  tableStartBorderView: {
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    width: "100%",
    height: "auto",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },

  rowStartView: {
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0.5,
    padding: 2,
    width: "100%",
    height: "auto",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
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
