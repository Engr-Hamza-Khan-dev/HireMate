"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Globe, Plus, Pencil, Trash2, Check, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/Atoms/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  LANGUAGES_QUERY_KEY, fetchLanguages, addLanguage, updateLanguage, deleteLanguage,
  type Language,
} from "@/lib/profile-api";

type DraftFields = Omit<Language, "_id">;
const EMPTY: DraftFields = { name: "", proficiency: "" };
const PROFICIENCY_OPTIONS = ["Native", "Fluent", "Advanced", "Intermediate", "Conversational", "Basic"];

function getErrorMessage(err: unknown, fallback = "Something went wrong"): string {
  if (err && typeof err === "object") {
    const data = (err as { response?: { data?: unknown } })?.response?.data;
    if (data && typeof data === "object") {
      const msg = (data as { message?: string }).message;
      if (msg) return msg;
    }
    if (data && typeof data === "string") {
      const match = data.match(/Error:\s*([^\n<]+)/);
      if (match?.[1]) return match[1].trim();
    }
  }
  return fallback;
}

function LanguageForm({ value, onChange, onSave, onCancel, saveLabel = "Save", saving = false }: {
  value: DraftFields; onChange: (v: DraftFields) => void;
  onSave: () => void; onCancel: () => void; saveLabel?: string; saving?: boolean;
}) {
  return (
    <div className="rounded-lg border border-border p-5 space-y-3 bg-accent/30">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="space-y-1">
          <Label className="text-xs font-medium text-muted-foreground">Language *</Label>
          <Input value={value.name} onChange={(e) => onChange({ ...value, name: e.target.value })}
            placeholder="e.g. Spanish" />
        </div>
        <div className="space-y-1">
          <Label className="text-xs font-medium text-muted-foreground">Proficiency Level</Label>
          <select
            value={value.proficiency}
            onChange={(e) => onChange({ ...value, proficiency: e.target.value })}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">Select level</option>
            {PROFICIENCY_OPTIONS.map((l) => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>
      </div>
      <div className="flex gap-2 pt-1">
        <Button size="sm" onClick={onSave} disabled={!value.name.trim() || saving} className="gap-1.5">
          <Check className="h-3.5 w-3.5" />{saving ? "Saving…" : saveLabel}
        </Button>
        <Button size="sm" variant="ghost" onClick={onCancel} className="gap-1.5" disabled={saving}>
          <X className="h-3.5 w-3.5" />Cancel
        </Button>
      </div>
    </div>
  );
}

export default function LanguagesSection() {
  const queryClient = useQueryClient();
  const [adding, setAdding] = useState(false);
  const [draft, setDraft] = useState<DraftFields>(EMPTY);
  const [editId, setEditId] = useState<string | null>(null);
  const [editDraft, setEditDraft] = useState<DraftFields>(EMPTY);

  const { data: items = [], isLoading } = useQuery({ queryKey: LANGUAGES_QUERY_KEY, queryFn: fetchLanguages });

  const inv = () => queryClient.invalidateQueries({ queryKey: LANGUAGES_QUERY_KEY });
  const addMut = useMutation({
    mutationFn: addLanguage,
    onSuccess: () => { inv(); setAdding(false); setDraft(EMPTY); },
    onError: (err) => toast.error(getErrorMessage(err)),
  });
  const updateMut = useMutation({
    mutationFn: updateLanguage,
    onSuccess: () => { inv(); setEditId(null); },
    onError: (err) => toast.error(getErrorMessage(err)),
  });
  const deleteMut = useMutation({
    mutationFn: deleteLanguage,
    onSuccess: inv,
    onError: (err) => toast.error(getErrorMessage(err)),
  });

  if (isLoading) return (
    <div className="space-y-3">
      {Array.from({ length: 2 }).map((_, i) => (
        <div key={i} className="h-16 rounded-lg border border-border bg-muted/40 animate-pulse" />
      ))}
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Languages</h2>
          <p className="text-sm text-muted-foreground">Languages you can communicate in.</p>
        </div>
        {!adding && (
          <Button className="gap-2 self-start sm:self-auto" onClick={() => setAdding(true)}>
            <Plus className="h-4 w-4" />Add Language
          </Button>
        )}
      </div>

      {adding && (
        <LanguageForm value={draft} onChange={setDraft}
          onSave={() => addMut.mutate(draft)}
          onCancel={() => { setAdding(false); setDraft(EMPTY); }}
          saveLabel="Add" saving={addMut.isPending}
        />
      )}

      {items.length === 0 && !adding && (
        <p className="rounded-lg border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
          No languages added yet. Click "Add Language" to get started.
        </p>
      )}

      {items.map((item) =>
        editId === item._id ? (
          <LanguageForm key={item._id} value={editDraft} onChange={setEditDraft}
            onSave={() => updateMut.mutate({ _id: item._id, ...editDraft })}
            onCancel={() => setEditId(null)} saveLabel="Update" saving={updateMut.isPending}
          />
        ) : (
          <div key={item._id} className="flex items-center justify-between rounded-lg border border-border p-5">
            <div className="flex items-center gap-3">
              <Globe className="h-5 w-5 shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold text-foreground">{item.name}</h3>
                {item.proficiency && <Badge variant="secondary">{item.proficiency}</Badge>}
              </div>
            </div>
            <div className="flex gap-1">
              <Button size="icon" variant="ghost" aria-label="Edit"
                onClick={() => { setEditId(item._id); setEditDraft({ name: item.name, proficiency: item.proficiency }); }}>
                <Pencil className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost" aria-label="Delete"
                className="hover:text-destructive" disabled={deleteMut.isPending}
                onClick={() => deleteMut.mutate(item._id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )
      )}
    </div>
  );
}
