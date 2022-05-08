
import TypeIt from "typeit-react";
import style from './TypeIt.module.css'
import { useEffect } from "react";

export default function TypeItCompoment() {
  useEffect(()=>{
    return ()=>{
      console.log('TypeIt has been destroy');
    }
  },[])
  return (
    <div className={style.message}>
      <TypeIt
        getBeforeInit={(instance) => {
          instance
            .type("Have a good fun")
            .pause(450)
            .delete(3)
            .pause(450)
            .type("time!!");

          // Remember to return it!
          return instance;
        }}
        // getAfterInit={(instance) => {
        //   instance.unfreeze();
        //   return instance;
        // }}
        options={{ waitUntilVisible: true }}
        element={"h1"}
      >
        Welcome to my blog!<br></br>
      </TypeIt>
    </div>
  );
};
