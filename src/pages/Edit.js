import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import data from "../data/data.json";
import { useDispatch, useSelector } from "react-redux";
import { actAddItem } from "../redux/modules/action";
import { actEditItem } from "../redux/modules/action";
import { useNavigate, useParams } from "react-router-dom";
import {default as UUID} from "node-uuid";

const Edit = () => {
  const [sourceID, setSourceId] = useState("");
  const [desID, setDesId] = useState("");
  const [cost, setCost] = useState(0)
  const [dataRender, setDataRender] = useState([]);
  
  const dispatch = useDispatch()
  const history = useNavigate()
  const dataCost = useSelector((state) => state.itemReducer.data);

  const handleChangeSource = (e) => {
    setSourceId(e.target.value);
  };

  const handleChangeDes = (e) => {
    setDesId(e.target.value);
  };

  const checkType = () => {
    return window.location.pathname.split('/')[1]
  }
  const { id } = useParams();

  useEffect(() => {
    if(checkType() === 'edit') {
        const item = dataCost.find((item) => item.id === id)
        setSourceId(item.sourceID)
        setDesId(item.desID)
        setCost(item.cost)
    }
    
  }, [id])

  useEffect(() => {
    if(sourceID && desID) {
        const filterData = data.filter(
            (item) =>
              item.Id >= parseInt(sourceID) &&
              item.Id < parseInt(desID) 
          );
          setDataRender(filterData);
          const cost = filterData.reduce((total, item) => total + item.Cost, 0);
          setCost(cost)
    }
    else {
        setDataRender([])
        setCost(0)
    }
   
  }, [sourceID, desID]);
  const products = data.filter((item) => item.TypeName === "Product")
  
  const handleClick = () => {
    if(sourceID && desID) {
        if(checkType() === 'new')
        {
            dispatch(actAddItem({id: UUID.v4(),sourceID,desID,cost}))
            history('/add-new')
        }
       
        else {
            dispatch(actEditItem({id,sourceID,desID,cost}))
            history('/add-new')
        }
    }
  }
  const renderOptionsForDes = () => {
    if(sourceID === "") return products
    return products.filter((item) => item.Id > parseInt(sourceID))
  }

  return (
    <div className="container">
      <div className="d-flex mb-4">
        <div className="ms-5 me-5">
          <p>Source</p>
          <select
            className="form-select"
            aria-label="Default select example"
            onChange={handleChangeSource}
            value={sourceID}
          >
            <option value={""}>
              Open this select menu
            </option>
            {products.map((item, index) => {
              return (
                <option key={item.Id} value={item.Id}>
                  {item.ItemName}
                </option>
              );
            })}
          </select>
        </div>
        <div className="ms-5">
          <p>Destination</p>
          <select
            className="form-select"
            aria-label="Default select example"
            onChange={handleChangeDes}
            value={desID}
          >
            <option value={""}>
              Open this select menu
            </option>
            {renderOptionsForDes().map((item, index) => {
              return (
                <option key={item.Id} value={item.Id}>
                  {item.ItemName}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div>
        <table className="table table-striped-columns">
          <thead>
            <tr>
              <th scope="col">No.</th>
              <th scope="col">Item</th>
              <th scope="col">Type</th>
              <th scope="col">Cost (USD)</th>
            </tr>
          </thead>
          <tbody>
            {dataRender.map((item, index) => (
              <tr key = {index}>
                <td>{index + 1}</td>
                <td>{item.ItemName}</td>
                <td>{item.TypeName}</td>
                <td>{item.Cost}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <Button variant="primary" onClick={handleClick}>
          Save
        </Button>
      </div>
      <p className="text-end fw-bold p-2">Total Cost: {cost}</p>
    </div>
  );
};

export default Edit;
