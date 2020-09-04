import cookieParser from "cookie-parser";
import * as express from "express";
import { StaticRouter } from "inferno-router";
import { renderToString } from "inferno-server";
import path from "path";
import App from "../client/components/App/App";
const server = express();
const port = 1234;

server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use("/static", express.static(path.resolve("./dist")));

server.use(cookieParser());

server.get("/*", (req, res) => {
   const context = {} as any;

   const wrapper = (
      <StaticRouter location={req.url} context={context}>
         <App />
      </StaticRouter>
   );
   if (context.url) {
      return res.redirect(context.url);
   }

   res.send(`
   <!doctype html>
   <html>
       <head>
           <title>My Universal App</title>
           <link rel="stylesheet" type="text/css" href="./static/styles/styles.css" />
       </head>
       <body>
           <div id='root'>${renderToString(wrapper)}</div>
           <script src='./static/js/client.js'></script>
       </body>
   </html>
`);
});
let Server = server.listen(port, () => {
   console.log(`http://localhost:${port}`);
});

/**
 * Used to restart server by fuseBox
 */
export async function shutdown() {
   Server.close();
   Server = undefined;
}
