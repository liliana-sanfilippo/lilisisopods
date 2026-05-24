import React, {useEffect, useState} from 'react';
import {tabs} from './cal-tabs';
import {Button} from "react-bootstrap";
import {generateMonthComponents} from "./Months.tsx";

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


export function Calendar() {
    const [year, setYear] = useState(new Date().getFullYear());
    const [currentMonth, setCurrentMonth]  = useState(new Date().getMonth())
    const [arrows, setArrows] = useState(Arrows(year))
    useEffect(() => {
        showCurrentMonth(year, currentMonth);
        setArrows(Arrows(year))// This shows the current month on page loadSwi
    }, [year]);
    const thisYear = (new Date()).getFullYear();

    function switchTo(month: string, year: number) {
        return (_event: React.MouseEvent<HTMLElement, MouseEvent>) => {
            let elementsToHide = document.getElementsByClassName("hideable");
            for (let index = 0; index < elementsToHide.length; index++) {
                (elementsToHide[index] as HTMLElement).style.display = "none";
            }
            setCurrentMonth(months.indexOf(month))

            let newdates = document.getElementById(`${year}-${month}-dates`);
            if (newdates) (newdates as HTMLElement).style.display = "block";

            let newArrows = document.getElementById(`${year}-${month}-head`);
            if (newArrows) (newArrows as HTMLElement).style.display = "block";
        };
    }

    function Arrows(year: number) {
        let arrowList: JSX.Element[] = [];
        for (let index = 0; index < months.length; index++) {
            arrowList.push(
                <div className="month hideable" id={`${year}-${months[index]}-head`} style={{display: "none"}}>
                    <ul>
            <span>
              {index > 0 && (
                  <li className="prev">
                      <button onClick={switchTo(months[index - 1], year)}>
                          <div>&#10094;</div>
                      </button>
                  </li>
              )}
                {index < months.length - 1 && (
                    <li className="next">
                        <button onClick={switchTo(months[index + 1], year)}>
                            <div>&#10095;</div>
                        </button>
                    </li>
                )}
            </span>
                        <li>
                            {months[index]}
                            <br/>
                            <span style={{fontSize: "18px"}}>{year}</span>
                        </li>
                    </ul>
                </div>
            );
        }
        return arrowList;
    }

    return (
        <div className="cal">
            {/* Jahr-Navigation */}
            <div className="year-navigation">
                {year > 2024 ? <Button onClick={() => setYear(year - 1)}>← {year - 1}</Button> :
                    <Button disabled onClick={() => setYear(year - 1)}>← {year - 1}</Button>}
                <span className="current-year mx-4">{year}</span>
                {
                    year < thisYear ? <Button onClick={() => {
                        setYear(year + 1)
                    }}>{year + 1} →</Button> : <Button disabled onClick={() => {
                        setYear(year + 1)
                    }}>{year + 1} →</Button>
                }
            </div>

            {arrows}
            <ul className="weekdays">
                <li>Mo</li>
                <li>Tu</li>
                <li>We</li>
                <li>Th</li>
                <li>Fr</li>
                <li>Sa</li>
                <li>Su</li>
            </ul>

            {Array.from({ length: thisYear - 2024 + 1 }, (_, i) => {
                const yeara = 2024 + i;
                return (
                    generateMonthComponents(yeara)
                );
            })}
            {/* This will display the months */}
            <CalTabs/> {/* Render the tabs for information */}
        </div>
    );
}


// Function to show the current month on page load
function showCurrentMonth(year: number, currentMonth: number) {
    let elementsToHide = document.getElementsByClassName("days hideable");
    for (let index = 0; index < elementsToHide.length; index++) {
        (elementsToHide[index] as HTMLElement).style.display = "none";
    }
    const today = new Date();
    const datesElement = document.getElementById(`${year}-${months[currentMonth]}-dates`);
    const arrowsElement = document.getElementById(`${year}-${months[currentMonth]}-head`);

    if (datesElement) datesElement.style.display = 'block';
    if (arrowsElement) arrowsElement.style.display = 'block';

}


export function CalTabs() {
    let tablist: JSX.Element[] = [];
    for (let index = 0; index < tabs.length; index++) {
        tablist.push(
            <div className="cal-entry" id={`${tabs[index].year}${tabs[index].cssname}`} style={{display: "none"}}>
                <div className="entry-header">
                    <h5>{parseDateFromCode(tabs[index].cssname, tabs[index].year)}</h5>
                </div>
                <div className="entry-body">
                    {tabs[index].node}
                </div>
            </div>
        );
    }
    return tablist;
}

function parseDateFromCode(cssname: string, year: number): string {
    let [month, day] = cssname.match(/[a-zA-Z]+|[0-9]+/g) || ["", ""];
    return `${capitalize(month)} ${day}, ${year}`;  // Example: February 27, 2024
}

function capitalize(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1);
}




