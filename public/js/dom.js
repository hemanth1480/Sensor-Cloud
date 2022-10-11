
function detail(prop) {      
    document.body.classList.add("bdy");  
    var num = document.getElementsByClassName("updatelabel-div").length;
    for(var t=0; t<num;t++) {
        document.getElementsByClassName("updatelabel-div")[t].classList.add("dis");
    }
    document.getElementsByClassName("details-div")[prop].classList.remove("dis");
    document.getElementsByClassName("details-div")[prop].classList.add("vis");
}
function closeit(io) {
    document.body.classList.remove("bdy");
    document.getElementsByClassName("details-div")[io].classList.remove("vis");
    document.getElementsByClassName("details-div")[io].classList.add("dis");
    var op =1;
    console.log(op)
}
function rename(ri) {
    var num = document.getElementsByClassName("details-div").length;
    document.body.classList.add("bdy");
    for(var t=0; t<num;t++) {
        document.getElementsByClassName("details-div")[t].classList.add("dis");
    }
    document.getElementsByClassName("updatelabel-div")[ri].classList.remove("dis");
    document.getElementsByClassName("updatelabel-div")[ri].classList.add("vis");
}
function closeit_up(oo) {
    document.body.classList.remove("bdy");
    document.getElementsByClassName("updatelabel-div")[oo].classList.remove("vis");
    document.getElementsByClassName("updatelabel-div")[oo].classList.add("dis");
}
function submitform(ho) {
    var form = document.getElementById("formupdate")[ho];
    console.log(form);
    document.getElementById("your-id").addEventListener("click", function () {
        form.submit();
    });
}
function graphtypes(qw) {
    document.getElementsByClassName("grp")[qw].classList.add("dis");
    document.getElementsByClassName("typ")[qw].classList.add("vis");
}
function downloadData(as) {
    document.getElementsByClassName("downloadData")[as].submit();
}
function deleteData(nom) {
    document.getElementsByClassName("alrt")[0].classList.remove("dis");
        document.getElementsByClassName("alrt")[0].classList.add("vis");
        document.getElementsByClassName("inpVal")[0].value = nom;
        document.getElementsByClassName("opac")[0].classList.add("fulldiv");
        document.body.style.overflow = 'hidden';
}
function remove_blur() {
    document.getElementsByClassName("alrt")[0].classList.remove("vis");
    document.getElementsByClassName("alrt")[0].classList.add("dis");
    // document.getElementsByClassName("zx")[0].classList.remove("blur");
    document.body.style.overflow = 'visible';
    document.getElementsByClassName("opac")[0].classList.remove("fulldiv");
}
function clode_this() {
    document.getElementsByClassName("alrt")[0].classList.remove("vis");
    document.getElementsByClassName("alrt")[0].classList.add("dis");
    // document.getElementsByClassName("zx")[0].classList.remove("blur");
    document.body.style.overflow = 'visible';
    document.getElementsByClassName("opac")[0].classList.remove("fulldiv");
}

// function enlarge() {
//     var cl =0 ;
//     console.log(cl+1);
// }