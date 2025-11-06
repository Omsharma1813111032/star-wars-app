export default function Pagination({ count, currentPage, setPage }) {
    const totalPages = Math.ceil(count / 10);
    const visiblePages = 3;
    const start = Math.max(1, currentPage - visiblePages);
    const end = Math.min(totalPages, currentPage + visiblePages);

    const pages = [];
    for (let i = start; i <= end; i++) pages.push(i);

    return (
        <div className="flex items-center justify-center gap-2 mt-8">
            <button
                disabled={currentPage === 1}
                onClick={() => setPage((p) => p - 1)}
                className="px-3 py-1 rounded border border-[#ffe81f40] text-[#ffe81f] hover:bg-[#ffe81f20] disabled:opacity-50"
            >
                Prev
            </button>

            {start > 1 && <span className="text-gray-400">…</span>}

            {pages.map((num) => (
                <button
                    key={num}
                    onClick={() => setPage(num)}
                    className={`px-3 py-1 rounded border transition ${num === currentPage
                            ? "bg-[#ffe81f] text-black font-bold"
                            : "border-[#ffe81f40] text-[#ffe81f] hover:bg-[#ffe81f20]"
                        }`}
                >
                    {num}
                </button>
            ))}

            {end < totalPages && <span className="text-gray-400">…</span>}

            <button
                disabled={currentPage === totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="px-3 py-1 rounded border border-[#ffe81f40] text-[#ffe81f] hover:bg-[#ffe81f20] disabled:opacity-50"
            >
                Next
            </button>
        </div>
    );
}
