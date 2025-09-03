import { openai } from "@/echo";
import { generateObject } from "ai";
import { z } from "zod";

const suggestionsSchema = z.object({
  suggestions: z.array(z.string()).length(6).describe("Exactly 6 follow-up questions that a student might ask about the history topic just discussed")
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!messages || messages.length === 0) {
      return Response.json({
        suggestions: [
          "What historical period should we explore first?",
          "Can we talk about a famous historical figure?", 
          "How did ancient civilizations start?",
          "What were the biggest wars in history?",
          "How do empires usually collapse?",
          "What inventions changed the world the most?"
        ]
      });
    }

    // Get the last few messages for context
    const recentMessages = messages.slice(-6); // Last 6 messages for context

    const result = await generateObject({
      model: await openai("gpt-4o-mini"),
      schema: suggestionsSchema,
      prompt: `Based on this recent history tutoring conversation, generate exactly 6 helpful follow-up suggestions that would naturally extend the discussion. The suggestions should be:

1. Brief and conversational (1-2 sentences each)
2. Offer specific areas to explore further  
3. Suggest practical next steps for learning
4. Be encouraging and actionable
5. Help guide the student's learning journey
6. Copy the language and grammar style of the student's messages
7. Use the conversation history to generate suggestions that are relevant to what was just discussed
8. The suggestions should be phrased as if the student is asking the question/tutor for help
9. Focus specifically on history topics and concepts
10. Build directly off what the tutor just explained or taught

Conversation history:
${recentMessages.map(msg => {
  const content = msg.parts?.filter(part => part.type === 'text').map(part => part.text).join('') || msg.content || '';
  return `${msg.role === 'user' ? 'Student' : 'History Tutor'}: ${content}`;
}).join('\n\n')}

Generate suggestions that would help the student dive deeper into the specific historical topics, events, people, or concepts that were just discussed by the tutor.`
    });

    return Response.json(result.object);
  } catch (error) {
    console.error('Error generating suggestions:', error);
    return Response.json({
      suggestions: [
        "Can we dive deeper into this topic?",
        "What's another interesting angle to explore here?",
        "How does this connect to modern times?",
        "What would be good to study next?",
        "Are there any surprising facts about this period?",
        "What questions should I be asking about this era?"
      ]
    });
  }
}