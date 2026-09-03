import Script from 'next/script'

const GA_ID = process.env.NEXT_PUBLIC_GA_ID
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID

export default function Analytics() {
  return (
    <>
      {GA_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}');
            `}
          </Script>
        </>
      )}
      {META_PIXEL_ID && (
        <Script id="meta-pixel-init" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${META_PIXEL_ID}');
            fbq('track', 'PageView');
          `}
        </Script>
      )}
    </>
  )
}

const LAST_CTA_STORAGE_KEY = 'lu_last_cta'

// Records the CTA a visitor clicked that only scrolls to the contact form
// (no lead is generated yet), so the eventual form-submit trackLead() call
// can still attribute the lead to it.
export function markCtaClick(ctaLocation: string) {
  if (typeof window === 'undefined') return
  try {
    window.sessionStorage.setItem(LAST_CTA_STORAGE_KEY, ctaLocation)
  } catch {
    // sessionStorage unavailable (private mode, etc.) - attribution is best-effort
  }
}

export function trackLead(ctaLocation: string, variant?: string) {
  if (typeof window === 'undefined') return
  let resolvedLocation = ctaLocation
  if (ctaLocation === 'contact_form' || ctaLocation === 'landing_contact_form') {
    try {
      resolvedLocation = window.sessionStorage.getItem(LAST_CTA_STORAGE_KEY) || ctaLocation
    } catch {
      // fall back to the given location
    }
  }
  const w = window as any
  if (typeof w.gtag === 'function') {
    w.gtag('event', 'generate_lead', {
      cta_location: resolvedLocation,
      ...(variant ? { variant } : {}),
    })
  }
  if (typeof w.fbq === 'function') {
    w.fbq('track', 'Lead')
  }
}
