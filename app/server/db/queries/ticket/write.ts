import { eq } from "drizzle-orm";

import { db } from "@/server/db/connection";
import { tableTicket, TicketInsert } from "@/server/db/schema";

export const addTicket = async (
  data: Omit<
    TicketInsert,
    "ticketId" | "createdAt" | "updatedAt" | "deletedAt"
  >,
) => {
  const [ticket] = await db
    .insert(tableTicket)
    .values({
      ...data,
      affectedSystems: data.affectedSystems ?? [],
      status: data.ticket.status,
    })
    .returning();
  return ticket;
};
export async function deleteTicket(ticketId: string) {
  const results = await db
    .delete(tableTicket)
    .where(eq(tableTicket.ticketId, ticketId))
    .returning();
  return results[0];
}
export const updateTicket = async (
  ticketId: string,
  data: Omit<
    Partial<typeof tableTicket.$inferSelect>,
    "ticketId" | "createdByUserId" | "createdAt" | "updatedAt"
  >,
) => {
  const results = await db
    .update(tableTicket)
    .set(data)
    .where(eq(tableTicket.ticketId, ticketId))
    .returning();
  return results[0];
};
