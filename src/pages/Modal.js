import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
//import data from "../data/data.json";
import { default as UUID } from "node-uuid";
import { useSelector } from "react-redux";

const CustomModal = ({
  show,
  handleClose,
  products,
  setDataCost,
  dataCost,
  itemEdit,
  setItemEdit,
}) => {
  const [sourceID, setSourceId] = useState("");
  const [desID, setDesId] = useState("");
  const [dataRender, setDataRender] = useState([]);
  const [cost, setCost] = useState(0);

  const { masterData: MasterData } = useSelector(
    (state) => state.masterDataReducer
  );
  const [masterData, setMasterData] = useState(MasterData);
  const clearData = () => {
    setDataRender([]);
    setSourceId("");
    setDesId("");
    setItemEdit("");
    setCost(0);
  };

  const handleChangeSource = (e) => {
    setSourceId(e.target.value);
  };

  const handleChangeDes = (e) => {
    setDesId(e.target.value);
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

  const handleEdit = (id) => {
    const cloneDataCost = [...dataCost];
    const index = dataCost.findIndex((item) => item.id == id);

    cloneDataCost[index].sourceID = sourceID;
    cloneDataCost[index].desID = desID;
    cloneDataCost[index].cost = renderCost();

    setDataCost(cloneDataCost);
  };

  const handleClick = () => {
    if (itemEdit) {
      handleEdit(itemEdit.id);
    } else {
      add();
    }
    handleClose();
    clearData();
  };

  useEffect(() => {
    if (sourceID && desID) {
      const filterData = masterData.filter(
        (item) => item.Id >= parseInt(sourceID) && item.Id < parseInt(desID)
      );
      setDataRender(filterData);
      // const cost = filterData.reduce((total, item) => total + item.Cost, 0);
      // setCost(cost)
    } else {
      setDataRender([]);
      setCost(0);
    }
  }, [sourceID, desID]);
  const renderCost = () => {
    const filterData = masterData.filter(
      (item) => item.Id >= parseInt(sourceID) && item.Id < parseInt(desID)
    );

    let cost = 0;
    for (let i = 0; i < filterData.length; i++) {
      if (filterData[i].cost) cost = cost + filterData[i].cost;
    }

    return cost;
  };
  const add = () => {
    if (sourceID && desID)
      setDataCost((prev) => [
        ...prev,
        { id: UUID.v4(), sourceID, desID, cost: renderCost() },
      ]);
  };
  const renderOptionsForDes = () => {
    if (sourceID === "") return products;
    return products.filter((item) => item.Id > parseInt(sourceID));
  };
  useEffect(() => {
    setSourceId(itemEdit.sourceID);
    setDesId(itemEdit.desID);
    setCost(itemEdit.cost);
  }, [itemEdit]);

  return (
    <>
      <Modal
        size="xl"
        show={show}
        onHide={() => {
          handleClose();
          clearData();
        }}
      >
        <Modal.Header closeButton className="d-flex">
          <div className="ms-5 me-5">
            <p>Source</p>
            <select
              className="form-select"
              aria-label="Default select example"
              onChange={handleChangeSource}
              value={sourceID}
            >
              <option value={""} selected>
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
              <option value={""} selected>
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
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex justify-content-end mb-2">
            <Button variant="primary" onClick={handleClick}>
              Save
            </Button>
          </div>
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
                <tr>
                  <td>{index + 1}</td>
                  <td>{item.ItemName}</td>
                  <td>{item.TypeName}</td>
                  <td>
                    <input
                      type="number"
                      onChange={(e) =>
                        handleChangeCost(item.Id, e.target.value)
                      }
                      value={renderCostForOne(item.Id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
        <p className="text-end fw-bold p-2">Total Cost: {renderCost()}</p>
      </Modal>
    </>
  );
};

export default CustomModal;
