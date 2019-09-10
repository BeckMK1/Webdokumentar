    // MENU INSTILLINGER//////////////////////////
    // bg billeder
    var bgBlur = 8;
    var bgGrayScale = 0.9;
    var bgBrightness = 0.5;
    // Overskrifter
    var Size = 5
    //  Animation i sekunder
    var AnimationTime = 1
    //////////////////////////////////////////////

    // GET ELEMENTS ////////////////////////////////////////////////////////////////////
    // GET MENU ELEMETS
    var moveBar = document.getElementById('moveBar');
    var LMenu = document.getElementById('menu1');
    var RMenu = document.getElementById('menu2');
    var h2eks1 = document.getElementById('menuOverskrift1');
    var h2eks2 = document.getElementById('menuOverskrift2');
    var LMenubg = document.getElementById('menubg1');
    var RMenubg = document.getElementById('menubg2');

    // GET BODY
    var body = document.getElementsByTagName("BODY")[0];

    // GET SECTION ELEMENTER
    var forside = document.getElementById('forside');
    var menuside = document.getElementById('menuside');

    var sectionwrap2 = document.getElementById('sectionwrap2')
    var section2p1 = document.getElementById('section2p1')
    var section2p2 = document.getElementById('section2p2')
    var section2p3 = document.getElementById('section2p3')
    var section2p4 = document.getElementById('section2p4')

    var sectionwrap1 = document.getElementById('sectionwrap1')
    var section1p1 = document.getElementById('section1p1')
    var section1p2 = document.getElementById('section1p2')
    var section1p3 = document.getElementById('section1p3')
    var section1p4 = document.getElementById('section1p4')

    // GET NAV ELEMENTER
    var nav1 = document.getElementById('nav1')
    var nav2 = document.getElementById('nav2')


    var navbarclicked = false;
    var navNumber = 0

    function navigation(){
    if (webstate == navState && navNumber != whatpage) { 
        navbarclicked = true;
        body.style.overflowY = "hidden";
        window['p' + navNumber].scrollIntoView({
            behavior: 'smooth'
        });
    }

    if (navNumber > 1 && webstate > 0 && navState > 0) {
        notreadyToGoBack();
    }

    // Autodragger "pretender"
    if (webstate == 0 && navState == 1) {
        webstage1();
        readyToGoBack();
    } else if (webstate == 0 && navState == 2) {
        webstage2();
        readyToGoBack();
    } else if (webstate > 0 && navState ==0 ) {
    body.style.overflowY = "initial";
    webstage0();
    }

}

    function autodragger() {
        if (webstate = 0 && navState == 1) {
            moveBar.style.left = 0;
            // var i;
            // for (i = 0; i < cars.length; i++) {
            //     text += cars[i] + "<br>";
            // }
        }
    }

    //  ON LOAD ////////////////////////////////////////////////////////////////////
    // Set session variable "webstate" - fix til refresh af siden
    var webstatenow = null;
    var webstate = sessionStorage.getItem("webstatekey");
    if (webstatenow == webstate) {
        webstatenow = 0;
        sessionStorage.setItem("webstatekey", webstatenow);
        webstate = sessionStorage.getItem("webstatekey");
    }

    // display on site - også en fix til refresh af siden
    forside.style.display = "inherit"
    menuside.style.display = "flex"
    moveBar.style.display = "initial"
    if (webstate == 1) {
        sectionwrap2.style.display = "initial"
    } else if (webstate == 2) {
        sectionwrap1.style.display = "initial"
    }

    // add events on load - måske ikke nødvendigt
    moveBar.addEventListener('mousedown', mouseDown, false);
    moveBar.addEventListener('mouseup', mouseUp, false);

    // callable onload function - køre essentielle funktioner når hjemmesiden starter eller bliver kaldt.
    function start() {
        SetPagesOnWebState();
        setcurrentpage();
        if (webstate == 0) {
            webstage0();
        } else if (webstate == 1) {
            webstage1();
        } else if (webstate == 2) {
            webstage2();
        }
    }

    // SET PAGES ON WEBSTATES
    function SetPagesOnWebState() {
        if (webstate == 0) {
            p1 = forside;
            p2 = menuside;
        } else if (webstate == 1) {
            p1 = menuside;
            p2 = section2p1;
            p3 = section2p2;
            p4 = section2p3;
            p5 = section2p4;
        } else if (webstate == 2) {
            p1 = menuside;
            p2 = section1p1;
            p3 = section1p2;
            p4 = section1p3;
            p5 = section1p4;
        }
    }

    // SET PAGE ON LOAD
    var whatpage = 0;

    function setcurrentpage() {
        // if (navbarclicked == true) {
            // navbarclicked = false;
        // }
        if (window.pageYOffset == p1.offsetTop) {
            whatpage = 1;
        } else if (window.pageYOffset == p2.offsetTop) {
            whatpage = 2;
        } else if (window.pageYOffset == p3.offsetTop) {
            whatpage = 3;
        } else if (window.pageYOffset == p4.offsetTop) {
            whatpage = 4;
        } else if (window.pageYOffset == p5.offsetTop) {
            whatpage = 5;
        }
    }

    // SMOOTHSCROLL ////////////////////////////////////////////////////////////////////
    // SMOOTHSCROLL VARIABLER
    var i = 0;
    var snap = 50;

    // SMOOTHSCROLL FUNCTION
    function smoothscroll() {
        // RESET TIL WEBSTATE 0 - ihvertfald forstadiet
        if (window.pageYOffset == p1.offsetTop && webstate > 0) {
            scrollexecuted = false;
            console.log("KLARTILBACK")
            readyToGoBack();
        }

        // SET PAGE VARIABLER
        whatpagenext = whatpage + 1;
        whatpageprev = whatpage - 1;
        currentpage = window['p' + whatpage];
        nextpage = window['p' + whatpagenext];
        prevpage = window['p' + whatpageprev];

        // SOURCE FOR SMOOTHSCROLL
        if (!navbarclicked) {
        if (window.pageYOffset > currentpage.offsetTop + snap && window.pageYOffset < nextpage.offsetTop - snap) {
            body.style.overflowY = "hidden";
            i++
            window.scrollTo(0, window.pageYOffset + i);
            if (window.pageYOffset <= nextpage.offsetTop + snap && window.pageYOffset >= nextpage.offsetTop - snap) {
                i = 0;
                window.scrollTo(0, nextpage.offsetTop);
                whatpage += 1;
                // setTimeout(function(){ body.style.overflowY = "initial"; }, 500);
                body.style.overflowY = "initial";
            }
        } else if (window.pageYOffset < currentpage.offsetTop - snap && window.pageYOffset > prevpage.offsetTop + snap) {
            body.style.overflowY = "hidden";
            i--
            window.scrollTo(0, window.pageYOffset + i);
            if (window.pageYOffset >= prevpage.offsetTop - snap && window.pageYOffset <= prevpage.offsetTop + snap) {
                i = 0;
                window.scrollTo(0, prevpage.offsetTop);
                whatpage -= 1;
                // setTimeout(function(){ body.style.overflowY = "initial"; }, 500);
                if (webstate > 0 && window.pageYOffset < p2.offsetTop - snap) {
                    body.style.overflowY = "hidden";
                    window.removeEventListener("wheel", GoBack, true)
                } else {
                    body.style.overflowY = "initial";
                }
            }
        }
    }
    if (window.window.pageYOffset == window['p' + navNumber].offsetTop) {
        navbarclicked = false;
        whatpage = navNumber;

        if (navNumber > 1 || webstate < 1) {
            body.style.overflowY = "initial";
        }


        }

    }

    // MOVEABLE BAR RELEASED////////////////////////////////////////////////////////////////////
    function mouseUp() {
        webstage0();
        window.removeEventListener('mousemove', move, true);
    }

    // MOVEABLE BAR CLICKED////////////////////////////////////////////////////////////////////
    function mouseDown() {
        if (webstate == 0) {
            removeAnimationTime();
            window.addEventListener('mousemove', move, true);
            moveBar.style.left = event.clientX + 'px';
            startposbar = moveBar.style.left;
        }
    }

    function removeAnimationTime() {
        h2eks2.style.transition = "0s";
        h2eks1.style.transition = "0s";
        var nodes = document.getElementById('menuside').getElementsByTagName("div");
        for (var i = 0; i < nodes.length; i++) {
            nodes[i].style.transition = "0s";
        }
    }

    // MENU BAR OG ANIMATION
    var w = window.innerWidth;
    var wmin = w / 5 + "px";
    var wmax = (w / 5) * 4 + "px";
    var LeftPercentage;
    var RightPercentage;

    function move() {

        // string til integer
        var barpos = parseInt(moveBar.style.left, 10);
        var minpos = parseInt(wmin, 10);
        var maxpos = parseInt(wmax, 10);
        var startpos = parseInt(startposbar, 10);

        // source
        if (barpos >= minpos && barpos <= maxpos) {
            moveBar.style.left = event.clientX + 'px';
            LMenu.style.width = event.clientX + 'px';
            LeftPercentage = ((startpos) - (barpos)) / (startpos - minpos);
            RightPercentage = ((startpos) - (barpos)) / (startpos - maxpos);

            // filter animation
            LMenubg.style.filter = "grayscale(" + (bgGrayScale * 100 * LeftPercentage * 100 / 100 / 100 + bgGrayScale) + ") blur(" + (bgBlur - (RightPercentage * bgBlur) + "px)");
            RMenubg.style.filter = "grayscale(" + (bgGrayScale * 100 * RightPercentage * 100 / 100 / 100 + bgGrayScale) + ") blur(" + (bgBlur - (LeftPercentage * bgBlur) + "px)");

            // opacity animation - kaldt brigtness fordi det er på en sort baggrund
            if (RightPercentage <= 1 && RightPercentage >= 0) {
                LMenubg.style.opacity = bgBrightness * 100 * RightPercentage * 100 / 100 / 100 + bgBrightness;
            } else {
                LMenubg.style.opacity = bgBrightness;
            }
            if (LeftPercentage <= 1 && LeftPercentage >= 0) {
                RMenubg.style.opacity = bgBrightness * 100 * LeftPercentage * 100 / 100 / 100 + bgBrightness;
            } else {
                RMenubg.style.opacity = bgBrightness;
            }

            // text animation
            h2eks2.style.fontSize = Size - RightPercentage * Size + "vw";
            h2eks1.style.fontSize = Size - LeftPercentage * Size + "vw";

            h2eks2.style.opacity = 1 - LeftPercentage;
            h2eks1.style.opacity = 1 - RightPercentage;

            h2eks2.style.filter = "blur(" + ((LeftPercentage * 10) + "px)");
            h2eks1.style.filter = "blur(" + ((RightPercentage * 10) + "px)");

            // WEBSTAGE TRIGGERS
        } else if (barpos <= minpos) {
            window.removeEventListener('mousemove', move, true);
            readyToGoBack();
            webstage1();
            LMenu.style.transition = "" + AnimationTime / 3 + "s";
            moveBar.style.transition = "" + AnimationTime / 3 + "s";
        } else if (barpos >= maxpos) {
            window.removeEventListener('mousemove', move, true);
            readyToGoBack();
            webstage2();
            LMenu.style.transition = "" + AnimationTime / 3 + "s";
            moveBar.style.transition = "" + AnimationTime / 3 + "s";
        }
    }

    // RESET TIL WEBSTATE 0 - ihvertfald forstadiet
    function readyToGoBack() {
        window.addEventListener("wheel", GoBack, true)
        body.style.overflowY = "hidden";
        whatpage = 1;
    }

    function notreadyToGoBack() {
        window.removeEventListener("wheel", GoBack, true)
    }


    // Go back triggers
    var scrollexecuted = false;

    function GoBack(event) {
        console.log("scrollingYvirker")
        // scroller ned
        if (event.deltaY > 0) {
            if (scrollexecuted == false) {
                scrollexecuted = true;
                body.style.overflowY = "initial";
                // window.removeEventListener("wheel", GoBack, true)
            }
            // scroller op
        } else if (event.deltaY < 0) {
            if (scrollexecuted == false) {
                scrollexecuted = true;
                setTimeout(function () {
                    body.style.overflowY = "initial";
                }, 500);
                whatpage = 2;
                webstage0();
                // window.removeEventListener("wheel", GoBack, true)
            }

        }
    }

    function webstage0() {
        // ma
        webstatenow = 0;
        sessionStorage.setItem("webstatekey", webstatenow);
        webstate = sessionStorage.getItem("webstatekey");
        SetPagesOnWebState();

        // hvad der skal fjernes
        sectionwrap2.style.display = "none";
        sectionwrap1.style.display = "none";

        // hvad der skal vises
        LMenu.style.width = '50%';
        RMenu.style.width = 'initial';

        moveBar.style.left = '50%';
        moveBar.style.width = "2%";

        h2eks2.style.fontSize = Size + "vw";
        h2eks1.style.fontSize = Size + "vw";
        h2eks2.style.opacity = "1"
        h2eks1.style.opacity = "1"

        // effekter
        RMenubg.style.filter = "grayscale(" + bgGrayScale + ") blur(" + bgBlur + "px)";
        LMenubg.style.filter = "grayscale(" + bgGrayScale + ") blur(" + bgBlur + "px)";
        RMenubg.style.opacity = bgBrightness;
        LMenubg.style.opacity = bgBrightness;
        h2eks2.style.filter = "blur(0)";
        h2eks1.style.filter = "blur(0)";

        // animationstid
        h2eks2.style.transition = "" + AnimationTime + "s";
        h2eks1.style.transition = "" + AnimationTime + "s";
        var nodes = document.getElementById('menuside').getElementsByTagName("div");
        for (var i = 0; i < nodes.length; i++) {
            nodes[i].style.transition = "" + AnimationTime + "s";
        }
    }

    function webstage1() {
        // ma
        if (webstate != 1) {
            webstatenow = 1;
            sessionStorage.setItem("webstatekey", webstatenow);
            webstate = sessionStorage.getItem("webstatekey");
        }
        SetPagesOnWebState();
        scrollexecuted = false;

        // hvad der skal vises
        sectionwrap2.style.display = "initial";

        h2eks2.style.fontSize = Size * 2 + "vw";
        h2eks1.style.transition = "" + AnimationTime / 2 + "s";
        h2eks1.style.fontSize = "0vw";
        h2eks2.style.filter = "blur(10px)"

        // hvad der skal fjernes
        LMenu.style.width = '0%';
        moveBar.style.width = '0%';
        moveBar.style.left = '0';
        h2eks1.style.opacity = "0"
        h2eks2.style.opacity = "0"

        RMenubg.style.filter = "grayscale(0) blur(0px)";
        RMenubg.style.opacity = 1;
    }

    function webstage2() {
        if (webstate != 2) {
            webstatenow = 2;
            sessionStorage.setItem("webstatekey", webstatenow);
            webstate = sessionStorage.getItem("webstatekey");
        }
        SetPagesOnWebState();
        scrollexecuted = false;

        // hvad der skal vises
        sectionwrap1.style.display = "initial";
        LMenu.style.width = '100%';

        h2eks1.style.fontSize = Size * 2 + "vw";
        h2eks2.style.transition = "" + AnimationTime / 2 + "s";
        h2eks2.style.fontSize = "0vw";
        h2eks1.style.filter = "blur(10px)"

        // hvad der skal fjernes
        moveBar.style.width = '0%';
        moveBar.style.left = '100%';
        h2eks1.style.opacity = "0"
        h2eks2.style.opacity = "0"

        LMenubg.style.filter = "grayscale(0) blur(0px)";
        LMenubg.style.opacity = 1;
    }