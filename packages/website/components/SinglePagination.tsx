import Link from "next/link";
import * as prismicH from "@prismicio/helpers";

const SinglePagination = ({ doc }) => {
  return (
    <div className="pad">
      <ul className="nav-list">
        <li className="item lefttext">
          {doc.data.prev_page.uid && (
            <>
              <Link href={`/docs/${doc.data.prev_page.uid}`}>
                <a>
                  <i className="icon arrowLeft before" />
                  Previous
                  <p className="mt0">
                    {prismicH.asText(doc.data.prev_page.title)}
                  </p>
                </a>
              </Link>
            </>
          )}
        </li>
        <li className="item righttxt">
          {doc.data.next_page.uid && (
            <>
              <Link href={`/docs/${doc.data.next_page.uid}`}>
                <a>
                  Next <i className="icon arrowRight after" />
                  <p className="mt0">
                    {prismicH.asText(doc.data.next_page.title)}
                  </p>
                </a>
              </Link>
            </>
          )}
        </li>
      </ul>
    </div>
  );
};

export default SinglePagination;
