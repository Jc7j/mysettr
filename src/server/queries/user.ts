import { tryCatch } from "~/lib/utils";
import { db } from "~/server/db";

export async function getOne(userId: string) {
  if (!userId) {
    return null;
  }

  const { data: userProfile, error } = await tryCatch(
    db.user.findUnique({
      where: {
        id: userId, // Uses the 'id' field from User model for Clerk ID
      },
      select: {
        id: true, // Selecting id can be useful for verification or other ops
        email: true,
        name: true, // This is assumed to be the full name
        // 'firstName' and 'lastName' are not selected as they are not in the schema
      },
    }),
  );

  if (error) {
    console.error("Error fetching user profile by ID:", error);
    return null;
  }

  return userProfile;
}
