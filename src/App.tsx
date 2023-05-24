import React, {useEffect, useState} from 'react';
import UserList from "./components/UserList";
import {IUser} from "./types/types";
import axios from "axios";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import UserItemPage from "./components/UserItemPage";

function App() {

    const [users, setUsers] = useState<IUser[]>([])

    useEffect(() => {
        getUsers()
    }, [])

    // async function getUsers() {
    //     try {
    //         const response = await fetch('https://jsonplaceholder.typicode.com/users');
    //         const data = await response.json();
    //         setUsers(data);
    //     } catch (e) {
    //         alert(e);
    //     }
    // }

    async function getUsers() {
        try {
            const response = await axios.get<IUser[]>('https://jsonplaceholder.typicode.com/users')
            setUsers(response.data)
        } catch (e) {
            alert(e)
        }
    }

    // function getUsers() {
    //     fetch('https://jsonplaceholder.typicode.com/users')
    //         .then(response => response.json())
    //         .then(data => setUsers(data))
    //         .catch(error => alert(error));
    // }

    return (
        <BrowserRouter>
            <div>
                <Navbar/>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/users" element={<UserList users={users}/>}/>
                    <Route path="/users/:id" element={<UserItemPage/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
