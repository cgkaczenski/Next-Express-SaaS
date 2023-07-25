import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  console.log("req", req.body);
  return NextResponse.json({ req });
}
