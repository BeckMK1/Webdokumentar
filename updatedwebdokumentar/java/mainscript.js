    // MENU INSTILLINGER//////////////////////////
    // bg billeder
    var bgBlur = 8;
    var bgGrayScale = 0.9;
    var bgBrightness = 0.5;
     // Overskrifter
     var Size = 5
    //  Animation
    var AnimationTime = "1s"
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

// GET BODY ELEMETS
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

//  ON LOAD ////////////////////////////////////////////////////////////////////
// SET GLOBAL VALUE "webstate"
var whatpage
var webstatenow = null;
var webstate = localStorage.getItem("webstatekey");
console.log(webstate + "hejder")
if (webstatenow == webstate) {
    webstatenow = 0;
    localStorage.setItem("webstatekey", webstatenow);
    webstate = localStorage.getItem("webstatekey");
} 


// display on site
    forside.style.display = "inherit"
    menuside.style.display = "flex"
    moveBar.style.display = "initial"
    if (webstate == 1) {
        sectionwrap2.style.display = "initial"
    } else if (webstate == 2) {
        sectionwrap1.style.display = "initial"
    }


// ADD EVENTS ON START
moveBar.addEventListener('mousedown', mouseDown, false);
moveBar.addEventListener('mouseup', mouseUp, false);

// CALLABLE ONLOAD FUNCTION
function start() {
    SetPagesOnWebState();
    setcurrentpage();
    console.log("start is loaded hej")
    // resetalltest();
    if (webstate == 0) {
        mouseUp();
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

var whatpage = 0;
// SET PAGE ON LOAD
function setcurrentpage() {
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
    console.log(whatpage+"whatpage")
}

// SMOOTHSCROLL ////////////////////////////////////////////////////////////////////
// SMOOTHSCROLL VARIABLER
var i = null;
var snap = 50;

// SMOOTHSCROLL FUNCTION
function smoothscroll() {
    
    // SET PAGES ON WEBSTATES
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

    // SET PAGE VARIABLER
    whatpagenext = whatpage + 1;
    whatpageprev = whatpage - 1;
    currentpage = window['p' + whatpage];
    nextpage = window['p' + whatpagenext];
    prevpage = window['p' + whatpageprev];

    // RESET TIL WEBSTATE 0
    if (window.pageYOffset <= p1.offsetTop && webstate > 0) {
        body.style.overflowY = "hidden";
        console.log("addedwheel2")
        window.addEventListener("wheel", updowntest, true)
    } else if (window.pageYOffset > p1.offsetTop && webstate > 0) {
        upececuted = false;
        downececuted = false;
    }


    console.log(webstate)

    // SOURCE FOR SMOOTHSCROLL
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
            } else {
                body.style.overflowY = "initial"; 
            }
        }
    }
}



function resetalltest() {
        webstatenow = 0;
    localStorage.setItem("webstatekey", webstatenow);
    webstate = localStorage.getItem("webstatekey");


    sectionwrap2.style.display = "none";
    sectionwrap1.style.display = "none";

moveBar.style.opacity = 1;

    LMenubg.style.filter =  "grayscale("+bgGrayScale+") blur("+bgBlur+ "px)";
    RMenubg.style.filter =  "grayscale("+bgGrayScale+") blur("+bgBlur+ "px)";
    RMenubg.style.opacity = bgBrightness;
    LMenubg.style.opacity = bgBrightness;
    h2eks2.style.fontSize = Size + "vw";
    h2eks1.style.fontSize = Size + "vw";

    h2eks2.style.opacity = "1"
    h2eks1.style.opacity = "1"
    h2eks2.style.filter = "blur(0)";
    h2eks1.style.filter = "blur(0)";
    h2eks2.style.transition = AnimationTime;
    h2eks1.style.transition = AnimationTime;

        moveBar.style.left = '50%';
        LMenu.style.width = '50%';
        RMenu.style.width = 'initial';

        var nodes = document.getElementById('menuside').getElementsByTagName("div");
        for (var i = 0; i < nodes.length; i++) {
            nodes[i].style.transition = AnimationTime;
        }
}


// MOVEABLE BAR CLICKED////////////////////////////////////////////////////////////////////
function mouseUp() {
    if (webstate == 0) {
        resetalltest();
        window.removeEventListener('mousemove', move, true);
    } else if (webstate == 1) {
        webstage1();
    } else if (webstate == 2) {
        webstage2();
    }
}



function removeAnimationTime(){
    h2eks2.style.transition = "0s";
    h2eks1.style.transition = "0s";

    var nodes = document.getElementById('menuside').getElementsByTagName("div");
    for(var i=0; i<nodes.length; i++) {
        nodes[i].style.transition = "0s";
    }
}

