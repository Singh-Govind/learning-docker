const amqp = require("amqplib");

const startWorker = async () => {
    try {
      const connection = await amqp.connect('amqp://user:password@localhost');
      const channel = await connection.createChannel();
      const QUEUE_NAME = "gov";
      await channel.assertQueue(QUEUE_NAME, { durable: true });
      console.log(`Worker listening to queue: ${QUEUE_NAME}`);
      
      channel.consume(QUEUE_NAME, (msg) => {
        const task = JSON.parse(msg.content.toString());
        console.log('Processing task:', task);
  
        // Simulate task processing time
        setTimeout(() => {
          console.log('Task processed:', task);
          channel.ack(msg); // Acknowledge that the message was processed
        }, 2000);
        
      }, { noAck: false }); // noAck: false ensures that RabbitMQ knows the task was processed
    } catch (error) {
      console.error('Worker failed to start', error);
    }
  };
  
startWorker();