fetch('https://anapioficeandfire.com/api/houses')
    .then(function (response) {

        return response.json();
    })
    .then(function (myJson) {
        CardElm(myJson);
    });


var myCont = document.getElementById("Conts");

var play1 = {
    house: "#",
    tile: 0


}
var play2 = {
    house: "#",
    tile: 0


}

                            ////Rensker localhost and making the user changs player 

function mybuttonClear(){
    localStorage.clear(); 
    location.reload();
    document.getElementById(play1.house).style.border = "none";
    document.getElementById(play2.house).style.border = "none";
}
    
function CardElm(myJson) {


    // Fix
    var cards = document.createElement("div");

    cards.setAttribute("class", "[ cardElement ]");

    var masterHEd = document.createElement("h1");

    for (let i = 0; i < myJson.length; i++) {

        // lager elementene 

        var MyDiv = document.createElement("div");
        var MyHEding = document.createElement("h1");
        var Myprag = document.createElement("h5");
        var MyImg = document.createElement("div");
        var mylist = document.createElement("ul");
        var myBar = document.createElement("div");
        var myBar2 = document.createElement("div");




        for (var y = 0; y < 1; y++) {
            var Mylistitem_Region = document.createElement("li");
            var Mylistitem_Words = document.createElement("li");
            var Mylistitem_Codeofarms = document.createElement("li");

            mylist.appendChild(Mylistitem_Region);
            mylist.appendChild(Mylistitem_Words);
            mylist.appendChild(Mylistitem_Codeofarms);




        }






        // sette classe navn 
        MyDiv.setAttribute("class", "[ cards ]");
        MyDiv.setAttribute("id", myJson[i].name);

        Myprag.setAttribute('class', 'p');
        MyImg.setAttribute('class', 'img');
        MyImg.setAttribute('class', "nod" + i);
        mylist.setAttribute('class', 'list');
        Mylistitem_Region.setAttribute('id', myJson[i].region + i);
        Mylistitem_Words.setAttribute('id', myJson[i].words + i);
        Mylistitem_Codeofarms.setAttribute('id', myJson[i].coatOfArms + i);

        myBar.setAttribute('class', "me");









        MyDiv.addEventListener("click", function () {
            if (play1.house === "#") {
                play1.house = myJson[i].name;
                localStorage.setItem("player 1", play1.house);
                console.log(play1.house);
                document.getElementById(play1.house).style.border = "5px solid #375DAA";
            } else if (play2.house === "#") {
                play2.house = myJson[i].name;
                localStorage.setItem("player 2", play2.house);
                document.getElementById(play2.house).style.border = "5px solid #57883D";
            }
            console.log(play1);
            console.log(play2);
        })





        localStorage.getItem("player 1");


       console.log(play1);








        // For å putte ting inn i andre ting        
        MyDiv.appendChild(MyHEding);
        MyDiv.appendChild(Myprag);
        MyDiv.appendChild(MyImg);

        MyDiv.appendChild(mylist);
        MyDiv.appendChild(myBar);
        MyDiv.appendChild(myBar2);





        cards.appendChild(MyDiv);
        myCont.appendChild(cards);









        Myprag.innerHTML = myJson[i].name;


        Mylistitem_Region.innerHTML = myJson[i].region;
        Mylistitem_Codeofarms.innerHTML = myJson[i].coatOfArms;
        Mylistitem_Words.innerHTML = myJson[i].words;

        myBar.innerHTML = "<progress class='test[i]' max='100' value='80'></progress>"
       
        myBar2.innerHTML = "<progress class='test' max='100' value='40'></progress>"


    }




}


