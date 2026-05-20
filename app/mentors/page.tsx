"use client";

import { useMemo, useState } from "react";

import { MentorGrid } from "@/components/mentors/MentorGrid";
import { MentorHeader } from "@/components/mentors/MentorHeader";
import { Input } from "@/components/ui/Input";
import { filterMentorsByDomain } from "@/lib/mentors";

export default function MentorsPage() {
  const [domainQuery, setDomainQuery] = useState("");
  const mentors = useMemo(
    () => filterMentorsByDomain(domainQuery),
    [domainQuery],
  );

  return (
    <>
      <MentorHeader />
      <p className="mb-6 text-lg font-medium leading-snug text-zinc-900">
        Get a call with a mentor, Pay in CRC, help someone get a free bootcamp
        tuition.
      </p>
      <label className="mb-2 block text-sm font-medium text-zinc-900">
        Which domain you want be helped with
      </label>
      <Input
        className="mb-6"
        placeholder="AI ; Developpement; Legal ; …"
        value={domainQuery}
        onChange={(e) => setDomainQuery(e.target.value)}
      />
      <MentorGrid mentors={mentors} />
      {mentors.length === 0 && (
        <p className="mt-4 text-center text-sm text-zinc-500">
          Aucun mentor pour ce domaine.
        </p>
      )}
    </>
  );
}
