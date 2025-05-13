"use server";

import { type WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { Webhook } from "svix";
import { env } from "~/env";
import { stripe } from "~/lib/stripe/stripe";
import { tryCatch } from "~/lib/utils";
import { db } from "~/server/db";

export async function POST(req: Request) {
  const SIGNING_SECRET = env.SIGNING_SECRET;

  if (!SIGNING_SECRET) {
    throw new Error(
      "Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local",
    );
  }

  // Create new Svix instance with secret
  const wh = new Webhook(SIGNING_SECRET);

  // Get headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error: Missing Svix headers", {
      status: 400,
    });
  }

  // Get body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error: Could not verify webhook:", err);
    return new Response("Error: Verification error", {
      status: 400,
    });
  }

  if (evt.type === "user.created") {
    const { id: clerkId, email_addresses, first_name, last_name } = evt.data;
    const email = email_addresses[0]?.email_address;

    if (!email) {
      throw new Error("No email found for user");
    }

    const existingUser = await db.user.findUnique({
      where: { id: clerkId },
    });

    if (existingUser) {
      return new Response("User exists", { status: 200 });
    }

    const { error: stripeError } = await tryCatch(
      stripe.customers.create({
        email,
        description: "User",
        metadata: {
          userId: clerkId,
        },
      }),
    );

    if (stripeError) {
      console.error("Error: Could not create customer:", stripeError);
      return new Response("Error: Could not create customer", { status: 400 });
    }

    const { error } = await tryCatch(
      db.user.create({
        data: {
          id: clerkId,
          email,
          name: `${first_name} ${last_name}`,
        },
      }),
    );

    if (error) {
      console.error("Error: Could not create user:", error);
      return new Response("Error: Could not create user", { status: 400 });
    }

    return new Response("User created successfully", { status: 200 });
  }

  return new Response("Webhook processed", { status: 200 });
}
