import { TextField } from "@mui/material";

function SearchBar() {
    return (
        <div style={{ display: "flex", justifyContent: "left", margin: "20px 0", paddingLeft: "20px" }}>
            <div className="search-bar">
                <TextField
                    type="text"
                    placeholder="Find a match..."
                    fullWidth
                    style={{ minWidth: "400%" }}
                />
            </div>
        </div>
    );
}

export default SearchBar;