let mic, fft;
let soundCounter = 10;

function snekKeyboard(highestFreq) {
  var counterC5 = 0;
  var counterD5 = 0;
  var counterE5 = 0;
  var counterG5 = 0;
  var counterA5 = 0;
  var counterB5 = 0;
  if (highestFreq > 500 && highestFreq < 550) { //if playing a C5 or C#5       
    counterC5++; 
    counterD5 = 0;
    counterE5 = 0;
    counterG5 = 0;
    counterA5 = 0;
    counterB5 = 0;              
      
    if(counterC5 == soundCounter){
        
      window.dispatchEvent(new KeyboardEvent('keydown', { //left arrow
        key: "left arrow",
        keyCode: 37,
        which: 37,
      }));
    }
  } else if(highestFreq > 550 && highestFreq < 615) { //if playing a D5 or D#5
    counterC5 = 0; 
    counterD5++;
    counterE5 = 0;
    counterG5 = 0;
    counterA5 = 0;
    counterB5 = 0;
    if(counterD5 == soundCounter){
      
      window.dispatchEvent(new KeyboardEvent('keydown', {
        key: "up arrow",
        keyCode: 38,
        which: 38,
      }));
    
    }
  } else if(highestFreq > 615 && highestFreq < 685) { //if playing a E5 or E#5
    counterC5 = 0; 
    counterD5 = 0;
    counterE5++;
    counterG5 = 0;
    counterA5 = 0;
    counterB5 = 0;
    if(counterE5 == soundCounter){
        
      window.dispatchEvent(new KeyboardEvent('keydown', {
        key: "right arrow",
        keyCode: 39,
        which: 39,
      }));
    }
  } else if(highestFreq > 685 && highestFreq < 800) { //if playing a G5 or G#5
    counterC5 = 0; 
    counterD5 = 0;
    counterE5 = 0;
    counterG5++;
    counterA5 = 0;
    counterB5 = 0;
    if(counterG5 == soundCounter){
        
      window.dispatchEvent(new KeyboardEvent('keydown', {
        key: "down arrow",
        keyCode: 40,
        which: 40,
 

        metaKey: false
      }));
    }
  } else if(highestFreq > 800 && highestFreq < 920) { //if playing a A5 or A#5
    counterC5 = 0; 
    counterD5 = 0;
    counterE5 = 0;
    counterG5 = 0;
    counterA5++;
    counterB5 = 0;
    if(counterA5 == soundCounter){
        
      window.dispatchEvent(new KeyboardEvent('keydown', {
        key: "e",
        keyCode: 69,
        code: "KeyE",
        which: 69,
        shiftKey: false,
        ctrlKey: false,
        metaKey: false
      }));
      window.dispatchEvent(new KeyboardEvent('keydown', {
        key: "e",
        keyCode: 69,
        code: "KeyE",
        which: 69,
        shiftKey: false,
        ctrlKey: false,
        metaKey: false
      }));
    }
  } else if(highestFreq > 920 && highestFreq < 1020) { //if playing a B5 or C6
    counterC5 = 0; 
    counterD5 = 0;
    counterE5 = 0;
    counterG5 = 0;
    counterA5 = 0;
    counterB5++;
    if(counterB5 == soundCounter){
        
      window.dispatchEvent(new KeyboardEvent('keydown', {
        key: "e",
        keyCode: 69,
        code: "KeyE",
        which: 69,
        shiftKey: false,
        ctrlKey: false,
        metaKey: false
      }));
      
      window.dispatchEvent(new KeyboardEvent('keydown', {
        key: "e",
        keyCode: 69,
        code: "KeyE",
        which: 69,
        shiftKey: false,
        ctrlKey: false,
        metaKey: false
      }));
    }
  }
};
//för hps, hitta alla höga frekvenser, hitta kvot/multipel mellan dem --> gör algoritm för hps
function getLoudestFrequency(Spectra) {
  var nyquist = sampleRate() / 2; // 22050
  var numberOfBins = Spectra.length;
  var maxAmp = 0;
  var largestBin;
  
  for (var i = 0; i < numberOfBins; i++) {
    var thisAmp = Spectra[i]; // amplitude of current bin     
      if (thisAmp > maxAmp) {
          maxAmp = thisAmp;
          largestBin = i;
      }      
  }
  var loudestFreq = largestBin * (nyquist / numberOfBins);
  return [loudestFreq, maxAmp];
}

function hps(Spectra, n){
  let hpsParts = [];
  let newSpectra = [];
  for(let i = 0; i < n; i++){
    hpsParts[i] = downSample(Spectra,i+1);
  }

  for(let i = 0; i < hpsParts[n-1].length; i++){   
    let number; 
    for(let j = 0; j < n; j++){
      number = 1;
      number *= hpsParts[j][i];
    }  
    newSpectra[i] = number;
  }
  return newSpectra;
}

function downSample(Spectra, n){
  let counter = 0;
  for(let i = 0; i < Spectra.length; i = i + n){
    Spectra[counter] = Spectra[i];    
    counter++;
  }
  return Spectra;
}

function setup() {
  createCanvas(710, 400);
  noFill();
  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT();
  fft.setInput(mic);
 }


function draw() {
  background(200);

  let spectrum = fft.analyze();
  let highestFreq_maxA;
  
  highestFreq_maxA = getLoudestFrequency(spectrum); //highestFreq_maxA[0] == loudest freq, highestFreq_maxA[1] == max amp
  
  beginShape();
  for (i = 0; i < spectrum.length; i++) {
    vertex(i, map(spectrum[i], 0, highestFreq_maxA[1], height, 0));
  }
  endShape();
  spectrum = hps(spectrum, 5);
  console.log(highestFreq_maxA[0]);

}
