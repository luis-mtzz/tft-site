import { useState } from "react";

export default function Home() {
    const [gameName, setGameName] = useState("");
    const [tag, setTag] = useState("");
    const [region, setRegion] = useState("americas");
    const [summonerInfo, setSummonerInfo] = useState(null);
    const [error, setError] = useState("");

    const handleSearch = async () => {
        console.log("button clicked");
        if (!gameName || !tag) {
            setError("Please enter your username and tag.");
            return;
        }

        setError("");
        setSummonerInfo(null);

        try {
            const response = await fetch(
                `http://localhost:8000/api/v1/tft/summoner?gameName=${gameName}&tag=${tag}&region=${region}`,
            );
            const data = await response.json();
            if (data.success) {
                setSummonerInfo(data.message);
            } else {
                setError(data.message || "An error occured.");
            }
        } catch (err) {
            setError("Error occured when fetching data.");
        }
    };

    return (
        <div className="container">
            <h1 className="title">Search Summoner</h1>
            <div className="form">
                <input
                    type="text"
                    placeholder="IGN"
                    value={gameName}
                    onChange={(e) => setGameName(e.target.value)}
                    className="input"
                />
                <input
                    type="text"
                    placeholder="Tag"
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    className="input"
                />
                <select
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    className="select"
                >
                    <option value="AMERICAS">Americas</option>
                    <option value="EUROPE">Europe</option>
                    <option value="ASIA">Asia</option>
                </select>
                <button onClick={handleSearch} className="button">
                    Find Summoner
                </button>
            </div>
            {error && <p className="error">{error}</p>}
            {summonerInfo && (
                <div className="results">
                    <h2>Summoner Information</h2>
                    <ul>
                        <li>
                            {" "}
                            IGN: {gameName}#{tag}
                        </li>
                        <li> Tier: {summonerInfo.tier}</li>
                        <li> Rank: {summonerInfo.rank}</li>
                        <li> LP: {summonerInfo.leaguePoints}</li>
                        <li> Wins: {summonerInfo.wins}</li>
                        <li> Loses: {summonerInfo.losses}</li>
                    </ul>
                </div>
            )}
        </div>
    );
}
