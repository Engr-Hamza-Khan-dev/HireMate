/**
 * Profile API — all /api/v1/profile/* endpoints.
 * Uses the shared apiClient from api.ts (interceptors, auth headers, etc.)
 */
import { apiClient } from "@/lib/api";

/** Safely extract an array from any common backend response shape */
function toArray<T>(raw: unknown): T[] {
    if (Array.isArray(raw)) return raw as T[];
    if (raw && typeof raw === "object") {
        // { data: [...] }  or  { items: [...] }  or  { result: [...] }
        for (const key of ["data", "items", "result", "experiences", "education", "educations",
            "skills", "skill", "languages", "language", "certificates", "certifications", "certification", "projects", "project"]) {
            const val = (raw as Record<string, unknown>)[key];
            if (Array.isArray(val)) return val as T[];
        }
    }
    return [];
}

/* ─── Personal Info ──────────────────────────────────────────────── */

/**
 * Shape the frontend works with (split name for UX convenience).
 * Internally we merge/split when talking to the backend.
 */
export interface PersonalInfoPayload {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    jobTitle: string;
    location: string;
    avatar: string;   // Cloudinary URL (read-only from server, uploadable via file)
}

/** Raw shape returned by GET /api/v1/user/me */
interface BackendProfile {
    fullname?: string;
    email?: string;
    phone?: string;
    professionalTitle?: string;
    location?: string;
    avatar?: string;
}

export const PERSONAL_QUERY_KEY = ["profile", "personal"] as const;

export async function fetchPersonalInfo(): Promise<PersonalInfoPayload> {
    const res = await apiClient.get("/api/v1/user/me");
    const raw: BackendProfile = res.data.data ?? res.data;

    const fullname = raw.fullname ?? "";
    const spaceIdx = fullname.indexOf(" ");
    const firstName = spaceIdx === -1 ? fullname : fullname.slice(0, spaceIdx);
    const lastName  = spaceIdx === -1 ? ""       : fullname.slice(spaceIdx + 1);

    return {
        firstName,
        lastName,
        email:    raw.email             ?? "",
        phone:    raw.phone             ?? "",
        jobTitle: raw.professionalTitle ?? "",
        location: raw.location          ?? "",
        avatar:   raw.avatar            ?? "",
    };
}

/**
 * Send profile update as multipart/form-data so the avatar file can be
 * included. The backend ignores email — it is NOT sent.
 */
export async function updatePersonalInfo(
    payload: PersonalInfoPayload,
    avatarFile?: File,
): Promise<{ avatar?: string }> {
    const form = new FormData();
    form.append("fullName",          `${payload.firstName} ${payload.lastName}`.trim());
    form.append("phone",             payload.phone    ?? "");
    form.append("professionalTitle", payload.jobTitle ?? "");
    form.append("location",          payload.location ?? "");
    if (avatarFile) form.append("avatar", avatarFile);

    const res = await apiClient.put("/api/v1/profile/update", form, {
        headers: { "Content-Type": "multipart/form-data" },
    });

    // Backend returns { data: { user: { avatar, ... } } }
    const user = res.data?.data?.user ?? res.data?.data ?? {};
    return { avatar: user.avatar ?? undefined };
}

/* ─── Preferences ────────────────────────────────────────────────── */
export interface PreferencesPayload {
    remoteWork: boolean;
    fullTime: boolean;
    internship: boolean;
    freelance: boolean;
    willingToRelocate: boolean;
    emailNotifications: boolean;
}
export const PREFERENCES_QUERY_KEY = ["profile", "preferences"] as const;

export async function fetchPreferences(): Promise<PreferencesPayload> {
    const res = await apiClient.get("/api/v1/profile/preference");
    const raw = res.data.data?.preference ?? res.data.data ?? res.data;
    return {
        remoteWork:         Boolean(raw.remoteWork         ?? false),
        fullTime:           Boolean(raw.fullTime           ?? false),
        internship:         Boolean(raw.internship         ?? false),
        freelance:          Boolean(raw.freelance          ?? false),
        willingToRelocate:  Boolean(raw.willingToRelocate  ?? false),
        emailNotifications: Boolean(raw.emailNotifications ?? false),
    };
}
export async function updatePreferences(payload: PreferencesPayload): Promise<void> {
    await apiClient.put("/api/v1/profile/preference", payload);
}

