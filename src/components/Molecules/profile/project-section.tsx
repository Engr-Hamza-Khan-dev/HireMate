import {
  FolderOpen,
  Plus,
  Pencil,
  Trash2,
  ExternalLink,
  GitBranch,
} from "lucide-react";

import { Button } from "@/components/Atoms/button";

interface Project {
  title: string;
  description: string;
  technologies: string;
  github?: string;
  demo?: string;
}

const PROJECTS: Project[] = [
  {
    title: "HireMate",
    description: "AI-powered resume and job application platform.",
    technologies: "Next.js • TypeScript • Tailwind CSS • Prisma",
    github: "#",
    demo: "#",
  },
  {
    title: "Portfolio Website",
    description: "Personal portfolio showcasing projects and experience.",
    technologies: "React • Tailwind CSS",
    github: "#",
    demo: "#",
  },
];

export default function ProjectsSection() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Projects</h2>
          <p className="text-sm text-muted-foreground">
            Showcase your best work.
          </p>
        </div>

        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Project
        </Button>
      </div>

      {PROJECTS.map((project) => (
        <div
          key={project.title}
          className="rounded-lg border p-5 space-y-3"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FolderOpen className="h-5 w-5 text-violet-600" />
              <h3 className="font-semibold">{project.title}</h3>
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

          <p className="text-sm text-muted-foreground">
            {project.description}
          </p>

          <p className="text-sm font-medium">
            {project.technologies}
          </p>

          <div className="flex gap-4">
          <Button variant="outline" className="gap-2">
  <GitBranch className="h-4 w-4" />
  GitHub
</Button>

            <Button variant="outline" className="gap-2">
              <ExternalLink className="h-4 w-4" />
              Live Demo
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}