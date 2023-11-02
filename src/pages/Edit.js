import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
//import data from "../data/data.json";
import { useDispatch, useSelector } from "react-redux";
import { actAddItem } from "../redux/modules/action";
import { actEditItem } from "../redux/modules/action";
import { useNavigate, useParams } from "react-router-dom";
import { default as UUID } from "node-uuid";

const Edit = () => {
  const [sourceID, setSourceId] = useState("");
  const [desID, setDesId] = useState("");
  const [cost, setCost] = useState(0);
  const [dataRender, setDataRender] = useState([]);
  const { masterData: MasterData } = useSelector(
    (state) => state.masterDataReducer
  );
  const [masterData, setMasterData] = useState(MasterData);

  const dispatch = useDispatch();
  const history = useNavigate();
  const dataCost = useSelector((state) => state.itemReducer.data);

  const handleChangeSource = (e) => {
    setSourceId(e.target.value);
  };

  const handleChangeDes = (e) => {
    setDesId(e.target.value);
  };

  const checkType = () => {
    return window.location.pathname.split("/")[1];
  };
  const { id } = useParams();

  useEffect(() => {
    if (checkType() === "edit") {
      const item = dataCost.find((item) => item.id === id);
      setSourceId(item.sourceID);
      setDesId(item.desID);
      setCost(item.cost);
    }
  }, [id]);

  useEffect(() => {
    if (sourceID && desID) {
      const filterData = masterData.filter(
        (item) => item.Id >= parseInt(sourceID) && item.Id < parseInt(desID)
      );
      setDataRender(filterData);
    } else {
      setDataRender([]);
      setCost(0);
    }
  }, [sourceID, desID]);

  const renderCost = () => {
    const filterData = masterData.filter(
      (item) => item.Id >= parseInt(sourceID) && item.Id < parseInt(desID)
    );

    const cost = filterData.reduce((total, item) => {
      if (item.cost !== undefined) return total + item.cost;
    }, 0);

    return cost;
  };

  const products = masterData.filter((item) => item.TypeName === "Product");

  const handleClick = () => {
    if (sourceID && desID) {
      if (checkType() === "new") {
        dispatch(
          actAddItem({ id: UUID.v4(), sourceID, desID, cost: renderCost() })
        );
        history("/add-new");
      } else {
        dispatch(actEditItem({ id, sourceID, desID, cost: renderCost() }));
        history("/add-new");
      }
    }
  };
  const renderOptionsForDes = () => {
    if (sourceID === "") return products;
    return products.filter((item) => item.Id > parseInt(sourceID));
  };
  const handleChangeCost = (id, value) => {
    const cloneMasterData = [...masterData];
    const index = cloneMasterData.findIndex((item) => item.Id === id);
    cloneMasterData[index].cost = parseInt(value);

    setMasterData(cloneMasterData);
  };
  const renderCostForOne = (id) => {
    const cloneMasterData = [...masterData];
    const index = cloneMasterData.findIndex((item) => item.Id === id);

    return cloneMasterData[index].cost;
  };
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
            <option value={""}>Open this select menu</option>
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
            <option value={""}>Open this select menu</option>
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
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.ItemName}</td>
                <td>{item.TypeName}</td>
                <td>
                  <input
                    type="number"
                    onChange={(e) => handleChangeCost(item.Id, e.target.value)}
                    value={renderCostForOne(item.Id)}
                  />
                </td>
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
      <p className="text-end fw-bold p-2">Total Cost: {renderCost()}</p>
    </div>
  );
};

export default Edit;
