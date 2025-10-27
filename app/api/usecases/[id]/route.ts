import { NextRequest, NextResponse } from "next/server";
import { loadUseCaseById } from "@/lib/usecases";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const usecase = loadUseCaseById(params.id);

  if (!usecase) {
    return NextResponse.json(
      { error: "Use case not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    data: usecase,
    meta: {
      timestamp: new Date().toISOString(),
    },
  });
}
