import { useEffect } from "react";
import Icon from "aura-design/icon";
import Link from "next/link";
import Image from "next/image";
import { RichText } from "prismic-reactjs";

import { getDocument, getAllPostsWithSlug } from "@utils/prismic-graphql";
import Layout from "@components/Layout";
import SidebarMenu from "@components/SidebarMenu";
import CodeBox from "@components/CodeBox";
import RichContent from "@components/RichContent";
import Highlighted from "@components/Highlighted";
import TableRows from "@components/TableRow";
import SinglePagination from "@components/SinglePagination";

const Documents = ({ doc }) => {
  return (
    <Layout text="Aura Design System" meta={doc}>
      <div>
        <div className="aureole docs">
          <div className="pad purple">
            <SidebarMenu />
          </div>
          <article className="pad accents-1 h6">
            <div className="smash">
              <h1>{RichText.asText(doc?.title || [])}</h1>
              <div>
                {doc?.body?.map((item, index) => {
                  switch (item?.__typename) {
                    case "DocumentBodyText":
                      return (
                        <RichContent
                          doc={item}
                          key={index}
                          className="ulinea"
                        />
                      );
                    case "DocumentBodyImage":
                      return (
                        <div className="centertxt pad" key={index}>
                          <Image
                            src={item?.primary?.image?.url}
                            height={item?.primary?.image?.dimensions?.height}
                            width={item?.primary?.image?.dimensions?.width}
                          />
                        </div>
                      );
                    case "DocumentBodyCode_snippet":
                      return <CodeBox doc={item} key={index} />;
                    case "DocumentBodyHighlighted_text":
                      return <Highlighted doc={item} key={index} />;
                    case "DocumentBodyTable":
                      return <TableRows doc={item} key={index} isHeadline />;
                    case "DocumentBodyTable_row":
                      return <TableRows doc={item} key={index} />;
                    case "DocumentBodyTable_footer":
                      return <TableRows doc={item} key={index} isFooter/>;
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

export async function getStaticProps({ params, preview = false, previewData }) {
  const doc = await getDocument(params.uid, previewData);

  return {
    props: {
      preview,
      doc: doc.document,
    },
  };
}

export async function getStaticPaths() {
  const allDocuments = await getAllPostsWithSlug();

  return {
    paths: allDocuments?.map(({ node }) => `/docs/${node._meta.uid}`) || [],
    fallback: true,
  };
}

export default Documents;
