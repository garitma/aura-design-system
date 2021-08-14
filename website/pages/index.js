import Section from "aura-design/section";
import Button from "aura-design/button";
import Link from "next/link";
import Image from "next/image";

import Layout from "@components/Layout";

const Home = ({ page, preview, layout }) => (
  <Layout text="Aura Design System">
    <Section color="teal-green" container="smash" subClassName="centertxt">
      <h1 className="mb0">
        Build beautiful products 
      </h1>
      <p>
        Aura Design System is Garitma's <b>open source</b> space-oriented design
        system. Each object has a halo of light that surrounds it, it's aura.
      </p>
      <div className="smosh">
        <div className="aureole two">
          <Link
            href={{
              pathname: "/docs/[uid]",
              query: { uid: "getting-started" },
            }}
            passHref
          >
            <Button label="Get Started" mode="fill" />
          </Link>

          <Button
            label="Github"
            mode="pill"
            href="https://github.com/garitma/aura-design-system"
            target="_blank"
            rel="noopener"
          />
        </div>
      </div>

      <div className="halo halign smosh">
        <Image
          src="https://images.prismic.io/garitma/fab89786-299e-4738-aa9e-738b8b29893f_aura-design-system-meditate.png?auto=compress,format"
          width={320}
          height={320}
          className="floating"
          alt="Aura design system visual"
        />
      </div>
    </Section>
    <Section color="pink">
      <div className="aureole two">
        <div className="one">
          <Image
            src="https://images.prismic.io/garitma/6f807f50-18b2-4fc7-9be8-9f57a42d933f_giphy.webp?auto=compress,format"
            width={320}
            height={320}
          />
        </div>
        <div className="two">
          <h2>There is something you should know in time</h2>
          <h3 className="light">Let's be clear, I don't care about you</h3>
          <p>
            Aura Design System is built under its own rules, it is very
            structured and not very flexible, designed to solve my problems. If
            my problems are yours too, welcome.
          </p>
          <Link href="/docs/[uid].js" as="/docs/getting-started">
            <Button type="link" label="Get Started" mode="fill" />
          </Link>
        </div>
      </div>
    </Section>
    <Section subClassName="centertxt" color="purple">
      <h3>Aura</h3>
      <pre className="smosh h6">
        The halo of light that surrounds us
        <br />
        silent.
        <br />
        <br />
        We don't hear it
        <br />
        but we see it.
        <br />
        <br />
        Our love
        <br />
        for each element
        <br />
        is respect
        <br />
        of your space
        <br />
        in white,
        <br />
        where he lives
        <br />
        the sum of all
        <br />
        the colors.
      </pre>
    </Section>
    <Section color="purple" className="centertxt">
      <Image
        src="https://images.prismic.io/garitma/1d0668d0-b0ff-4d2b-af15-2a1dde5235f9_keyvisual-aura-design-system.png?auto=compress,format"
        width={1920}
        height={1440}
      />
      <Section passDiv>
        <p>
          The magic of the love is the silent and the magic of de design are the
          blank spaces.
        </p>
        <Link
          href={{
            pathname: "/docs/[uid]",
            query: { uid: "getting-started" },
          }}
          passHref
        >
          <Button type="link" label="Get Started" mode="fill" />
        </Link>
      </Section>
    </Section>
  </Layout>
);

export default Home;
