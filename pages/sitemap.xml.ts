import { createClient } from '@/services/prismicio';

function generateSiteMap(host, posts) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>${host}</loc>
     </url>
     ${posts
      .map(({ id }) => {
        return `
       <url>
           <loc>${`${host}/posts/${id}`}</loc>
       </url>
     `;
      })
      .join('')}
   </urlset>
 `;
}

function SiteMap() { }

export async function getServerSideProps({ req, res }) {
  const client = createClient();
  const pages = await client.getAllByType("post");

  const sitemap = generateSiteMap(req.headers.host, pages);

  res.setHeader('Content-Type', 'text');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
