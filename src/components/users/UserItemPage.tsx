import React, {useEffect, useState,} from 'react';
import {IUser} from "../../types/types";
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
                    <input type="text" className="form-control" value={user?.name || ''} readOnly={true}/>
                </div>
                <div className="col-sm">
                    <label>User Email</label>
                    <input type="text" className="form-control" value={user?.email || ''} readOnly={true}/>
                </div>

            </div>
            <div className="row g-3 m-3">
                <div className="col-sm">
                    <label>City</label>
                    <input type="text" className="form-control" value={user?.address.city || ''} readOnly={true}/>
                </div>
                <div className="col-sm">
                    <label>Street</label>
                    <input type="text" className="form-control" value={user?.address.street || ''} readOnly={true}/>
                </div>
                <div className="col-sm">
                    <label>Suite</label>
                    <input type="text" className="form-control" value={user?.address.suite || ''} readOnly={true}/>
                </div>
                <div className="col-sm">
                    <label>zipcode</label>
                    <input type="text" className="form-control" value={user?.address.zipcode || ''} readOnly={true}/>
                </div>
            </div>
            <div className="row g-3 m-3">
                <div className="col-md-4">
                    <label>Company Name</label>
                    <input type="text" className="form-control" value={user?.company.name || ''} readOnly={true}/>
                </div>
                <div className="col-md-4">
                    <label>Company CatchPhrase</label>
                    <input type="text" className="form-control" value={user?.company.catchPhrase || ''}
                           readOnly={true}/>
                </div>
                <div className="col-md-4">
                    <label>Company BS</label>
                    <input type="text" className="form-control" value={user?.company.bs || ''} readOnly={true}/>
                </div>
            </div>
        </div>
    );
};

export default UserItemPage;

