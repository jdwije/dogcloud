dogcloud
===

Herein lays the source code to my own little personal cloud. I am providing it
as is for educational purposes, I don't run any serious stuff using this as of
today.

## What it does

The dogcloud provides a graphql backend running on top of AWS lambda, along with
a graphql explorer for this graph and a gatsby front-end which talks to it.

## Usage

Run `yarn` in the root of this repository to install al packages. `cd` into
package directories and run `yarn start` to boot services. You should boot the
`dog-graph` first. For more details see each packages' own README file.

## Known Issues

- Broken package hoisting for `dog-graph-explorer`. Skip pre-flight checks to
  by-pass issue for now.


## Contributing

Fork this repo. Make some commits. Send me a PR. Easy peasy.

