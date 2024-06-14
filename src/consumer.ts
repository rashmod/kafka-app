import kafka from './kafkaClient';

async function main() {
	const topic = 'admin-topic';
	const consumer = kafka.consumer({ groupId: 'test-group' });

	console.log('connecting consumer...');
	await consumer.connect();
	console.log('connected consumer...');

	console.log('subscribing consumer...');
	await consumer.subscribe({ topic, fromBeginning: true });
	console.log('subscribed consumer...');

	await consumer.run({
		eachMessage: async ({
			topic,
			partition,
			message,
			heartbeat,
			pause,
		}) => {
			console.log({ heartbeat, pause });
			console.log(
				`topic:[${topic}] partition:[${partition}] message:[${message.value?.toString()}]`
			);
		},
	});
}

main();
