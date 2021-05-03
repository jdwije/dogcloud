dog-graph
===

> An Apollo graphql server that runs in AWS lambda

## Usage

First you will need to get setup with a few requirements. As of now only unix
environments are supported as build platforms;

- unix
- jq
- aws-cli
- docker
- node@14
- yarn

Additionally you will require an AWS account and some IAM credentials setup and
ready to use with the aws-cli.

Begin by configuring your project.

```bash
./bin/configure.sh
```

The configuration script will ask your some questions about your environment and
write this to a `.env` file in the root of the repository.

Next run the provisioning script. This will setup your AWS environment based on
your configuration. **Only run this script once at setup time!**

Finally do a deploy to get your AWS environment up and running.

```bash
yarn deploy
```
You can also run this setup locally;

```bash
yarn start
```
And do manual builds

```bash
yarn build
```
It is recommended you boot the `dog-graph-explorer` after starting this server
up on your local machine. It will allow you to explore the dog-graph's
procedures.

## Resources & Further Reading

- [how to build and deploy graphql server in aws lambda using nodejs and cloudformation](https://www.freecodecamp.org/news/how-to-build-and-deploy-graphql-server-in-aws-lambda-using-nodejs-and-cloudformation/)
