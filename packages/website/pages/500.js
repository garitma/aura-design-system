import Section from "aura-design/section";
import Button from "aura-design/button";
import Head from "next/head";
import Link from "next/link";

const MyError = () => {
  return (
    <Section container="smush">
      <Head>
        <title>Error 500 | Aura Design System </title>
      </Head>
      <div className="aureole two valign" style={{ minHeight: "85vh" }}>
        <div className="one valign">
          <div className="smosh">
            <h1 className="centertxt ">500 something went wrong.</h1>
          </div>
        </div>
        <div className="valign centertxt mod-media">
          <img
            width="500"
            src="https://media.giphy.com/media/1rPoJNeGNTIUuFFnqK/giphy.gif"
            className="container halo"
          />
        </div>
      </div>
    </Section>
  );
};

export default MyError;
