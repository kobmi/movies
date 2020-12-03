import React from "react";
import classNames from "classnames";

const MovieTabs = ({ sort_by, updateSortBy }) => {
    const getLinkClassNames = (value) => {
        return classNames("nav-link", { active: sort_by === value });
    };
    const handleUpdateSortBy = (value) => {
        return () => updateSortBy(value);
    };
    return (
        <ul className="nav nav-tabs">
            <li className="nav-item">
                <a
                    onClick={handleUpdateSortBy("popularity.desc")}
                    href="#"
                    className={getLinkClassNames("popularity.desc")}
                >
                    Popularity desc
                </a>
            </li>
            <li className="nav-item">
                <a
                    onClick={handleUpdateSortBy("revenue.desc")}
                    href="#"
                    className={getLinkClassNames("revenue.desc")}
                >
                    Revenue desc
                </a>
            </li>
            <li className="nav-item">
                <a
                    onClick={handleUpdateSortBy("vote_avarage.desc")}
                    href="#"
                    className={getLinkClassNames("vote_avarage.desc")}
                >
                    Vote avarage desc
                </a>
            </li>
        </ul>
    );
};

export default MovieTabs;
