# FH Pathway Companion

A calm, reassuring web app for patients referred into Singapore's
**National FH (Familial Hypercholesterolaemia) Genetic Testing Program**.

Built with **React + Vite**. Navigation uses simple client-side state — no
routing library.

## Flow

```
Login → (mock fetch) → Consent → Personalised Landing → Dashboard
                                                              ↓
                    Why This Matters · Family Impact · Cost · Book · Account
```

Every user must sign in (mock Singpass). Two demo profiles let you show both
pathway types without real authentication.

### Mock profiles (`src/mockHealthHub.js`)

| | Index patient | Cascade relative |
| --- | --- | --- |
| Name | Wei Ling Tan | Marcus Tan |
| Pathway | LDL 6.2 mmol/L referral | Son of confirmed FH proband |
| Referred by | Dr. Sarah Lim, Toa Payoh Polyclinic | Cascade screening invitation from GAC |

### Screens

1. **Login** — pick a demo profile, then "Sign in with Singpass" (mock).
2. **Consent** — brief one-screen permission before health data is shown.
3. **Personalised Landing** — referral summary pulled from the mock record.
4. **Dashboard** — central hub with pathway stepper and quick-access cards.
5. **Why This Matters** — personalised risk summary (index or cascade).
6. **Family Impact** — terracotta-styled family/cascade content.
7. **Cost Transparency** — live MOH subsidy calculator (`calculateSubsidisedCost()`).
8. **Book Appointment** — mock appointment request.
9. **My Account** — profile, data-access toggle, MOH insurance moratorium note.

Bottom navigation (**Home** / **My Account**) appears from the dashboard onward.

## Getting started

```bash
npm install
npm run dev
npm run build
```

> All login, HealthHub, and account features use mock data only. No real
> authentication or government APIs are called.
