/* No draw algorithm
512x512 24FPS
1024x1024 5FPS
*/
var nofps=false;
class Gameoflife {
  constructor() {
      document.body.innerHTML = "<canvas width=512 height=512 id='c'></canvas>";
      const canvas = document.getElementById('c');
      const gpu = new GPU({
        canvas: canvas,
        mode: 'gpu'
      });
      const dim = 512;

      this.kernel = gpu.createKernel(
        function(x) {
          var val = x[this.thread.x][this.thread.y]*255
          this.color(val,val,val);
        },
        {
          useLegacyEncoder: true,
          output: [dim, dim],
          graphical: true
        }
      );
      this.cols=dim;
      this.rows=dim;
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

    this.kernel(this.grid)
  }

  draw(){
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
