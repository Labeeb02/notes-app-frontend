import { useState, useEffect } from 'react';
//import { nanoid } from 'nanoid';
import NotesList from './NotesList';
import Search from './Search';
import Header from './Header';
//import {Route,Routes} from 'react-router-dom';
import '../index.css';
import AddNew from './AddNew';
import EditNote from './EditNote';
var axios = require('axios');

const darkMode = false;

const Home = ({authToken,logout}) => {
	const [notes, setNotes] = useState([]);
	const [editID, setEID] = useState('');
	const [edittags, setETags] = useState('');
	const [edittext, setEText] = useState('');
	const [searchText, setSearchText] = useState('');
	
	useEffect(() => {
		
		

		var config = {
			method: 'get',
			url: 'https://labeeb-notes-app.herokuapp.com/tasks',
			headers: { 
				'Authorization': 'Bearer '+authToken,
			}
		};
		var savedNotes;
		axios(config)
		.then(function (response) {
			savedNotes=response.data
			if (savedNotes) {
				setNotes(savedNotes);
			}
		})
		.catch(function (error) {
			if(error.response.data.error==='Please Authenticate')
			{
				alert('Please Sign In Again');
			}
		console.log(error);
		});
		
	}, [notes,authToken]);

	const addNote = (tags,text) => {

		var data = JSON.stringify({
			"description": text,
			"tags": tags
		  });
		  
		  var config = {
			method: 'post',
			url: 'https://labeeb-notes-app.herokuapp.com/tasks',
			headers: { 
			  'Authorization': 'Bearer '+authToken,
			  'Content-Type': 'application/json'
			},
			data : data
		  };
		  
		  axios(config)
		  .then(function (response) {
			const newNote=response.data
			const newNotes = [...notes, newNote];
			setNotes(newNotes);
			closeAddNote();
		  })
		  .catch(function (error) {
			if(error.response.data.error==='Please Authenticate')
			{
				alert('Please Sign In Again');
			}
			console.log(error);
		  });
	};

	const deleteNote = (_id) => {
		const newNotes = notes.filter((note) => note._id !== _id);
		var config = {
			method: 'delete',
			url: 'https://labeeb-notes-app.herokuapp.com/tasks/'+_id.toString(),
			headers: { 
			  'Authorization': 'Bearer '+authToken,
			}
		  };
		  
		  axios(config)
		  .then(function (response) {
			console.log(JSON.stringify(response.data));
			setNotes(newNotes);
		  })
		  .catch(function (error) {
			if(error.response.data.error==='Please Authenticate')
			{
				alert('Please Sign In Again');
			}
			console.log(error);
		  }); 
		  
	}; 

	const editNoteStart = (_id,tags,text) => {
		setEID(_id);
		setETags(tags);
		setEText(text);
		

		document.getElementById("editNote").classList.remove("ghost");
		document.getElementById("notesList").classList.add("ghost");
	}

	const editNoteEnd = (_id,tags,text) => {
		var data = JSON.stringify({
			"description": text,
			"tags": tags
		  });
		  
		  var config = {
			method: 'patch',
			url: 'https://labeeb-notes-app.herokuapp.com/tasks/'+_id,
			headers: { 
			  'Authorization': 'Bearer '+authToken, 
			  'Content-Type': 'application/json'
			},
			data : data
		  };
		  
		  axios(config)
		  .then(function (response) {
			document.getElementById("editNote").classList.add("ghost");
			document.getElementById("notesList").classList.remove("ghost");

		  })
		  .catch(function (error) {
			if(error.response.data.error==='Please Authenticate')
			{
				alert('Please Sign In Again');
			}
			console.log(error);
		  });
	}

	// const openEditNote = () => {
	// 	document.getElementById("editNote").classList.remove("ghost");
	// 	document.getElementById("notesList").classList.add("ghost");
	// }
	const closeEditNote = () => {
		document.getElementById("editNote").classList.add("ghost");
		document.getElementById("notesList").classList.remove("ghost");
	}
	const openAddNote=()=>{
		document.getElementById("addNote").classList.remove("ghost");
		document.getElementById("notesList").classList.add("ghost");
	}
	const closeAddNote=()=>{
		document.getElementById("addNote").classList.add("ghost");
		document.getElementById("notesList").classList.remove("ghost");
	}

	return (
		<div>
			{(authToken==='hemlo') ?
				<div>
					<div className='flex'>
						<h1>Please Login</h1>
					</div>
					<div className='flex'>
						<a href="/">
							<button className='save'>
								Return To LogIn
							</button>
						</a>
					</div>
				</div>
			:<div>
			<div class="ghost" id="addNote">
				<AddNew  handleAddNote={addNote} handleClose={closeAddNote} />
			</div>
			<div class="ghost" id="editNote">
				<EditNote  handleEditNote={editNoteEnd} _id={editID} _tags={edittags} text={edittext} handleClose={closeEditNote} />
			</div>
			<div className={`${darkMode && 'dark-mode'}`}>
				<div className='container' id="notesList">
					<Header handleAddNote={openAddNote} logout={logout} />
					<Search handleSearchNote={setSearchText} />
					<NotesList
						notes={notes.filter((note) =>
							searchText.split(',').every(tag => note.tags.toLowerCase().includes(tag.toLowerCase().trim()))
						)}
						handleAddNote={addNote}
						handleDeleteNote={deleteNote}
						handleEditNote={editNoteStart}
					/>
				</div>
			</div>
			</div>}
		</div>
	);
};

export default Home;
