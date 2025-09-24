import MatchDetail from '../components/MatchDetail'
import { Box, Container } from '@mui/material';


function MatcherPage() {
    return(
        <div style={{background: "#102542", minHeight: "100vh"}}>
            <MatchDetail />
            <Container fixed>
                <Box sx={{ display: "flex", gap: 3 }}>
                    <Box>
                        <div>Tidigare Matcher</div>
                        <Box className="TidigareMatcher" 
                            sx={{   
                                bgcolor: "#f5f5f5", 
                                height: "500px",
                                width: "250px", 
                            }} 
                        />
                    </Box>
                    <Box>
                        <div>Kommande Matcher</div>
                        <Box className="TidigareMatcher" 
                            sx={{   
                                bgcolor: "#f5f5f5", 
                                height: "500px",
                                width: "250px",
                                
                            }} 
                        />
                    </Box>
                </Box>
            </Container>
        </div>
    );
}


export default MatcherPage