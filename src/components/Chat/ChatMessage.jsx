import PropTypes from "prop-types";

ChatMessage.propTypes = {
	message: PropTypes.shape({
		sender: PropTypes.string.isRequired,
		text: PropTypes.string.isRequired,
	}).isRequired,
	nickname: PropTypes.string.isRequired,
};

function stringToColor(str) {
	let hash = 0;
	for (let i = 0; i < str.length; i++) {
		hash = str.charCodeAt(i) + ((hash << 5) - hash);
	}
	let color = '#';
	for (let i = 0; i < 3; i++) {
		let value = (hash >> (i * 8)) & 0xff;
		color += ('00' + value.toString(16)).substr(-2);
	}
	return color;
}

function ChatMessage({ message, nickname }) {
	const isOwnMessage = message.sender === nickname;
	const color = stringToColor(message.sender);

	return (
		<div className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} mb-2`}>
			<div
				className={`p-3 rounded-lg ${isOwnMessage ? 'bg-blue-500' : 'bg-gray-300'} text-white max-w-2/3 ${
					isOwnMessage ? 'rounded-br-none' : 'rounded-bl-none'
				}`}
				style={{ backgroundColor: isOwnMessage ? 'blue' : color }}
			>
				{!isOwnMessage && (
					<div className="font-bold text-sm mb-1" style={{ color: 'black' }}>
						{message.sender}
					</div>
				)}
				{message.text}
			</div>
		</div>
	);
}


export default ChatMessage;
