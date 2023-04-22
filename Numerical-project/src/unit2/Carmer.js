import { Container, Form } from 'react-bootstrap';
import { useState } from 'react';
const math = require('mathjs');
const Carmer=()=>{

    let numgen = 0;
    const [table, setTable] = useState();
    const giventable = [];
    const [Matrix,setMatrix]=useState([])

    const print=()=>{
        return(<div></div>)
    }
    const copyMatrix=(matrix)=>{
        return matrix.map(row => row.slice());
    }
    
    const cal_carmer=(A,B)=>{
        var A=[[1,0,1],
              [2,1,0],
              [1,-1,1]]

        var B=[1,2,3]
        var x=[],Temp;

        for(let i=0;i<B.length;i++){
            Temp=copyMatrix(A);
            for(let j=0;j<B.length;j++){
                Temp[j][i]=B[j]
            }
            x.push(math.det(Temp)/math.det(A))
        }
        console.log(x)
    }

    const createtable = (numgen) => {
      let tableA = [];
      let tableB = [];
      let index=0;
      for (let i = 0; i < numgen; i++) {
        for(let j=0; j<numgen; j++){
            tableA.push(
                <input type="number" onChange={(event) => inputMatrix(event, index)}/>
            )
            index++
        }
        tableA.push(<br/>)
        tableB.push(
            <div><input type="number" /></div>
        )
      }

      giventable.push({ a: tableA, b: tableB });
    };

    const result = () => {
        console.log("numgen: ", numgen);
        console.log(giventable);
        return (
          <div>
          <div>
            <p>A=</p>
            {giventable.map((data) => (
              <div style={{ display: "flex" }}>
                <div>{data.a}</div>
              </div>
            ))}
          </div>

          <div>
            <br></br>
            <p>B=</p>
            {giventable.map((data)=>(
              <div style={{ display: "flex" }}>
                <div>{data.b}</div>
                <br/>
                
              </div>
            ))}
          </div>
          </div>
        );
      };

    const inputNum=(event)=>{
        console.log(event.target.value)
        numgen=event.target.value
        createtable(numgen)
        setTable(result())
    }

    const inputMatrix=(event,index)=>{
        console.log(event.target.value)
        console.log()
    }
    return(
        <Container>
            <br></br>
            <br></br>
            <h1>Carmer Rule</h1>
            <div class="input-group">
                <span class="input-group-text">Dimension</span>
                <input type="number"  class="form-control" onChange={inputNum}></input>
            </div>

            <Container>
                {table}
            </Container>

        </Container>
    )
}
export default Carmer

