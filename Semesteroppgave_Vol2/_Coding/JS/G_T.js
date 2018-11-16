fetch('https://anapioficeandfire.com/api/characters')
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
        var Mylistitem_Name = document.createElement("li");
        var Mylistitem_Gend = document.createElement("li");
        var Mylistitem_Contry = document.createElement("li");
        var Mylistitem_Born = document.createElement("li");
        var Mylistitem_titles = document.createElement("li");
     
        mylist.appendChild(Mylistitem_Gend);
        mylist.appendChild(Mylistitem_Contry);
        mylist.appendChild(Mylistitem_Born);
        mylist.appendChild(Mylistitem_titles);


      
        }
   
       




 // sette classe navn 
        MyDiv.setAttribute("class" , "[ cards ]");
        MyDiv.setAttribute("id",  i);
      
        Myprag.setAttribute('class', 'p');
        MyImg.setAttribute('class', 'img');
        MyImg.setAttribute('class', "nod" + i);
        mylist.setAttribute('class','list');
        Mylistitem_Gend.setAttribute('id', myJson[i].gender + i);
        Mylistitem_Contry.setAttribute('id', myJson[i].culture + i);
        Mylistitem_Born.setAttribute('id', myJson[i].born + i);
        Mylistitem_titles.setAttribute('id', myJson[i].titles + i);

        // mylist.setAttribute('id', myJson[i].gender + i);
     
        
       
     
        
   
       

        
        

// For å putte ting inn i andre ting        
        MyDiv.appendChild(MyHEding);
        MyDiv.appendChild(Myprag);
        MyDiv.appendChild(MyImg);
    
        MyDiv.appendChild(mylist);

        cards.appendChild(MyDiv);
        myCont.appendChild(cards);
        
    
  
     
        
   



      Myprag.innerHTML = myJson[i].aliases;
  
      Mylistitem_Gend.innerHTML = myJson[i].gender;
      Mylistitem_Contry.innerHTML = myJson[i].culture;
      Mylistitem_Born.innerHTML = myJson[i].born;
      Mylistitem_titles.innerHTML = myJson[i].titles;

    }
  

   

  } 




