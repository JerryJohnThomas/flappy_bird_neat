import React, { useEffect, useRef, useState } from 'react'
import Sketch from "react-p5";
import Bird from "./Bird"
import Pipe from "./Pipe"
import "./Flappy_Bird.css"
import * as tf from '@tensorflow/tfjs';
import { nextGeneration, Gen } from './Gen';
// background is 288 * 512
//  pipe is  320 length


function Flappy_Bird() {
    // let [ss1,setSs1]=useState()
    // let ss1=useRef(36);
    let ss1=useRef(12);
    // let ss1=useRef(12);  
    let ss2=useRef(1);
    let ss3=useRef(10);
    let pl=useRef(0);
    let mode_lvl=useRef(6);
    let canvas;
    let p5_loc; 
    // let sw=window.screen.availWidth;
    let sw=window.innerWidth;
    console.log(sw);
    let canvas_width=sw>420?sw:300;  
    let canvas_height=window.screen.availWidth>420?512:300;

    canvas_width=sw;
    canvas_height=512;
    let bird_img;
    let pipe_img_b;   
    let pipe_img_t;   
    let background_img;
    let bird;  
    let pipes=[]
    let birds=[]
    let savedBirds=[];
    let cycles;
    const total=100;
    let loc_fc=0;
    let best_score=0;
    let pause_karo=false;
    let pipe_went_loc=0;
    let bird_player;
    


    const setup = (p5, canvasParentRef) => {
        tf.setBackend('cpu');       //gpu might not be a good enough
        canvas=p5.createCanvas(canvas_width, canvas_height).parent(canvasParentRef)
        p5.noFill();
        p5.stroke(0);
        p5.rect(0,0,canvas_width,canvas_height);
        p5.background(0); 
        
        // bird = new Bird(p5);
        // console.log("claaing new", mode_lvl.current);
        // pipes.push(new Pipe(pipe_img_t,pipe_img_b,p5, mode_lvl.current));
        
        for(let i=0;i<total;i++)
        {
            birds[i]=new Bird(bird_img,p5);
        }
        
        let bgc=0;
        while(bgc<sw)
        {
        p5.image(background_img,bgc,0)
            bgc+=288
        }



        // p5.image(background_img,0,0)



    }
    
    let draw_env = (p5)=>{
        let bgc=0;
        while(bgc<sw)
        {
        p5.image(background_img,bgc,0)
            bgc+=288
        }
    }

    let game_logic = (p5) =>{
        let d4=document.querySelector(".now_score");
        d4.innerHTML=parseInt(d4.innerHTML)+1;
        if(loc_fc%50==0)
        {
        // console.log("claaing new", mode_lvl.current);
        pipes.push(new Pipe(pipe_img_t,pipe_img_b,p5,mode_lvl.current));
            // console.log("new pipe"+loc_fc);
        }

        loc_fc++;
    

            //new
        for(let c=pipes.length-1;c>=0;c--)
        {
            let a=pipes[c];
            a.update();
            if(a.offscreen())
            {
                pipes.splice(c,1);
                for(let i=0;i<birds.length;i++)
                {
                    birds[i].pipes_update();
                    pipe_went_loc++;
                }
            }

            for(let d=birds.length-1;d>=0;d--)
            {
                let b= birds[d];
                if(a.hits(b)){
                    savedBirds.push(birds.splice(d,1)[0]);
                }
            }
        }

        for( let b=birds.length-1;b>=0;b--)
        {
            let a=birds[b];
            if(a.went_out())
            savedBirds.push(birds.splice(b,1)[0]);
        }

        //over
        for (let bird of birds)
        {
            bird.think(pipes)
            bird.update();
            bird.jump=ss1.current;  //36
        }


        if(birds.length===0)
        {
            // console.log(tf.memory())
            d4.innerHTML=0;
            // console.log("fb pipe_went" +pipe_went_loc);
            let max=nextGeneration(total, birds, p5, savedBirds,pipe_went_loc, ss3.current/100);

            pipe_went_loc=0
            // console.log(max);
            // max comes in savedBirds[0].max
            if(savedBirds[0].max_score>best_score)
            {
               best_score=savedBirds[0].max_score
                let d2=document.querySelector(".best_score")
                d2.innerHTML=best_score
            }
            console.log(savedBirds[0].max_score);
            savedBirds=[]
            pipes=[]
            // pipes.push(new Pipe(p5, mode_lvl.current));
            loc_fc=0;
            let d=document.querySelector(".gen_num");
            d.innerHTML=parseInt(d.innerHTML)+1;
        }


    }



    const draw = p5 => {
        p5_loc=p5;

    cycles=ss2.current;
       for(let i=0;i<cycles;i++)
       {
           game_logic(p5);
       }
    
   
       let d6=document.querySelector(".mut_val");
       d6.innerHTML=ss3.current/100;

        draw_env(p5);
        if(show_birds)
        for(let a of birds)
            a.show();
        if(show_pipes)
        for(let b of pipes)
            b.show();
            

    }



    let draw_draw = (p5)=>{
        
       let d6=document.querySelector(".mut_val");
       d6.innerHTML=ss3.current/100;

        draw_env(p5);
        for(let a of birds)
            a.show();
        for(let b of pipes)
            b.show();
    }

    const preLoad = p5 => {
        bird_img = p5.loadImage('fb/sprites/bluebird-midflap.png');
        pipe_img_b = p5.loadImage('fb/sprites/pipe-green.png');
        pipe_img_t = p5.loadImage('fb/sprites/pipe-green-top2.png');
        background_img=p5.loadImage("fb/sprites/background-day.png")
     
        
    }

    const mousePressed = p5 =>{
        // bird_player.up();
        if(pause_karo)
            p5.noLoop();
         else
             p5.loop();
    }

    const keyPressed = p5 => {
        if(p5.key==" ")
        {
            birds[0].up();
        //     bird.up();
        }
    }
    
    let ss1_change=(e)=>{
        ss1.current=e.target.value;
    }
    let ss2_change=(e)=>{
        ss2.current=e.target.value;
        console.log(ss2.current);
    }
    let ss3_change=(e)=>{
        ss3.current=e.target.value;
        // console.log(ss3.current);
    }
    

    useEffect(()=>{
        let a=document.querySelector(".ss2_slider");
        a.value=ss2.current;
        let b=document.querySelector(".ss3_slider");
        b.value=ss3.current;
        let d6=document.querySelector(".mut_val");
        d6.innerHTML=ss3.current/100;
    },[])

    let set_mode= (a)=>{
        mode_lvl.current=a;
        console.log(mode_lvl.current);
    }

    let get_w = ()=>{
        birds[0].info()
    }
    let show_birds=true;
    let show_pipes=true;

    let sb= ()=>{
        show_birds=!show_birds
    }
    let sp = ()=>{
        show_pipes=!show_pipes
    }

    return (
        <div>
            hi flappy bird
            <Sketch setup={setup} draw={draw}
            preload={preLoad}
             mousePressed={mousePressed} 
            keyPressed={keyPressed}
              />
              
                <div className="values_tweek">
                <div>
                <div> jump tweek</div>
              <input type="range" 
              onChange={(e)=>ss1_change(e)}

              />
              </div>
              <div>
                <div> game logic cycles tweek</div>
              <input type="range" 
              
              onChange={(e)=>ss2_change(e)}
              min="1"
              max="100"
                className="ss2_slider"
              />
              </div>

              <div>
                <div> mutation rate</div>
              <input type="range" 
              
              onChange={(e)=>ss3_change(e)}
              min="0"
              max="100"
                className="ss3_slider"
              />
              <div className="mut_val"></div>
              </div>

              <div>
                  Game generation:
                  <div className="gen_num">1</div>
              </div>
              <div>
                  Present Score:
                  <div className="now_score">0</div>
              </div>

              <div>
                  Best Score till now:
                  <div className="best_score">0</div>
              </div>

                <button onClick={()=>pause_karo=!pause_karo}> pause</button>

                </div>


                <div className="values_tweek">
                <button className="mode1" onClick={()=>set_mode(1)}>level 1</button>
                <button className="mode2" onClick={()=>set_mode(2)}>level 2</button>
                <button className="mode3" onClick={()=>set_mode(3)}>level 3</button>
                <button className="mode4" onClick={()=>set_mode(4)}>level 4</button>
                <button className="mode5" onClick={()=>set_mode(5)}>level 5</button>
                <button className="mode6" onClick={()=>set_mode(6)}>level 6</button>
                <button className="mode7" onClick={()=>set_mode(7)}>level 7</button>
                <button className="mode8" onClick={()=>set_mode(8)}>level 8</button>

                </div>

                <div className="values_tweek">
                    <button onClick={()=>get_w()}>get weights</button>
                    <button onClick={()=>sb()}>show birds</button>
                    <button onClick={()=>sp()}>show pipes</button>
                </div>

        </div>
    )
}

export default Flappy_Bird
