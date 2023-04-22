import { useState } from "react"
import { Container, Form, Button, NavLink } from "react-bootstrap"
import { multiply,inv } from "mathjs"
import Plot from "react-plotly.js"


const LinearRegression=()=>{
const [N,setN]=useState(0)
const [html,setHTML]=useState(null)
const [graph,setGraph]=useState(null)
var valueX=[];
var valueY=[];
var tableX=[];
var tableY=[];
var A0,A1;
var data=[];

const inputN=(event)=>{
    let num=parseInt(event.target.value)
    console.log(num)
    setN(num)
    setHTML(gentable(num))
   
}

const gentable=(n)=>{
    for(let i=0;i<n;i++){
        tableX.push(
            <input placeholder={`x${i+1}`} key={i} type="number" id={"x"+i}/>
        )

        tableY.push(
            <input placeholder={`y${i+1}`} key={i} type="number" id={"y"+i}/>
        )
    }
    return(
        <div style={{textAlign:"center"}}>
            <br/>
            <div>{tableX}</div>
            <div>{tableY}</div>
            <br/>
        </div>)
}

const saveValue=()=>{
    for(let i=0;i<N;i++){
        valueX[i] = parseFloat(document.getElementById("x"+i).value)
        valueY[i] = parseFloat(document.getElementById("y"+i).value)
    }
    
    console.log(valueX)
    console.log(valueY)
    calculate()
    setGraph(print())
}


const calculate=()=>{
    let sumX=0,sumXX=0,sumY=0,sumXY=0,gx=[],obj1={},obj2={}
    for(let i=0;i<N;i++){
        sumX+=valueX[i]
        sumY+=valueY[i]
        sumXX+=valueX[i]*valueX[i]
        sumXY+=valueY[i]*valueX[i]
    }
    let A=[[N,sumX],
           [sumX,sumXX]]

    let B=[sumY,sumXY]
    let temp=multiply(inv(A),B)
    console.log("A0:"+temp[0])
    console.log("A1:"+temp[1])
    A0=temp[0]
    A1=temp[1]

    for(let i=0;i<N;i++){
        gx[i]=((A0+A1*valueX[i]))
    }

    obj1={
        x:valueX,
        y:valueY,
        mode:"markers",
        name:"point"
    }

    obj2={
        x:valueX,
        y:gx,
        mode:"lines+markers",
        name:"gx"
    }

    data.push(obj1,obj2)
}

const print=()=>{
    return(
        <div>
            <h1>{`Fx = (${A0}) + (${A1}) X`}</h1>
                <Plot data={data} style={{display:"flex"}}/>
            </div>
        
    )
}

    return(
        <Container>
            <Form>
                <Form.Group style={{display:'flex',textAlign:"center"}}>
                    <br/>
                    <strong>Input number of value</strong>
                    <input className="form-control" style={{width:"20%",marginLeft:"20px"}} type="number" onChange={inputN} min={1} max={5}/>
                </Form.Group>
            </Form>
            {html}
            <Button variant="dark" onClick={saveValue}>Save</Button>
            {graph}
        </Container>
    )
}
export default LinearRegression