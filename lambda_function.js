const sgMail = require('@sendgrid/mail');

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async event => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  for (const record of event.Records) {
    console.log(record.eventID);
    console.log(record.eventName);
    console.log('DynamoDB Record: %j', record.dynamodb);
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    // create email message
    const msg = {
        to: '<EMAIL_TO>',
        from: '<EMAIL_FROM>',
        replyTo: record.dynamodb.Email,
        subject: record.dynamodb.Subject,
        text: record.dynamodb.Message,
    };

    // send email
    const response = await sgMail.send(msg);
    console.log(response);
    return response;
  }
  return Promise.resolve('Successfully processed DynamoDB record');
};
