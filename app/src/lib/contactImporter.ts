import { Client } from "@sendgrid/client";

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY as string;
const sgClient = new Client();
sgClient.setApiKey(SENDGRID_API_KEY);

export async function importContact(email: string) {
  const request = {
    method: "PUT" as const,
    url: "/v3/marketing/contacts",
    body: {
      list_ids: [],
      contacts: [
        {
          email: email,
        },
      ],
    },
  };

  return await sgClient.request(request);
}
