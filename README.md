# docker-images

```
Usage: npm start -- -i node-image -t 7.4.0

Docker images

Options:

  -h, --help             output usage information
  -V, --version          output the version number
  -u, --user [username]  Username (default: brunolm)
  -i, --image <name>     Image name
  -t, --tag <version>    Tag version
```

## Examples

### Building node image

```
npm run start -- -i node-image -t 7.4.0
```

### Publishing node image

```
npm run start -- -i node-image -t 7.4.0 --publish
```
