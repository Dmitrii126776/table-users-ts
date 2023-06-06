import React from 'react';
import {IPhoto, IPost} from "../../types/types";

interface PostsPhotosListProps {
    posts: IPost[];
    photos: IPhoto[];
}

const PostsPhotosList: React.FC<PostsPhotosListProps> = (props) => {
    const {posts, photos} = props

    const photoMap: Record<string, IPhoto> = photos.reduce((el, photo) => {
        el[String(photo.id)] = photo;
        return el;
    }, {} as Record<string, IPhoto>)
    const handleRowClick = (post: IPost) => {
        console.log(post.id)
        console.log(post.title)
    }
    return (
        <div style={{marginTop: '65px'}}>
            <h3 className="m-2 text-center">Posts&Photos Tables</h3>
            <div className="m-2">
                <table className="table table-striped table-hover table-bordered">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Image</th>
                        <th>PhotoTitle</th>
                        <th>PostTitle</th>
                        <th>Body</th>
                    </tr>
                    </thead>
                    <tbody>
                    {posts.map((el) => (
                        <tr key={el.id} onClick={() => handleRowClick(el)} style={{cursor: "pointer"}}>
                            <td>{el.id}</td>
                            <td><img src={photoMap[el.id]?.thumbnailUrl} alt="imagePost" width='60px'/></td>
                            <td>{photoMap[el.id].title}</td>
                            <td>{el.title}</td>
                            <td>{el.body}</td>
                        </tr>))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PostsPhotosList;
