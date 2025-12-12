import React from "react";
import CommentCard from "../components/CommentCard";
import CommentForm from "../components/CommentForm";
import CommentList from "../components/CommentList";
import { useComments } from "../context/CommentsContext";

export default function CommentsPage() {
    const { error, loading } = useComments();
    if (loading) {
        return <div className="text-center mt-10">Loading comments...</div>;
    }
    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold text-center mb-6">Comments</h1>
            {error && <div className="text-red-500 text-center mt-4">{error}</div>}
            <div className="mt-6">
                <CommentList />
            </div>
            <CommentForm />
        </div>
    );
    }