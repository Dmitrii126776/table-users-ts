import React from 'react';
import {useState} from "react";
import * as XLSX from "xlsx";
import Pagination from "./Pagination";

const Home = () => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const totalPages = Math.ceil(data.length / rowsPerPage);

    const rowsForCurrentPage = data.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleRowsPerPageChange = (rows: number) => {
        setRowsPerPage(rows);
        setCurrentPage(1); // Reset current page when rows per page changes
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const reader = new FileReader();
        reader.readAsBinaryString(e.target.files![0]);
        reader.onload = (e) => {
            const binaryData = e.target?.result as string;
            const workbook = XLSX.read(binaryData, {type: 'binary'});
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const parsedData = XLSX.utils.sheet_to_json(sheet);
            // @ts-ignore
            setData(parsedData);
        };
    }

    const handleDelete = () => {
        setData([]);
    };

    return (
        <div style={{paddingTop: '60px'}}>
            {/*<div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>*/}
            <div className="d-flex flex-column align-items-center">
                <h2 className="m-3">Default file input example</h2>
                {/*<label htmlFor="formFile" className="form-label">Default file input example</label>*/}
                <div className="mb-3 justify-content-center" style={{display: "flex", alignItems: "center"}}>
                    <div style={{maxWidth: "300px", marginRight: "30px"}}>
                        <input className="form-control" type="file" accept=".xlsx, .xls" id="formFile"
                               onChange={handleFileUpload}/>
                    </div>
                    <button type="button" className="btn btn-secondary" onClick={handleDelete}>Delete File</button>
                </div>
            </div>
            {data.length > 0 && (
                <table className="table">
                    <thead>
                    <tr>
                        {Object.keys(data[4]).map((key) => (
                            <th key={key}>{key}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {rowsForCurrentPage.map((row, index) => (
                        <tr key={index}>
                            {/*{Object.values(row).map((value: any, index) => (*/}
                            {/*    <td key={index}>{value}</td>*/}
                            {/*))}*/}
                            {Object.keys(data[4]).map((key) => (
                                <td key={key}>{row[key] !== undefined ? row[key] : ''}</td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
            <div style={{backgroundColor: "lightgrey", display: "flex", justifyContent: "space-evenly"}}>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    handlePageChange={handlePageChange}
                    rowsPerPage={rowsPerPage}
                    handleRowsPerPageChange={handleRowsPerPageChange}/>
            </div>
        </div>
    );
};
export default Home;


// import React, {useState} from 'react';
// import * as XLSX from 'xlsx';
//
// const Home = () => {
//     const [data, setData] = useState<any[]>([]);
//     const [error, setNotification] = useState<string | null>(null);
//
//
//     const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const file = e.target.files?.[0];
//
//         if (file) {
//             const fileName = file.name;
//             const fileExtension = fileName.substr(fileName.lastIndexOf('.')).toLowerCase();
//
//             if (fileExtension === '.xls' || fileExtension === '.xlsx') {
//                 const reader = new FileReader();
//                 reader.onload = (e) => {
//                     const binaryData = e.target?.result as string;
//                     const workbook = XLSX.read(binaryData, {type: 'binary'});
//                     const sheetName = workbook.SheetNames[0];
//                     const sheet = workbook.Sheets[sheetName];
//                     const parsedData = XLSX.utils.sheet_to_json(sheet);
//                     setData(parsedData);
//                     setNotification(null);
//                 };
//                 reader.readAsBinaryString(file);
//             } else {
//                 setNotification('Unsupported file format. Please select a .xlsx or .xls file.');
//                 setData([]);
//             }
//         }
//     };
//
//     const handleDelete = () => {
//         setData([]);
//     };
//
//     return (
//         <div style={{paddingTop: '60px'}}>
//             <h1>Home Page</h1>
//             <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload}/>
//             <button onClick={handleDelete}>Delete File</button>
//
//             {error && <div>{error}</div>}
//
//             {data.length > 0 && (
//                 <table className="table">
//                     <thead>
//                     <tr>
//                         {Object.keys(data[0]).map((key) => (
//                             <th key={key}>{key}</th>
//                         ))}
//                     </tr>
//                     </thead>
//                     <tbody>
//                     {data.map((row, index) => (
//                         <tr key={index}>
//                             {Object.values(row).map((value: any, index) => (
//                                 <td key={index}>{value}</td>
//                             ))}
//                         </tr>
//                     ))}
//                     </tbody>
//                 </table>
//             )}
//
//             <br/>
//             <br/>
//             ... webstylepress ...
//         </div>
//     );
// };
//
// export default Home;
