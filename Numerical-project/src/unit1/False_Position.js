import { useState } from "react"
import { Button, Container, Form, Table } from "react-bootstrap";
import { evaluate } from 'mathjs'
// import Plot from 'react-plotly.js';

const False_Position =()=>{
    //print Result 
    const print = () =>{
        //map data 
        console.log(data)
        return(
            <Container>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th width="10%">Iteration</th>
                            <th width="30%">XL</th>
                            <th width="30%">X1</th>
                            <th width="30%">XR</th>
                            <th width="30%">ERROR</th>
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
                    title: "False Position Chart",
                    }}
                /> */}
            </Container>
           
        );
    }

    const error =(xold, xnew)=> Math.abs((xnew-xold)/xnew)*100;
   
    const CalFalse_Position = (xl, xr) => {
        var xm,fXm,fXr,ea,fXl,scope;
        var iter = 0;
        var MAX = 50;
        const e = 0.00001;
        var arrayError=[],arrayFxm=[],arrayFxr=[],arrayI=[];
        var obj={},trace1={},trace2={},trace3={};
        do
        {
            scope = {
                x:xr,
            }
            fXr = evaluate(Equation,scope)
            
            scope = {
                x:xl,
            }
            fXl = evaluate(Equation,scope)
            
            xm=((fXl*xr-fXr*xl)/(fXl-fXr));
            scope={
                x:xm
            }
            fXm = evaluate(Equation,scope)

            iter ++;

            if (fXm*fXr > 0)
            {
                ea = error(xr,xm);
                obj = {
                    iteration:iter,
                    Xl:xl,
                    Xm:xm,
                    Xr:xr,
                    Ea:ea
                }
                data.push(obj)
                xr = xm;
            }
            else if (fXm*fXr < 0)
            {
                ea = error(xl,xm);
                obj = {
                    iteration:iter,
                    Xl:xl,
                    Xm:xm,
                    Xr:xr,
                    Ea:ea
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
    const [valueIter, setValueIter] = useState([]);
    const [valueXl, setValueXl] = useState([]);
    const [valueXm, setValueXm] = useState([]);
    const [valueXr, setValueXr] = useState([]);
    const [valueEa, setValueEa] = useState([]);
     
   
    const [html, setHtml] = useState(null);
    const [Equation,setEquation] = useState("(x^4)-13")
    const [X,setX] = useState(0)
    const [XM,setXm] = useState(0)
    const [Ea,setEa] = useState(0)
    const [XL,setXL] = useState(0)
    const [XR,setXR] = useState(0)

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
        CalFalse_Position(xlnum,xrnum);
     
        setHtml(print());
    
        console.log(valueIter)
        console.log(valueXl)
    }

    return (    
            <Container >
            <br></br>
            <br></br>
            <h1>False Position</h1>
            <Form>

            <Form.Group className="mb-3" style={{display:"flex"}}>
  <Form.Label htmlFor="Equation" style={{paddingTop:"5px"}}><strong>Input f(x)</strong></Form.Label>
  <input type="text" id="Equation" value={Equation} onChange={inputEquation} style={{width:"20%",marginLeft:"20px",marginRight:"60px"}} className="form-control"></input>
  <Form.Label htmlFor="XL" style={{paddingTop:"5px"}}><strong>Input XL</strong></Form.Label>
  <input type="number" id="XL" onChange={inputXL} style={{width:"20%",marginLeft:"20px",marginRight:"60px"}} className="form-control"></input>
  <Form.Label htmlFor="XR" style={{paddingTop:"5px"}}><strong>Input XR</strong></Form.Label>
  <input type="number" id="XR" onChange={inputXR} style={{width:"20%",marginLeft:"20px"}} className="form-control"></input>                      
</Form.Group>
<Button variant="dark" onClick={calculateRoot}  id="cal">
                    Calculate
                </Button>  

                {/* <Form.Group className="mb-3" style={{display:"flex"}}>
                <Form.Label style={{paddingTop:"5px"}}><strong>Input f(x)</strong></Form.Label>
                    <input type="text" id="Equation" value={Equation} onChange={inputEquation} style={{width:"20%",marginLeft:"20px",marginRight:"60px"}} className="form-control"></input>
                    <Form.Label style={{paddingTop:"5px"}}><strong>Input XL</strong></Form.Label>
                    <input type="number" id="XL" onChange={inputXL} style={{width:"20%",marginLeft:"20px",marginRight:"60px"}} className="form-control"></input>
                    <Form.Label style={{paddingTop:"5px"}}><strong>Input XR</strong></Form.Label>
                    <input type="number" id="XR" onChange={inputXR} style={{width:"20%",marginLeft:"20px"}} className="form-control"></input>                      
                </Form.Group>
                <Button variant="dark" onClick={calculateRoot}  id="cal">
                    Calculate
                </Button>  */}
            </Form>
            <br></br>
            <h5 id="ans">Answer = {X.toPrecision(7)}</h5>
            <Container>
            {html}
            </Container>     
        </Container> 
           
    )
}

export default False_Position