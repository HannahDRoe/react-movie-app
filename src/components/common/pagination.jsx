import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";
const Pagination = ({
  totalMovies,
  moviesPerPage,
  currentPage,
  onPageChange
}) => {
  const pageCount = Math.ceil(totalMovies / moviesPerPage);
  const pages = _.range(1, pageCount + 1);
  if (pageCount === 1) return null;
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {pages.map(page => {
          return (
            <li
              key={`page-${page}`}
              className={
                currentPage === page ? "page-item active" : "page-item"
              }
            >
              <button className="page-link" onClick={() => onPageChange(page)}>
                {page}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Pagination;

Pagination.propTypes = {
  totalMovies: PropTypes.number.isRequired,
  moviesPerPage: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};
