import Section from "@aura-design/system/section";
import Grid from "@aura-design/system/grid";

const Home = () => {
  return (
    <Grid col="one">
      <Section>
        <div className="border-b py-1 mb-2">
          <h1>Headlines</h1>
        </div>
        <div>
          <h1>Headline 1</h1>
          <h2>Headline 2</h2>
          <h3>Headline 3</h3>
          <h4>Headline 4</h4>
          <h5>Headline 5</h5>
          <h6>Headline 6</h6>
        </div>
      </Section>
      <Section>
        <div className="border-b py-1 mb-2">
          <h1>Colors</h1>
        </div>
        <div>
          <div className="bg-accent-1 p-2">accent-1</div>
          <div className="bg-accent-2 p-2">accent-2</div>
          <div className="bg-accent-3 p-2">accent-3</div>
          <div className="bg-accent-4 p-2">accent-4</div>
          <div className="bg-accent-5 p-2">accent-5</div>
          <div className="bg-accent-6 p-2">accent-6</div>
          <div className="bg-accent-7 p-2">accent-7</div>
          <div className="bg-accent-8 p-2">accent-8</div>
          <div className="bg-accent-9 text-accent-contrast p-2">accent-9</div>
          <div className="bg-accent-10 text-accent-contrast p-2">
            accent-10
          </div>
          <div className="bg-gray-1 p-2">gray-1</div>
          <div className="bg-gray-2 p-2">gray-2</div>
          <div className="bg-gray-3 p-2">gray-3</div>
          <div className="bg-gray-4 p-2">gray-4</div>
          <div className="bg-gray-5 p-2">gray-5</div>
          <div className="bg-gray-6 p-2">gray-6</div>
          <div className="bg-gray-7 p-2">gray-7</div>
          <div className="bg-gray-8 p-2">gray-8</div>
          <div className="bg-gray-9 text-gray-contrast p-2">gray-9</div>
          <div className="bg-gray-10 text-gray-contrast p-2">gray-10</div>
        </div>
      </Section>
    </Grid>
  );
};

export default Home;
