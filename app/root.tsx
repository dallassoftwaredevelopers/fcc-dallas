import type { MetaFunction } from "remix";
import {
  Links,
  LiveReload,
  LoaderFunction,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "remix";
import styles from "./styles/global.css";
import libraryStyles from "./styles/library.css";

export const links = () => [
  { rel: "stylesheet", href: styles },
  { rel: "stylesheet", href: libraryStyles },
];

export const meta: MetaFunction = () => ({
  title: "freeCodeCamp Dallas",
  description: "Learn to code with learners in Dallas",
});

export default function App() {
  const data = useLoaderData();
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
        {data && data.ENV && (
          <script
            dangerouslySetInnerHTML={{
              __html: `window.ENV = ${JSON.stringify(data.ENV)}`,
            }}
          />
        )}
      </body>
    </html>
  );
}
