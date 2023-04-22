import { useState } from "react"
import { Button, Container, Form, Table } from "react-bootstrap";
import { evaluate } from 'mathjs'
import Plot from "react-plotly.js"

const Secant=()=>{
    const print=()=>{
        console.log(data)
        setValueIter(data.map((x)=>x.iteration));
        setValueX0(data.map((x)=>x.X0));
        setValueX1(data.map((x)=>x.X1));
        setValueX2(data.map((x)=>x.X2));
        setValueError(data.map((x)=>x.Error));

        return(
            <Container>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th width="10%">Iteration</th>
                            <th width="10%">X0</th>
                            <th width="10%">X1</th>
                            <th width="10%">X2</th>
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
                                <td>{element.X2}</td>
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
    

    const Cal_Secant=(x0,x1,n)=>{
        var fx1,fx0,x2,Iter=0,error=100;
        var obj={},trace1={},trace2={};
        var arrayX2=[],arrayError=[],arrayI=[];
        
        do{
            //find x2
            fx0 = evaluate(Equation,{x:x0});
            fx1 = evaluate(Equation,{x:x1});
            x2=x1-((fx1*(x0-x1))/(fx0-fx1));

            //step3 error check
            error=Math.abs((x2-x1)/x2*100);
            obj={
                iteration:Iter,
                X0:x0,
                X1:x1,
                X2:x2,
                Error:error
            }
            x0=x1;
            x1=x2;
            Iter++;
            data.push(obj)
            arrayError.push(error)
            arrayI.push(Iter)
            arrayX2.push(x2)
        }while(error > 0.000001 && Iter < n )
        setAnswer(x2)
        trace1 = {
            y:arrayError,
            x:arrayI,
            name: 'Error',
            mode: 'lines+markers',
            type: 'scatter'
        };

        trace2 = {
            y: arrayX2,
            x: arrayI,
            name: 'F(x)',
            mode: 'lines+markers',
            type: 'scatter'
        
        };
        value.push(trace1,trace2)
    }

    const data =[];
    const value=[];
    const [valueIter, setValueIter] = useState([]);
    const [valuex0, setValueX0] = useState([]);
    const [valueX1, setValueX1] = useState([]);
    const [valueX2, setValueX2] = useState([]);
    const [valueError, setValueError] = useState([]);
    
    
    const [html,setHtml] = useState(null);
    const [Equation,setEquation] = useState("(x^4)-13")
    const [X0,setX0] = useState(0)
    const [X1,setX1] = useState(0)
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

    const inputX1=(even)=>{
        console.log(even.target.value)
        setX1(even.target.value)
    }

    const inputN=(even)=>{
        console.log(even.target.value)
        setN(even.target.value)
    }

    const calculateRoot=()=>{
        const x0num = parseFloat(X0)
        const x1num = parseFloat(X1)
        const nnum = parseFloat(N)
        Cal_Secant(x0num,x1num,nnum)
        setHtml(print())
        
    }
    
    return(
        <Container>
        <br></br>
        <br></br>
        <h1>Secant Method</h1>
        <Form>
            <Form.Group className="mb-3" style={{display:"flex"}}>
            <Form.Label style={{paddingTop:"5px",width:"10%"}}><strong>Input f(x)</strong></Form.Label>
                <input type="text" id="equation" value={Equation} onChange={inputEquation} style={{width:"20%",marginLeft:"20px",marginRight:"60px"}} className="form-control"></input>
                <Form.Label style={{paddingTop:"5px",width:"10%"}}><strong>Input X0</strong></Form.Label>
                <input type="number" id="X0" onChange={inputX0} style={{width:"20%",marginLeft:"20px",marginRight:"60px"}} className="form-control"></input>
                <Form.Label style={{paddingTop:"5px",width:"10%"}}><strong>Input X1</strong></Form.Label>
                <input type="number" id="X1" onChange={inputX1} style={{width:"20%",marginLeft:"20px",marginRight:"60px"}} className="form-control"></input>           
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
export default Secant