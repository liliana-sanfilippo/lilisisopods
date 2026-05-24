import React from "react";
import { Link } from 'react-router-dom';
import {IsopodSpecies} from "../../types/IsopodSpeciesInterface.tsx";
import {buildSimplePath} from "./buildSimplePath.ts";
import taxonomyData from '../../data/taxa_data.json';


function getAllSpecies(): IsopodSpecies[] {
    return (taxonomyData as unknown as IsopodSpecies[]).filter(
        taxon => taxon.rank?.toLowerCase() === 'species'
    );
}

/**
 * Tabelle aller Spezies
 */
export function SpeciesTable() {
    const allSpecies = getAllSpecies();

    return (
        <table className="species-table">
            <thead>
            <tr>
                <th>Species</th>
                <th>Aphia ID</th>
            </tr>
            </thead>
            <tbody>
            {allSpecies.map(species => (
                <tr key={species.aphiaID}>
                    <td>
                        <Link to={`/taxonomy/${buildSimplePath(species)}`}>
                            {species.taxonomy.genus} {species.taxonomy.species}
                        </Link>
                    </td>
                    <td>{species.aphiaID}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}

/**
 * Tabelle aller Spezies einer bestimmten Art
 */
export function SpeciesTableByGenus({ genusName }: { genusName: string }) {
    const speciesByGenus = getAllSpecies().filter(
        species => species.taxonomy.genus === genusName
    );



    return (
        <table className="species-table">
            <thead>
            <tr>
                <th>Art ({genusName})</th>
                <th>Aphia ID</th>
            </tr>
            </thead>
            <tbody>
            {speciesByGenus.length > 0 ? (
                speciesByGenus.map(species => (
                    <tr key={species.aphiaID}>
                        <td>
                            <Link to={buildSimplePath(species)}>
                                {species.scientificName}
                            </Link>
                        </td>
                        <td>{species.aphiaID}</td>
                    </tr>
                ))
            ) : (
                <tr>
                    <td colSpan={2}>Keine Spezies gefunden</td>
                </tr>
            )}
            </tbody>
        </table>
    );
}

