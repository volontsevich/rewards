import { useEffect, useState } from "react";
import { getRewards, redeem } from "../api";
import Toast from "./Toast";

export default function RewardsList({ onRedeem }) {
  const [rewards, setRewards] = useState([]);
  const [busyId, setBusyId] = useState(null);
  const [toast, setToast] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    getRewards().then(setRewards);
  }, []);

  async function handleRedeem(id) {
    setBusyId(id);
    setError("");
    try {
      await redeem(id);
      setToast("Redeemed!");
      onRedeem();

      setRewards((rs) =>
        rs.map((r) =>
          r.id === id
            ? {
                ...r,
                in_stock: r.stock ? r.stock - 1 > 0 : true,
                stock: r.stock ? r.stock - 1 : null,
              }
            : r,
        ),
      );
    } catch (e) {
      setError(e.error || "Unable to redeem");
      setToast(error);
    } finally {
      setBusyId(null);
    }
  }

  return (
    <>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div style={styles.grid}>
        {rewards.map((r) => (
          <div key={r.id} style={styles.card}>
            <h3>{r.name}</h3>
            <p>{r.description}</p>
            <p>
              <strong>{r.points_cost} pts</strong>
            </p>

            {r.stock !== null && r.stock < 5 && (
              <small style={{ color: "orange" }}>Only {r.stock} left!</small>
            )}
            <br />

            <button
              disabled={!r.in_stock || busyId === r.id}
              onClick={() => handleRedeem(r.id)}
            >
              {busyId === r.id
                ? "Processing…"
                : r.in_stock
                  ? "Redeem"
                  : "Out of stock"}
            </button>
          </div>
        ))}
      </div>

      <Toast msg={toast} onDone={() => setToast("")} />
    </>
  );
}

const styles = {
  grid: {
    display: "grid",
    gap: "1rem",
    gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))",
  },
  card: { border: "1px solid #eee", padding: "1rem", borderRadius: "6px" },
};
