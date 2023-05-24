import React, {useEffect, useState,} from 'react';
import {IUser} from "../types/types";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";

type UserItemPageParams = {
    id: string;
}

const UserItemPage: React.FC = () => {
    const [user, setUser] = useState<IUser | null>(null);
    const params = useParams<UserItemPageParams>();
    const navigate = useNavigate()

    useEffect(() => {
        async function getUser() {
            try {
                const response = await axios.get<IUser>(`https://jsonplaceholder.typicode.com/users/${params.id}`);
                setUser(response.data);
            } catch (e) {
                alert(e);
            }
        }

        getUser();
    }, [params.id]);

    return (
        <div style={{paddingTop: '60px'}}>
            <button onClick={() => navigate('/users')}>Back</button>
            <div>{user?.name}</div>
            <div>{user?.address.city}</div>
        </div>
    );
};

export default UserItemPage;

