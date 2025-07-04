import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchStudents, deleteStudent } from '../redux/StudentSlice';

const StudentList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { students, loading, error } = useSelector((state) => state.students);
  const [confirmDelete, setConfirmDelete] = useState(null);

  useEffect(() => {
    if (students.length === 0) {
      dispatch(fetchStudents());
    }
  }, [dispatch, students.length]);

  const handleDelete = (id) => {
    dispatch(deleteStudent(id));
    setConfirmDelete(null);
  };

  console.log('StudentList rendering with students:', students);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#5D4157] to-[#A8CABA] p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Student Management Portal</h1>
      <button
        onClick={() => navigate('/add')}
        className="mb-4 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg shadow-lg hover:shadow-md"
      >
        Add Student
      </button>
      {loading && <p className="text-center text-gray-800">Loading...</p>}
      {error && <p className="text-center text-red-600">Error: {error}</p>}
      <div className="grid gap-4 max-w-4xl mx-auto">
        {students.map((student) => (
          <div
            key={student.id}
            className="bg-white/90 p-4 rounded-lg shadow-lg flex justify-between items-center"
          >
            <div>
              <h2 className="text-lg font-semibold text-gray-800">{student.name}</h2>
              <p className="text-gray-600">{student.email}</p>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => navigate(`/student/${student.id}`)}
                className="px-3 py-1 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg shadow-lg hover:shadow-md"
              >
                View
              </button>
              <button
                onClick={() => navigate(`/edit/${student.id}`)}
                className="px-3 py-1 bg-gradient-to-r from-yellow-600 to-yellow-700 text-white rounded-lg shadow-lg hover:shadow-md"
              >
                Edit
              </button>
              <button
                onClick={() => setConfirmDelete(student.id)}
                className="px-3 py-1 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg shadow-lg hover:shadow-md"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      {confirmDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white/90 p-6 rounded-lg shadow-lg">
            <p className="text-gray-800 mb-4">Are you sure you want to delete this student?</p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setConfirmDelete(null)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg shadow-lg hover:shadow-md"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(confirmDelete)}
                className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg shadow-lg hover:shadow-md"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentList;