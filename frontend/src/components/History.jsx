import { useEffect, useState } from "react";
import { getHistory } from "../api";

export default function History({ refreshToken }) {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    getHistory().then(setRows);
  }, [refreshToken]);

  if (!rows.length) return <p>No redemptions yet.</p>;

  return (
    <table style={styles.table}>
      <thead>
        <tr>
          <th>Date</th>
          <th>Reward</th>
          <th>Points</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.id}>
            <td>{new Date(r.redeemed_at).toLocaleString()}</td>
            <td>{r.reward}</td>
            <td>{r.points_cost}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const styles = {
  table: { width: "100%", borderCollapse: "collapse" },
};
