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
            <div className="d-flex flex-row justify-content-evenly align-items-center m-3">
                <h3>This is {user?.name} Account</h3>
                <button type="button" className="btn btn-outline-primary"
                        onClick={() => navigate('/users')}>BackToList
                </button>
            </div>

            <div className="row g-3 m-3">
                <div className="col-sm">
                    <label>User Name</label>
                    <input type="text" className="form-control" value={user?.name}/>
                </div>
                <div className="col-sm">
                    <label>User Email</label>
                    <input type="text" className="form-control" value={user?.email}/>
                </div>
                <div className="col-sm">
                    <label>User Name</label>
                    <input type="text" className="form-control" value={user?.address.city}/>
                </div>
            </div>
            <div className="row g-3 m-3">
                <div className="col-sm">
                    <label>Street</label>
                    <input type="text" className="form-control" value={user?.address.street}/>
                </div>
                <div className="col-sm">
                    <label>Suite</label>
                    <input type="text" className="form-control" value={user?.address.suite}/>
                </div>
                <div className="col-sm">
                    <label>zipcode</label>
                    <input type="text" className="form-control" value={user?.address.zipcode}/>
                </div>
            </div>
        </div>
    );
};

export default UserItemPage;

