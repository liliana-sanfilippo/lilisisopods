import "./App.css";
import "./App.scss";
import "./Calendar.css"
import "bootstrap/dist/css/bootstrap.min.css";
import {Navigate, Route, Routes} from "react-router-dom";
import {Footer} from "../components/Footer";
import {Navbar} from "../components/Navbar";
import {getPathMapping} from "../utils/getPathMapping";
import React, {useEffect} from "react";
import "../utils/highlight.js";
import {generateTaxonomyRoutes} from "./taxonomyRoutes.tsx";


const App = () => {

    const pathMapping = getPathMapping();
    const currentPath =
        window.location.pathname || "/";

    // Set Page Title
    const title =
        currentPath in pathMapping ? pathMapping[currentPath].title : "Not Found";

    useEffect(() => {
        document.title = `Lilisisopods`;
    }, [title]);

    const taxonomyRoutes = generateTaxonomyRoutes();
    console.log(taxonomyRoutes)
    return (
        <>
            {/* Navigation */}
            <Navbar/>

            {/* Header and PageContent */}
            {/* <Header title={title || ""} lead={lead || ""}/> */}
            {/* Page content */}
            <div className="container-fluid">
                <div className="row bg-b">
                    <div className="col-1 d-none d-lg-block">
                        {/* <!-- empty so far --> */}
                    </div>
                    {/* <div className="col-2 d-none d-lg-block">
                        <div className="sticky-top sidebar">
                           <Sidebar nums={navlist || [""]}></Sidebar>
                        </div>
                      </div> */}
                    <div className="col">
            <Routes>
                {Object.entries(pathMapping).map(
                    ([path, {component: Component}]) => (
                        <Route
                            key={path}
                            path={path}
                            element={
                                <>


                                                <Component/>



                                </>
                            }
                        />
                    ),
                )}

                {taxonomyRoutes.map(route => (
                    <Route
                        key={route.path}
                        path={`/taxonomy/${route.path}`}
                        element={route.element}
                        handle={route.handle}
                    />
                ))}


                <Route
                    path="/species/armadilidium-klugii/"
                    element={<Navigate to="/species/armadillidium/armadillidium-klugii"/>}
                />
                <Route
                    path="*"
                    element={<Navigate to="/"/>}
                />
            </Routes>
                    </div>
                    <div className="col-1 d-none d-lg-block">
                        {/* <!-- empty so far --> */}

                    </div>
                </div>
            </div>

            {/* End page content */}

            {/* Footer */}
            {/* MUST mention license AND have a link to team wiki's repository on gitlab.igem.org */}
            <Footer/>
        </>
    );
};

export default App;

