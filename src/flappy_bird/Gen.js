import React from 'react'
import Bird from './Bird'

function Gen() {

return "hi"

}
let nextGeneration=(TOTAL, birds, p5,savedBirds,pipe_went_loc,mr)=>{
    // this.max_score=0;
    // calculateFitness_norm(savedBirds,pipe_went_loc,2);
    calculateFitness(savedBirds,pipe_went_loc);
    for(let i=0;i<TOTAL;i++)
    {
        birds[i]=pickOne_mod(savedBirds,p5,mr);
        // birds[i]=pickOne2(savedBirds,p5,mr);
    }
    for (let i=0;i<TOTAL;i++)
    {
        savedBirds[i].dispose();
    }
}


let pickOne = (savedBirds,p5,mr)=>{
    
    let index=0;
    let r= Math.random();
    while(r>0){
        r=r-savedBirds[index].fitness;
        index++;
    }
    index--;
    let bird2 = savedBirds[index];
    
    let child = new Bird(bird2.source_img,p5,bird2.brain);
    // child.mutate(mr);

    return child;
}
let pickOne_mod = (savedBirds,p5,mr)=>{
    
    let index=savedBirds.length-1;
    let r= Math.random();
    while(r>0){
        r=r-savedBirds[index].fitness;
        index--;
    }
    index++;
    let bird2 = savedBirds[index];
    
    let child = new Bird(bird2.source_img,p5,bird2.brain);
    // child.mutate(mr);

    return child;
}

let pickOne2 = (savedBirds,p5,mr)=>{
    
    let index=savedBirds.length-1;
    let r= Math.random();
    while(r>0){
        r=r-savedBirds[index].fitness;
        index--;
    }
    index++;
    
    let bird_a = savedBirds[index];
    
    let index2=0;
    let r2= Math.random();
    while(r2>0){
        r2=r2-savedBirds[index2].fitness;
        index2++;
    }
    index2--;

    // console.log(index+"  ")
    
    let bird_b = savedBirds[index2];
    
    // console.log(index+"  "+index2);
    // bird_a.brain.reproduce2(bird_b.brain)
    // console.log(bird_a);
    // console.log(bird_b);
    bird_a.brain.reproduce(bird_b.brain)
    let child = new Bird(bird_a.source_img,p5,bird_a.brain);
    // child.mutate(mr);
    

    // bird_a.reproduce(bird_b);
    // let child = new Bird(p5,bird_a.brain);
    // child.mutate(mr);
    
    
    return child;
}

let calculateFitness = (SavedBirds,pipes_max,base)=>{
    let sum=0;
    let aa=0;
    for (let bird of SavedBirds){
        // sum+=bird.score;
        if(bird.score>aa)
            aa=bird.score
        // bird.score=Math.pow(bird.score,2);
        bird.score=Math.pow(base,bird.score);
         sum+=bird.score;
    }
    SavedBirds[0].max_score=aa;
    
    for(let bird of SavedBirds){
        bird.fitness=bird.score/sum;
    }
}

let calculateFitness_norm = (SavedBirds,pipes_max)=>{
    let sum=0;
    let aa=0;
    for (let bird of SavedBirds){
        if(bird.score>aa)
            aa=bird.score
        bird.score=Math.pow(bird.score,2)
         sum+=bird.score;
    }
    SavedBirds[0].max_score=aa;
    
    for(let bird of SavedBirds){
        bird.fitness=bird.score/sum;
    }
}

export {nextGeneration, Gen}
