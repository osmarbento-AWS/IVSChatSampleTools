# IVS Chat Sample
This sample code provides example to handle Chat room creation and chat moderation

## Chat Room Creation
The chat room is part of the AWS SDK for JavaScript. The chat room is created using the following code snippet:

```javascript
    var params = {
    loggingConfigurationIdentifiers: [
        'STRING_VALUE',
        /* more items */
    ],
    maximumMessageLength: 'NUMBER_VALUE',
    maximumMessageRatePerSecond: 'NUMBER_VALUE',
    messageReviewHandler: {
        fallbackResult: ALLOW | DENY,
        uri: 'STRING_VALUE'
    },
    name: 'STRING_VALUE',
    tags: {
        '<TagKey>': 'STRING_VALUE',
        /* '<TagKey>': ... */
    }
    };
    ivschat.createRoom(params, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else     console.log(data);           // successful response
    });
```

This sample code also provides a SAM template to create an API endpoint and a Lambda function to handle the chat room creation. The SAM template is located in the `sam-template` folder.

### Deploy the SAM template
To deploy the SAM template, run the following command:

- Optionally create an S3 bucket to store the Lambda function code, otherwise use an existing bucket.

```
aws s3api create-bucket --bucket <my-bucket-name> --region <my-region>
```

- Package the SAM template and upload the Lambda function code to the S3 bucket.

```
sam package \
--template-file template.yaml \
--s3-bucket <my-bucket-name> \
--output-template-file packaged.yaml
```

- Deploy the SAM template.

```
sam deploy \
--template-file packaged.yaml \
--stack-name sample-ivs-chat \
--capabilities CAPABILITY_IAM
```

### Test the API endpoint
To test the API endpoint, run the following command:

```
curl -X POST https://<api-id>.execute-api.<my-region>.amazonaws.com/Prod/newchat -H "Content-Type: application/json" -d "{\"chatRoomName\": \"my-chat-room\"}"
```

[Integration documentation](https://dev.to/aws/adding-chat-to-your-amazon-ivs-live-stream-43i6)

## Chat Moderation
Please review this excellent following blog post about Amazon IVS Chat Moderation [HERE](https://dev.to/aws/moderating-amazon-ivs-chat-messages-with-an-aws-lambda-function-4b7p)

Snippet of the Lambda function code to handle chat moderation:

```javascript
exports.handler = async (event) => {
  return {
    ReviewResult: 'ALLOW',
    Content: event.Content.replace(/bad word/ig, '*** ****'),
    Attributes: {
      username: event.Attributes.username
    }
  };
};
```





