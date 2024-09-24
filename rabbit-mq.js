// rabbitmq.js
const amqp = require('amqplib');

const QUEUE_NAME = 'gov';
let channel = null;

const connectRabbitMQ = async (retries = 5) => {
    for (let i = 0; i < retries; i++) {
      try {
        const connection = await amqp.connect("amqp://user:password@rabbitmq");
        channel = await connection.createChannel();
        console.log("Connected to RabbitMQ");
        return { connection, channel };
      } catch (error) {
        console.error("Failed to connect to RabbitMQ, retrying...", error);
        await new Promise(res => setTimeout(res, 2000)); // Wait before retrying
      }
    }
    throw new Error("Could not connect to RabbitMQ after multiple attempts");
  };


// const sendToQueue = (message) => {
//     connectRabbitMQ((channel) => {
//         channel.sendToQueue('gov', Buffer.from(JSON.stringify(message)), { persistent: true });
//         console.log('Sent message to queue:', message);
//     });
// };

const sendToQueue = async (queueName, message) => {
  if (!channel) {
    console.error("No RabbitMQ channel available");
    return;
  }
  await channel.assertQueue(QUEUE_NAME, { durable: true });
  channel.sendToQueue(QUEUE_NAME, Buffer.from(message));
  console.log(`Message sent to queue ${QUEUE_NAME}`);
};



module.exports = {connectRabbitMQ, sendToQueue};