// MOVEABLE BAR RELEASED////////////////////////////////////////////////////////////////////
function mouseDown() {
    if (webstate == 0) {
        removeAnimationTime();
        LMenu.style.width = '50%';
        RMenu.style.width = 'initial';
        window.addEventListener('mousemove', move, true);
        moveBar.style.left = event.clientX + 'px';

        // skal nok laves on pageload
        startposbar = moveBar.style.left;
    }
}



// MENU BAR OG ANIMATION
var w = window.innerWidth;
var wmin = w / 5 + "px";
var wmax = (w / 5) * 4 + "px";
var LeftPercentage;
var RightPercentage;

function move() {

    var barpos = parseInt(moveBar.style.left, 10);
    var minpos = parseInt(wmin, 10);
    var maxpos = parseInt(wmax, 10);
    var startpos = parseInt(startposbar, 10);

    if (barpos >= minpos && barpos <= maxpos) {
        moveBar.style.left = event.clientX + 'px';
        LMenu.style.width = event.clientX + 'px';
        LeftPercentage = ((startpos) - (barpos)) / (startpos - minpos);
        RightPercentage = ((startpos) - (barpos)) / (startpos - maxpos);

        // filter animation
        LMenubg.style.filter = "grayscale(" + (bgGrayScale*100*LeftPercentage*100/100/100+bgGrayScale) + ") blur(" + (bgBlur - (RightPercentage * bgBlur) + "px)");
        RMenubg.style.filter = "grayscale(" + (bgGrayScale*100*RightPercentage*100/100/100+bgGrayScale) + ") blur(" + (bgBlur - (LeftPercentage * bgBlur) + "px)");

        // opacity animation
        if (RightPercentage <= 1 && RightPercentage >= 0) {
            LMenubg.style.opacity = bgBrightness*100*RightPercentage*100/100/100+bgBrightness;
        } else {
            LMenubg.style.opacity = bgBrightness;
        }
        if (LeftPercentage <= 1 && LeftPercentage >= 0) {
            RMenubg.style.opacity = bgBrightness*100*LeftPercentage*100/100/100+bgBrightness;
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
        window.addEventListener("wheel", updowntest, true)
        body.style.overflowY = "hidden";
            whatpage = 1;
        webstage1();
    } else if (barpos >= maxpos) {
        window.removeEventListener('mousemove', move, true);
        window.addEventListener("wheel", updowntest, true)
        body.style.overflowY = "hidden";
            whatpage = 1;
        webstage2();
    }
}

var upececuted = false;
var downececuted = false;


function updowntest(event) {
    console.log(event.deltaY)
    if (event.deltaY > 0) {
        if (upececuted == false) {
            upececuted = true;
            body.style.overflowY = "initial";
            window.removeEventListener("wheel", updowntest, true)
            console.log("removedwheel")
            downececuted = false;
        }
        



    } else if (event.deltaY < 0) {
        if (downececuted == false) {
            downececuted = true;
                webstatenow = 0;
                localStorage.setItem("webstatekey", webstatenow);
                webstate = localStorage.getItem("webstatekey");
                setTimeout(function(){ body.style.overflowY = "initial"; }, 1000);
                whatpage = 2;
            mouseUp();
            console.log(event.deltaY)
            window.removeEventListener("wheel", updowntest, true)
            upececuted = false;
    }

}
}

function webstage1() {
    if (webstate != 1) {
        webstatenow = 1;
        localStorage.setItem("webstatekey", webstatenow);
        webstate = localStorage.getItem("webstatekey");
    }

    console.log(downececuted)
    console.log("addedwheel")
    // window.addEventListener("wheel", updowntest, true)
    upececuted = false;
    downececuted = false;
    // body.style.overflowY = "hidden";
    

    sectionwrap2.style.display = "initial";
    RMenu.style.transition = '0.3s';
    RMenu.style.width = '100%';

    LMenu.style.transition = '0.3s';
    LMenu.style.width = '0%';

    moveBar.style.transition = '0.3s';
    moveBar.style.opacity = '0';
    moveBar.style.left = '0';

    h2eks1.style.opacity = "0"
    h2eks2.style.opacity = "0"



    // forside.style.display = "none";

}

function webstage2() {
    if (webstate != 2) {
        webstatenow = 2;
        localStorage.setItem("webstatekey", webstatenow);
        webstate = localStorage.getItem("webstatekey");
    }

    console.log(downececuted)
    console.log("addedwheel")
    // window.addEventListener("wheel", updowntest, true)
    upececuted = false;
    downececuted = false;
    // body.style.overflowY = "hidden";
    

    sectionwrap1.style.display = "initial";
    RMenu.style.transition = '0.3s';
    RMenu.style.width = '0%';

    LMenu.style.transition = '0.3s';
    LMenu.style.width = '100%';

    moveBar.style.transition = '0.3s';
    moveBar.style.opacity = '0';
    moveBar.style.left = '100%';

    h2eks1.style.opacity = "0"
    h2eks2.style.opacity = "0"



    // forside.style.display = "none";

}