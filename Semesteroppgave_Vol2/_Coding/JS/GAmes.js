switch (localStorage.getItem("player 1")) {
    case "House Algood":
        //var el = document.getElementById("yabanner");
        //el.innerHTML="<img src=\"./Bilde/Icons/Hand_Dark_Red.svg\" width=\"100%\" height=\"50%\">";
        break;
    case "House Allyrion of Godsgrace":
        //var el = document.getElementById("yabanner");
        //el.innerHTML="<img src=\"./Bilde/Icons/Hand_Dark_Red.svg\" width=\"100%\" height=\"50%\">";
        break;
    case "House Allyrion of Godsgrace":
        //var el = document.getElementById("yabanner");
        // el.innerHTML="<img src=\"./Bilde/Icons/Hand_Dark_Red.svg\" width=\"100%\" height=\"50%\">";
        break;
    case "House Amber":
        //var el = document.getElementById("yabanner");
        //el.innerHTML="<img src=\"./Bilde/Icons/Hand_Dark_Red.svg\" width=\"100%\" height=\"50%\">";
        break;
    case "House Ambrose":
        //var el = document.getElementById("yabanner");
        //el.innerHTML="<img src=\"./Bilde/Icons/Hand_Dark_Red.svg\" width=\"100%\" height=\"50%\">";
        break;
    case "House Appleton of Appleton":
        //var el = document.getElementById("yabanner");
        //el.innerHTML="<img src=\"./Bilde/Icons/Hand_Dark_Red.svg\" width=\"100%\" height=\"50%\">";
        break;
    case "House Arryn of Gulltown":
        //var el = document.getElementById("yabanner");
        //el.innerHTML="<img src=\"./Bilde/Icons/Hand_Dark_Red.svg\" width=\"100%\" height=\"50%\">";
        break;
    case "House Arryn of the Eyrie":
        //var el = document.getElementById("yabanner");
        //el.innerHTML="<img src=\"./Bilde/Icons/Hand_Dark_Red.svg\" width=\"100%\" height=\"50%\">";
        break;
    case "House Ashford of Ashford":
        //var el = document.getElementById("yabanner");
        el.innerHTML = "<img src=\"./Bilde/Icons/Hand_Dark_Red.svg\" width=\"100%\" height=\"50%\">";
        break;
    case "House Ashwood":
        //var el = document.getElementById("yabanner");
        el.innerHTML = "<img src=\"./Bilde/Icons/Hand_Dark_Red.svg\" width=\"100%\" height=\"50%\">";
        break;
    case "House Baelish of Harrenhal":
        //var el = document.getElementById("yabanner");
        //el.innerHTML="<img src=\"./Bilde/Icons/Hand_Dark_Red.svg\" width=\"100%\" height=\"50%\">";
        break;

    default:
        console.log("work, no info")

}

switch (localStorage.getItem("player 2")) {
    case "House Algood":
        //      var el = document.getElementById("yabanner");
        //    el.innerHTML="<img src=\"./Bilde/Icons/Hand_Dark_Red.svg\" width=\"100%\" height=\"50%\">";
        break;
    case "House Allyrion of Godsgrace":
        //var el = document.getElementById("yabanner");
        //el.innerHTML="<img src=\"./Bilde/Icons/Hand_Dark_Red.svg\" width=\"100%\" height=\"50%\">";
        break;
    case "House Allyrion of Godsgrace":
        //var el = document.getElementById("yabanner");
        //el.innerHTML="<img src=\"./Bilde/Icons/Hand_Dark_Red.svg\" width=\"100%\" height=\"50%\">";
        break;
    case "House Amber":
        //var el = document.getElementById("yabanner");
        //el.innerHTML="<img src=\"./Bilde/Icons/Hand_Dark_Red.svg\" width=\"100%\" height=\"50%\">";
        break;
    case "House Ambrose":
        //var el = document.getElementById("yabanner");
        //el.innerHTML="<img src=\"./Bilde/Icons/Hand_Dark_Red.svg\" width=\"100%\" height=\"50%\">";
        break;
    case "House Appleton of Appleton":
        //var el = document.getElementById("yabanner");
        //el.innerHTML="<img src=\"./Bilde/Icons/Hand_Dark_Red.svg\" width=\"100%\" height=\"50%\">";
        break;
    case "House Arryn of Gulltown":
        //var el = document.getElementById("yabanner");
        //el.innerHTML="<img src=\"./Bilde/Icons/Hand_Dark_Red.svg\" width=\"100%\" height=\"50%\">";
        break;
    case "House Arryn of the Eyrie":
        //var el = document.getElementById("yabanner");
        //el.innerHTML="<img src=\"./Bilde/Icons/Hand_Dark_Red.svg\" width=\"100%\" height=\"50%\">";
        break;
    case "House Ashford of Ashford":
        //var el = document.getElementById("yabanner");
        //el.innerHTML="<img src=\"./Bilde/Icons/Hand_Dark_Red.svg\" width=\"100%\" height=\"50%\">";
        break;
    case "House Ashwood":
        var el = document.getElementById("yabanner");
        el.innerHTML = "<img src=\"./Bilde/Icons/Hand_Dark_Red.svg\" width=\"100%\" height=\"50%\">";
        break;
    case "House Baelish of Harrenhal":

        console.log(myImage);
        break;

    default:
        console.log("work, no info")
}









function rollDice() {
    var die1 = document.getElementById("die1");
    var d1 = Math.floor(Math.random() * 6) + 1;
    die1.innerHTML = d1;
}