import React, { useState } from 'react';

function LoginScreen({ onLogin }) {
	const [inputValue, setInputValue] = useState('');

	const handleLogin = () => {
		localStorage.setItem('nickname', inputValue);
		onLogin(inputValue);
	};

	const handleKeyDown = (event) => {
		if (event.key === 'Enter') {
			handleLogin();
		}
	};

	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<input
				type="text"
				placeholder="Nickname"
				value={inputValue}
				onChange={(e) => setInputValue(e.target.value)}
				onKeyDown={handleKeyDown}
				className="p-2 border rounded"
			/>
			<button onClick={handleLogin} className="mt-4 p-2 bg-blue-500 text-white rounded">
				Login
			</button>
		</div>
	);
}

export default LoginScreen;
