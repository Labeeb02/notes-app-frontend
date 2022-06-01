import { MdDeleteForever,MdEdit } from 'react-icons/md';

const Note = ({tags, id, text, date, handleDeleteNote,handleEditNote }) => {

	return (
		<div className='note'>
			<div className='tags'>
				{tags.split(',').map((tag) => (
					<div>#{tag.trim()}</div>
				))}
			</div>
			<textarea className="text" wrap="hard">{text}</textarea>
			<div className='note-footer'>
				<small>{date.split('T')[0]}</small>
				<MdEdit
					onClick={() => handleEditNote(id,tags,text)}
					className='delete-icon'
					size='1.3em'
				/>
				<MdDeleteForever
					onClick={() => handleDeleteNote(id)}
					className='delete-icon'
					size='1.3em'
				/>
			</div>
		</div>
	);
};

export default Note;

/* <div className='tags'>
				{tags.map((tag) => (
					<div>{tag}</div>
				))}
			</div> */
