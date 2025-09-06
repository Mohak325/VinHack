export const runtime = "nodejs";
import prisma from "@/lib/prisma";

export async function POST(req) {
  try {
    const body = await req.json();

    const submission = await prisma.submission.create({
      data: {
        name: body.name,
        email: body.email,
      },
    });

    return new Response(JSON.stringify(submission), { status: 200 });
  } catch (error) {
    console.error("🔥 POST error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}

export async function GET() {
  try {
    const submissions = await prisma.submission.findMany(); // no orderBy on ObjectId
    return new Response(JSON.stringify(submissions), { status: 200 });
  } catch (error) {
    console.error("🔥 GET error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
