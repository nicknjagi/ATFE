import React, { useState, useContext } from 'react';
import close from '../assets/images/close.svg';
import { useClassContext } from '../context/ClassContext';
import { UserContext } from '../context/UserContext';
import Swal from 'sweetalert2';

function CreateClass({ handleClose }) {
  const { addClass } = useClassContext();
  const [classData, setClassData] = useState({
    class_name: '',
    start_date: '',
    end_date: '',
    start_time: '',
    end_time: '',
  });
  const {currentUser}=useContext(UserContext)

  const handleChange = (e) => {
    setClassData({ ...classData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    classData['user_id']=currentUser.user_id

    try {
      // Send the class data to the backend to create a new class
      await addClass(classData);

      // Show success alert
      Swal.fire({
        icon: 'success',
        title: 'Class Created',
        text: 'The class has been created successfully!',
      });

      // Optionally, you can also close the form or update the state to reflect the changes
      handleClose();
    } catch (error) {
      console.error('Error creating class:', error);

      // Show error alert
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'There was an error creating the class. Please try again.',
      });
    }
  };

  return (
    <div className="add-class-over" id="add-class">
      <form onSubmit={handleSubmit} className="flex w-full flex-col justify-center gap-4  ">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-semibold text-center">Create Class</h3>
          <button
            className="hover:bg-orange-100 rounded-full p-1"
            onClick={handleClose}
            type="button"
          >
            <img className="inline w-7 h-7" src={close} alt="icon" />
          </button>
        </div>
        <div className="form-row">
          <div className="w-full">
            <div className="mb-2 block">
              <label htmlFor="class_name">Class Name</label>
            </div>
            <input
              className="input"
              id="class_name"
              type="text"
              required
              value={classData.class_name}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="w-full">
            <div className="mb-2 block">
              <label htmlFor="start_date">Start date</label>
            </div>
            <input
              className="input"
              id="start_date"
              type="date"
              required
              value={classData.start_date}
              onChange={handleChange}
            />
          </div>
          <div className="w-full">
            <div className="mb-2 block">
              <label htmlFor="end_date">End date</label>
            </div>
            <input
              className="input"
              id="end_date"
              type="date"
              required
              value={classData.end_date}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="">
            <div className="mb-2 block">
              <label htmlFor="starts_at">Starts at</label>
            </div>
            <input
              className="input"
              id="start_time"
              type="time"
              required
              value={classData.starts_at}
              onChange={handleChange}
            />
          </div>
          <div className="">
            <div className="mb-2 block">
              <label htmlFor="ends_at">Ends at</label>
            </div>
            <input
              className="input"
              id="end_time"
              type="time"
              required
              value={classData.ends_at}
              onChange={handleChange}
            />
          </div>
        </div>

        <button className="btn py-3 my-3" type="submit">
          Create Class
        </button>
      </form>
    </div>
  );
}

export default CreateClass;
