import React, {useState} from 'react';
import {IComment} from "../../types/types";
import Pagination from "../Pagination";
import {useNavigate} from "react-router-dom";

interface CommentsListProps {
    comments: IComment[];
}

const CommentsList: React.FC<CommentsListProps> = (props) => {
    const {comments} = props
    //console.log(comments)
    const navigate = useNavigate()
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    // Logic to calculate the number of pages needed
    const totalPages = Math.ceil(comments.length / rowsPerPage);

    // Logic to calculate the number of pages needed
    const rowsForCurrentPage = comments.slice(
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

    const config = [
        {key: 'id', label: '#', render: (row: IComment) => <>{row.id}</>},
        {key: 'postId', label: 'postId', render: (row: IComment) => <>{row.postId}</>},
        {key: 'name', label: 'Name', render: (row: IComment) => <>{row.name}</>},
        {key: 'email', label: 'Email', render: (row: IComment) => <>{row.email}</>},
        {key: 'body', label: 'Body', render: (row: IComment) => <>{row.body}</>},

    ]

    const handleRowClick = (comment: IComment) => {
        // Perform actions with the clicked comment
        const id = comment.id;
        navigate(`/comments/${id}`)
        // Redirect to a comment detail page, etc.
    }

    return (
        <div style={{paddingTop: '60px'}}>
            <h3 className="m-2 text-center">Comments Tables</h3>
            <div className="m-2">
                <table className="table table-striped table-hover table-bordered mb-0">
                    <thead>
                    <tr >
                        {config.map((el, i) => (<th key={i}>{el.label}</th>))}
                    </tr>
                    </thead>
                    <tbody>
                    {rowsForCurrentPage.map(el => (
                        <tr key={el.id} onClick={() => handleRowClick(el)} style={{cursor: "pointer"}}>
                            {config.map((conf, i) => (<td key={i}>{conf.render(el)}</td>))}
                        </tr>))}
                    </tbody>
                </table>
                <div style={{backgroundColor: "lightgrey", display: "flex", justifyContent: "space-evenly"}}>
                    <Pagination
                        currentPage={currentPage} totalPages={totalPages}
                        handlePageChange={handlePageChange} rowsPerPage={rowsPerPage}
                        handleRowsPerPageChange={handleRowsPerPageChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default CommentsList;
