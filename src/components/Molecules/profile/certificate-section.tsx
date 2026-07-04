import { Award, Calendar, Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/Atoms/button";

interface Certificate {
  title: string;
  issuer: string;
  issued: string;
}

const CERTIFICATES: Certificate[] = [
  { title: "AWS Certified Cloud Practitioner", issuer: "Amazon Web Services", issued: "Jan 2025" },
  { title: "Google UX Design Professional",    issuer: "Google",              issued: "Aug 2024" },
];

export default function CertificatesSection() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Certificates</h2>
          <p className="text-sm text-muted-foreground">Professional certifications you've earned.</p>
        </div>
        <Button className="gap-2 self-start sm:self-auto">
          <Plus className="h-4 w-4" />Add Certificate
        </Button>
      </div>

      {CERTIFICATES.map((cert) => (
        <div key={cert.title} className="rounded-lg border border-border p-5">
          <div className="flex items-start justify-between gap-2">
            <div className="space-y-2 min-w-0">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 shrink-0 text-primary" />
                <h3 className="font-semibold text-foreground">{cert.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground">{cert.issuer}</p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />{cert.issued}
              </div>
            </div>
            <div className="flex shrink-0 gap-1">
              <Button variant="ghost" size="icon"><Pencil className="h-4 w-4" /></Button>
              <Button variant="ghost" size="icon"><Trash2 className="h-4 w-4" /></Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
