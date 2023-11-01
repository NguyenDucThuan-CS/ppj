import React, { useState } from "react";
import data from "../data/data.json";
import "./Home.css";
import CustomModal from "./Modal";

const Home = () => {
  const [dataCost, setDataCost] = useState([]);

  const [show, setShow] = useState(false);
  const [itemEdit, setItemEdit]  =  useState("")

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const filterProduct = () => {
    return data.filter((item) => item.TypeName === "Product");
  };

  const checkItemIsProduct = (id) => {
    const products = filterProduct();

    const index = products.findIndex((item) => item.Id == id);

    if (index === -1) return false;
    return true;
  };

  const makeObj = () => {
    const products = filterProduct();
    const res = {};
    for (let i = 0; i < products.length; i++) {
      res[products[i].Id] = [];
    }

    return res;
  };

  const arrangeItemByProduct = () => {
    const initObj = makeObj();

    for (const property in initObj) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].ParentId == property) {
          initObj[property].push(data[i].Id);
        }
      }
    }

    return initObj;
  };

  const renderItemById = (id) => {
    return data[Number(id) - 1];
  };

  const renderItem = () => {
    const obj = arrangeItemByProduct();
    const res = [];
    for (const property in obj) {
      res.push(property);
      for (let i = 0; i < obj[property].length; i++) {
        res.push(obj[property][i]);
      }
    }

    return res;
  };
  const handleDelete = (id) => {
   setDataCost(dataCost.filter((item) => item.id !==  id))
  }
  return (
    <div className="container">
      <div className="d-flex flex-row gap-5">
        <table className="table table-striped-columns ">
          <thead>
            <tr>
              <th scope="col">No.</th>
              <th scope="col">Item</th>
              <th scope="col">Type</th>
            </tr>
          </thead>
          <tbody>
            {renderItem().map((id, index) => (
              <tr key={index}>
                <td
                  style={{
                    background: `${
                      checkItemIsProduct(id) ? "yellow" : "unset"
                    }`,
                  }}
                >
                  {index + 1}
                </td>
                <td
                  style={{
                    background: `${
                      checkItemIsProduct(id) ? "yellow" : "unset"
                    }`,
                  }}
                >
                  {renderItemById(id).ItemName}
                </td>
                <td
                  style={{
                    background: `${
                      checkItemIsProduct(id) ? "yellow" : "unset"
                    }`,
                  }}
                >
                  {renderItemById(id).TypeName}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ width: "120%" }}>
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
                    <span class="bi bi-trash" onClick={() => handleDelete(item.id)}></span>{" "}
                    <span onClick = {() => {
                      setItemEdit(item)
                      setShow(true)
                      }}>
                      <i class="bi bi-pen"></i>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <CustomModal
        products={filterProduct()}
        show={show}
        handleClose={handleClose}
        handleShow={handleShow}
        setDataCost={setDataCost}
        itemEdit={itemEdit}
        setItemEdit = {setItemEdit}
        dataCost = {dataCost}
      />
    </div>
  );
};

export default Home;
