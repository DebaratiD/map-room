import { createUserWithEmailAndPassword, getRedirectResult, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signInWithRedirect, signOut } from "firebase/auth";
import { auth } from "../firebase-config";

export const SignInAPI = (email, password) =>{
    try{
        let response = createUserWithEmailAndPassword(auth, email, password);
        return response;
    }
    catch(err){
        return err;
    }

}
export const LoginAPI = (email, password) =>{
    try{
        let response = signInWithEmailAndPassword(auth, email, password);
        return response;
    }
    catch(err){
        return err;
    }

}

export const GoogleLogin = ()=>{
    try{
        let provider = new GoogleAuthProvider();
        let response = signInWithPopup(auth, provider);
        return response;
    }
    catch(err){
        return err;
    }
}
export const getGoogleUserDetails = () =>{
    try{
        let res = getRedirectResult(auth);
        res.then(res=>{return res;});
    }
    catch(error){
        return error;
    }
}
export const signOutAPI = () =>{
    try{
        let response = signOut(auth);
        return response;
    }
    catch(err){
        return err;
    }
}

export function onAuthStateOther(cb) {
    return onAuthStateChanged(auth, cb);
}

export function getUserDetails(setCurrentUser){
    const userEmail = JSON.parse(localStorage.getItem("user"))?.email;
    return userEmail;
}