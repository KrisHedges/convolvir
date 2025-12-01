import Link from "next/link";
import { createServerClient } from "@/lib/supabase/server";
import LogoutButton from "./logout-button";

export default async function Paginator({
    query,
    page,
    totalPages,
}: {
    query: string;
    page: number;
    totalPages: number;
}) {
    return (
        <nav>
            {page > 1 && (
                <Link href={`/?q=${query || ""}&page=${page - 1}`}>
                    Previous
                </Link>
            )}
            {page < totalPages && (
                <Link href={`/?q=${query || ""}&page=${page + 1}`}>
                    Next
                </Link>
            )}
        </nav>
    );
}
