import React from "react";
import { WikiSelector} from "../../../components/Filter";
import HeaderBox from "../../../components/HeaderBox";
//die auswahl setzt sich noch ganz zurück, wenn man einen Filter zurück setzt...das muss geändert werden
export function Guides() {
  let len = guidelist.length; 
    return (
      <>
      <HeaderBox title="Identification guides and keys">
      <div className="row align-items-center">
        <div className="col" style={{paddingLeft: "40px"}}>
          <h2>As of today, you can search through <span className="bg-ad c-al heading-highlight">{len}</span> guides. </h2>
        </div>
        <div className="col-4" >
          <iframe title="[ Insert title here ]" aria-label="Interactive line chart" id="datawrapper-chart-4AVPd" src="https://datawrapper.dwcdn.net/4AVPd/1/" scrolling="no" frameBorder="0"  width="382" height="267" data-external="1"></iframe> 
        </div>
      </div>
      </HeaderBox>
      
        <div className="row">
          <div className="col">
          <WikiSelector></WikiSelector>
            <div id="nono" className="noshow">
                This combination returns no instances. 
            </div>
            <Gui liste={guidelist}/>
          </div>
        </div>
        <div className="row">
      
        </div>
      </>
    );
  }


  interface GuideFace {
    title: string; 
    tags: Array<string>; 
    author: string; 
    year?: string; 
    free: boolean; 
    url?: string; 
    type: string; /* Website, Book, Article, Thesis, Chapter */
    language: string; 
  }

  let guidelist = [
    {
        title: "Guide to Barrow Island",
        tags: ["Australia", "Oniscidea", "Armadillidae", "Ligiidae", "Maps", "Photos"], 
        author: "Simon Judd and Giulia Perina",
        year: "2013",
        free: true, 
        url: "https://museum.wa.gov.au/sites/default/files/10.%20Judd,%20Perina.pdf", 
        type: "Article", 
        language: "en"
    }, 
    {
        title: "CLAVE DE IDENTIFICACIÓN",
        tags: ["Chile", "Ligiidae", "SouthAmerica","Tylidae", "Styloniscidae", "Detonidae", "Philoscidae",
             "Oniscidea", "Armadillidae", "Bathytropidae", "Oniscidae", "Porcellionidae", 
                "Armadillidiidae"], 
        author: "Pérez-Schultheiss",
        free: true, 
        year: "2010",
        url: "http://www.bbchile.com/pdfs/2010/4/04-Perez-Schultheiss-b-2010-4.pdf", 
        type: "Article", 
        language: "es"
    },
    {
        title: "Clé des Isopodes terrestres du Nord de la France- 2021",
        tags: ["France", "Photos", "Oniscidea", "Europe","Armadillidiidae", "Ligiidae", "Detonidae", "Philoscidae",
             "Halophiloscidae", "Stenoniscidae", "Platyarthridae", "Armadillidae", "Oniscidae", 
            "Trachelipodidae", "Cylisticidae", "Agnaridae", "Porcellionidae"], 
        author: "Noël and Séchet",
        year: "2021",
        free: true, 
        url: "https://www.researchgate.net/publication/355145019_Cle_des_Isopodes_terrestres_du_Nord_de_la_France-_2021",
        type: "Book", 
        language: "fr"
    }, 
    {
        title: "Bestimmungsschlüssel Landasseln",
        tags: ["Germany", "Photos", "Armadillidiidae", "Oniscidea", "Ligiidae",  "Philoscidae"
             , "Trichoniscidae", "Platyarthridae","Europe",  "Oniscidae", 
            "Trachelipodidae", "Cylisticidae", "Porcellionidae"], 
        author: "Bodentier hoch 4",
        free: true, 
        url: "https://bodentierhochvier.de/erkennen/bestimmung-landasseln/",
        type: "Website", 
        language: "de"
    }, 
    {
      title: "Introduction to woodlice",
      tags: ["GreatBritain", "Ireland", "England", "Schottland", "Photos", "Armadillidiidae", "Oniscidea", "Ligiidae", "Philoscidae",
            "Trichoniscidae", "Platyarthridae", "Europe", "Oniscidae", 
          "Trachelipodidae", "Cylisticidae", "Porcellionidae"], 
      author: "Paul Richards",
      free: true, 
      year: "2011",
      url: "https://bmig.org.uk/sites/default/files/docs/Woodlice.pdf",
      type: "Website", 
      language: "en"
    }, 
    {
      title: "A key to the woodlice of Britain and Ireland",
      tags: ["GreatBritain", "Ireland", "England","Europe", "Schottland","Armadillidiidae", "Oniscidea", "Ligiidae", "Philoscidae",
            "Trichoniscidae", "Platyarthridae",  "Oniscidae", 
          "Trachelipodidae", "Cylisticidae", "Porcellionidae"], 
      author: "FSC AIDGAP",
      free: false, 
      year: "1991",
      type: "Book", 
      language: "en",
    }, 
    {
      title: "Woodlice: Linnean Society Synopsis (New Series) 49",
      tags: ["GreatBritain", "Ireland", "England", "Schottland", "Europe","Armadillidiidae", "Oniscidea", "Ligiidae", "Philoscidae",
            "Trichoniscidae", "Platyarthridae",  "Oniscidae", 
          "Trachelipodidae", "Cylisticidae", "Porcellionidae"], 
      author: "Linnean Society",
      free: false, 
      year: "1993",
      type: "Book", 
      language: "en",
    }, 
    {
      title: "An Introduction to the Identification of the Woodlice (Isopoda: Oniscidea) occurring in Berkshire, Buckinghamshire and Oxfordshire",
      tags: ["England", "Armadillidiidae", "Oniscidea", "Ligiidae","Europe", "Philoscidae",
            "Trichoniscidae", "Platyarthridae", "Oniscidae", 
          "Trachelipodidae", "Cylisticidae", "Porcellionidae"], 
      author: "Steve Gregory",
      free: true, 
      year: "2019",
      url: "https://anhso.org.uk/wp-content/uploads/Fritillary/frit8-woodlice.pdf",
      type: "Book", 
      language: "en",
    }, 
    {
      title: "British freshwater Crustacea Malacostraca: a key with ecological notes",
      tags: ["GreatBritain", "Ireland", "England", "Schottland","Europe", "Slater", "Ligiidae", "FreshwaterIsopods"], 
      author: "Gledhill, A.T.; Sutcliffe, D.W.; Williams, W.D.",
      free: false, 
      year: "1993",
      url: "https://www.fba.org.uk/shop/p/book-26",
      type: "Book", 
      language: "en",
    }, 
    {
      title: "British Marine Isopods: Keys and Notes for the Identification of the Species",
      tags: ["GreatBritain", "Ireland", "England", "Schottland", "Europe", "MarineIsopods", "Gnathiidae",
        "Idoteidae","Sphaeromatidae","Limnoriidae"], 
      author: "E. Naylor",
      free: true, 
      url: "https://isopods.nhm.org/pdfs/5121/5121.pdf",
      year: "1972",
      type: "Book", 
      language: "en",
    }, 
    {
      title: "Guide for Haploniscidae",
      tags: ["Asellota", "Iceland", "Janiroidea",  "MarineIsopods"], 
      author: "Kürzel et al.",
      free: true, 
      url: "https://www.frontiersin.org/articles/10.3389/fmars.2021.795196/full",
      year: "2021",
      type: "Article", 
      language: "en",
    }, 
    {
      title: "Guía de identificación de isópodos acuáticos continentales mexicanos",
      tags: ["Asellota", "Mexico", "SouthAmerica","FreshwaterIsopds",  "MarineIsopods", "Sphaeromatidae", "Asellidae"], 
      author: "Rocha-Ramírez et al.",
      free: true, 
      url: "https://www.researchgate.net/publication/310796268_Guia_de_identificacion_de_isopodos_acuaticos_continentales_mexicanos",
      year: "2012",
      type: "Article", 
      language: "es",
    }, 
    {
      title: "Terrestrial Isopods (Oniscidea) of North America north of Mexico ",
      tags: ["Photos",  "USA", "Canada", "NorthAmerica", "Oniscidea", "TerrestrialIsopds", 
        "Slater", "Tyliidae", "Styloniscidae", "Trichoniscidae","Alloniscidae","Armadillidae",
        "Armadillidiidae","Balloniscidae","Cylisticidae","Detonidae","Halophiloscidae","Oniscidae",
        "Philoscidae","Platyarthridae","Porcellionidae","Trachelipodidae","Ligiidae",
        "Armadillidiidae"], 
      author: "Inaturalist Users",
      free: true, 
      url: "https://www.inaturalist.org/guides/5808",
      type: "Website", 
      language: "en",
    }, 
    {
      title: "A new species of isopod (Isopoda: Flabellifera: Sphaeromatidae) from Cuba, with an identification key for the species of Paraimene",
      tags: ["Cuba", "Sphaeromatidae", "MarineIsopods" ],
      author: "Manuel Ortiz Touzet",
      free: true, 
      url: "https://www.inaturalist.org/guides/5808",
      type: "Website", 
      language: "en",
    }, 

    
    {
      title: "Identification key to the cavernicolous Oniscidea of Romania",
      tags: ["Romania", "CavernicolousIsopods", "TerrestrialIsopods", "Trichoniscidae", 
        "Buddelundiellidae", "Porcellionidae", "Armadillidiidae", "Cylisticidae", "Scleropactidae"],
      author: "Ionel Tabacaru and Andrei Giurginca",
      free: true, 
      year: "2012", 
      url: "https://www.researchgate.net/publication/321832824_Identification_key_to_the_cavernicolous_Oniscidea_of_Romania",
      type: "Article", 
      language: "en",
    },
    { 
      title: "Oniscidea of California",
      tags: ["California", "USA", "Ligiidae" , "Alloniscidae","Armadillidae", "Trichoniscidae", 
        "Armadillidiidae", "Detonidae","Halophiloscidae","Platyarthridae","Porcellionidae"],
      author: "Inaturalist Users",
      free: true, 
      url: "https://www.inaturalist.org/guides/1503",
      type: "Website", 
      language: "en",
    },
    {
      title: "Review and guide to the isopods (Crustacea, Isopoda) of littoral and sublittoral marine habitats in the Southern California Bight",
      tags: ["California", "USA", "Oniscidea", "Asellota", "Valvifera", "Sphaeromatidae", "Sphaeromatidea", 
        "Limnoriidae", "Cymothoida"
      ],
      author: "Timothy D. Stebbins and Regina Wetzer",
      free: true, 
      year: "2023", 
      url: "https://zookeys.pensoft.net/article/100390/list/8/",
      type: "Article", 
      language: "en",
    },
    {
      title: "Freshwater isopods (Asellidae) of North America",
      tags: ["USA", "FreshwaterIsopods", "Aselidae", "Asellota"],
      author: "W. D. William",
      free: true, 
      year: "1972", 
      url: "  https://archive.org/details/freshwaterisopod00will",
      type: "Book", 
      language: "en",
    },
    {
      title: "Key to Order Isopoda",
      tags: ["GeneralKey", "MarineIsopods", "TerrestrialIsopods"],
      author: "Heidee Leno and Hans Helmstetler",
      year: "2005",
      free: true, 
      url: "https://inverts.wallawalla.edu/Arthropoda/Crustacea/Malacostraca/Eumalacostraca/Peracarida/Isopoda/Isopoda_Key.html",
      type: "Website", 
      language: "en",
    }, 
    {
      title: "Key to the isopods of the Pacific coast of North America, with descriptions of twenty-two new species",
      tags: ["NorthAmerica" ,"MarineIsopods", "TerrestrialIsopods"],
      author: "Harriet Richardson",
      year: "1899",
      free: true, 
      url: "https://archive.org/details/biostor-66677",
      type: "Book", 
      language: "en",
    }, 
    {
      title: "A guide to the identification of the terrestrial Isopoda of Maryland, U.S.A. (Crustacea)",
      tags: ["NorthAmerica" , "TerrestrialIsopods", "Maryland","USA" ],
      author: "Jeffrey W. Shultz",
      year: "2018",
      free: true, 
      url: "https://zookeys.pensoft.net/article/24146/",
      type: "Article", 
      language: "en",
    }, 
    {
      title: "A guide to the identification of the terrestrial Isopoda of Maryland, U.S.A. (Crustacea)",
      tags: ["NorthAmerica" , "TerrestrialIsopods", "Texas", "USA"],
      author: "CLARK, SCOTT T",
      year: "1978",
      free: true, 
      url: "https://www.proquest.com/openview/6c5ab11198863d353a565036b502cad3/1?cbl=18750&amp;diss=y&amp;pq-origsite=gscholar&amp;parentSessionId=ze1Qyww%2FpkriTonbH8h0FCVay7dLzG4SaLJqOr%2Bwh0U%3D",
      type: "Article", 
      language: "en",
    }, 
    {
      title: "Wisconsin freshwater isopods (Asellidae)",
      tags: ["NorthAmerica" , "FreshwaterIsopods", "Wisconsin", "USA"],
      author: "Joan Jass and Barbara Klausmeier",
      year: "1997",
      free: true, 
      url: "https://dc.uwm.edu/cgi/viewcontent.cgi?article=1161&amp;context=fieldstation_bulletins",
      type: "Article", 
      language: "en",
    }, 
    {
      title: "The contribution of isopods in the feeding of Sympterygia spp (Pisces: Rajidae) with a description of Ancinus gaucho sp. n. (Isopoda: Sphaeromatidae)",
      tags: ["SouthAmerica" , "MarineIsopods",  "Brazil"],
      author: "Ana Maria Setubal Pires",
      year: "1987",
      free: true, 
      url: "https://www.scielo.br/j/bioce/a/NKbLLP9G8VKzpTvVG3T6bTk/?lang=en&amp;format=pdf",
      type: "Article", 
      language: "en",
    }, 
    {
      title: "Bestimmungsleitfaden für die häufigsten Landasseln Deutschlands",
      tags: ["Germany", "TerrestrialIsopods", "Europe", "Photos"],
      author: "Benedikt Kästle and Stephanie Binder",
      free: true, 
      year: "2024",
      url: "https://www.rote-liste-zentrum.de/files/Bestimmungsleitfaden_Asseln.pdf",
      type: "Article", 
      language: "de",
    },
    {
      title: "Redescription and molecular characterisation of the fish parasitic isopod Norileca indica (Milne Edwards, 1840) (Crustacea: Isopoda: Cymothoidae) with a key to the genus",
      tags: ["MarineIsopods", "ParasiticIsopods"],
      author: "Serita van der Wal, Nico J Smit and Kerry A Hadfield",
      free: true, 
      year: "2017",
      url: "https://www.tandfonline.com/doi/abs/10.1080/15627020.2017.1382389",
      type: "Article", 
      language: "en",
    },
    {
      title: "Four new species of isopods (Crustacea, Isopoda) from South Korea with keys of the genera",
      tags: ["MarineIsopods", "SouthKorea", "Asia"],
      author: "Sung Hoon Kim and Seong Myeong Yoon",
      free: true, 
      year: "2021",
      url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7817651/",
      type: "Article", 
      language: "en",
    },
    {
      title: "Nine New Species of Ilyarachninae from Australia and New Zealand with an Updated Key of the Subfamily from the Southwest Pacific",
      tags: ["Australia", "NewZealand", "MarineIsopods" ],
      author: "Kelly L. Merrin",
      free: false, 
      url: "https://www.mdpi.com/2673-6500/4/2/13",
      year: "2024",
      type: "Article", 
      language: "en",
    },
    {
      title: "A new neotenous genus and species, Deltanthura palpus gen. et sp. nov. from Japan, with a revised key to the genera in Paranthuridae",
      tags: ["Asia", "Japan", "MarineIsopods"],
      author: "Shoki Shiraki, Michitaka Shimomura and Keiichi Kakui",
      free: true, 
      year: "2022",
      url: "https://www.researchgate.net/publication/359632308_A_new_neotenous_genus_and_species_Deltanthura_palpus_gen_et_sp_nov_Isopoda_Anthuroidea_Paranthuridae_from_Japan_with_a_revised_key_to_the_genera_in_Paranthuridae",
      type: "Article", 
      language: "en",
    },
    {
      title: "Redescription of the monotypic micro-predatory isopod genera Alitropus and Barybrotes with a taxonomic key to the Cymothooidea from India",
      tags: ["India", "Asia", "MarineIsopods" ],
      author: "P. Vigneshwaran, S. Ravichandrana, and T.T. Ajith Kumar",
      free: true, 
      year: "2022",
      url: "https://www.tandfonline.com/doi/full/10.1080/00222933.2021.2008542",
      type: "Article", 
      language: "en",
    }, 
    {
      title: "Key to the Isopoda of Ohio - after 'AAW 1964'",
      tags: ["USA", "NorthAmerica",  ],
      author: "Gwynne Stoner Rife",
      free: true, 
      year: "2000",
      url: "https://web.archive.org/web/20090905081831/http://www.porcellio.scaber.org/woodlice/ohio_key.htm",
      type: "Website", 
      language: "en",
    }, 
    {
      title: "Intertidal Marine Isopods Keys and Notes for the Identification of the Species (Edition 2)",
      tags: ["MarineIsopods", "GreatBritain", "Ireland", "England","Europe", "Schottland",],
      author: " Ernest Naylor and Angelika Brandt",
      free: false, 
      year: "2015",
      url: "https://www.nhbs.com/sbf-volume-3-intertidal-marine-isopods-book",
      type: "Book", 
      language: "en",
    },
      {
          title: "Isopoda Dichotomous Key",
          tags: ["NorthAmerica", "USA", "TerrestrialIsopods"],
          author: "American Isopod and Myriapod Group",
          free: true,
          year: "https://www.americanisopodsmyriapods.com/taxonomic-guide-to-isopods-of-north-america/isopoda",
          url: "?",
          type: "Website",
          language: "en",
      },
      {
          title: "A guide to the coastal isopods of california",
          tags: ["NorthAmerica", "USA", "LittoralIsopods", "California"],
          author: "Richard C. Brusca, Vânia R. Coelho, Stefano Taiti",
          free: true,
          year: "2001",
          url: "https://rickbrusca.com/http___www.rickbrusca.com_index.html/Papers_files/Brusca%20et%20al.%202001%20Isopods%20of%20California.pdf",
          type: "Article",
          language: "en",
      },
      {
          title: "Asellota - Key to superfamilies in North America",
          tags: ["NorthAmerica", "FreshwaterIsopods" ],
          author: "Bug Guide Net",
          free: true,
          year: "?",
          url: "https://bugguide.net/node/view/167233",
          type: "Website",
          language: "en",
      },
      /* {
        title: "Isopods",
        tags: ["Oman" ],
        author: "Liliana",
        free: true,
        year: "",
        url: "",
        type: "Article",
        language: "en",
      },  */
  ]
  

  function Gui({liste}: {liste: Array<GuideFace>}){
    let rows = [];
    for (let i = 0; i < liste.length; i++) {
        let y = ""; 
        let u = ""; 
        let l = ""; 
        let adv = ""; 
        let f = <span property="isAccessibleForFree"  content="false">For sale</span>; 
        let cla = "filterable guide-box all show " + liste[i].language
        for (let j = 0; j < liste[i].tags.length; j++){
            cla += " " + liste[i].tags[j]
        }
        if(liste[i].year){
            y = "(" + liste[i].year + ")"; 
        }
        if(liste[i].free){
            f =  <span property="isAccessibleForFree"  content="true">Free</span>; 
            
        }
        if(liste[i].url){
          u = " at "
          l =  liste[i].url; 
          if(! liste[i].free){
            adv = "or second hand (cheaper) from other sources"
          }
        }
        rows.push(<div className={cla} typeof={liste[i].type}>
         <div><b>{liste[i].title} </b> <span property="datePublished" content={y}>{y}</span> by <span property="author"> <i>{liste[i].author}</i></span></div>
         <div>{f} {u} <small> <a  href={l} property="url">{l}</a> {adv}</small> (<span property="inLanguage" content={liste[i].language}>{liste[i].language}</span>) </div>
         
        </div>); 
    }
    return rows; 
  }