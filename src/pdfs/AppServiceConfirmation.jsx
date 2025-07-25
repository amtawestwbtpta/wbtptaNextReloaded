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

export default function AppServiceConfirmation({ data }) {
  return (
    <Document
      style={{ margin: 5, padding: 5 }}
      title={`Service Confirmation Application Form`}
    >
      {data.map((teacher, index) => (
        <Page size="A4" orientation="portrait" style={styles.page} key={index}>
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
              <Text style={styles.ben}>
                বিষয়: নিয়োগ দৃঢ়ীকরনের (Service Confirmation) জন্য আবেদন পত্র।
              </Text>
            </View>
            <Text style={styles.ben}>মহাশয়,</Text>

            <Text style={[styles.ben, { textIndent: 35 }]}>
              আমার নিরবচ্ছিন্ন শিক্ষকতার কার্যকালের মেয়াদ দুই বৎসর অতিক্রান্ত।
              আমার নিয়োগের দৃঢ়ীকরনের (Confirmation) আবেদন জানাচ্ছি। নিম্নে
              বিস্তারিত দেওয়া হলো-
            </Text>
            <View
              style={{
                marginTop: 5,
                alignSelf: "center",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Text style={styles.ben}>নামঃ</Text>
              <View
                style={{
                  marginLeft: 20,
                  borderBottomWidth: 2,
                  borderBottomColor: "black",
                  borderBottomStyle: "dotted",
                  width: "60%",
                  padding: 0,
                }}
              >
                <Text
                  style={[styles.text, { marginLeft: 30, marginBottom: -5 }]}
                >
                  {teacher?.tname}
                </Text>
              </View>
            </View>
            <View>
              <Text style={styles.ben}>
                কোন শ্রেনীতে নিয়োগঃ (A) (B) ( {`  চিহ্ন দিন`})
              </Text>
              <Image
                source={{
                  uri: "https://raw.githubusercontent.com/amtawestwbtpta/awwbtptadata/main/check.png",
                }}
                style={[styles.checkImage, { marginLeft: 188, marginTop: 10 }]}
              />
            </View>
            <Text style={styles.ben}>
              পিতা / স্বামীর নামঃ ………………………………………………………………………………………………,
            </Text>
            <View
              style={{
                marginTop: 5,
                alignSelf: "center",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Text style={styles.ben}>চক্রঃ </Text>
              <View
                style={{
                  marginLeft: 20,
                  borderBottomWidth: 2,
                  borderBottomColor: "black",
                  borderBottomStyle: "dotted",
                  width: "60%",
                  padding: 0,
                }}
              >
                <Text
                  style={[styles.text, { marginLeft: 30, marginBottom: -5 }]}
                >
                  AMTA WEST
                </Text>
              </View>
            </View>
            <View
              style={{
                marginTop: 5,
                alignSelf: "center",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Text style={styles.ben}>বিদ্যালয়ঃ </Text>
              <View
                style={{
                  marginLeft: 20,
                  borderBottomWidth: 2,
                  borderBottomColor: "black",
                  borderBottomStyle: "dotted",
                  width: "80%",
                  padding: 0,
                }}
              >
                <Text
                  style={[styles.text, { marginLeft: 30, marginBottom: -5 }]}
                >
                  {teacher?.school}
                </Text>
              </View>
            </View>
            <Text style={styles.ben}>
              নিয়োগের পত্রাংকঃ ………………………….……..……….., দিনাংকঃ
              ……………………..…………..…..,
            </Text>
            <View
              style={{
                marginTop: 5,
                alignSelf: "center",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Text style={styles.ben}>যোগদানের তারিখঃ </Text>
              <View
                style={{
                  marginLeft: 20,
                  borderBottomWidth: 2,
                  borderBottomColor: "black",
                  borderBottomStyle: "dotted",
                  width: "50%",
                  padding: 0,
                }}
              >
                <Text
                  style={[styles.text, { marginLeft: 30, marginBottom: -5 }]}
                >
                  {teacher?.doj}
                </Text>
              </View>
            </View>
            <View
              style={{
                marginTop: 5,
                alignSelf: "center",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Text style={styles.ben}>
                কার্যকালের নিরবচ্ছিন্ন দুই বৎসর মেয়াদ উত্তীর্ণের তারিখঃ{" "}
              </Text>
              <View
                style={{
                  marginLeft: 20,
                  borderBottomWidth: 2,
                  borderBottomColor: "black",
                  borderBottomStyle: "dotted",
                  width: "30%",
                  padding: 0,
                }}
              >
                <Text
                  style={[styles.text, { marginLeft: 30, marginBottom: -5 }]}
                >
                  {teacher?.doj?.slice(0, 2)}-{teacher?.doj?.slice(3, 5)}-
                  {parseInt(teacher?.doj?.slice(6, 10)) + 2}
                </Text>
              </View>
            </View>
            <View
              style={{
                marginTop: 40,
                alignSelf: "center",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Text style={styles.ben}>তারিখঃ</Text>
              <View
                style={{
                  marginLeft: 20,
                  borderBottomWidth: 2,
                  borderBottomColor: "black",
                  borderBottomStyle: "dotted",
                  width: "30%",
                  padding: 0,
                }}
              ></View>
              <View
                style={{
                  marginLeft: 300,
                  width: "30%",
                  padding: 0,
                }}
              >
                <Text style={styles.ben}>স্বাক্ষর</Text>
              </View>
            </View>
          </View>
        </Page>
      ))}
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
    width: "98%",
    height: "98%",
  },
  title: {
    fontSize: 16,
    fontFamily: "TimesBold",
    textAlign: "center",
  },
  text: {
    marginTop: 5,
    fontSize: 16,
    fontFamily: "Times",
    textAlign: "left",
    lineHeight: 1.5,
  },
  ben: {
    marginTop: 5,
    fontSize: 16,
    fontFamily: "Kalpurush",
    textAlign: "left",
    lineHeight: 1.5,
  },
  underLineText: {
    marginTop: 5,
    textDecoration: "underline",
    textDecorationStyle: "dotted",
    fontSize: 16,
    fontFamily: "Times",
    textAlign: "left",
    lineHeight: 1.5,
  },
  checkImage: {
    width: 10,
    height: 10,
    position: "absolute",
    marginTop: -7,
  },
});
Font.register({
  family: "Times",
  src: "https://raw.githubusercontent.com/amtawestwbtpta/awwbtptadata/main/times.ttf",
});
Font.register({
  family: "Kalpurush",
  src: "https://raw.githubusercontent.com/usprys/usprysdata/main/kalpurush.ttf",
});
