import Section from "@aura-design/system/section";
import Button from "@aura-design/system/button";
import Head from "next/head";
import Link from "next/link";

const MyError = (): JSX.Element => {
  return (
    <Section container="smush">
      <Head>
        <title>Error 404 | Aura Design System </title>
      </Head>
      <div className="aureole two valign" style={{ minHeight: "85vh" }}>
        <div className="one valign">
          <div className="smosh">
            <h1 className="centertxt ">404 page not found</h1>
            <div className="aureole one">
              <Link href="/">
                <Button mode="link">Go home</Button>
              </Link>
            </div>
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
