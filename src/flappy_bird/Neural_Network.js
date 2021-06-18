import * as tf from '@tensorflow/tfjs';
import { copyRegisteredKernels, sigmoid, valueAndGrads } from '@tensorflow/tfjs';
import { cos, mod, mode } from 'mathjs';
import p5 from 'p5';

function Neural_Network(a,b,c,d) {
  
        //tf.tidy is like auto recylin
        //dispose is for dispose

        //tf tidy is like usually in hjavscript when a function ends local variables die
        //not so in tensorflow ig
    this.createModel=()=>{
        return tf.tidy(()=>{
            let model=tf.sequential();
            const hidden=tf.layers.dense({
                units: this.hidden_nodes,       //output nodes
                inputShape: [this.input_nodes], //input nodes
                // inputDim:this.input_nodes,
                activation: 'sigmoid'
            })

            model.add(hidden);

            const output = tf.layers.dense({
                units: this.output_nodes,
                activation: 'softmax'
            })

            model.add(output);
           
            return model;
        })        
    }
    
    if(a instanceof tf.Sequential){
        this.model=a;
        this.input_nodes=b;
        this.hidden_nodes=c;
        this.output_nodes=d;
    }
    else{
    this.input_nodes=a;
    this.hidden_nodes=b;
    this.output_nodes=c;
    this.model=this.createModel();
    }

    this.dispose=()=>{
        this.model.dispose();
    }

    this.predict=(arr)=>{
        
        return tf.tidy(()=>{
        let xs=tf.tensor2d([arr]);
        
        let ys=this.model.predict(xs);
        let output=ys.dataSync().slice();
        return output
        })

        
        //tf does not run  on arrays only on tensors
    }

    this.copy=()=>{
      return tf.tidy(()=>{
        const modelCopy=this.createModel();
        const weight=this.model.getWeights();
        let wc=[];
        for(let i=0;i<weight.length;i++)
            wc[i]=weight[i].clone();
        modelCopy.setWeights(wc);
        return new Neural_Network(modelCopy, this.input_nodes, this.hidden_nodes, this.output_nodes)
    })
      
        //getWeights and setWeights in tf
        //for each node there is a weight and bias
    }



    this.mutate =(p,p5)=>{
        tf.tidy(()=>{
            let w=this.model.getWeights();
            let mw=[];
            for(let i=0;i<w.length;i++)
            {
                mw[i]=w[i];
                let tensor=w[i];
                let shape=w[i].shape;
                //dataasync just flattens out stuff
                let val=tensor.dataSync().slice();      //slice is for copying
                for(let j=0;j<val.length;j++)
                {
                    if(Math.random()<p)
                    {
                        // val[j]=val[j]+((Math.random()*2)-1)
                        val[j]=val[j]+p5.randomGaussian()*2;
                    }
                }

                let new_tensor=tf.tensor(val,shape);
                mw[i]=new_tensor

            }

            this.model.setWeights(mw);
        })
    }

    this.reproduce = (nn)=>{
        tf.tidy(()=>{
            let w=this.model.getWeights();
            let w2=nn.model.getWeights();
            let rand=Math.floor(Math.random()*w.length)
            let mw=[];
            for(let i=0;i<w.length;i++)
            {
                if(i<rand)
                    mw[i]=w[i];
                else
                    mw[i]=w2[i];
            }

            this.model.setWeights(mw);
        })
    }

    this.info = ()=>{
        tf.tidy(()=>{
            let w =this.model.getWeights();
            for (let a of w)
            {
                let b=a.dataSync();
                console.log(b);
            }
        })
    }

    this.hardcode=()=> {
        return tf.tidy(() => {
          const modelCopy = this.createModel();
          const weights = this.model.getWeights();
          const weightCopies = [];
    
    
        weightCopies[0]= [0.09793632477521896, 0.352064847946167, -0.7078413963317871, -3.167835235595703, 1.0725691318511963, -0.5695319175720215, 1.3648792505264282, 2.34420108795166, 0.407927006483078, -0.32516026496887207, -0.22071833908557892, 3.1689810752868652, -1.2116345167160034, -1.132109522819519, 1.866162896156311, 1.0605717897415161, -1.468611240386963, -0.1558516025543213, 0.8215985894203186, -0.4931109845638275, 0.48543527722358704, -1.1931660175323486, 3.155275821685791, -1.7991790771484375, 2.170715570449829, 2.703181266784668, -0.9413046836853027, -0.7315533757209778, -0.27884742617607117, 3.2101709842681885, 0.9217942953109741, 1.387426495552063, 0.7911658883094788, -1.5826443433761597, -0.0024162912741303444, -0.5596520900726318, 0.2444249391555786, 0.712356448173523, 2.5301296710968018, -1.0488712787628174]
        weightCopies[1]=[1.5157679319381714, -1.8995273113250732, 0.09298137575387955, 0, -0.6999995112419128, 1.862804889678955, 1.0032533407211304, -1.4850132465362549]
        weightCopies[2]=[0.5113624334335327, 0.35720187425613403, -0.9466233849525452, 2.3109068870544434, 1.975759506225586, -0.6949201226234436, -0.3904900848865509, 4.972616672515869, -1.4445167779922485, -1.295021653175354, 0.40247708559036255, -0.0611458383500576, -0.8993318676948547, -1.1600100994110107, 0.5713229775428772, -0.9956586956977844]
        weightCopies[3]=[-0.33236899971961975, 0.3280804753303528]
        weightCopies[0]=tf.tensor2d(weightCopies[0],[this.input_nodes,this.hidden_nodes])
                // (weightCopies[0]).reshape([this.input_nodes,this.hidden_nodes])
        weightCopies[1]=tf.tensor(weightCopies[1])
        weightCopies[2]=tf.tensor2d(weightCopies[2],[this.hidden_nodes, this.output_nodes])
                //  (weightCopies[2]).reshape([this.hidden_nodes, this.output_nodes])
        weightCopies[3]=tf.tensor(weightCopies[3])
        // console.log(weightCopies);  
        modelCopy.setWeights(weightCopies);
          return new Neural_Network(
            modelCopy,
            this.input_nodes,
            this.hidden_nodes,
            this.output_nodes
          );
        });
      }

}

export default Neural_Network
