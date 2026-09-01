export default function Loading() {
  return (
    <main
      className="route-loading shell"
      aria-busy="true"
      aria-label="Loading content"
    >
      <div className="loading-line loading-kicker" />
      <div className="loading-line loading-title" />
      <div className="loading-line loading-dek" />
      <div className="loading-grid">
        <div className="loading-line loading-panel" />
        <div className="loading-list">
          <div className="loading-line" />
          <div className="loading-line" />
          <div className="loading-line" />
        </div>
      </div>
    </main>
  );
}
