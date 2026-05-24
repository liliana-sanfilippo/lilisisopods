// components/TaxonPageLayout.tsx
import React from 'react';
import { TaxonomicNode } from '../../types/taxonomy.ts';
import {Distribution, IsopodSpecies} from "../../types/IsopodSpeciesInterface.tsx";
import HeaderBox from "../HeaderBox.tsx";

interface TaxonPageLayoutProps {
    node: IsopodSpecies;
}

export function TaxonPageLayout({ node }: TaxonPageLayoutProps) {
    if (!node) return <div>Taxon not found</div>;

    const scientificName = node.scientificName || 'Unknown';
    const rank = node.rank || 'Unknown';
    const authority = node.authority || '';
    const status = node.status || '';

    // Bestimme welche Komponente basierend auf Rank
    const renderContent = () => {
        switch (rank.toLowerCase()) {
            case 'species':
                return <SpeciesView node={node} />;
            case 'genus':
                return <GenusView node={node} />;
            case 'family':
                return <FamilyView node={node} />;
            default:
                return <DefaultTaxonView node={node} />;
        }
    };
    var pageTitle: string;
    switch (node.rank) {
        case "species":
            pageTitle = node.taxonomy.genus + " " + node.taxonomy.species
            break
        case "genus":
            pageTitle= node.taxonomy.genus
            break
        default:
            pageTitle= node.taxonomy.genus
    }
    return (
        <div className="taxon-page">

            <HeaderBox title={pageTitle}>
                <div className="rank-badge">{rank}</div>
                {authority && <p className="authority">{authority}</p>}
                {status && <span className={`status ${status.toLowerCase()}`}>{status}</span>}
            {
                node.taxonomy &&
                <table>
                    <thead>
                    {node.taxonomy.suborder && <th>Suborder</th>}
                    {node.taxonomy.infraorder && <th>infraorder</th>}
                    {node.taxonomy.superfamily && <th>superfamily</th>}
                    {node.taxonomy.family && <th>family</th>}
                    {node.taxonomy.subfamily && <th>subfamily</th>}
                    {node.taxonomy.tribe && <th>tribe</th>}
                    {node.taxonomy.subtribe && <th>subtribe</th>}
                    {node.taxonomy.genus && <th>genus</th>}
                    {node.taxonomy.subgenus && <th>subgenus</th>}
                    {node.taxonomy.section && <th>section</th>}
                    {node.taxonomy.species && <th>species</th>}
                    {node.taxonomy.subspecies && <th>subspecies</th>}
                    {node.taxonomy.variety && <th>variety</th>}
                    </thead>
                    <tbody>
                    {node.taxonomy.suborder && <td>{node.taxonomy.suborder}</td>}
                    {node.taxonomy.infraorder && <td>{node.taxonomy.infraorder}</td>}
                    {node.taxonomy.superfamily && <td>{node.taxonomy.superfamily}</td>}
                    {node.taxonomy.family && <td>{node.taxonomy.family}</td>}
                    {node.taxonomy.subfamily && <td>{node.taxonomy.subfamily}</td>}
                    {node.taxonomy.tribe && <td>{node.taxonomy.tribe}</td>}
                    {node.taxonomy.subtribe && <td>{node.taxonomy.subtribe}</td>}
                    {node.taxonomy.genus && <td>{node.taxonomy.genus}</td>}
                    {node.taxonomy.subgenus && <td>{node.taxonomy.subgenus}</td>}
                    {node.taxonomy.section && <td>{node.taxonomy.section}</td>}
                    {node.taxonomy.species && <td>{node.taxonomy.species}</td>}
                    {node.taxonomy.subspecies && <td>{node.taxonomy.subspecies}</td>}
                    {node.taxonomy.variety && <td>{node.taxonomy.variety}</td>}
                    </tbody>
                </table>
            }
            </HeaderBox>
            <section className="habitat">
                <h3>Habitat</h3>
                <p>Distribution: {node.distribution && node.distribution.flatMap((item: Distribution) =>
                    item.area
                ).join(', ')}</p>
                <p>Environment: {node.environment}</p>
            </section>
            {
                node.commonNames && (
                    <section>
                        <h3>Common names</h3>
                        <ul>
                            {Object.entries(node.commonNames).map(([key, value]) => (
                                <li key={key}>{key}: {value}</li>
                            ))}
                        </ul>
                    </section>
                )
            }
            <section>
                <h3>Links</h3>
                {node.link && <p>WoRMS: <a href={node.link}>{node.link}</a></p>}
            </section>
            {/* Taxonomische Navigation */}
            {/*node.children && node.children.length > 0 && (
                <section className="children-navigation">
                    <h2>Untergeordnete Taxa ({node.children.length})</h2>
                    <ul className="children-list">
                        {node.children.map(child => {
                            const childRecord = child.record || {};
                            const childName = childRecord.scientificname || '';
                            const childRank = childRecord.rank || '';
                            const slug = slugify(childName);

                            return (
                                <li key={child.aphiaID}>
                                    <Link to={slug}>
                                        <span className="child-rank">{childRank}</span>
                                        <span className="child-name">{childName}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </section>
            )*/}

            {/* Hauptinhalt   <div className="taxon-content">
                {renderContent()}
            </div> */}

        </div>
    );
}

// Spezifische Views für verschiedene Ranks
function SpeciesView({ node }: { node: IsopodSpecies }) {
    return (
        <div className="species-view">
            <section>
                <h3>Artinformationen</h3>
                {/* Detaillierte Species-Informationen */}
            </section>
        </div>
    );
}

function GenusView({ node }: { node: IsopodSpecies }) {
    return (
        <div className="genus-view">
            <section>
                <h3>Gattungsübersicht</h3>
                {/*
                     <p>Anzahl Arten: {node.children?.length || 0}</p>
                */}
            </section>
        </div>
    );
}

function FamilyView({ node }: { node: IsopodSpecies }) {
    return (
        <div className="family-view">
            <section>
                <h3>Familienübersicht</h3>
                {/*
                <p>Anzahl Gattungen: {node.children?.length || 0}</p>
                */}
            </section>
        </div>
    );
}

function DefaultTaxonView({ node }: { node: IsopodSpecies }) {
    return (
        <div className="default-taxon-view">
            <section>
                <h3>Taxonomische Informationen</h3>
                {/* Generische Informationen */}
            </section>
        </div>
    );
}