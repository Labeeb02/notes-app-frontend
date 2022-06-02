import { useState,useEffect } from 'react';
import '../css/addnew.scss';
var active=1;
const EditNote = ({ handleEditNote,_id,_tags,text,handleClose }) => {
	const [tags, setTags] = useState('');
	const [noteText, setNoteText] = useState('');
    //const [rand,setRand] = useState(Math.random());
	const characterLimit = 200;
    
    // setTags(_tags);
    // setNoteText(text);
    // if(text!=''){
    //     setTags(_tags);
    //     setNoteText(text);
    // }
	// console.log("Active=",active);
	// console.log("Text=",text);
	useEffect(() => {
		if(noteText!==text && active ===1){
		setTags(_tags);
		setNoteText(text);
		active=0;
		}
	},[noteText,tags,_tags,text]);

	const handleChange = (event) => {
		if (characterLimit - event.target.value.length >= 0) {
			setNoteText(event.target.value);
		}
	};

	const handleTagsChange = (event) => {
		setTags(event.target.value);
	};

	const handleEditClick = () => {
		if (noteText.trim().length > 0) {
			console.log(tags);
			handleEditNote(_id,tags,noteText);
            active=1;
		}
	};

	const handleBackClick = () => {
		handleClose();
		setNoteText('');
		setTags('');
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
				<div>
					<button className='save' onClick={handleBackClick}>
						Back
					</button>
					<button className='save' onClick={handleEditClick}>
						Edit
					</button>
				</div>
			</div>
		</div>
        </div>
	);
};

export default EditNote;