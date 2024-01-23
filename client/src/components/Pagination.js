import React from 'react';

const Pagination = ({
	totalItems,
	itemsPerPage,
	onPageChange,
	currentPage,
	handelItemsPerPage,
}) => {
	const totalPages = Math.ceil(totalItems / itemsPerPage);
	return (
		<div className='paginationOuterContainer'>
			<div className='paginationInnerContainer'>
				<div
					onClick={() => {
						if (currentPage - 1 >= 1) onPageChange(currentPage - 1);
					}}
					className='paginationButton'>
					{'<'}
				</div>
				{currentPage}-{totalPages} of {totalItems}
				<div
					onClick={() => {
						if (currentPage + 1 <= totalPages) onPageChange(currentPage + 1);
					}}
					className='paginationButton'>
					{'>'}
				</div>
			</div>
			<div className='itemsPerPageDropdownContainer'>
				{itemsPerPage} Per Page ▼
				<div className='itemsPerPageDropdown'>
					<div>
						<div
							className='itemPerPageDropdown'
							onClick={() => handelItemsPerPage(10)}>
							10
						</div>
						<div
							className='itemPerPageDropdown'
							onClick={() => handelItemsPerPage(20)}>
							20
						</div>
						<div
							className='itemPerPageDropdown'
							onClick={() => handelItemsPerPage(25)}>
							25
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Pagination;
