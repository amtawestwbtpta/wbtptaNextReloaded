import {
  BOT_API_TOKEN,
  MEMBER_GROUP_ID,
  MESSAGING_KEY,
} from "../modules/constants";
import axios from "axios";
import { firestore } from "../context/FirebaseContext";
import { collection, getDocs, query } from "firebase/firestore";
import { decryptData } from "./encryption";

export const sendNotifications = async (token, title, body) => {
  var data = JSON.stringify({
    data: {},
    notification: {
      body: body,
      title: title,
    },
    to: token,
  });
  var config = {
    method: "post",
    url: "https://fcm.googleapis.com/fcm/send",
    headers: {
      Authorization: `key=${decryptData(MESSAGING_KEY)}`,
      "Content-Type": "application/json",
    },
    data: data,
  };
  await axios(config)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  console.log(token, title, body);
};

export const notifyAll = async (title, body) => {
  await getDocs(query(collection(firestore, "tokens"))).then(
    async (snapshot) => {
      const datas = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      datas.map((el) => sendNotifications(el.token, title, body));
      await sendToTelegram(title + "\n" + body);
    }
  );
};
export const notifyAllApp = async (title, body) => {
  await getDocs(query(collection(firestore, "tokens"))).then(
    async (snapshot) => {
      const datas = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      datas.map((el) => sendNotifications(el.token, title, body));
    }
  );
};

export const sendToTelegram = async (message) => {
  try {
    const response = await axios.post(
      `https://api.telegram.org/bot${BOT_API_TOKEN}/sendMessage`,
      {
        chat_id: MEMBER_GROUP_ID, // Replace 'CHAT_ID' with your actual chat ID
        text: message,
      }
    );
    // console.log('Message sent:', response.data);
  } catch (error) {
    // console.error('Error sending message:', error);
  }
};
