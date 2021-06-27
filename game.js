
var score = 0
var start = true
class game{
    constructor(){
       
        this.pasue = false ;
        this.speed = 5
        this.vector = new Position(this.speed, 0)
        this.array = []
        this.checkFood = true ;
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.height = SCREEN_HEIGHT ;
        this.canvas.width = SCREEN_WIDTH ;
        document.querySelector('.body').appendChild(this.canvas)
        this.canvas.style.background = "#f2f2f2"
        
        this.x = 0
        this.y = 0
      
        this.init()
        this.naX = this.array[0].x
        this.naY = this.array[0].y
        this.listen()
        
        this.loop()
    }
    loop(){
      
        this.update()
     
        this.draw()
        this.eatFood()
       
        setTimeout(() => this.loop , 40)
        
       
    }
    listen(){
        window.addEventListener("keydown" ,(event) =>{



            var x = event.which ;
            
           
           if(this.vector.x!=this.speed && x === 37){
               this.vector.x=-this.speed
               this.vector.y=0
               
           }
          else{
             if(this.vector.y!=this.speed && x ===38){
                this.vector.x=0
                this.vector.y=-this.speed
             }
             else{
                 if(this.vector.x!=-this.speed&& x===39){
                     this.vector.x=this.speed
                     this.vector.y=0
                 }
                 else{
                     if(this.vector.y!=-this.speed && x=== 40){
                         this.vector.y=this.speed
                         this.vector.x = 0
                     }
                 }
             }
          }
           
        
           
    })}

