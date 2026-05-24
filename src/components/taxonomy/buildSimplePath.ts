import {IsopodSpecies} from "../../types/IsopodSpeciesInterface.tsx";
import {stringToSlug} from "../../utils/stringToSlug.ts";

export function buildSimplePath(node: IsopodSpecies): string {
    const rank = node.rank?.toLowerCase();

    switch(rank) {
        case 'species':
            // genus/species
            return `${stringToSlug(node.taxonomy.genus)}/${stringToSlug(node.taxonomy.species)}`;
        case 'genus':
            // genus
            return stringToSlug(node.taxonomy.genus);
        case 'family':
            // family
            return stringToSlug(node.taxonomy.family);
        default:
            // Fallback: scientificName
            return stringToSlug(node.scientificName);
    }
}