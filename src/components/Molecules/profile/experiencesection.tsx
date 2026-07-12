"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Check, X } from "lucide-react";
import { Button } from "@/components/Atoms/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import ExperienceItem from "@/components/Molecules/profile/experienceitem";
import {
  EXPERIENCE_QUERY_KEY, fetchExperiences, addExperience, updateExperience, deleteExperience,
  type Experience,
} from "@/lib/profile-api";

type DraftFields = Omit<Experience, "_id">;

const EMPTY: DraftFields = {
  position: "",
  company: "",
  location: "",
  startDate: "",
  endDate: "",
  currentlyWorking: false,
  description: "",
};

function ExperienceForm({
  value, onChange, onSave, onCancel, saveLabel = "Save", saving = false,
}: {
  value: DraftFields;
  onChange: (v: DraftFields) => void;
  onSave: () => void;
  onCancel: () => void;
  saveLabel?: string;
  saving?: boolean;
}) {
  const field = (key: keyof DraftFields, placeholder: string, type = "text") => (
    <Input
      type={type}
      placeholder={placeholder}
      value={value[key] as string}
      onChange={(e) => onChange({ ...value, [key]: e.target.value })}
    />
  );

  const canSave =
    value.position.trim() &&
    value.company.trim() &&
    value.location.trim() &&
    value.startDate &&
    (value.currentlyWorking || value.endDate) &&
    value.description.trim();

  return (
    <div className="rounded-lg border border-border p-5 space-y-4 bg-accent/30">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="space-y-1">
          <Label className="text-xs font-medium text-muted-foreground">Position *</Label>
          {field("position", "e.g. Software Engineer")}
        </div>
        <div className="space-y-1">
          <Label className="text-xs font-medium text-muted-foreground">Company *</Label>
          {field("company", "e.g. Acme Corp")}
        </div>
        <div className="space-y-1">
          <Label className="text-xs font-medium text-muted-foreground">Location *</Label>
          {field("location", "e.g. New York, USA")}
        </div>
        <div className="space-y-1">
          <Label className="text-xs font-medium text-muted-foreground">Start Date *</Label>
          {field("startDate", "", "date")}
        </div>
        <div className="space-y-1">
          <Label className="text-xs font-medium text-muted-foreground">End Date {value.currentlyWorking ? "" : "*"}</Label>
          <Input
            type="date"
            placeholder=""
            value={value.endDate}
            disabled={value.currentlyWorking}
            onChange={(e) => onChange({ ...value, endDate: e.target.value })}
          />
        </div>
        <div className="flex items-center gap-2 pt-5">
          <Checkbox
            id="currentlyWorking"
            checked={value.currentlyWorking}
            onCheckedChange={(checked) =>
              onChange({ ...value, currentlyWorking: checked === true, endDate: checked ? "" : value.endDate })
            }
          />
          <Label htmlFor="currentlyWorking" className="text-sm cursor-pointer">
            I currently work here
          </Label>
        </div>
        <div className="space-y-1 sm:col-span-2">
          <Label className="text-xs font-medium text-muted-foreground">Description *</Label>
          <Input
            placeholder="Describe your role and responsibilities…"
            value={value.description}
            onChange={(e) => onChange({ ...value, description: e.target.value })}
          />
        </div>
      </div>
      <div className="flex gap-2 pt-1">
        <Button size="sm" onClick={onSave} disabled={!canSave || saving} className="gap-1.5">
          <Check className="h-3.5 w-3.5" />{saving ? "Saving…" : saveLabel}
        </Button>
        <Button size="sm" variant="ghost" onClick={onCancel} className="gap-1.5" disabled={saving}>
          <X className="h-3.5 w-3.5" />Cancel
        </Button>
      </div>
    </div>
  );
}

export default function ExperienceSection() {
  const queryClient = useQueryClient();
  const [adding, setAdding] = useState(false);
  const [draft, setDraft] = useState<DraftFields>(EMPTY);
  const [editId, setEditId] = useState<string | null>(null);
  const [editDraft, setEditDraft] = useState<DraftFields>(EMPTY);

  const { data: items = [], isLoading } = useQuery({
    queryKey: EXPERIENCE_QUERY_KEY,
    queryFn: fetchExperiences,
  });

  const addMutation = useMutation({
    mutationFn: addExperience,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EXPERIENCE_QUERY_KEY });
      setAdding(false);
      setDraft(EMPTY);
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateExperience,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EXPERIENCE_QUERY_KEY });
      setEditId(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteExperience,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: EXPERIENCE_QUERY_KEY }),
  });

  if (isLoading) return <SectionSkeleton rows={2} />;

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Experience</h2>
          <p className="text-sm text-muted-foreground">Manage your professional experience.</p>
        </div>
        {!adding && (
          <Button className="gap-2 self-start sm:self-auto" onClick={() => setAdding(true)}>
            <Plus className="h-4 w-4" />Add Experience
          </Button>
        )}
      </div>

      {adding && (
        <ExperienceForm
          value={draft}
          onChange={setDraft}
          onSave={() => addMutation.mutate(draft)}
          onCancel={() => { setAdding(false); setDraft(EMPTY); }}
          saveLabel="Add"
          saving={addMutation.isPending}
        />
      )}

      {items.length === 0 && !adding && (
        <p className="rounded-lg border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
          No experience added yet. Click "Add Experience" to get started.
        </p>
      )}

      {items.map((item) =>
        editId === item._id ? (
          <ExperienceForm
            key={item._id}
            value={editDraft}
            onChange={setEditDraft}
            onSave={() => updateMutation.mutate({ _id: item._id, ...editDraft })}
            onCancel={() => setEditId(null)}
            saveLabel="Update"
            saving={updateMutation.isPending}
          />
        ) : (
          <ExperienceItem
            key={item._id}
            position={item.position}
            company={item.company}
            location={item.location}
            startDate={item.startDate}
            endDate={item.endDate}
            currentlyWorking={item.currentlyWorking}
            description={item.description}
            onEdit={() => {
              setEditId(item._id);
              setEditDraft({
                position: item.position,
                company: item.company,
                location: item.location,
                startDate: item.startDate,
                endDate: item.endDate,
                currentlyWorking: item.currentlyWorking,
                description: item.description,
              });
            }}
            onDelete={() => deleteMutation.mutate(item._id)}
            isDeleting={deleteMutation.isPending}
          />
        )
      )}
    </div>
  );
}

function SectionSkeleton({ rows }: { rows: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="h-24 rounded-lg border border-border bg-muted/40 animate-pulse" />
      ))}
    </div>
  );
}
