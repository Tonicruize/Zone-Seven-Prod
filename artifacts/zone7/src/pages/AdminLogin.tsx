import { useState, FormEvent } from 'react';
import { login, setToken } from '../lib/adminApi';

interface Props {
  onLogin: () => void;
}

export function AdminLogin({ onLogin }: Props) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const token = await login(password);
      setToken(token);
      onLogin();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-10 text-center">
          <p className="text-[9px] tracking-[0.5em] text-primary/60 uppercase mb-3">Zone7</p>
          <h1 className="text-display text-2xl font-bold uppercase tracking-tight text-foreground">
            Admin Panel
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-[9px] tracking-[0.35em] uppercase text-foreground/40 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoFocus
              className="w-full bg-transparent border border-foreground/15 px-4 py-3
                text-sm text-foreground placeholder:text-foreground/25
                focus:outline-none focus:border-primary/60 transition-colors duration-200"
              placeholder="Enter admin password"
            />
          </div>

          {error && (
            <p className="text-[10px] tracking-wider text-red-400">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className="mt-2 border border-primary/60 text-foreground/80 py-3
              text-[9px] tracking-[0.3em] uppercase
              hover:bg-primary/10 hover:border-primary transition-all duration-300
              disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
