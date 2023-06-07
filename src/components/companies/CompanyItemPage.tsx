import React, {useEffect, useState} from 'react';
import {IUser} from "../../types/types";
import {useNavigate, useParams} from "react-router-dom";


type CompanyItemPageParams = {
    id: string;
}
const CompanyItemPage: React.FC = () => {
    const [user, setUser] = useState<IUser | null>(null)
    const params = useParams<CompanyItemPageParams>()
    const navigate = useNavigate()

    useEffect(() => {
        function getCompany() {
            fetch(`https://jsonplaceholder.typicode.com/users/${params.id}`)
                .then(response => response.json())
                .then(data => setUser(data))
                .catch(error => alert(error))
        }

        getCompany()
    }, [params.id])

    return (
        <div style={{paddingTop: '60px'}}>
            <div className="d-flex flex-row justify-content-evenly align-items-center m-3">
                <h3>This is company: {user?.company.name}</h3>
                <button type="button" className="btn btn-outline-primary"
                        onClick={() => navigate('/companies')}>BackToList
                </button>
            </div>
            <div className="row g-3 m-3">
                <div className="col-sm">
                    <label>Company Name</label>
                    <input type="text" className="form-control" value={user?.company.name || ''} readOnly={true}/>
                </div>
                <div className="col-sm">
                    <label>Company CatchPhrase</label>
                    <input type="text" className="form-control" value={user?.company.catchPhrase || ''}
                           readOnly={true}/>
                </div>
                <div className="col-sm">
                    <label>Company BS</label>
                    <input type="text" className="form-control" value={user?.company.bs || ''} readOnly={true}/>
                </div>
            </div>
            <div className="row g-3 m-3">
                <div className="col-sm">
                    <label>Company Manager</label>
                    <input type="text" className="form-control" value={user?.name || ''} readOnly={true}/>
                </div>
                <div className="col-sm">
                    <label>Company Website</label>
                    <input type="text" className="form-control" value={user?.website || ''}
                           readOnly={true}/>
                </div>
                <div className="col-sm">
                    <label>Company Phone</label>
                    <input type="text" className="form-control" value={user?.phone || ''} readOnly={true}/>
                </div>
                <div className="col-sm">
                    <label>Company Email</label>
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
                    <input type="text" className="form-control" value={user?.address.street || ''}
                           readOnly={true}/>
                </div>
                <div className="col-sm">
                    <label>Zipcode</label>
                    <input type="text" className="form-control" value={user?.address.zipcode || ''} readOnly={true}/>
                </div>
            </div>
        </div>
    );
};

export default CompanyItemPage;
