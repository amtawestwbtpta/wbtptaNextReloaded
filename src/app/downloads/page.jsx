"use client";
import React, { useEffect, useState } from "react";
import { firestore } from "../../context/FirebaseContext";
import { collection, getDocs, query } from "firebase/firestore";
import Loader from "../../components/Loader";
import { createDownloadLink } from "../../modules/calculatefunctions";
import { useGlobalContext } from "../../context/Store";

const Downloads = () => {
  const [data, setData] = useState(false);
  const { state } = useGlobalContext();
  const [allData, setAllData] = useState([]);

  const getData = async () => {
    const q = query(collection(firestore, "downloads"));

    const querySnapshot = await getDocs(q);
    const datas = querySnapshot.docs
      .map((doc) => ({
        // doc.data() is never undefined for query doc snapshots
        ...doc.data(),
        id: doc.id,
      }))
      .sort((a, b) => b.date - a.date);
    setData(true);
    setAllData(datas);
  };
  useEffect(() => {
    document.title = "WBTPTA AMTA WEST:Downloads";
    getData();
    // eslint-disable-next-line
  }, []);
  return (
    <div className="container-fluid my-5">
      <h3 className="text-primary text-center">Downloads</h3>
      {state === "admin" && (
        <button
          type="button"
          className="btn btn-sm m-3 btn-warning"
          onClick={() => {
            createDownloadLink(allData, "downloads");
          }}
        >
          Download Data
        </button>
      )}
      {data ? (
        <div className="container-fluid overflow-auto col-md-6 d-flex">
          <table className="table table-responsive table-hover table-striped table-success rounded-2 container-fluid px-lg-3 py-lg-2 ">
            <thead>
              <tr>
                <th>Sl</th>
                <th>Format</th>
                <th>File Name</th>
                <th>Download</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Our Android App</td>
                <td>APK</td>
                <td>
                  <a
                    href="https://drive.google.com/drive/folders/1QQzBMJjI_MXTKxP3_ayTo7QflGD0vbVP?usp=sharing"
                    className="btn btn-success rounded text-decoration-none"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Download
                  </a>
                </td>
              </tr>
              {allData.map((el, ind) => {
                return (
                  <tr key={ind}>
                    <td>{ind + 2}</td>
                    <td>{el.fileName.toUpperCase()}</td>
                    <td>
                      {el.fileType === "application/pdf"
                        ? "PDF"
                        : el.fileType === "application/msword"
                        ? "WORD"
                        : el.fileType ===
                          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        ? "WORD"
                        : el.fileType ===
                          "application/vnd.openxmlformats-officedocument.presentationml.presentation"
                        ? "POWERPOINT"
                        : el.fileType === "application/vnd.ms-excel"
                        ? "EXCEL"
                        : el.fileType ===
                          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                        ? "EXCEL"
                        : el.fileType ===
                          "application/vnd.ms-excel.sheet.macroEnabled.12"
                        ? "EXCEL"
                        : el.fileType === "application/vnd.ms-powerpoint"
                        ? "EXCEL"
                        : el.fileType === "application/zip"
                        ? "ZIP"
                        : el.fileType === "application/vnd.rar"
                        ? "RAR"
                        : el.fileType === "text/csv"
                        ? "CSV"
                        : el.fileType ===
                          "application/vnd.openxmlformats-officedocument.presentationml.presentation"
                        ? "POWERPOINT"
                        : ""}
                    </td>
                    <td>
                      <a
                        href={el.url}
                        className="btn btn-success rounded text-decoration-none"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Download
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Downloads;
