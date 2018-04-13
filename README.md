# Leadbird Manager

### :tada: React, React-Router@next, MobX and Webpack 2.

Just run `npm install` and `npm start`, then go to localhost:5000 to start developing.
To build, run `npm run build`, and to preview run `npm run preview`, then go
to localhost:1234 for the minified production bundle.

#### Async component loading
Components are now loaded async with react-router-loader and the store is injected via MobX Provider.
If you've downloaded this boilerplate before remember to run `npm install` again.

### Todo

- [X] Async loading of components
- [X] Data fetching example
- [X] Protected Routes

### RUN local environment
npm start -- -l
### RUN stage environment
npm start -- -s
### RUN qa environment
npm start -- -q
### RUN production environment
npm start -- -m

### BUILD local environment
npm run build -- --env=\"local\"
### BUILD stage environment
npm run build -- --env=\"stage\"
### BUILD qa environment
npm run build -- --env=\"qa\"
### BUILD production environment
npm run build -- --env=\"master\"
