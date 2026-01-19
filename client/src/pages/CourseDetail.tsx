import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import { getCourseImage } from "../utils/courseImages";
import { useAuth } from "../context/AuthContext";
import PaymentModal from "../components/PaymentModal";

type Course = {
  id: number;
  title: string;
  description: string;
  category: string;
};

export default function CourseDetail() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();

  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [showPayment, setShowPayment] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchCourse = async () => {
      try {
        const res = await api.get("/courses");

        // 🔧 NORMALIZE RESPONSE (THIS IS THE FIX)
        const courses: Course[] =
          Array.isArray(res.data)
            ? res.data
            : Array.isArray(res.data.courses)
            ? res.data.courses
            : Array.isArray(res.data.data)
            ? res.data.data
            : [];

        const found = courses.find(
          (c) => c.id === Number(id)
        );

        setCourse(found || null);
      } catch (err) {
        console.error("Failed to load course", err);
        setCourse(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  /* ---------- STATES ---------- */

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading course…
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Course not found
      </div>
    );
  }

  if (!user) return null;

  /* ---------- UI ---------- */

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* HERO */}
      <div className="bg-gray-900 text-white p-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
          <div>
            <h1 className="text-4xl font-extrabold mb-4">
              {course.title}
            </h1>

            <p className="text-gray-300 mb-6">
              {course.description}
            </p>

            <div className="flex gap-4">
              <button
                onClick={() => setShowPayment(true)}
                className="bg-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
              >
                Enroll Now
              </button>

              <button
                onClick={() =>
                  window.open(
                    `http://localhost:5000/api/certificate/${user.name}/${course.title}`
                  )
                }
                className="px-6 py-3 rounded-lg border border-green-600 text-green-600 hover:bg-green-50 dark:hover:bg-gray-800"
              >
                🎓 Certificate
              </button>
            </div>
          </div>

          <img
            src={getCourseImage(course.id)}
            alt={course.title}
            className="rounded-xl shadow-lg"
          />
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto p-10">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          What you’ll learn
        </h2>

        <ul className="grid sm:grid-cols-2 gap-4 text-gray-700 dark:text-gray-300">
          <li>✔ Build real-world projects</li>
          <li>✔ Master core concepts</li>
          <li>✔ Improve problem-solving</li>
          <li>✔ Become job-ready</li>
        </ul>
      </div>

      {showPayment && (
        <PaymentModal
          onClose={() => setShowPayment(false)}
          onSuccess={() => {
            alert("Payment successful 🎉 You are enrolled!");
            setShowPayment(false);
          }}
        />
      )}
    </div>
  );
}
