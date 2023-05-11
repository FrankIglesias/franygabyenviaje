import Head from "next/head";
import { RichText } from "prismic-reactjs";
import { createClient } from "../../../services/prismicio";
import Image from "next/image";

export async function generateStaticParams() {
  const client = createClient();
  const pages = await client.getAllByType("post");
  const ids = pages.map((page) => ({ id: page.id }));
  return ids;
}

async function getData(id) {
  const client = createClient();

  const response = await client.getByID(id);
  const post = response.data;
  return { ...post, date: response.first_publication_date, response };
}

export async function generateMetadata({ params }) {
  const post = await getData(params.id);
  return {
    title: `Fran y Gaby en Viaje - ${RichText.asText(post.title)}`
  };
}

export default async function Post({ params }) {
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
          <p className="text-right mb-2 italic">
            {new Date(post.date).toLocaleDateString("es", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric"
            })}
          </p>
          {RichText.render(post.content)}
        </div>
      </div>
    </div>
  );
}
