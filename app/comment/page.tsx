"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

interface Comment {
  id: string;
  content: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  postId: string | null;
  post: {
    id: string;
    title: string;
  } | null;
}

const UserCommentsPage = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch("http://localhost:3000/comments/me", {
          credentials: "include", // important if you need to send cookies/session
        });
        if (!response.ok) {
          if (response.status === 404) {
            setComments([]);
            return;
          }
          throw new Error("Failed to fetch comments.");
        }
        const data = await response.json();
        setComments(data.comments); // Assuming API returns { comments: [...] }
      } catch (err: any) {
        setError(err.message || "Something went wrong.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchComments();
  }, []);

  if (isLoading) {
    return <div className="text-center text-gray-600 mt-10">Loading comments...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 mt-10">Error: {error}</div>;
  }

  if (comments.length === 0) {
    return <div className="text-center text-gray-600 mt-10">No comments yet.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-6 space-y-4">
      {comments.map((comment) => (
        <div
          key={comment.id}
          className="border rounded-lg p-4 shadow hover:shadow-md transition"
        >
          <div className="text-sm text-gray-500 mb-1">
            Commented on:
            {comment.post ? (
              <Link
                href={`/posts/${comment.post.id}`}
                className="ml-1 text-blue-700 hover:underline"
              >
                {comment.post.title}
              </Link>
            ) : (
              <span className="ml-1 italic text-gray-400">Unknown Post</span>
            )}
          </div>
          <p className="text-gray-800">{comment.content}</p>
          <div className="text-xs text-gray-400 mt-2">
            {new Date(comment.createdAt).toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserCommentsPage;
