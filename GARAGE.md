# Checklist circles/garage — Profile Pulse

Complétez ces étapes **avant le vendredi 23:59 CET** du cycle en cours. Dates et pools : [garage.aboutcircles.com](https://garage.aboutcircles.com).

## 1. Profil builder

- [ ] Créer un compte sur [garage.aboutcircles.com/signup](https://garage.aboutcircles.com/signup) (connexion GitHub)

## 2. Repo public

- [x] Pousser ce repo sur GitHub — [github.com/ToXY0392/profile-pulse](https://github.com/ToXY0392/profile-pulse) (branche `garage/github-and-registration`)
- [x] README à jour (dashboard + mentors + parcours test)

## 3. Déploiement HTTPS

- [x] Déployé sur Vercel
- [x] URL stable : **https://gnosis-app-five.vercel.app**
- [x] Variable Vercel `NEXT_PUBLIC_MENTOR_DEFAULT_ADDRESS` (adresse Circles pour PAY/TRUST)

Commandes :

```bash
cd Gnosis-App
pnpm build
printf '%s' '0xVotreAdresseCircles' | npx vercel env add NEXT_PUBLIC_MENTOR_DEFAULT_ADDRESS production
npx vercel --prod
```

## 4. Test playground

- [ ] Ouvrir [circles.gnosis.io/playground](https://circles.gnosis.io/playground)
- [ ] Coller `https://gnosis-app-five.vercel.app`
- [ ] Dashboard : wallet, profil, connexion signature
- [ ] Mentors : Login → créneau → PAY 100 CRC
- [ ] Mes appels : réservation visible → TRUST

## 5. Enregistrement mini-app

- [ ] Soumettre sur [garage.aboutcircles.com/register](https://garage.aboutcircles.com/register)

| Champ | Valeur suggérée |
|-------|-----------------|
| **Nom** | Profile Pulse |
| **Pitch** | Profile Pulse — identité Circles (avatar, trust, CRC), connexion par signature, réservez un appel mentor : payez 100 CRC et trustez votre mentor, dans Gnosis App. |
| **URL live** | https://gnosis-app-five.vercel.app |
| **Repo** | https://github.com/ToXY0392/profile-pulse |
| **README** | Lien vers README.md du repo |

## 6. Qualité (avant envoi)

- [ ] Relire [garage.aboutcircles.com/rules](https://garage.aboutcircles.com/rules)
- [ ] Parcours complet en moins de 2 minutes (voir README)
- [ ] Primitives Circles au cœur : signMessage, sendTransactions, transfer, trust

## Aide

Questions Circles : [t.me/about_circles/499](https://t.me/about_circles/499)
