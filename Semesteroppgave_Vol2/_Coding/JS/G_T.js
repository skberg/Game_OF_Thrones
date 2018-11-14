fetch('https://anapioficeandfire.com/api/characters')
    .then(function(response) {
        return response.json();
    })
    .then(function(myJson) {
        CardElm(myJson);
    });    


    var myCont = document.getElementById("Conts");


  function CardElm(myJson){
    
    
   
    var cards = document.createElement("container");
   
    cards.setAttribute("class", "cardElement");
    
    
    
    for (var i = 0; i < myJson.length; i++) {


        var MyDiv = document.createElement("div");
        var MyDiv2 = document.createElement("h1");
        var prag = document.createTextNode("ptest")
         //h4 
   
       



        
        


        Conts.appendChild(cards);
        myCont.appendChild(cards);
        
        cards.appendChild(MyDiv);
        MyDiv.appendChild(MyDiv2);
        MyDiv2.appendChild(prag);
      
        
    
       
        





         MyDiv.setAttribute("class" , "[ cards ]", 'id', + i);
         MyDiv.setAttribute('num', i);
         MyDiv2.setAttribute('prag', i);
        
      
        
         
       
        console.log(prag);
      
       
        
  

      
        
      
        MyDiv.innerHTML = "card" + i;
        MyDiv.innerHTML = "heDing" + i;
    
        MyDiv2.innerHTML = "This is a test card for Noroff it is number  " + i;
        prag.innerHTML = "hello World";

      
        

    }
  
   //
   

  } 




