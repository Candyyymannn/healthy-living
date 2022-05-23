/* eslint-disable @typescript-eslint/no-redeclare */
import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import posts from "../../data/posts.json";

type Post = {
  slug: string;
  title: string;
  description: React.ReactNode;
  author: string;
};

export const loader: LoaderFunction = async ({ params }) => {
  const slug = params.slug;

  const foundPost = posts.find((item) => {
    const isTheCorrectSlug = item.slug === slug;
    return isTheCorrectSlug;
  });

  if (foundPost === undefined) {
    throw json({}, 404);
  }

  return json(foundPost);
};

const Post = () => {
  const post = useLoaderData();
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.description}</p>
      <p>{post.slug}</p>
      <p>Author: {post.author}</p>
    </div>
  );
};

export default Post;
