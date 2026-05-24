// routes/taxonomyRoutes.tsx


import taxonomyData from '../data/taxa_data.json';
import {RouteObject} from "react-router-dom";
import {IsopodSpecies} from "../types/IsopodSpeciesInterface.tsx";
import {TaxonPageLayout} from "../components/taxonomy/TaxonPageLayout.tsx";
import React from "react";
import {stringToSlug} from "../utils/stringToSlug.ts";
import {buildSimplePath} from "../components/taxonomy/buildSimplePath.ts";

/**
 * Rekursiv Routen für gesamten taxonomischen Baum generieren
 */
function generateRoutesFromNode(
    node: IsopodSpecies,
): RouteObject {
    //console.log("generateRoutesFromNode")

    const scientificName = node.scientificName || '';
    const rank = node.rank?.toLowerCase() || '';
   // console.log("scientificName: " + scientificName);
    {/*if (!scientificName) return route;*/}

    const slug: string = buildSimplePath(node);

    //console.log("Slug: " + slug);
    // Route für diesen Knoten erstellen
   return ({
        path: slug,
        element: <TaxonPageLayout node={node} />,
        handle: {
            scientificName,
            rank,
            aphiaID: node.aphiaID,
            breadcrumb: scientificName
        }
    });
}

export function generateTaxonomyRoutes(): RouteObject[] {
   // console.log("generateTaxonomyRoutes")
        const allRoutes :  RouteObject[] = [];
    (taxonomyData as unknown as IsopodSpecies[]).forEach(taxon =>{
        allRoutes.push(generateRoutesFromNode(taxon));
    })
    return allRoutes;
}


