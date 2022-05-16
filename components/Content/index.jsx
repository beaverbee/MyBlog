import { useEffect } from "react";

export default function Content(props){
    useEffect(()=>{
        console.log('Content has been loaded');
        console.log(props);
    })
    return <h1>Something Else</h1>;
}