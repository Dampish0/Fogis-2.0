import { Typography } from '@mui/material';
import React from 'react'

const LineupsCard = (props) => {
    const { homeTeam, awayTeam, homeTeamLineup, awayTeamLineup } = props;

    const playerCard = (isHomeTeam, playerNumber, playerName, position, coordinates) => {
        console.log("playerCard", playerName, position, coordinates);
        return (
            <div style={{position: 'absolute', left: `${coordinates.x * 100}%`, top: `${coordinates.y * 100}%`, transform: 'translate(-50%, -50%)', textAlign: 'center', fontSize: '10px', fontWeight: 'bold', textShadow: '1px 1px 2px black',
                justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column'
            }}>

                <div style={{ color: 'white' }}>{playerName}</div>
                <div style={{width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'rgb(0, 0, 0, 0.5)' }}>
                    <Typography style={{ color: 'white', fontSize: '12px', fontWeight: 'bold', textShadow: '1px 1px 2px black' }}>{playerNumber}</Typography>

                </div>





            </div>
        );
    }



  return (
    <div>

        {/* center grass*/}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '40vh' }}>
        {/* soccer grass*/}
            <div style={{
                    background: 'linear-gradient(180deg, #228B22 60%, #006400 100%)',
                    height: '110%',
                    aspectRatio: "4/2",
                    borderRadius: '10px',
                    position: 'relative',
                    boxShadow: '0 24px 48px rgba(0,0,0,0.5)',
                    transform: 'perspective(800px) rotateX(25deg)',
                    border: '4px solid #fff', 
                }}>{/* midfield line*/}
                <div style={{ position: 'absolute', top: '0%', left: '50%', width: '2px', height: '100%', backgroundColor: 'white', transform: 'translateX(-50%)' }}></div>
                {/* center circle*/}
                <div style={{ position: 'absolute', top: '50%', left: '50%', width: '12.5%', height: '25%', borderRadius: '50%', border: '2px solid white', transform: 'translate(-50%, -50%)' }}></div>
                <div style={{ position: 'absolute', top: '50%', left: '50%', width: '1%', height: '2%', borderRadius: '50%', backgroundColor: 'white', transform: 'translate(-50%, -50%)' }}></div>
                <div style={{ position: 'absolute', top: '50%', left: '13%', width: '1%', height: '2%', borderRadius: '50%', backgroundColor: 'white', transform: 'translate(-50%, -50%)' }}></div>
                <div style={{ position: 'absolute', top: '50%', left: '87%', width: '1%', height: '2%', borderRadius: '50%', backgroundColor: 'white', transform: 'translate(-50%, -50%)' }}></div>

                {/* Home team box*/}
                <div style={{ position: 'absolute', top: '50%', left: '7.5%', width: '15%', height: '45%', borderRadius: '0%', border: '2px solid white', transform: 'translate(-50%, -50%)' }}></div>
                <div style={{ position: 'absolute', top: '50%', left: '3.75%', width: '7.5%', height: '22.5%', borderRadius: '0%', border: '2px solid white', transform: 'translate(-50%, -50%)' }}></div>
                <div
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '15%',
                    width: '12%',
                    height: '24%',
                    borderTop: '2px solid white',
                    borderRadius: '50% 50% 0 0',
                    transform: 'translate(-50%, -50%) rotate(90deg)',
                    background: 'none'
                }}
                ></div>
                {[...Array(5)].map((_, i) => (
                    <div
                        key={i}
                        style={{
                            position: 'absolute',
                            top: `${i * 20}%`,
                            left: 0,
                            width: '100%',
                            height: '10%',
                            background: 'rgba(255,255,255,0.07)',
                            pointerEvents: 'none'
                        }}
                    />
                ))}
                {/* away team box*/}
                <div style={{ position: 'absolute', top: '50%', left: '92.5%', width: '15%', height: '45%', borderRadius: '0%', border: '2px solid white', transform: 'translate(-50%, -50%) rotate(180deg)' }}></div>
                <div style={{ position: 'absolute', top: '50%', left: '96.25%', width: '7.5%', height: '22.5%', borderRadius: '0%', border: '2px solid white', transform: 'translate(-50%, -50%) rotate(180deg)' }}></div>
                <div
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '85%',
                    width: '12%',
                    height: '24%',
                    borderTop: '2px solid white',
                    borderRadius: '50% 50% 0 0',
                    transform: 'translate(-50%, -50%) rotate(-90deg)',
                    background: 'none'
                }}></div>


                    {/* corners */}
                    <div
                    style={{
                        position: 'absolute',
                        top: '97%',
                        left: '1.5%',
                        width: '3%',
                        height: '6%',
                        borderTop: '2px solid white',
                        borderRight: '2px solid white',
                        borderRadius: '0 100% 0 0',
                        transform: 'translate(-50%, -50%)',
                        background: 'none'
                    }}
                    ></div>
                    <div
                    style={{
                        position: 'absolute',
                        top: '3%',
                        left: '1.5%',
                        width: '3%',
                        height: '6%',
                        borderTop: '2px solid white',
                        borderRight: '2px solid white',
                        borderRadius: '0 100% 0 0',
                        transform: 'translate(-50%, -50%) rotate(90deg',
                        background: 'none'
                    }}
                    ></div>
                    <div
                    style={{
                        position: 'absolute',
                        top: '97%',
                        left: '98.5%',
                        width: '3%',
                        height: '6%',
                        borderTop: '2px solid white',
                        borderRight: '2px solid white',
                        borderRadius: '0 100% 0 0',
                        transform: 'translate(-50%, -50%) rotate(-90deg)',
                        background: 'none'
                    }}
                    ></div>
                    <div
                    style={{
                        position: 'absolute',
                        top: '97%',
                        left: '1.5%',
                        width: '3%',
                        height: '6%',
                        borderTop: '2px solid white',
                        borderRight: '2px solid white',
                        borderRadius: '0 100% 0 0',
                        transform: 'translate(-50%, -50%)',
                        background: 'none'
                    }}
                    ></div>
                                        <div
                    style={{
                        position: 'absolute',
                        top: '3%',
                        left: '98.5%',
                        width: '3%',
                        height: '6%',
                        borderTop: '2px solid white',
                        borderRight: '2px solid white',
                        borderRadius: '0 100% 0 0',
                        transform: 'translate(-50%, -50%) rotate(180deg)',
                        background: 'none'
                    }}
                    ></div>


            {
                homeTeamLineup.map((lineup, index) => {
                    const { player, position, coordinates } = lineup;
                    return playerCard(true, player.number, player.name, position, coordinates);
                })
            }
            {
                awayTeamLineup.map((lineup, index) => {
                        const { player, position, coordinates } = lineup;
                        return playerCard(true, player.number, player.name, position, coordinates);
                    })
            
            }

            </div>












        </div>

        <div style={{backgroundColor: "rgb(0, 0, 0, 0.5)", marginTop: "5%", marginBottom: "5%", 
            maxWidth: "85%", marginLeft: "auto", marginRight: "auto", borderRadius: "10px", boxShadow: '0 24px 48px rgba(0,0,0,0.5)'
        }}>
            <Typography variant="h6" style={{ textAlign: 'center', marginTop: '10px', color: 'white' }}>Ersättare</Typography>
        </div>

    </div>
  )
}


export default LineupsCard