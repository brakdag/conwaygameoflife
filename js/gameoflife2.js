// 512x512 7FPS not bad.
// 64x64 60FPS
// 256x256 30FPS

class Gameoflife {
  constructor() {
    createCanvas(256,256);
    var resolution=1
    this.resolution=resolution;
      this.cols=width/resolution;
      this.rows=height/resolution;
      this.grid = this.makegrid(this.cols,this.rows);
      this.newgrid=this.makeemptygrid(this.cols,this.rows);
  }

  next(){
    this.newgrid=this.makeemptygrid(this.cols,this.rows);
    for(var h=0;h<this.grid.length;h++){
    for(var k=0;k<this.grid[0].length;k++){
        let sum = 0;
        var status=this.grid[h][k]
        for(var j=-1;j<=1;j++){
            for(var i=-1;i<=1;i++){
              let x = (h+i+this.grid.length) % this.grid.length;
              let y = (k+j+this.grid[0].length) % this.grid[0].length;
              sum+=this.grid[x][y];
            }
          }
        sum-= status;
        if (status==1 && (sum==3 || sum==2)) this.newgrid[h][k]=1;
        if (status==1 && ((sum<2) || (sum>3))) this.newgrid[h][k]=0;
        if (status==0 && sum==3) this.newgrid[h][k]=1;
      }
    }
    this.grid= this.newgrid.slice(0);
    redraw();
  }

  draw(){
    let pink = color(0);
    let d = pixelDensity();
    loadPixels();
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid.length; j++) {
        let index =  i*4 + j *4 *this.grid.length
        pixels[index]=this.grid[i][j]*red(pink)
        pixels[index+1]=this.grid[i][j]*green(pink)
        pixels[index+2]=this.grid[i][j]*blue(pink)
        pixels[index+3]=this.grid[i][j]*255
        }
    }
    updatePixels();
    this.next();
  }

  makeemptygrid(cols,rows){
    var grid = new Array(cols);
    for(var i =0;i<cols;i++){
      grid[i]=(new Array(rows)).fill(0);
    }
    return grid;
  }


  makegrid(cols,rows){
    var grid = new Array(cols);
    for(var i =0;i<cols;i++){
      grid[i]=(new Array(rows)).fill(0).map(a=>Math.trunc(Math.random()*2));
    }
    return grid;
  }
}
