import React from "react";

export function SocialRow(){
    return(
        <div className="center">
            <div className="row align-items-center">
                <div className="col-2 center"><a href="https://www.reddit.com/user/hurly_burly_pegasus/?rdt=59692"  property="url"><i className="fa fa-reddit"/></a></div>
                <div className="col-2 center"><a href="mailto:lilisisopods@proton.me" property="url"><i className="fa fa-envelope"/></a></div>
                {/* <div className="col-2 center"><a href="#" className="fa fa-github" property="email"></a></div> */}
            </div>
        </div>
        
    )
}