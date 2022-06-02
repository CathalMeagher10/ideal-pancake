import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useEffect } from "react";
import { prisma } from "../db/client";
import type { NextPage } from "next";
import { trpc } from "../utils/trpc";
import { useState } from "react";
const Home: NextPage = () => {
  const { data, isLoading } = trpc.useQuery(["posts.get-all"]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const createPost = trpc.useMutation(["posts.create-post"]);

  if (isLoading || !data) {
    return <div>loading...</div>;
  }

  const renderPosts = () => {
    return data.map((post) => {
      return (
        <div key={post.id}>
          <p> author: {post.author}</p>
          <p>createdAt: {post.createdAt.toString()},</p>
          <p> id: {post.id} </p>
        </div>
      );
    });
  };

  const handleCreatePost = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    createPost.mutate({ author: author, title: title });
  };
  return (
    <div>
      {renderPosts()}
      <form onSubmit={handleCreatePost}>
        <input
          type="text"
          placeholder="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <input
          type="text"
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button>create new post</button>
      </form>
    </div>
  );
};

export default Home;
