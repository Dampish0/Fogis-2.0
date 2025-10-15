import { Avatar, Typography } from '@mui/material';
import React from 'react'
import { useState } from 'react';

const LineupsCard = (props) => {
    const { homeTeam = [], awayTeam = [], homeTeamLineup = [], oneTeam=false, awayTeamLineup = [], ignoreExtras = false } = props;

    const [selectedPlayer, setSelectedPlayer] = useState(null);

    const testDataReplacementHome = [
        { number: 1, name: "Steven Hawking", position: "CB"},
        { number: 2, name: "De Brúyne", position: "MV"},
        { number: 3, name: "Mikeu Lawk", position: "HY "},
    ]
    const testDataReplacementAway = [
        { number: 4, name: "Dixie rect", position: "FWD"},
        { number: 5, name: "Mourinho", position: "CM"},
        { number: 6, name: "Nikola Tesla", position: "COM"},
        { number: 7, name: "Dembélé", position: "VB"},
    ]

    const testDataUnavailableHome = [
        { number: 8, name: "Diddy", position: "FWD"},
        { number: 9, name: "Tom Cruise", position: "CM"},
    ]

    const testDataUnavailableAway = [
        { number: 10, name: "King charles", position: "HB"},
    ]

    const playerCardTable = (isHomeTeam, playerNumber, playerName, position) => {
        return (
            <div 
            key={playerName + playerNumber + Math.random()*5050501}
            style={{
                width: '105%',
                aspectRatio: '7/1',
                backgroundColor: 'rgba(0, 0 ,0 , 0.5)',
                marginTop: '0px',
                marginBottom: '20px',
                borderRadius: '20px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            }}
            >   
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: '10px 20px' }}>
                    <Avatar style={{marginLeft: '-10px', borderRadius: '14px', backgroundColor: "rgba(50,50,50,0.9)" }}>
                    <Typography variant="caption" style={{ color: 'white', }}>{playerNumber}</Typography>
                </Avatar>
                    <Typography variant="body1" style={{ color: 'white', fontWeight: 'bold' }}>{playerName}</Typography>
                    <Typography variant="body2" style={{ color: 'white', fontStyle: 'italic' }}>{position}</Typography>
               </div>
               
            </div>
        );
    }

    const playerCard = (isHomeTeam, playerNumber, playerName, position, coordinates) => {
        const lastName = playerName.split(" ").slice(1).join(" ");
        return (
            <div key={playerName + playerNumber + Math.random()*5050501} style={{position: 'absolute', left: `${coordinates.x * 100}%`, top: `${coordinates.y * 100}%`, transform: 'translate(-50%, -50%)', textAlign: 'center', fontSize: '10px', fontWeight: 'bold', textShadow: '1px 1px 2px black',
                justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column'
            
            
            }}
            
            onMouseOver={(e) => {
                setSelectedPlayer({ name: playerName, coordinates: coordinates, position: position });
            }}
            
            onMouseOut={(e) => {
                setSelectedPlayer(null);
            }}
            
            
            >

                <div style={{ color: 'white', textTransform: 'capitalize' }}>{lastName}</div>
                <div style={{width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'rgb(0, 0, 0, 0.5)',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)', display: 'flex', justifyContent: 'center', alignItems: 'center',
                    border: isHomeTeam ? '2px solid #1E90FF' : '2px solid #FF4500',
                    marginTop: '2px',


                 }}>
                    <Typography style={{ color: 'white', fontSize: '12px', fontWeight: 'bold', textShadow: '1px 1px 2px black' }}>{playerNumber}</Typography>

                </div>





            </div>
        );
    }

    const specificWidthStyle = {
        width: oneTeam ? 'clamp(300px, 40vw, 1200px)' : 'clamp(300px, 40vw, 1000px)',
    };

  return (
    <div>

        {/* center grass*/}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '40vh' }}>
        {/* soccer grass*/}
            <div style={{
                    background: 'linear-gradient(180deg, #228B22 60%, #006400 100%)',
                    ...specificWidthStyle,
                    // height: '120%',
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

            {!oneTeam &&
                awayTeamLineup.map((lineup, index) => {
                        const { player, position, coordinates } = lineup;
                        return playerCard(false, player.number, player.name, position, coordinates);
                    })
            
            }

            { selectedPlayer &&
             ( <div style={{ position: 'absolute', pointerEvents: 'none',
                 top: `${selectedPlayer.coordinates.y * 100}%`, left: `${selectedPlayer.coordinates.x * 100}%`, transform: 'translate(-50%, -50%)', backgroundColor: 'rgba(0, 0, 0, 0.7)', color: 'white', padding: '5px 10px', borderRadius: '5px', fontSize: '12px' }}>
                {selectedPlayer.name} - {selectedPlayer.position}
            </div> )
            }













            </div>
            











        </div>
        {!ignoreExtras && <>
        <div style={{backgroundColor: "rgb(0, 0, 0, 0.5)", marginTop: "5%", marginBottom: "5%", 
            maxWidth: "85%", marginLeft: "auto", marginRight: "auto", borderRadius: "10px", boxShadow: '0 24px 48px rgba(0,0,0,0.5)'
        }}>
            <Typography variant="h6" style={{ textAlign: 'center', marginTop: '10px', color: 'white' }}>ERSÄTTARE</Typography>
        </div>

        {/* 2 x ERSÄTTARE */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-around', width: '85%', maxWidth: '800px' }}>
                <div style={{ width: '45%',  }}>
                    {testDataReplacementHome.map((player, index) => (
                        playerCardTable(true, player.number, player.name, player.position)
                    ))}
                </div>
                <div style={{ width: '45%' }}>
                    {testDataReplacementAway.map((player, index) => (
                        playerCardTable(false, player.number, player.name, player.position)
                    ))}
                </div>
            </div>

        </div>


        <div style={{backgroundColor: "rgb(0, 0, 0, 0.5)", marginTop: "5%", marginBottom: "5%", 
            maxWidth: "85%", marginLeft: "auto", marginRight: "auto", borderRadius: "10px", boxShadow: '0 24px 48px rgba(0,0,0,0.5)'
        }}>
            <Typography variant="h6" style={{ textAlign: 'center', marginTop: '10px', color: 'white' }}>OTILLGÄNGLIGA SPELARE</Typography>
        </div>
        {/* 2 x ERSÄTTARE */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-around', width: '85%', maxWidth: '800px' }}>
                <div style={{ width: '45%' }}>
                    {testDataUnavailableHome.map((player, index) => (
                        playerCardTable(true, player.number, player.name, player.position)
                    ))}
                </div>
                <div style={{ width: '45%' }}>
                    {testDataUnavailableAway.map((player, index) => (
                        playerCardTable(false, player.number, player.name, player.position)
                    ))}
                </div>
            </div>

        </div>

        </>}
    </div>
  )
}


export default LineupsCard