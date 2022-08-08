import { useEffect } from "react";
import Icon from "aura-design/icon";
import Link from "next/link";
import Image from "next/image";
import * as prismicH from "@prismicio/helpers";

import { createClient, linkResolver } from "@utils/prismic-rest";
import Layout from "@components/Layout";
import SidebarMenu from "@components/SidebarMenu";
import CodeBox from "@components/CodeBox";
import RichContent from "@components/RichContent";
import Highlighted from "@components/Highlighted";
import TableRows from "@components/TableRow";
import SinglePagination from "@components/SinglePagination";

const Documents = ({ doc }) => {
  const seo = {
    title: prismicH.asText(doc.data.title),
    excerpt: prismicH.asText(doc.data.excerpt),
  };

  const formatBody = () => {
    let newBody = [];
    let tableTransition = [];

    for (const slice of doc.data.body) {
      if (["table", "table_row", "table_footer"].includes(slice.slice_type)) {
        tableTransition.push(slice);
        if (["table_footer"].includes(slice.slice_type)) {
          let virtualSlice = {
            primary: null,
            items: tableTransition,
            id: tableTransition.map((item) => item.id).join("-"),
            slice_type: "table_group",
          };
          newBody.push(virtualSlice);
          virtualSlice = [];
        }
      } else {
        newBody.push(slice);
      }
    }

    return newBody;
  };

  return (
    <Layout text="Aura Design System" seo={seo}>
      <div>
        <div className="aureole docs">
          <div className="pad purple">
            <SidebarMenu />
          </div>
          <article className="pad accents-1 h6">
            <div className="smash">
              <h1>{prismicH.asText(doc.data.title)}</h1>
              <div>
                {formatBody().map((item, index) => {
                  switch (item?.slice_type) {
                    case "text":
                      return (
                        <RichContent
                          doc={item}
                          key={item.id}
                          className="ulinea"
                        />
                      );
                    case "image":
                      return (
                        <div className="centertxt pad" key={item.id}>
                          <Image
                            src={item?.primary?.image?.url}
                            height={item?.primary?.image?.dimensions?.height}
                            width={item?.primary?.image?.dimensions?.width}
                          />
                        </div>
                      );
                    case "code_snippet":
                      return <CodeBox doc={item} key={item.id} />;
                    case "highlighted_text":
                      return <Highlighted doc={item} key={item.id} />;
                    case "highlighted_text":
                      return <Highlighted doc={item} key={item.id} />;
                    case "table_group":
                      return (
                        <div className="table-group" key={item.id}>
                          {item.items.map((item, index) => {
                            switch (item?.slice_type) {
                              case "table":
                                return (
                                  <TableRows
                                    doc={item}
                                    key={index}
                                    isHeadline
                                  />
                                );
                              case "table_footer":
                                return (
                                  <TableRows
                                    doc={item}
                                    key={item.id}
                                    isFooter
                                  />
                                );
                              default:
                                return <TableRows doc={item} key={item.id} />;
                            }
                          })}
                        </div>
                      );

                    default:
                      return;
                  }
                })}
              </div>
              <SinglePagination doc={doc} />
            </div>
          </article>
        </div>
      </div>
    </Layout>
  );
};

export const getStaticProps = async ({
  params,
  preview = false,
  previewData,
  locale,
}) => {
  try {
    const client = createClient({ previewData });

    const doc = await client.getByUID("document", params.uid, { lang: locale });

    if (!doc) {
      return { notFound: true };
    }

    return {
      props: {
        doc,
        preview,
      },
      revalidate: 60 * 3,
    };
  } catch (e) {
    return { notFound: true };
  }
};

export async function getStaticPaths() {
  const client = createClient();
  const doc = await client.getAllByType("document", { lang: "*" });

  return {
    paths: doc.map((item) => prismicH.asLink(item, linkResolver)),
    fallback: "blocking",
  };
}

export default Documents;