/* ─── Experience ─────────────────────────────────────────────────── */
export interface Experience {
    _id: string;
    position: string;
    company: string;
    location: string;
    startDate: string;        // ISO date string  "YYYY-MM-DD"
    endDate: string;          // ISO date string  "YYYY-MM-DD" (empty when currentlyWorking)
    currentlyWorking: boolean;
    description: string;
}
export const EXPERIENCE_QUERY_KEY = ["profile", "experience"] as const;

/** Normalise a raw DB record to the frontend Experience shape */
function normaliseExperience(raw: Record<string, unknown>): Experience {
    return {
        _id:              String(raw.id ?? raw._id ?? ""),
        position:         String(raw.position      ?? ""),
        company:          String(raw.company        ?? ""),
        location:         String(raw.location       ?? ""),
        startDate:        raw.startDate ? String(raw.startDate).slice(0, 10) : "",
        endDate:          raw.endDate   ? String(raw.endDate).slice(0, 10)   : "",
        currentlyWorking: Boolean(raw.currentlyWorking ?? false),
        description:      String(raw.description   ?? ""),
    };
}

export async function fetchExperiences(): Promise<Experience[]> {
    const res = await apiClient.get("/api/v1/profile/experience");
    // Backend returns: { data: { experiences: [...] } }
    // Unwrap one level so toArray can find the experiences array
    const payload = res.data?.data ?? res.data;
    return toArray<Record<string, unknown>>(payload).map(normaliseExperience);
}
export async function addExperience(payload: Omit<Experience, "_id">): Promise<Experience> {
    const res = await apiClient.post("/api/v1/profile/experience", payload);
    const raw = res.data.data?.experience ?? res.data.data ?? res.data;
    return normaliseExperience(raw as Record<string, unknown>);
}
export async function updateExperience({ _id, ...payload }: Experience): Promise<void> {
    await apiClient.put(`/api/v1/profile/experience/${_id}`, payload);
}
export async function deleteExperience(id: string): Promise<void> {
    await apiClient.delete(`/api/v1/profile/experience/${id}`);
}

/* ─── Education ──────────────────────────────────────────────────── */
export interface Education {
    _id: string;
    institution: string;
    degree: string;
    fieldOfStudy: string;
    startDate: string;         // "YYYY-MM-DD"
    endDate: string;           // "YYYY-MM-DD" (empty when currentlyStudying)
    currentlyStudying: boolean;
    description: string;
}
export const EDUCATION_QUERY_KEY = ["profile", "education"] as const;

function normaliseEducation(raw: Record<string, unknown>): Education {
    return {
        _id:              String(raw.id ?? raw._id ?? ""),
        institution:      String(raw.institution   ?? ""),
        degree:           String(raw.degree        ?? ""),
        fieldOfStudy:     String(raw.fieldOfStudy  ?? ""),
        startDate:        raw.startDate ? String(raw.startDate).slice(0, 10) : "",
        endDate:          raw.endDate   ? String(raw.endDate).slice(0, 10)   : "",
        currentlyStudying: Boolean(raw.currentlyStudying ?? false),
        description:      String(raw.description   ?? ""),
    };
}

export async function fetchEducation(): Promise<Education[]> {
    const res = await apiClient.get("/api/v1/profile/education");
    const payload = res.data?.data ?? res.data;
    return toArray<Record<string, unknown>>(payload).map(normaliseEducation);
}
export async function addEducation(payload: Omit<Education, "_id">): Promise<Education> {
    const res = await apiClient.post("/api/v1/profile/education", payload);
    const raw = res.data.data?.education ?? res.data.data ?? res.data;
    return normaliseEducation(raw as Record<string, unknown>);
}
export async function updateEducation({ _id, ...payload }: Education): Promise<void> {
    await apiClient.put(`/api/v1/profile/education/${_id}`, payload);
}
export async function deleteEducation(id: string): Promise<void> {
    await apiClient.delete(`/api/v1/profile/education/${id}`);
}

/* ─── Skills ─────────────────────────────────────────────────────── */
export interface Skill {
    _id: string;
    name: string;
}
export const SKILLS_QUERY_KEY = ["profile", "skills"] as const;

export async function fetchSkills(): Promise<Skill[]> {
    const res = await apiClient.get("/api/v1/profile/skill");
    const payload = res.data?.data ?? res.data;
    const raw = toArray<Record<string, unknown>>(payload);
    return raw.map((s) => ({ _id: String(s.id ?? s._id ?? ""), name: String(s.name ?? "") }));
}
export async function addSkill(name: string): Promise<Skill> {
    const res = await apiClient.post("/api/v1/profile/skill", { name });
    const raw = res.data.data?.skill ?? res.data.data ?? res.data;
    return { _id: String(raw.id ?? raw._id ?? ""), name: String(raw.name ?? "") };
}
export async function deleteSkill(id: string): Promise<void> {
    await apiClient.delete(`/api/v1/profile/skill/${id}`);
}

