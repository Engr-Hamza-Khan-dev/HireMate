import { Award, Calendar, Plus, Pencil, Trash2 } from "lucide-react";

import { Button } from "@/components/Atoms/button";

interface Certificate {
  title: string;
  issuer: string;
  issued: string;
}

const CERTIFICATES: Certificate[] = [
  {
    title: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    issued: "Jan 2025",
  },
  {
    title: "Google UX Design Professional",
    issuer: "Google",
    issued: "Aug 2024",
  },
];

export default function CertificatesSection() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">
            Certificates
          </h2>

          <p className="text-sm text-muted-foreground">
            Professional certifications you've earned.
          </p>
        </div>

        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Certificate
        </Button>
      </div>

      {CERTIFICATES.map((certificate) => (
        <div
          key={certificate.title}
          className="rounded-lg border p-5"
        >
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-violet-600" />

                <h3 className="font-semibold">
                  {certificate.title}
                </h3>
              </div>

              <p className="text-sm text-muted-foreground">
                {certificate.issuer}
              </p>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                {certificate.issued}
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="ghost" size="icon">
                <Pencil className="h-4 w-4" />
              </Button>

              <Button variant="ghost" size="icon">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}