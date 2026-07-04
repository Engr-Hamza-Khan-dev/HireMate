"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ProfileAvatar from "@/components/Molecules/profile/profile-avatar";
import InputField from "@/components/Molecules/profile/inputfield";
import type { PersonalInfo } from "@/components/Organism/profile";

interface Props {
  value: PersonalInfo;
  onChange: (value: PersonalInfo) => void;
}

export default function PersonalInfoSection({ value, onChange }: Props) {
  const set = (field: keyof PersonalInfo) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      onChange({ ...value, [field]: e.target.value });

  const displayName =
    [value.firstName, value.lastName].filter(Boolean).join(" ") || "Your Name";

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
      </CardHeader>

      <CardContent className="space-y-8">
        <ProfileAvatar
          name={displayName}
          role={value.jobTitle || "Your Professional Title"}
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <InputField id="firstName" label="First Name"          placeholder="John"                   value={value.firstName} onChange={set("firstName")} />
          <InputField id="lastName"  label="Last Name"           placeholder="Doe"                    value={value.lastName}  onChange={set("lastName")}  />
          <InputField id="email"     label="Email" type="email"  placeholder="john@example.com"       value={value.email}     onChange={set("email")}     />
          <InputField id="phone"     label="Phone"               placeholder="+1 234 567 890"         value={value.phone}     onChange={set("phone")}     />
          <InputField id="jobTitle"  label="Professional Title"  placeholder="Senior Software Engineer" value={value.jobTitle} onChange={set("jobTitle")}  />
          <InputField id="location"  label="Location"            placeholder="New York, USA"          value={value.location}  onChange={set("location")}  />
        </div>
      </CardContent>
    </Card>
  );
}
