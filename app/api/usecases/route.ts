import { NextRequest, NextResponse } from "next/server";
import usecasesData from "@/content/usecases.json";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const category = searchParams.get("category");
  const persona = searchParams.get("persona");
  const tag = searchParams.get("tag");
  const input = searchParams.get("input");

  let filtered = usecasesData.usecases;

  // Filter by category
  if (category) {
    filtered = filtered.filter((uc) => uc.category === category);
  }

  // Filter by persona
  if (persona) {
    filtered = filtered.filter((uc) =>
      uc.persona_relevance.some((p) => p.toLowerCase().includes(persona.toLowerCase()))
    );
  }

  // Filter by tag
  if (tag) {
    filtered = filtered.filter((uc) => uc.tags.includes(tag));
  }

  // Filter by input type
  if (input && input !== "All") {
    filtered = filtered.filter((uc) => uc.input === input);
  }

  return NextResponse.json({
    data: filtered,
    meta: {
      total: filtered.length,
      timestamp: new Date().toISOString(),
    },
  });
}
