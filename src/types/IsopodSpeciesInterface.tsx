// types/taxonomy.ts

/**
 * Taxonomische Ränge
 */
export type TaxonomicRank =
    | 'kingdom'
    | 'phylum'
    | 'subphylum'
    | 'class'
    | 'subclass'
    | 'order'
    | 'suborder'
    | 'infraorder'
    | 'superfamily'
    | 'family'
    | 'subfamily'
    | 'tribe'
    | 'subtribe'
    | 'genus'
    | 'subgenus'
    | 'section'
    | 'species'
    | 'subspecies'
    | 'variety'
    | 'form';

/**
 * Taxonomische Klassifikation
 */
export interface Taxonomy {
    kingdom?: string;
    phylum?: string;
    subphylum?: string;
    class?: string;
    subclass?: string;
    superorder?: string;
    order?: string;
    suborder?: string;
    infraorder?: string;
    superfamily?: string;
    family?: string;
    subfamily?: string;
    tribe?: string;
    subtribe?: string;
    genus?: string;
    subgenus?: string;
    section?: string;
    species?: string;
    subspecies?: string;
    variety?: string;
    form?: string;
}

/**
 * Scrutinizer (Person die die Daten überprüft hat)
 */
export interface Scrutinizer {
    name: string;
    id?: string;
    date?: string; // ISO date string
}

/**
 * Metadata
 */
export interface TaxonMetadata {
    scrutinizer?: Scrutinizer;
    accordingToID?: string;
    referenceID?: string;
}

/**
 * Temporaler Bereich (für fossile Arten)
 */
export interface TemporalRange {
    start?: string;
    end?: string;
}

/**
 * Geografische Verteilung
 */
export interface Distribution {
    area: string;
    areaID?: string;
    mrgid?: string; // Marine Regions Geographic Identifier
    gazetteer?: string;
    status?: string;
    referenceID?: string;
    pageReferenceID?: string;
    remarks?: string;
}

/**
 * Common Names (Volksnamen)
 */
export interface CommonNames {
    [languageCode: string]: string | string[];
    // z.B.:
    // en?: string;
    // de?: string;
    // jpn?: string;
}

/**
 * Haupt-Taxon Interface
 */
export interface IsopodSpecies {
    // IDs
    aphiaID: string;
    parentAphiaID?: string;
    lsid?: string;
    parentLSID?: string;

    // Taxonomische Information
    rank: TaxonomicRank;
    scientificName: string;
    taxonomy: Taxonomy;

    authority?: string,
    status?: string,

    // Metadata
    metadata?: TaxonMetadata;

    // Status
    provisional?: boolean;
    extinct?: boolean;

    // Umgebung
    environment?: 'marine' | 'brackish' | 'freshwater' | 'terrestrial' | string ;

    // Temporaler Bereich
    temporalRange?: TemporalRange;

    // Links und Referenzen
    link?: string;

    // Zusätzliche Informationen
    remarks?: string;
    namePhrase?: string;

    // Geografische Verteilung
    distribution?: Distribution[];

    // Common Names
    commonNames?: CommonNames;

    bugguideData?: BugGuideData


}

type BugGuideData = {
    bugguide_id: number;
    bugguide_link: string;
    bugguide_taxa_name: string;
    bugguide_links: {
        [key: string]: string;
    };
    bugguide_saotc: string[];
    bugguide_identification: string[];
    bugguide_range: string[];
    bugguide_habitat: string[];
    bugguide_food: string[];
};

/**
 * Komplette Taxonomie-Datenstruktur
 */
export interface TaxonomyData {
    metadata?: {
        source?: string;
        totalTaxa?: number;
        rootTaxa?: number;
        generatedAt?: string;
        ranks?: Record<TaxonomicRank, number>;
    };
    taxa: IsopodSpecies[];
}

/**
 * Type Guards
 */
export function isTaxon(obj: any): obj is IsopodSpecies {
    return (
        typeof obj === 'object' &&
        obj !== null &&
        typeof obj.aphiaID === 'string' &&
        typeof obj.scientificName === 'string' &&
        typeof obj.rank === 'string'
    );
}

export function hasDistribution(taxon: IsopodSpecies): taxon is IsopodSpecies & { distribution: Distribution[] } {
    return Array.isArray(taxon.distribution) && taxon.distribution.length > 0;
}

export function hasCommonNames(taxon: IsopodSpecies): taxon is IsopodSpecies & { commonNames: CommonNames } {
    return taxon.commonNames !== undefined && Object.keys(taxon.commonNames).length > 0;
}


export interface TaxonomyData {
    species: IsopodSpecies[]
}