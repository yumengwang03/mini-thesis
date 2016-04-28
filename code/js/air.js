var airBubbles1 = [];
var airBubbles2 = [];
var bubbleWords = [];
var airBubbleRunOnce;
var airBubbleStarted = false;

function airSetup() {
  airBubbleRunOnce = 0;
  bubbleWords = ["air", "complementary", "transparent", "keyboard", "banana", "texture", "tangible", "blue", "knitting", "pencil", "innovative", "carbon"];
}

function airDraw() {
  if (airBubbleRunOnce < 1) {
    for (var p = 0; p < width / 400; p++) {
      airBubbles1.push(new AirBubble(bubbleWords[floor(random(0, bubbleWords.length))]));
      airBubbles2.push(new AirBubble());
    }
    airBubbleRunOnce++;
    airBubbleStarted = true;
  }
  if (airBubbleStarted) {
    for (var p = 0; p < airBubbles1.length; p++) {
      for (var q = 0; q < airBubbles1.length / 2; q++) {
        airBubbles1[p].update((p + 1) * width / 4, (q + 1) * width / 4);
      }
    }
    for (var m = 0; m < airBubbles2.length; m++) {
      for (var n = 0; n < airBubbles2.length / 2; n++) {
        airBubbles2[m].update((m + 1) * width / 4 - width / 8, (n + 1) * width / 4 + width / 8);
      }
    }
  }
}

function AirBubble(word) {
  this.pos = createVector(0, 0);
  this.size = 0;
  this.largeSize = 100;
  this.smallSize = 10;
  this.bubble = createP(word);
  this.bubble.position(width/2, width/2);

  this.update = function(xTranslate, yTranslate) {
    this.xTranslate = xTranslate - displayWidth / 14;
    this.yTranslate = yTranslate - displayHeight / 4;

    resetMatrix();
    translate(this.xTranslate, this.yTranslate);
    for (var i = 0; i < 360; i += 90) {
      for (var j = 0; j < 360; j += 90) {
        this.pos.x = sin(radians(i)) * 80 + sin(radians(j + frameCount)) * 80;
        this.pos.y = cos(radians(i)) * 80 + cos(radians(j + frameCount)) * 80;
        this.size = map(dist(this.pos.x, this.pos.y, 0, 0), 0, 150, this.largeSize, this.smallSize);
        this.bubble.position(this.pos.x, this.pos.y);

        // stroke(230, 226, 226, alphaVal);
        // //stroke(color1);
        // strokeWeight(10);
        // noFill();
        // ellipse(1.5 * x, y, s, s);
        // stroke(252, 13, 184, alphaVal);
        // //stroke(color2);
        // strokeWeight(5);
        // ellipse(x, 1.5 * y, s, s);
      }
    }
  };
}