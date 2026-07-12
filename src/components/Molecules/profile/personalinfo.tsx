"use client";

import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Pencil, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ProfileAvatar from "@/components/Molecules/profile/profile-avatar";
import InputField from "@/components/Molecules/profile/inputfield";
import { Button } from "@/components/Atoms/button";
import {
  PERSONAL_QUERY_KEY,
  fetchPersonalInfo,
  updatePersonalInfo,
  type PersonalInfoPayload,
} from "@/lib/profile-api";
import { USER_QUERY_KEY } from "@/context/Authcontext";
import type { User } from "@/context/Authcontext";

const DEFAULT: PersonalInfoPayload = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  jobTitle: "",
  location: "",
};

/** A single read-only row: label + value */
function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-0.5">
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      <p className="text-sm text-foreground">
        {value || <span className="italic text-muted-foreground">Not set</span>}
      </p>
    </div>
  );
}

export default function PersonalInfoSection() {
  const queryClient = useQueryClient();
  const { data: server, isLoading } = useQuery({
    queryKey: PERSONAL_QUERY_KEY,
    queryFn: fetchPersonalInfo,
  });

  // local draft used only while editing
  const [draft, setDraft] = useState<PersonalInfoPayload>(DEFAULT);
  const [editing, setEditing] = useState(false);

  // when server data arrives, seed the draft (only if not actively editing)
  useEffect(() => {
    if (server && !editing) setDraft(server);
  }, [server, editing]);

  const { mutate: save, isPending: saving } = useMutation({
    mutationFn: updatePersonalInfo,
    onSuccess: (_data, variables) => {
      // 1. Immediately patch the cached user so the sidebar updates right now
      //    — no waiting for a network round-trip
      const fullName = `${variables.firstName} ${variables.lastName}`.trim();
      queryClient.setQueryData<User>(USER_QUERY_KEY, (prev) =>
        prev ? { ...prev, fullname: fullName } : prev
      );

      // 2. Refresh profile section data
      queryClient.invalidateQueries({ queryKey: PERSONAL_QUERY_KEY });

      setEditing(false);
    },
  });

  const set =
    (field: keyof PersonalInfoPayload) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setDraft((prev) => ({ ...prev, [field]: e.target.value }));

  const handleEdit = () => {
    if (server) setDraft(server);
    setEditing(true);
  };

  const handleCancel = () => {
    if (server) setDraft(server);
    setEditing(false);
  };

  // in view mode show server data; in edit mode show the draft
  const display = editing ? draft : (server ?? draft);
  const displayName =
    [display.firstName, display.lastName].filter(Boolean).join(" ") || "Your Name";

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Personal Information</CardTitle>

        <div className="flex items-center gap-2">
          {!editing && (
            <Button
              size="sm"
              variant="outline"
              onClick={handleEdit}
              disabled={isLoading}
            >
              <Pencil className="mr-1.5 h-3.5 w-3.5" />
              Edit
            </Button>
          )}

          {editing && (
            <>
              <Button
                size="sm"
                variant="outline"
                onClick={handleCancel}
                disabled={saving}
              >
                <X className="mr-1.5 h-3.5 w-3.5" />
                Cancel
              </Button>
              <Button size="sm" onClick={() => save(draft)} disabled={saving}>
                {saving ? "Saving…" : "Save"}
              </Button>
            </>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-8">
        <ProfileAvatar
          name={displayName}
          role={display.jobTitle || "Your Professional Title"}
        />

        {/* ── View mode ── */}
        {!editing && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <InfoRow label="First Name"         value={display.firstName} />
            <InfoRow label="Last Name"          value={display.lastName}  />
            <InfoRow label="Email"              value={display.email}     />
            <InfoRow label="Phone"              value={display.phone}     />
            <InfoRow label="Professional Title" value={display.jobTitle}  />
            <InfoRow label="Location"           value={display.location}  />
          </div>
        )}

        {/* ── Edit mode ── */}
        {editing && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <InputField id="firstName" label="First Name"          placeholder="John"                     value={draft.firstName} onChange={set("firstName")} />
            <InputField id="lastName"  label="Last Name"           placeholder="Doe"                      value={draft.lastName}  onChange={set("lastName")}  />
            {/* Email is read-only — shown as plain text even in edit mode */}
            <InfoRow label="Email" value={draft.email} />
            <InputField id="phone"     label="Phone"               placeholder="+1 234 567 890"           value={draft.phone}     onChange={set("phone")}     />
            <InputField id="jobTitle"  label="Professional Title"  placeholder="Senior Software Engineer" value={draft.jobTitle}  onChange={set("jobTitle")}  />
            <InputField id="location"  label="Location"            placeholder="New York, USA"            value={draft.location}  onChange={set("location")}  />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
