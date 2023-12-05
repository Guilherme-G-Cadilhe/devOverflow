import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  const { question } = await request.json();

  try {
    const response = await fetch(`https://api.openai.com/v1/chat/completions`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a knowledgeable assistant that provides quality information." },
          { role: "user", content: `Tell me ${question}` },
        ],
      }),
    });

    const data = await response.json();
    if (data?.error) return NextResponse.json({ error: data.error.message }, { status: 400 });

    const reply = data.choices[0].message?.content;
    return NextResponse.json({ reply }, { status: 200 });
  } catch (error: any) {
    console.log("error chatGPT Route POST :>> ", error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
};
