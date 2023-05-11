import Head from "next/head";
import { RichText } from "prismic-reactjs";
import Link from "next/link";
import { createClient } from "../prismicio";
import Image from "next/image";

async function getData() {
  const client = createClient();
  const pages = await client.getAllByType("post");
  return pages;
}

export default async function Home() {
  const blogPosts = await getData();
  return (
    <main className="flex flex-col items-center justify-center w-full flex-1 px-6 sm:px-20 text-center min-h-screen py-6">
      <section className="flex flex-col bg-white bg-opacity-70 p-8 mb-8 shadow-sm">
        <h1 className="text-6xl font-bold">Fran y Gaby en Viaje</h1>

        <p className="mt-3 text-2xl mb-8">
          ¡Somos Gaby y Fran y nos encanta viajar! En este blog te compartimos
          nuestras aventuras, consejos de viaje y trámites útiles.
        </p>
      </section>
      <section className="w-full">
        <h2 className="text-4xl font-bold mb-4">Sobre nosotros</h2>
        <div className="flex flex-col items-center justify-center mb-4">
          <div className="overflow-hidden h-36 w-36 rounded-full mb-3">
            <Image
              src="/us.jpeg"
              alt="Foto de perfil"
              width={200}
              height={200}
            />
          </div>
          <h3 className="text-xl font-bold mb-1">Fran y Gaby</h3>
          <p className="text-gray-500 max-w-3xl">
            Somos una pareja de aventureros que decidió viajar desde Argentina
            para empezar una aventura en Toulouse, sur de Francia. Nos encanta
            viajar, conocer nuevas culturas y probar nuevos platos (Spoiler
            alert: somos vegetarianos, las comidas recomendadas serán veggies).
            En este blog compartimos nuestras experiencias, consejos de viaje y
            los ayudaremos (o al menos lo vamos a intentar) en los trámites
            iniciales que hay que hacer al llegar a Francia. Esperamos que les
            guste!
          </p>
        </div>
      </section>

      <div className="mt-10 w-full">
        <h2 className="text-4xl font-bold mb-4">Nuestros posts</h2>
        <div className="flex flex-wrap items-center mt-6 sm:w-full">
          {blogPosts.map((post) => (
            <Link href={`/posts/${post.id}`} key={post.id}>
              <div className="w-full max-w-sm rounded overflow-hidden shadow-lg m-4 bg-white">
                <div className="relative h-48">
                  <Image
                    src={post.data.cover.url!}
                    alt={post.data.cover.alt!}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">
                    {RichText.asText(post.data.title)}
                  </div>
                  <p className="text-gray-700 text-base">
                    {RichText.asText(post.data.description)}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
