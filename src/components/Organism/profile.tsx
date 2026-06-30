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

export default function ProfileOverview() {
  const [activeTab, setActiveTab] = useState("personal");

  return (
    <div className="space-y-8 p-6">
      <ProfileHeader
        title="Profile"
        description="Manage your professional profile and career information."
      />

      <ProfileTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {activeTab === "personal" && (
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <PersonalInfoSection />
            <ExperienceSection />
            <EducationSection />
          </div>

          <div className="space-y-6">
            <ProfileCompletenessCard percentage={75} />
            <QuickActionsSection />
          </div>
        </div>
      )}

      {activeTab === "experience" && (
        <ExperienceSection />
      )}

      {activeTab === "education" && (
        <EducationSection />
      )}

      {activeTab === "skills" && (
        <SkillsSection />
      )}

      {activeTab === "projects" && (
        <ProjectsSection />
      )}

      {activeTab === "certificates" && (
        <CertificatesSection />
      )}

      {activeTab === "languages" && (
        <LanguagesSection />
      )}

      {activeTab === "preferences" && (
        <PreferencesSection />
      )}
    </div>
  );
}