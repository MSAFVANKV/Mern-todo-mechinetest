import axios from "axios";
import React, { useEffect, useState } from "react";
import { dataAddRoute, dataFetchRoute, deleteRoute, editRoute } from "../Utils/ApiRoutes";
import CreateForm from "./CreateForm";
import { useNavigate } from "react-router-dom";

function CreateList() {
  const navigate = useNavigate();

  const [finalData, setFinalData] = useState([]);
  const [userId, setUserId] = useState(undefined);
  const [editingItem, setEditingItem] = useState(null); // New state for editing item
  const [formValues, setFormValues] = useState({}); // New state for form values
  // console.log(formValues,'formValues')

  // console.log("Parsed userId:", userId);
  const handleFormSubmit = (values) => {
    setFormValues(values);
    // console.log(formValues,'formValues')
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (localStorage.getItem("token")) {
          const parsedToken = await JSON.parse(localStorage.getItem("token"));
          console.log("Parsed Token:", parsedToken);
          setUserId(parsedToken);
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Handle error or redirect to login
        navigate("/login");
      }
    };

    fetchData();
  }, [navigate]);

  useEffect(() => {
    fetchData();
  }, [userId]);

  const fetchData = () => {
    axios
      .get(`${dataFetchRoute}/${userId}`)
      .then((res) => {
        setFinalData(res.data);
        console.log("Successfully got data!", res.data);
      })
      .catch((err) => console.log(err, "createList.jsx"));
  };

  const handleDelete = (id) => {
    if (!window.confirm(`Are you sure you want to delete this item?`)) return;

    axios
      .delete(`${deleteRoute}/${id}`)
      .then((res) => {
        fetchData();
        alert("Successfully deleted data!", res.data);
      })
      .catch((err) => console.log(err, "createList.jsx"));
  };

  const handleEdit = (id) => {
    // Find the item to edit from finalData
    const itemToEdit = finalData.find((item) => item._id === id);
    if (itemToEdit) {
      setEditingItem(itemToEdit);
    } else {
      setFormValues("")
    }
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
    setFormValues("")
  };

  return (
    <div className="container-create">
      <CreateForm
        userId={userId}
        onDataUpdate={fetchData}
        handleEdit={handleEdit}
        editingItem={editingItem}
        cancel={handleCancelEdit} 
        onFormSubmit={handleFormSubmit}
      />
      <table className="user-table">
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Department</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {finalData.length === 0 ? (
            <tr>
              <td colSpan="3">No data</td>
            </tr>
          ) : (
            finalData.map((data,index) => (
              <tr key={data._id}>
                <td>{index+1}</td>
                <td>{data.fullname}</td>
                <td>{data.department}</td>
                <td>
                 { editingItem ? <button
                    className="action-button"
                    onClick={() => handleCancelEdit()}
                  >
                    cancel
                  </button>: 
                  <button
                  className="action-button"
                  onClick={() => handleEdit(data._id)}
                >
                  edit
                </button>
                  }
                  <button
                    className="action-button"
                    onClick={() => handleDelete(data._id)}
                  >
                    delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default CreateList;
