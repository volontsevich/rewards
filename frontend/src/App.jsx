import {useState} from "react";
import {BrowserRouter, Routes, Route, NavLink} from "react-router-dom";
import BalanceHeader from "./components/BalanceHeader";
import RewardsList from "./components/RewardsList";
import History from "./components/History";

export default function App() {
    const [refreshToken, setRefreshToken] = useState(0);

    function bump() {
        setRefreshToken(x => x + 1);
    }

    return (
        <BrowserRouter>
            <BalanceHeader refreshToken={refreshToken}/>
            <nav style={styles.nav}>
                <NavLink to="/" end>Rewards</NavLink> |{" "}
                <NavLink to="/history">History</NavLink>
            </nav>
            <main style={{padding: "1rem"}}>
                <Routes>
                    <Route index element={<RewardsList onRedeem={bump}/>}/>
                    <Route path="history" element={<History refreshToken={refreshToken}/>}/>
                </Routes>
            </main>
        </BrowserRouter>
    );
}

const styles = {nav: {padding: "0.5rem 1rem", background: "#f0f0f0"}};
