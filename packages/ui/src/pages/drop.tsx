import * as React from "react";
import { Layout, Drop } from "../components";

const DropPage = () => {
  const apiEndpoint = ' http://localhost:3000/';
  // const apiEndpoint = "https://fgzpv8cz4l.execute-api.ap-southeast-2.amazonaws.com/uploads"
  
  return (
    <Layout>
      <Drop  apiEndpoint={apiEndpoint} />
    </Layout>
  );
};

export default DropPage;
