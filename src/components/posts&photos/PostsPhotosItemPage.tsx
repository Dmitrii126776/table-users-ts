import React, {useEffect, useState} from 'react';
import {IPhoto, IPost} from "../../types/types";
import {useNavigate, useParams} from "react-router-dom";

type PostsPhotosItemPageParams = {
    id: string;
}
const PostsPhotosItemPage: React.FC = () => {
    const [post, setPost] = useState<IPost | null>(null)
    const [photo, setPhoto] = useState<IPhoto | null>(null)
    const params = useParams<PostsPhotosItemPageParams>()
    const navigate = useNavigate()

    useEffect(() => {
        function getPhoto() {
            fetch(`https://jsonplaceholder.typicode.com/photos/${params.id}`)
                .then(response => response.json())
                .then(data => setPhoto(data))
                .catch(error => alert(error));
        }

        getPhoto()
    }, [params.id])

    useEffect(() => {
        function getPost() {
            fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`)
                .then(response => response.json())
                .then(data => setPost(data))
                .catch(error => alert(error));
        }

        getPost()
    }, [params.id])

    return (
        <div style={{paddingTop: '60px'}}>
            <div className="d-flex flex-row justify-content-evenly m-3">
                <h3>This is post # {post?.id}</h3>
                <button type="button" className="btn btn-outline-primary" onClick={() => navigate('/posts&photos')}>
                    BackToList
                </button>
            </div>

            <div className="row g-3 m-3">
                <div style={{width:'200px'}}>
                    <img src={photo?.thumbnailUrl} alt="imagePost" />
                </div>
                <div className="col-sm">
                    <label>Post Title</label>
                    <input type="text" className="form-control" value={post?.title || ''} readOnly={true}/>
                </div>
                <div className="col-sm">
                    <label>Photo Title</label>
                    <input type="text" className="form-control" value={photo?.title || ''} readOnly={true}/>
                </div>

            </div>
        </div>
    );
};

export default PostsPhotosItemPage;
