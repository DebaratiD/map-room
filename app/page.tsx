'use client'
import React from "react";
import { useRouter } from 'next/navigation';

export default function Page(){
    const router = useRouter();
    return (
    <div>
        <h1>Welcome to MapRoom!</h1>
        <div>
            <button onClick={() => router.push('/signin')}>Create a map</button>
            <button>Join a map</button>
        </div>
    </div>
    );
}