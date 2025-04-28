"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

interface Post {
  id: string;
  title: string;
  content: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

const PastPostsPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPastPosts = async () => {
      try {
        const response = await fetch("http://localhost:3000/posts", {
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch posts.");
        }
        const data = await response.json();
        const allPosts: Post[] = data.posts;

        // Filter posts that are before today
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Set time to 00:00:00

        const pastPosts = allPosts.filter((post) => {
          const postDate = new Date(post.createdAt);
          return postDate < today;
        });

        setPosts(pastPosts);
      } catch (err: any) {
        setError(err.message || "Something went wrong.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPastPosts();
  }, []);

  if (isLoading) {
    return (
      <div className="text-center text-gray-600 mt-10">Loading past posts...</div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 mt-10">Error: {error}</div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center text-gray-600 mt-10">
        No posts in past.
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-6 space-y-4">
      {posts.map((post) => (
        <div
          key={post.id}
          className="border rounded-lg p-4 shadow hover:shadow-md transition"
        >
          <Link
            href={`/posts/${post.id}`}
            className="text-lg font-semibold text-blue-700 hover:underline"
          >
            {post.title}
          </Link>
          <div className="text-sm text-gray-500 mt-1">
            Posted on {new Date(post.createdAt).toLocaleDateString()}
          </div>
          <p className="mt-2 text-gray-700">{post.content}</p>
        </div>
      ))}
    </div>
  );
};

export default PastPostsPage;
