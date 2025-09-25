import MatchCard from "../components/MatchDetails/MatchCard";
import MatchDetails from "../components/MatchDetails/MatchDetails";
import NavBar from "../components/NavBar";



function MatcherPage() {
    return (
        <div>
            <NavBar />
            <div className="matcher" style={{ display: "flex", gap: "10%" }}>
                <MatchCard title="Tidigare matcher" />
                <MatchCard title="Kommande matcher" />
                <MatchDetails />
            </div>

        </div>
    );
}




export default MatcherPage;