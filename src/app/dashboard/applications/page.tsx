export const metadata = { title: "Applications" };

export default function ApplicationsPage() {
  return (
    <div className="space-y-6 p-4 pt-16 sm:p-6 sm:pt-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
        </div>
        <div>
          <h1 className="text-xl font-semibold text-foreground">My Applications</h1>
          <p className="text-sm text-muted-foreground">
            Track and manage your job applications
          </p>
        </div>
      </div>
      <p>Coming soon...</p>
    </div>
  );
}