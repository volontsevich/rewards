import { useEffect } from "react";

export default function Toast({ msg, onDone }) {
  useEffect(() => {
    if (!msg) return;
    const id = setTimeout(onDone, 2500);
    return () => clearTimeout(id);
  }, [msg]);
  if (!msg) return null;
  return <div style={styles}>{msg}</div>;
}
const styles = {
  position: "fixed",
  bottom: 20,
  right: 20,
  background: "#333",
  color: "#fff",
  padding: "8px 16px",
  borderRadius: 6,
};
