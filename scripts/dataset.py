import csv
import json
import re
from typing import List, Dict, Optional


def parse_tsv_to_json(input_file: str, output_file: str):
    """
    Konvertiert WoRMS TSV-Datei in JSON

    Args:
        input_file: Pfad zur .txt/.tsv Datei
        output_file: Pfad zur Output JSON-Datei
    """
    taxa = []

    print(f"📖 Lese Datei: {input_file}")

    with open(input_file, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f, delimiter='\t')

        for row in reader:
            if row.get('provisional') == '0' and row.get('extinct') == '0':
                # Leere Strings in None umwandeln
                taxon = {
                    'aphiaID':  re.sub(r'[^0-9]', '', (row.get('ID'))),
                    'parentAphiaID': re.sub(r'[^0-9]', '', (row.get('parentID'))),
                    #'lsid': row.get('ID') or None,
                    #'parentLSID': row.get('parentID') or None,
                }

                taxonomy = {}
                taxonomic_ranks = [
                    'kingdom', 'phylum', 'subphylum', 'class', 'subclass',
                    'order', 'suborder', 'superfamily', 'family', 'subfamily',
                    'tribe', 'subtribe', 'genus', 'subgenus', 'section', 'species'
                ]
                for rank in taxonomic_ranks:
                    value = row.get(rank, '').strip()
                    if value:
                        taxonomy[rank] = value
                current_rank = None
                for rank in reversed(taxonomic_ranks):
                    if taxonomy.get(rank):
                        current_rank = rank
                        break

                taxon['rank'] = current_rank
                taxon['scientificName'] = taxonomy.get(current_rank) if current_rank else None
                taxon['taxonomy'] = taxonomy

                metadata = {}
                if row.get('scrutinizer'):
                    metadata['scrutinizer'] = {
                        'name': row.get('scrutinizer'),
                        'id': row.get('scrutinizerID') or None,
                        'date': row.get('scrutinizerDate') or None
                    }

                if row.get('accordingToID'):
                    metadata['accordingToID'] = row.get('accordingToID')

                if row.get('referenceID'):
                    metadata['referenceID'] = row.get('referenceID')

                if metadata:
                    taxon['metadata'] = metadata

                # Boolean-Felder konvertieren
                #taxon['provisional'] = row.get('provisional') == '1'
                #taxon['extinct'] = row.get('extinct') == '1'

                if row.get('environment'):
                    taxon['environment'] = row.get('environment').strip()

                # Temporaler Bereich
                if row.get('temporalRangeStart') or row.get('temporalRangeEnd'):
                    taxon['temporalRange'] = {
                        'start': row.get('temporalRangeStart') or None,
                        'end': row.get('temporalRangeEnd') or None
                    }

                if row.get('link'):
                    taxon['link'] = row.get('link').strip()

                if row.get('remarks'):
                    taxon['remarks'] = row.get('remarks').strip()

                if row.get('namePhrase'):
                    taxon['namePhrase'] = row.get('namePhrase').strip()


                taxa.append(taxon)

    print(f"✅ {len(taxa)} Taxa eingelesen")

    # Als JSON speichern
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(taxa, f, ensure_ascii=False, indent=2)

    print(f"💾 Gespeichert: {output_file}")

# Verwendung
parse_tsv_to_json('Taxon.txt', 'taxa_flat.json')