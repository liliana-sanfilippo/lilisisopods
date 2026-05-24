import requests
from bs4 import BeautifulSoup
import json

def get_gbif_data(aphia_id):
    url = f"https://api.gbif.org/v1/species?sourceId=worms:{aphia_id}"
    response = requests.get(url)
    return response.json()



def get_bugguide_data(bugguide_id):
    url = f"https://bugguide.net/node/view/{bugguide_id}"
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')

    # Extrahiere die benötigten Daten
    # z.B. Taxonomie, Namen, etc.
    main_part = soup.find('td', class_='col2')
    sections = main_part.find_all('div', class_='bgpage-section')
    internet_references = {}
    info = {}
    for section in sections:
        info["bugguide_id"] = bugguide_id
        info["bugguide_link"] = url
        print(section.find('h2').getText())
        if 'Internet References' in section.find('h2').getText():
            bullets = section.find_all('div')
            for point in bullets:
                link =  point.find('a')
                internet_references[link.getText()] = link.get('href')
                print(link.get('href'))
        elif 'Range' in section.find('h2').getText():
            texts = section.find_all('div')
            liste = []
            for text in texts:
                liste.append(text.getText())
            info["bugguide_range"] = liste
            bullets = section.find_all('a')
            print(bullets)
            for point in bullets:
                print(point.getText())
                internet_references[point.getText()] = point.get('href')
        elif 'Habitat' in section.find('h2').getText():
            texts = section.find_all('div')
            liste = []
            for text in texts:
                liste.append(text.getText())
                info["bugguide_habitat"] = liste
        elif 'Identification' in section.find('h2').getText():
            texts = section.find_all('div')
            liste = []
            for text in texts:
                liste.append(text.getText())
                info["bugguide_identification"] = liste
        elif 'Food' in section.find('h2').getText():
            texts = section.find_all('div')
            liste = []
            for text in texts:
                liste.append(text.getText())
                info["bugguide_food"] = liste
        elif 'Synonyms' in section.find('h2').getText():
            texts = section.find_all('div')
            liste = []
            for text in texts:
                liste.append(text.getText())
                info["bugguide_saotc"] = liste

        info['bugguide_taxa_name'] = (main_part.find('h1')).find('i').getText()

        info["bugguide_links"] = internet_references
    with open("bugguide.json", 'w', encoding='utf-8') as f:
        json.dump(info, f, ensure_ascii=False, indent=2)
    return soup

get_bugguide_data(55221)
mappings = get_gbif_data(264643)
print(mappings)