/**
 * Created by Nermin on 29. 06. 2018.
 */

function filterTable() {

    let radioInput, radioFilter, textInput, textFilter, cb1, cb2, cb3, table, tr, td2, td3, td4, tdc, i;

    let cbs = checkboxValue();

    radioInput = radioValue();

    let curated = "Yes";

    // console.log('CURATED:', curated);

    radioFilter = radioInput.toUpperCase();

    textInput = document.getElementById("gName");
    textFilter = textInput.value.toUpperCase();

    table = document.getElementById("pacientTable");
    tr = table.getElementsByTagName("tr");

    console.log("got table:", table);
    console.log("got trs:", tr);

    try {
        tdc = document.getElementById("curated-cell-c");
        tdc.innerText = "Yes";
        tdc.classList.add("display-none");
        console.log("found tdc");
    } catch(err) {
        console.log("created tdc");

        tdc = document.createElement("td");
        tdc.innerText = "Yes";
        tdc.classList.add("display-none");
        tdc.id="curated-cell-c";
    }


    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
        td2 = tr[i].getElementsByTagName("td")[1]; // old 2 - name of algorithm
        td4 = tr[i].getElementsByTagName("td")[2]; // old 5 - type of algorithm
        if (td2 && td4) {
            console.log("Got all table cells");
            if(radioInput === 'all'){
                console.log("radio = all");
                if(textFilter !== ''){
                    console.log("Tekst != null");
                    if(cbs.cb1 && cbs.cb2 && cbs.cb3){
                        console.log("all CB checked");
                        if (td2.innerHTML.toUpperCase().indexOf(textFilter) > -1 && (td4.innerHTML.toUpperCase().includes('DIAGNOSTIC') || td4.innerHTML.toUpperCase().includes('TREATMENT') || td4.innerHTML.toUpperCase().includes('OTHER'))) {
                            if((curated === 'Yes' && tdc.innerHTML === 'Yes') || curated === 'No'){
                                tr[i].style.display = "";
                            }
                            else{
                                tr[i].style.display = "none";
                            }
                        } else {
                            tr[i].style.display = "none";
                        }
                    }
                    else if(cbs.cb1 && cbs.cb2){
                        console.log("CB1 CB2");
                        if (td2.innerHTML.toUpperCase().indexOf(textFilter) > -1 && (td4.innerHTML.toUpperCase().includes('TREATMENT') || td4.innerHTML.toUpperCase().includes('DIAGNOSTIC'))) {
                            if((curated === 'Yes' && tdc.innerHTML === 'Yes') || curated === 'No'){
                                tr[i].style.display = "";
                            }
                            else{
                                tr[i].style.display = "none";
                            }                        } else {
                            tr[i].style.display = "none";
                        }
                    }
                    else if(cbs.cb1 && cbs.cb3){
                        console.log("CB1 CB3");
                        if (td2.innerHTML.toUpperCase().indexOf(textFilter) > -1 && (td4.innerHTML.toUpperCase().includes('OTHER') || td4.innerHTML.toUpperCase().includes('DIAGNOSTIC'))) {
                            if((curated === 'Yes' && tdc.innerHTML === 'Yes') || curated === 'No'){
                                tr[i].style.display = "";
                            }
                            else{
                                tr[i].style.display = "none";
                            }
                        } else {
                            tr[i].style.display = "none";
                        }
                    }
                    else if(cbs.cb2 && cbs.cb3){
                        console.log("CB2 CB3");
                        if (td2.innerHTML.toUpperCase().indexOf(textFilter) > -1 && (td4.innerHTML.toUpperCase().includes('TREATMENT') || td4.innerHTML.toUpperCase().includes('OTHER'))) {
                            if((curated === 'Yes' && tdc.innerHTML === 'Yes') || curated === 'No'){
                                tr[i].style.display = "";
                            }
                            else{
                                tr[i].style.display = "none";
                            }
                        } else {
                            tr[i].style.display = "none";
                        }
                    }
                    else if((!cbs.cb1 && !cbs.cb2 && !cbs.cb3)){
                        console.log("No CB checked");
                        tr[i].style.display = "none";

                    }
                    else if(cbs.cb1){
                        console.log("CB1");
                        if (td2.innerHTML.toUpperCase().indexOf(textFilter) > -1 && td4.innerHTML.toUpperCase().includes('DIAGNOSTIC')) {
                            if((curated === 'Yes' && tdc.innerHTML === 'Yes') || curated === 'No'){
                                tr[i].style.display = "";
                            }
                            else{
                                tr[i].style.display = "none";
                            }
                        } else {
                            tr[i].style.display = "none";
                        }
                    }
                    else if(cbs.cb2){
                        console.log("CB2");
                        if (td2.innerHTML.toUpperCase().indexOf(textFilter) > -1 && td4.innerHTML.toUpperCase().includes('TREATMENT')) {
                            if((curated === 'Yes' && tdc.innerHTML === 'Yes') || curated === 'No'){
                                tr[i].style.display = "";
                            }
                            else{
                                tr[i].style.display = "none";
                            }
                        } else {
                            tr[i].style.display = "none";
                        }
                    }
                    else if(cbs.cb3){
                        console.log("CB3 checked");
                        if (td2.innerHTML.toUpperCase().indexOf(textFilter) > -1 && td4.innerHTML.toUpperCase().includes('OTHER')) {
                            if((curated === 'Yes' && tdc.innerHTML === 'Yes') || curated === 'No'){
                                tr[i].style.display = "";
                            }
                            else{
                                tr[i].style.display = "none";
                            }
                        } else {
                            tr[i].style.display = "none";
                        }
                    }
                }
                else{
                    console.log("tekst = null");
                    if(cbs.cb1 && cbs.cb2 && cbs.cb3){
                        console.log("all CB checked");
                        if (td4.innerHTML.toUpperCase().includes('DIAGNOSTIC') || td4.innerHTML.toUpperCase().includes('TREATMENT') || td4.innerHTML.toUpperCase().includes('OTHER')) {
                            if((curated === 'Yes' && tdc.innerHTML === 'Yes') || curated === 'No'){
                                tr[i].style.display = "";
                            }
                            else{
                                tr[i].style.display = "none";
                            }
                        } else {
                            tr[i].style.display = "none";
                        }
                    }
                    else if(cbs.cb1 && cbs.cb2){
                        console.log("CB1 CB2 checked");
                        if (td4.innerHTML.toUpperCase().includes('TREATMENT') || td4.innerHTML.toUpperCase().includes('DIAGNOSTIC')) {
                            if((curated === 'Yes' && tdc.innerHTML === 'Yes') || curated === 'No'){
                                tr[i].style.display = "";
                            }
                            else{
                                tr[i].style.display = "none";
                            }
                        } else {
                            tr[i].style.display = "none";
                        }
                    }
                    else if(cbs.cb1 && cbs.cb3){
                        console.log("CB1 CB3 checked");
                        if (td4.innerHTML.toUpperCase().includes('OTHER') || td4.innerHTML.toUpperCase().includes('DIAGNOSTIC')) {
                            if((curated === 'Yes' && tdc.innerHTML === 'Yes') || curated === 'No'){
                                tr[i].style.display = "";
                            }
                            else{
                                tr[i].style.display = "none";
                            }
                        } else {
                            tr[i].style.display = "none";
                        }
                    }
                    else if(cbs.cb2 && cbs.cb3){
                        console.log("CB2 CB3 checked");
                        if (td4.innerHTML.toUpperCase().includes('TREATMENT') || td4.innerHTML.toUpperCase().includes('OTHER')) {
                            if((curated === 'Yes' && tdc.innerHTML === 'Yes') || curated === 'No'){
                                tr[i].style.display = "";
                            }
                            else{
                                tr[i].style.display = "none";
                            }
                        } else {
                            tr[i].style.display = "none";
                        }
                    }
                    else if(!cbs.cb1 && !cbs.cb2 && !cbs.cb3){
                        console.log("No CB checked");
                        tr[i].style.display = "none";

                    }
                    else if(cbs.cb1){
                        console.log("CB1 checked");
                        if (td4.innerHTML.toUpperCase().includes('DIAGNOSTIC')) {
                            if((curated === 'Yes' && tdc.innerHTML === 'Yes') || curated === 'No'){
                                tr[i].style.display = "";
                            }
                            else{
                                tr[i].style.display = "none";
                            }
                        } else {
                            tr[i].style.display = "none";
                        }
                    }
                    else if(cbs.cb2){
                        console.log("CB2 checked");
                        if (td4.innerHTML.toUpperCase().includes('TREATMENT')) {
                            if((curated === 'Yes' && tdc.innerHTML === 'Yes') || curated === 'No'){
                                tr[i].style.display = "";
                            }
                            else{
                                tr[i].style.display = "none";
                            }
                        } else {
                            tr[i].style.display = "none";
                        }
                    }
                    else if(cbs.cb3){
                        console.log("CB3 checked");
                        if (td4.innerHTML.toUpperCase().includes('OTHER')) {
                            if((curated === 'Yes' && tdc.innerHTML === 'Yes') || curated === 'No'){
                                tr[i].style.display = "";
                            }
                            else{
                                tr[i].style.display = "none";
                            }
                        } else {
                            tr[i].style.display = "none";
                        }
                    }
                }
            }

            ////////////////////////////////////////////////////////////////////////////////////////////////////

            else{
                console.log("radio != all");
                if(textFilter !== ''){
                    console.log("tekst != null");
                    if(cbs.cb1 && cbs.cb2 && cbs.cb3){
                        console.log("all CB checked");
                        if (td2.innerHTML.toUpperCase().indexOf(textFilter) > -1 && (td4.innerHTML.toUpperCase().includes('DIAGNOSTIC') || td4.innerHTML.toUpperCase().includes('TREATMENT') || td4.innerHTML.toUpperCase().includes('OTHER'))) {
                            if((curated === 'Yes' && tdc.innerHTML === 'Yes') || curated === 'No'){
                                tr[i].style.display = "";
                            }
                            else{
                                tr[i].style.display = "none";
                            }
                        } else {
                            tr[i].style.display = "none";
                        }
                    }
                    else if(cbs.cb1 && cbs.cb2){
                        console.log("CB1 CB2 checked");
                        if (td2.innerHTML.toUpperCase().indexOf(textFilter) > -1 && (td4.innerHTML.toUpperCase().includes('TREATMENT') || td4.innerHTML.toUpperCase().includes('DIAGNOSTIC'))) {
                            if((curated === 'Yes' && tdc.innerHTML === 'Yes') || curated === 'No'){
                                tr[i].style.display = "";
                            }
                            else{
                                tr[i].style.display = "none";
                            }
                        } else {
                            tr[i].style.display = "none";
                        }
                    }
                    else if(cbs.cb1 && cbs.cb3){
                        console.log("CB1 CB3 checked");
                        if (td2.innerHTML.toUpperCase().indexOf(textFilter) > -1 && (td4.innerHTML.toUpperCase().includes('OTHER') || td4.innerHTML.toUpperCase().includes('DIAGNOSTIC'))) {
                            if((curated === 'Yes' && tdc.innerHTML === 'Yes') || curated === 'No'){
                                tr[i].style.display = "";
                            }
                            else{
                                tr[i].style.display = "none";
                            }
                        } else {
                            tr[i].style.display = "none";
                        }
                    }
                    else if(cbs.cb2 && cbs.cb3){
                        console.log("CB2 CB3 checked");
                        if (td2.innerHTML.toUpperCase().indexOf(textFilter) > -1 && (td4.innerHTML.toUpperCase().includes('TREATMENT') || td4.innerHTML.toUpperCase().includes('OTHER'))) {
                            if((curated === 'Yes' && tdc.innerHTML === 'Yes') || curated === 'No'){
                                tr[i].style.display = "";
                            }
                            else{
                                tr[i].style.display = "none";
                            }
                        } else {
                            tr[i].style.display = "none";
                        }
                    }
                    else if((!cbs.cb1 && !cbs.cb2 && !cbs.cb3)){
                        console.log("No CB checked");
                        if (td2.innerHTML.toUpperCase().indexOf(textFilter) > -1) {
                            if((curated === 'Yes' && tdc.innerHTML === 'Yes') || curated === 'No'){
                                tr[i].style.display = "";
                            }
                            else{
                                tr[i].style.display = "none";
                            }
                        } else {
                            tr[i].style.display = "none";
                        }
                    }
                    else if(cbs.cb1){
                        console.log("CB1 checked");
                        if (td2.innerHTML.toUpperCase().indexOf(textFilter) > -1 && td4.innerHTML.toUpperCase().includes('DIAGNOSTIC')) {
                            if((curated === 'Yes' && tdc.innerHTML === 'Yes') || curated === 'No'){
                                tr[i].style.display = "";
                            }
                            else{
                                tr[i].style.display = "none";
                            }
                        } else {
                            tr[i].style.display = "none";
                        }
                    }
                    else if(cbs.cb2){
                        console.log("CB2 checked");
                        if (td2.innerHTML.toUpperCase().indexOf(textFilter) > -1 && td4.innerHTML.toUpperCase().includes('TREATMENT')) {
                            if((curated === 'Yes' && tdc.innerHTML === 'Yes') || curated === 'No'){
                                tr[i].style.display = "";
                            }
                            else{
                                tr[i].style.display = "none";
                            }
                        } else {
                            tr[i].style.display = "none";
                        }
                    }
                    else if(cbs.cb3){
                        console.log("CB3 checked");
                        if (td2.innerHTML.toUpperCase().indexOf(textFilter) > -1 && td4.innerHTML.toUpperCase().includes('OTHER')) {
                            if((curated === 'Yes' && tdc.innerHTML === 'Yes') || curated === 'No'){
                                tr[i].style.display = "";
                            }
                            else{
                                tr[i].style.display = "none";
                            }
                        } else {
                            tr[i].style.display = "none";
                        }
                    }
                }

                ///////////////////////////////////////////////////////////////////////////////////////////////////////////


                else{
                    console.log("tekst = null");
                    if(cbs.cb1 && cbs.cb2 && cbs.cb3){
                        console.log("all CB checked");
                        if ((td4.innerHTML.toUpperCase().includes('DIAGNOSTIC') || td4.innerHTML.toUpperCase().includes('TREATMENT') || td4.innerHTML.toUpperCase().includes('OTHER'))) {
                            if((curated === 'Yes' && tdc.innerHTML === 'Yes') || curated === 'No'){
                                tr[i].style.display = "";
                            }
                            else{
                                tr[i].style.display = "none";
                            }
                        } else {
                            tr[i].style.display = "none";
                        }
                    }
                    else if(cbs.cb1 && cbs.cb2){
                        console.log("CB1 CB2 checked");
                        if ((td4.innerHTML.toUpperCase().includes('TREATMENT') || td4.innerHTML.toUpperCase().includes('DIAGNOSTIC'))) {
                            if((curated === 'Yes' && tdc.innerHTML === 'Yes') || curated === 'No'){
                                tr[i].style.display = "";
                            }
                            else{
                                tr[i].style.display = "none";
                            }
                        } else {
                            tr[i].style.display = "none";
                        }
                    }
                    else if(cbs.cb1 && cbs.cb3){
                        console.log("CB1 CB3 checked");
                        if ((td4.innerHTML.toUpperCase().includes('OTHER') || td4.innerHTML.toUpperCase().includes('DIAGNOSTIC'))) {
                            if((curated === 'Yes' && tdc.innerHTML === 'Yes') || curated === 'No'){
                                tr[i].style.display = "";
                            }
                            else{
                                tr[i].style.display = "none";
                            }
                        } else {
                            tr[i].style.display = "none";
                        }
                    }
                    else if(cbs.cb2 && cbs.cb3){
                        console.log("CB2 CB3 checked");
                        if ((td4.innerHTML.toUpperCase().includes('TREATMENT') || td4.innerHTML.toUpperCase().includes('OTHER'))) {
                            if((curated === 'Yes' && tdc.innerHTML === 'Yes') || curated === 'No'){
                                tr[i].style.display = "";
                            }
                            else{
                                tr[i].style.display = "none";
                            }
                        } else {
                            tr[i].style.display = "none";
                        }
                    }
                    else if((!cbs.cb1 && !cbs.cb2 && !cbs.cb3)){
                        console.log("No CB checked");
                        if((curated === 'Yes' && tdc.innerHTML === 'Yes') || curated === 'No'){
                            tr[i].style.display = "";
                        }
                        else{
                            tr[i].style.display = "none";
                        }
                    }
                    else if(cbs.cb1){
                        console.log("CB1 checked");
                        if (td4.innerHTML.toUpperCase().includes('DIAGNOSTIC')) {
                            if((curated === 'Yes' && tdc.innerHTML === 'Yes') || curated === 'No'){
                                tr[i].style.display = "";
                            }
                            else{
                                tr[i].style.display = "none";
                            }
                        } else {
                            tr[i].style.display = "none";
                        }
                    }
                    else if(cbs.cb2){
                        console.log("CB2 checked");
                        if (td4.innerHTML.toUpperCase().includes('TREATMENT')) {
                            if((curated === 'Yes' && tdc.innerHTML === 'Yes') || curated === 'No'){
                                tr[i].style.display = "";
                            }
                            else{
                                tr[i].style.display = "none";
                            }
                        } else {
                            tr[i].style.display = "none";
                        }
                    }
                    else if(cbs.cb3){
                        console.log("CB3 checked");
                        if (td4.innerHTML.toUpperCase().includes('OTHER')) {
                            if((curated === 'Yes' && tdc.innerHTML === 'Yes') || curated === 'No'){
                                tr[i].style.display = "";
                            }
                            else{
                                tr[i].style.display = "none";
                            }
                        } else {
                            tr[i].style.display = "none";
                        }
                    }
                }

            }
        }
    }
}

