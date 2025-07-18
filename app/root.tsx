import {
  Form,
  Links,
  Link,
  Meta,
  NavLink,
  Scripts,
  ScrollRestoration,
  useNavigation,
  Outlet,
  useSubmit,
  useLoaderData,
} from "@remix-run/react";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";

import { redirect } from "@remix-run/node";
import { useEffect } from "react";

import appStylesHref from "./app.css?url";
import { createEmptyContact, getContacts } from "./data";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const contacts = await getContacts(q);
  return { q, contacts };
};

export const action = async () => {
  // Creates a new contact
  const newContact = await createEmptyContact();
  // In a real application, you would save the new contact to a database here
  return redirect(`/contacts/${newContact.id}/edit`);
};

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: appStylesHref }];
};

export default function App() {
  const { contacts, q } = useLoaderData<typeof loader>();
  const navigation = useNavigation();
  const submit = useSubmit();
  const searching =
  navigation.location &&
  new URLSearchParams(navigation.location.search).has("q"); 

  useEffect(() => {
    const searchField = document.getElementById("q");
    if (searchField instanceof HTMLInputElement) {
      searchField.value = q || "";
    }
  }, [q]);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <div id="sidebar">
          <h1>Remix Contacts</h1>
          <div>
            <Form
              id="search-form"
              role="search"
              onChange={(event) => {
                const isFirstSearch = q === null;
                submit(event.currentTarget,{
                  replace: !isFirstSearch,
                });
              }}
            >
              <input
                id="q"
                aria-label="Search contacts"
                placeholder="Search"
                className={searching ? "loading" : ""}
                type="search"
                name="q"
                defaultValue={q || ""}
              />
              <div id="search-spinner" hidden={!searching} aria-hidden="true" />
            </Form>
            <Form method="post">
              <button type="submit">New</button>
            </Form>
          </div>
          <nav>
            {contacts.length ? (
              <ul>
                {contacts.map((contact) => (
                  <li key={contact.id}>
                    <NavLink
                      className={({ isActive, isPending }) =>
                        isActive ? "active" : isPending ? "pending" : ""
                      }
                      to={`contacts/${contact.id}`}
                    >
                      <Link to={`contacts/${contact.id}`}>
                        {contact.first || contact.last ? (
                          <>
                            {contact.first} {contact.last}
                          </>
                        ) : (
                          <i>No Name</i>
                        )}{" "}
                        {contact.favorite ? <span>★</span> : null}
                      </Link>
                    </NavLink>
                  </li>
                ))}
              </ul>
            ) : (
              <p>
                <i>No contacts</i>
              </p>
            )}
          </nav>
        </div>

        <div
          className={navigation.state === "loading" && !searching ? "loading" : ""}
          id="detail"
        >
          <Outlet />
        </div>

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
