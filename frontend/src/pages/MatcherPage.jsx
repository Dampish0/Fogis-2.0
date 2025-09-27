import MatchCard from "../components/MatchDetails/MatchCard";
import MatchDetails from "../components/MatchDetails/MatchDetails";
import NavBar from "../components/NavBar";



function MatcherPage() {
    return (
        <div>
            <NavBar />
            <div className="page">
                
                <MatchCard title="Kommande matcher"/>
                <MatchDetails />
            </div>

        </div>
    );
}




export default MatcherPage;