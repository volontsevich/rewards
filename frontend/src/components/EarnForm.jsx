import { useState } from "react";
import { earn } from "../api";

export default function EarnForm({ onDone }) {
  const [pts, setPts] = useState(100);
  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    try {
      await earn(Number(pts));
      onDone();
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} style={{ display: "inline-flex", gap: 4 }}>
      <input
        type="number"
        min="1"
        max="10000"
        value={pts}
        disabled={busy}
        onChange={(e) => setPts(e.target.value)}
        style={{ width: 80 }}
      />
      <button disabled={busy}>Add points</button>
    </form>
  );
}
