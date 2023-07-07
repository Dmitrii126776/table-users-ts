import React from 'react';
import {useState} from "react";
import * as XLSX from "xlsx";

const Home = () => {
    const [data, setData] = useState([]);

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
            <h1>Home Page</h1>
            <input
                type="file"
                accept=".xlsx, .xls"
                onChange={handleFileUpload}
            />
            <button onClick={handleDelete}>Delete File</button>

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
                    {data.map((row, index) => (
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

            <br/><br/>
            ... webstylepress ...
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
