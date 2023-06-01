import React from 'react';
import {IUser} from "../../types/types";

interface CompaniesListProps {
    users: IUser[]
}

const CompaniesList: React.FC<CompaniesListProps> = (props) => {
    const {users} = props
    return (
        <div style={{marginTop: '60px'}}>
            <h3 className="m-2 text-center">Companies Tables</h3>
            {users.length}
        </div>
    );
};

export default CompaniesList;
