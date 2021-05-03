import { ApolloServer, gql } from 'apollo-server-lambda';
import { readFileSync } from 'fs'
import { join } from 'path'
import { rurl } from "./modules/"
import { hoc } from "./hoc"
import { getSignedUrlForUpload } from './modules/upload/getSignedUrlForUpload';

const schema = readFileSync(join(__dirname, './../schema.graphql')).toString()

const typeDefs = gql`
${schema}
`;

const resolvers = {
  Mutation: {
    openUploadChannel: () => ({}),
  },
  Query: {
    posts: () => ({ id: 123, content: 'John Doe' }),
    rurl: hoc(rurl),
    getSignedUrlForUpload: hoc(getSignedUrlForUpload)
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

exports.handler = server.createHandler({
  cors: {
    origin: "*",
    credentials: false
  }
});

