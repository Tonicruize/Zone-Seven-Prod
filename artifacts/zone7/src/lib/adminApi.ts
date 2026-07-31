/** Base path for all API calls (proxied through the shared reverse proxy) */
const BASE = '/api';

export const TOKEN_KEY = 'zone7_admin_token';

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(t: string) {
  localStorage.setItem(TOKEN_KEY, t);
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

function authHeaders(): Record<string, string> {
  const t = getToken();
  return t ? { Authorization: `Bearer ${t}`, 'Content-Type': 'application/json' } : { 'Content-Type': 'application/json' };
}

async function ok(res: Response) {
  if (!res.ok) {
    const body = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(body?.error ?? res.statusText);
  }
  if (res.status === 204) return null;
  return res.json();
}

export async function login(password: string): Promise<string> {
  const res = await fetch(`${BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password }),
  });
  const data = await ok(res);
  return data.token as string;
}

// ── Videos ────────────────────────────────────────────────────────────

export async function listAdminVideos() {
  return ok(await fetch(`${BASE}/admin/videos`, { headers: authHeaders() }));
}

export async function createVideo(body: {
  title: string;
  videoType: string;
  storagePath?: string | null;
  youtubeId?: string | null;
  thumbnailPath?: string | null;
}) {
  return ok(await fetch(`${BASE}/admin/videos`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(body),
  }));
}

export async function deleteVideo(id: number) {
  return ok(await fetch(`${BASE}/admin/videos/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  }));
}

// ── Gallery ───────────────────────────────────────────────────────────

export async function listAdminImages() {
  return ok(await fetch(`${BASE}/admin/images`, { headers: authHeaders() }));
}

export async function createImage(body: { storagePath: string; altText?: string | null }) {
  return ok(await fetch(`${BASE}/admin/images`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(body),
  }));
}

export async function deleteImage(id: number) {
  return ok(await fetch(`${BASE}/admin/images/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  }));
}

// ── Storage upload (presigned URL flow) ─────────────────────────────

export async function requestUploadUrl(file: File): Promise<{ uploadURL: string; objectPath: string }> {
  return ok(await fetch(`${BASE}/storage/uploads/request-url`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ name: file.name, size: file.size, contentType: file.type }),
  }));
}

export async function uploadToPresignedUrl(uploadURL: string, file: File): Promise<void> {
  const res = await fetch(uploadURL, {
    method: 'PUT',
    headers: { 'Content-Type': file.type },
    body: file,
  });
  if (!res.ok) throw new Error(`Upload failed: ${res.statusText}`);
}

/** Full two-step upload: get URL then upload file. Returns objectPath. */
export async function uploadFile(file: File): Promise<string> {
  const { uploadURL, objectPath } = await requestUploadUrl(file);
  await uploadToPresignedUrl(uploadURL, file);
  return objectPath;
}

/** Convert an objectPath to a serving URL */
export function storageUrl(objectPath: string): string {
  return `${BASE}/storage${objectPath}`;
}
