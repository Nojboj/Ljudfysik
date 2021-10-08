function marioKeyboard(highestFreq) {
    document.addEventListener("keypress", function(e) {
      });
      var e = new Event("keypress");
      
      
      var counterC5 = 0;
      var counterD5 = 0;
      var counterE5 = 0;
      var counterG5 = 0;
      var counterA5 = 0;
      var counterB5 = 0;


      if (highestFreq > 500 && highestFreq < 550) { //if playing a C5 or C#5       
        counterD5 = 0;
        counterE5 = 0;
        counterG5 = 0;
        counterA5 = 0;
        counterB5 = 0;              
        counterC5++;
        
        if(counterC5 == 10){
            
            e.which = 'Arrow Left';
            e.key = 'Arrow Left';
            
            document.dispatchEvent(e);
        }
      } else {
          
      }
  } export function marioKeyboard();