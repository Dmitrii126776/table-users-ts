import React from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    handlePageChange: (page: number) => void;
    rowsPerPage: number;
    handleRowsPerPageChange: (rows: number) => void;
}

const Pagination: React.FC<PaginationProps> = (props) => {

    const {currentPage, totalPages, rowsPerPage, handleRowsPerPageChange, handlePageChange} = props
    const pages = [];

    // Logic to generate an array of page numbers
    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }

    return (
        <div className="d-flex align-items-center">
            <div className="mt-3">
                <nav>
                    <ul className="pagination">
                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                            <button className="page-link" aria-label="Previous"
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}>
                                <span aria-hidden="true">&laquo;</span>
                            </button>
                        </li>
                        {pages.map((page) => (
                            <li key={page} className={`page-item ${page === currentPage ? 'active' : ''}`}>
                                <button className="page-link" onClick={() => handlePageChange(page)}>
                                    {page}
                                </button>
                            </li>
                        ))}
                        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                            <button className="page-link" aria-label="Next"
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}>
                                <span aria-hidden="true">&raquo;</span>
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className="input-group">
                {/*<label className="input-group-text">Rows per page:</label>*/}
                <select className="form-select" value={rowsPerPage} style={{maxWidth: "100px", marginLeft: '20px'}}
                        onChange={(e) => handleRowsPerPageChange(parseInt(e.target.value))}>
                    <option value="5">5</option>
                    <option value="7">7</option>
                    <option value="9">9</option>
                </select>
            </div>
        </div>
    );
}

export default Pagination;
