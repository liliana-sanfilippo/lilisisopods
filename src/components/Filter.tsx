import Select from 'react-select';
import React from 'react';


interface Props {
    value: string,
    label: string
}

/* Photos, Maps */

const filteroptions = [
    /* {value: "Oniscidea", label: "Oniscidea"},
    {value: "Agnaridae", label: "Agnaridae"},
    {value: "Alloniscidae", label: "Alloniscidae"},
    {value: "Armadillidae", label: "Armadillidae"},
    {value: "Armadillidiidae", label: "Armadillidiidae"},
    {value: "Balloniscidae", label: "Balloniscidae"},
    {value: "Buddelundiellidae", label: "Buddelundiellidae"},
    {value: "Cylisticidae", label: "Cylisticidae"},
    {value: "Detonidae", label: "Detonidae"},
    {value: "Halophiloscidae", label: "Halophiloscidae"},
    {value: "Ligiidae", label: "Ligiidae"},
    {value: "Oniscidae", label: "Oniscidae"},
    {value: "Philoscidae", label: "Philoscidae"},
    {value: "Platyarthridae", label: "Platyarthridae"},
    {value: "Porcellionidae", label: "Porcellionidae"},
    {value: "Scleropactidae", label: "Scleropactidae"},
    {value: "Stenoniscidae", label: "Stenoniscidae"},
    {value: "Styloniscidae", label: "Styloniscidae"},
    {value: "Tyliidae", label: "Tyliidae"},
    {value: "Trachelipodidae", label: "Trachelipodidae"},
    {value: "Trichoniscidae", label: "Trichoniscidae"},
   */

    /*  {value: "Asellidae", label: "Asellidae"},
     {value: "Gnathiidae", label: "Gnathiidae"},
     {value: "Asellota", label: "Asellota"},
     {value: "Aselidae", label: "Aselidae"},
     {value: "Valvifera", label: "Valvifera"},
     {value: "Idoteidae", label: "Idoteidae"},
     {value: "Janiroidea", label: "Janiroidea"},
     {value: "Sphaeromatidea", label: "Sphaeromatidea"},
     {value: "Sphaeromatidae", label: "Sphaeromatidae"},
     {value: "Cymothoida", label: "Cymothoida"},
     {value: "Limnoriidae", label: "Limnoriidae"}, */


    {value: "ParasiticIsopods", label: "Parasitic Isopods"},
    {value: "Ligiidae", label: "Slater"},
    {value: "Oniscidea", label: "Terrestrial Isopods"},
    {value: "FreshwaterIsopods", label: "Freshwater Isopods"},
    {value: "MarineIsopods", label: "Marine Isopods"},
    {value: "LittoralIsopods", label: "Littoral Isopods"},
    {value: "CavernicolousIsopods", label: "Cavernicolous Isopods"},

    {value: "GeneralKey", label: "General Key"},

    {value: "NorthAmerica", label: "North America"},
    {value: "SouthAmerica", label: "South America"},
    {value: "Europe", label: "Europe"},
    {value: "Asia", label: "Asia"},
    {value: "Africa", label: "Africa"},

    {value: "Australia", label: "Australia"},
    {value: "Brazil", label: "Brazil"},
    {value: "Canada", label: "Canada"},
    {value: "Chile", label: "Chile"},
    {value: "Cuba", label: "Cuba"},
    {value: "England", label: "England"},
    {value: "France", label: "France"},
    {value: "Ireland", label: "Ireland"},
    {value: "Iceland", label: "Iceland"},
    {value: "India", label: "India"},
    {value: "Japan", label: "Japan"},
    {value: "Germany", label: "Germany"},
    {value: "GreatBritain", label: "Great Britain"},
    {value: "Mexico", label: "Mexico"},
    {value: "NewZealand", label: "New Zealand"},
    {value: "Oman", label: "Oman"},
    {value: "Romania", label: "Romania"},
    {value: "Scottland", label: "Scottland"},
    {value: "SouthKorea", label: "South Korea"},
    {value: "USA", label: "USA"},


    {value: "California", label: "California"},
    {value: "Maryland", label: "Maryland"},
    {value: "Wisconsin", label: "Wisconsin"},
    {value: "Texas", label: "Texas"},

    {value: "en", label: "English"},
    {value: "es", label: "Spanish"},
    {value: "de", label: "German"},
    {value: "fr", label: "French"},


]


interface Props {
    value: string;
}


export function filterMultiSelection(arr: Array<Props>) {
    const nono = document.getElementById("nono");
    if (nono) {
        nono.className = "noshow";
    }

    const filterableElements = document.getElementsByClassName("filterable");

    // Remove "show" class from all elements
    for (let i = 0; i < filterableElements.length; i++) {
        const el = filterableElements[i];
        w3RemoveClass(el, "show");
    }

    console.log("Begin");

    // Apply filter criteria
    for (let i = 0; i < filterableElements.length; i++) {
        const el = filterableElements[i];
        let shouldShow = true;

        for (const entry of arr) {
            console.log(`entry: ${entry.value}`);
            if (!el.classList.contains(entry.value)) {
                shouldShow = false;
                break;
            }
        }

        console.log(`shouldShow: ${shouldShow}`);
        if (shouldShow) {
            w3AddClass(el, "show");
        }
    }

    // Check if any element is shown
    const shownElements = document.getElementsByClassName("show");
    if (shownElements.length < 1 && nono) {
        console.log(shownElements.length);
        nono.className = "show";
    }
}


function w3AddClass(element: Element, name: string) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
        if (arr1.indexOf(arr2[i]) === -1) {
            element.className += " " + arr2[i];
        }
    }
}

function w3RemoveClass(element: Element, name: string) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
        while (arr1.indexOf(arr2[i]) > -1) {
            arr1.splice(arr1.indexOf(arr2[i]), 1);
        }
    }
    element.className = arr1.join(" ");
}


export function WikiSelector() {
    return (
        <div>
            <div> Search by Country, Taxonomy and Language - Type in your request.</div>
            <br/>

            <FilterAction/>
        </div>
    )
}

class FilterAction extends React.Component {
    state = {
        selectedOption: null,
    };
    handleChange = (selectedOption: any) => {

        this.setState({selectedOption}, () =>
            console.log(`Option selected:`, this.state.selectedOption)
        );
        filterMultiSelection(selectedOption)
    };

    render() {
        const {selectedOption} = this.state;

        return (
            <Select
                value={selectedOption}
                onChange={this.handleChange}
                isMulti
                options={filteroptions}
                defaultValue={{value: "all", label: "Show all"}}
                className="basic-multi-select"
                classNamePrefix="select"
            />
        );
    }
}
