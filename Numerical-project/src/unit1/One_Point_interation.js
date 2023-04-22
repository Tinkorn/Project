import { useState } from "react"
import { Button, Container, Form, Table } from "react-bootstrap";
import { evaluate } from 'mathjs'
import Plot from 'react-plotly.js'

const One_Point_Iteration=()=>{
    const print=()=>{
        console.log(data)
        setValueIter(data.map((x)=>x.Iteration));
        setValueX0(data.map((x)=>x.X0));
        setValueX1(data.map((x)=>x.X1));
        setValueError(data.map((x)=>x.Error));

        return(
            <Container>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th width="10%">Iteration</th>
                            <th width="10%">X0</th>
                            <th width="10%">X1</th>
                            <th width="10%">Error</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((element, index)=>{
                            return  (
                            <tr key={index}>
                                <td>{element.iteration}</td>
                                <td>{element.X0}</td>
                                <td>{element.X1}</td>
                                <td>{element.Error}</td>  
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
    

    const Cal_One_Point_Iteration=(x0,n)=>{
        var x1,Iter=0,error=100;
        var arrayError=[],arrayX1=[],arrayI=[];
        var obj={},trace1={},trace2={};
        do{
            //find x1
            x1 = evaluate(Equation,{x:x0});

            //error
            error=Math.abs((x1-x0)/x1*100);
            obj={
                iteration:Iter,
                X0:x0,
                X1:x1,
                Error:error
            }
            x0=x1;
            Iter++;
            arrayError.push(error)
            arrayI.push(Iter)
            arrayX1.push(x1)
            data.push(obj)
            
        }while(error > 0.000001 && Iter < n )
        setAnswer(x1)
        
        trace1 = {
            y:arrayError,
            x:arrayI,
            name: 'Error',
            mode: 'lines+markers',
            type: 'scatter'
        };

        trace2 = {
            y: arrayX1,
            x: arrayI,
            name: 'Fx',
            mode: 'lines+markers',
            type: 'scatter'
        
        };
        value.push(trace1,trace2)
    }

    const data =[];
    const value =[];
    const [valueIter, setValueIter] = useState([]);
    const [valuex0, setValueX0] = useState([]);
    const [valueX1, setValueX1] = useState([]);
    const [valueError, setValueError] = useState([]);
    
    
    const [html,setHtml] = useState(null);
    const [Equation,setEquation] = useState("(x^4)-13")
    const [X0,setX0] = useState(0)
    const [N,setN] = useState(0)
    const [Error,setError] = useState(0)
    const [Answer,setAnswer] = useState(0)

    //Even
    const inputEquation = (event) =>{
        console.log(event.target.value)
        setEquation(event.target.value)
    }

    const inputX0=(even)=>{
        console.log(even.target.value)
        setX0(even.target.value)
    }

    const inputN=(even)=>{
        console.log(even.target.value)
        setN(even.target.value)
    }

    const calculateRoot=()=>{
        const x0num = parseFloat(X0)
        const nnum = parseFloat(N)
        Cal_One_Point_Iteration(x0num,nnum)
        setHtml(print())
        
    }
    
    return(
        <Container>
                <br></br>
                <br></br>
                <h1>One Point Iteration</h1>
                <Form >
                    <Form.Group className="mb-3" style={{display:"flex"}}>
                     <Form.Label style={{paddingTop:"5px"}}><strong>Input f(x)</strong></Form.Label>
                     <input type="text" id="equation" value={Equation} onChange={inputEquation} style={{width:"20%",marginLeft:"20px",marginRight:"60px"}} className="form-control"></input>
                     <Form.Label style={{paddingTop:"5px"}}><strong>X0</strong></Form.Label>
                     <input type="number" id="X0" onChange={inputX0} style={{width:"20%",marginLeft:"20px",marginRight:"60px"}} className="form-control"></input>
                     <Form.Label style={{paddingTop:"5px"}}><strong>Input N</strong></Form.Label>
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
export default One_Point_Iteration