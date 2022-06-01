import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useEffect } from "react";
import { prisma } from "../db/client";
import type { NextPage } from "next";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const { data, isLoading } = trpc.useQuery(["getAllPosts"]);

  if (isLoading || !data) {
    return <div>loading...</div>;
  }
  return <div>{data[0]?.author}</div>;
};

export default Home;
