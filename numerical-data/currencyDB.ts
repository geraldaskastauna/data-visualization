import { integer } from "aws-sdk/clients/cloudfront";

let AWS = require("aws-sdk");

//Configure AWS
AWS.config.update({
  region: "us-east-1",
  endpoint: "https://dynamodb.us-east-1.amazonaws.com",
});

//Create new DocumentClient
let documentClient = new AWS.DynamoDB.DocumentClient();

/* Function returns a Promise that will save the currencies with the specified date. */
export function saveData(
  date: string,
  aud: number,
  usd: number,
  jpy: number,
  cad: number,
  gbp: number
): Promise<string> {
  //Table name and data for table
  let params = {
    TableName: "CurrencyData",
    Item: {
      date: date,
      aud: aud,
      usd: usd,
      jpy: jpy,
      cad: cad,
      gbp: gbp,
    },
  };

  //Store data in DynamoDB and handle errors
  return new Promise<string>((resolve, reject) => {
    documentClient.put(params, (err, data) => {
      if (err) {
        reject("Unable to add item: " + JSON.stringify(err));
      } else {
        resolve("Item added to table with Date: " + date);
      }
    });
  });
}
