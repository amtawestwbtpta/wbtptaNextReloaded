import axios from "axios";
import { DA, HRA } from "./constants";
import bcrypt from "bcryptjs";
import * as XLSX from "xlsx";
export const comparePassword = (userPassword, serverPassword) => {
  let match = bcrypt.compareSync(userPassword, serverPassword);

  return match;
};
export const encryptPassword = async (password) =>
  await bcrypt.hashSync(password, 10);
export function round2dec(value) {
  if (value % 1 !== 0) {
    return Number(Math.round(value + "e" + 2) + "e-" + 2).toFixed(2);
  } else {
    return value;
  }
}
export function excelCeilingRound(number, multiplier) {
  const rounded = Math.round(number); // Step 1: Round to the nearest integer
  return Math.ceil(rounded / multiplier) * multiplier; // Step 2: Round up to the nearest multiple
}
export function NumInWords(number) {
  const first = [
    "",
    "one ",
    "two ",
    "three ",
    "four ",
    "five ",
    "six ",
    "seven ",
    "eight ",
    "nine ",
    "ten ",
    "eleven ",
    "twelve ",
    "thirteen ",
    "fourteen ",
    "fifteen ",
    "sixteen ",
    "seventeen ",
    "eighteen ",
    "nineteen ",
  ];
  const tens = [
    "",
    "",
    "twenty",
    "thirty",
    "forty",
    "fifty",
    "sixty",
    "seventy",
    "eighty",
    "ninety",
  ];
  const mad = ["", "thousand", "million", "billion", "trillion"];
  let word = "";

  for (let i = 0; i < mad.length; i++) {
    let tempNumber = number % (100 * Math.pow(1000, i));
    if (Math.floor(tempNumber / Math.pow(1000, i)) !== 0) {
      if (Math.floor(tempNumber / Math.pow(1000, i)) < 20) {
        word = titleCase(
          first[Math.floor(tempNumber / Math.pow(1000, i))] +
            mad[i] +
            " " +
            word
        );
      } else {
        word = titleCase(
          tens[Math.floor(tempNumber / (10 * Math.pow(1000, i)))] +
            " " +
            first[Math.floor(tempNumber / Math.pow(1000, i)) % 10] +
            mad[i] +
            " " +
            word
        );
      }
    }

    tempNumber = number % Math.pow(1000, i + 1);
    if (Math.floor(tempNumber / (100 * Math.pow(1000, i))) !== 0)
      word = titleCase(
        first[Math.floor(tempNumber / (100 * Math.pow(1000, i)))] +
          "hunderd " +
          word
      );
  }
  return word;
}

export function titleCase(str) {
  if (str) {
    str = str?.toLowerCase().split(" ");
    for (var i = 0; i < str.length; i++) {
      str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
    }
    return str.join(" ");
  } else {
    return "";
  }
}

export function percentTotal(value) {
  if (value >= 90) {
    return "A+";
  } else if (value >= 80) {
    return "A";
  } else if (value >= 70) {
    return "B+";
  } else if (value >= 60) {
    return "B";
  } else if (value >= 45) {
    return "C+";
  } else if (value >= 25) {
    return "C";
  } else {
    return "D";
  }
}

export const ptaxCalc = (gross) => {
  if (gross > 40000) {
    return 200;
  } else if (gross > 25000) {
    return 150;
  } else if (gross > 15000) {
    return 130;
  } else if (gross > 10000) {
    return 110;
  } else {
    return 0;
  }
};

export const gross = (basic, addl) => {
  let da = Math.round(basic * DA);
  let hra = Math.round(basic * HRA);
  return basic + da + hra + addl;
};
export const netpay = (basic, addl, disability, gpf, gsli) => {
  if (disability) {
    if (gsli) {
      return gross(basic, addl) - gpf - gsli;
    } else {
      return gross(basic, addl) - gpf;
    }
  } else {
    if (gsli) {
      return gross(basic, addl) - gpf - gsli - ptaxCalc(gross(basic, addl));
    } else {
      return gross(basic, addl) - gpf - ptaxCalc(gross(basic, addl));
    }
  }
};

