import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Pagination = ({ allElementCount, url, page, recordPerPage, setPaginationSlice, elementCount }) => {
    const navigate = useNavigate();

    useEffect(() => {
        setPaginationSlice({
            first: Number(page) * recordPerPage - recordPerPage,
            second: Number(page) * recordPerPage
        });
    }, [page]);

    const handlePreviousButton = () => {
        navigate(`/${url}/${Number(page) - 1}`);
        window.scrollTo({top: "0px"});
    };

    const handlePageClick = (pageNumber) => {
        navigate(`/${url}/${pageNumber}`);
        window.scrollTo({top: "0px"});
    }

    const handleNextButton = () => {
        navigate(`/${url}/${Number(page) + 1}`);
        window.scrollTo({top: "0px"});
    };

    const totalPages = Math.ceil(allElementCount / recordPerPage);
    const displayPages = 2;

    const getPageRange = () => {
        let start = Math.max(1, Number(page) - displayPages);
        let end = Math.min(totalPages, Number(page) + displayPages);

        if (end - start + 1 < 2 * displayPages) {
            if (start === 1) {
                end = Math.min(totalPages, start + 2 * displayPages - 1);
            } else {
                start = Math.max(1, end - 2 * displayPages + 1);
            }
        }

        return Array.from({ length: end - start + 1 }, (_, index) => start + index);
    };

    const pageNumbers = getPageRange();

    return (
        <nav aria-label="Page navigation">
            <ul className="pagination bg-secondary" style={{ borderRadius: "15px" }}>
                <li className={`page-item ${page === "1" ? 'disabled' : ''}`}>
                    <a className="page-link" aria-label="Previous" onClick={() => handlePreviousButton()}>
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
                {pageNumbers.map((pageNumber) => (
                    <li key={pageNumber} className={`page-item ${pageNumber === Number(page) ? 'active' : ''}`}>
                        <a className={`page-link ${pageNumber === Number(page) ? 'bg-danger text-white' : 'text-dark'}`} onClick={() => handlePageClick(pageNumber)} type="media_type">
                            {pageNumber}
                        </a>
                    </li>
                ))}
                <li className={`page-item ${elementCount < recordPerPage ? 'disabled' : ''}`}>
                    <a className="page-link" aria-label="Next" onClick={() => handleNextButton()}>
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;