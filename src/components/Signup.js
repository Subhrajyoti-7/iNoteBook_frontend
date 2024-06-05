import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
    const host = "http://localhost:5000";
    const [credentials, setCredentials] = useState({ name: '', email: '', password: '', cpassword: '' })

    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        //API call
        const { name, email, password, cpassword } = credentials;
        if (password === cpassword) {
            const url = `${host}/api/auth/createuser`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, email, password, cpassword })
            });
            const user = await response.json();
            if (user.success) {
                //redirect to HomePage
                localStorage.setItem("token", user.authToken);
                console.log(localStorage.getItem("token"));
                navigate('/');
                props.showAlert("Account is created successfully", "success");
            } else {
                //show error message
                props.showAlert("User already axists with the same email id", "danger")
            }
        } else {
            props.showAlert("Password and conform password are not same", "danger")
        }

    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.id]: e.target.value });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" value={credentials.name} name='name' className="form-control" id="name" aria-describedby="textHelp" onChange={onChange} required minLength={5} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" value={credentials.email} name='email' className="form-control" id="email" aria-describedby="emailHelp" onChange={onChange} required />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" value={credentials.password} name='password' className="form-control" id="password" onChange={onChange} required minLength={6} />
                    <div id="emailHelp" className="form-text">Password must be minimum 6 characters</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Conform Password</label>
                    <input type="password" value={credentials.cpassword} name='cpassword' className="form-control" id="cpassword" onChange={onChange} required minLength={6} />
                </div>
                <button type="submit" className="btn btn-primary">Sign up</button>
            </form>
        </div>
    )
}

export default Signup
