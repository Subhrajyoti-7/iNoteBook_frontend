import NoteContext from './noteContext';
import { useState } from 'react';

const NoteState = (props) => {
    const host = "http://localhost:5000";
    const notesInitial = []

    // Get all Notes
    const fetchNote = async () => {
        // console.log(localStorage.getItem('token'))
        //API call
        const url = `${host}/api/note/fetchallnotes`;
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            }
        });
        const note = await response.json();
        setNotes(note);
    }

    // Add Note
    const addNote = async (title, description, tag) => {
        //API call
        const url = `${host}/api/note/addnote`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        const note = await response.json();

        //Logic to add note in client-end
        setNotes(notes.concat(note));
    }

    //Edit Note
    const editNote = async (id, title, description, tag) => {
        //API call
        const url = `${host}/api/note/updatenote/${id}`;
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        await response.json();

        //Logic to edit in client-end
        setNotes(notes.map((note) => (note._id === id ? { "_id": id, "title": title, "description": description, "tag": tag } : note)));
    }

    //Delete Note
    const deleteNote = async (id) => {
        //API call
        const url = `${host}/api/note/deletenote/${id}`;
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            }
        });
        await response.json();
        setNotes(notes.filter((note) => note._id !== id));
    }

    const [notes, setNotes] = useState(notesInitial);
    return (
        <NoteContext.Provider value={{ notes, setNotes, fetchNote, addNote, editNote, deleteNote }}>
            {props.children}
        </NoteContext.Provider>
    );
}

export default NoteState;