'use client';

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main className="error-page shell">
      <p className="eyebrow">Connection interrupted</p>
      <h1>The newsroom signal dropped.</h1>
      <p>We couldn’t load this page. The rest of AILooma is still available.</p>
      <button type="button" onClick={reset}>
        Try again
      </button>
    </main>
  );
}
