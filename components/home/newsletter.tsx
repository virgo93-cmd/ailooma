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
        <button type="button" disabled aria-describedby="newsletter-note">
          Newsletter coming soon
        </button>
        <small id="newsletter-note">
          Sign-up will open when our email service is ready.
        </small>
      </div>
    </section>
  );
}
