import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { addStudent, updateStudent } from '../redux/studentSlice';

function StudentForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const students = useSelector((state) => state.students.students);
  const student = id ? students.find((s) => s.id === parseInt(id)) : null;

  const [formData, setFormData] = useState({
    name: student ? student.name : '',
    email: student ? student.email : '',
    phone: student ? student.phone || '' : '',
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (id) {
      dispatch(updateStudent({ id: parseInt(id), ...formData }));
    } else {
      dispatch(addStudent({ id: Date.now(), ...formData }));
    }
    navigate('/');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  return (
    <div className="max-w-md mx-auto bg-neu-light p-6 rounded-lg shadow-neu">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        {id ? 'Edit Student' : 'Add Student'}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full p-2 rounded-lg bg-neu-light shadow-neu-inset ${errors.name ? 'border-red-500' : ''}`}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>
        <div>
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full p-2 rounded-lg bg-neu-light shadow-neu-inset ${errors.email ? 'border-red-500' : ''}`}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>
        <div>
          <label className="block text-gray-700">Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`w-full p-2 rounded-lg bg-neu-light shadow-neu-inset ${errors.phone ? 'border-red-500' : ''}`}
          />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
        </div>
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg shadow-neu hover:shadow-neu-inset"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-gradient-to-r from-blue-400 to-blue-500 text-white rounded-lg shadow-neu hover:shadow-neu-inset"
          >
            {id ? 'Update' : 'Add'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default StudentForm;