import type { RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ request }) => {
    const { prompt } = await request.json();

    try{
        const resposne = await fetch('http://localhost:11434/api/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'mistral',
                prompt: prompt,
            })
        });

        const data = await resposne.json();
        return new Response(JSON.stringify(data), {status: 200});
    }catch (error){
        console.error('Error communicating with Ollama:', error);
        return new Response(JSON.stringify({error: 'Error communicating with Ollama'}), {status: 500});
    }
}