import { getMarketData } from "@/app/api/market/actions"; 

export async function GET() {
  const result = await getMarketData();
  return Response.json(result);
}
