import kafka from './kafkaClient';

async function main() {
	const topic = 'admin-topic';
	const producer = kafka.producer();

	console.log('connecting producer...');
	await producer.connect();
	console.log('connected producer...');

	console.log('sending message...');
	await producer.send({
		topic,
		messages: [
			{ key: 'test', value: 'this is a multi message 0', partition: 0 },
			{ key: 'test', value: 'this is a multi message 1', partition: 1 },
		],
	});
	console.log('sent message...');

	console.log('disconnecting producer...');
	await producer.disconnect();
	console.log('disconnected producer...');
}

main();
