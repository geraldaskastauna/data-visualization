//Time library that we will use to increment dates.
const moment = require("moment");

//Axios will handle HTTP requests to web service
const axios = require("axios");

//Reads keys from .env file
const dotenv = require("dotenv");

//Database module
import { saveData } from "./currencyDB";

//Copy variables in file into environment variables
dotenv.config();

//Class that wraps fixer.io web service
export class Fixer {
  //Base URL of fixer.io API
  baseURL: string = "http://data.fixer.io/api/";

  //Returns a Promise that will get the exchange rates for the specified date
  getExchangeRates(date: string): Promise<object> {
    //Build URL for API call
    let url: string = this.baseURL + date + "?";
    url += "access_key=" + process.env.FIXERIO_API_KEY;
    url += "&symbols=AUD,USD,JPY,CAD,GBP";

    //Output URL and return Promise
    console.log("Building fixer.io Promise with URL: " + url);
    return axios.get(url);
  }
}

//Gets the historical data for a range of dates.
async function getHistoricalData(startDate: string, numDays: number) {
  //Create moment date, which will enable us to add days easily.
  let date = moment(startDate);

  //Create instance of Fixer.io class
  let fixerIo: Fixer = new Fixer();

  //Array to hold promises
  let promiseArray: Array<Promise<object>> = [];

  //Work forward from start date
  for (let i: number = 0; i < numDays; ++i) {
    //Add axios promise to array
    promiseArray.push(fixerIo.getExchangeRates(date.format("YYYY-MM-DD")));

    //Increase the number of days
    date.add(1, "days");
  }

  //Wait for all promises to execute
  try {
    let resultArray: Array<object> = await Promise.all(promiseArray);

    //Output the data
    let dataArray: Array<Promise<string>> = [];
    resultArray.forEach((result) => {
      console.log(result);
      //data contains the body of the web service response
      let data: FixerObject = result["data"];

      //Check that API call succeeded.
      if (data.success != true) {
        console.log("Error: " + JSON.stringify(data.error));
      } else {
        //Output the result - you should put this data in the database
        console.log(
          "Date: " +
            data.date +
            " AUD: " +
            data.rates.AUD +
            " USD: " +
            data.rates.USD +
            " JPY: " +
            data.rates.JPY +
            " CAD: " +
            data.rates.CAD +
            " GBP: " +
            data.rates.GBP
        );

        dataArray.push(
          saveData(
            data.date,
            data.rates.AUD,
            data.rates.USD,
            data.rates.JPY,
            data.rates.CAD,
            data.rates.GBP
          )
        );
      }
    });
    //Execute all of the save data promises
    let databaseResult: Array<string> = await Promise.all(dataArray);
    console.log("Database result: " + JSON.stringify(databaseResult));
  } catch (error) {
    console.log("Error: " + JSON.stringify(error));
  }
}

//Call function to get historical data
getHistoricalData("2017-06-01", 500);
