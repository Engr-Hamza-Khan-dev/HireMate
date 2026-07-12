"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Award, Calendar, Plus, Pencil, Trash2, Check, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/Atoms/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  CERTIFICATES_QUERY_KEY, fetchCertificates, addCertificate, updateCertificate, deleteCertificate,
  type Certificate,
} from "@/lib/profile-api";

type DraftFields = Omit<Certificate, "_id">;
const EMPTY: DraftFields = { name: "", issuer: "", issuedDate: "" };

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

function CertificateForm({ value, onChange, onSave, onCancel, saveLabel = "Save", saving = false }: {
  value: DraftFields; onChange: (v: DraftFields) => void;
  onSave: () => void; onCancel: () => void; saveLabel?: string; saving?: boolean;
}) {
  return (
    <div className="rounded-lg border border-border p-5 space-y-3 bg-accent/30">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="space-y-1 sm:col-span-2">
          <Label className="text-xs font-medium text-muted-foreground">Certificate Name *</Label>
          <Input value={value.name} onChange={(e) => onChange({ ...value, name: e.target.value })}
            placeholder="e.g. AWS Certified Developer" />
        </div>
        <div className="space-y-1">
          <Label className="text-xs font-medium text-muted-foreground">Issuing Organisation</Label>
          <Input value={value.issuer} onChange={(e) => onChange({ ...value, issuer: e.target.value })}
            placeholder="e.g. Amazon Web Services" />
        </div>
        <div className="space-y-1">
          <Label className="text-xs font-medium text-muted-foreground">Date Issued</Label>
          <Input type="date" value={value.issuedDate} onChange={(e) => onChange({ ...value, issuedDate: e.target.value })} />
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

function formatDate(iso: string): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export default function CertificatesSection() {
  const queryClient = useQueryClient();
  const [adding, setAdding] = useState(false);
  const [draft, setDraft] = useState<DraftFields>(EMPTY);
  const [editId, setEditId] = useState<string | null>(null);
  const [editDraft, setEditDraft] = useState<DraftFields>(EMPTY);

  const { data: items = [], isLoading } = useQuery({ queryKey: CERTIFICATES_QUERY_KEY, queryFn: fetchCertificates });

  const inv = () => queryClient.invalidateQueries({ queryKey: CERTIFICATES_QUERY_KEY });
  const addMut = useMutation({
    mutationFn: addCertificate,
    onSuccess: () => { inv(); setAdding(false); setDraft(EMPTY); },
    onError: (err) => toast.error(getErrorMessage(err)),
  });
  const updateMut = useMutation({
    mutationFn: updateCertificate,
    onSuccess: () => { inv(); setEditId(null); },
    onError: (err) => toast.error(getErrorMessage(err)),
  });
  const deleteMut = useMutation({
    mutationFn: deleteCertificate,
    onSuccess: inv,
    onError: (err) => toast.error(getErrorMessage(err)),
  });

  if (isLoading) return (
    <div className="space-y-3">
      {Array.from({ length: 2 }).map((_, i) => (
        <div key={i} className="h-20 rounded-lg border border-border bg-muted/40 animate-pulse" />
      ))}
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Certificates</h2>
          <p className="text-sm text-muted-foreground">Professional certifications you've earned.</p>
        </div>
        {!adding && (
          <Button className="gap-2 self-start sm:self-auto" onClick={() => setAdding(true)}>
            <Plus className="h-4 w-4" />Add Certificate
          </Button>
        )}
      </div>

      {adding && (
        <CertificateForm value={draft} onChange={setDraft}
          onSave={() => addMut.mutate(draft)}
          onCancel={() => { setAdding(false); setDraft(EMPTY); }}
          saveLabel="Add" saving={addMut.isPending}
        />
      )}

      {items.length === 0 && !adding && (
        <p className="rounded-lg border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
          No certificates added yet. Click "Add Certificate" to get started.
        </p>
      )}

      {items.map((item) =>
        editId === item._id ? (
          <CertificateForm key={item._id} value={editDraft} onChange={setEditDraft}
            onSave={() => updateMut.mutate({ _id: item._id, ...editDraft })}
            onCancel={() => setEditId(null)} saveLabel="Update" saving={updateMut.isPending}
          />
        ) : (
          <div key={item._id} className="rounded-lg border border-border p-5">
            <div className="flex items-start justify-between gap-2">
              <div className="space-y-2 min-w-0">
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 shrink-0 text-primary" />
                  <h3 className="font-semibold text-foreground">{item.name}</h3>
                </div>
                {item.issuer && <p className="text-sm text-muted-foreground">{item.issuer}</p>}
                {item.issuedDate && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />{formatDate(item.issuedDate)}
                  </div>
                )}
              </div>
              <div className="flex shrink-0 gap-1">
                <Button variant="ghost" size="icon" aria-label="Edit"
                  onClick={() => { setEditId(item._id); setEditDraft({ name: item.name, issuer: item.issuer, issuedDate: item.issuedDate }); }}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" aria-label="Delete"
                  className="hover:text-destructive" disabled={deleteMut.isPending}
                  onClick={() => deleteMut.mutate(item._id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
}
