import {useEffect, useState} from "react";
import {getBalance} from "../api";

export default function BalanceHeader({refreshToken}) {
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        getBalance().then(({points_balance}) => setBalance(points_balance));
    }, [refreshToken]);

    return (
        <header style={styles.header}>
            <h2>🪙 Points: {balance}</h2>
        </header>
    );
}

const styles = {
    header: {padding: "1rem", background: "#fafafa", borderBottom: "1px solid #ddd"}
};
