import React, {useState} from 'react';
import {IUser} from "../../types/types";
import {useNavigate} from "react-router-dom";

interface UserListProps {
    users: IUser[];
}

const UserList: React.FC<UserListProps> = (props) => {
    const {users} = props
    const navigate = useNavigate()

    const [currentPage, setCurrentPage] = useState<number>(1)
    const [rowsPerPage, setRowsPerPage] = useState<number>(3)

    // Logic to calculate the number of pages needed
    const totalPages = Math.ceil(users.length / rowsPerPage)

    // Logic to return the rows for the current page
    const rowsForCurrentPage = users.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    )

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    }

    const handleRowsPerPageChange = (rows: number) => {
        setRowsPerPage(rows)
        setCurrentPage(1) // Reset current page when rows per page changes
    }
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
    }

    function handleRowClick(user: IUser) {
        // Perform actions with the clicked user
        // Redirect to a user detail page, etc.
        const id = user.id
        navigate(`/users/${id}`)
    }

    const config = [
        {key: 'id', label: '#', render: (row: IUser) => <>{row.id}</>},
        {key: 'name', label: 'Name', render: (row: { name: string; }) => <>{row.name}</>},
        {key: 'email', label: 'Email', render: (row: { email: string; }) => <>{row.email}</>},
        {key: 'city', label: 'City', render: (row: IUser) => <>{row.address.city}</>},
        {key: 'street', label: 'Street', render: (row: IUser) => <>{row.address.street}</>},
        {key: 'suite', label: 'Suite', render: (row: IUser) => <>{row.address.suite}</>},
        {key: 'zipcode', label: 'Zipcode', render: (row: IUser) => <>{row.address.zipcode}</>},
    ]

    return (
        <div style={{paddingTop: '60px'}}>
            <h3 className="m-2 text-center">Users Tables</h3>
            <div className="m-2">
                <table className="table table-striped table-hover table-bordered mb-0">
                    <thead>
                    <tr>
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
                <div className="align-items-center"
                    style={{
                        backgroundColor: "lightgrey", display: "flex",
                        justifyContent: "space-evenly"
                    }}>
                    <div className="d-flex align-items-center">

                            <nav aria-label="Page navigation example">
                                <ul className="pagination mb-0 p-3">
                                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                        <button className="page-link"
                                                onClick={() => handlePageChange(currentPage - 1)}
                                                disabled={currentPage === 1}
                                        >Previous
                                        </button>
                                    </li>
                                    {pages.map((page, i) =>
                                        (
                                            <li key={i} className={`page-item ${page === currentPage ? 'active' : ''}`}>
                                                <button className="page-link" onClick={() => handlePageChange(page)}>
                                                    {page}
                                                </button>
                                            </li>
                                        ))}
                                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                        <button className="page-link" disabled={currentPage === totalPages}
                                                onClick={() => handlePageChange(currentPage + 1)}
                                        >Next
                                        </button>
                                    </li>
                                </ul>
                            </nav>

                        <div className="input-group">
                            {/*<label className="input-group-text">Rows per page:</label>*/}
                            <select className="form-select" value={rowsPerPage}
                                    style={{maxWidth: "100px", marginLeft: '20px'}}
                                    onChange={(e) => handleRowsPerPageChange(parseInt(e.target.value))}>
                                <option value="3">3</option>
                                <option value="5">5</option>
                                <option value="7">7</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserList;