export const funchra = (basic) => {
  return Math.round(basic * HRA);
};
export const funcda = (basic) => {
  return Math.round(basic * DA);
};

export const funcmda = (basic) => {
  if (basic === 24700 || basic === 28900) {
    return Math.round(basic * DA);
  } else {
    return Math.round(RoundTo(basic - basic * 0.03, 100) * DA);
  }
};
export const funcmhra = (basic) => {
  if (basic === 24700 || basic === 28900) {
    return Math.round(basic * HRA);
  } else {
    return Math.round(RoundTo(basic - basic * 0.03, 100) * HRA);
  }
};

export function findEmptyValues(obj) {
  const emptyValues = {};

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      if (
        value === null ||
        value === undefined ||
        value === "" ||
        (Array.isArray(value) && value.length === 0) ||
        (typeof value === "object" && Object.keys(value).length === 0)
      ) {
        emptyValues[key] = value;
      }
    }
  }

  return emptyValues;
}

function isEmpty(value) {
  return (
    value === null ||
    value === undefined ||
    value === "" ||
    (Array.isArray(value) && value.length === 0) ||
    (typeof value === "object" && Object.keys(value).length === 0)
  );
}

export function validateEmptyValues(obj) {
  const emptyFields = {};

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (isEmpty(obj[key])) {
        emptyFields[key] = "Field is empty";
      }
    }
  }

  return emptyFields;
}
export function isEmptyObject(obj) {
  // Check if the argument is an object
  if (typeof obj !== "object" || obj === null) {
    return false; // or throw an error if you prefer
  }

  // For ES5+ environments
  return Object.keys(obj).length === 0;

  // Alternative for all environments:
  // for (var key in obj) {
  //   if (obj.hasOwnProperty(key)) {
  //     return false;
  //   }
  // }
  // return true;
}
export function isFileEmpty(file) {
  // Check if file exists
  if (!file) return true;

  // Check if it's a File or Blob object
  if (!(file instanceof File) && !(file instanceof Blob)) {
    return true;
  }

  // Check size (in bytes)
  return file.size <= 0;
}
export function roundSo(number, to) {
  return Math.round(number / to, 0) * to;
}
export function randBetween(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export const RoundTo = (number, multiple) => {
  // Calculate the remainder when number is divided by multiple
  var remainder = number % multiple;

  // If remainder is less than half of multiple, round down
  // Otherwise, round up
  if (remainder < multiple / 2) {
    return number - remainder;
  } else {
    return number + multiple - remainder;
  }
};
export const CalculateIncomeTax = (totalTaxableIncome) => {
  return totalTaxableIncome > 1000000
    ? Math.round(12500 + 100000 + ((totalTaxableIncome - 1000000) * 30) / 100)
    : totalTaxableIncome > 500000
    ? Math.round(12500 + ((totalTaxableIncome - 500000) * 20) / 100)
    : totalTaxableIncome > 250000
    ? Math.round(((totalTaxableIncome - 250000) * 5) / 100)
    : totalTaxableIncome < 250000
    ? 0
    : 0;
};
export function CalculateNewIncomeTax(taxableIncome) {
  // Tax slabs for the new tax regime in India (FY 2023-24)
  const taxSlabs = [
    { slab: 300000, rate: 0 },
    { slab: 700000, rate: 0.05 },
    { slab: 1000000, rate: 0.1 },
    { slab: 1200000, rate: 0.15 },
    { slab: 1500000, rate: 0.2 },
    { slab: Infinity, rate: 0.3 }, // Infinity for any income above 15 lakhs
  ];

  let incomeTax = 0;
  let remainingIncome = taxableIncome;

  // Iterate through the tax slabs
  for (let i = 0; i < taxSlabs.length; i++) {
    const slab = taxSlabs[i];
    const taxableAmount = Math.min(
      remainingIncome,
      slab.slab - (i > 0 ? taxSlabs[i - 1].slab : 0)
    );
    incomeTax += taxableAmount * slab.rate;
    remainingIncome -= taxableAmount;

    if (remainingIncome <= 0) {
      break; // No more income to tax
    }
  }

  return incomeTax;
}
export function GetMonthName(monthNumber) {
  monthNumber = monthNumber < 0 ? 11 : monthNumber;
  var months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return months[monthNumber];
}

export function printDate() {
  const date = new Date();
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();
  const nthNumber = (number) => {
    return number > 0
      ? ["th", "st", "nd", "rd"][
          (number > 3 && number < 21) || number % 10 > 3 ? 0 : number % 10
        ]
      : "";
  };

  return `${day}${nthNumber(day)} of ${month}, ${year}`;
}
export const getCurrentDateInput = (date) => {
  if (date) {
    let data = date.split("-");
    let day = data[0];
    let month = data[1];
    let year = data[2];
    return `${year}-${month}-${day}`;
  }
};
export const getSubmitDateInput = (date) => {
  if (date) {
    let data = date.split("-");
    let day = data[2];
    let month = data[1];
    let year = data[0];
    return `${day}-${month}-${year}`;
  }
};
export const getSubmitDateSlashInput = (date) => {
  if (date) {
    let data = date.split("/");
    let day = data[1];
    let month = data[0];
    let year = data[2];
    if (parseInt(day) < 10) {
      day = "0" + day;
    }
    if (parseInt(month) < 10) {
      month = "0" + month;
    }
    return `${year}-${month}-${day}`;
  }
};

export const todayInString = () => {
  const date = new Date();
  let day = date.getDate();
  if (day < 10) {
    day = "0" + day;
  }
  let month = date.getMonth() + 1;
  if (month < 10) {
    month = "0" + month;
  }
  let year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

export const IndianFormat = (x) => {
  if (x !== undefined) {
    x = x.toString();
    var afterPoint = "";
    if (x.indexOf(".") > 0) afterPoint = x.substring(x.indexOf("."), x.length);
    x = Math.floor(x);
    x = x.toString();
    var lastThree = x.substring(x.length - 3);
    var otherNumbers = x.substring(0, x.length - 3);
    if (otherNumbers !== "") lastThree = "," + lastThree;
    return (
      otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") +
      lastThree +
      afterPoint
    );
  } else return;
};

export function INR(input) {
  const rupees = Number(parseInt(input, 10));
  const output = [];

  if (rupees === 0) {
    output.push("zero");
  } else if (rupees === 1) {
    output.push("one");
  } else {
    const crores = Math.floor(rupees / 10000000) % 100;
    if (crores > 0) {
      output.push(`${getHundreds(crores)} Crore`);
    }

    const lakhs = Math.floor(rupees / 100000) % 100;
    if (lakhs > 0) {
      output.push(`${getHundreds(lakhs)} Lakh`);
    }

    const thousands = Math.floor(rupees / 1000) % 100;
    if (thousands > 0) {
      output.push(`${getHundreds(thousands)} Thousand`);
    }

    const hundreds = Math.floor((rupees % 1000) / 100);
    if (hundreds > 0 && hundreds < 10) {
      output.push(`${getOnes(hundreds)} Hundred`);
    }

    const tens = rupees % 100;
    if (tens > 0) {
      if (rupees > 100) output.push("and");
      output.push(`${getHundreds(tens)}`);
    }
  }

  return ["Rupees", ...output, "only"]
    .join(" ")
    .split(/\s/)
    .filter((e) => e)
    .map((e) => e.substr(0, 1) + e.substr(1))
    .join(" ");
}

function getOnes(number) {
  const ones = [
    "",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
  ];
  return ones[number] || "";
}

function getTeens(number) {
  const teens = [
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
  ];
  return teens[number] || "";
}

function getTens(number) {
  const tens = [
    "",
    "",
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety",
  ];
  return tens[number] || "";
}

function getHundreds(num) {
  if (num > 0 && num < 10) {
    return getOnes(num);
  }
  if (num >= 10 && num < 20) {
    return getTeens(num % 10);
  }
  if (num >= 20 && num < 100) {
    return `${getTens(Math.floor(num / 10))}${
      getOnes(num % 10) !== "" ? "-" : " "
    }${getOnes(num % 10)}`;
  }
  return "";
}

export const calculateRetirementDate = (joiningDate) => {
  const joinedYear = parseInt(joiningDate.substring(0, 4), 10);
  const joinedMonth = parseInt(joiningDate.substring(5, 7), 10);
  const currentYear = new Date().getFullYear();
  const retirementYear = joinedYear + 60;

  let retirementMonth = joinedMonth;
  let retirementDay = new Date(retirementYear, retirementMonth, 0).getDate();

  if (currentYear >= retirementYear) {
    retirementMonth = 12;
    retirementDay = new Date(retirementYear, retirementMonth, 0).getDate();
  }

  if (new Date(joiningDate).getDate() === 1) {
    return `${retirementDay.toString().padStart(2, "0")}-${(retirementMonth - 1)
      .toString()
      .padStart(2, "0")}-${retirementYear}`;
  } else {
    return `${retirementDay.toString().padStart(2, "0")}-${retirementMonth
      .toString()
      .padStart(2, "0")}-${retirementYear}`;
  }
};

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export const finMonths = [
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
  "January",
  "February",
  "March",
];
export const getMonthDays = [31, 30, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

export const generateID = () => {
  const capitalAlphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";

  let randomCode = "";

  for (let i = 0; i < 4; i++) {
    const randomIndex = Math.floor(Math.random() * capitalAlphabets.length);
    randomCode += capitalAlphabets[randomIndex];
  }

  for (let i = 0; i < 4; i++) {
    const randomIndex = Math.floor(Math.random() * numbers.length);
    randomCode += numbers[randomIndex];
  }

  return randomCode;
};
export function compareObjects(x, y) {
  if (x === y) return true;
  // if both x and y are null or undefined and exactly the same

  if (!(x instanceof Object) || !(y instanceof Object)) return false;
  // if they are not strictly equal, they both need to be Objects

  if (x.constructor !== y.constructor) return false;
  // they must have the exact same prototype chain, the closest we can do is
  // test there constructor.

  for (var p in x) {
    if (!x.hasOwnProperty(p)) continue;
    // other properties were tested using x.constructor === y.constructor

    if (!y.hasOwnProperty(p)) return false;
    // allows to compare x[ p ] and y[ p ] when set to undefined

    if (x[p] === y[p]) continue;
    // if they have the same strict value or identity then they are equal

    if (typeof x[p] !== "object") return false;
    // Numbers, Strings, Functions, Booleans must be strictly equal

    if (!compareObjects(x[p], y[p])) return false;
    // Objects and Arrays must be tested recursively
  }

  for (p in y) if (y.hasOwnProperty(p) && !x.hasOwnProperty(p)) return false;
  // allows x[ p ] to be set to undefined

  return true;
}

export const DateValueToSring = (dateValue) => {
  if (dateValue) {
    let date = new Date(dateValue);
    return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()} At ${
      date.getHours() > 12 ? date.getHours() - 12 : date.getHours()
    }:${date.getMinutes()}:${date.getSeconds()} ${
      date.getHours() > 12 ? "PM" : "AM"
    }`;
  }
};
export function removeDuplicates(books) {
  // Create an array of objects

  // Declare a new array
  let newArray = [];

  // Declare an empty object
  let uniqueObject = {};
  let objTitle;
  // Loop for the array elements
  for (let i in books) {
    // Extract the title
    objTitle = books[i]["id"];

    // Use the title as the index
    uniqueObject[objTitle] = books[i];
  }

  // Loop to push unique object into array
  for (let i in uniqueObject) {
    newArray.push(uniqueObject[i]);
  }

  // Display the unique objects
  return newArray;
}
export function removeDuplicateValues(books) {
  // Create an array of objects

  // Declare a new array
  let newArray = [];

  // Declare an empty object
  let uniqueObject = {};
  let objTitle;
  // Loop for the array elements
  for (let i in books) {
    // Extract the title
    objTitle = books[i]["value"];

    // Use the title as the index
    uniqueObject[objTitle] = books[i];
  }

  // Loop to push unique object into array
  for (let i in uniqueObject) {
    newArray.push(uniqueObject[i]);
  }

  // Display the unique objects
  return newArray;
}
export function uniq(a) {
  return a.sort().filter(function (item, pos, ary) {
    return !pos || item !== ary[pos - 1];
  });
}

// Function to retrieve values from second array using keys from the first array
export const getValues = (firstArray, secondArray, sl) => {
  return secondArray.map((obj, index) => {
    return (
      <tr className="text-center" key={index}>
        <td className="text-center">{sl + index + 1}</td>
        {firstArray.map((key, i) => (
          <td className="text-center" key={i}>
            {obj.hasOwnProperty(key) ? obj[key] : null}
          </td>
        ))}
      </tr>
    );
  });
};

export const getServiceAge = (date) => {
  if (!date) return "";
  let currentDate = Date.now();
  let birthDate = Date.parse(getCurrentDateInput(date));
  let yearInMillis = 31556926000;
  let age = Math.floor((currentDate - birthDate) / yearInMillis);
  return age;
};
export const getServiceLife = (date) => {
  if (!date) return "";
  let currentDate = Date.now();
  let birthDate = Date.parse(getCurrentDateInput(date));
  let yearInMillis = 31556926000;
  let monthinMillis = 2629800000;
  let age = Math.floor((currentDate - birthDate) / yearInMillis);
  let months = Math.floor(
    ((currentDate - birthDate) % yearInMillis) / monthinMillis
  );
  if (age) {
    return `${age} years ${months} months`;
  } else {
    return `${months} months`;
  }
};
export const getRetirementLife = (doj, dor) => {
  if (!doj || !dor) return "";
  let joiningDate = Date.parse(getCurrentDateInput(doj));
  let retirementDate = Date.parse(getCurrentDateInput(dor));
  let yearInMillis = 31556926000;
  let monthinMillis = 2629800000;
  let age = Math.floor((retirementDate - joiningDate) / yearInMillis);
  let months = Math.floor(
    ((retirementDate - joiningDate) % yearInMillis) / monthinMillis
  );
  if (age) {
    return `${age} years ${months} months`;
  } else {
    return `${months} months`;
  }
};
export const filterArrayExtraItems = (x, y) => {
  return x.filter((item) => !y.includes(item));
};
export const filterArraySameItems = (x, y) => {
  return x.filter((item) => y.includes(item));
};
export const uniqArray = (a) => [...new Set(a)];
export const monthNamesWithIndex = [
  { monthName: "January", index: "01", rank: 1, shortName: "Jan" },
  { monthName: "February", index: "02", rank: 2, shortName: "Feb" },
  { monthName: "March", index: "03", rank: 3, shortName: "Mar" },
  { monthName: "April", index: "04", rank: 4, shortName: "Apr" },
  { monthName: "May", index: "05", rank: 5, shortName: "May" },
  { monthName: "June", index: "06", rank: 6, shortName: "Jun" },
  { monthName: "July", index: "07", rank: 7, shortName: "Jul" },
  { monthName: "August", index: "08", rank: 8, shortName: "Aug" },
  { monthName: "September", index: "09", rank: 9, shortName: "Sep" },
  { monthName: "October", index: "10", rank: 10, shortName: "Oct" },
  { monthName: "November", index: "11", rank: 11, shortName: "Nov" },
  { monthName: "December", index: "12", rank: 12, shortName: "Dec" },
];

export const createDownloadLink = (myData, fileName) => {
  const json = JSON.stringify(myData, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const href = URL.createObjectURL(blob);

  // create "a" HTLM element with href to file
  const link = document.createElement("a");
  link.href = href;
  link.download = fileName + ".json";
  document.body.appendChild(link);
  link.click();

  // clean up "a" element & remove ObjectURL
  document.body.removeChild(link);
  URL.revokeObjectURL(href);
};
export function round5(x) {
  return Math.ceil(x / 5) * 5;
}

export const setInputNumberMaxLength = (value, maxLength) => {
  if (value) {
    if (value.length > maxLength) {
      return value.slice(0, maxLength);
    } else {
      return value;
    }
  }
};

export const btnArray = [
  { label: "Add", color: "success" },
  { label: "Edit", color: "warning" },
  { label: "Delete", color: "danger" },
  { label: "View", color: "info" },
  { label: "Print", color: "primary" },
  { label: "Export", color: "dark" },
  { label: "Import", color: "light" },
  { label: "Save", color: "secondary" },
  { label: "Reset", color: "light" },
  { label: "Search", color: "info" },
  { label: "Refresh", color: "warning" },
  { label: "Download", color: "primary" },
  { label: "Upload", color: "success" },
  { label: "Send", color: "info" },
  { label: "Receive", color: "warning" },
  { label: "Forward", color: "danger" },
];

export const sortMonthwise = (arr) => {
  return arr.sort((a, b) => {
    // Assuming 'month' is the key in the object which contains the month name
    const monthA = months.indexOf(a.month);
    const monthB = months.indexOf(b.month);

    return monthA - monthB;
  });
};
export function formatDate(timestamp) {
  const input = !isNaN(timestamp) ? parseInt(timestamp, 10) : timestamp;
  const date = new Date(input);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}
export function formatDateAndTime(timestamp) {
  const input = !isNaN(timestamp) ? parseInt(timestamp, 10) : timestamp;
  const date = new Date(input);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  const hours = date.getHours() % 12 || 12; // Handle 0 (midnight) as 12
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = date.getHours() >= 12 ? "PM" : "AM";
  return `${day}-${month}-${year} At ${hours}:${minutes} ${ampm}`;
}

export const calStrLength = (value) => {
  if (value) {
    return value.toString().length;
  } else {
    return 0;
  }
};
export const readCSVFile = async (fileName) => {
  const response = await axios.get(
    `https://raw.githubusercontent.com/amtawestwbtpta/salaryRemodified/main/${fileName}.csv`
  );
  const { data: text } = response;
  const rows = text.split("\n").filter((row) => row.trim());

  if (!rows.length) return;

  const headers = rows[0].split(",").map((h) => h.trim());
  const parsedData = rows.slice(1).map((row) => {
    const values = row.split(",");
    return headers.reduce((obj, header, i) => {
      obj[header] = convertValue(values[i]);
      return obj;
    }, {});
  });
  return parsedData;
};
// Convert CSV string values to proper types
const convertValue = (value = "") => {
  const str = value.trim();
  if (!isNaN(str) && str !== "") return Number(str);
  if (str.toLowerCase() === "TRUE") return true;
  if (str.toLowerCase() === "FALSE") return false;
  return str;
};
export const readExcelData = async (fileName) => {
  try {
    const response = await axios.get(
      `https://raw.githubusercontent.com/amtawestwbtpta/salaryRemodified/main/${fileName}.xlsx`,
      { responseType: "arraybuffer" }
    );

    const arrayBuffer = response.data;
    const workbook = XLSX.read(arrayBuffer, { type: "array" });

    // Get first sheet name
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    // Convert to JSON with automatic type detection
    const jsonData = XLSX.utils.sheet_to_json(worksheet, {
      raw: false, // Use raw values (true for numbers/dates)
      dateNF: "dd-mm-yyyy", // Date format
      defval: null, // Default value for empty cells
      blankrows: false, // Skip empty rows
    });

    return jsonData;
  } catch (err) {
    return Promise.reject(`Error fetching Excel data: ${err.message}`);
  } finally {
    console.log("Excel data fetch completed.");
  }
};
export const sliceArrayIntoChunks = (array, maxChunkSize) => {
  // If array length is 24 or less, return it as a single chunk
  if (array.length <= maxChunkSize) {
    return [array];
  }

  const result = [];
  const numberOfChunks = Math.ceil(array.length / maxChunkSize);

  for (let i = 0; i < numberOfChunks; i++) {
    const startIndex = i * maxChunkSize;
    const endIndex = startIndex + maxChunkSize;
    const chunk = array.slice(startIndex, endIndex);
    result.push(chunk);
  }

  return result;
};
