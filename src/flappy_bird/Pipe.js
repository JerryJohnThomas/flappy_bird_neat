import { pipe } from 'gsap/gsap-core';
import React from 'react'

function Pipe(pi_top,pi_bottom,p5, mode) {
    // this.space_between=100;
    this.space_between=150;

    
    switch(mode)
    {
        case 1:{
            this.space_between=300;
            break;
        }
        case 2:{
            
            this.space_between=250;
            break;
        }
        case 3:{
            this.space_between=200;
            break;
        }

        case 4:{
            this.space_between=175;
            break;
        }

        case 5:{
            this.space_between=150;
            break;
        }

        case 6:{
            this.space_between=125;
            break;
        }

        case 7:{
            this.space_between=100;
            break;
        }
        case 8:{
            this.space_between=80;
            break;
        }

        default:
            console.log("def");
    }
    // console.log(mode+"  "+this.space_between);

    this.top= p5.random(p5.height*0.05,p5.height*0.75);   //height of top pipe
    this.bottom=p5.height-(this.top+this.space_between)//height of bottom pipe
    // this.bottom=p5.random(p5.height*0.75); //height of bottom pipe
    this.x=p5.width;
    this.w=40;
    this.w=80;          //cd
    // this.speed=5;
    this.speed=6;
    // this.speed=1;
    this.highlight=false;

    
    
    let  pipe_img2=p5.createImage();
    let  pipe_img_top 
    if(pi_top)
        pipe_img_top=pi_top
    else
        pipe_img_top = p5.loadImage('fb/sprites/pipe-green-top2.png');

    if(pi_bottom)
    {
        pipe_img2=pi_bottom;
        // console.log(pi_bottom);
    }
    else
      pipe_img2 = p5.loadImage('fb/sprites/pipe-green.png');




    this.show=()=>{
        if(this.highlight)
            p5.fill(255,0,0)
        else
            p5.fill(255);

        let h1=pipe_img_top.height;

        pipe_img_top.resize(this.w, this.top);
        if(this.highlight)
            p5.fill(255,0,0)
        else
            p5.fill(35, 211, 38);
        p5.stroke(0);
        p5.rect(this.x,0,this.w, this.top)
        // if(!this.highlight)
        // p5.image(pipe_img_top, this.x,0)


        pipe_img2.resize(this.w, this.bottom);   
        // p5.fill(35, 211, 38);
        if(this.highlight)
            p5.fill(255,0,0)
        else
            p5.fill(0,255,0);
        p5.stroke(0);
        p5.rect(this.x,p5.height-this.bottom,this.w, this.bottom)
        // if(!this.highlight)
        // p5.image(pipe_img2, this.x,p5.height-this.bottom)


        
    }

    this.update=()=>{
        this.x-=this.speed;
    }
    this.offscreen=()=>{
        if(this.x <-this.w)
            return true
            return false
            
    }

    this.hits=(bird)=>{
        if(bird.y<this.top ||bird.y>p5.height-this.bottom)
        {
            if(bird.x>this.x&&bird.x<this.x+this.w)
            {
                this.highlight=true;
                return true;
            }
        }   

        return false;
    }

}

export default Pipe
