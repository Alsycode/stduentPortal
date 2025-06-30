import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchStudents, deleteStudent } from '../redux/StudentSlice';
import axios from 'axios';

const StudentList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { students, loading, error } = useSelector((state) => state.students);
  const [confirmDelete, setConfirmDelete] = useState(null);

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteStudent(id));
    setConfirmDelete(null);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Student Management Portal</h1>
      <button
        onClick={() => navigate('/add')}
        className="mb-4 px-4 py-2 bg-gradient-to-r from-blue-400 to-blue-500 text-white rounded-lg shadow-neu hover:shadow-neu-inset"
      >
        Add Student
      </button>
      {loading && <p className="text-center text-gray-600">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      <div className="grid gap-4">
        {students.map((student) => (
          <div
            key={student.id}
            className="bg-neu-light p-4 rounded-lg shadow-neu flex justify-between items-center"
          >
            <div>
              <h2 className="text-lg font-semibold text-gray-800">{student.name}</h2>
              <p className="text-gray-600">{student.email}</p>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => navigate(`/student/${student.id}`)}
                className="px-3 py-1 bg-gradient-to-r from-green-400 to-green-500 text-white rounded-lg shadow-neu hover:shadow-neu-inset"
              >
                View
              </button>
              <button
                onClick={() => navigate(`/edit/${student.id}`)}
                className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white rounded-lg shadow-neu hover:shadow-neu-inset"
              >
                Edit
              </button>
              <button
                onClick={() => setConfirmDelete(student.id)}
                className="px-3 py-1 bg-gradient-to-r from-red-400 to-red-500 text-white rounded-lg shadow-neu hover:shadow-neu-inset"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      {confirmDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-neu-light p-6 rounded-lg shadow-neu">
            <p className="text-gray-800 mb-4">Are you sure you want to delete this student?</p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setConfirmDelete(null)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg shadow-neu hover:shadow-neu-inset"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(confirmDelete)}
                className="px-4 py-2 bg-gradient-to-r from-red-400 to-red-500 text-white rounded-lg shadow-neu hover:shadow-neu-inset"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentList;