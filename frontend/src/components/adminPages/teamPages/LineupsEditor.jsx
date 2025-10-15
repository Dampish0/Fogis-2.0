import { Avatar, Button, Typography } from '@mui/material';
import React from 'react'
import { useEffect } from 'react';
import { useState, useRef } from 'react';
import { useDrop, useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';

const LineupsEditor = (props) => {
    const {homeTeamLineup = [], oneTeam=false, ignoreExtras = false, onAddOrMovePlayer, onRemovePlayer } = props;
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const [draggedPlayer, setDraggedPlayer] = useState(null); // {player, coordinates}  


    const [allPlayers, setAllPlayers] = useState([]); // {player, coordinate, isGoalKeeper} 

    const playerCardTable = (isHomeTeam, playerNumber, playerName, position) => {
        return (
            <div 
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
        const lastName = (playerName || "").split(" ").slice(1).join(" "    );
        return (
            <div style={{position: 'absolute', left: `${coordinates.x * 100}%`, top: `${coordinates.y * 100}%`, transform: 'translate(-50%, -50%)', textAlign: 'center', fontSize: '10px', fontWeight: 'bold', textShadow: '1px 1px 2px black',
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

    const pitchWrapperRef = useRef(null);

    const GK_ZONE_WIDTH = 0.10;
    const GK_ZONE_HEIGHT = 0.15; 
    const GK_POS_LEFT  = { x: 0.055, y: 0.50 };
    const GK_POS_RIGHT = { x: 0.945, y: 0.50 };

    const computeCoordinates = (client) => {
        if (!pitchWrapperRef.current) return null;
        const rect = pitchWrapperRef.current.getBoundingClientRect();
        const rawX = (client.x - rect.left) / rect.width;
        const rawY = (client.y - rect.top) / rect.height;
        let x = Math.min(1, Math.max(0, rawX));
        let y = Math.min(1, Math.max(0, rawY));
        let gk = false;
        if (x <= GK_ZONE_WIDTH && ((y) >= (0.5 - GK_ZONE_HEIGHT) && (y) <= (0.5 + GK_ZONE_HEIGHT))) { x = GK_POS_LEFT.x; y = GK_POS_LEFT.y; gk = true; }
        return { x, y, gk };
    };

    const [, drop] = useDrop(() => ({
    accept: 'PLAYER',
    hover: (item, monitor) => { 
        const client = monitor.getClientOffset();
        if (!client) return;
        const coords = computeCoordinates(client);
        if (!coords) return; 
        if (
            !draggedPlayer ||
            draggedPlayer.player !== item.player ||
            draggedPlayer.existing !== item.existing ||
            draggedPlayer.coordinates.x !== coords.x ||
            draggedPlayer.coordinates.y !== coords.y ||
            draggedPlayer.coordinates.gk !== coords.gk
        ) {
            setDraggedPlayer({ player: item.player, coordinates: coords, existing: item.existing });
        } 
        if (!item.existing && onAddOrMovePlayer) {
            onAddOrMovePlayer(item.player, coords);
        }
    },
    drop: (item, monitor) => {
        //setIsDragging(false); 
        setDraggedPlayer(null);
        if (!onAddOrMovePlayer) return;
        const client = monitor.getClientOffset();
        if (!client) return;
        const coords = computeCoordinates(client);
        if (!coords) return;
        onAddOrMovePlayer(item.player, coords);
        setSelectedPlayer({ 
            name: item.player.name, 
            coordinates: coords, 
            position: item.player.preferedPosition || item.player.position 
        });
    },
    leave: () => {
        //setIsDragging(false);
        setDraggedPlayer(null);
    }
}), [onAddOrMovePlayer, draggedPlayer]);


    const DraggablePlayerToken = ({ isHomeTeam, playerNumber, playerName, position, coordinates, player }) => {
        const GK = coordinates.gk;
        const [{ isDragging }, drag] = useDrag(() => ({
            type: 'PLAYER',
            item: () => {
                //setIsDragging(true);
                return { player, existing: true };
            },
            collect: monitor => ({
                isDragging: monitor.isDragging()
            }), 

            end: (item, monitor) => {
                setDraggedPlayer(null);
                if (!onAddOrMovePlayer) return;
                const client = monitor.getClientOffset();
                if (!client || !pitchWrapperRef.current) return;
                const rect = pitchWrapperRef.current.getBoundingClientRect();
                const outside = client.x < rect.left || client.x > rect.right || client.y < rect.top || client.y > rect.bottom;
                if (outside) {
                    onRemovePlayer && onRemovePlayer(item.player);
                    return;
                } 
                const coords = computeCoordinates(client);
                if (coords) onAddOrMovePlayer(item.player, coords);
                
            }

            
        }), [player, onAddOrMovePlayer, onRemovePlayer]);
        const lastName = (playerName || "").split(" ").slice(1).join(" ");
        const ringColor = isHomeTeam ? '#1E90FF' : '#FF4500';
        const borderStyle = coordinates.gk ? `3px solid ${ringColor}` : `2px solid ${ringColor}`;
        return (
            <div
                ref={drag}
                style={{
                    position: 'absolute',
                    left: `${coordinates.x * 100}%`,
                    top: `${coordinates.y * 100}%`,
                    transform: 'translate(-50%, -50%)',
                    textAlign: 'center',
                    fontSize: '10px',
                    fontWeight: 'bold',
                    textShadow: '1px 1px 2px black',
                    justifyContent: 'center',
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    cursor: 'grab',
                    zIndex: 2,
                    opacity: isDragging ? 0.5 : 1
                }}
                onMouseOver={() => setSelectedPlayer({ name: playerName, coordinates, position })}
                onMouseOut={() => setSelectedPlayer(null)}
            >
                <div style={{ color: 'white', textTransform: 'capitalize' }}>{lastName}</div>
                <div style={{
                    width: coordinates.gk ? '26px' : '20px',
                    height: coordinates.gk ? '26px' : '20px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(0,0,0,0.55)',
                    boxShadow: coordinates.gk ? '0 0 8px rgba(255,255,255,0.7)' : '0 4px 8px rgba(0,0,0,0.3)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    border: borderStyle,
                    marginTop: '2px',
                    transition: 'all 0.15s ease'
                }}>
                    <Typography style={{ color: 'white', fontSize: coordinates.gk ? '13px' : '12px', fontWeight: 'bold' }}>{playerNumber}</Typography>
                </div>
            </div>
        );
    };
 
    const GhostPlayerToken = ({ player, coordinates, existing }) => {
        if (!player || !coordinates) return null;
        const lastName = (player?.name || "").split(" ").slice(1).join(" ");
        const ringColor = '#1E90FF';
        const borderStyle = coordinates.gk ? `3px solid ${ringColor}` : `2px solid ${ringColor}`;
        return (
            <div
                style={{
                    position: 'absolute',
                    left: `${coordinates.x * 100}%`,
                    top: `${coordinates.y * 100}%`,
                    transform: 'translate(-50%, -50%)',
                    textAlign: 'center',
                    fontSize: '10px',
                    fontWeight: 'bold',
                    textShadow: '1px 1px 2px black',
                    justifyContent: 'center',
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    pointerEvents: 'none',
                    zIndex: 10,
                    opacity: 0.7
                }}
            >
                <div style={{ color: 'white', textTransform: 'capitalize' }}>{lastName}</div>
                <div style={{
                    width: coordinates.gk ? '26px' : '20px',
                    height: coordinates.gk ? '26px' : '20px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(0,0,0,0.55)',
                    boxShadow: coordinates.gk ? '0 0 8px rgba(255,255,255,0.7)' : '0 4px 8px rgba(0,0,0,0.3)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    border: borderStyle,
                    marginTop: '2px',
                    transition: 'all 0.15s ease'
                }}>
                    <Typography style={{ color: 'white', fontSize: coordinates.gk ? '13px' : '12px', fontWeight: 'bold' }}>{player.number}</Typography>
                </div>
            </div>
        );
    };

    useEffect(() => {
        if (pitchWrapperRef.current) {
            drop(pitchWrapperRef.current);
        }
    }, [drop, pitchWrapperRef]);

    return (
    <div> 
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '40vh' }}>
            <div
                ref={pitchWrapperRef }
                style={{
                    position: 'relative',
                    width: oneTeam ? 'clamp(300px, 40vw, 1200px)' : 'clamp(300px, 40vw, 1000px)',
                    aspectRatio: '4/2',
                }}
            > 
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, #228B22 60%, #006400 100%)',
                    borderRadius: '10px',
                    boxShadow: '0 24px 48px rgba(0,0,0,0.5)',
                    transform: 'perspective(800px) rotateX(25deg)',
                    border: '4px solid #fff',
                    overflow: 'hidden'
                }}>
                    {/* midfield line*/}
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
                            key={i+100000}
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


                {homeTeamLineup.map((lineup, index) => {
                        const { player, position, coordinates } = lineup;
                        return (
                            <DraggablePlayerToken
                            key={(player._id || player.id || index)}
                            isHomeTeam={true}
                            playerNumber={player.number}
                            playerName={player.name}
                            position={position}
                            coordinates={coordinates}
                            player={player}
                            />
                        );
                    })
                }

                {draggedPlayer && draggedPlayer.coordinates &&
                    <GhostPlayerToken player={draggedPlayer.player} coordinates={draggedPlayer.coordinates} existing={draggedPlayer.existing} />
                }

                {!draggedPlayer && selectedPlayer &&
                  ( <div style={{
                        position: 'absolute',
                        pointerEvents: 'none',
                        top: `${selectedPlayer.coordinates.y * 100}%`,
                        left: `${selectedPlayer.coordinates.x * 100}%`,
                        transform: 'translate(-50%, -50%)',
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        color: 'white',
                        padding: '5px 10px',
                        borderRadius: '5px',
                        fontSize: '12px',
                        zIndex: 5
                    }}>
                        {selectedPlayer.name} - {selectedPlayer.position}
                    </div> )
                }
 
                </div>
            </div>
        </div>
    </div>
  )
}


export default LineupsEditor;