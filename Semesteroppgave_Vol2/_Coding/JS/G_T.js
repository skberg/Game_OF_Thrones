fetch('https://anapioficeandfire.com/api/characters')
    .then(function(response) {
        return response.json();
    })
    .then(function(myJson) {
        jævlapik(myJson)
    });    


  function jævlapik(myJson){
    var myCont = document.getElementById("Conts");
    var cards = document.createElement("div");
    cards.setAttribute("class", "Douche");
    for (var i = 0; i < myJson.length; i++) {
        console.log("Test"+i);
        var MyDiv = document.createElement("div");

        var heDing = document.createElement("h4");      //h4 
        
        // var loDing = document.createElement("div");   //ide 1
        // var loDing2 = document.createElement("div");  //id 2
        // var maSter = document.createElement("div");   //texst
        // var istum = document.createElement("i");            //i element
        // var unDheding = document.createElement("h5");       //h5 
        // var teXste = document.createElement("p");       //mini over skrift
        // var texIste = document.createElement("i");      // i element
        // var buTTons = document.createElement("button"); 

// Navn.setAttribute("class", "classenavn" + i)
        console.log(heDing);
    
         MyDiv.setAttribute("class" , "card");
         MyDiv.setAttribute("id", i);
         cards.appendChild(MyDiv);
         MyDiv.appendChild(heDing);
  

      
        
        
        MyDiv.innerHTML = "card" + i;
        heDing.innerHTML = "dette er en tekst ";
        

    }
    Conts.appendChild(cards);
    console.log(myJson);

  }

  var body = document.getElementById("bd");


  //for loop to make 10 card 
//   for (var i = 1; i < 10; i++) {
    
//   }