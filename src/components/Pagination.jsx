import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

function Pagination({ currentPage, totalPosts, postsPerPage, setCurrentPage }) {
    const totalPages = Math.ceil(totalPosts / postsPerPage);

    const renderPage = () => {
        const pages = [];
        const showEllipsis = totalPages > 7;

        if (showEllipsis) {
            if (currentPage <= 4) {
                for (let i = 1; i <= 7; i++) {
                    pages.push(i);
                }
                pages.push("...");
                pages.push(totalPages);
            } else if (currentPage >= totalPages - 3) {
                pages.push(1);
                pages.push("...");
                for (let i = totalPages - 6; i <= totalPages; i++) {
                    pages.push(i);
                }
            } else {
                pages.push(1);
                pages.push("...");
                for (let i = currentPage - 2; i <= currentPage + 2; i++) {
                    pages.push(i);
                }
                pages.push("...");
                pages.push(totalPages);
            }
        } else {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        }
        return pages;
    };

    return (
        <div>
            <button
                className=""
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
            >
                <ChevronLeftIcon className="h-5 w-5" />
            </button>
            {renderPage().map((page, index) => (
                <button
                    key={index}
                    className={`pagination-button ${currentPage === page ? "active" : ""}`}
                    onClick={() => typeof page === "number" && setCurrentPage(page)}
                >
                    {page}
                </button>
            ))}
            <button
                className="pagination-button"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                <ChevronRightIcon className="h-5 w-5" />
            </button>
        </div>
    );
}

export default Pagination;
