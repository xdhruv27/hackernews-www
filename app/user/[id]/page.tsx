"use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import Link from "next/link";

// interface User {
//   id: string;
//   username: string;
//   name: string;
//   createdAt: string;
//   postsCount: number;
//   commentsCount: number;
//   posts: Array<{ title: string; id: string }>;
// }

// const UserProfilePage = () => {
//   const { id } = useParams(); // Get user ID from URL params
//   const [user, setUser] = useState<User | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const response = await fetch(`http://localhost:3000/users/${id}`);
//         if (!response.ok) {
//           throw new Error("Failed to fetch user data.");
//         }
//         const data = await response.json();
//         setUser(data.user);
//       } catch (err: any) {
//         setError(err.message || "Something went wrong.");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchUserData();
//   }, [id]);

//   if (isLoading) return <div className="p-6 text-gray-500">Loading...</div>;
//   if (error) return <div className="p-6 text-red-500">Error: {error}</div>;

//   if (!user) return <div className="p-6 text-gray-500">User not found.</div>;

//   return (
//     <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow space-y-4">
//       <h1 className="text-3xl font-bold text-blue-700">{user.name}</h1>
//       <p className="text-gray-800">Username: {user.username}</p>
//       <p className="text-gray-800">
//         Account Created on: {new Date(user.createdAt).toLocaleDateString("en-IN")}
//       </p>
//       <p className="text-gray-800">Posts Count: {user.postsCount}</p>
//       <p className="text-gray-800">Comments Count: {user.commentsCount}</p>

//       <h2 className="text-xl font-bold text-blue-700 mt-6">Posts</h2>
//       <ul>
//         {user.posts.map((post) => (
//           <li key={post.id} className="mt-2 text-gray-600">
//             <Link href={`/posts/${post.id}`} className="text-blue-600 hover:underline">
//               {post.title}
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default UserProfilePage;




import { useEffect, useState } from 'react';

// Define the types for user and their posts/comments
interface Comment {
  id: string;
  content: string;
  postId: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

interface Post {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

interface UserDetails {
  user: {
    id: string;
    username: string;
    name: string;
    about: string;
    createdAt: string;
    updatedAt: string;
    postsCount: number;
    commentsCount: number;
    posts: Post[];
    comments: Comment[];
  };
}

const UserPage = ({ userId }: { userId: string }) => {
  const [userData, setUserData] = useState<UserDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/users/${userId}`);

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data: UserDetails = await response.json();
        setUserData(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  if (!userData) return null;

  return (
    <div>
      <h1>{userData.user.username}'s Profile</h1>
      <p>Name: {userData.user.name}</p>
      <p>About: {userData.user.about}</p>
      <p>Posts Count: {userData.user.postsCount}</p>
      <p>Comments Count: {userData.user.commentsCount}</p>
      <h2>Posts</h2>
      {userData.user.posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        <ul>
          {userData.user.posts.map(post => (
            <li key={post.id}>
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              <p>Created at: {new Date(post.createdAt).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
      <h2>Comments</h2>
      {userData.user.comments.length === 0 ? (
        <p>No comments available.</p>
      ) : (
        <ul>
          {userData.user.comments.map(comment => (
            <li key={comment.id}>
              <p>{comment.content}</p>
              <p>On post {comment.postId}</p>
              <p>Created at: {new Date(comment.createdAt).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserPage;
