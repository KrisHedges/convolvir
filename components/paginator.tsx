import Link from "next/link";
import styles from "./paginator.module.css";

interface PaginatorProps {
    query: string;
    page: number;
    totalPages: number;
    totalCount: number;
    pageSize: number;
}

export default function Paginator({
    query,
    page,
    totalPages,
    totalCount,
    pageSize,
}: PaginatorProps) {
    const startItem = (page - 1) * pageSize + 1;
    const endItem = Math.min(page * pageSize, totalCount);

    // Helper to generate page numbers with ellipsis
    const getPageNumbers = () => {
        const pages = [];
        const showMax = 5; // Max page buttons to show (excluding first/last)

        if (totalPages <= showMax + 2) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Always show first page
            pages.push(1);

            let start = Math.max(2, page - 1);
            let end = Math.min(totalPages - 1, page + 1);

            if (page <= 3) {
                end = 4;
            }
            if (page >= totalPages - 2) {
                start = totalPages - 3;
            }

            if (start > 2) {
                pages.push("...");
            }

            for (let i = start; i <= end; i++) {
                pages.push(i);
            }

            if (end < totalPages - 1) {
                pages.push("...");
            }

            // Always show last page
            pages.push(totalPages);
        }
        return pages;
    };

    const pageNumbers = getPageNumbers();

    return (
        <div className={styles.container}>
            <div className={styles.info}>
                Showing <strong>{startItem}</strong> to <strong>{endItem}</strong> of <strong>{totalCount}</strong> results
            </div>
            <nav className={styles.pagination} aria-label="Pagination">
                <Link
                    href={`/?q=${query || ""}&page=${page - 1}`}
                    className={`${styles.pageLink} ${styles.navButton} ${page <= 1 ? styles.disabled : ""}`}
                    aria-disabled={page <= 1}
                    tabIndex={page <= 1 ? -1 : undefined}
                >
                    Previous
                </Link>

                {pageNumbers.map((pageNum, index) => (
                    pageNum === "..." ? (
                        <span key={`ellipsis-${index}`} className={styles.ellipsis}>...</span>
                    ) : (
                        <Link
                            key={pageNum}
                            href={`/?q=${query || ""}&page=${pageNum}`}
                            className={`${styles.pageLink} ${pageNum === page ? styles.active : ""}`}
                            aria-current={pageNum === page ? "page" : undefined}
                        >
                            {pageNum}
                        </Link>
                    )
                ))}

                <Link
                    href={`/?q=${query || ""}&page=${page + 1}`}
                    className={`${styles.pageLink} ${styles.navButton} ${page >= totalPages ? styles.disabled : ""}`}
                    aria-disabled={page >= totalPages}
                    tabIndex={page >= totalPages ? -1 : undefined}
                >
                    Next
                </Link>
            </nav>
        </div>
    );
}
