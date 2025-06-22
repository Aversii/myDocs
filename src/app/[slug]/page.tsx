import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import { Sidebar } from "../components/sidebar";
import { TableOfContents } from "../components/tableOfContents";
import { extractHeadings } from "@/lib/extractHeadings";
import { components } from "../components/mdxComponent";
import { getSlugToFileMap } from "@/lib/slugfyString";
import { getDocsList } from "@/lib/getDocList";
import text from "./../../../node_modules/dom-helpers/cjs/text.d";

type PageProps = {
  params: { slug: string };
};

export async function generateStaticParams() {
  const docs = getDocsList();
  return docs.map(({ slug }) => ({ slug }));
}

export default async function Page({ params }: PageProps) {
  const { slug } = params;

  const slugToFileMap = getSlugToFileMap();
  const filename = slugToFileMap[slug];

  if (!filename) {
    const slugToFileMap = getSlugToFileMap();
    return (
      <div
        style={{
          backgroundColor: "#121212",
          color: "#e0e0e0",
          padding: "2rem",
          width: "vw",
          margin: "3rem auto",
          fontFamily: "'Inter', sans-serif",
          borderRadius: "6px",
          border: "1px solid #444",
          height: "auto",
        }}
      >
        <h1
          style={{
            color: "#cf7d25",
            fontWeight: "bold",
            fontSize: "1.8rem",
            textAlign: "center",
          }}
        >
          404
        </h1>
        <p style={{ color: "#cf7d25", fontWeight: "bold", fontSize: "1.1rem" }}>
          Página não encontrada
        </p>

        <p style={{ marginTop: "1rem" }}>
          Slug procurado:{" "}
          <code
            style={{
              backgroundColor: "#222",
              padding: "0.15rem 0.4rem",
              borderRadius: "4px",
              color: "#f59e0b",
              border: "none",
              boxShadow: "none",
            }}
          >
            {slug}
          </code>
        </p>

        <ul
          style={{
            listStyle: "none",
            paddingLeft: 0,
            marginTop: "0.5rem",
            overflowY: "auto",
            border: "1px solid #333",
            borderRadius: "4px",
            backgroundColor: "#1a1a1a",
            borderColor: "#333",
            boxShadow: "none",
            height: "auto",
          }}
        >
          <p
            style={{
              color: "#fff",
              fontWeight: "bold",
              fontSize: "1.1rem",
              textAlign: "center",
              marginBottom: "20px",
              marginTop: "25px",
            }}
          >
            Tutoriais Disponíveis no Momento:
          </p>

          {Object.keys(slugToFileMap).map((s) => (
            <li key={s} style={{ padding: "0.3rem 0.7rem", border: "none" }}>
              <a
                href={`/${s}`}
                style={{ color: "#cf7d25", textDecoration: "none" }}
              >
                {s}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  const filePath = path.join(process.cwd(), "src", "content", filename);
  const fileContent = fs.readFileSync(filePath, "utf8");

  const { content, data } = matter(fileContent);

  const mdxSource = await compileMDX({
    source: content,
    components,
    options: {
      mdxOptions: {
        rehypePlugins: [rehypeSlug],
      },
    },
  });

  const toc = extractHeadings(content);
  const docs = getDocsList();

  return (
    <>
      <Sidebar docs={docs} currentSlug={slug} />
      <div
        style={{
          marginLeft: "300px",
          display: "flex",
          backgroundColor: "#191919",
          minHeight: "100vh",
          width: "calc(100% - 300px)",
          overflowX: "hidden",
        }}
      >
        <main
          style={{
            flex: 1,
            padding: "3rem",
            maxWidth: "900px",
            width: "100%",
          }}
        >
          <h1 style={{ color: "#cf7d25" }}>{data.title}</h1>
          <article className="prose" style={{ color: "#e0e0e0" }}>
            {mdxSource.content}
          </article>
        </main>
        <aside
          style={{
            width: "280px",
            flexShrink: 0,
            padding: "2rem 1rem",
            position: "sticky",
            top: 0,
            height: "100vh",
          }}
        >
          <TableOfContents toc={toc} />
        </aside>
      </div>
    </>
  );
}
