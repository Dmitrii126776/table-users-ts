import React, {JSX, useEffect, useState} from 'react';
import UserList from "./components/users/UserList";
import {IComment, IUser} from "./types/types";
import axios from "axios";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import UserItemPage from "./components/users/UserItemPage";
import CommentsList from "./components/comments/CommentsList";
import CommentItemPage from "./components/comments/CommentItemPage";
import CompaniesList from "./components/companies/CompaniesList";


function App(): JSX.Element {

    const [users, setUsers] = useState<IUser[]>([])
    const [comments, setComments] = useState<IComment[]>([])


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

    function getComments() {
        fetch('https://jsonplaceholder.typicode.com/comments?_limit=30')
            .then(response => response.json())
            .then(data => setComments(data))
            .catch(error => alert(error));
    }

    useEffect(() => {
        getUsers()
        getComments()
    }, [])
    return (
        <BrowserRouter>
            <div>
                <Navbar/>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/users" element={<UserList users={users}/>}/>
                    <Route path="/users/:id" element={<UserItemPage/>}/>
                    <Route path="/comments" element={<CommentsList comments={comments}/>}/>
                    <Route path="/comments/:id" element={<CommentItemPage/>}/>
                    <Route path="/companies" element={<CompaniesList users={users}/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
