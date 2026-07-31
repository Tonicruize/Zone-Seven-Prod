import { useState, useEffect, useRef, ChangeEvent } from 'react';
import { clearToken, listAdminVideos, createVideo, deleteVideo, listAdminImages, createImage, deleteImage, uploadFile, storageUrl } from '../lib/adminApi';

type VideoType = 'music-video' | 'bts' | 'reels';

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

const VIDEO_TYPE_LABELS: Record<VideoType, string> = {
  'music-video': 'Music Video',
  'bts': 'Behind the Scenes',
  'reels': 'Instagram Reels',
};

interface Props {
  onLogout: () => void;
}

export function AdminDashboard({ onLogout }: Props) {
  const [tab, setTab] = useState<'videos' | 'gallery'>('videos');

  return (
    <div className="min-h-screen bg-background text-foreground">
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
      <div className="border-b border-white/5 px-6 md:px-12 flex gap-8">
        {(['videos', 'gallery'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`py-4 text-[9px] tracking-[0.3em] uppercase transition-colors border-b-2 -mb-px
              ${tab === t ? 'text-primary border-primary' : 'text-foreground/35 border-transparent hover:text-foreground/60'}`}
          >
            {t === 'videos' ? 'Works Videos' : 'Gallery Images'}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="px-6 md:px-12 py-10 max-w-5xl">
        {tab === 'videos' ? <VideosTab /> : <GalleryTab />}
      </div>
    </div>
  );
}

/* ─── Videos Tab ──────────────────────────────────────────────────── */

function VideosTab() {
  const [videos, setVideos] = useState<VideoEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Add-video form
  const [title, setTitle] = useState('');
  const [videoType, setVideoType] = useState<VideoType>('music-video');
  const [sourceMode, setSourceMode] = useState<'upload' | 'youtube'>('upload');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [uploadProgress, setUploadProgress] = useState('');
  const videoInputRef = useRef<HTMLInputElement>(null);

  async function load() {
    try {
      const data = await listAdminVideos();
      setVideos(data ?? []);
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
    for (const p of patterns) {
      const m = url.match(p);
      if (m) return m[1];
    }
    // Might be a bare ID
    if (/^[A-Za-z0-9_-]{11}$/.test(url.trim())) return url.trim();
    return null;
  }

  async function handleAddVideo(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) { setSubmitError('Title is required'); return; }
    setSubmitting(true);
    setSubmitError('');
    setUploadProgress('');

    try {
      let storagePath: string | null = null;
      let youtubeId: string | null = null;

      if (sourceMode === 'youtube') {
        youtubeId = extractYoutubeId(youtubeUrl);
        if (!youtubeId) { setSubmitError('Could not extract YouTube video ID from that URL'); setSubmitting(false); return; }
      } else {
        if (!videoFile) { setSubmitError('Select a video file to upload'); setSubmitting(false); return; }
        setUploadProgress('Uploading video…');
        storagePath = await uploadFile(videoFile);
      }

      setUploadProgress('Saving…');
      await createVideo({ title: title.trim(), videoType, storagePath, youtubeId });
      setTitle('');
      setYoutubeUrl('');
      setVideoFile(null);
      if (videoInputRef.current) videoInputRef.current.value = '';
      setUploadProgress('');
      await load();
    } catch (e: unknown) {
      setSubmitError(e instanceof Error ? e.message : 'Failed to add video');
    } finally {
      setSubmitting(false);
      setUploadProgress('');
    }
  }

  async function handleDelete(id: number) {
    if (!confirm('Delete this video?')) return;
    try {
      await deleteVideo(id);
      await load();
    } catch (e: unknown) {
      alert(e instanceof Error ? e.message : 'Delete failed');
    }
  }

  return (
    <div className="flex flex-col gap-10">
      {/* Add form */}
      <div className="border border-white/8 p-6">
        <p className="text-[9px] tracking-[0.4em] uppercase text-primary/60 mb-6">Add New Video</p>
        <form onSubmit={handleAddVideo} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="admin-label">Title</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="admin-input"
                placeholder="Video title"
                required
              />
            </div>
            <div>
              <label className="admin-label">Type</label>
              <select
                value={videoType}
                onChange={(e) => setVideoType(e.target.value as VideoType)}
                className="admin-input"
              >
                {(Object.entries(VIDEO_TYPE_LABELS) as [VideoType, string][]).map(([val, label]) => (
                  <option key={val} value={val}>{label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Source mode toggle */}
          <div>
            <label className="admin-label">Source</label>
            <div className="flex gap-2 mb-3">
              {(['upload', 'youtube'] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setSourceMode(m)}
                  className={`px-4 py-1.5 text-[9px] tracking-[0.25em] uppercase border transition-colors
                    ${sourceMode === m ? 'border-primary text-primary bg-primary/10' : 'border-white/15 text-foreground/40 hover:border-white/30'}`}
                >
                  {m === 'upload' ? 'Upload File' : 'YouTube Link'}
                </button>
              ))}
            </div>

            {sourceMode === 'upload' ? (
              <div>
                <input
                  ref={videoInputRef}
                  type="file"
                  accept="video/*"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setVideoFile(e.target.files?.[0] ?? null)}
                  className="block w-full text-sm text-foreground/50 file:mr-4 file:py-2 file:px-4
                    file:border file:border-white/20 file:text-[9px] file:tracking-widest file:uppercase
                    file:bg-transparent file:text-foreground/60 file:cursor-pointer
                    hover:file:border-primary/50 hover:file:text-primary transition-colors"
                />
                {videoFile && (
                  <p className="mt-1.5 text-[10px] text-foreground/40">{videoFile.name} — {(videoFile.size / 1024 / 1024).toFixed(1)} MB</p>
                )}
              </div>
            ) : (
              <input
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                className="admin-input"
                placeholder="https://youtube.com/watch?v=... or bare video ID"
              />
            )}
          </div>

          {submitError && <p className="text-[10px] text-red-400">{submitError}</p>}
          {uploadProgress && <p className="text-[10px] text-primary/70 tracking-widest animate-pulse">{uploadProgress}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="self-start border border-primary/50 px-8 py-2.5 text-[9px] tracking-[0.3em] uppercase
              text-foreground/70 hover:bg-primary/10 hover:border-primary transition-all disabled:opacity-40"
          >
            {submitting ? 'Adding…' : 'Add Video'}
          </button>
        </form>
      </div>

      {/* Video list */}
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
              <div key={v.id} className="flex items-center gap-4 border border-white/8 p-4 group">
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground font-medium truncate">{v.title}</p>
                  <div className="flex items-center gap-3 mt-0.5">
                    <span className="text-[8px] tracking-[0.35em] uppercase text-primary/60">
                      {VIDEO_TYPE_LABELS[v.videoType as VideoType] ?? v.videoType}
                    </span>
                    {v.youtubeId && (
                      <span className="text-[8px] tracking-[0.3em] text-foreground/30">YouTube: {v.youtubeId}</span>
                    )}
                    {v.storagePath && (
                      <span className="text-[8px] tracking-[0.3em] text-foreground/30">Uploaded file</span>
                    )}
                  </div>
                </div>
                {v.youtubeId && (
                  <a
                    href={`https://youtube.com/watch?v=${v.youtubeId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[8px] tracking-widest uppercase text-foreground/25 hover:text-primary transition-colors shrink-0"
                  >
                    View ↗
                  </a>
                )}
                {v.storagePath && (
                  <a
                    href={storageUrl(v.storagePath)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[8px] tracking-widest uppercase text-foreground/25 hover:text-primary transition-colors shrink-0"
                  >
                    View ↗
                  </a>
                )}
                <button
                  onClick={() => handleDelete(v.id)}
                  className="text-[8px] tracking-widest uppercase text-red-400/40 hover:text-red-400 transition-colors shrink-0"
                >
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
      setImages(data ?? []);
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
    setSubmitting(true);
    setSubmitError('');
    setUploadProgress('Uploading image…');

    try {
      const storagePath = await uploadFile(imageFile);
      setUploadProgress('Saving…');
      await createImage({ storagePath, altText: altText.trim() || null });
      setImageFile(null);
      setAltText('');
      if (fileInputRef.current) fileInputRef.current.value = '';
      setUploadProgress('');
      await load();
    } catch (e: unknown) {
      setSubmitError(e instanceof Error ? e.message : 'Failed to add image');
    } finally {
      setSubmitting(false);
      setUploadProgress('');
    }
  }

  async function handleDelete(id: number) {
    if (!confirm('Delete this image?')) return;
    try {
      await deleteImage(id);
      await load();
    } catch (e: unknown) {
      alert(e instanceof Error ? e.message : 'Delete failed');
    }
  }

  return (
    <div className="flex flex-col gap-10">
      {/* Upload form */}
      <div className="border border-white/8 p-6">
        <p className="text-[9px] tracking-[0.4em] uppercase text-primary/60 mb-6">Upload Image</p>
        <form onSubmit={handleAddImage} className="flex flex-col gap-4">
          <div>
            <label className="admin-label">Image File</label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={(e: ChangeEvent<HTMLInputElement>) => setImageFile(e.target.files?.[0] ?? null)}
              className="block w-full text-sm text-foreground/50 file:mr-4 file:py-2 file:px-4
                file:border file:border-white/20 file:text-[9px] file:tracking-widest file:uppercase
                file:bg-transparent file:text-foreground/60 file:cursor-pointer
                hover:file:border-primary/50 hover:file:text-primary transition-colors"
            />
            {imageFile && (
              <p className="mt-1.5 text-[10px] text-foreground/40">{imageFile.name} — {(imageFile.size / 1024 / 1024).toFixed(2)} MB</p>
            )}
          </div>
          <div>
            <label className="admin-label">Alt Text (optional)</label>
            <input
              value={altText}
              onChange={(e) => setAltText(e.target.value)}
              className="admin-input"
              placeholder="Describe the image"
            />
          </div>

          {submitError && <p className="text-[10px] text-red-400">{submitError}</p>}
          {uploadProgress && <p className="text-[10px] text-primary/70 tracking-widest animate-pulse">{uploadProgress}</p>}

          <button
            type="submit"
            disabled={submitting || !imageFile}
            className="self-start border border-primary/50 px-8 py-2.5 text-[9px] tracking-[0.3em] uppercase
              text-foreground/70 hover:bg-primary/10 hover:border-primary transition-all disabled:opacity-40"
          >
            {submitting ? 'Uploading…' : 'Upload Image'}
          </button>
        </form>
      </div>

      {/* Image grid */}
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
              <div key={img.id} className="relative group aspect-square bg-foreground/5 overflow-hidden">
                <img
                  src={storageUrl(img.storagePath)}
                  alt={img.altText ?? ''}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button
                    onClick={() => handleDelete(img.id)}
                    className="text-[8px] tracking-[0.3em] uppercase text-red-400 border border-red-400/50 px-3 py-1.5 hover:bg-red-400/10 transition-colors"
                  >
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
