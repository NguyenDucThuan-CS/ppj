import React, { useState } from "react";
//import data from "../data/data.json";
import CustomModal from "./Modal";
import { useSelector } from "react-redux";



const AddItem = () => {
  const [dataCost, setDataCost] = useState([]);

  const [show, setShow] = useState(false);
  const [itemEdit, setItemEdit] = useState("");
  const { masterData } = useSelector((state) => state.masterDataReducer);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const filterProduct = () => {
    return masterData.filter((item) => item.TypeName === "Product");
  };
  
  const renderItemById = (id) => {
    return masterData[Number(id) - 1];
  };
 

  const handleDelete = (id) => {
    setDataCost(dataCost.filter((item) => item.id !== id));
  };
  return (
    <div className="container">
      <div>
        <div className="btn btn-primary mb-2" onClick={handleShow}>
          Add new
        </div>
        <table className="table table-striped-columns">
          <thead>
            <tr>
              <th scope="col">No.</th>
              <th scope="col">Source</th>
              <th scope="col">Destination</th>
              <th scope="col">Cost</th>
              <th scope="col">Tác vụ</th>
            </tr>
          </thead>
          <tbody>
            {dataCost.map((item, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{renderItemById(item.sourceID).ItemName}</td>
                <td>{renderItemById(item.desID).ItemName}</td>
                <td>{item.cost}</td>
                <td>
                  <span
                    class="bi bi-trash"
                    onClick={() => handleDelete(item.id)}
                  ></span>{" "}
                  <span
                    onClick={() => {
                      setItemEdit(item);
                      setShow(true);
                    }}
                  >
                    <i class="bi bi-pen"></i>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CustomModal
        products={filterProduct()}
        show={show}
        handleClose={handleClose}
        handleShow={handleShow}
        setDataCost={setDataCost}
        itemEdit={itemEdit}
        setItemEdit={setItemEdit}
        dataCost={dataCost}
      />
    </div>
  );
};

export default AddItem;
