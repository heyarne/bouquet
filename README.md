# ✈️ bouquet

Something nice, but dinner isn't served yet 🍳

## Development

Dependencies:
```
$ # Dependencies are managed using homebrew on macOS
$ brew info node
node: stable 7.0.0 (bottled), HEAD
$ brew info mongo
mongodb: stable 3.2.10 (bottled)
$ brew info redis
redis: stable 3.2.5 (bottled), HEAD
$ # Don't forget to npm install
```

There are some npm scripts to help you:
```
$ # Start a development server which reloads when *.js files change
$ npm run dev
$ # Start a long running, non-reloading server for production
$ npm start
$ # To get detailed debug output
$ DEBUG=bouquet:* npm run dev
```

If you want to work on the frontend (**important:** you have to build it at least once!):
```
$ cd public
$ # There are other dependencies for the frontend, ensure to install them as well
$ npm install
$ # Build and watch the vuejs app (with hot module replacement)
$ npm run dev
$ # ... or build the vuejs app once
$ npm run build
```
