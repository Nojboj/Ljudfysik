let mic, fft;
let threshold = 0.3;

//för hps, hitta alla höga frekvenser, hitta kvot/multipel mellan dem --> gör algoritm för hps
function getLoudestFrequency() {
  var nyquist = sampleRate() / 2; // 22050
  var spectrum = fft.analyze(); // array of amplitudes in bins
  var numberOfBins = spectrum.length;
  var maxAmp = 0;
  var largestBin;
  
  for (var i = 0; i < numberOfBins; i++) {
    var thisAmp = spectrum[i]; // amplitude of current bin     
      if (thisAmp > maxAmp) {
          maxAmp = thisAmp;
          largestBin = i;
      }      
  }


  var loudestFreq = largestBin * (nyquist / numberOfBins);
  return loudestFreq, maxAmp;
}

function removeNoise(Spectra, maxAmp){
  for (var i = 0; i < Spectra.length; i++){
    Spectra[i] = Spectra[i]/maxAmp;
    
    if(Spectra[i] < threshold){
      Spectra[i] = 0;
    }
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
  let highestFreq;
  let maxA;

  highestFreq, maxA = getLoudestFrequency();
  spectrum = removeNoise(spectrum, maxA);
  
  beginShape();
  for (i = 0; i < spectrum.length; i++) {
    vertex(i, map(spectrum[i], 0, 1, height, 0));
  }
  endShape();
}
