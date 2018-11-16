console.log("you");

fetch('https://anapioficeandfire.com/api/houses')
    .then(function(response) {
        console.log(response);
        return response.json();
    })
    .then(function(myJson) {
        CardElm(myJson);
    });    


    var myCont = document.getElementById("Conts");


  function CardElm(myJson){
    
    
   // Fix
    var cards = document.createElement("div");
   
    cards.setAttribute("class", "cardElement");
    
    
    
    for (var i = 0; i < myJson.length; i++) {

 // lager elementene 
        var MyDiv = document.createElement("div");
        var MyHEding = document.createElement("h1");
        var Myprag= document.createElement("p");
        var MyImg = document.createElement("img");
        var mylist = document.createElement("ul");
        var myBar = document.createElement("div");
        var myBar2 = document.createElement("div");
        var myBar3 = document.createElement("div");
        
        
        for ( var y = 0; y < 1; y++ ){ 
        var Mylistitem_Region = document.createElement("li");
        var Mylistitem_Words = document.createElement("li");
        var Mylistitem_Codeofarms= document.createElement("li");
        var Mylistitem_titles = document.createElement("li");
     
        mylist.appendChild(Mylistitem_Region);
        mylist.appendChild(Mylistitem_Words);
        mylist.appendChild(Mylistitem_Codeofarms);
        mylist.appendChild(Mylistitem_titles);


      
        }
   
       




 // sette classe navn 
        MyDiv.setAttribute("class" , "[ cards ]");
        MyDiv.setAttribute("id",  i);
      
        Myprag.setAttribute('class', 'p');
        MyImg.setAttribute('class', 'img');
        MyImg.setAttribute('class', "nod" + i);
        mylist.setAttribute('class','list');
        Mylistitem_Region.setAttribute('id', myJson[i].region + i);
        Mylistitem_Words.setAttribute('id', myJson[i].words + i);
        Mylistitem_Codeofarms.setAttribute('id', myJson[i].coatOfArms + i);
        Mylistitem_titles.setAttribute('id', myJson[i].titles + i);
        myBar.setAttribute('class', "me" );
        myBar2.setAttribute('class', "me" );
        myBar3.setAttribute('class', "me" );

       

        // mylist.setAttribute('id', myJson[i].gender + i);
     
        
       
     
        
   
       

        
        

// For å putte ting inn i andre ting        
        MyDiv.appendChild(MyHEding);
        MyDiv.appendChild(Myprag);
        MyDiv.appendChild(MyImg);
      
        MyDiv.appendChild(mylist);
        MyDiv.appendChild(myBar);
        MyDiv.appendChild(myBar2);
        MyDiv.appendChild(myBar3);
       
      


        cards.appendChild(MyDiv);
        myCont.appendChild(cards);
        
    
  
     
        
   



      Myprag.innerHTML = myJson[i].name;
  
   
      Mylistitem_Region.innerHTML = myJson[i].region;
      Mylistitem_Codeofarms.innerHTML = myJson[i].coatOfArms;
      Mylistitem_Words.innerHTML = myJson[i].words;
      Mylistitem_titles.innerHTML = myJson[i].titles;
      myBar.innerHTML= "<progress class='test' max='100' value='80'></progress>"
      myBar2.innerHTML= "<progress class='test' max='100' value='40'></progress>"
      myBar3.innerHTML= "<progress class='test' max='100' value='10'></progress>"

    }
  

   

  } 
  function move() {
    var elem = document.getElementById("myBar"); 
    var width = 1;
    var id = setInterval(frame, 10);
    function frame() {
        if (width >= 100) {
            clearInterval(id);
        } else {
            width++; 
            elem.style.width = width + '%'; 
        }
    }
}




