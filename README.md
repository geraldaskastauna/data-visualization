# Forex Data Visualization

## Author:
Geraldas Kastauna\
http://www.geraldaskastauna.com

## About this project
A data visualization website that was made using:\ 
1. Forex (https://fixer.io/) historical data API and student unique synthetic data provided by the lecturer.
2. Twitter Developers API.
3. Amazon Web Service (AWS) tools (DynamoDB, S3, Lambda, SageMaker, CloudWatch, API Gateway).
\
A website that provides US Dollar(USD), Canadian Dollar(CAD), Japanese Yen(JPY), Pound Sterling(GBP) and Australian Dollar(AUD) historic data visualization\
**from 2018-01-01 till around 2019-05**. It also has a sentiment analysis visualization of tweets from all over twitter that had mentioned any of these currencies\
The sentiment analysis was done using AWS Comprehend and AWS Lambda functions.\
There is also prediction of the next 100 days made for each currency change using AWS SageMaker machine learning service, but they are NOT visualized (find more in ml-files folder)\
Everything is connected and done through AWS Lambda functions using DynamoDB triggers and written in TypeScript.\

## IMPORTANT INFO
http://cst3130-data-visualization.s3.amazonaws.com/index.html\
The project was done with **AWS Educational Account** and everything is hosted and done with AWS.\
**The educational account should expire in 2020-09-30**\
**For a demo video showcasing the project email me (contact info below).**

## Contact info
Geraldas Kastauna\
admin@geraldaskastauna.com\
geraldaskastauna@gmail.com\
