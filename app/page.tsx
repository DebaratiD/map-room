'use client'
import { onAuthStateChanged, User } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "./firebase-config";
import { useRouter } from "next/navigation";
import { signOutAPI } from "./apis/AuthAPI";
import MyMapComponent from "./components/MyMap";
import { socket } from "./apis/Socket";
import { Box, Button, Flex, Heading, Input, Stack, StackSeparator, Text } from "@chakra-ui/react";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";

export default function Page(){
    const router = useRouter();
    const [showOpt, setShowOpt] = useState(false);
    const [mapId, setMapID] = useState("");
    const [join, setJoin] = useState(false);
    const [showMap, setShowMap] = useState(false);
    const [loading, setLoading] = useState(false);
    const [locatioN, setLocation] = useState({lat:0, long:0});


    onAuthStateChanged(auth,(res:User)=>{
        if(res){
            const user = {
                email: res.email,
                name:res.displayName
            }
            localStorage.setItem("user", JSON.stringify(user));
            setLoading(false);
            setShowOpt(true);
        }
        else{
            setShowOpt(false);
            router.push("/signin");
        }
    })
   
    const currentPosition = async ()=>{
        
        await navigator.geolocation.getCurrentPosition((position)=>{
            setLocation({...locatioN,lat:position.coords.latitude,long:position.coords.longitude});
        },
        (error)=>{
            console.log("Could not access location: ",error);
        });

    }
    
    const createRoom = async ()=>{
        let name = JSON.parse(localStorage.getItem('user'))?.name;

        await currentPosition();
        
        setShowOpt(false);
        socket.emit("create_map",{name:name, lat:locatioN.lat, long:locatioN.long, userId: socket.id});
        socket.on("map_created",(res)=>{
          
            setMapID(res?.map);
            localStorage.setItem("userID",res.user.id);
            setShowOpt(false);
            setShowMap(true);
        });
    }
    const joinRoom = async (mapID:String)=> {

       // mapID = mapID.replace("-","");
        let name = JSON.parse(localStorage.getItem('user'))?.name;

        await currentPosition();

        socket.emit("join_map", {mapId:mapID, name: name, userid:socket.id, lat:locatioN.lat, long:locatioN.long});
        socket.on("map_joined",(res)=>{
            setShowMap(true);
        })
    }
   
    const leaveMap = ()=>{
        setShowMap(false);
        setShowOpt(true);
        socket.emit("leave_map",{mapId: mapId, userId:localStorage.getItem("userID")});
    }

    return (
        <>
            {loading && <Loader />}
            {!loading && 
            <Box p={4} m={4}>
                {(showOpt || showMap) && 
                <Navbar router={router} mapId={mapId} showMap={showMap}/>
                }
                <Flex justify="center" align="center" width="100%" height="20vh">
                    <Heading size="5xl">Welcome to MapRoom!</Heading> 
                </Flex>
                
                {!showMap && 
                <Box m="auto" width="50%" p="5" borderWidth="1px" borderColor="border.disabled" >
                    {!join && 
                    <Stack separator={<StackSeparator />}>
                        <Button onClick={createRoom}>Create a map</Button>
                        <Button onClick={()=>{setJoin(true);}}>Join a map</Button>
                    </Stack>}

                    {join && 
                    <Stack gap="4">
                        <Input placeholder="Enter Map ID:" type="text" onChange={(event)=>{setMapID(event.target.value)}}/>
                        <Stack direction="row">
                            <Button width="50%" onClick={()=>{setJoin(false); leaveMap();}}>Cancel</Button>
                            <Button width="50%" disabled={!mapId.length} onClick={()=>joinRoom(mapId)}>Join map</Button>
                        </Stack>
                    </Stack>}
                </Box>}

                {showMap && 
                <Box>
                    <Flex width="100%" justify="end">
                        <Button onClick={leaveMap}>x</Button>
                    </Flex>
                    
                    <Box width="90%" p="4" m="4" height="80vh">
                        <MyMapComponent mapid={mapId} lat={locatioN.lat} long={locatioN.long}/>
                    </Box>
                </Box>
                }
            </Box>
            }
        </>
    );
}
