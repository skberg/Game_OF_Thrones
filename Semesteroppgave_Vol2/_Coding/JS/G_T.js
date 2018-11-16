fetch('https://anapioficeandfire.com/api/houses')
    .then(function(response) {
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

        // mylist.setAttribute('id', myJson[i].gender + i);
     
        
       
     
        
   
       

        
        

// For å putte ting inn i andre ting        
        MyDiv.appendChild(MyHEding);
        MyDiv.appendChild(Myprag);
        MyDiv.appendChild(MyImg);
  
        MyDiv.appendChild(mylist);

        cards.appendChild(MyDiv);
        myCont.appendChild(cards);
        
    
  
     
        
   



      Myprag.innerHTML = myJson[i].name;
  
   
      Mylistitem_Region.innerHTML = myJson[i].culture;
      Mylistitem_Codeofarms.innerHTML = myJson[i].born;
      Mylistitem_Words.innerHTML = myJson[i].words;
      Mylistitem_titles.innerHTML = myJson[i].titles;

    }
  

   

  } 




