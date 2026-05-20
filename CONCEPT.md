# Profile Pulse — concept (circles/garage MVP)

## Idée

Tableau de bord embedded qui affiche l'identité Circles de l'utilisateur connecté dans Gnosis App.

## Pitch (garage register)

> Profile Pulse — votre identité Circles en un coup d'œil : avatar, trust, solde CRC, puis connexion par signature et transaction test, le tout dans Gnosis App.

## Primitives Circles utilisées

| Primitive | SDK | Usage |
|-----------|-----|-------|
| Wallet injecté | `@aboutcircles/miniapp-sdk` → `onWalletChange` | Adresse Safe depuis l'hôte |
| Profil + trust + balances | `@aboutcircles/sdk` → `getProfileView` | Lecture avatar Circles |
| Authentification | `@aboutcircles/miniapp-sdk` → `signMessage` | Sign-in EIP-1271 via Safe |
| Transaction | `@aboutcircles/miniapp-sdk` → `sendTransactions` | Tx test 0-value vers soi |

## User story

En tant qu'utilisateur Circles dans Gnosis App, je vois mon profil, mon solde CRC et mes stats de trust, puis je peux me connecter par signature et envoyer une transaction test sans quitter l'hôte.
