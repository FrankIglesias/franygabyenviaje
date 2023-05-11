import Head from "next/head";
import { RichText } from "prismic-reactjs";
import { createClient } from "../../../prismicio";
import Image from "next/image";

export async function getStaticPaths() {
  const client = createClient();
  const pages = await client.getAllByType("post");
  const paths = pages.map((page) => ({
    params: { id: page.id }
  }));
  return {
    paths,
    fallback: false
  };
}

async function getData(id) {
  const client = createClient();

  const response = await client.getByID(id);
  const post = response.data;
  return post;
}

export async function generateMetadata({ params }) {
  const post = await getData(params.id);

  return {
    title: `Fran y Gaby en Viaje - ${RichText.asText(post.title)}`
  };
}

export default async function BlogPost({ params }) {
  const post = await getData(params.id);
  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
      <div className="flex flex-col">
        <div className="mb-4 h-64 overflow-y-hidden relative">
          <Image
            src={post.cover.url}
            alt={post.cover.alt}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <h1 className="text-4xl lg:text-6xl font-bold mb-10 text-center">
          {RichText.asText(post.title)}
        </h1>
        <div className="max-w-4xl m-x-auto self-center w-full text-justify pb-6">
          {RichText.render(post.content)}
        </div>
      </div>
    </div>
  );
}
