import Layout from "../layout/layout";
import About from "../components/aboutSection";
import Team from "../components/teamSection";

const about = () => {
  return (
    <>
      <Layout>
        <About />
        <Team />
      </Layout>
    </>
  );
};

export default about;
