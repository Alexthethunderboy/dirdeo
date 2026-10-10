# DirDeo

A creative portfolio built with Next.js, React, TypeScript, Tailwind and Sanity. The site presents work, project details, an about page and contact information, with a CMS studio under `/admin`.

[Explore DirDeo](https://dirdeo.vercel.app/)

![dirdeo — existing portfolio capture](https://raw.githubusercontent.com/Alexthethunderboy/Portfolio/b4c8f605bdb311f2be00d14855b4914a3d662cf9/public/projects/previews/dirdeo.jpg)

Existing portfolio capture, verified 8 October 2026; not evidence of current uptime or completed validation.

## Local setup

```bash
git clone https://github.com/Alexthethunderboy/dirdeo.git
cd dirdeo
npm ci
# Create .env.local with the Sanity development configuration
npm run dev
```

Set `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` for an authorized development dataset. The client uses API version `2023-05-03`. Public configuration is bundled into client code; keep privileged credentials out of Git and browser variables. Placeholder project IDs are not usable configuration. See `src/lib/cms.ts` and `src/sanity/schema/` for queries and content models.

## Verification and limits

`npm run lint` and `npm run build` exist. They were not run for this documentation update; no first-party test suite or Actions workflow is tracked. Manually check home → work → project detail → about/contact, keyboard navigation and narrow layouts with representative CMS content. The tracked fallback data includes sample clients, awards, location and availability copy; those are template content, not verified professional achievements. Replace or verify them before release. Content availability depends on the configured CMS; this README is not a claim of production readiness or a verified CMS bootstrap.

Project branding and client content remain DirDeo's. Code and media rights require separate review; no license is added here.

---

Built by [Thunderboy](https://thunderboy.vercel.app).
