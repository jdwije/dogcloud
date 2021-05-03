import * as React from "react";
import { Layout, Post } from "../components";

const PostPage = () => {
  return (
    <Layout>
      <Post apiEndpoint="https://fgzpv8cz4l.execute-api.ap-southeast-2.amazonaws.com/uploads" />
    </Layout>
  );
};

export default PostPage;
