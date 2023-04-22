import { useState } from "react"
import { Button, Container, Form, Table } from "react-bootstrap";
import { derivative,evaluate,factorial } from 'mathjs'
import Plot from 'react-plotly.js'
const Taylor_Series =()=>{
    
    const print = () =>{
        console.log(data)
        setValueIter(data.map((x)=>x.iteration));
        setValueSum(data.map((x)=>x.Sum));
        setValueError(data.map((x)=>x.Ea));
        return(
            <Container>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th width="10%">Iteration</th>
                            <th width="30%">Fx</th>
                            <th width="30%">Error</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((element, index)=>{
                            return  (
                            <tr key={index}>
                                <td>{element.iteration}</td>
                                <td>{element.Sum}</td>
                                <td>{element.Ea}</td>
                            </tr>)
                        })}
                    </tbody>
                </Table>
                <Plot style={{display: 'flex',alignItems: 'center',justifyContent: 'center'}}
                    data = {value}
                    layout={{
                    width: 1000, height: 600,
                    title: "False Position Chart",
                    }}
                />
            </Container>
        );
    }

    const Cal_Taylor_Series = (X,x0,n) => {   
        var fx = evaluate(Equation,{x: X});
        var dif=Equation;
        var sum=0,temp=0,y;
        var obj={},trace1={},trace2={};
        var error=100;
        var sumsung=[],arrayError=[],arrayI=[];


        for(let i=0;i<n;i++){

            if(i==0){
                y=evaluate(Equation,{x: x0}); 
                sum=sum+y;

            }else{
                dif = derivative(dif,'x').toString();
                y = evaluate(dif,{x: x0});
                temp = Math.pow((X-x0),i)/factorial(i);
                temp = temp*y;
                sum=sum+temp;

            }
                error=Math.abs((fx-sum)/fx*100);

            obj = {
                iteration:i,
                Eq:dif,
                Sum:sum,
                Ea:error
            }
            data.push(obj)
           

            if(error < 0.000001){
                setAnswer(sum);
                break;
            }
            sumsung.push(sum)
            arrayError.push(error)
            arrayI.push(i)
        }
        setAnswer(sum)
         
        trace1 = {
            y:arrayError,
            x:arrayI,
            name: 'Error',
            mode: 'lines+markers',
            type: 'scatter'
        };

        trace2 = {
            y: sumsung,
            x: arrayI,
            name: 'F(x)',
            mode: 'lines+markers',
            type: 'scatter'
        
        };
        value.push(trace1,trace2)
    
    }   

    const data =[];
    const value =[];
    const [valueIter, setValueIter] = useState([]);
    const [valueEq, setValueEq] = useState([]);
    const [valueSum, setValueSum] = useState([]);
    const [valueError, setValueError] = useState([]);
   
    const [html, setHtml] = useState(null);
    const [Equation,setEquation] = useState("(x^4)-13")
    const [X,setX] = useState(0)
    const [N,setN] = useState(0)
    const [X0,setX0] = useState(0)
    const [Answer,setAnswer] = useState(0)
   
    //Even
    const inputEquation = (event) =>{
        console.log(event.target.value)
        setEquation(event.target.value)
    }

    const inputX = (event) =>{
        console.log(event.target.value)
        setX(event.target.value)
    }

    const inputX0 = (event) =>{
        console.log(event.target.value)
        setX0(event.target.value)
    }
    
    const inputN = (event) =>{
        console.log(event.target.value)
        setN(event.target.value)
    }

    const calculateRoot = () =>{
        const x0num = parseFloat(X0)
        const xnum = parseFloat(X)
        const nnum = parseFloat(N)
        Cal_Taylor_Series(xnum,x0num,nnum)
        setHtml(print());

    }

    return (
            <Container>
                <br></br>
                <br></br>
                <h1>Taylor Series</h1>
                <Form>
                    <Form.Group className="mb-3" style={{display:"flex"}}>
                    <Form.Label style={{paddingTop:"5px",width:"10%"}}><strong>Input f(x)</strong></Form.Label>
                        <input type="text" id="equation" value={Equation} onChange={inputEquation} style={{width:"20%",marginLeft:"20px",marginRight:"60px"}} className="form-control"></input>
                        <Form.Label style={{paddingTop:"5px",width:"10%"}}><strong>Input X</strong></Form.Label>
                        <input type="number" id="X" onChange={inputX} style={{width:"20%",marginLeft:"20px",marginRight:"60px"}} className="form-control"></input>
                        <Form.Label style={{paddingTop:"5px",width:"10%"}}><strong>Input X0</strong></Form.Label>
                        <input type="number" id="X0" onChange={inputX0} style={{width:"20%",marginLeft:"20px",marginRight:"60px"}} className="form-control"></input>           
                        <Form.Label style={{paddingTop:"5px",width:"10%"}}><strong>Input N</strong></Form.Label>
                        <input type="number" id="N" onChange={inputN} style={{width:"20%",marginLeft:"20px"}} className="form-control"></input>            
                    </Form.Group>
                    <Button variant="dark" onClick={calculateRoot}>
                        Calculate
                    </Button> 
                </Form>
                <br></br>
                <h5>Answer = {Answer.toPrecision(7)}</h5>
                <Container>
                {html}
                </Container>             
            </Container>
           
    )
}

export default Taylor_Series