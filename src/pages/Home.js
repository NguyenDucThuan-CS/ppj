import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { actAddData } from "../redux/masterData/action";
import { actDeleteData } from "../redux/masterData/action";
import { actEditData } from "../redux/masterData/action";
const Home = () => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const [name, setName] = useState("")
  const [type, setType] = useState("")
  const [id, setId] = useState("")
  const [mode, setMode] = useState('')

  const { masterData } = useSelector((state) => state.masterDataReducer);
  
  const filterProduct = () => {
    return masterData.filter((item) => item.TypeName === "Product");
  };

  const checkItemIsProduct = (id) => {
    const products = filterProduct();

    const index = products.findIndex((item) => item.Id == id);

    if (index === -1) return false;
    return true;
  };
  const handleClose = () => {
    setId("")
    setName("")
    setType("")
    setShow(false);
  };

  const handleClick = () => {
    handleClose()
    if(mode === 'NEW') {
      dispatch(actAddData({
        ParentId: id,
        ItemName: name,
        TypeName: type
      }))
    }
    else if(mode === 'EDIT') {
      dispatch(actEditData({
        id,
        name,
        type
      }))
    }
    
  }

  const setValueModal = (id) => {
    const res =  masterData.find((item) => item.Id === id)
    setId(id)
    setName(res.ItemName)
    setType(res.TypeName)
  }


  return (
    <div className="container">
      <div className="d-flex flex-row gap-2 mt-2 mb-2 justify-content-between">
        <div>
          
        </div>
        <div className="d-flex flex-row gap-2">
          <Button variant="primary" onClick={() => history("/add")}>
            Add item page with modal
          </Button>
          <Button variant="primary" onClick={() => history("/add-new")}>
          Add item page with new page
          </Button>
        </div>
      </div>
       <h2 className="font-weight-bold">Thư viện</h2>
      <div className="d-flex flex-row gap-5">
        <table className="table table-striped-columns table-bordered">
          <thead className="thead-dark">
            <tr>
              <th scope="col">No.</th>
              <th scope="col">Item</th>
              <th scope="col">Type</th>
              <th scope="col">Tác vụ</th>
            </tr>
          </thead>
          <tbody>
            {masterData.map((item, index) => (
              <tr key={index}>
                <td
                  style={{
                    background: `${
                      checkItemIsProduct(item.Id) ? "yellow" : "unset"
                    }`,
                  }}
                >
                  {index + 1}
                </td>
                <td
                  style={{
                    background: `${
                      checkItemIsProduct(item.Id) ? "yellow" : "unset"
                    }`,
                  }}
                >
                  {item.ItemName}
                </td>
                <td
                  style={{
                    background: `${
                      checkItemIsProduct(item.Id) ? "yellow" : "unset"
                    }`,
                  }}
                >
                  {item.TypeName}
                </td>
                <td>
                  {!checkItemIsProduct(item.Id) && (
                    <>
                      <span
                      class="bi bi-trash"
                      onClick={() => dispatch(actDeleteData(item.Id))}
                    ></span>
                     <span
                    onClick={() => {
                      //setItemEdit(item);
                      setValueModal(item.Id)
                      setShow(true);
                      setMode('EDIT')
                    }}
                  >
                    <i class="bi bi-pen"></i>
                  </span>
                    </>
                    
                  )}
                  {checkItemIsProduct(item.Id) && (
                    <span
                      onClick={() => {
                        setShow(true);
                        setId(item.Id)
                        setMode("NEW")
                      }}
                    >
                      <i class="bi bi-plus-circle"></i>
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal
        size="lg"
        show={show}
        onHide={() => {
          handleClose();
        }}
      >
        <Modal.Body>
          <div className="container" style={{width:'50%'}}>
            <label>Name</label>
            <input class="form-control" onChange={(e) => setName(e.target.value)} value={name}/>
            <label>Type</label>
            <input class="form-control" onChange={(e) => setType(e.target.value)} value={type}/>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={handleClick}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Home;
