import { NextRequest, NextResponse } from "next/server";
import usecasesData from "@/content/usecases.json";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const usecase = usecasesData.usecases.find((uc) => uc.id === params.id);

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
