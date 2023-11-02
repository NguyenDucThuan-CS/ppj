import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { renderItemById } from "./Home"
import { actDeleteItem } from "../redux/modules/action"

const AddNew = () => {

    const history = useNavigate()
    const dispatch = useDispatch();
    const dataRender = useSelector((state) => state.itemReducer.data);
    
    const handleDelete = (id) => {
        dispatch(actDeleteItem(id))
    }


    return  <div className="container">
    <div className="d-flex flex-row gap-5">
      <div style={{ width: "120%" }}>
        <div className="btn btn-primary mb-2" onClick={() => history('/new')}>
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
          {dataRender.map((item, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{renderItemById(item.sourceID).ItemName}</td>
                  <td>{renderItemById(item.desID).ItemName}</td>
                  <td>{item.cost}</td>
                  <td>
                    <span class="bi bi-trash" onClick={() => handleDelete(item.id)}></span>{" "}
                    <span onClick = {() => {
                        history(`/edit/${item.id}`)
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
  </div>
}


export default AddNew