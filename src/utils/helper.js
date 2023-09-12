const upToTwenty = [
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

const tens = [
  "",
  "Ten",
  "Twenty",
  "Thirty",
  "Forty",
  "Fifty",
  "Sixty",
  "Seventy",
  "Eighty",
  "Ninety",
];

const months = new Array(
  "",
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
  "December"
);

const thousands = ["", "Thousand and", "Million and", "Billion and"];

function numToWords(num) {
  // convert the input number to a string
  // if the number is bigger than 12 places
  // return 0 it would be too big
  if (num.toString().length > 12) return "TOO BIG";

  if (num === 0) {
    return 0;
  }

  let counter = 0;
  // crete a results string ''
  let res = "";
  // We have strings representations

  // while the number is > 0
  while (num > 0) {
    // the number is % 1000 not 0
    // set out results sting equal to helper(current Num%1000) + counter a res
    if (num % 1000 !== 0) {
      res = `${getNums(num % 1000)} ${thousands[counter]} ${res}`;
    }
    // num = num/1000
    // counter++
    num = Math.floor(num / 1000);
    counter++;
  }

  return res;
}

const getNums = (number) => {
  // if the number is 0
  // return '';
  if (number === 0) {
    return "";
  } else if (number < 20) {
    return upToTwenty[number];
  } else if (number < 100) {
    return `${tens[Math.floor(number / 10)]} ${getNums(number % 10)}`;
  } else {
    return `${upToTwenty[Math.floor(number / 100)]} Hundred ${getNums(
      number % 100
    )}`;
  }
};
const dateInWords = (dob) => {
  //28-04-2003
  let day = String(dob).substring(0, 2);
  let mon = String(dob).substring(3, 5);
  let year = String(dob).substring(6);
  return (
    numToWords(parseInt(day)) +
    months[parseInt(mon)] +
    " " +
    numToWords(parseInt(year))
  );
};

const formatDate = (date) => {
  let dob = new String(date);
  if (dob.length == 6) return dob;
  else {
    let dobList = new Array();
    if (dob.includes("-")) dobList = dob.split("-");
    else if (dob.includes("/")) dobList = dob.split("/");
    else dobList = dob.split(".");

    let day = new String(dobList[0]);
    let mon = new String(dobList[1]);
    let year = new String(dobList[2]);

    if (day.length == 1) day = "0" + day;
    if (mon.length == 1) mon = "0" + mon;

    let newDob = day + "/" + mon + "/" + year;
    return newDob;
  }
};

const capitaliseName = (fullName) => {
  let fullnamearr = new String(fullName).toLowerCase().split(" ");
  let fname = fullnamearr[0];
  let mname = fullnamearr[1];
  let lname = fullnamearr[2];
  fname = fname.charAt(0).toUpperCase() + fname.substring(1);
  mname = mname.charAt(0).toUpperCase() + mname.substring(1);
  lname = lname.charAt(0).toUpperCase() + lname.substring(1);
  return fname + " " + mname + " " + lname;
};

export { dateInWords, formatDate, capitaliseName };
