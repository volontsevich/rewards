import {useEffect, useState} from "react";
import {getBalance} from "../api";
import EarnForm from "./EarnForm";

export default function BalanceHeader({refreshToken, bump}) {
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        getBalance().then(({points_balance}) => setBalance(points_balance));
    }, [refreshToken]);

    return (
        <header style={styles.header}>
            <h2 style={{marginRight: "1rem"}}>🪙 Points: {balance}</h2>
            <EarnForm onDone={bump}/>
        </header>
    );
}

const styles = {
    header: {
        display: "flex",
        alignItems: "center",
        padding: "1rem",
        background: "#fafafa",
        borderBottom: "1px solid #ddd"
    }
};
