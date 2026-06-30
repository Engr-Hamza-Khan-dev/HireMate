import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import ProfileAvatar from "@/components/Molecules/profile/profile-avatar";
import InputField from "@/components/Molecules/profile/inputfield";

export default function PersonalInfoSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
      </CardHeader>

      <CardContent className="space-y-8">
        <ProfileAvatar
          name="John Doe"
          role="Senior Software Engineer"
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <InputField
            id="firstName"
            label="First Name"
            placeholder="John"
          />

          <InputField
            id="lastName"
            label="Last Name"
            placeholder="Doe"
          />

          <InputField
            id="email"
            label="Email"
            type="email"
            placeholder="john@example.com"
          />

          <InputField
            id="phone"
            label="Phone"
            placeholder="+1 234 567 890"
          />

          <InputField
            id="jobTitle"
            label="Professional Title"
            placeholder="Senior Software Engineer"
          />

          <InputField
            id="location"
            label="Location"
            placeholder="New York, USA"
          />
        </div>
      </CardContent>
    </Card>
  );
}   