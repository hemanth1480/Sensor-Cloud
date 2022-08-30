
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
function deleteData(oe) {
    document.getElementsByClassName("deleteData")[oe].submit();
}
