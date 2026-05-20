# Profile Pulse

Mini-app Circles **embedded** pour le programme [circles/garage](https://garage.aboutcircles.com). Tableau de bord identité Circles + **réservation mentors** (paiement CRC, trust) dans l'hôte Gnosis App.

## Pitch

> Profile Pulse — identité Circles (avatar, trust, CRC), connexion par signature, puis réservez un appel mentor : payez 100 CRC et trustez votre mentor, le tout dans Gnosis App.

## Fonctionnalités

| Zone | Route | Circles |
|------|-------|---------|
| Dashboard | `/` | `getProfileView`, `signMessage`, tx test |
| Mentors | `/mentors`, `/mentors/[slug]` | `signMessage`, `transfer` 100 CRC |
| Mes appels | `/calls` | `trust.add`, historique local |

## Primitives Circles

- `@aboutcircles/miniapp-sdk` — `onWalletChange`, `signMessage`, `sendTransactions`
- `@aboutcircles/sdk` — profil, `transfer.direct` / `advanced`, `trust.add`

Voir [CONCEPT.md](./CONCEPT.md).

## Prérequis

- Node.js 20+
- [pnpm](https://pnpm.io)

## Installation

```bash
pnpm install
cp .env.example .env.local
# Éditer .env.local : NEXT_PUBLIC_MENTOR_DEFAULT_ADDRESS=0xVotreAdresseCircles
pnpm dev
```

Hors hôte Circles, le wallet reste déconnecté — comportement attendu.

## Parcours test (playground, &lt; 2 min)

1. Déployer en HTTPS (voir ci-dessous).
2. Ouvrir [circles.gnosis.io/playground](https://circles.gnosis.io/playground) et coller l’URL de déploiement.
3. **Dashboard** : wallet, profil, **Se connecter avec Circles**.
4. **Mentors** : Login (si besoin) → choisir un mentor → créneau → **PAY 100 CRC to book**.
5. **Mes appels** : voir la réservation → **TRUST {mentor}**.

Variables d’environnement mentors : voir [.env.example](./.env.example). Une adresse par défaut suffit pour la démo garage (`NEXT_PUBLIC_MENTOR_DEFAULT_ADDRESS`). Les profils sont enrichis via **`GET /api/mentors`** (cache serveur 5 min + TanStack Query côté client).

## Performance et observabilité

| Outil | Usage |
|-------|--------|
| `GET /api/mentors` | Profils Circles mis en cache (`unstable_cache`, 5 min) |
| TanStack Query | Cache client + squelette immédiat sur `/mentors` |
| `pnpm analyze` | Rapport bundle (`@next/bundle-analyzer`) |
| Dashboard `/` | `ProfileLookup` et tx test chargés en lazy (`next/dynamic`) |
| Vercel Analytics | Événements `sign_in_success`, `booking_success`, `trust_success` (prod) |

Activer **Analytics** et **Speed Insights** dans le dashboard Vercel du projet.

## Déploiement (Vercel)

```bash
pnpm build
npx vercel --prod
```

Sur Vercel, ajouter la variable d’environnement :

- `NEXT_PUBLIC_MENTOR_DEFAULT_ADDRESS` = adresse avatar Circles du mentor (ou compte de test)

Le `next.config.ts` autorise l’iframe depuis `*.gnosis.io` et `*.vercel.app`.

**URL de production actuelle :** https://gnosis-app-five.vercel.app

## CI

GitHub Actions exécute `pnpm lint` et `pnpm build` sur chaque push/PR (voir [`.github/workflows/ci.yml`](.github/workflows/ci.yml)).

## Soumission garage

Checklist : [GARAGE.md](./GARAGE.md)

## Ressources

- [Docs Circles](https://docs.aboutcircles.com)
- [Règles garage](https://garage.aboutcircles.com/rules)
- [Communauté builders](https://t.me/about_circles/499)

## Licence

MIT
