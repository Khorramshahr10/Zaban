import { NextRequest, NextResponse } from "next/server";
import { db, schema } from "@/lib/db";
import { eq, desc, like, or, and } from "drizzle-orm";
import { seedDefaults } from "@/lib/db/seed";
import { createVocabFlashcard } from "@/lib/flashcards/create";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  seedDefaults();

  const searchParams = request.nextUrl.searchParams;
  const search = searchParams.get("search");
  const lang = searchParams.get("lang") || "ar";

  const langFilter = eq(schema.vocab.languageCode, lang);

  const condition = search
    ? and(
        langFilter,
        or(
          like(schema.vocab.english, `%${search}%`),
          like(schema.vocab.target, `%${search}%`),
          like(schema.vocab.transliteration, `%${search}%`)
        )
      )
    : langFilter;

  const results = db
    .select()
    .from(schema.vocab)
    .where(condition)
    .orderBy(desc(schema.vocab.createdAt))
    .all();

  return NextResponse.json(results);
}

export async function POST(request: NextRequest) {
  seedDefaults();

  const body = await request.json();
  const { english, target, transliteration, partOfSpeech, tags, notes, languageCode } = body;

  if (!english || !target) {
    return NextResponse.json(
      { error: "English and target fields are required" },
      { status: 400 }
    );
  }

  const result = db
    .insert(schema.vocab)
    .values({
      languageCode: languageCode || "ar",
      english,
      target,
      transliteration: transliteration || null,
      partOfSpeech: partOfSpeech || null,
      tags: tags || null,
      notes: notes || null,
    })
    .returning()
    .get();

  // Auto-create flashcard
  createVocabFlashcard(result.id);

  return NextResponse.json(result, { status: 201 });
}
