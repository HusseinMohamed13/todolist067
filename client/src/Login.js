import React, { useState } from "react";
import { Paper, TextField } from "@material-ui/core";
import { Checkbox, Button } from "@material-ui/core";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import App from "./App";
import "./Login.css";

function Login() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");


    const navigate = useNavigate();
    const goToHomePage = (_id) => navigate('/App/' + _id/*{state: {id: _id}}*/);

    toast.configure()
    
    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    const handleChange = ({ currentTarget: input }) => {
        setEmail(input.value);
    };

    const handleChange1 = ({ currentTarget: input }) => {
        setPassword(input.value);
    };

    return (
        <div className="Login">
            Email:
            <br />
            <TextField
                variant="outlined"
                margin-left="10px"
                size="small"
                style={{ width: "25%" }}
                id="email"
                onChange={handleChange}
                required={true}
            />
            <br />
            <br />
            Password:
            <br />
            <TextField
                variant="outlined"
                size="small"
                style={{ width: "25%" }}
                id="password"
                onChange={handleChange1}
                required={true}
            />
            <br />
            <br />
            <Button
                style={{ height: "40px" }}
                color="primary"
                onClick={() => loginUser(email, password, goToHomePage, toast)}
                variant="outlined"
                type="submit"
            >
                Login
            </Button>
            or
            <Button
                style={{ height: "40px" }}
                color="primary"
                onClick={() => registerUser(email, password, toast)}
                variant="outlined"
                type="submit"
            >
                Register
            </Button>
        </div>
    );
}


function loginUser(email, password, goToHomePage, toast) {
    const url = 'https://todolist067.herokuapp.com/api/login' + '?email=' + email + "&password=" + password;
    fetch(url, {
        method: 'POST'
    }).then((res) => res.json())
        .then((data) => handleLogin(data,goToHomePage,toast));
}

function registerUser(email, password, toast) {
    const url = 'https://todolist067.herokuapp.com/api/register' + '?email=' + email + "&password=" + password;
    fetch(url, {
        method: 'POST'
    }).then((res) => res.json())
        .then((data) => toast(data));
}

function handleLogin(res,goToHomePage,toast){
    if(res==false){
        toast("wrong email or password")
    }else{
        goToHomePage(res)
    }
}

export default Login;