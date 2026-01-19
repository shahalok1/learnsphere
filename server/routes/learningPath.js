const express = require("express");
const db = require("../config/db");

const router = express.Router();

/**
 * CREATE / UPDATE LEARNING PATH
 */
router.post("/", (req, res) => {
  const { user_id, goal, daily_time } = req.body;

  if (!user_id || !goal || !daily_time) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const plan = [
    { week: 1, focus: "HTML & CSS Basics" },
    { week: 2, focus: "JavaScript Fundamentals" },
    { week: 3, focus: "React Basics" },
    { week: 4, focus: "Node.js & Express" },
    { week: 5, focus: "MySQL & REST APIs" },
    { week: 6, focus: "Full Stack Project" }
  ];

  // Delete old path (keep only one)
  db.query(
    "DELETE FROM learning_paths WHERE user_id = ?",
    [user_id],
    (err) => {
      if (err) return res.status(500).json({ error: err });

      db.query(
        `
        INSERT INTO learning_paths (user_id, goal, daily_time, generated_plan)
        VALUES (?, ?, ?, ?)
        `,
        [user_id, goal, daily_time, JSON.stringify(plan)],
        (err) => {
          if (err)
            return res
              .status(500)
              .json({ error: "Failed to create learning path" });

          res.status(201).json({
            message: "Learning path generated",
            plan
          });
        }
      );
    }
  );
});

/**
 * GET LATEST LEARNING PATH
 */
router.get("/:userId", (req, res) => {
  const userId = Number(req.params.userId);

  db.query(
    `
    SELECT goal, daily_time, generated_plan
    FROM learning_paths
    WHERE user_id = ?
    ORDER BY created_at DESC
    LIMIT 1
    `,
    [userId],
    (err, results) => {
      if (err) return res.status(500).json({ error: "Database error" });

      if (!results || results.length === 0) {
        return res.status(404).json({ message: "No learning path found" });
      }

      let plan = results[0].generated_plan;
      if (typeof plan === "string") {
        plan = JSON.parse(plan);
      }

      res.json({
        goal: results[0].goal,
        daily_time: results[0].daily_time,
        plan
      });
    }
  );
});

module.exports = router;
