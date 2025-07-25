import { 
  LoaderFunctionArgs,
  ActionFunctionArgs,
  redirect,
 } from "@remix-run/node";
import { Form, useLoaderData, useNavigate } from "@remix-run/react";
import invariant from "tiny-invariant";

import { 
  getContact,
  updateContact,
 } from "../data";

// This "loader" function fetches the contact data based on the contactId parameter
export const loader = async ({
  params,
}: LoaderFunctionArgs) => {
  invariant(params.contactId, "Missing contactId param");
  const contact = await getContact(params.contactId);
  if (!contact) {
    throw new Response("Not Found", { status: 404 });
  }
  return { contact };
};

// This "action" function handles the form submission for editing a contact 
export const action = async ({
  params,
  request,
}: ActionFunctionArgs) => {
  invariant(params.contactId, "Missing contactId param");
  // Parse the form data from the request
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  // Ensure that the required fields are present
  await updateContact(params.contactId, updates);
  return redirect(`/contacts/${params.contactId}`);
};


export default function EditContact() {
  const { contact } = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  return (
    <Form key={contact.id} id="contact-form" method="post">
      <p>
        <span>Name</span>
        <input
          aria-label="First name"
          defaultValue={contact.first}
          name="first"
          placeholder="First"
          type="text"
        />
        <input
          aria-label="Last name"
          defaultValue={contact.last}
          name="last"
          placeholder="Last"
          type="text"
        />
      </p>
      <label>
        <span>Twitter</span>
        <input
          defaultValue={contact.twitter}
          name="twitter"
          placeholder="@jack"
          type="text"
        />
      </label>
      <label>
        <span>Avatar URL</span>
        <input
          aria-label="Avatar URL"
          defaultValue={contact.avatar}
          name="avatar"
          placeholder="https://example.com/avatar.jpg"
          type="text"
        />
      </label>
      <label>
        <span>Notes</span>
        <textarea
          defaultValue={contact.notes}
          name="notes"
          rows={6}
        />
      </label>
      <p>
        <button type="submit">Save</button>
        <button type="button" onClick={() => navigate(-1)}>
          Discard
        </button>
        <button type="button">Cancel</button>
      </p>
    </Form>
  );
}
