//64x64 3fps very bad.
class Gameoflife {
  constructor() {
      createCanvas(512,512);
      var resolution=8
      this.resolution=resolution;
      this.cols=width/resolution;
      this.rows=height/resolution;
      this.grid = this.makegrid(this.cols,this.rows);
  }

  next(){
    var newgrid=this.makeemptygrid(this.cols,this.rows);
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
        if (status==1 && (sum==3 || sum==2)) newgrid[h][k]=1;
        if (status==1 && ((sum<2) || (sum>3))) newgrid[h][k]=0;
        if (status==0 && sum==3) newgrid[h][k]=1;
      }
    }
    this.grid= newgrid;
  }

  draw(){

    for(var i=0;i<this.cols;i++){
      for(var j=0;j<this.rows;j++){
        let x=i*this.resolution;
        let y=j*this.resolution;
        let w=this.resolution;
        stroke(1)
        fill(this.grid[i][j]*99)
        rect(x,y,w,w)
      }
    }
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
