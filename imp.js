<script>

    function hj(ll) {
        document.body.style.overflow = 'visible';
        document.getElementsByClassName("opac")[ll].classList.remove("fulldiv");
    }

    function enlarge(inp) {
        if (document.getElementsByClassName("enl")[inp].innerHTML == "Enlarge") {
            document.getElementsByClassName("opac")[0].classList.add("fulldiv");
            document.body.style.overflow = 'hidden';
            console.log(inp);
            var cha =  document.getElementsByClassName("enal")[inp];
            // cha.classList.remove("ch");
            cha.classList.add("ch1");
            document.getElementsByClassName("enl")[inp].innerHTML = "Reduce";
        } else {
            var cha =  document.getElementsByClassName("enal")[inp];
        cha.classList.remove("ch1");
        cha.classList.add("ch");
            document.getElementsByClassName("enl")[inp].innerHTML = "Enlarge";
            hj(ll);
        }
    }

</script>