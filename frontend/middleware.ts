import { NextRequest, NextResponse } from "next/server";

export default function middleware(req: NextRequest) {
  const verified = req.cookies.get("token");
  const url: string = req.url;

  if (!verified && url.includes("/")) {
    NextResponse.redirect("/login");
  }

  if (verified && url.includes("/login")) {
    NextResponse.redirect("/");
  }
}
