/**
 * Cover Letter API — all /api/v1/cover-letter/* endpoints.
 */
import { apiClient } from "@/lib/api";

// ─── Types ────────────────────────────────────────────────────────

export interface CoverLetterItem {
  id: number;
  jobId: string;
  content: string;
  fileUrl: string | null;
  createdAt: string;
}

// ─── Query keys ───────────────────────────────────────────────────

export const COVER_LETTERS_QUERY_KEY    = ["cover-letters"] as const;
export const COVER_LETTER_BY_ID_QUERY_KEY = (id: number) => ["cover-letters", id] as const;

// ─── API functions ────────────────────────────────────────────────

export async function generateCoverLetter(jobId: string): Promise<CoverLetterItem> {
  const res = await apiClient.post(`/api/v1/cover-letter/generate/${jobId}`);
  return (res.data?.data ?? res.data) as CoverLetterItem;
}

export async function fetchCoverLetters(): Promise<CoverLetterItem[]> {
  const res = await apiClient.get("/api/v1/cover-letter");
  const raw = res.data?.data?.coverLetters ?? res.data?.data ?? res.data ?? [];
  if (!Array.isArray(raw)) return [];
  return raw as CoverLetterItem[];
}

export async function fetchCoverLetterById(id: number): Promise<CoverLetterItem> {
  const res = await apiClient.get(`/api/v1/cover-letter/${id}`);
  return (res.data?.data ?? res.data) as CoverLetterItem;
}

/**
 * GET /api/v1/cover-letter/download/:id
 * Streams the cover letter as a .txt blob through the authenticated backend.
 */
export async function downloadCoverLetter(id: number): Promise<Blob> {
  const res = await apiClient.get(`/api/v1/cover-letter/download/${id}`, {
    responseType: "blob",
  });
  return res.data as Blob;
}

export async function deleteCoverLetter(id: number): Promise<void> {
  await apiClient.delete(`/api/v1/cover-letter/${id}`);
}
