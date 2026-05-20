import type { Mentor } from "@/lib/mentors";

/**
 * @deprecated Préférer GET /api/mentors (cache serveur).
 * Conservé pour compatibilité ; ne pas appeler depuis le client en production.
 */
type CirclesProfile = {
  name?: string;
  description?: string;
  imageUrl?: string;
  previewImageUrl?: string;
};

export async function enrichMentorFromCircles(mentor: Mentor): Promise<Mentor> {
  if (!mentor.circlesAddress) return { ...mentor, profileLoaded: true };

  try {
    const { Sdk } = await import("@aboutcircles/sdk");
    const sdk = new Sdk();
    const view = await sdk.rpc.profile.getProfileView(mentor.circlesAddress);

    if (!view.avatarInfo) {
      return { ...mentor, profileLoaded: true };
    }

    let ipfs: CirclesProfile = {};
    if (view.avatarInfo.cidV0) {
      try {
        const full = await sdk.rpc.profile.getProfileByCid(view.avatarInfo.cidV0);
        if (full) ipfs = full as CirclesProfile;
      } catch {
        // IPFS optional
      }
    }

    const name =
      ipfs.name?.trim() || view.profile?.name?.trim() || mentor.name;
    const bio = ipfs.description?.trim() || mentor.bio;
    const imageUrl = ipfs.previewImageUrl || ipfs.imageUrl;

    return {
      ...mentor,
      name,
      bio,
      imageUrl,
      trustedByCount: view.trustStats?.trustedByCount,
      trustsCount: view.trustStats?.trustsCount,
      profileLoaded: true,
    };
  } catch {
    return { ...mentor, profileLoaded: true };
  }
}

export async function enrichAllMentors(mentors: Mentor[]): Promise<Mentor[]> {
  return Promise.all(mentors.map(enrichMentorFromCircles));
}
