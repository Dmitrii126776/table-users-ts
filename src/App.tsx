import React, {JSX, useEffect, useState} from 'react';
import UserList from "./components/users/UserList";
import {IComment, IPhoto, IPost, IUser} from "./types/types";
import axios from "axios";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import UserItemPage from "./components/users/UserItemPage";
import CommentsList from "./components/comments/CommentsList";
import CommentItemPage from "./components/comments/CommentItemPage";
import CompaniesList from "./components/companies/CompaniesList";
import PostsPhotosList from "./components/comments/PostsPhotosList";


function App(): JSX.Element {

    const [users, setUsers] = useState<IUser[]>([])
    const [comments, setComments] = useState<IComment[]>([])
    const [photos, setPhotos] = useState<IPhoto[]>([])
    const [posts, setPosts] = useState<IPost[]>([])

    async function getPhotos() {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/photos?_limit=40');
            const data = await response.json();
            setPhotos(data)
        } catch (e) {
            alert(e)
        }
    }

    async function getPosts() {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=40')
            const data = await response.json();
            setPosts(data)
        } catch (e) {
            alert(e)
        }
    }

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
        getPhotos()
        getPosts()
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
                    <Route path="/posts&photos" element={<PostsPhotosList posts={posts} photos={photos}/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
