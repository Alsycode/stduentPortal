import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

function StudentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const students = useSelector((state) => state.students.students);
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const localStudent = students.find((s) => s.id === parseInt(id));
        if (localStudent) {
          setStudent(localStudent);
        } else {
          const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
          setStudent(response.data);
        }
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch student details');
        setLoading(false);
      }
    };
    fetchStudent();
  }, [id, students]);

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!student) return <p className="text-center text-gray-600">Student not found</p>;

  return (
    <div className="max-w-2xl mx-auto bg-neu-light p-6 rounded-lg shadow-neu">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Student Details</h1>
      <div className="space-y-2">
        <p><strong>Name:</strong> {student.name}</p>
        <p><strong>Email:</strong> {student.email}</p>
        <p><strong>Phone:</strong> {student.phone || 'N/A'}</p>
      </div>
      <button
        onClick={() => navigate('/')}
        className="mt-4 px-4 py-2 bg-gradient-to-r from-blue-400 to-blue-500 text-white rounded-lg shadow-neu hover:shadow-neu-inset"
      >
        Back to List
      </button>
    </div>
  );
}

export default StudentDetail;