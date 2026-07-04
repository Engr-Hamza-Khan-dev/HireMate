"use client";

import { useState } from "react";
import { Award, Calendar, Plus, Pencil, Trash2, Check, X } from "lucide-react";
import { Button } from "@/components/Atoms/button";
import { Input } from "@/components/ui/input";
import type { Certificate } from "@/components/Organism/profile";

interface Props {
  items: Certificate[];
  onChange: (items: Certificate[]) => void;
}

const EMPTY: Omit<Certificate, "id"> = { title: "", issuer: "", issued: "" };

function CertificateForm({
  value,
  onChange,
  onSave,
  onCancel,
  saveLabel = "Save",
}: {
  value: Omit<Certificate, "id">;
  onChange: (v: Omit<Certificate, "id">) => void;
  onSave: () => void;
  onCancel: () => void;
  saveLabel?: string;
}) {
  return (
    <div className="rounded-lg border border-border p-5 space-y-3 bg-accent/30">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="space-y-1 sm:col-span-2">
          <label className="text-xs font-medium text-muted-foreground">Certificate Title *</label>
          <Input value={value.title} onChange={(e) => onChange({ ...value, title: e.target.value })} placeholder="e.g. AWS Certified Developer" />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-muted-foreground">Issuing Organisation</label>
          <Input value={value.issuer} onChange={(e) => onChange({ ...value, issuer: e.target.value })} placeholder="e.g. Amazon Web Services" />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-muted-foreground">Date Issued</label>
          <Input value={value.issued} onChange={(e) => onChange({ ...value, issued: e.target.value })} placeholder="e.g. Jan 2025" />
        </div>
      </div>
      <div className="flex gap-2 pt-1">
        <Button size="sm" onClick={onSave} disabled={!value.title.trim()} className="gap-1.5">
          <Check className="h-3.5 w-3.5" />{saveLabel}
        </Button>
        <Button size="sm" variant="ghost" onClick={onCancel} className="gap-1.5">
          <X className="h-3.5 w-3.5" />Cancel
        </Button>
      </div>
    </div>
  );
}

export default function CertificatesSection({ items, onChange }: Props) {
  const [adding, setAdding]       = useState(false);
  const [draft, setDraft]         = useState<Omit<Certificate, "id">>(EMPTY);
  const [editId, setEditId]       = useState<string | null>(null);
  const [editDraft, setEditDraft] = useState<Omit<Certificate, "id">>(EMPTY);

  const handleAdd = () => {
    onChange([...items, { ...draft, id: crypto.randomUUID() }]);
    setDraft(EMPTY);
    setAdding(false);
  };

  const handleDelete = (id: string) => onChange(items.filter((i) => i.id !== id));

  const startEdit = (item: Certificate) => {
    setEditId(item.id);
    setEditDraft({ title: item.title, issuer: item.issuer, issued: item.issued });
  };

  const handleEditSave = () => {
    onChange(items.map((i) => i.id === editId ? { ...i, ...editDraft } : i));
    setEditId(null);
  };

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
        <CertificateForm value={draft} onChange={setDraft} onSave={handleAdd} onCancel={() => { setAdding(false); setDraft(EMPTY); }} saveLabel="Add" />
      )}

      {items.length === 0 && !adding && (
        <p className="rounded-lg border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
          No certificates added yet. Click "Add Certificate" to get started.
        </p>
      )}

      {items.map((item) =>
        editId === item.id ? (
          <CertificateForm key={item.id} value={editDraft} onChange={setEditDraft} onSave={handleEditSave} onCancel={() => setEditId(null)} saveLabel="Update" />
        ) : (
          <div key={item.id} className="rounded-lg border border-border p-5">
            <div className="flex items-start justify-between gap-2">
              <div className="space-y-2 min-w-0">
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 shrink-0 text-primary" />
                  <h3 className="font-semibold text-foreground">{item.title}</h3>
                </div>
                {item.issuer && <p className="text-sm text-muted-foreground">{item.issuer}</p>}
                {item.issued && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />{item.issued}
                  </div>
                )}
              </div>
              <div className="flex shrink-0 gap-1">
                <Button variant="ghost" size="icon" onClick={() => startEdit(item)} aria-label="Edit"><Pencil className="h-4 w-4" /></Button>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)} aria-label="Delete" className="hover:text-destructive"><Trash2 className="h-4 w-4" /></Button>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
}
