'use client'
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import {GoogleLogin, LoginAPI } from "../apis/AuthAPI";
import { Box, Button, Center, Flex, Heading, Input, Link, Stack, StackSeparator, Text } from "@chakra-ui/react";

export default function Page() {
  const router = useRouter();

  const [useEmail, setUseEmail] = useState(false);
  const [credentials, setCredentials] = useState({email:"",password:""});

  const Login = async()=>{
      try{
          let res = await LoginAPI(credentials.email, credentials.password);
          console.log(res);
          //localStorage.setItem("user",JSON.stringify({name:res.name,}))
          router.push("/");
      }
      catch(error){
          console.log(error);
      }
  }
  const googleSignIn = async()=>{
      try{
          let res = await GoogleLogin();
          console.log(res);
          //localStorage.setItem("user",JSON.stringify({name:res}))
          router.push("/");
      }
      catch(error){
          console.log(error);
      }
  }

  return (
    <Center m="4" p="4" height="100vh" width="100%" >
        <Box>
            <Heading size="5xl" mb="10">Login to MapRoom</Heading> 
        {!useEmail && 
                <Stack gap="4"> 
                    <Button onClick={()=>setUseEmail(true)}>Continue with email</Button>
                    <Button onClick={googleSignIn}>Continue with Google</Button>
                </Stack>}
                { useEmail && 
                <Stack separator={<StackSeparator />} gap="3">
                    <Button onClick={()=>setUseEmail(false)}>Go back</Button>
                    <Input onChange={(event)=>{ setCredentials({...credentials, email: event.target.value});}}
                     placeholder="username@example.com"/>
                    <Input onChange={(event)=>{ setCredentials({...credentials, password: event.target.value});}} 
                    type="password" />
                    <Button type="submit" onClick={Login}>Submit</Button>
                </Stack>
                }
                <Text mt="5" ><Link href="/signin" colorPalette="teal">New User? Click here to sign in</Link></Text>
        </Box>
    
    </Center>
    
  )
}