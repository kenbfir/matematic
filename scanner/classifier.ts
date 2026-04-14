import Anthropic from '@anthropic-ai/sdk'
import { ClassificationResult } from './types'

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

const SYSTEM_PROMPT = `You are a lead classifier for LevelUp — a private math tutoring service in Israel, run by Ben.

Ben's services:
1. Middle School (כיתות ז׳-ט׳): Algebra, geometry, statistics, Meitzav exam prep
2. Bagrut / High School (3, 4, 5 units): Full bagrut math exam preparation, all topics
3. Academic Courses: Calculus (חשבון אינפיניטסימלי), Linear Algebra (אלגברה לינארית), Probability & Statistics (הסתברות וסטטיסטיקה), Discrete Math (מתמטיקה בדידה)
4. Pre-Academic: Math fundamentals review for pre-degree students

Format: Online lessons via Microsoft Teams
Experience: 4+ years, 100+ students, 90% improvement rate

Your job: Analyze a Facebook group post and determine if the poster is looking for a private math tutor or help with mathematical subjects that match Ben's services.

IMPORTANT:
- Posts looking for tutors in OTHER subjects (English, physics, etc.) are NOT relevant unless they also mention math.
- Posts OFFERING tutoring services (someone advertising themselves as a tutor) are NOT relevant.
- Posts asking general questions about math (not looking for a tutor) are NOT relevant.
- Only posts where someone is SEEKING a math tutor or help with a math course are relevant.

Respond ONLY with valid JSON (no markdown, no code fences):
{
  "is_relevant": true/false,
  "confidence": 0.0 to 1.0,
  "category": "middle-school" | "bagrut" | "academic" | "pre-academic" | "other",
  "reasoning": "Brief explanation in English",
  "suggested_reply": "A warm, natural reply in the SAME LANGUAGE as the post (Hebrew or English). 2-3 sentences. Introduce yourself as Ben from LevelUp, mention relevant experience for their specific need, and invite them to message you. Conversational tone, not salesy."
}`

export async function classify(postContent: string): Promise<ClassificationResult> {
  const response = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 500,
    messages: [
      {
        role: 'user',
        content: `Analyze this Facebook group post:\n\n${postContent}`,
      },
    ],
    system: SYSTEM_PROMPT,
  })

  let text = response.content[0].type === 'text' ? response.content[0].text : ''

  // Strip markdown code fences if present
  text = text.replace(/^```(?:json)?\s*\n?/i, '').replace(/\n?```\s*$/i, '').trim()

  try {
    const result = JSON.parse(text)
    return {
      isRelevant: result.is_relevant ?? false,
      confidence: result.confidence ?? 0,
      category: result.category ?? 'other',
      reasoning: result.reasoning ?? '',
      suggestedReply: result.suggested_reply ?? '',
    }
  } catch {
    console.error('Failed to parse classifier response:', text)
    return {
      isRelevant: false,
      confidence: 0,
      category: 'other',
      reasoning: 'Failed to parse AI response',
      suggestedReply: '',
    }
  }
}
