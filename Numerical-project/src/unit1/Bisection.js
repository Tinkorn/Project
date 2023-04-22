import { useState } from "react"
import { Button, Container, Form, Table} from "react-bootstrap";
import { evaluate } from 'mathjs'
// import Plot from 'react-plotly.js';
import axios from 'axios';
const apiURL= "http://localhost:5000/bisection/2"
var temp;

const Bisection = () =>{
    const print = () =>{

        console.log(data)
      
        return(
            <Container>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th width="10%">Iteration</th>
                            <th width="10%">XL</th>
                            <th width="10%">XM</th>
                            <th width="10%">XR</th>
                            <th width="10%">Error</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((element, index)=>{
                            return  (
                            <tr key={index}>
                                <td>{element.iteration}</td>
                                <td>{element.Xl}</td>
                                <td>{element.Xm}</td>
                                <td>{element.Xr}</td>
                                <td>{element.Ea}</td>
                            </tr>)
                        })}
                    </tbody>
                </Table>
                {/* <Plot style={{display: 'flex',alignItems: 'center',justifyContent: 'center'}}
                    data = {value}
                    layout={{
                    width: 1000, height: 600,
                    title: "Bisection Chart",
                    }}
                /> */}
            </Container>
        )
            
    }
    

    const error =(xold, xnew)=> Math.abs((xnew-xold)/xnew)*100;
   
    const Calbisection = (xl, xr) => {
        var xm,fXm,fXr,ea;
        var iter = 0;
        var MAX = 50;
        const e = 0.00001;
        var arrayError=[],arrayFxm=[],arrayFxr=[],arrayI=[];
        var obj={},trace1={},trace2={},trace3={};
        do
        {
            xm = (xl+xr)/2.0;
            fXr = evaluate(Equation,{x:xr})     
            fXm = evaluate(Equation,{x:xm})
            
            iter ++;
            if (fXm*fXr > 0)
            {
                ea = error(xr, xm);
                obj = {
                    iteration:iter,
                    Xl:xl,
                    Xm:xm,
                    Xr:xr,
                    Ea:ea,
                    Fxr:fXr,
                    Fxm:fXm
                }
                data.push(obj)
                xr = xm;
            }
            else if (fXm*fXr < 0)
            {
                ea = error(xl, xm);
                obj = {
                    iteration:iter,
                    Xl:xl,
                    Xm:xm,
                    Xr:xr,
                    Ea:ea,
                    Fxr:fXr,
                    Fxm:fXm
                }
                data.push(obj)
                xl = xm;
            }
            arrayError.push(ea)
            arrayFxm.push(fXm)
            arrayFxr.push(fXr)
            arrayI.push(iter)

        }while(ea>e && iter<MAX)
        setX(xm)
        
        trace1 = {
            y:arrayError,
            x:arrayI,
            name: 'Error',
            mode: 'lines+markers',
            type: 'scatter'
        };

        trace2 = {
            y: arrayFxr,
            x: arrayI,
            name: 'FXR',
            mode: 'lines+markers',
            type: 'scatter'
        
        };

        trace3 = {
            y: arrayFxm,
            x: arrayI,
            name: 'FXM',
            mode: 'lines+markers',
            type: 'scatter'
        };
        value.push(trace1,trace2,trace3)
        
    }
    
    const data =[];
    const value =[];
   
    const [html, setHtml] = useState(null);
    const [Equation,setEquation] = useState("(x^4)-13")
    const [X,setX] = useState(0)
    const [XL,setXL] = useState(-4)
    const [XR,setXR] = useState(4)

    const inputEquation = (event) =>{
        console.log(event.target.value)
        setEquation(event.target.value)
    }

    const inputXL = (event) =>{
        console.log(event.target.value)
        setXL(event.target.value)
    }

    const inputXR = (event) =>{
        console.log(event.target.value)
        setXR(event.target.value)
    }

    const calculateRoot = () =>{
        const xlnum = parseFloat(XL)
        const xrnum = parseFloat(XR)
        Calbisection(xlnum,xrnum);
        setHtml(print());
    }

    const calAPI=()=>{
        
        axios.get(apiURL,{
            headers:{"authorization":localStorage.getItem("token")}
        })
        .then(function(response){
             console.log(response)
             temp = response.data;
             console.log(temp)
             setEquation(temp[0].fx)
             setXL(temp[0].xl)
             setXR(temp[0].xr)
        })
        
    }

    return (
            <Container >
                <br></br>
                <br></br>
                <h1>Bisection</h1>
                <Form>
                    <Form.Group className="mb-3" style={{display:"flex"}}>
                    <Form.Label style={{paddingTop:"5px"}}><strong>Input f(x)</strong></Form.Label>
                        <input type="text" id="equation" value={Equation} onChange={inputEquation} style={{width:"20%",marginLeft:"20px",marginRight:"60px"}} className="form-control"></input>
                        <Form.Label style={{paddingTop:"5px"}}><strong>Input XL</strong></Form.Label>
                        <input type="number" id="XL" onChange={inputXL} style={{width:"20%",marginLeft:"20px",marginRight:"60px"}} className="form-control" value={XL}></input>
                        <Form.Label style={{paddingTop:"5px"}}><strong>Input XR</strong></Form.Label>
                        <input type="number" id="XR" onChange={inputXR} style={{width:"20%",marginLeft:"20px"}} className="form-control" value={XR}></input>                      
                    </Form.Group>
                    <Button variant="dark" onClick={calculateRoot}>
                        Calculate
                    </Button> 

                    <Button variant="dark" onClick={calAPI}>
                        Example
                    </Button> 
                </Form>
                <br></br>
                <h5>Answer = {X.toPrecision(7)}</h5>
                <Container>
                {html}
                </Container>     
            </Container> 
            
           
    )
}

export default Bisection