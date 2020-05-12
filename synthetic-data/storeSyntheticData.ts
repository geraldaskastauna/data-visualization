//Time library that we will use to increment dates.
const moment = require("moment");

//Axios will handle HTTP requests to web service
const axios = require("axios");

//Database module
import { saveData } from "./syntheticDB";

//Class that wraps synthetic data web service
export class Synthetic {
  getData(): Promise<object> {
    //Base URL of synthetic data API
    let url: string =
      "https://wi02tm8hpe.execute-api.us-east-1.amazonaws.com/dev/M00651656";
    return axios.get(url);
  }
}

//Function downloads and outputs synthetic data
async function storeSyntheticValue(startDate: string, numDays: number) {
  //Create moment date, which will enable us to add days easily.
  let date = moment(startDate);

  //Create instance of Synthetic class
  let syntheticData: Synthetic = new Synthetic();

  // Array to store values as promises
  let valueArray: Array<Promise<number>> = [];

  // Array to store dates
  let dateArray: Array<string> = [];

  // Store data from API into promises
  let promiseObject: Promise<object> = syntheticData.getData();

  // Execute all of the save data promises
  let databaseResult: object = await Promise.resolve(promiseObject);

  // Value from object
  let value: number = databaseResult["data"]["target"];

  // Work forward from start date
  for (let i: number = 0; i < numDays; ++i) {
    // Add values to array
    valueArray.push(value[i]);

    // Increase the number of days
    date.add(1, "days");

    // Get date as string from full object
    let fullDate: string = JSON.stringify(date["_d"]).substring(1, 11);
    console.log(date);

    // Add dates to array
    dateArray.push(fullDate);
  }

  try {
    // Store data into database
    let dataArray: Array<Promise<string>> = [];
    for (let i: number = 0; i < numDays; ++i) {
      dataArray.push(saveData(dateArray[i], value[i]));
    }
  } catch (error) {
    console.log(JSON.stringify(error));
  }
}
// Call function
storeSyntheticValue("2019-05-21", 500);
