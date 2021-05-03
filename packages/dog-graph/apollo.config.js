const { name } = require('./package.json')

module.exports = {
  client: {
    service: {
      name,
      localSchemaFile: './schema.graphql'
    },
    excludes: ["src/index.ts"]
  }
};


