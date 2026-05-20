# Profile Pulse

Mini-app Circles **embedded** pour le programme [circles/garage](https://garage.aboutcircles.com). Affiche votre identité Circles (avatar, trust, solde CRC), permet une connexion par signature et une transaction test — le tout dans l'hôte Gnosis App.

## Pitch

> Profile Pulse — votre identité Circles en un coup d'œil : avatar, trust, solde CRC, puis connexion par signature et transaction test, le tout dans Gnosis App.

## Primitives Circles

- `@aboutcircles/miniapp-sdk` — `onWalletChange`, `signMessage`, `sendTransactions`
- `@aboutcircles/sdk` — `getProfileView` (profil, trust, balances)

Voir [CONCEPT.md](./CONCEPT.md) pour le détail.

## Prérequis

- Node.js 20+
- [pnpm](https://pnpm.io)

## Installation

```bash
pnpm install
cp .env.example .env.local   # optionnel
pnpm dev
```

Ouvrez [http://localhost:3000](http://localhost:3000). Hors hôte Circles, le wallet reste déconnecté — c'est le comportement attendu.

## Tester dans l'hôte Circles

1. Déployez sur une URL **HTTPS** publique (Vercel recommandé).
2. Ouvrez [circles.gnosis.io/playground](https://circles.gnosis.io/playground).
3. Collez votre URL de déploiement (ou `?url=<votre-url>`).
4. Vérifiez : adresse raccourcie dans l'en-tête, profil chargé, Sign in et transaction test fonctionnels.

## Déploiement (Vercel)

```bash
pnpm build
npx vercel --prod
```

Ou connectez le repo GitHub à [vercel.com](https://vercel.com) — framework Next.js, build `pnpm build`, output par défaut.

Le `next.config.ts` autorise l'iframe depuis `*.gnosis.io` et `*.vercel.app`.

## Soumission garage

1. Profil builder : [garage.aboutcircles.com/signup](https://garage.aboutcircles.com/signup)
2. Enregistrer la mini-app : [garage.aboutcircles.com/register](https://garage.aboutcircles.com/register)
3. Avant le **vendredi 23:59 CET** du cycle en cours

Checklist détaillée : [GARAGE.md](./GARAGE.md)

## Ressources

- [Docs Circles](https://docs.aboutcircles.com)
- [Règles garage](https://garage.aboutcircles.com/rules)
- [Communauté builders](https://t.me/about_circles/499)

## Licence

MIT
