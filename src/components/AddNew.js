import { useState } from 'react';
import '../css/addnew.scss';

const AddNew = ({ handleAddNote }) => {
	const [tags, setTags] = useState('');
	const [noteText, setNoteText] = useState('');
	const characterLimit = 200;

	const handleChange = (event) => {
		if (characterLimit - event.target.value.length >= 0) {
			setNoteText(event.target.value);
		}
	};

	const handleTagsChange = (event) => {
		setTags(event.target.value);
	};

	const handleSaveClick = () => {
		if (noteText.trim().length > 0) {
			handleAddNote(tags,noteText);
			setNoteText('');
			setTags('');
		}
	};

	return (
        <div className="AddNew" >
		<div className='note new'>
            <h4>Enter Tags seperated by comma</h4>
            <div className="row flex tags">
                <input type="text" placeholder="Tags..." value={tags} onChange={handleTagsChange} />
            </div> 
			<h4>Enter the note</h4>
			<textarea
				rows='8'
				cols='10'
				placeholder='Type to add a note...'
				value={noteText}
				onChange={handleChange}
			></textarea>
			<div className='note-footer'>
				<small>
					{characterLimit - noteText.length} Remaining
				</small>
				<button className='save' onClick={handleSaveClick}>
					Save
				</button>
			</div>
		</div>
        </div>
	);
};

export default AddNew;