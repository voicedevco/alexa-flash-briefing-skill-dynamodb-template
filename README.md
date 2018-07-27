![VoicedevCo Logo][logo]

[logo]: https://github.com/voicedevco/alexa-flash-briefing-skill-dynamodb-template/blob/master/images/voicedevco-github-logo.png 


# alexa-flash-briefing-skill-dynamodb-template
A template for creating an alexa flash briefing skill backed by a dynamodb table

# Description
This template node.js file can be used to create a flash briefing skill with minimal coding and configuration.

We achieve this by creating the following setup:

Amazon Alexa -> Amazon API Gateway -> AWS Lambda -> DynamoDB

Alexa flash briefing expects either a JSON or RSS format response with your content. A JSON response looks like this:

`{
  "uid": "urn:uuid:1335c695-cfb8-4ebb-abbd-80da344efa6b",
  "updateDate": "2016-05-23T00:00:00.0Z",
  "titleText": "Amazon Developer Blog, week in review May 23rd",
  "mainText": "Meet Echosim. A new online community tool for developers that simulates the look and feel of an Amazon Echo.",
  "redirectionUrl": "https://developer.amazon.com/public/community/blog"
`}

For more info on the response format see their documentation: [https://developer.amazon.com/docs/flashbriefing/flash-briefing-skill-api-feed-reference.html#text-content-items]

DynamoDB is capable of returning this response format without any transformation. The index.js file takes advantage of this. To do this we create a table with the following structure:

`Key:    updateDate      String
Field:  uid             String
Field:  titleText       String
Field:  mainText        String
Field:  redirectionUrl  String`

Once this is in place, the records are called by current date using the format: yyyy + '-' + mm + '-' + dd + 'T00:00:00.0Z';

Once everything is in place, populate your DynamoDB table with a flash briefing message for each day and this will be read to the user when they open your flash briefing skill.

# Setup Lambda and API gateway
Create function -> Blueprints -> (Add filter) -> microservice-http-endpoint

This will create an API gateway for you as well as a lambda function in nodejs 8.10. Set the permissions for the API to 'Open'.

Using the online editor, replace the contents of the index.js file with the index.js in this repository. You'll also need to change the params.TableName = "NameOfYourTable"; line to whatever you want to call your own Dynamo DB table.

# Setting up permissions to talk to DynamoDB
In order to talk to DynamoDB you'll need to create a new execution role with a policy applied to permit read-only access to databases. The easiest way to do this is to use the default read-only dynamodb policy arn:aws:iam::aws:policy/AmazonDynamoDBReadOnlyAccess.

Once done you'll see all of the new Dynamodb related functions appear next to your lambda function.




