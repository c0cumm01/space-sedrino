import { and, desc, eq, sql, SQL } from "drizzle-orm";

import { db } from "@/server/db/connection";
import { tableCrewTeam, tableTicket } from "@/server/db/schema";

export const findTicketsCount = async ({
  priority,
  assignedCrewTeamId,
}: {
  priority?: "Low" | "Medium" | "High";
  assignedCrewTeamId?: string;
}) => {
  const results = await db
    .select({ count: sql<number>`count(*)` })
    .from(tableTicket)
    .where(
      and(
        priority ? eq(tableTicket.priority, priority) : undefined,
        assignedCrewTeamId
          ? eq(tableTicket.assignedCrewTeamId, assignedCrewTeamId)
          : undefined,
      ),
    );
  return results[0]?.count ?? 0;
};
export type FindTicketsPaginatedInput = {
  page: number;
  pageSize: number;
  priority?: "Low" | "Medium" | "High";
  assignedCrewTeamId?: string;
};
export async function findTicketsPaginated(
  { page, pageSize, priority, assignedCrewTeamId }: FindTicketsPaginatedInput,
  userId: string,
) {
  const offset = (page - 1) * pageSize;
  const whereConditions: (SQL | undefined)[] = [];
  if (priority) {
    whereConditions.push(eq(tableTicket.priority, priority));
  }
  if (assignedCrewTeamId) {
    whereConditions.push(
      eq(tableTicket.assignedCrewTeamId, assignedCrewTeamId),
    );
  }
  const tickets = await db
    .select({
      ticket: tableTicket,
      assignedCrewTeamName: tableCrewTeam.name,
    })
    .from(tableTicket)
    .leftJoin(
      tableCrewTeam,
      eq(tableTicket.assignedCrewTeamId, tableCrewTeam.crewTeamId),
    )
    .where(and(...whereConditions))
    .orderBy(desc(tableTicket.createdAt))
    .limit(pageSize)
    .offset(offset);
  return { tickets };
}
export const getTicket = async (ticketId: string) => {
  const results = await db
    .select()
    .from(tableTicket)
    .where(eq(tableTicket.ticketId, ticketId));
  return results[0];
};
