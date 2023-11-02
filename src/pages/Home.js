import React from "react";
import data from "../data/data.json";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const renderItemById = (id) => {
  return data[Number(id) - 1];
};

const Home = () => {
  const history = useNavigate();
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

  return (
    <div className="container">
      <div className="d-flex flex-row gap-2 mt-2 mb-2">
        <Button variant="primary" onClick={() => history("/add")}>
          Add with modal
        </Button>
        <Button variant="primary" onClick={() => history("/add-new")}>
          Add with newpage
        </Button>
      </div>

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
      </div>
    </div>
  );
};

export default Home;
