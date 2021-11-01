import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import "./ToDo.css";

const getLocalItems = () => {
  let list = localStorage.getItem("lists");

  if (list) {
    return JSON.parse(list);
  } else {
    return [];
  }
};

const ToDo = () => {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getLocalItems());

  const addItem = () => {
    if (inputData) {
      setItems([...items, inputData]);
      setInputData("");
    }
  };

  const deleteItem = (id) => {
    const updatedItems = items.filter((element, index) => {
      return index !== id;
    });
    setItems(updatedItems);
  };

  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(items));
  }, [items]);

  return (
    <div className="Main">
      <div className="Header">
        <h1>To Do List</h1>
      </div>
      <div className="Input">
        <TextField
          type="text"
          id="outlined-basic"
          label="Add ToDo"
          variant="outlined"
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
        ></TextField>
        &nbsp; &nbsp;
        <Fab className="add" color="primary" aria-label="add" onClick={addItem}>
          <AddIcon />
        </Fab>
      </div>
      <div className="DisplayItems">
        {items.map((element, index) => {
          return (
            <div className="EachItem" key={index}>
              <h3>{element}</h3>
              <Button
                variant="contained"
                size="small"
                className="del"
                onClick={() => deleteItem(index)}
              >
                Delete
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ToDo;
