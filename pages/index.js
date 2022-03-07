import { HomeComponent } from "../components/HomeComponent";
import Layout from "../components/common/Layout";

export default function HomePage() {
  return (
    <Layout>
      <div style={{display: "flex", flex: "1"}}>
        <HomeComponent />
      </div>
    </Layout>
  );
}
