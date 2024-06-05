import React, { useState, useRef } from 'react'
import AddNote from './AddNote';

const UpdateNote = () => {

    const ref = useRef(null);
    const updateNote = (note) => {
        ref.current.click();
    }
    const [note, setNotes] = useState({ title: '', description: '', tag: '' });
    const handleClick = (e) => {
        e.preventDefault();
        AddNote(note.title, note.description, note.tag);
    }

    const onChange = (e) => {
        setNotes({ ...note, [e.target.name]: e.target.value });
    }
    return (
        <div>
            <button type="button" className="btn btn-primary" ref={ref} data-bs-toggle="modal" data-bs-target="#staticBackdrop" >
            </button>

            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Edit your note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className='my-3'>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="title" name='title' aria-describedby="textHelp" onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="description" name='description' onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="exampleInputText" onChange={onChange} />
                                </div>
                                <button type="submit" className="btn btn-primary" onClick={handleClick}>Submit</button>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateNote
