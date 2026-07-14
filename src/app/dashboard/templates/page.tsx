export const metadata = { title: "Templates" };

export default function TemplatePage() {
  return (
    <div className="space-y-6 p-4 pt-16 sm:p-6 sm:pt-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
        </div>
        <div>
          <h1 className="text-xl font-semibold text-foreground">My Templates</h1>
          <p className="text-sm text-muted-foreground">
            Manage your resume templates
          </p>
        </div>
      </div>
      <p>Coming soon...</p>
      <div className="grid gap-4">
        {/* Template cards will go here */}
        This is templates page
      </div>
    </div>
  );
}