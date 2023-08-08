// Chat room creation lambda function
// This function is triggered by API Gateway

const AWS = require('aws-sdk')
const ivschat = new AWS.Ivschat()

exports.handler = async (event) => {
  try {
    // parse request body
    const body = JSON.parse(event.body)
    const chatRoomName = body.chatRoomName
    const maxMessageLength = body.maxMessageLength || 500
    const maxMessageRatePerSecond = body.maxMessageRatePerSecond || 100

    // create chat room
    const params = {
      name: chatRoomName,
      maximumMessageLength: maxMessageLength,
      maximumMessageRatePerSecond: maxMessageRatePerSecond
      // you can also add a messageReviewHandler here
      /*  messageReviewHandler: {
              fallbackResult: ALLOW | DENY,
              uri: 'STRING_VALUE' // this is the ARN of the lambda function
          }, */
    }

    const data = await ivschat.createRoom(params).promise()
    return handleResponse(data)
  } catch (err) {
    console.log(err, err.stack)
    return handleError(err)
  }
}

function handleResponse(response) {
  if (response.statusCode == 200) {
    const body = {
      chatRoomId: response.chatRoom.chatRoomId,
      chatRoomName: response.chatRoom.chatRoomName
    }
    return {
      statusCode: 200,
      body: JSON.stringify(body)
    }
  }
  return response
}

function handleError(error) {
  return {
    statusCode: 500,
    body: JSON.stringify(error)
  }
}
