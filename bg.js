class bg{
    constructor(game){
        this.game = game ;
    }
    update(){

    }
    drawLine(startPos , endPos){
        
        this.game.ctx.strokeStyle = '#d9d9d9'
        this.game.ctx.lineWidth = 1 
        this.game.ctx.beginPath()
        this.game.ctx.moveTo(startPos.x , startPos.y) ;
        this.game.ctx.lineTo(endPos.x , endPos.y);
        this.game.ctx.stroke()
    }
    draw(){
      var start  = 0 ;
      while(start<SCREEN_WIDTH+100){
          start += 40 ;
          this.draw({x:start-10  , y : SCREEN_HEIGHT} , { x: start , y : SCREEN_HEIGHT})
      }
        

    }
}