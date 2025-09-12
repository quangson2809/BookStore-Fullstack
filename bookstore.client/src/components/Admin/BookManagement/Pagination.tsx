import React from 'react';
import './Pagination.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems: number;
  itemsPerPage: number;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage
}) => {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      // Hiển thị tất cả trang nếu ít hơn hoặc bằng maxVisiblePages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Logic phức tạp hơn cho nhiều trang
      let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
      let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
      
      // Điều chỉnh startPage nếu endPage đã ở cuối
      if (endPage === totalPages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }
      
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }
    
    return pages;
  };

  const getItemRange = () => {
    const start = (currentPage - 1) * itemsPerPage + 1;
    const end = Math.min(currentPage * itemsPerPage, totalItems);
    return { start, end };
  };

  const { start, end } = getItemRange();
  const pageNumbers = getPageNumbers();

  // Không hiển thị pagination nếu chỉ có 1 trang hoặc ít hơn
  if (totalPages <= 1) return null;

  return (
    <div className="pagination">
      <div className="pagination-info">
        Hiển thị {start}-{end} trong tổng số {totalItems} kết quả
        <span className="page-info"> (Trang {currentPage} / {totalPages})</span>
      </div>
      
      <div className="pagination-controls">
        {/* Trang đầu */}
        <button
          className="pagination-btn first-last"
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          title="Trang đầu"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="11,17 6,12 11,7"/>
            <polyline points="18,17 13,12 18,7"/>
          </svg>
          Đầu
        </button>

        {/* Trang trước */}
        <button
          className="pagination-btn prev-next"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          title="Trang trước"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15,18 9,12 15,6"/>
          </svg>
          Trước
        </button>

        {/* Hiển thị dấu ... nếu cần thiết ở đầu */}
        {pageNumbers[0] > 1 && (
          <>
            <button
              className="pagination-btn page-number"
              onClick={() => onPageChange(1)}
            >
              1
            </button>
            {pageNumbers[0] > 2 && <span className="pagination-dots">...</span>}
          </>
        )}

        {/* Các số trang */}
        {pageNumbers.map(page => (
          <button
            key={page}
            className={`pagination-btn page-number ${currentPage === page ? 'active' : ''}`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}

        {/* Hiển thị dấu ... nếu cần thiết ở cuối */}
        {pageNumbers[pageNumbers.length - 1] < totalPages && (
          <>
            {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
              <span className="pagination-dots">...</span>
            )}
            <button
              className="pagination-btn page-number"
              onClick={() => onPageChange(totalPages)}
            >
              {totalPages}
            </button>
          </>
        )}

        {/* Trang sau */}
        <button
          className="pagination-btn prev-next"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          title="Trang sau"
        >
          Sau
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9,18 15,12 9,6"/>
          </svg>
        </button>

        {/* Trang cuối */}
        <button
          className="pagination-btn first-last"
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          title="Trang cuối"
        >
          Cuối
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="13,17 18,12 13,7"/>
            <polyline points="6,17 11,12 6,7"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Pagination;