import React from 'react';
import {IUser} from "../types/types";
import {useNavigate} from "react-router-dom";

interface UserListProps {
    users: IUser[];
}

const UserList: React.FC<UserListProps> = (props) => {
    const {users} = props
    const navigate = useNavigate()

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
            <h2 className="m-4">Users Tables</h2>
            <div className="m-2">
                <table className="table table-striped table-hover table-bordered">
                    <thead>
                    <tr>
                        {config.map((el, i) => (<th key={i}>{el.label}</th>))}
                    </tr>
                    </thead>
                    <tbody>
                    {users.map(el => (
                        <tr key={el.id} onClick={() => handleRowClick(el)} style={{cursor: "pointer"}}>
                            {config.map((conf, i) => (<td key={i}>{conf.render(el)}</td>))}
                        </tr>))}

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserList;
