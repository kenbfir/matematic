import { describe, it, expect, beforeEach, vi } from 'vitest'
import { trackLead, markCtaClick } from '@/components/Analytics'

function createSessionStorage() {
  const store = new Map<string, string>()
  return {
    getItem: (key: string) => store.get(key) ?? null,
    setItem: (key: string, value: string) => void store.set(key, value),
    clear: () => store.clear(),
  }
}

describe('trackLead', () => {
  beforeEach(() => {
    ;(globalThis as any).window = {
      sessionStorage: createSessionStorage(),
      gtag: vi.fn(),
      fbq: vi.fn(),
    }
  })

  it('sends cta_location on the generate_lead GA4 event', () => {
    trackLead('whatsapp_float')
    expect((window as any).gtag).toHaveBeenCalledWith('event', 'generate_lead', {
      cta_location: 'whatsapp_float',
    })
  })

  it('includes variant when one is passed (landing page CTAs)', () => {
    trackLead('sticky_mobile_whatsapp', 'c')
    expect((window as any).gtag).toHaveBeenCalledWith('event', 'generate_lead', {
      cta_location: 'sticky_mobile_whatsapp',
      variant: 'c',
    })
  })

  it('omits variant when not passed (homepage CTAs have no variant)', () => {
    trackLead('footer_whatsapp')
    const call = (window as any).gtag.mock.calls[0]
    expect(call[2]).not.toHaveProperty('variant')
  })

  it('also fires the Meta Pixel Lead event', () => {
    trackLead('whatsapp_float')
    expect((window as any).fbq).toHaveBeenCalledWith('track', 'Lead')
  })

  it('attributes a contact_form conversion to the last CTA the visitor clicked', () => {
    markCtaClick('hero')
    trackLead('contact_form', 'b')
    expect((window as any).gtag).toHaveBeenCalledWith('event', 'generate_lead', {
      cta_location: 'hero',
      variant: 'b',
    })
  })

  it('attributes a landing_contact_form conversion to the last CTA clicked too', () => {
    markCtaClick('trial_cta_block')
    trackLead('landing_contact_form', 'c')
    expect((window as any).gtag).toHaveBeenCalledWith('event', 'generate_lead', {
      cta_location: 'trial_cta_block',
      variant: 'c',
    })
  })

  it('falls back to contact_form itself when no CTA was recorded first', () => {
    trackLead('contact_form')
    expect((window as any).gtag).toHaveBeenCalledWith('event', 'generate_lead', {
      cta_location: 'contact_form',
    })
  })

  it('does not use CTA attribution for direct-conversion locations like whatsapp_float', () => {
    markCtaClick('hero')
    trackLead('whatsapp_float')
    expect((window as any).gtag).toHaveBeenCalledWith('event', 'generate_lead', {
      cta_location: 'whatsapp_float',
    })
  })
})