    update(){
      
       this.naY +=this.vector.y
       this.naX +=this.vector.x

       this.updateArray()
       if(this.naX>SCREEN_WIDTH) this.naX =0
       if(this.naY>SCREEN_HEIGHT) this.naY =0
       if(this.naX<0) this.naX =SCREEN_WIDTH
       if(this.naY<0) this.naY =SCREEN_HEIGHT

            
    }

        
   

    
    clearScreen(){
        this.ctx.fillStyle = "#f2f2f2" ;
        this.ctx.fillRect(0,0,SCREEN_WIDTH ,SCREEN_HEIGHT)
        
        
      
    
    
    }
    draw(){
        this.clearScreen()
       this.drawVC()
     this.drawFood()
        while(this.x<SCREEN_WIDTH){
        this.ctx.strokeStyle = '#d9d9d9'
        this.ctx.lineWidth = 0.5
        this.ctx.beginPath()
        this.ctx.moveTo(this.x , 0) ;
        this.ctx.lineTo( this.x, SCREEN_HEIGHT);
        this.ctx.stroke()
       
        this.x = this.x+20
        }
        this.x =0
        while(this.y<SCREEN_HEIGHT){
           
            this.ctx.lineWidth = 0.5
            this.ctx.beginPath()
            this.ctx.moveTo(this.x , this.y) ;
            this.ctx.lineTo( SCREEN_WIDTH, this.y);
            this.ctx.stroke()
           
            this.y = this.y+20
            }
            this.y=0
            this.drawVC()
            this.drawFood()
            this.drawsnake()
            this.drawEye()
           

            
       
}
init(){
     var count = 0 ;
    for(let i = 10 ; i<SCREEN_WIDTH ; i++){
      if(i%6==0){
        var pos = new Position(SCREEN_WIDTH-500-i, 50 );
        this.array.push(pos) ;
        count++
       
      }  
      if(count===20) break ;
    }

}
drawsnake(){
   
    for( let i = 0 ; i <this.array.length; i++){
       
          if(i===this.array.length-1 ||i===this.array.length-2||i===this.array.length-3){
            this.ctx.fillStyle = "#111"
            this.ctx.beginPath()
            this.ctx.arc(this.array[this.array.length-1-i].x , this.array[this.array.length-1-i].y, 10 , 0 , Math.PI*2)
            this.ctx.fill()

          } else{
              if(i%4==0){
                this.ctx.fillStyle = "#111"
                this.ctx.beginPath()
                this.ctx.arc(this.array[this.array.length-1-i].x , this.array[this.array.length-1-i].y, 10 , 0 , Math.PI*2)
                this.ctx.fill()
              }else{

               
              
                this.ctx.fillStyle ="red"
                this.ctx.beginPath()
                this.ctx.arc(this.array[this.array.length-1-i].x, this.array[this.array.length-1-i].y , 10 , 0 , Math.PI*2)
                this.ctx.fill()
              }
          }
          
    }
   




    
}
drawFood(){
   
if(this.checkFood){
 this.foodX = Math.floor(Math.random() * 700) + 30 
 this.foodY = Math.floor(Math.random() * 600) + 30
 this.checkFood=false
 console.log(this.array.length)
 score = this.array.length-10
   
}
this.ctx.fillStyle ="red"
this.ctx.beginPath()
this.ctx.arc(this.foodX, this.foodY , 10 , 0, Math.PI*2)
this.ctx.fill()

 
}

updateArray(){

 var pos = new Position(this.naX , this.naY );

this.array.unshift(pos)
this.array.pop()
  
      
    
   
   

   
}
eatFood(){
    if(this.array[0].x >this.foodX-10 &&
         this.array[0].x<this.foodX+10 &&
         this.array[0].y>this.foodY-10&&
         this.array[0].y<this.foodY+10){
             this.array.unshift(new Position(this.naX , this.naY))
             this.checkFood=true

    }
}

drawEye(){
    if(this.vector.y==-this.speed|| this.vector.y==this.speed){
    this.ctx.fillStyle = "#ffffff"
    this.ctx.beginPath()
    this.ctx.arc(this.array[0].x-5 , this.array[0].y, 3 , 0 , Math.PI*2)
    this.ctx.fill()
    this.ctx.fillStyle = "#ffffff"
    this.ctx.beginPath()
    this.ctx.arc(this.array[0].x+5 , this.array[0].y, 3, 0 , Math.PI*2)
    this.ctx.fill()


    this.ctx.fillStyle = "#111"
    this.ctx.beginPath()
    this.ctx.arc(this.array[0].x-5 , this.array[0].y-1, 2 , 0 , Math.PI*2)
    this.ctx.fill()
    this.ctx.fillStyle = "#111"
    this.ctx.beginPath()
    this.ctx.arc(this.array[0].x+5, this.array[0].y-1, 2, 0 , Math.PI*2)
    this.ctx.fill()
    

    }
    else{
      
            this.ctx.fillStyle = "#ffffff"
            this.ctx.beginPath()
            this.ctx.arc(this.array[0].x , this.array[0].y-5, 3, 0 , Math.PI*2)
            this.ctx.fill()
            this.ctx.fillStyle = "#ffffff"
            this.ctx.beginPath()
            this.ctx.arc(this.array[0].x, this.array[0].y+5, 3 , 0 , Math.PI*2)
            this.ctx.fill()


            this.ctx.fillStyle = "#111"
            this.ctx.beginPath()
            this.ctx.arc(this.array[0].x-1 , this.array[0].y-5, 2 , 0 , Math.PI*2)
            this.ctx.fill()
            this.ctx.fillStyle = "#111"
            this.ctx.beginPath()
            this.ctx.arc(this.array[0].x-1, this.array[0].y+5, 2 , 0 , Math.PI*2)
            this.ctx.fill()
            
    

}

}
drawVC(){
  var arrayVC = []
   var x ;
     for(let i =0 ; i< 40; i++){
         if(i<20){
            var pos = new Position( 200, 100+(i*20))
            arrayVC.push(pos);
            x = 100+(i*20)
            
         }
         else{
            var pos = new Position( 200+(20*(-(40-(i+20)))), x)
            arrayVC.push(pos);
         }


     }
    
     arrayVC.forEach(vc =>{
        
     })
 
    
}

}

 document.querySelector('.btn').addEventListener("click" ,() =>{
     document.querySelector('.popup').parentNode.removeChild(document.querySelector('.popup'))
  
     var g = new game()

 })
   
 