
import React from "react";
import { Paper, TextField } from "@material-ui/core";
import { Checkbox, Button } from "@material-ui/core";
import { useLocation,useNavigate,useParams  } from 'react-router-dom';
import "./App.css";

function App() {
  let { id } = useParams();
  const [data, setData] = React.useState(null);
  const [listName, setListName] = React.useState(null);
  const [text, setText] = React.useState(null);
  const [flag, setFlag] = React.useState(false);
  const [userid, setUserId] = React.useState(id);


  React.useEffect(() => {
    fetch("https://todolist067.herokuapp.com/api/lists"+"?id="+userid)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [flag]);

  const handleChange = ({ currentTarget: input }) => {
    setText(input.value);
  };

  const handleChange1 = ({ currentTarget: input }) => {
    setListName(input.value);
  };


  const runCallback = (cb) => {
    return cb();
  };


  return (
    <div className="App flex">
      <TextField
        variant="outlined"
        size="small"
        style={{ width: "75%", marginLeft: "5px" }}
        id="newList"
        value={listName}
        onChange={handleChange1}
        required={true}
        placeholder="Add New TO-DO List"
      />
      <Button
        style={{ height: "40px", marginRight: "5px" }}
        color="primary"
        onClick={() => addList(setFlag, setListName, listName, flag,userid)}
        variant="outlined"
        type="submit"
      >
        Add List  
      </Button>
      {
        runCallback(() => {
          const row = [];
          for (const list in data) {
            row.push(
              <Paper elevation={3} className="container">
                <div className="heading">{list}</div>
                  <TextField
                    variant="outlined"
                    size="small"
                    style={{ width: "65%" }}
                    id="newItem"
                    onChange={handleChange}
                    required={true}
                    placeholder="Add New TO-DO"
                  />
                  <Button
                    style={{ height: "40px" }}
                    color="primary"
                    variant="outlined"
                    onClick={() => addItem(setFlag, setText, text, list, flag,userid)}
                    type="submit"
                  >
                    Add task
                  </Button>
                <div>
                  {
                    runCallback(() => {
                      const row = [];
                      for (const x in data[list]) {
                        row.push(
                          <Paper
                            key={x}
                            className="flex task_container"
                          >
                            <Checkbox
                              checked={data[list][x].done}
                              onClick={() => markItemDone(setFlag,setUserId ,x, data[list][x].name, data[list][x].done, list, flag,userid)}
                              color="primary"
                            />
                            <div
                              className={
                                data[list][x].done
                                  ? "task line_through"
                                  : "task"
                              }
                            >
                              {data[list][x].name}
                            </div>
                            <Button
                              onClick={() => deleteItem(setFlag,setUserId ,x, list, flag,userid)}
                              color="secondary"
                            >
                              delete
                            </Button>
                          </Paper>
                        )
                      }
                      return row
                    })
                  }
                </div>
              </Paper>
            )
          }
          return row
        })
      }
    </div>
  );

}

async function addList(setFlag, setListName, listName, flag,userid) {
  const url = 'https://todolist067.herokuapp.com/api/lists' + '?list=' + listName + '&userid=' + userid;
  await fetch(url, {
    method: 'POST'
  });

  setFlag(!flag)
  setListName("")
}


async function addItem(setFlag, setText, itemName, listName, flag,userid) {
  const url = 'https://todolist067.herokuapp.com/api/tasks' + '?list=' + listName + '&itemname=' + itemName;
  await fetch(url, {
    method: 'POST'
  });

  setFlag(!flag)
  setText("")
 
}

async function deleteItem(setFlag, setUserId, itemId, listName, flag,userid) {
  const url = 'https://todolist067.herokuapp.com/api/tasks' + '?list=' + listName + '&itemid=' + itemId;
  await fetch(url, {
    method: 'DELETE'
  })

  setUserId(userid)
  setFlag(!flag)

}

async function markItemDone(setFlag,setUserId, itemId, itemName, itemDone, listName, flag,userid) {
  const url = 'https://todolist067.herokuapp.com/api/tasks' + '?list=' + listName + '&itemid=' + itemId + '&itemname=' + itemName + '&itemdone=' + itemDone;
  await fetch(url, {
    method: 'PUT'
  })

  setUserId(userid)
  setFlag(!flag)

}
export default App;