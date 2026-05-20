"use client";

import { useMemo, useState } from "react";

import { MentorGrid } from "@/components/mentors/MentorGrid";
import { MentorHeader } from "@/components/mentors/MentorHeader";
import { Input } from "@/components/ui/Input";
import { useMentors } from "@/hooks/use-mentors";
import { filterMentorsByDomain } from "@/lib/mentors";

export default function MentorsPage() {
  const { mentors, loading } = useMentors();
  const [domainQuery, setDomainQuery] = useState("");
  const filtered = useMemo(
    () => filterMentorsByDomain(mentors, domainQuery),
    [mentors, domainQuery],
  );

  return (
    <>
      <MentorHeader />
      <p className="mb-6 text-lg font-medium leading-snug text-zinc-900">
        Get a call with a mentor, Pay in CRC, help someone get a free bootcamp
        tuition.
      </p>
      <label
        htmlFor="domain-filter"
        className="mb-2 block text-sm font-medium text-zinc-900"
      >
        Which domain you want be helped with
      </label>
      <Input
        id="domain-filter"
        className="mb-6"
        placeholder="AI ; Developpement; Legal ; …"
        value={domainQuery}
        onChange={(e) => setDomainQuery(e.target.value)}
      />
      {!loading && (
        <p className="mb-3 text-xs text-zinc-500">
          Profils chargés depuis Circles lorsque l&apos;adresse mentor est
          configurée.
        </p>
      )}
      <MentorGrid mentors={filtered} loading={loading} />
      {!loading && filtered.length === 0 && (
        <p className="mt-4 text-center text-sm text-zinc-500">
          Aucun mentor pour ce domaine.
        </p>
      )}
    </>
  );
}
