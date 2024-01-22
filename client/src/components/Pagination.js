// Pagination.js
import React from 'react';
import ReactPaginate from 'react-paginate';

const Pagination = ({ pageCount, currentPage, onPageChange }) => {
  return (
    <ReactPaginate
      pageCount={pageCount}
      pageRangeDisplayed={3}
      marginPagesDisplayed={1}
      onPageChange={(selected) => onPageChange(selected.selected + 1)}
      containerClassName={'pagination'}
      activeClassName={'active'}
      previousLabel={'previous'}
      nextLabel={'next'}
    />
  );
};

export default Pagination;
