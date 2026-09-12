import { docsLlms } from "@/utils/source";

export const revalidate = false;

export async function GET() {
  return new Response(await docsLlms.index(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
