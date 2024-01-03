import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { dataAddRoute, editRoute } from '../Utils/ApiRoutes';
import { useNavigate } from 'react-router-dom';

function CreateForm({ onDataUpdate, userId, editingItem, onFormSubmit }) {
  const [fullname, setFullname] = useState('');
  const [department, setDepartment] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if (editingItem) {
      setFullname(editingItem.fullname);
      setDepartment(editingItem.department);
    onFormSubmit({ fullname, department });

    }
  }, [editingItem]);

  const handleChange = (e) => {
    if (e.target.name === 'fullname') {
      setFullname(e.target.value);
    } else {
      setDepartment(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (hanhleValidation()) {
       
      if (editingItem) {
        // Perform edit operation
        axios
          .put(`${editRoute}/${editingItem._id}`, {
            fullname,
            department,
            userId,
          })
          .then((result) => {
            onDataUpdate();
            setFullname('');
            setDepartment('');
           
          })
          .catch((err) => console.log(err));
      } else {
        // Perform add operation
        axios
          .post(dataAddRoute, {
            fullname,
            department,
            userId,
          })
          .then((result) => {
            onDataUpdate();
            setFullname('');
            setDepartment('');
          })
          .catch((err) => console.log(err));
      }
    }
  };

  const hanhleValidation = () => {
    if (fullname === '') {
      alert('Please enter a name');
      return false;
    } else if (department === '') {
      alert('Please select department');
      return false;
    }
    return true;
  };

  return (
    <div className="add">
      <h2>{editingItem ? 'Edit List' : 'Add New List'}</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="form-group">
          <label htmlFor="fullname">Full Name:</label>
          <input
            value={fullname}
            type="text"
            id="fullname"
            name="fullname"
            placeholder="Enter full name"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="department">Department:</label>
          <input
            value={department}
            type="text"
            id="department"
            name="department"
            placeholder="Enter department"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <button type="submit">{editingItem ? 'Edit List' : 'Add List'}</button>
      </form>
    </div>
  );
}

export default CreateForm;
