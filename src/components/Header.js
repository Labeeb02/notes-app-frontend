import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = ({ handleAddNote,logout }) => {
	let navigate=useNavigate();
	const handleLogOut=async ()=>{
		await logout();
		navigate('/');
	}

	return (
		<div className='header'>
			<h1>Notes</h1>
			<div>
			<button
				onClick={handleAddNote}
				className='save'
			>
				Add Note
			</button>
			<button
				onClick={handleLogOut}
				className='save'
			>
				Log Out
			</button>
			</div>
		</div>
	);
};

export default Header;
