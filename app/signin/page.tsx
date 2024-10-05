'use client'
import { useState } from "react";
import React from "react";

interface EmailRes{
    valid:boolean,message:string,status:string
};

function Page(){
    const [showOTPBox,setShowOTPBox] = useState(false);
    const emailVerify = async ()=>{
        const input = (document.getElementById('email') as  HTMLInputElement);
        //verify email if it is in valid email form
        let req = new Request(`http://localhost:8000/validate/`,{method:'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body:JSON.stringify({email:input.value})
            });
        
        const res:EmailRes = await (await fetch(req)).json()
        .then((val:string)=>{
            return ((val as unknown)as EmailRes);
        });
        console.log(res);
        if(res.valid){
            //create 6 digit otp, and use uuid for the user
            let otp = (Math.random()*1000000).toFixed(0).toString();
            if(otp.length<6){
                otp = "0".repeat(6-otp.length)+otp;
            }
            console.log(otp);
            //send otp to user email
            setShowOTPBox(true);

        }
        else{
            alert("Please enter a valid email");
            setShowOTPBox(false);
        }
        
    }

    return (
        <div>
            <div>
                <h2>Enter email id to create a room:</h2>
                <input placeholder="youremail@example.com" name="email" id="email"/>
                <button  onClick={emailVerify}>Submit</button>
            </div>
            <div hidden={showOTPBox}>
                <h2>Enter verification code sent to your email:</h2>
                <input name="code" />
                <button>Create room!</button>
            </div>
        </div>
    );
}

export default Page;