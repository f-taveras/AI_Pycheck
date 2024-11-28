import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
  const url = "http://localhost:11434/api/generate";
  const { model, prompt } = await request.json();

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: model || "llama3.2",
        prompt,
        stream: false, // Ensure no-stream response
      }),
    });

    if (!response.ok) {
      return new Response(
        JSON.stringify({ error: `HTTP error! Status: ${response.status}` }),
        { status: response.status }
      );
    }

    const data = await response.json();
    return new Response(JSON.stringify({ response: data.response || "No response received" }));
  } catch (error) {
    return new Response(JSON.stringify({ error: `Error: ${(error as Error).message}` }), {
      status: 500,
    });
  }
};
