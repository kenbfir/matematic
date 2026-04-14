export interface ParsedEmail {
  messageId: string
  uid: number
  subject: string
  postContent: string
  groupName: string
  postUrl: string
  receivedAt: Date
}

export interface ClassificationResult {
  isRelevant: boolean
  confidence: number
  category: 'middle-school' | 'bagrut' | 'academic' | 'pre-academic' | 'other'
  reasoning: string
  suggestedReply: string
}

export interface ScannedPostInput {
  source: string
  sourceGroup: string
  sourceUrl: string
  emailMessageId: string
  postContent: string
  isRelevant: boolean
  confidence: number
  category: string
  reasoning: string
  suggestedReply: string
  notificationSent: boolean
}
