import { NextRequest, NextResponse } from "next/server";
import { db, schema } from "@/lib/db";
import { lte, asc, eq, and } from "drizzle-orm";
import { seedDefaults } from "@/lib/db/seed";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  seedDefaults();

  const lang = request.nextUrl.searchParams.get("lang") || "ar";
  const now = new Date().toISOString();

  const langFilter = eq(schema.flashcards.languageCode, lang);

  // Get due cards: nextReview <= now, filtered by language
  const dueCards = db
    .select()
    .from(schema.flashcards)
    .where(and(langFilter, lte(schema.flashcards.nextReview, now)))
    .orderBy(
      asc(schema.flashcards.repetitions),
      asc(schema.flashcards.easeFactor),
      asc(schema.flashcards.nextReview)
    )
    .all();

  // Get total count for this language
  const allCards = db
    .select()
    .from(schema.flashcards)
    .where(langFilter)
    .all();

  return NextResponse.json({
    due: dueCards,
    totalCards: allCards.length,
    dueCount: dueCards.length,
  });
}
