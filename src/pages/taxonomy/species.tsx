import React from "react";
import { MovingWebsite } from "../../components/UnderConstruction";
import {SpeciesTable} from "../../components/taxonomy/SpeciesTable.tsx";
    

export function taxonomyspecies() {
return ( 
 <>
<div className="row">
<div className="col"><MovingWebsite/>
    Warning: I am currently building automatically rendered species profiles, please be aware this is test data.
</div>
    <SpeciesTable/>
</div>
<div className="row"></div>
</>
);
}
