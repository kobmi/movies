import React from "react";
import classNames from "classnames";

const Pagination = ({ getNextPage, getPreviousPage, page }) => {
    const getLinkClassNames = () => {
        return classNames("page-item", { disabled: page === 1 });
    };

    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination">
                <li className={getLinkClassNames()}>
                    <a onClick={getPreviousPage} className="page-link" href="#">
                        Previous
                    </a>
                </li>
                <li className="page-item">
                    <a onClick={getNextPage} className="page-link" href="#">
                        Next
                    </a>
                </li>
            </ul>
        </nav>
    );
};
export default Pagination;
