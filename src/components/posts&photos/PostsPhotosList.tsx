import React, {useState} from 'react';
import {IPhoto, IPost} from "../../types/types";
import {useNavigate} from "react-router-dom";
import Pagination from "../Pagination";

interface PostsPhotosListProps {
    posts: IPost[];
    photos: IPhoto[];
}

const PostsPhotosList: React.FC<PostsPhotosListProps> = (props) => {
    const {posts, photos} = props

    const navigate = useNavigate()
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    // Logic to calculate the number of pages needed
    const totalPages = Math.ceil(posts.length / rowsPerPage);

    // Logic to return the rows for the current page
    const rowsForCurrentPage = posts.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    // console.log(comments.slice((2 - 1) * 5, 2 * 5))

    // Handlers to change the current page and rows per page
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleRowsPerPageChange = (rows: number) => {
        setRowsPerPage(rows);
        setCurrentPage(1); // Reset current page when rows per page changes
    };

    const photoMap: Record<string, IPhoto> = photos.reduce((el, photo) => {
        el[String(photo.id)] = photo;
        return el;
    }, {} as Record<string, IPhoto>)
    const handleRowClick = (post: IPost) => {
        console.log(post.id)
        const id = post.id
        navigate(`/posts&photos/${id}`)
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
                    {/*posts.map((el)*/}
                    <tbody>
                    {rowsForCurrentPage.map((el) => (
                        <tr key={el.id} onClick={() => handleRowClick(el)} style={{cursor: "pointer"}}>
                            <td>{el.id}</td>
                            <td><img src={photoMap[el.id]?.thumbnailUrl} alt="imagePost" width='60px'/></td>
                            <td>{photoMap[el.id].title}</td>
                            <td>{el.title}</td>
                            <td>{el.body}</td>
                        </tr>))}
                    </tbody>
                </table>
                <div style={{backgroundColor: "lightgrey", display: "flex", justifyContent: "space-evenly"}}>
                    <Pagination currentPage={currentPage} totalPages={totalPages}
                                handlePageChange={handlePageChange} rowsPerPage={rowsPerPage}
                                handleRowsPerPageChange={handleRowsPerPageChange}/>
                </div>
            </div>
        </div>
    );
};

export default PostsPhotosList;
