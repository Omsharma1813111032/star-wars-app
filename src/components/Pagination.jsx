export default function Pagination({ count, currentPage, setPage }) {
    const totalPages = Math.ceil(count / 10);
    const pages = [];

    const visiblePages = 3;
    const start = Math.max(1, currentPage - visiblePages);
    const end = Math.min(totalPages, currentPage + visiblePages);

    for (let i = start; i <= end; i++) {
        pages.push(i);
    }

    return (
        <div className="flex items-center justify-center gap-2 mt-6">
            <button
                disabled={currentPage === 1}
                onClick={() => setPage((p) => p - 1)}
                className="px-3 py-1 border rounded disabled:opacity-50"
            >
                Prev
            </button>

            {start > 1 && <span>...</span>}
            {pages.map((num) => (
                <button
                    key={num}
                    onClick={() => setPage(num)}
                    className={`px-3 py-1 border rounded ${num === currentPage ? "bg-blue-600 text-white" : ""
                        }`}
                >
                    {num}
                </button>
            ))}
            {end < totalPages && <span>...</span>}

            <button
                disabled={currentPage === totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="px-3 py-1 border rounded disabled:opacity-50"
            >
                Next
            </button>
        </div>
    );
}
