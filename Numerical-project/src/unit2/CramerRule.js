import React, { useState } from "react";
import {Table} from "react-bootstrap"

const CramerRule = () => {
  const [N, setN] = useState(0);
  const [table, setTable] = useState();

  const generateTable = (N) => {
    const rows = [];
    for (let i = 0; i < N; i++) {
      const cols = [];
      for (let j = 0; j < N; j++) {
        cols.push(
          <td>
            <input placeholder={`A${i + 1}${j + 1}`}/>
          </td>
        );
      }
      cols.push(<td>=</td>);
      cols.push(
        <td>
          <input placeholder={`B${i + 1}`}/>
        </td>
      );
      rows.push(<tr>{cols}</tr>);
    }
    return (
      <Table>
        <tbody>{rows}</tbody>
        {console.log(rows)}
      </Table>
    );
  };


  const inputN = (event) => {
    const newN = parseInt(event.target.value);
    console.log(newN)
    setN(newN);
    setTable(generateTable(newN));
  };

  return (
    <div>
      <label>
        input Dimension 
        <input type="number" min="1" max="5" onChange={inputN} />
      </label>
      <br />
      {table}
      <br />
      <button>Calculate</button>
    </div>
  );
};

export default CramerRule;