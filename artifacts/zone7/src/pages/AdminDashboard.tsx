import { useState, useEffect, useRef, ChangeEvent } from 'react';
import {
  clearToken,
  listAdminVideos, createVideo, updateVideo, deleteVideo,
  listAdminImages, createImage, deleteImage,
  listAdminBookings,
  listAdminBeats, createBeat, deleteBeat,
  updateImage,
  uploadFile, storageUrl,
} from '../lib/adminApi';

type VideoType = 'music-video' | 'bts' | 'reels';

const VIDEO_TYPE_LABELS: Record<VideoType, string> = {
  'music-video': 'Music Video',
  'bts': 'Behind the Scenes',
  'reels': 'Instagram Reel',
};

interface VideoEntry {
  id: number;
  title: string;
  videoType: string;
  storagePath: string | null;
  youtubeId: string | null;
  thumbnailPath: string | null;
  position: number;
}

interface ImageEntry {
  id: number;
  altText: string | null;
  storagePath: string;
  position: number;
}

interface BeatEntry {
  id: number;
  title: string;
  genre: string;
  bpm: number;
  key: string | null;
  price: string | null;
  tags: string[] | null;
  storagePath: string | null;
  position: number;
}

interface BookingEntry {
  id: number;
  name: string;
  email: string;
  projectType: string;
  budget: string | null;
  timeline: string | null;
  message: string;
  createdAt: string;
}

interface Props { onLogout: () => void; }

const TAB_LABELS = {
  videos: 'Music / BTS',
  reels: 'Reels',
  gallery: 'Gallery',
  beats: 'Beats',
  bookings: 'Inquiries',
} as const;

