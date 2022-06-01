import Note from './Note';
//import AddNote from './AddNote';

//const tags=['tag1','tag2','tag2','tag2','tag2','tag2','tag2','tag2','tag2','tag2','tag2','tag2','tag2','tag2','tag2','tag2','tag2']

const NotesList = ({
	notes,
	handleAddNote,
	handleDeleteNote,
	handleEditNote,
}) => {
	return (
		<div className='notes-list' >
			{notes.map((note) => (
				<Note
					tags={note.tags}
					id={note._id}
					text={note.description}
					date={note.createdAt}
					handleDeleteNote={handleDeleteNote}
					handleEditNote={handleEditNote}
				/>
			))}
			{/* <AddNote handleAddNote={handleAddNote} /> */}
		</div>
	);
};

export default NotesList;

// id={note._id}
// 					text={note.description}
// 					date={note.createdAt}

// id={note.id}
// 					text={note.text}
// 					date={note.date}