function radioValue() {
    // let f = document.forms["gForm"];
    // let radios = f.elements["gType"];
    // console.log("radios:", radios, radios.length);

    // // if radios.length is not undefined (if it's true), radios is an array and that means that there are multiple choices(All, Patients,..)
    // if(radios.length){
    //     if (radios[0].checked === true){
    //         return 'all';
    //     }
    //     else if (radios[1].checked === true){
    //         return 'Patients';
    //     }
    //     else{
    //         return 'Doctors';
    //     }
    // }
    // // only one radio item in radios and radio button does not have length attribute,
    // // that happens only when user is not logged and on "Patients page" - in that case only algorithms for "Patients" are visible
    // else { 
    //     return 'Patients'
    // }
    return 'Patients';
}

function checkboxValue() {
    let cbs = {
        cb1: document.getElementById("typeADiagnostic").checked,
        cb2: document.getElementById("typeATreatment").checked,
        cb3: document.getElementById("typeAOther").checked
    };

    return cbs;
}

function resetFilters() {
    document.getElementById("gName").value = '';

    document.forms["gForm"]["gType"][0].checked = true;
    document.forms["gForm"]["gType"][1].checked = false;
    document.forms["gForm"]["gType"][2].checked = false;

    document.getElementById("typeADiagnostic").checked = false;
    document.getElementById("typeATreatment").checked = false;
    document.getElementById("typeAOther").checked = false;

    let table, tr, td, i;
    table = document.getElementById("pacientTable");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
        tr[i].style.display = "";
    }
}