/* ─── Languages ──────────────────────────────────────────────────── */
export interface Language {
    _id: string;
    name: string;
    proficiency: string;   // backend field name
}
export const LANGUAGES_QUERY_KEY = ["profile", "languages"] as const;

function normaliseLanguage(raw: Record<string, unknown>): Language {
    return {
        _id:         String(raw.id ?? raw._id ?? ""),
        name:        String(raw.name        ?? ""),
        proficiency: String(raw.proficiency ?? ""),
    };
}

export async function fetchLanguages(): Promise<Language[]> {
    const res = await apiClient.get("/api/v1/profile/language");
    const payload = res.data?.data ?? res.data;
    return toArray<Record<string, unknown>>(payload).map(normaliseLanguage);
}
export async function addLanguage(payload: Omit<Language, "_id">): Promise<Language> {
    const res = await apiClient.post("/api/v1/profile/language", payload);
    const raw = res.data.data?.language ?? res.data.data ?? res.data;
    return normaliseLanguage(raw as Record<string, unknown>);
}
export async function updateLanguage({ _id, ...payload }: Language): Promise<void> {
    await apiClient.put(`/api/v1/profile/language/${_id}`, payload);
}
export async function deleteLanguage(id: string): Promise<void> {
    await apiClient.delete(`/api/v1/profile/language/${id}`);
}

/* ─── Certifications ─────────────────────────────────────────────── */
export interface Certificate {
    _id: string;
    name: string;
    issuer: string;
    issuedDate: string;   // "YYYY-MM-DD"
}
export const CERTIFICATES_QUERY_KEY = ["profile", "certifications"] as const;

function normaliseCertificate(raw: Record<string, unknown>): Certificate {
    return {
        _id:        String(raw.id ?? raw._id ?? ""),
        name:       String(raw.name       ?? ""),
        issuer:     String(raw.issuer     ?? ""),
        issuedDate: raw.issuedDate ? String(raw.issuedDate).slice(0, 10) : "",
    };
}

export async function fetchCertificates(): Promise<Certificate[]> {
    const res = await apiClient.get("/api/v1/profile/certification");
    const payload = res.data?.data ?? res.data;
    return toArray<Record<string, unknown>>(payload).map(normaliseCertificate);
}
export async function addCertificate(payload: Omit<Certificate, "_id">): Promise<Certificate> {
    const res = await apiClient.post("/api/v1/profile/certification", payload);
    const raw = res.data.data?.certificate ?? res.data.data ?? res.data;
    return normaliseCertificate(raw as Record<string, unknown>);
}
export async function updateCertificate({ _id, ...payload }: Certificate): Promise<void> {
    await apiClient.put(`/api/v1/profile/certification/${_id}`, payload);
}
export async function deleteCertificate(id: string): Promise<void> {
    await apiClient.delete(`/api/v1/profile/certification/${id}`);
}

/* ─── Projects ───────────────────────────────────────────────────── */
export interface Project {
    _id: string;
    title: string;
    description: string;
    githubUrl: string;
    liveUrl: string;
}
export const PROJECTS_QUERY_KEY = ["profile", "projects"] as const;

function normaliseProject(raw: Record<string, unknown>): Project {
    return {
        _id:         String(raw.id ?? raw._id   ?? ""),
        title:       String(raw.title           ?? ""),
        description: String(raw.description     ?? ""),
        githubUrl:   String(raw.githubUrl       ?? ""),
        liveUrl:     String(raw.liveUrl         ?? ""),
    };
}

export async function fetchProjects(): Promise<Project[]> {
    const res = await apiClient.get("/api/v1/profile/project");
    const payload = res.data?.data ?? res.data;
    return toArray<Record<string, unknown>>(payload).map(normaliseProject);
}
export async function addProject(payload: Omit<Project, "_id">): Promise<Project> {
    const res = await apiClient.post("/api/v1/profile/project", payload);
    const raw = res.data.data?.project ?? res.data.data ?? res.data;
    return normaliseProject(raw as Record<string, unknown>);
}
export async function updateProject({ _id, ...payload }: Project): Promise<void> {
    await apiClient.put(`/api/v1/profile/project/${_id}`, payload);
}
export async function deleteProject(id: string): Promise<void> {
    await apiClient.delete(`/api/v1/profile/project/${id}`);
}
