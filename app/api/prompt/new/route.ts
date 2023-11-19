import { Prompt, PromptFromSchema } from "@models";
import { connectToDB } from "@utils";
import { headers } from "next/headers";

export const POST = async (req: Request) => {
  const user_id = headers().get("userId");
  if (!user_id) {
    return new Response(JSON.stringify({ message: "userId is required" }), { status: 400 });
  }
  const body: PromptFromSchema = await req.json();
  if (!body.prompt || !body.tag) {
    return new Response(JSON.stringify({ message: "prompt and tag are required" }), {
      status: 400,
    });
  }
  try {
    await connectToDB();
    const newPrompt = new Prompt({
      creator: user_id,
      prompt: body.prompt,
      tag: body.tag,
    });

    await newPrompt.save();

    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    console.log(error);
  }
};
