import Head from "next/head";
import { RichText } from "prismic-reactjs";
import Link from "next/link";
import { createClient } from "@/services/prismicio";
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: `
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Fran y Gaby en viaje",
            "description": "Explorando el mundo con Fran y Gaby",
            "url": "https://www.franygabyenviaje.com",
          }
          `
        }}
      ></script>
      <section className="flex flex-col bg-white bg-opacity-70 p-8 mb-8 shadow-sm pt-0">
        <Image
          src="/logo.svg"
          height={400}
          width={400}
          className="self-center"
        />
        <p className="mt-3 text-2xl mb-4">
          ¡Somos Gaby y Fran y nos encanta viajar! En este blog te compartimos
          nuestras aventuras, consejos de viaje y trámites útiles.
        </p>
      </section>
      <section className="w-full">
        <h2 className="text-4xl font-bold mb-4">¿Quienes somos?</h2>
        <div className="flex flex-col sm:flex-row items-center my-4 justify-center">
          <div className="overflow-hidden h-44 w-44 rounded-full sm:mr-6 sm:mb-0 mb-4">
            <Image
              src="/us.jpeg"
              alt="Foto de perfil"
              width={250}
              height={250}
            />
          </div>
          <p className="text-gray-500 max-w-xl w-full">
            Somos una pareja de aventureros que decidió viajar desde Argentina
            para empezar una aventura en Toulouse, sur de Francia. Nos encanta
            viajar, conocer nuevas culturas y probar nuevos platos (Spoiler
            alert: somos vegetarianos). En este blog compartimos nuestras
            experiencias, consejos de viaje y los ayudaremos (o al menos lo
            vamos a intentar) en algunos trámites (por ejemplo los que hay que
            hacer al llegar a Francia). Esperamos que les guste!
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
