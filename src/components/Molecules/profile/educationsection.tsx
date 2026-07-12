"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Check, X } from "lucide-react";
import { Button } from "@/components/Atoms/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import EducationItem from "@/components/Molecules/profile/educationitem";
import {
  EDUCATION_QUERY_KEY, fetchEducation, addEducation, updateEducation, deleteEducation,
  type Education,
} from "@/lib/profile-api";

type DraftFields = Omit<Education, "_id">;

const EMPTY: DraftFields = {
  institution: "",
  degree: "",
  fieldOfStudy: "",
  startDate: "",
  endDate: "",
  currentlyStudying: false,
  description: "",
};

function EducationForm({
  value, onChange, onSave, onCancel, saveLabel = "Save", saving = false,
}: {
  value: DraftFields;
  onChange: (v: DraftFields) => void;
  onSave: () => void;
  onCancel: () => void;
  saveLabel?: string;
  saving?: boolean;
}) {
  const canSave =
    value.institution.trim() &&
    value.degree.trim() &&
    value.fieldOfStudy.trim() &&
    value.startDate &&
    (value.currentlyStudying || value.endDate) &&
    value.description.trim();

  return (
    <div className="rounded-lg border border-border p-5 space-y-4 bg-accent/30">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className= "space-y-1">
          <Label className="text-xs font-medium text-muted-foreground">Institution *</Label>
          <Input
            placeholder="e.g. MIT"
            value={value.institution}
            onChange={(e) => onChange({ ...value, institution: e.target.value })}
          />
        </div>
        <div className="space-y-1">
          <Label className="text-xs font-medium text-muted-foreground">Degree *</Label>
          <Input
            placeholder="e.g. Bachelor of Science"
            value={value.degree}
            onChange={(e) => onChange({ ...value, degree: e.target.value })}
          />
        </div>
        <div className="space-y-1">
          <Label className="text-xs font-medium text-muted-foreground">Field of Study *</Label>
          <Input
            placeholder="e.g. Computer Science"
            value={value.fieldOfStudy}
            onChange={(e) => onChange({ ...value, fieldOfStudy: e.target.value })}
          />
        </div>
        <div className="space-y-1">
          <Label className="text-xs font-medium text-muted-foreground">Start Date *</Label>
          <Input
            type="date"
            value={value.startDate}
            onChange={(e) => onChange({ ...value, startDate: e.target.value })}
          />
        </div>
        <div className="space-y-1">
          <Label className="text-xs font-medium text-muted-foreground">
            End Date {value.currentlyStudying ? "" : "*"}
          </Label>
          <Input
            type="date"
            value={value.endDate}
            disabled={value.currentlyStudying}
            onChange={(e) => onChange({ ...value, endDate: e.target.value })}
          />
        </div>
        <div className="flex items-center gap-2 pt-5">
          <Checkbox
            id="currentlyStudying"
            checked={value.currentlyStudying}
            onCheckedChange={(checked) =>
              onChange({ ...value, currentlyStudying: checked === true, endDate: checked ? "" : value.endDate })
            }
          />
          <Label htmlFor="currentlyStudying" className="text-sm cursor-pointer">
            I currently study here
          </Label>
        </div>
        <div className="space-y-1 sm:col-span-2">
          <Label className="text-xs font-medium text-muted-foreground">Description *</Label>
          <Input
            placeholder="Briefly describe your studies, achievements…"
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

export default function EducationSection() {
  const queryClient = useQueryClient();
  const [adding, setAdding] = useState(false);
  const [draft, setDraft] = useState<DraftFields>(EMPTY);
  const [editId, setEditId] = useState<string | null>(null);
  const [editDraft, setEditDraft] = useState<DraftFields>(EMPTY);

  const { data: items = [], isLoading } = useQuery({
    queryKey: EDUCATION_QUERY_KEY,
    queryFn: fetchEducation,
  });

  const inv = () => queryClient.invalidateQueries({ queryKey: EDUCATION_QUERY_KEY });

  const addMut = useMutation({
    mutationFn: addEducation,
    onSuccess: () => { inv(); setAdding(false); setDraft(EMPTY); },
  });
  const updateMut = useMutation({
    mutationFn: updateEducation,
    onSuccess: () => { inv(); setEditId(null); },
  });
  const deleteMut = useMutation({ mutationFn: deleteEducation, onSuccess: inv });

  if (isLoading) return <Skeleton rows={2} />;

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Education</h2>
          <p className="text-sm text-muted-foreground">Manage your educational background.</p>
        </div>
        {!adding && (
          <Button className="gap-2 self-start sm:self-auto" onClick={() => setAdding(true)}>
            <Plus className="h-4 w-4" />Add Education
          </Button>
        )}
      </div>

      {adding && (
        <EducationForm
          value={draft}
          onChange={setDraft}
          onSave={() => addMut.mutate(draft)}
          onCancel={() => { setAdding(false); setDraft(EMPTY); }}
          saveLabel="Add"
          saving={addMut.isPending}
        />
      )}

      {items.length === 0 && !adding && (
        <p className="rounded-lg border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
          No education added yet. Click "Add Education" to get started.
        </p>
      )}

      {items.map((item) =>
        editId === item._id ? (
          <EducationForm
            key={item._id}
            value={editDraft}
            onChange={setEditDraft}
            onSave={() => updateMut.mutate({ _id: item._id, ...editDraft })}
            onCancel={() => setEditId(null)}
            saveLabel="Update"
            saving={updateMut.isPending}
          />
        ) : (
          <EducationItem
            key={item._id}
            institution={item.institution}
            degree={item.degree}
            fieldOfStudy={item.fieldOfStudy}
            startDate={item.startDate}
            endDate={item.endDate}
            currentlyStudying={item.currentlyStudying}
            description={item.description}
            onEdit={() => {
              setEditId(item._id);
              setEditDraft({
                institution: item.institution,
                degree: item.degree,
                fieldOfStudy: item.fieldOfStudy,
                startDate: item.startDate,
                endDate: item.endDate,
                currentlyStudying: item.currentlyStudying,
                description: item.description,
              });
            }}
            onDelete={() => deleteMut.mutate(item._id)}
            isDeleting={deleteMut.isPending}
          />
        )
      )}
    </div>
  );
}

function Skeleton({ rows }: { rows: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="h-24 rounded-lg border border-border bg-muted/40 animate-pulse" />
      ))}
    </div>
  );
}
