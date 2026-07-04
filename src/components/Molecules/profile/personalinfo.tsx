"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ProfileAvatar from "@/components/Molecules/profile/profile-avatar";
import InputField from "@/components/Molecules/profile/inputfield";

interface PersonalFormState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  jobTitle: string;
  location: string;
}

export default function PersonalInfoSection() {
  const [form, setForm] = useState<PersonalFormState>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    jobTitle: "",
    location: "",
  });

  const handleChange = (field: keyof PersonalFormState) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const displayName =
    [form.firstName, form.lastName].filter(Boolean).join(" ") || "Your Name";

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
      </CardHeader>

      <CardContent className="space-y-8">
        <ProfileAvatar
          name={displayName}
          role={form.jobTitle || "Your Professional Title"}
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <InputField
            id="firstName"
            label="First Name"
            placeholder="John"
            value={form.firstName}
            onChange={handleChange("firstName")}
          />

          <InputField
            id="lastName"
            label="Last Name"
            placeholder="Doe"
            value={form.lastName}
            onChange={handleChange("lastName")}
          />

          <InputField
            id="email"
            label="Email"
            type="email"
            placeholder="john@example.com"
            value={form.email}
            onChange={handleChange("email")}
          />

          <InputField
            id="phone"
            label="Phone"
            placeholder="+1 234 567 890"
            value={form.phone}
            onChange={handleChange("phone")}
          />

          <InputField
            id="jobTitle"
            label="Professional Title"
            placeholder="Senior Software Engineer"
            value={form.jobTitle}
            onChange={handleChange("jobTitle")}
          />

          <InputField
            id="location"
            label="Location"
            placeholder="New York, USA"
            value={form.location}
            onChange={handleChange("location")}
          />
        </div>
      </CardContent>
    </Card>
  );
}
