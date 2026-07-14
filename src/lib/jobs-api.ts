/**
 * Jobs API — all /api/v1/job/* endpoints.
 * Uses the shared apiClient from api.ts (auth headers, token refresh, etc.)
 */
import { apiClient } from "@/lib/api";

// ─── Types ────────────────────────────────────────────────────────

/** Shape the frontend works with — normalised from backend fields */
export interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo: string;     // backend: avatar (may be null)
  location: string;
  type: string;            // backend: contractType
  salary: string;
  postedAt: string;        // human-readable relative time
  matchPercentage: number; // backend: matchScore (0–100)
  isRemote: boolean;
  description: string;
  url: string;             // original apply URL from Adzuna
  responsibilities: string[];
  requirements: string[];
}

export interface JobsSearchParams {
  keyword?: string;
  countryCode?: string;   // ISO 2-letter e.g. "gb", "us", "au"
  workType?: string;      // "remote" | "onsite" | "hybrid"
  contractType?: string;
  sort?: string;
  page?: number;
  limit?: number;
}

export interface JobsSearchResult {
  jobs: Job[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface GeneratedResume {
  id: number;
  fullName?: string;
  professionalTitle?: string;
  professionalSummary?: string;
  skills?: string[];
  matchedKeywords?: string[];
  atsScore?: number;
  pdfUrl?: string | null;
}

// ─── Normalisation helpers ─────────────────────────────────────────

/** Convert a backend Job record into the frontend Job shape */
function normaliseJob(raw: Record<string, unknown>): Job {
  const contractType = String(raw.contractType ?? raw.type ?? "");

  const postedAt = (() => {
    const rawDate = raw.postedAt;
    if (!rawDate) return "Recently posted";
    const date = new Date(String(rawDate));
    if (isNaN(date.getTime())) return "Recently posted";
    const diffMs = Date.now() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);
    if (diffHours < 1) return "Just posted";
    if (diffHours < 24) return `Posted ${diffHours} hour${diffHours === 1 ? "" : "s"} ago`;
    if (diffDays === 1) return "Posted 1 day ago";
    return `Posted ${diffDays} days ago`;
  })();

  const isRemote =
    contractType.toLowerCase().includes("remote") ||
    String(raw.location ?? "").toLowerCase().includes("remote");

  return {
    id:               String(raw.id ?? ""),
    title:            String(raw.title ?? ""),
    company:          String(raw.company ?? ""),
    companyLogo:      String(raw.avatar ?? ""),
    location:         String(raw.location ?? ""),
    type:             contractType || "Full-time",
    salary:           String(raw.salary ?? ""),
    postedAt,
    matchPercentage:  typeof raw.matchScore === "number" ? raw.matchScore : 0,
    isRemote,
    description:      String(raw.description ?? ""),
    url:              String(raw.url ?? ""),
    responsibilities: [],
    requirements:     [],
  };
}

// ─── Query keys ───────────────────────────────────────────────────

export const RECOMMENDED_JOBS_QUERY_KEY = ["jobs", "recommended"] as const;
export const SEARCH_JOBS_QUERY_KEY = (params: JobsSearchParams) =>
  ["jobs", "search", params] as const;
export const JOB_BY_ID_QUERY_KEY = (id: string) => ["jobs", "detail", id] as const;

// ─── API functions ────────────────────────────────────────────────

/**
 * GET /api/v1/job/recommended
 * Returns up to 20 jobs ranked by profile match for the logged-in user.
 */
export async function fetchRecommendedJobs(): Promise<Job[]> {
  const res = await apiClient.get("/api/v1/job/recommended");
  const raw: unknown[] = res.data?.data ?? res.data ?? [];
  if (!Array.isArray(raw)) return [];
  return raw.map((j) => normaliseJob(j as Record<string, unknown>));
}

/**
 * GET /api/v1/job/search
 * Supports: keyword, location, contractType, sort (latest|oldest|bestMatch), page, limit
 */
export async function searchJobs(params: JobsSearchParams): Promise<JobsSearchResult> {
  const res = await apiClient.get("/api/v1/job/search", { params });
  const data = res.data?.data ?? res.data;

  const rawJobs: unknown[] = data?.jobs ?? (Array.isArray(data) ? data : []);
  const pagination = data?.pagination ?? {
    total: rawJobs.length,
    page: params.page ?? 1,
    limit: params.limit ?? 20,
    totalPages: 1,
  };

  return {
    jobs: rawJobs.map((j) => normaliseJob(j as Record<string, unknown>)),
    pagination,
  };
}

/**
 * POST /api/v1/job/sync
 * Triggers a fresh job sync from Adzuna on the backend (responds 202 immediately,
 * sync runs async). After calling this, wait a moment then refetch the job list.
 */
export async function triggerJobSync(): Promise<void> {
  await apiClient.post("/api/v1/job/sync");
}

/**
 * GET /api/v1/job/:id
 * Returns a single job with match score (if authenticated).
 */
export async function fetchJobById(id: string): Promise<Job | null> {
  try {
    const res = await apiClient.get(`/api/v1/job/${id}`);
    const raw = res.data?.data ?? res.data;
    if (!raw || !raw.id) return null;
    return normaliseJob(raw as Record<string, unknown>);
  } catch {
    return null;
  }
}

/**
 * GET /api/v1/job/:id/description
 * Scrapes the full description from the original posting URL.
 * Cached on the server after the first fetch.
 */
export async function fetchJobDescription(id: string): Promise<string | null> {
  try {
    const res = await apiClient.get(`/api/v1/job/${id}/description`);
    const data = res.data?.data ?? res.data;
    return data?.description ?? null;
  } catch {
    return null;
  }
}

export async function generateResumeForJob(jobId: string): Promise<GeneratedResume> {
  const res = await apiClient.post(`/api/v1/resume/generate/${jobId}`);
  return (res.data?.data ?? res.data) as GeneratedResume;
}

export async function generateResumePdfForJob(jobId: string): Promise<Blob> {
  const res = await apiClient.post(`/api/v1/resume/generate-pdf/${jobId}`, {}, {
    responseType: "blob",
  });
  return res.data as Blob;
}

export async function downloadResumePdf(resumeId: number): Promise<Blob> {
  const res = await apiClient.get(`/api/v1/resume/download/${resumeId}`, {
    responseType: "blob",
  });
  return res.data as Blob;
}
