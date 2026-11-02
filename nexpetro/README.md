# Nexpetro Resources website

Next.js App Router, TypeScript and Tailwind CSS. Company content and logo are based on the supplied draft profile. No pending technical appointments, certifications or completed projects are presented as established facts.

## Run

```sh
npm install
npm run dev
```

Open http://127.0.0.1:3000. Production: `npm run build`, then `npm start`. Deploy to a host with Next.js Node.js server support (for example Vercel). The contact API requires a server; this is not a static export.

## Contact delivery

Copy `.env.example` to `.env.local`. Set `RESEND_API_KEY` and `CONTACT_FROM_EMAIL` to a verified sender from your Resend account. All submissions go to **nexpetro18@outlook.com**, and replies go to the enquirer's email. Never expose the API key in a NEXT_PUBLIC variable or commit `.env.local`.

The form validates fields on client and server, includes a bot honeypot, checks same-origin requests, caps message lengths and handles delivery timeouts and failures. Without email credentials it displays a clear unavailable message and direct email link; it does not claim an enquiry was delivered. Configure host-level rate limiting before public launch. No database is used; enquiry details are forwarded through the email provider.

## Checks

`npm run build` checks production compilation and types. `npm run typecheck` checks TypeScript separately when needed.

## Assets

- `public/brand.png`: company logo extracted from the supplied profile.
- `public/industrial.jpg`: illustrative industrial photography, Unsplash image `photo-1516937941344-00b4e0337589`; not represented as a Nexpetro project or owned facility.

Review the company profile's draft contact address before public launch. Technical staffing and approvals remain scope-specific, as stated in the profile.
