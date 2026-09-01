import Link from 'next/link';
export default function NotFound() {
  return (
    <main className="not-found shell">
      <p className="eyebrow">404 / Signal lost</p>
      <h1>This page slipped out of view.</h1>
      <p>The story may have moved, or the address may be incorrect.</p>
      <Link href="/">Return to the homepage</Link>
    </main>
  );
}
