import { Flex, Button, Text } from '@chakra-ui/react'
import { signOut } from 'firebase/auth'
import React from 'react'
import { signOutAPI } from '../apis/AuthAPI';

function Navbar({router, showMap, mapId}) {
    
    const displayMapID = () =>{
        return mapId.slice(0,3)+"-"+mapId.slice(3,6)+"-"+mapId.slice(6,9);
    }
    const signOut = async ()=>{
        signOutAPI();
        router.push("/signin");
    }
  return (
    <Flex width="100%" mr={1} justify="space-between">
        {showMap && <Text>Map ID: {displayMapID()}</Text>}
        <Button onClick={signOut}>Sign Out</Button>
    </Flex>
  )
}

export default Navbar