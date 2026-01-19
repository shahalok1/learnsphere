import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

/* ---------- Types ---------- */
type PlanItem = {
  week: number;
  focus: string;
};

type LearningPathData = {
  goal: string;
  daily_time: number;
  plan: PlanItem[];
};

export default function LearningPath() {
  const { user } = useAuth();

  /* ---------- Auth Guard ---------- */
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Please login to view your learning path.
      </div>
    );
  }

  const [data, setData] = useState<LearningPathData | null>(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);

  /* ---------- Fetch Learning Path ---------- */
  const fetchLearningPath = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/learning-path/${user.id}`);

      let plan = res.data.plan;

      // ✅ Handle stringified JSON from DB
      if (typeof plan === "string") {
        plan = JSON.parse(plan);
      }

      setData({
        goal: res.data.goal,
        daily_time: res.data.daily_time,
        plan: Array.isArray(plan) ? plan : []
      });
    } catch (err) {
      console.warn("No learning path found");
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLearningPath();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.id]);

  /* ---------- Loading ---------- */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading learning path...
      </div>
    );
  }

  /* ---------- Empty State ---------- */
  if (!data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center">
        <h2 className="text-2xl font-bold">
          No Learning Path Found
        </h2>

        <p className="text-gray-600 dark:text-gray-300 max-w-md">
          Generate a personalized roadmap to guide your learning journey.
        </p>

        <button
          disabled={generating}
          onClick={async () => {
            try {
              setGenerating(true);
              await api.post("/learning-path", {
                user_id: user.id,
                goal: "Full Stack Development",
                daily_time: 60
              });
              await fetchLearningPath(); // ✅ No reload
            } catch (err) {
              console.error("Failed to generate learning path", err);
            } finally {
              setGenerating(false);
            }
          }}
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
        >
          {generating ? "Generating..." : "Generate Learning Path"}
        </button>
      </div>
    );
  }

  /* ---------- UI ---------- */
  return (
    <div className="min-h-screen p-10 bg-gray-100 dark:bg-gray-900">
      <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">
        Your Learning Path
      </h1>

      <p className="text-gray-600 dark:text-gray-300 mb-6">
        🎯 Goal: <strong>{data.goal}</strong> · ⏱{" "}
        {data.daily_time} min/day
      </p>

      <div className="space-y-4">
        {data.plan.length === 0 ? (
          <p className="text-gray-500">
            Learning plan is empty.
          </p>
        ) : (
          data.plan.map((item) => (
            <div
              key={item.week}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow"
            >
              <strong>Week {item.week}:</strong> {item.focus}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
