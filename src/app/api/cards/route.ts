import { NextResponse } from "next/server";
import cards from "@/data/cards.json";

export type Card = {
  id: number;
  title: string;
  description: string[];
  imageUrl: string;
  cta: string;
};

export async function GET() {
  return NextResponse.json(cards as Card[]);
}

