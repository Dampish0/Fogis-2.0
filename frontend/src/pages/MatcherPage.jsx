import Container from '@mui/material/Container'
import React from 'react'
import NavBar from '../components/NavBar/NavBar.jsx'
import ListMUI from '../components/ListMUI.jsx'
import { Divider } from '@mui/material'

const MatcherPage = () => {
  return (
    <div style={{
        backgroundColor: "#101411", paddingBottom:"50%"}}>
        <NavBar/>
        <div  style={{
            display: 'flex'
            }}>

            <div  style={{
                backgroundColor: "#101411",
                //boxShadow: "inset 0 0 0 0.5px #909692",
                marginLeft:"0.3%",
                marginTop:"0.25%",
                flex:1,
                width:"25%",
                maxWidth:"25%",
                borderRadius: "10px",
                }}
                className='text-2xl'>

                <h1 style={{color:"#e4ebe6", 
                            textAlign: "center",
                            marginTop: "1%",
                            }}>
                    tidigare matcher
                </h1>
                <Divider style={{backgroundColor:"#e4ebe6", height: "1px", maxWidth: "70%", marginTop:"15px", marginBottom: "1px", margin: "0 auto"}}></Divider>
                <ListMUI txt={"Serie"}/>
            </div>
            <div  style={{

                backgroundColor: "#101411",
                marginLeft:"0.3%",
                marginTop:"0.25%",
                maxWidth:"25%",
                flex: 2,
                width:"15%",
                borderRadius: "10px",
                }}
                className='text-2xl'>

                <h1 style={{color:"#e4ebe6",
                            textAlign: "center",
                            marginTop: "1%"}}>
                    kommande Matcher
                </h1>
                <Divider style={{backgroundColor:"#e4ebe6", height: "1px", maxWidth: "70%", marginTop:"15px", marginBottom: "1px", margin: "0 auto"}}></Divider>

                <ListMUI txt={"Match"}/>
            </div>
            <div  style={{

                backgroundColor: "#101411",
                marginLeft:"0.3%",
                marginTop:"0.25%",
                maxWidth:"50%",
                flex: 3,
                width:"50%",
                borderRadius: "10px",
                marginRight:"0.3%",
                }}
                className='text-2xl'>

                <h1 style={{color:"#e4ebe6",
                            textAlign: "center",
                            marginTop: "1%"
                            }}>
                    Detaljer
                </h1>
                                <Divider style={{backgroundColor:"#e4ebe6", height: "1px", maxWidth: "20%", marginTop:"10px", marginBottom: "1px", margin: "0 auto"}}></Divider>

            </div>
        </div>
    </div>
  )
}

export default MatcherPage