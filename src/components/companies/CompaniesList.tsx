import React, {useState} from 'react';
import {IUser} from "../../types/types";
import Pagination from "../Pagination";

interface CompaniesListProps {
    users: IUser[];
}

const CompaniesList: React.FC<CompaniesListProps> = (props) => {
    const {users} = props

    const config = [
        {key: 'id', label: '#', render: (row: IUser) => <>{row.id}</>},
        {key: 'name', label: 'Name', render: (row: IUser) => <>{row.company.name}</>},
        {key: 'bs', label: 'BS Company', render: (row: IUser) => <>{row.company.bs}</>},
        {key: 'catchPhrase', label: 'CatchPhrase', render: (row: IUser) => <>{row.company.catchPhrase}</>},
        {key: 'website', label: 'Website', render: (row: IUser) => <>{row.website}</>},
        {key: 'phone', label: 'Phone', render: (row: IUser) => <>{row.phone}</>},
    ]

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [rowsPerPage, setRowsPerPage] = useState<number>(9);

    const totalPages = Math.ceil(users.length / rowsPerPage);

    const rowsForCurrentPage = users.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );
    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }

    const handleRowsPerPageChange = (rows: number) => {
        setRowsPerPage(rows)
        setCurrentPage(1)
    }

    function handleRowClick(user: IUser) {
        const id = user.id
        console.log(id)
    }

    return (
        <div style={{marginTop: '65px'}}>
            <h3 className="m-2 text-center">Companies Tables</h3>
            <div className="m-2">
                <table className="table table-striped table-hover table-bordered">
                    <thead>
                    <tr>
                        {config.map((el, i) => (<th key={i}>{el.label}</th>))}
                    </tr>
                    </thead>
                    <tbody>
                    {rowsForCurrentPage.map(el =>
                        (
                            <tr key={el.id}
                                style={{cursor: "pointer"}} onClick={() => handleRowClick(el)}>
                                {config.map((conf, i) => (<td key={i}>{conf.render(el)}</td>))}
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div style={{backgroundColor: "lightgrey", display: "flex", justifyContent: "space-evenly"}}>
                    <Pagination
                        currentPage={currentPage} totalPages={totalPages}
                        handlePageChange={handlePageChange} rowsPerPage={rowsPerPage}
                        handleRowsPerPageChange={handleRowsPerPageChange}/>
                </div>
            </div>
        </div>
    );
};

export default CompaniesList;

// import React from 'react';
// import { IUser, IComment } from "../../types/types";
//
// interface CompaniesListProps {
//     users: IUser[];
//     comments: IComment[];
// }
//
// function handleRowClick(user: IUser) {
//     const id = user.id;
//     console.log(id);
// }
//
// const CompaniesList: React.FC<CompaniesListProps> = (props) => {
//     const { users, comments } = props;
//
//     // Create a map of comments indexed by comment ID
//     const commentsMap: Record<string, IComment> = comments.reduce((map, comment) => {
//         map[String(comment.id)] = comment;
//         return map;
//     }, {} as Record<string, IComment>);
//
//     return (
//         <div style={{ marginTop: '65px' }}>
//             <h3 className="m-2 text-center">Companies Tables</h3>
//             <div className="m-2">
//                 <table className="table table-striped table-hover table-bordered">
//                     <thead>
//                     <tr>
//                         <th>#</th>
//                         <th>Name</th>
//                         <th>BS Company</th>
//                         <th>CatchPhrase</th>
//                         <th>Website</th>
//                         <th>Phone</th>
//                         <th>Body</th>
//                     </tr>
//                     </thead>
//                     <tbody>
//                     {users.map((user) => (
//                         <tr key={user.id} style={{ cursor: 'pointer' }} onClick={() => handleRowClick(user)}>
//                             <td>{user.id}</td>
//                             <td>{user.company.name}</td>
//                             <td>{user.company.bs}</td>
//                             <td>{user.company.catchPhrase}</td>
//                             <td>{user.website}</td>
//                             <td>{user.phone}</td>
//                             <td>{commentsMap[user.id]?.body}</td>
//                         </tr>
//                     ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };
//
// export default CompaniesList;
