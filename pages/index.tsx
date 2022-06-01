import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useEffect } from "react";
import { prisma } from "./db/client";
import type { NextPage } from "next";

const Home: NextPage = (props: any) => {
  console.log(props);
  return <div>Home</div>;
};

export default Home;

export const getServerSideProps = async () => {
  const posts = await prisma.post.findMany();

  return {
    props: {
      posts: JSON.stringify(posts),
    },
  };
};
