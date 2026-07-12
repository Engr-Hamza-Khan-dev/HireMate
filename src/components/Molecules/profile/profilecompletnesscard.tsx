"use client";

import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  PERSONAL_QUERY_KEY, fetchPersonalInfo,
  EXPERIENCE_QUERY_KEY, fetchExperiences,
  SKILLS_QUERY_KEY, fetchSkills,
  EDUCATION_QUERY_KEY, fetchEducation,
} from "@/lib/profile-api";

export default function ProfileCompletenessCard() {
  const { data: personal }    = useQuery({ queryKey: PERSONAL_QUERY_KEY,    queryFn: fetchPersonalInfo, staleTime: 60_000 });
  const { data: experiences } = useQuery({ queryKey: EXPERIENCE_QUERY_KEY,  queryFn: fetchExperiences,  staleTime: 60_000 });
  const { data: skills }      = useQuery({ queryKey: SKILLS_QUERY_KEY,      queryFn: fetchSkills,       staleTime: 60_000 });
  const { data: educations }  = useQuery({ queryKey: EDUCATION_QUERY_KEY,   queryFn: fetchEducation,    staleTime: 60_000 });

  const checks = [
    { label: "First Name",        done: !!personal?.firstName },
    { label: "Email",             done: !!personal?.email     },
    { label: "Experience Added",  done: (experiences?.length ?? 0) > 0 },
    { label: "Education Added",   done: (educations?.length  ?? 0) > 0 },
    { label: "Skills Added",      done: (skills?.length      ?? 0) > 0 },
    { label: "Job Title",         done: !!personal?.jobTitle  },
  ];

  const filled = checks.filter((c) => c.done).length;
  const percentage = Math.round((filled / checks.length) * 100);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Completeness</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">{percentage}% Complete</span>
            <Badge>{percentage}%</Badge>
          </div>
          <div className="h-2 w-full rounded-full bg-muted">
            <div className="h-2 rounded-full bg-primary transition-all" style={{ width: `${percentage}%` }} />
          </div>
        </div>

        <div className="space-y-3">
          {checks.map(({ label, done }) => (
            <div key={label} className="flex items-center justify-between">
              <span className="text-sm text-foreground">{label}</span>
              <Badge variant={done ? "outline" : "secondary"}>{done ? "Complete" : "Pending"}</Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
