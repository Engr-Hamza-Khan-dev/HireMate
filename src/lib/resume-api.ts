/**
 * Resume API — all /api/v1/resume/* endpoints.
 */
import { apiClient } from "@/lib/api";

// ─── Types ────────────────────────────────────────────────────────

export interface ResumeListItem {
  id: number;
  jobId: string;
  fullName: string;
  professionalTitle: string;
  atsScore: number;
  pdfUrl: string | null;
  matchedKeywords: string[];
  createdAt: string;
}

export interface ResumeDetail extends ResumeListItem {
  professionalSummary: string;
  skills: string[];
  experience: ResumeExperience[];
  projects: ResumeProject[];
  education: ResumeEducation[];
  certifications: ResumeCertification[];
  languages: ResumeLanguage[];
  rawContent: Record<string, unknown>;
}

export interface ResumeExperience {
  position: string;
  company: string;
  startDate: string;
  endDate: string;
  bullets: string[];
}

export interface ResumeProject {
  title: string;
  description: string;
}

export interface ResumeEducation {
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
}

export interface ResumeCertification {
  name: string;
  issuer: string;
  issuedDate: string;
}

export interface ResumeLanguage {
  name: string;
  proficiency: string;
}

// ─── Query keys ───────────────────────────────────────────────────

export const RESUMES_QUERY_KEY = ["resumes"] as const;
export const RESUME_BY_ID_QUERY_KEY = (id: number) => ["resumes", id] as const;

// ─── API functions ────────────────────────────────────────────────

/**
 * GET /api/v1/resume
 * List all resumes for the logged-in user, newest first.
 */
export async function fetchResumes(): Promise<ResumeListItem[]> {
  const res = await apiClient.get("/api/v1/resume");
  const raw = res.data?.data?.resumes ?? res.data?.data ?? res.data ?? [];
  if (!Array.isArray(raw)) return [];
  return raw as ResumeListItem[];
}

/**
 * GET /api/v1/resume/:id
 * Fetch a single resume with full detail.
 */
export async function fetchResumeById(id: number): Promise<ResumeDetail> {
  const res = await apiClient.get(`/api/v1/resume/${id}`);
  return (res.data?.data ?? res.data) as ResumeDetail;
}

/**
 * POST /api/v1/resume/generate/:jobId
 * Generate a new ATS resume for the given job.
 * Returns the saved resume record (includes pdfUrl once Cloudinary upload completes).
 */
export async function generateResumeForJob(jobId: string): Promise<ResumeListItem> {
  const res = await apiClient.post(`/api/v1/resume/generate/${jobId}`);
  return (res.data?.data ?? res.data) as ResumeListItem;
}

/**
 * GET /api/v1/resume/download/:id
 * Fetches the PDF as a blob via the authenticated backend endpoint.
 * The backend either streams from rawContent or proxies the Cloudinary file.
 */
export async function downloadResumePdf(id: number): Promise<Blob> {
  const res = await apiClient.get(`/api/v1/resume/download/${id}`, {
    responseType: "blob",
  });
  return res.data as Blob;
}

/**
 * DELETE /api/v1/resume/:id
 */
export async function deleteResume(id: number): Promise<void> {
  await apiClient.delete(`/api/v1/resume/${id}`);
}
