"use client";

import { useEffect, useRef, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Pencil, X } from "lucide-react";
import { toast } from "sonner";
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
  firstName: "", lastName: "", email: "", phone: "",
  jobTitle: "", location: "", avatar: "",
};

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

  const [draft, setDraft] = useState<PersonalInfoPayload>(DEFAULT);
  const [editing, setEditing] = useState(false);

  // Selected file + local preview URL
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const previewUrlRef = useRef<string>("");

  useEffect(() => {
    if (server && !editing) setDraft(server);
  }, [server, editing]);

  // Clean up the object URL when it changes or component unmounts
  useEffect(() => {
    return () => {
      if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);
    };
  }, []);

  const handleFileSelect = (file: File) => {
    if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);
    const url = URL.createObjectURL(file);
    previewUrlRef.current = url;
    setAvatarFile(file);
    setPreviewUrl(url);
    // Immediately enter edit mode so the user sees the preview
    if (!editing) setEditing(true);
  };

  const { mutate: save, isPending: saving } = useMutation({
    mutationFn: ({ payload, file }: { payload: PersonalInfoPayload; file?: File }) =>
      updatePersonalInfo(payload, file ?? undefined),
    onSuccess: (result, { payload }) => {
      const fullName = `${payload.firstName} ${payload.lastName}`.trim();

      // Patch the auth user cache so sidebar name + avatar update instantly
      queryClient.setQueryData<User>(USER_QUERY_KEY, (prev) =>
        prev
          ? { ...prev, fullname: fullName, avatar: result.avatar ?? prev.avatar }
          : prev
      );

      // Refresh profile data
      queryClient.invalidateQueries({ queryKey: PERSONAL_QUERY_KEY });

      // Clean up preview
      if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);
      previewUrlRef.current = "";
      setPreviewUrl("");
      setAvatarFile(null);
      setEditing(false);

      toast.success("Profile updated");
    },
    onError: () => toast.error("Failed to update profile"),
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
    // Discard file preview
    if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);
    previewUrlRef.current = "";
    setPreviewUrl("");
    setAvatarFile(null);
    setEditing(false);
  };

  const display = editing ? draft : (server ?? draft);
  const displayName = [display.firstName, display.lastName].filter(Boolean).join(" ") || "Your Name";
  // Show local preview while editing; otherwise use server avatar
  const avatarSrc = previewUrl || display.avatar || "";

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Personal Information</CardTitle>

        <div className="flex items-center gap-2">
          {!editing && (
            <Button size="sm" variant="outline" onClick={handleEdit} disabled={isLoading}>
              <Pencil className="mr-1.5 h-3.5 w-3.5" />Edit
            </Button>
          )}
          {editing && (
            <>
              <Button size="sm" variant="outline" onClick={handleCancel} disabled={saving}>
                <X className="mr-1.5 h-3.5 w-3.5" />Cancel
              </Button>
              <Button size="sm" onClick={() => save({ payload: draft, file: avatarFile ?? undefined })} disabled={saving}>
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
          image={avatarSrc || undefined}
          onFileSelect={handleFileSelect}
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
            <InputField id="firstName" label="First Name"         placeholder="John"                     value={draft.firstName} onChange={set("firstName")} />
            <InputField id="lastName"  label="Last Name"          placeholder="Doe"                      value={draft.lastName}  onChange={set("lastName")}  />
            <InfoRow label="Email" value={draft.email} />
            <InputField id="phone"     label="Phone"              placeholder="+1 234 567 890"           value={draft.phone}     onChange={set("phone")}     />
            <InputField id="jobTitle"  label="Professional Title" placeholder="Senior Software Engineer" value={draft.jobTitle}  onChange={set("jobTitle")}  />
            <InputField id="location"  label="Location"           placeholder="New York, USA"            value={draft.location}  onChange={set("location")}  />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
