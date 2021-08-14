import Link from "next/link";
import { RichText } from "prismic-reactjs";

const SinglePagination = ({ doc }) => {
  return (
    <div className="pad">
      <ul className="nav-list">
        <li className="item lefttext">
          {doc?.prev_page && (
            <>
              <Link href={`/docs/${doc?.prev_page?._meta.uid}`}>
                <a>
                  <i className="icon arrowLeft before" />
                  Previous
                  <p className="mt0">
                    {RichText.asText(doc?.prev_page?.title)}
                  </p>
                </a>
              </Link>
            </>
          )}
        </li>
        <li className="item righttxt">
          {doc?.next_page && (
            <>
              <Link href={`/docs/${doc?.next_page?._meta.uid}`}>
                <a>
                  Next <i className="icon arrowRight after" />
                  <p className="mt0">
                    {RichText.asText(doc?.next_page?.title)}
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
