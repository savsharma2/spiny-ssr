import App from './App';
import React from 'react';
import { StaticRouter, matchPath } from 'react-router-dom';
import express from 'express';
import queryString from 'query-string';
import { renderToString } from 'react-dom/server';
import Routes from '../src/routes';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const server = express();
server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/*', (req, res) => {
    const currentRoute = Routes.find(route => matchPath(req.url, route)) || {};

    const queryParms = Object.values(queryString.parse(req.originalUrl));
    // console.log(`parms are ${Object.values(queryParms)}`);
    const promise = currentRoute.loadData
      ? currentRoute.loadData(queryParms && queryParms[0] ? queryParms[0]: '')
      : Promise.resolve({ req });
    return promise.then(data => {
      // console.log(data);
      const context = { data, req };

      const markup = renderToString(
        <StaticRouter context={context} location={req.url}>
          <App />
        </StaticRouter>
      );
      console.log(`markup is ${markup}`);

      if (context.url) {
        res.redirect(context.url);
      } else {
        res.status(200).send(
          `<!doctype html>
      <html lang="">
      <head>
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta charset="utf-8" />
          <title>Welcome to SSR</title>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          ${
            assets.client.css
              ? `<link rel="stylesheet" href="${assets.client.css}">`
              : ''
          }
          ${
            process.env.NODE_ENV === 'production'
              ? `<script src="${assets.client.js}" defer></script>`
              : `<script src="${assets.client.js}" defer crossorigin></script>`
          }
      </head>
      <body>
          <div id="root">${markup}</div>
      </body>
      <script>window.__ROUTE_DATA__ = ${JSON.stringify(data)}</script>
  </html>`
        );
      }
    });
  });

export default server;
