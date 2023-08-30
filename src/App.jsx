import {useEffect, useState} from 'react';
import LoginScreen from './components/Login/LoginScreen.jsx';
import ChatRoom from './components/Chat/ChatRoom.jsx';

function App() {
	const [nickname, setNickname] = useState(null);

	useEffect(() => {
		const savedNickname = localStorage.getItem('nickname');
		if (savedNickname) {
			setNickname(savedNickname);
		}
	}, []);

	return (
		<div className="container mx-auto p-4">
			{nickname ? (
				<ChatRoom nickname={nickname}/>
			) : (
				<LoginScreen onLogin={setNickname}/>
			)}
		</div>
	);
}

export default App;