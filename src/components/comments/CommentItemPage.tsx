import React, {useEffect, useState} from 'react';
import {IComment} from "../../types/types";
import {useNavigate, useParams} from "react-router-dom";


type CommentItemPageParams = {
    id: string;
}


const CommentItemPage: React.FC = () => {
    const [comment, setComment] = useState<IComment | null>(null)
    const params = useParams<CommentItemPageParams>();
    const navigate = useNavigate()

    useEffect(() => {
        function getComment() {
            fetch(`https://jsonplaceholder.typicode.com/comments/${params.id}`)
                .then(response => response.json())
                .then(data => setComment(data))
                .catch(error => alert(error));
        }

        getComment()
    }, [params.id])
    return (
        <div style={{paddingTop: '60px'}}>
            <div className="d-flex flex-row justify-content-evenly m-3">
                <h3>This is comment: {comment?.name}</h3>
                <button type="button" className="btn btn-outline-primary" onClick={() => navigate('/comments')}>
                    BackToList
                </button>
            </div>
            <div className="row g-3 m-3">
                <div className="col-sm">
                    <label>Comment Name</label>
                    <input type="text" className="form-control" value={comment?.name || ''} readOnly={true}/>
                </div>
                <div className="col-sm">
                    <label>Comment Email</label>
                    <input type="text" className="form-control" value={comment?.email || ''} readOnly={true}/>
                </div>
            </div>
            <div className="row g-3 m-3">
                <div className="col-sm">
                    <label>Comment Body</label>
                    <textarea rows={4} cols={40} className="form-control" value={comment?.body || ''} readOnly={true}/>
                </div>
                <div className="col-sm">
                    <label>Comment Body</label>
                    <textarea rows={4} cols={40} className="form-control" value={comment?.body || ''} readOnly={true}/>
                </div>
                <div className="col-sm">
                    <label>Comment Body</label>
                    <textarea rows={4} cols={40} className="form-control" value={comment?.body || ''} readOnly={true}/>
                </div>
            </div>
        </div>
    );
};

export default CommentItemPage;
