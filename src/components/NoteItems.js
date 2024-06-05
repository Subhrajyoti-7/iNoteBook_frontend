import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';

const NoteItems = (props) => {
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note, updateNote } = props;

    return (
        <div className="col-md-3 my-3">
            <div className="card">
                <div className="card-body">
                    <div className="d-flex justify-content-between">
                        <h5 className="card-title">{note.title}</h5>
                        <div>
                            {/* Delete*/}
                            <i className="far fa-trash-alt mx-3" style={{ cursor: "pointer" }} onClick={() => { deleteNote(note._id) }}></i>
                            {/* Edit*/}
                            <i className="far fa-edit mx-2" style={{ cursor: "pointer" }} onClick={() => { updateNote(note) }}></i>
                        </div>
                    </div>
                    <p className="card-text">{note.description}</p>
                </div>
            </div>
        </div>
    )
}

export default NoteItems