export function AdminDashboard({ onLogout }: Props) {
  const [tab, setTab] = useState<'videos' | 'reels' | 'gallery' | 'beats' | 'bookings'>('videos');

  return (
    <div className="admin-page min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b border-white/5 px-6 md:px-12 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-[9px] tracking-[0.4em] uppercase text-primary/60">Zone7</span>
          <span className="w-px h-3 bg-foreground/20" />
          <span className="text-[9px] tracking-[0.4em] uppercase text-foreground/40">Admin</span>
        </div>
        <button
          onClick={onLogout}
          className="text-[9px] tracking-[0.3em] uppercase text-foreground/30 hover:text-foreground/70 transition-colors"
        >
          Sign Out
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-white/5 px-6 md:px-12 flex gap-8 overflow-x-auto">
        {(['videos', 'reels', 'gallery', 'beats', 'bookings'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`py-4 text-[9px] tracking-[0.3em] uppercase transition-colors border-b-2 -mb-px shrink-0
              ${tab === t ? 'text-primary border-primary' : 'text-foreground/35 border-transparent hover:text-foreground/60'}`}
          >
            {TAB_LABELS[t]}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="px-6 md:px-12 py-10 max-w-5xl">
        {tab === 'videos' && <VideosTab />}
        {tab === 'reels' && <ReelsTab />}
        {tab === 'gallery' && <GalleryTab />}
        {tab === 'beats' && <BeatsTab />}
        {tab === 'bookings' && <BookingsTab />}
      </div>
    </div>
  );
}

/* ─── Shared: inline position editor ──────────────────────────────── */

function PositionInput({ id, initial, onSaved }: { id: number; initial: number; onSaved: () => void }) {
  const [val, setVal] = useState(String(initial));
  const [saving, setSaving] = useState(false);

  async function save() {
    const n = parseInt(val, 10);
    if (isNaN(n) || n === initial) return;
    setSaving(true);
    try {
      await updateVideo(id, { position: n });
      onSaved();
    } catch {
      setVal(String(initial));
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="flex items-center gap-1 shrink-0">
      <span className="text-[8px] tracking-widest text-foreground/25 uppercase">#</span>
      <input
        type="number"
        min={0}
        value={val}
        onChange={(e) => setVal(e.target.value)}
        onBlur={save}
        onKeyDown={(e) => e.key === 'Enter' && (e.currentTarget.blur())}
        disabled={saving}
        className="w-12 text-center bg-foreground/5 border border-white/10 text-[11px] text-foreground/70
          py-1 focus:outline-none focus:border-primary/40 disabled:opacity-40 [appearance:textfield]
          [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
      />
    </div>
  );
}

/* ─── Videos Tab (Music Videos + BTS) ────────────────────────────── */

function VideosTab() {
  const [videos, setVideos] = useState<VideoEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [title, setTitle] = useState('');
  const [videoType, setVideoType] = useState<'music-video' | 'bts'>('music-video');
  const [sourceMode, setSourceMode] = useState<'upload' | 'youtube'>('upload');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [uploadProgress, setUploadProgress] = useState('');
  const videoInputRef = useRef<HTMLInputElement>(null);

  async function load() {
    try {
      const data: VideoEntry[] = await listAdminVideos();
      setVideos((data ?? []).filter((v) => v.videoType !== 'reels').sort((a, b) => a.position - b.position));
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to load');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  function extractYoutubeId(url: string): string | null {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_-]{11})/,
      /youtube\.com\/embed\/([A-Za-z0-9_-]{11})/,
    ];
    for (const p of patterns) { const m = url.match(p); if (m) return m[1]; }
    if (/^[A-Za-z0-9_-]{11}$/.test(url.trim())) return url.trim();
    return null;
  }

  async function handleAddVideo(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) { setSubmitError('Title is required'); return; }
    setSubmitting(true); setSubmitError(''); setUploadProgress('');
    try {
      let storagePath: string | null = null;
      let youtubeId: string | null = null;
      if (sourceMode === 'youtube') {
        youtubeId = extractYoutubeId(youtubeUrl);
        if (!youtubeId) { setSubmitError('Could not extract YouTube video ID'); setSubmitting(false); return; }
      } else {
        if (!videoFile) { setSubmitError('Select a video file'); setSubmitting(false); return; }
        setUploadProgress('Uploading video…');
        storagePath = await uploadFile(videoFile);
      }
      setUploadProgress('Saving…');
      await createVideo({ title: title.trim(), videoType, storagePath, youtubeId });
      setTitle(''); setYoutubeUrl(''); setVideoFile(null);
      if (videoInputRef.current) videoInputRef.current.value = '';
      await load();
    } catch (e: unknown) {
      setSubmitError(e instanceof Error ? e.message : 'Failed to add video');
    } finally {
      setSubmitting(false); setUploadProgress('');
    }
  }

  async function handleDelete(id: number) {
    if (!confirm('Delete this video?')) return;
    try { await deleteVideo(id); await load(); }
    catch (e: unknown) { alert(e instanceof Error ? e.message : 'Delete failed'); }
  }

  return (
    <div className="flex flex-col gap-10">
      <div className="border border-white/8 p-6">
        <p className="text-[9px] tracking-[0.4em] uppercase text-primary/60 mb-6">Add Music Video or BTS</p>
        <form onSubmit={handleAddVideo} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="admin-label">Title</label>
              <input value={title} onChange={(e) => setTitle(e.target.value)} className="admin-input" placeholder="Video title" required />
            </div>
            <div>
              <label className="admin-label">Type</label>
              <select value={videoType} onChange={(e) => setVideoType(e.target.value as 'music-video' | 'bts')} className="admin-input">
                <option value="music-video">Music Video</option>
                <option value="bts">Behind the Scenes</option>
              </select>
            </div>
          </div>

          <div>
            <label className="admin-label">Source</label>
            <div className="flex gap-2 mb-3">
              {(['upload', 'youtube'] as const).map((m) => (
                <button key={m} type="button" onClick={() => setSourceMode(m)}
                  className={`px-4 py-1.5 text-[9px] tracking-[0.25em] uppercase border transition-colors
                    ${sourceMode === m ? 'border-primary text-primary bg-primary/10' : 'border-white/15 text-foreground/40 hover:border-white/30'}`}>
                  {m === 'upload' ? 'Upload File' : 'YouTube Link'}
                </button>
              ))}
            </div>
            {sourceMode === 'upload' ? (
              <div>
                <input ref={videoInputRef} type="file" accept="video/*"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setVideoFile(e.target.files?.[0] ?? null)}
                  className="block w-full text-sm text-foreground/50 file:mr-4 file:py-2 file:px-4 file:border file:border-white/20 file:text-[9px] file:tracking-widest file:uppercase file:bg-transparent file:text-foreground/60 file:cursor-pointer hover:file:border-primary/50 hover:file:text-primary transition-colors" />
                {videoFile && <p className="mt-1.5 text-[10px] text-foreground/40">{videoFile.name} — {(videoFile.size / 1024 / 1024).toFixed(1)} MB</p>}
              </div>
            ) : (
              <input value={youtubeUrl} onChange={(e) => setYoutubeUrl(e.target.value)} className="admin-input" placeholder="https://youtube.com/watch?v=... or bare video ID" />
            )}
          </div>

          {submitError && <p className="text-[10px] text-red-400">{submitError}</p>}
          {uploadProgress && <p className="text-[10px] text-primary/70 tracking-widest animate-pulse">{uploadProgress}</p>}
          <button type="submit" disabled={submitting}
            className="self-start border border-primary/50 px-8 py-2.5 text-[9px] tracking-[0.3em] uppercase text-foreground/70 hover:bg-primary/10 hover:border-primary transition-all disabled:opacity-40">
            {submitting ? 'Adding…' : 'Add Video'}
          </button>
        </form>
      </div>

      <VideoList videos={videos} loading={loading} error={error} onDelete={handleDelete} onReorder={load} />
    </div>
  );
}

/* ─── Reels Tab ────────────────────────────────────────────────────── */

function ReelsTab() {
  const [reels, setReels] = useState<VideoEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [title, setTitle] = useState('');
  const [sourceMode, setSourceMode] = useState<'instagram' | 'upload'>('instagram');
  const [reelInput, setReelInput] = useState('');
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [uploadProgress, setUploadProgress] = useState('');
  const videoInputRef = useRef<HTMLInputElement>(null);

  async function load() {
    try {
      const data: VideoEntry[] = await listAdminVideos();
      setReels((data ?? []).filter((v) => v.videoType === 'reels').sort((a, b) => a.position - b.position));
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to load');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  function extractShortcode(input: string): string | null {
    const m = input.match(/instagram\.com\/(?:reel|p)\/([A-Za-z0-9_-]+)/);
    if (m) return m[1];
    if (/^[A-Za-z0-9_-]{8,15}$/.test(input.trim())) return input.trim();
    return null;
  }

  async function handleAddReel(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) { setSubmitError('Title is required'); return; }
    setSubmitting(true); setSubmitError(''); setUploadProgress('');
    try {
      if (sourceMode === 'instagram') {
        const shortcode = extractShortcode(reelInput);
        if (!shortcode) { setSubmitError('Enter a valid Instagram reel URL or shortcode'); setSubmitting(false); return; }
        await createVideo({ title: title.trim(), videoType: 'reels', youtubeId: shortcode, storagePath: null });
        setReelInput('');
      } else {
        if (!videoFile) { setSubmitError('Select a video file'); setSubmitting(false); return; }
        setUploadProgress('Uploading video…');
        const storagePath = await uploadFile(videoFile);
        setUploadProgress('Saving…');
        await createVideo({ title: title.trim(), videoType: 'reels', youtubeId: null, storagePath });
        setVideoFile(null);
        if (videoInputRef.current) videoInputRef.current.value = '';
      }
      setTitle('');
      await load();
    } catch (e: unknown) {
      setSubmitError(e instanceof Error ? e.message : 'Failed to add reel');
    } finally {
      setSubmitting(false); setUploadProgress('');
    }
  }

  async function handleDelete(id: number) {
    if (!confirm('Delete this reel?')) return;
    try { await deleteVideo(id); await load(); }
    catch (e: unknown) { alert(e instanceof Error ? e.message : 'Delete failed'); }
  }

  return (
    <div className="flex flex-col gap-10">
      <div className="border border-white/8 p-6">
        <p className="text-[9px] tracking-[0.4em] uppercase text-primary/60 mb-6">Add Reel</p>
        <form onSubmit={handleAddReel} className="flex flex-col gap-4">
          <div>
            <label className="admin-label">Title</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} className="admin-input" placeholder="Reel title" required />
          </div>

          <div>
            <label className="admin-label">Source</label>
            <div className="flex gap-2 mb-3">
              {(['instagram', 'upload'] as const).map((m) => (
                <button key={m} type="button" onClick={() => setSourceMode(m)}
                  className={`px-4 py-1.5 text-[9px] tracking-[0.25em] uppercase border transition-colors
                    ${sourceMode === m ? 'border-primary text-primary bg-primary/10' : 'border-white/15 text-foreground/40 hover:border-white/30'}`}>
                  {m === 'instagram' ? 'Instagram Link' : 'Upload File'}
                </button>
              ))}
            </div>
            {sourceMode === 'instagram' ? (
              <input value={reelInput} onChange={(e) => setReelInput(e.target.value)} className="admin-input"
                placeholder="https://instagram.com/reel/ABC123... or bare shortcode" required />
            ) : (
              <div>
                <input ref={videoInputRef} type="file" accept="video/*"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setVideoFile(e.target.files?.[0] ?? null)}
                  className="block w-full text-sm text-foreground/50 file:mr-4 file:py-2 file:px-4 file:border file:border-white/20 file:text-[9px] file:tracking-widest file:uppercase file:bg-transparent file:text-foreground/60 file:cursor-pointer hover:file:border-primary/50 hover:file:text-primary transition-colors" />
                {videoFile && <p className="mt-1.5 text-[10px] text-foreground/40">{videoFile.name} — {(videoFile.size / 1024 / 1024).toFixed(1)} MB</p>}
              </div>
            )}
          </div>

          {submitError && <p className="text-[10px] text-red-400">{submitError}</p>}
          {uploadProgress && <p className="text-[10px] text-primary/70 tracking-widest animate-pulse">{uploadProgress}</p>}
          <button type="submit" disabled={submitting}
            className="self-start border border-primary/50 px-8 py-2.5 text-[9px] tracking-[0.3em] uppercase text-foreground/70 hover:bg-primary/10 hover:border-primary transition-all disabled:opacity-40">
            {submitting ? 'Adding…' : 'Add Reel'}
          </button>
        </form>
      </div>

      {/* List */}
      <div>
        <p className="text-[9px] tracking-[0.4em] uppercase text-foreground/30 mb-5">
          {reels.length} reel{reels.length !== 1 ? 's' : ''}
        </p>
        {loading ? (
          <p className="text-[10px] text-foreground/30 tracking-widest animate-pulse">Loading…</p>
        ) : error ? (
          <p className="text-[10px] text-red-400">{error}</p>
        ) : reels.length === 0 ? (
          <p className="text-[10px] text-foreground/25 tracking-widest">No reels yet.</p>
        ) : (
          <div className="flex flex-col gap-3">
            {reels.map((r) => (
              <div key={r.id} className="flex items-center gap-4 border border-white/8 p-4">
                {/* Preview */}
                {r.youtubeId ? (
                  <div className="shrink-0 w-10 h-[70px] bg-foreground/5 overflow-hidden border border-white/5">
                    <iframe
                      src={`https://www.instagram.com/reel/${r.youtubeId}/embed/`}
                      className="w-full h-full border-0 pointer-events-none scale-[0.4] origin-top-left"
                      style={{ width: '250%', height: '250%' }}
                      loading="lazy"
                      scrolling="no"
                      title={r.title}
                    />
                  </div>
                ) : r.storagePath ? (
                  <div className="shrink-0 w-10 h-[70px] bg-foreground/5 overflow-hidden border border-white/5 flex items-center justify-center">
                    <span className="text-[8px] tracking-widest text-foreground/30 uppercase rotate-90">VIDEO</span>
                  </div>
                ) : null}

                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground font-medium truncate">{r.title}</p>
                  <p className="text-[8px] tracking-[0.3em] text-foreground/30 mt-0.5 font-mono">
                    {r.youtubeId ? `instagram:${r.youtubeId}` : 'uploaded file'}
                  </p>
                </div>

                {r.youtubeId && (
                  <a href={`https://www.instagram.com/reel/${r.youtubeId}/`} target="_blank" rel="noopener noreferrer"
                    className="text-[8px] tracking-widest uppercase text-foreground/25 hover:text-primary transition-colors shrink-0">
                    View ↗
                  </a>
                )}
                {r.storagePath && (
                  <a href={storageUrl(r.storagePath)} target="_blank" rel="noopener noreferrer"
                    className="text-[8px] tracking-widest uppercase text-foreground/25 hover:text-primary transition-colors shrink-0">
                    View ↗
                  </a>
                )}

                <PositionInput id={r.id} initial={r.position} onSaved={load} />

                <button onClick={() => handleDelete(r.id)}
                  className="text-[8px] tracking-widest uppercase text-red-400/40 hover:text-red-400 transition-colors shrink-0">
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Shared video list (used by Videos tab) ──────────────────────── */

function VideoList({ videos, loading, error, onDelete, onReorder }: {
  videos: VideoEntry[];
  loading: boolean;
  error: string;
  onDelete: (id: number) => void;
  onReorder: () => void;
}) {
  return (
    <div>
      <p className="text-[9px] tracking-[0.4em] uppercase text-foreground/30 mb-5">
        {videos.length} video{videos.length !== 1 ? 's' : ''}
      </p>
      {loading ? (
        <p className="text-[10px] text-foreground/30 tracking-widest animate-pulse">Loading…</p>
      ) : error ? (
        <p className="text-[10px] text-red-400">{error}</p>
      ) : videos.length === 0 ? (
        <p className="text-[10px] text-foreground/25 tracking-widest">No videos yet.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {videos.map((v) => (
            <div key={v.id} className="flex items-center gap-4 border border-white/8 p-4">
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground font-medium truncate">{v.title}</p>
                <div className="flex items-center gap-3 mt-0.5">
                  <span className="text-[8px] tracking-[0.35em] uppercase text-primary/60">
                    {VIDEO_TYPE_LABELS[v.videoType as VideoType] ?? v.videoType}
                  </span>
                  {v.youtubeId && <span className="text-[8px] tracking-[0.3em] text-foreground/30 font-mono">yt:{v.youtubeId}</span>}
                  {v.storagePath && <span className="text-[8px] tracking-[0.3em] text-foreground/30">uploaded file</span>}
                </div>
              </div>

              {v.youtubeId && (
                <a href={`https://youtube.com/watch?v=${v.youtubeId}`} target="_blank" rel="noopener noreferrer"
                  className="text-[8px] tracking-widest uppercase text-foreground/25 hover:text-primary transition-colors shrink-0">
                  View ↗
                </a>
              )}
              {v.storagePath && (
                <a href={storageUrl(v.storagePath)} target="_blank" rel="noopener noreferrer"
                  className="text-[8px] tracking-widest uppercase text-foreground/25 hover:text-primary transition-colors shrink-0">
                  View ↗
                </a>
              )}

              <PositionInput id={v.id} initial={v.position} onSaved={onReorder} />

              <button onClick={() => onDelete(v.id)}
                className="text-[8px] tracking-widest uppercase text-red-400/40 hover:text-red-400 transition-colors shrink-0">
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Gallery Tab ──────────────────────────────────────────────────── */

function GalleryTab() {
  const [images, setImages] = useState<ImageEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [altText, setAltText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [uploadProgress, setUploadProgress] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function load() {
    try {
      const data = await listAdminImages();
      setImages((data ?? []).sort((a: ImageEntry, b: ImageEntry) => a.position - b.position));
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to load');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function handleAddImage(e: React.FormEvent) {
    e.preventDefault();
    if (!imageFile) { setSubmitError('Select an image file'); return; }
    setSubmitting(true); setSubmitError(''); setUploadProgress('Uploading image…');
    try {
      const storagePath = await uploadFile(imageFile);
      setUploadProgress('Saving…');
      await createImage({ storagePath, altText: altText.trim() || null });
      setImageFile(null); setAltText('');
      if (fileInputRef.current) fileInputRef.current.value = '';
      await load();
    } catch (e: unknown) {
      setSubmitError(e instanceof Error ? e.message : 'Failed to add image');
    } finally {
      setSubmitting(false); setUploadProgress('');
    }
  }

  async function handleDelete(id: number) {
    if (!confirm('Delete this image?')) return;
    try { await deleteImage(id); await load(); }
    catch (e: unknown) { alert(e instanceof Error ? e.message : 'Delete failed'); }
  }

  async function handleImagePosition(id: number, position: number) {
    try {
      await updateImage(id, { position });
      await load();
    } catch { /* ignore */ }
  }

  return (
    <div className="flex flex-col gap-10">
      <div className="border border-white/8 p-6">
        <p className="text-[9px] tracking-[0.4em] uppercase text-primary/60 mb-6">Upload Gallery Image</p>
        <form onSubmit={handleAddImage} className="flex flex-col gap-4">
          <div>
            <label className="admin-label">Image File</label>
            <input ref={fileInputRef} type="file" accept="image/*"
              onChange={(e: ChangeEvent<HTMLInputElement>) => setImageFile(e.target.files?.[0] ?? null)}
              className="block w-full text-sm text-foreground/50 file:mr-4 file:py-2 file:px-4 file:border file:border-white/20 file:text-[9px] file:tracking-widest file:uppercase file:bg-transparent file:text-foreground/60 file:cursor-pointer hover:file:border-primary/50 hover:file:text-primary transition-colors" />
            {imageFile && <p className="mt-1.5 text-[10px] text-foreground/40">{imageFile.name} — {(imageFile.size / 1024 / 1024).toFixed(2)} MB</p>}
          </div>
          <div>
            <label className="admin-label">Alt Text (optional)</label>
            <input value={altText} onChange={(e) => setAltText(e.target.value)} className="admin-input" placeholder="Describe the image" />
          </div>
          {submitError && <p className="text-[10px] text-red-400">{submitError}</p>}
          {uploadProgress && <p className="text-[10px] text-primary/70 tracking-widest animate-pulse">{uploadProgress}</p>}
          <button type="submit" disabled={submitting || !imageFile}
            className="self-start border border-primary/50 px-8 py-2.5 text-[9px] tracking-[0.3em] uppercase text-foreground/70 hover:bg-primary/10 hover:border-primary transition-all disabled:opacity-40">
            {submitting ? 'Uploading…' : 'Upload Image'}
          </button>
        </form>
      </div>

      <div>
        <p className="text-[9px] tracking-[0.4em] uppercase text-foreground/30 mb-5">
          {images.length} image{images.length !== 1 ? 's' : ''}
        </p>
        {loading ? (
          <p className="text-[10px] text-foreground/30 tracking-widest animate-pulse">Loading…</p>
        ) : error ? (
          <p className="text-[10px] text-red-400">{error}</p>
        ) : images.length === 0 ? (
          <p className="text-[10px] text-foreground/25 tracking-widest">No images yet.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {images.map((img) => (
              <div key={img.id} className="relative group">
                <div className="aspect-square bg-foreground/5 overflow-hidden">
                  <img src={storageUrl(img.storagePath)} alt={img.altText ?? ''} className="w-full h-full object-cover" />
                </div>
                <div className="flex items-center justify-between mt-1.5 px-0.5">
                  <ImagePositionInput id={img.id} initial={img.position} onSaved={load} onUpdate={handleImagePosition} />
                  <button onClick={() => handleDelete(img.id)}
                    className="text-[8px] tracking-widest uppercase text-red-400/40 hover:text-red-400 transition-colors">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Beats Tab ────────────────────────────────────────────────────── */

function BeatsTab() {
  const [beats, setBeats] = useState<BeatEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [bpm, setBpm] = useState('');
  const [key, setKey] = useState('');
  const [price, setPrice] = useState('');
  const [tags, setTags] = useState('');
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [uploadProgress, setUploadProgress] = useState('');
  const audioInputRef = useRef<HTMLInputElement>(null);

  async function load() {
    try {
      const data = await listAdminBeats();
      setBeats(data ?? []);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to load');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !genre.trim() || !bpm.trim()) {
      setSubmitError('Title, genre, and BPM are required');
      return;
    }
    setSubmitting(true); setSubmitError(''); setUploadProgress('');
    try {
      let storagePath: string | null = null;
      if (audioFile) {
        setUploadProgress('Uploading audio…');
        storagePath = await uploadFile(audioFile);
      }
      setUploadProgress('Saving…');
      const tagsArr = tags.trim() ? tags.split(',').map((t) => t.trim()).filter(Boolean) : undefined;
      await createBeat({
        title: title.trim(),
        genre: genre.trim(),
        bpm: parseInt(bpm, 10),
        key: key.trim() || null,
        price: price.trim() || null,
        tags: tagsArr,
        storagePath,
      });
      setTitle(''); setGenre(''); setBpm(''); setKey(''); setPrice(''); setTags('');
      setAudioFile(null);
      if (audioInputRef.current) audioInputRef.current.value = '';
      await load();
    } catch (e: unknown) {
      setSubmitError(e instanceof Error ? e.message : 'Failed to add beat');
    } finally {
      setSubmitting(false); setUploadProgress('');
    }
  }

  async function handleDelete(id: number) {
    if (!confirm('Delete this beat?')) return;
    try { await deleteBeat(id); await load(); }
    catch (e: unknown) { alert(e instanceof Error ? e.message : 'Delete failed'); }
  }

  return (
    <div className="flex flex-col gap-10">
      <div className="border border-white/8 p-6">
        <p className="text-[9px] tracking-[0.4em] uppercase text-primary/60 mb-6">Add Beat</p>
        <form onSubmit={handleAdd} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="admin-label">Title</label>
              <input value={title} onChange={(e) => setTitle(e.target.value)} className="admin-input" placeholder="NIGHT VISION" required />
            </div>
            <div>
              <label className="admin-label">Genre</label>
              <input value={genre} onChange={(e) => setGenre(e.target.value)} className="admin-input" placeholder="TRAP, AFROBEATS, DRILL…" required />
            </div>
            <div>
              <label className="admin-label">BPM</label>
              <input type="number" value={bpm} onChange={(e) => setBpm(e.target.value)} className="admin-input" placeholder="140" required min={1} />
            </div>
            <div>
              <label className="admin-label">Key (optional)</label>
              <input value={key} onChange={(e) => setKey(e.target.value)} className="admin-input" placeholder="F# Minor" />
            </div>
            <div>
              <label className="admin-label">Price (optional)</label>
              <input value={price} onChange={(e) => setPrice(e.target.value)} className="admin-input" placeholder="$29.99" />
            </div>
            <div>
              <label className="admin-label">Tags — comma separated (optional)</label>
              <input value={tags} onChange={(e) => setTags(e.target.value)} className="admin-input" placeholder="dark, melodic, cinematic" />
            </div>
          </div>
          <div>
            <label className="admin-label">Audio File (optional — enables playback on the Beats page)</label>
            <input ref={audioInputRef} type="file" accept="audio/*"
              onChange={(e: ChangeEvent<HTMLInputElement>) => setAudioFile(e.target.files?.[0] ?? null)}
              className="block w-full text-sm text-foreground/50 file:mr-4 file:py-2 file:px-4 file:border file:border-white/20 file:text-[9px] file:tracking-widest file:uppercase file:bg-transparent file:text-foreground/60 file:cursor-pointer hover:file:border-primary/50 hover:file:text-primary transition-colors" />
            {audioFile && <p className="mt-1.5 text-[10px] text-foreground/40">{audioFile.name} — {(audioFile.size / 1024 / 1024).toFixed(2)} MB</p>}
          </div>
          {submitError && <p className="text-[10px] text-red-400">{submitError}</p>}
          {uploadProgress && <p className="text-[10px] text-primary/70 tracking-widest animate-pulse">{uploadProgress}</p>}
          <button type="submit" disabled={submitting}
            className="self-start border border-primary/50 px-8 py-2.5 text-[9px] tracking-[0.3em] uppercase text-foreground/70 hover:bg-primary/10 hover:border-primary transition-all disabled:opacity-40">
            {submitting ? 'Adding…' : 'Add Beat'}
          </button>
        </form>
      </div>

      <div>
        <p className="text-[9px] tracking-[0.4em] uppercase text-foreground/30 mb-5">
          {beats.length} beat{beats.length !== 1 ? 's' : ''}
        </p>
        {loading ? (
          <p className="text-[10px] text-foreground/30 tracking-widest animate-pulse">Loading…</p>
        ) : error ? (
          <p className="text-[10px] text-red-400">{error}</p>
        ) : beats.length === 0 ? (
          <p className="text-[10px] text-foreground/25 tracking-widest">No beats yet — add one above.</p>
        ) : (
          <div className="flex flex-col gap-3">
            {beats.map((b) => (
              <div key={b.id} className="flex items-center gap-4 border border-white/8 p-4">
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground font-medium">{b.title}</p>
                  <div className="flex items-center gap-3 mt-0.5 flex-wrap">
                    <span className="text-[8px] tracking-[0.35em] uppercase text-primary/60">{b.genre}</span>
                    <span className="text-[8px] tracking-[0.3em] text-foreground/30">{b.bpm} BPM</span>
                    {b.key && <span className="text-[8px] tracking-[0.3em] text-foreground/30">{b.key}</span>}
                    {b.price && <span className="text-[8px] tracking-[0.3em] text-foreground/40 font-mono">{b.price}</span>}
                    {b.storagePath && <span className="text-[8px] tracking-[0.3em] text-primary/40">▶ audio</span>}
                  </div>
                </div>
                {b.storagePath && (
                  <a href={storageUrl(b.storagePath)} target="_blank" rel="noopener noreferrer"
                    className="text-[8px] tracking-widest uppercase text-foreground/25 hover:text-primary transition-colors shrink-0">
                    Listen ↗
                  </a>
                )}
                <button onClick={() => handleDelete(b.id)}
                  className="text-[8px] tracking-widest uppercase text-red-400/40 hover:text-red-400 transition-colors shrink-0">
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Bookings (Inquiries) Tab ─────────────────────────────────────── */

function BookingsTab() {
  const [bookings, setBookings] = useState<BookingEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expanded, setExpanded] = useState<number | null>(null);

  useEffect(() => {
    listAdminBookings()
      .then((data) => setBookings(data ?? []))
      .catch((e: unknown) => setError(e instanceof Error ? e.message : 'Failed to load'))
      .finally(() => setLoading(false));
  }, []);

  function fmt(iso: string) {
    return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  }

  return (
    <div>
      <p className="text-[9px] tracking-[0.4em] uppercase text-foreground/30 mb-5">
        {bookings.length} inquiry{bookings.length !== 1 ? 's' : ''}
      </p>
      {loading ? (
        <p className="text-[10px] text-foreground/30 tracking-widest animate-pulse">Loading…</p>
      ) : error ? (
        <p className="text-[10px] text-red-400">{error}</p>
      ) : bookings.length === 0 ? (
        <p className="text-[10px] text-foreground/25 tracking-widest">No inquiries yet.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {bookings.map((b) => (
            <div key={b.id} className="border border-white/8">
              <button
                onClick={() => setExpanded(expanded === b.id ? null : b.id)}
                className="w-full flex items-center gap-4 p-4 text-left hover:bg-white/[0.02] transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground font-medium">{b.name}</p>
                  <p className="text-[9px] tracking-[0.2em] text-foreground/40 mt-0.5">{b.email}</p>
                </div>
                <span className="text-[8px] tracking-[0.3em] uppercase text-primary/60 shrink-0">{b.projectType}</span>
                {b.budget && <span className="text-[8px] tracking-[0.2em] text-foreground/30 shrink-0 hidden md:block">{b.budget}</span>}
                <span className="text-[8px] tracking-[0.2em] text-foreground/25 shrink-0">{fmt(b.createdAt)}</span>
                <span className="text-[10px] text-foreground/25 shrink-0">{expanded === b.id ? '▲' : '▼'}</span>
              </button>

              {expanded === b.id && (
                <div className="px-4 pb-5 pt-0 border-t border-white/5 flex flex-col gap-3">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-3">
                    {b.timeline && (
                      <div>
                        <p className="text-[8px] tracking-[0.35em] uppercase text-foreground/25 mb-1">Timeline</p>
                        <p className="text-[11px] text-foreground/70">{b.timeline}</p>
                      </div>
                    )}
                    {b.budget && (
                      <div>
                        <p className="text-[8px] tracking-[0.35em] uppercase text-foreground/25 mb-1">Budget</p>
                        <p className="text-[11px] text-foreground/70">{b.budget}</p>
                      </div>
                    )}
                    <div>
                      <p className="text-[8px] tracking-[0.35em] uppercase text-foreground/25 mb-1">Received</p>
                      <p className="text-[11px] text-foreground/70">{fmt(b.createdAt)}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-[8px] tracking-[0.35em] uppercase text-foreground/25 mb-1">Message</p>
                    <p className="text-[11px] text-foreground/60 leading-relaxed whitespace-pre-wrap">{b.message}</p>
                  </div>
                  <a
                    href={`mailto:${b.email}?subject=Re: ${encodeURIComponent(b.projectType)} — Zone7`}
                    className="self-start text-[8px] tracking-[0.3em] uppercase border border-primary/30 text-primary/70 px-4 py-2 hover:bg-primary/10 hover:border-primary/60 transition-all"
                  >
                    Reply via Email ↗
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Image position input ─────────────────────────────────────────── */

function ImagePositionInput({ id, initial, onSaved, onUpdate }: {
  id: number; initial: number; onSaved: () => void; onUpdate: (id: number, pos: number) => void;
}) {
  const [val, setVal] = useState(String(initial));

  async function save() {
    const n = parseInt(val, 10);
    if (isNaN(n) || n === initial) return;
    await onUpdate(id, n);
    onSaved();
  }

  return (
    <div className="flex items-center gap-1">
      <span className="text-[8px] tracking-widest text-foreground/25 uppercase">#</span>
      <input type="number" min={0} value={val}
        onChange={(e) => setVal(e.target.value)}
        onBlur={save}
        onKeyDown={(e) => e.key === 'Enter' && e.currentTarget.blur()}
        className="w-10 text-center bg-foreground/5 border border-white/10 text-[11px] text-foreground/70
          py-0.5 focus:outline-none focus:border-primary/40
          [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
    </div>
  );
}
