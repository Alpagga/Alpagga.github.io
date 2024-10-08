function sketch18(p) {

    let additive =true;
    let filling = false; //color lines only or fill?
    //if fill, black outline?
    let blackLines = false; //only when filling
    let chromatic = true;
    let sw = 1; // strokeWeight if there are lines
    let sat = 100; // def 100
    let brt = 70; // def 70
    let alph = 30; // def 30
    let rate = 0.5; //rate of pedal change 0.5
    let hueyD = 1.4; //rate of color change 1.4
    let range = 180; // color range
    let numColors = 5; // for chromatic
    let fr = 24; //framerate 24
    let chance = 0.1; //chance in 10 of reversal 0.1
    let array1 = [];
    let newArray = [];
    let paused = false;
    let x1D, x2D, y2D, x3D, y3D, x4D;
    let x1,
        x2,
        y2,
        x3,
        y3,
        x4,
        huey,
        ang,
        currR,
        maxY2,
        maxY3,
        ped,
        lay,
        hueyPrelim,
        hueyMax;

    p.setup = function() {
        p.createCanvas(p.windowWidth, p.windowHeight);  
        
        p.frameRate(fr); //comment out = more speed
        let maxSize = p.min(p.windowWidth, p.windowHeight) - 20;
        //createCanvas(maxSize, maxSize);
        p.angleMode(p.DEGREES);
        p.colorMode(p.HSB, 360, 100, 100, 100);
        let rMax = p.windowWidth / 2;
        p.newArt();
    };

    p.windowResized = function() {
        p.resizeCanvas(p.windowWidth, p.windowHeight);  // Resize canvas on window resize
        p.background(0)
    };

    p.draw = function() {
        if (additive ==false){
            p.background(0); alph = 40; brt=90;
            if(filling==false){alph =100;brt=90}
          }
          //background(0,0,0,0.5);
          newArray = [];
          p.push();
          p.translate(p.windowWidth / 2, p.windowHeight / 2);
          //background(0);
          // calculate points for each layer, starting with outside pedals and going inward
          for (let k = lay; k > 0; k--) {
            let place = (lay - k) * 14;
            let x1N = array1[place + 0];
            let x2N = array1[place + 1];
            let y2N = array1[place + 2];
            let x3N = array1[place + 3];
            let y3N = array1[place + 4];
            let x4N = array1[place + 5];
            let x1Nd = array1[place + 6];
            let x2Nd = array1[place + 7];
            let y2Nd = array1[place + 8];
            let x3Nd = array1[place + 9];
            let y3Nd = array1[place + 10];
            let x4Nd = array1[place + 11];
            let hueyN = array1[place + 12];
            let hueyNd = array1[place + 13];
            currR = (k / lay) * (p.windowWidth / 2);
        
            x1N += x1Nd;
            if (x1N < 0.35 * currR || x1N > 0.45 * currR || p.random(10) < chance) {
              x1Nd *= -1;
            }
            x2N += x2Nd;
            if (x2N < 0.5 * currR || x2N > 0.7 * currR || p.random(10) < chance) {
              x2Nd *= -1;
            }
            maxY2 = x2N * p.tan(ang) * 0.9;
            y2N += y2Nd;
            if (y2N < 0.06 * currR || y2N > maxY2 || p.random(10) < chance) {
              y2Nd *= -1;
            }
            x3N += x3Nd;
            if (x3N < x2N * 1.1 || x3N > 0.85 * currR || p.random(10) < chance) {
              x3Nd *= -1;
            }
            maxY3 = x3N * p.tan(ang) * 0.9;
            y3N += y3Nd;
            if (y3N < 0.06 * currR || y3N > maxY3 || p.random(10) < chance) {
              y3Nd *= -1;
            }
            x4N += x4Nd;
            if (x4N < 0.88 * currR || x4N > 0.99 * currR || p.random(10) < chance) {
              x4Nd *= -1;
            }
        
            hueyN += hueyNd;
            if (chromatic == true) {
              if (
                hueyN > 360 ||
                hueyN > hueyMax ||
                hueyN < 0 ||
                hueyN < hueyPrelim ||
                p.random(10) < chance
              ) {
                hueyNd *= -1;
              }
            } else {
              if (hueyN > 359) {
                hueyN = 0;
              }
              if (hueyN < 0) {
                hueyN = 359;
              }
              if (p.random(10) < chance) {
                hueyNd *= -1;
              }
            }
        
            if (filling == false) {
                p.noFill();
              p.strokeWeight(sw);
              p.stroke(hueyN, sat, brt, alph);
            } else {
              if (blackLines == false) {
                p.noStroke();
              } else {
                p.stroke(0);
              }
              p.fill(hueyN, sat, brt, alph);
            }
        
            newArray.push(
              x1N,
              x2N,
              y2N,
              x3N,
              y3N,
              x4N,
              x1Nd,
              x2Nd,
              y2Nd,
              x3Nd,
              y3Nd,
              x4Nd,
              hueyN,
              hueyNd
            );
            
            
            // draw the pedals for one layer
            for (let i = 0; i < ped; i++) {
              p.beginShape();
              p.curveVertex(x4N, 0);
              p.curveVertex(x4N, 0);
              p.curveVertex(x3N, y3N);
              p.curveVertex(x2N, y2N);
              p.curveVertex(x1N, 0);
              p.curveVertex(x2N, -y2N);
              p.curveVertex(x3N, -y3N);
              p.curveVertex(x4N, 0);
              p.curveVertex(x4N, 0);
              p.endShape();
              p.rotate(ang);
            }
            p.rotate(ang / 2);
          }
          p.pop();
          array1 = newArray;
    };

    p.newArt = function() {
        p.background(0);
        array1 = [];
        ped = p.round(p.random(8, 25)); // 8 to 25
        lay = p.random(4, 30); //4, 40+ takes more processing
        ang = 360 / ped;
        hueyPrelim = p.random(360);
        hueyMax = hueyPrelim + range;
        let colorPlace = 0;
      
        // calculate STARTING hues and points for each layer, starting with outside pedals and going inward, and save them plus directions to array
        for (let j = lay; j > 0; j--) {
          currR = (j / lay) * (p.windowWidth / 4);
          x1 = p.random(0.35 * currR, 0.45 * currR);
          x2 = p.random(0.5 * currR, 0.7 * currR);
          maxY2 = x2 * p.tan(ang) * 0.9;
          y2 = p.random(0.06 * currR, maxY2);
          x3 = p.random(x2 * 1.1, 0.85 * currR);
          maxY3 = x3 * p.tan(ang) * 0.9;
          y3 = p.random(0.06 * currR, maxY3);
          x4 = p.random(0.88 * currR, 0.99 * currR);
          x1D = x2D = y2D = x3D = y3D = x4D = (rate / lay) * j;
      
          if (chromatic == true) {
            huey = hueyPrelim + (colorPlace * range) / numColors;
            if (huey > 360) {
              huey -= 360;
            }
            colorPlace++;
            if (colorPlace > numColors) {
              colorPlace = 0;
            }
          } else {
            huey = p.random(360);
          }
          array1.push(
            x1,
            x2,
            y2,
            x3,
            y3,
            x4,
            x1D,
            x2D,
            y2D,
            x3D,
            y3D,
            x4D,
            huey,
            hueyD
          );
        }
        if (paused) {
            p.draw();
        }
      }
}

// Create and return a new p5 instance
currentP5Instance = new p5(sketch18);