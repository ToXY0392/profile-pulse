export type TimeSlot = {
  id: string;
  label: string;
};

export type Mentor = {
  slug: string;
  name: string;
  tags: string[];
  bio: string;
  slots: TimeSlot[];
  circlesAddress: `0x${string}` | null;
};

export type BookedCall = {
  id: string;
  mentorSlug: string;
  mentorName: string;
  tags: string[];
  slotId: string;
  slotLabel: string;
  txHash: string;
  bookedAt: string;
};

export const BOOKING_AMOUNT_CRC = 100;
export const BOOKING_AMOUNT_ATTO = BigInt(100) * BigInt(10 ** 18);

function mentorAddress(
  envKey: string,
  fallback: string | undefined,
): `0x${string}` | null {
  const value = process.env[envKey] ?? fallback;
  if (!value || !/^0x[a-fA-F0-9]{40}$/.test(value)) return null;
  return value as `0x${string}`;
}

export const MENTORS: Mentor[] = [
  {
    slug: "zet",
    name: "Zet",
    tags: ["AI", "Dev"],
    bio: "CTO @THP, contributor web3 on Intuition",
    slots: buildSlots("zet"),
    circlesAddress: mentorAddress(
      "NEXT_PUBLIC_MENTOR_ZET_ADDRESS",
      undefined,
    ),
  },
  {
    slug: "flo",
    name: "Flo",
    tags: ["Legal", "RoR"],
    bio: "Legal & regulatory mentor",
    slots: buildSlots("flo"),
    circlesAddress: mentorAddress(
      "NEXT_PUBLIC_MENTOR_FLO_ADDRESS",
      undefined,
    ),
  },
  {
    slug: "dimitry",
    name: "Dimitry",
    tags: ["Pate", "Image"],
    bio: "Product & visual design mentor",
    slots: buildSlots("dimitry"),
    circlesAddress: mentorAddress(
      "NEXT_PUBLIC_MENTOR_DIMITRY_ADDRESS",
      undefined,
    ),
  },
  {
    slug: "vincent",
    name: "Vincent",
    tags: ["photo", "Dev"],
    bio: "Photography & development mentor",
    slots: buildSlots("vincent"),
    circlesAddress: mentorAddress(
      "NEXT_PUBLIC_MENTOR_VINCENT_ADDRESS",
      undefined,
    ),
  },
];

function buildSlots(prefix: string): TimeSlot[] {
  const labels = [
    "Mon 10:00",
    "Mon 14:00",
    "Tue 10:00",
    "Tue 15:00",
    "Wed 11:00",
    "Wed 16:00",
    "Thu 09:00",
    "Thu 14:00",
    "Fri 10:00",
  ];
  return labels.map((label, i) => ({
    id: `${prefix}-slot-${i}`,
    label,
  }));
}

export function getMentorBySlug(slug: string): Mentor | undefined {
  return MENTORS.find((m) => m.slug === slug);
}

export function isMentorConfigured(mentor: Mentor): boolean {
  return mentor.circlesAddress !== null;
}

const DOMAIN_KEYWORDS: Record<string, string[]> = {
  ai: ["ai"],
  developpement: ["dev"],
  development: ["dev"],
  legal: ["legal"],
  dev: ["dev"],
};

export function filterMentorsByDomain(query: string): Mentor[] {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) return MENTORS;

  const tokens = trimmed
    .split(/[;,]/)
    .map((t) => t.trim())
    .filter(Boolean);

  if (tokens.length === 0) return MENTORS;

  return MENTORS.filter((mentor) =>
    tokens.some((token) => {
      const keywords = DOMAIN_KEYWORDS[token] ?? [token];
      return mentor.tags.some((tag) =>
        keywords.some(
          (kw) =>
            tag.toLowerCase().includes(kw) || kw.includes(tag.toLowerCase()),
        ),
      );
    }),
  );
}
