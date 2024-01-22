// Pagination.js

import React from 'react';
import ReactPaginate from 'react-paginate';

const Pagination = ({ pageCount, onPageChange }) => {
	return (
		<ReactPaginate
			previousLabel={'← Previous'}
			nextLabel={'Next →'}
			pageCount={pageCount}
			onPageChange={onPageChange}
			containerClassName={'pagination'}
			previousLinkClassName={'pagination__link'}
			nextLinkClassName={'pagination__link'}
			disabledClassName={'pagination__link--disabled'}
			activeClassName={'pagination__link--active'}
		/>
	);
};

export default Pagination;
