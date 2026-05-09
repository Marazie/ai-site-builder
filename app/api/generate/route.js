import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    const body = await req.json();

    const completion = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "system",
          content:
            "You are an expert website designer. Generate stunning modern responsive HTML websites with beautiful layouts, gradients, buttons, hero sections, cards, pricing sections, and modern UI design. Return ONLY HTML. Do not use markdown.",
        },
        {
          role: "user",
          content: body.prompt,
        },
      ],
      temperature: 0.9,
    });

    let html = completion.choices[0].message.content;

    html = html
      .replace(/```html/g, "")
      .replace(/```/g, "");

    return Response.json({
      result: html,
    });
  } catch (err) {
    console.log(err);

    return Response.json({
      error: err.message,
    });
  }
}