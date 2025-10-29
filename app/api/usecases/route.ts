import { NextRequest, NextResponse } from "next/server";
import { loadUseCases } from "@/lib/usecases";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const category = searchParams.get("category");
  const persona = searchParams.get("persona");
  const tag = searchParams.get("tag");
  const input = searchParams.get("input");

  let filtered = loadUseCases();

  // Exclude specific use cases from Solutions menu
  const excludedIds = new Set<string>([
    "visual-contraband-prison", // Contraband detection in prison
    "visual-accident-detection", // Automatic accident/road detection
    "visual-warehouse-automation", // Automated warehouse inventory
    "text-document-extraction", // Automated document info extraction
    "text-emergency-sms", // Emergency & SMS alert analysis
  ]);
  filtered = filtered.filter((uc) => !excludedIds.has(uc.id));

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
