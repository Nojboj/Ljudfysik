let mic, fft;

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
  return loudestFreq;
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

  let frequency = getLoudestFrequency();
  console.log(frequency);

  beginShape();
  for (i = 0; i < spectrum.length; i++) {
    vertex(i, map(spectrum[i], 0, 255, height, 0));
  }
  endShape();
}
