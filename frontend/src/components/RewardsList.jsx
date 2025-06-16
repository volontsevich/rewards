import {useEffect, useState} from "react";
import {getRewards, redeem} from "../api";

export default function RewardsList({onRedeem}) {
    const [rewards, setRewards] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        getRewards().then(setRewards);
    }, []);

    async function handleRedeem(id) {
        setLoading(true);
        setError("");
        try {
            await redeem(id);
            onRedeem();
        } catch (e) {
            setError(e.error || "Unable to redeem");
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            {error && <p style={{color: "red"}}>{error}</p>}
            <div style={styles.grid}>
                {rewards.map(r => (
                    <div key={r.id} style={styles.card}>
                        <h3>{r.name}</h3>
                        <p>{r.description}</p>
                        <p><strong>{r.points_cost} pts</strong></p>
                        <button
                            disabled={!r["in_stock"] || loading}
                            onClick={() => handleRedeem(r.id)}
                        >
                            {r["in_stock"] ? "Redeem" : "Out of stock"}
                        </button>
                    </div>
                ))}
            </div>
        </>
    );
}

const styles = {
    grid: {display: "grid", gap: "1rem", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))"},
    card: {border: "1px solid #eee", padding: "1rem", borderRadius: "6px"}
};
