
import './App.css';
import styled from "styled-components"
import React, { useState } from "react";

const Grid = styled.div`
  border: 1px dashed #000;
  padding: 15px;
  margin: 0 auto;
  width: 90%;
`;

const Row = styled.div`
  display: flex;
`;

const Col = styled.div`
  border: 1px solid #000;
  padding: 15px;
  position: relative;
  flex: ${(props) => props.size};
`;

function pluck(array, key) {
  return array.map(o => o[key]);
}

function App() {
  let widthInput = React.createRef();
  let textInput = React.createRef();
  const [warning, setWarning] = useState();
  const [gridSize] = useState(12);
  let initialColumns = [{
    size: gridSize,
    text: "something"
  }]
  const [columns, setColumns] = useState(initialColumns);
  const [jsonValue, setJsonValue] = useState();

  const adjustColumns = (newColumns) => {
    setWarning("")
    widthInput.current.value = ''
    textInput.current.value = ''
    setColumns(newColumns)
  }

  const addColumn = () => {
    let newColumns = [...columns]
    const addedWidth = Number(widthInput.current.value)
    const maxSizeIndex = columns.findIndex(col => Math.max(...pluck(columns, 'size')) === col.size )

    if (addedWidth < 1 || addedWidth > gridSize) {
      setWarning("Invalid Entry")
      return;
    }

    if (newColumns[maxSizeIndex].size === 1) {
      setWarning("Can't add more column of size 1, remove and try adding again")
      return;
    }
    
    if (newColumns[maxSizeIndex].size - addedWidth < 0) {
      setWarning("Can't adjust automatically, try removing any column and adjust it")
      return;
    }

    newColumns[maxSizeIndex].size = newColumns[maxSizeIndex].size - addedWidth
    
    adjustColumns([
      ...newColumns,
      {
        text: textInput.current.value,
        size: addedWidth
      }
    ])
  }

  const removeColumn = (index) => {
    let newColumns = [...columns]
    const currentColSize = columns[index].size
    newColumns.splice(index, 1)
    const minSizeIndex = newColumns.findIndex(col => Math.min(...pluck(columns, 'size')) === col.size )
    
    if (columns[0]?.size === gridSize) {
      setWarning("Can't remove current column, a grid should have atleast one column");
      return;
    }
    if (minSizeIndex < 0) {
      newColumns[0].size = newColumns[0].size + currentColSize
    } else {
      newColumns[minSizeIndex].size = newColumns[minSizeIndex].size + currentColSize
    }
    adjustColumns(newColumns)
  }

  const exportGrid = () => {
    const value = {
      'columns': columns
    }
    setJsonValue(JSON.stringify(value, undefined, 2))
  }

  const importGrid = () => {
    const enteredColumns = JSON.parse(jsonValue).columns
    const allSizes = pluck(enteredColumns, 'size')
    const total = allSizes.reduce((a,b) => a + b)

    if (total > 12) {
      setWarning("Invalid sizes, all sizes should add upto 12");
      return
    }

    setColumns(enteredColumns)
  }
  const updateTextArea = (e) => {
    setJsonValue(e.target.value)
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Dynamic Grid App</h1>
      </header>
      <div className="add-column-wrapper">
        <input ref={widthInput} type="tex" placeholder="Add Width 1 - 12"/>
        <input ref={textInput} type="tex" placeholder="You may add text in column"/>
        <button type="button" onClick={addColumn}>Add Col</button>
      </div>
      <h2>Grid:</h2>
      <Grid>
        <Row>
          {
            columns.map((col, index) => {
              return (
              <Col key={index} size={col.size}>
                Width: <b>{col.size}</b>
                <span className="close" onClick={() => removeColumn(index) }>x</span>
                <p>{col.text}</p>
              </Col>)
            })
          }
        </Row>
      </Grid>
      <p className="warning">{warning}</p>
      <button type="button" onClick={exportGrid}>Export Grid</button>
      <textarea cols="100" rows="10" className="text-box" placeholder="JSON here" value={jsonValue} onChange={updateTextArea}/>
      <button type="button" onClick={importGrid}>Import Grid</button>
    </div>
  );
}

export default App;
