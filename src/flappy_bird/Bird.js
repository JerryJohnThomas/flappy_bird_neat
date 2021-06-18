import React from 'react'
import Neural_Network from "./Neural_Network"
function Bird(bird_img_pass,p5,brain1) {
    this.y= p5.height/2;
    this.x=64;
    // this.gravity=1;
    this.gravity=1;     //cd
    // this.gravity=0.4;
    this.velocity=0;
    this.rad=28;
    this.jump=10;
    // this.jump=12;
    // this.max_speed=-23
    this.max_speed=-1000
    let bird_img2;
    
    if(bird_img_pass)
     bird_img2=bird_img_pass;
    else
     bird_img2= p5.loadImage('fb/sprites/bluebird-midflap.png');
    this.source_img=bird_img2;
     this.score=0;
    this.pipes_passed=0;
    let aa=5;
    let bb=8;
    let cc=2;

    if(brain1 instanceof Neural_Network)
    {
        this.brain=brain1.copy();
        // this.brain=this.brain.hardcode();
        this.brain.mutate(0.1,p5);  //new
    }
    else
    {
        this.brain= new Neural_Network(aa,bb,cc);
        this.brain.mutate(0.05,p5);
    }

    // this.brain= new Neural_Network(aa,bb,cc);
    this.dispose = ()=>{
        this.brain.dispose();
    }

    this.copy = ()=>{
        return new Bird(p5,this.brain);
    }


    this.save = ()=>{
        this.brain.save();
    }

    this.show = ()=>{
        p5.fill(255);
        p5.ellipse(this.x, this.y, this.rad,this.rad);
        p5.image(bird_img2,this.x-16,this.y-12);
        // p5.fill(127,0,255)
        // p5.rect(this.x-this.rad/2, this.y,20,20);
    }


    this.mutate =(p)=>{
        this.brain.mutate(p,p5);
    }

    let b4=0;
    let past=0;
    this.think = (pipes)=>{
        
      
        let closest = null;
        let closestD = Infinity;
        for (let i = 0; i < pipes.length; i++) {
          let d = pipes[i].x + pipes[i].w - this.x;
          if (d < closestD && d > 0) {
            closest = pipes[i];
            closestD = d;
          }
        }


        let ip=[];
        ip[0]=this.y/p5.height;
        ip[1]=closest.top/p5.height;
        ip[2]=closest.bottom/p5.height;
        ip[3]=closest.x/p5.width;
        // let aa=((this.velocity/36)+0.5)*1.3
        let aa=(this.velocity/10)
        ip[4]=aa;

        ip[0]=this.y/p5.height;
        ip[1]=(closest.top+(closest.space_between)/2)/p5.height;
        ip[2]=(closest.x+closest.w-(this.x-(this.rad/2)))/p5.width;
        ip[3]=this.velocity;
        // console.log(aa);

        let op=this.brain.predict(ip);
        if(op[1]>op[0] )
            {
                //add this -> && this.velocity >=0
                //only go up if u r going down
                // console.log("jump");
                this.up();
            }
    }
    this.pipes_update= ()=>{
        this.pipes_passed++;
    }

    this.info = ()=>{
        this.brain.info();

    }


    this.update=()=>{
        this.score++;
        this.velocity+=this.gravity;
        this.velocity*=0.9;
        this.y+=this.velocity
    
        // if (this.y> p5.height){
        //     this.y=p5.height;
        //     this.velocity=0;
        // }

        // if (this.y<0){
        //     this.y=0;
        //     this.velocity=0;
        // }

    }

    this.went_out = ()=>{
        // console.log(this.y+"   "+p5.height)
        return (this.y>p5.height || this.y<0)
        // return false;
    }

    this.up = ()=>{
        
        this.velocity-= this.jump
        if(this.velocity<this.max_speed)
            this.velocity=this.max_speed

        
    }

    this.reproduce = (bird2)=>[
        this.brain.reproduce(bird2.brain)
    ]


}

export default Bird
