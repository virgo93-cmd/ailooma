import Link from 'next/link';

export function Newsletter() {
  return (
    <section className="newsletter" id="newsletter">
      <div>
        <span>THE SIGNAL</span>
        <h2>Make sense of what’s next.</h2>
      </div>
      <div>
        <p>
          A considered weekly briefing on AI, software, and the tools reshaping
          modern work.
        </p>
        <Link href="/contact-us" className="newsletter-cta">
          Contact the editorial team
        </Link>
        <small id="newsletter-note">
          Email updates will be introduced after the publication workflow is
          ready. In the meantime, contact us for editorial questions.
        </small>
      </div>
    </section>
  );
}
