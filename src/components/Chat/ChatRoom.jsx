import React, { useState, useEffect } from 'react';
import ChatMessage from './ChatMessage.jsx';

function ChatRoom({ nickname }) {
	const [messages, setMessages] = useState([]);
	const [inputValue, setInputValue] = useState('');
	const [drone, setDrone] = useState(null);
	const handleLogout = () => {
		localStorage.removeItem('nickname');
		window.location.reload();
	};

	useEffect(() => {
		const storedMessages = localStorage.getItem('messages');
		if (storedMessages) {
			setMessages(JSON.parse(storedMessages));
		}

		const droneInstance = new window.Scaledrone('Ja8jCcO4GAhbLeBY');

		droneInstance.on('open', error => {
			if (error) {
				return console.error(error);
			}

			const room = droneInstance.subscribe('AlgebraChatApp');
			room.on('open', error => {
				if (error) {
					return console.error(error);
				}
				console.log('Connected to room');
			});

			room.on('message', message => {
				setMessages((messages) => {
					const newMessages = [...messages, { member: message.member, text: message.data.text, sender: message.data.sender }];
					localStorage.setItem('messages', JSON.stringify(newMessages));
					return newMessages;
				});
			});

			setDrone(droneInstance);
		});

		return () => {
			droneInstance.unsubscribe('AlgebraChatApp');
			droneInstance.close();
		};
	}, []);

	const handleKeyPress = (e) => {
		if (e.key === 'Enter') {
			handleSendMessage();
		}
	};

	const handleSendMessage = () => {
		if (drone) {
			drone.publish({
				room: 'AlgebraChatApp',
				message: {
					text: inputValue,
					sender: nickname,
				},
			});
			setInputValue('');
		} else {
			console.error('Connection is not open');
		}
	};

	return (
		<div className="flex flex-col h-screen">
			<button onClick={handleLogout} className="p-2 bg-red-500 text-white rounded w-full">
				Logout
			</button>
			<div className="flex-1 overflow-auto p-36">
				{messages.map((message, index) => (
					<ChatMessage key={index} message={message} nickname={nickname} />
				))}
			</div>
			<div className="p-20">
				<input
					type="text"
					placeholder="Message"
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
					onKeyPress={(e) => handleKeyPress(e)}
					className="p-2 border rounded w-full"
				/>
				<button onClick={handleSendMessage} className="mt-4 p-2 bg-blue-500 text-white rounded w-full">
					Send
				</button>
			</div>
		</div>
	);
}

export default ChatRoom;
