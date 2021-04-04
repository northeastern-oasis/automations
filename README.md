# Oasis Automation

## Purpose
We are building tooling to automate the "participant journey" of Oasis. Our goal is to automate every touch point
between a participant in Oasis and the administrative side of the program. Our initial focus is on automating 
the process of team creation.

Eventually, we hope to productize this, and we hope that this will drive expansion of Oasis-type programs at other 
universities.

## Repository Structure
### Source Code
* `src/functions` contains the Typescript source code for the AWS lambda functions
* `src/mail` contains the code that drives the email service
* `src/notion` contains the code that drives the integration with Notion
* `src/webhooks` contains the Google Apps Scripts that are executed upon form submission
(eventually, we will likely move away from AWS and put everything into these scripts)

### Build and Deploy
* `npm run build` builds the lambda functions
* `npm run deploy` deploys the lambda functions
* `npm run push` does both of these steps in one command

Access to the AWS account is needed to deploy. Contact us at oasis.neu@gmail.com with any questions.

## Helpful Links
* https://medium.com/@eyalgershon/sending-a-webhook-for-each-google-forms-submission-a0e73f72b397
* https://scotch.io/@nwayve/how-to-build-a-lambda-function-in-typescript


