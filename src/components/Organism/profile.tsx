"use client";

import { useState } from "react";

import ProfileHeader from "@/components/Molecules/profile/profileheader";
import ProfileTabs from "@/components/Molecules/profile/profiletabs";
import PersonalInfoSection from "@/components/Molecules/profile/personalinfo";
import ExperienceSection from "@/components/Molecules/profile/experiencesection";
import EducationSection from "@/components/Molecules/profile/educationsection";
import SkillsSection from "@/components/Molecules/profile/skills-section";
import ProjectsSection from "@/components/Molecules/profile/project-section";
import CertificatesSection from "@/components/Molecules/profile/certificate-section";
import LanguagesSection from "@/components/Molecules/profile/languages-section";
import PreferencesSection from "@/components/Molecules/profile/preference-section";
import ProfileCompletenessCard from "@/components/Molecules/profile/profilecompletnesscard";
import QuickActionsSection from "@/components/Molecules/profile/quick-action-section";

// ─── shared types (exported so sections can import them) ─────────────────────
export interface Experience {
  id: string;
  position: string;
  company: string;
  location: string;
  duration: string;
  description: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  duration: string;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string;
  github: string;
  demo: string;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  issued: string;
}

export interface Language {
  id: string;
  name: string;
  level: string;
}

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  jobTitle: string;
  location: string;
}

// ─── seed data ────────────────────────────────────────────────────────────────
const SEED_EXPERIENCES: Experience[] = [
  { id: "e1", position: "Senior Software Engineer", company: "Google",    location: "California, USA", duration: "2022 - Present", description: "Building scalable web applications using React, Next.js and cloud technologies." },
  { id: "e2", position: "Frontend Developer",       company: "Microsoft", location: "Remote",          duration: "2020 - 2022",    description: "Developed enterprise dashboards and reusable UI components." },
];

const SEED_EDUCATION: Education[] = [
  { id: "ed1", degree: "Bachelor of Computer Science", institution: "Stanford University", location: "California, USA", duration: "2016 - 2020", description: "Specialized in Software Engineering and Artificial Intelligence." },
  { id: "ed2", degree: "Higher Secondary School",      institution: "ABC College",         location: "New York",        duration: "2014 - 2016", description: "Major in Computer Science." },
];

const SEED_PROJECTS: Project[] = [
  { id: "p1", title: "HireMate",          description: "AI-powered resume and job application platform.",        technologies: "Next.js • TypeScript • Tailwind CSS • Prisma", github: "#", demo: "#" },
  { id: "p2", title: "Portfolio Website", description: "Personal portfolio showcasing projects and experience.", technologies: "React • Tailwind CSS",                          github: "#", demo: "#" },
];

const SEED_CERTIFICATES: Certificate[] = [
  { id: "c1", title: "AWS Certified Cloud Practitioner", issuer: "Amazon Web Services", issued: "Jan 2025" },
  { id: "c2", title: "Google UX Design Professional",    issuer: "Google",              issued: "Aug 2024" },
];

const SEED_LANGUAGES: Language[] = [
  { id: "l1", name: "English", level: "Fluent"         },
  { id: "l2", name: "Urdu",    level: "Native"         },
  { id: "l3", name: "Pashto",  level: "Conversational" },
];

const SEED_PERSONAL: PersonalInfo = {
  firstName: "", lastName: "", email: "", phone: "", jobTitle: "", location: "",
};

// ─── component ────────────────────────────────────────────────────────────────
export default function ProfileOverview() {
  const [activeTab, setActiveTab] = useState("personal");
  const [saved, setSaved]         = useState(false);

  // lifted state
  const [personal,      setPersonal]      = useState<PersonalInfo>(SEED_PERSONAL);
  const [experiences,   setExperiences]   = useState<Experience[]>(SEED_EXPERIENCES);
  const [educations,    setEducations]    = useState<Education[]>(SEED_EDUCATION);
  const [projects,      setProjects]      = useState<Project[]>(SEED_PROJECTS);
  const [certificates,  setCertificates]  = useState<Certificate[]>(SEED_CERTIFICATES);
  const [languages,     setLanguages]     = useState<Language[]>(SEED_LANGUAGES);
  const [skills,        setSkills]        = useState<string[]>(["React","Next.js","TypeScript","Tailwind CSS","Node.js","REST APIs","Git","Prisma"]);
  const [preferences,   setPreferences]   = useState({ remote: true, fullTime: true, internship: false, freelance: false, relocation: true, notifications: true });

  const handleSave = () => {
    // Ready for DB: all state is in one place — pass to your API here
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  // completeness calculation
  const filled = [
    personal.firstName, personal.lastName, personal.email,
    experiences.length > 0 ? "x" : "",
    educations.length  > 0 ? "x" : "",
    skills.length      > 0 ? "x" : "",
  ].filter(Boolean).length;
  const completeness = Math.round((filled / 6) * 100);

  return (
    <div className="relative space-y-6 p-4 pt-16 sm:p-6 sm:pt-6">
      {/* Save toast */}
      {saved && (
        <div role="status" aria-live="polite"
          className="fixed bottom-6 right-6 z-50 rounded-xl bg-success px-5 py-3 text-sm font-medium text-success-foreground shadow-lg"
        >
          ✓ Changes saved
        </div>
      )}

      <ProfileHeader
        title="Profile"
        description="Manage your professional profile and career information."
        onSave={handleSave}
      />

      <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === "personal" && (
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <PersonalInfoSection value={personal} onChange={setPersonal} />
            <ExperienceSection items={experiences} onChange={setExperiences} />
            <EducationSection  items={educations}  onChange={setEducations}  />
          </div>
          <div className="space-y-6">
            <ProfileCompletenessCard percentage={completeness} />
            <QuickActionsSection onTabChange={setActiveTab} />
          </div>
        </div>
      )}

      {activeTab === "experience"   && <ExperienceSection  items={experiences}  onChange={setExperiences}  />}
      {activeTab === "education"    && <EducationSection   items={educations}   onChange={setEducations}   />}
      {activeTab === "skills"       && <SkillsSection      items={skills}       onChange={setSkills}       />}
      {activeTab === "projects"     && <ProjectsSection    items={projects}     onChange={setProjects}     />}
      {activeTab === "certificates" && <CertificatesSection items={certificates} onChange={setCertificates} />}
      {activeTab === "languages"    && <LanguagesSection   items={languages}    onChange={setLanguages}    />}
      {activeTab === "preferences"  && <PreferencesSection value={preferences}  onChange={setPreferences}  />}
    </div>
  );
}
