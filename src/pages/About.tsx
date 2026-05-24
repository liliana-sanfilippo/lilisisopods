import React from "react";
import { MovingWebsite } from "../components/UnderConstruction";
import { Calendar } from "../components/Calendar/Calendar";

export function About() {

    return (
      <>
        <div className="row">
         <MovingWebsite/>
        </div>
        <div className="row" style={{marginTop: "20px"}}>
          <h2>Follow my project</h2>
          <Calendar/>
          </div>
        
      </>
    );
  }
  