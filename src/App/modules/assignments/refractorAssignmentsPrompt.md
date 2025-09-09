You are a **senior full-stack developer**.

## 📌 Task

You are given a real-world code module located at:

```
/run/media/sj/developer/web/L1B11/career/jobTask/islamicquotes/islamic_quotes_server/src/App/modules/assignments
```

Refactor the entire codebase **without modifying any UI or changing behavior**. Instead, improve it using:

- ✅ Clear separation of concerns
- ✅ Consistent, semantic naming conventions
- ✅ Modular architecture (hooks, services, utils, components)
- ✅ Scalable file/folder structure
- ✅ Industry-standard project layout and architecture
- ✅ Readable, testable, production-grade code
- ✅ 100% behavior and API compatibility

👉 Output the refactored code to a new folder: `assignments_refactored`

Also return a `.sh` script that will:
- Create that folder
- Write all refactored files
- Run `git add` and `git commit` with message: `refactor: added improved assignments version`

---

## 🌲 Full Project Structure (cwd)

```bash
/run/media/sj/developer/web/L1B11/career/jobTask/islamicquotes/islamic_quotes_server
├── bun.lock
├── developer.md
├── env.example
├── package.json
├── public
│   └── CNAME
├── README.md
├── src
│   ├── App
│   │   ├── config
│   │   │   ├── corsOptions.js
│   │   │   └── db.js
│   │   ├── middlewires
│   │   │   ├── globalError.js
│   │   │   ├── notFound.js
│   │   │   └── validateRequest.js
│   │   ├── modules
│   │   │   ├── assignments
│   │   │   │   ├── assignmentData.json
│   │   │   │   ├── assignmentsApi.hur
│   │   │   │   ├── assignmentsApi.hurl
│   │   │   │   ├── assignments.controllers.js
│   │   │   │   ├── assignments.model.js
│   │   │   │   ├── assignments.route.js
│   │   │   │   ├── assignments.service.js
│   │   │   │   └── assignments.validation.js
│   │   │   ├── auth
│   │   │   │   ├── authApi.hurl
│   │   │   │   ├── auth.middleware.js
│   │   │   │   ├── auth.routes.js
│   │   │   │   ├── issueJwt.js
│   │   │   │   ├── jwt.js
│   │   │   │   ├── logout
│   │   │   │   │   └── logout.controller.js
│   │   │   │   └── verifyEmail.js
│   │   │   ├── readme.md
│   │   │   ├── root
│   │   │   │   ├── root.controller.js
│   │   │   │   └── root.route.js
│   │   │   └── submission
│   │   │       ├── submissionApi.hur
│   │   │       ├── submissionApi.hurl
│   │   │       ├── submission.controller.js
│   │   │       ├── submission.model.js
│   │   │       ├── submission.route.js
│   │   │       ├── submission.service.js
│   │   │       └── submission.validation.js
│   │   └── utils
│   │       ├── sendResponse.js
│   │       └── validateRequest.js
│   ├── app.js
│   └── server.js
├── structure.md
└── vercel.json

13 directories, 42 files
```

## 📁 Target Module Tree (assignments)

```bash
/run/media/sj/developer/web/L1B11/career/jobTask/islamicquotes/islamic_quotes_server/src/App/modules/assignments
├── assignmentData.json
├── assignmentsApi.hur
├── assignmentsApi.hurl
├── assignments.controllers.js
├── assignments.model.js
├── assignments.route.js
├── assignments.service.js
└── assignments.validation.js

1 directory, 8 files
```

## 📄 Module Files & Contents

### `assignmentData.json`
```javascripton
[
  {
    "_id": "684be0b0a15d0f1230098557",
    "title": "This assignment is updated right now",
    "description": "Find personalized assignments and study tasks that align with your courses and learning goals — no more irrelevant searching.",
    "marks": 10,
    "thumbnailUrl": "https://images.deepai.org/art-image/db207e69f2f54645b90073a029c9a82b/a-young-programmer-solving-javascript-coding-puzzles-.jpg",
    "difficulty": "hard",
    "dueDate": "03/07/25",
    "creatorEmail": "nidaa.al.imaan.official@gmail.com"
  },
  {
    "_id": "684be1a2a15d0f1230098667",
    "title": "JavaScript Puzzle Challenge",
    "description": "Solve tricky JavaScript problems that test your closures, scopes, and async understanding.",
    "marks": 15,
    "thumbnailUrl": "https://images.deepai.org/art-image/1d2ecf8dc87643b390c87a788e3c42ff/front-end-developer-working-with-css-grid-on-a-large-.jpg",
    "difficulty": "hard",
    "dueDate": "05/07/25",
    "creatorEmail": "mentor@codingdojo.com"
  },
  {
    "_id": "684be2c7a15d0f1230098778",
    "title": "CSS Grid Layout Mastery",
    "description": "Design responsive layouts using only CSS Grid. No Flexbox allowed.",
    "marks": 20,
    "thumbnailUrl": "https://images.deepai.org/art-image/6f480b27471548b58ff446d365f3c83f/react-developer-debugging-a-form-interface-highlighte.jpg",
    "difficulty": "medium",
    "dueDate": "08/07/25",
    "creatorEmail": "web@layoutpro.dev"
  },
  {
    "_id": "684be3d5a15d0f1230098889",
    "title": "Debug the React Form",
    "description": "Fix bugs in a broken React form, including validation and controlled components.",
    "marks": 12,
    "thumbnailUrl": "https://images.deepai.org/art-image/92e56026a0754d0298dd9b66894ceacc/api-engineer-designing-a-restful-architecture-with-po.jpg",
    "difficulty": "medium",
    "dueDate": "06/07/25",
    "creatorEmail": "react@tasker.dev"
  },
  {
    "_id": "684be4e1a15d0f1230098990",
    "title": "Build a RESTful API",
    "description": "Design a REST API for a blogging platform using Express and MongoDB.",
    "marks": 25,
    "thumbnailUrl": "https://images.deepai.org/art-image/ff1fd038326e40fba319cb457756dd75/junior-developer-creating-a-quiz-app-about-html-seman.jpg",
    "difficulty": "hard",
    "dueDate": "10/07/25",
    "creatorEmail": "api@backend.dev"
  },
  {
    "_id": "684be5f8a15d0f1230098001",
    "title": "HTML Semantics Quiz",
    "description": "Create a quiz app to test users on HTML semantic tags.",
    "marks": 8,
    "thumbnailUrl": "https://images.deepai.org/art-image/d289d406e21c4e0d99ee0901f5e8642c/coder-refactoring-old-javascript-to-typescript-surrou.jpg",
    "difficulty": "easy",
    "dueDate": "30/06/25",
    "creatorEmail": "html@basic.dev"
  },
  {
    "_id": "684be70aa15d0f1230098112",
    "title": "TypeScript Refactor Assignment",
    "description": "Refactor legacy JavaScript code into strongly typed TypeScript.",
    "marks": 18,
    "thumbnailUrl": "https://images.deepai.org/art-image/c55da655fc2f4926b7429b1bfb7f1839/coder-refactoring-old-javascript-to-typescript-surrou.jpg",
    "difficulty": "medium",
    "dueDate": "07/07/25",
    "creatorEmail": "ts@refactor.dev"
  },
  {
    "_id": "684be81ba15d0f1230098223",
    "title": "Node.js Streams Task",
    "description": "Build a CLI app that reads and writes data using Node.js streams.",
    "marks": 16,
    "thumbnailUrl": "https://images.deepai.org/art-image/cc595d71435c4c9bb9f9c156975befd3/cli-developer-working-with-node-js-streams-terminal-o.jpg",
    "difficulty": "hard",
    "dueDate": "12/07/25",
    "creatorEmail": "cli@stream.dev"
  },
  {
    "_id": "684be92fa15d0f1230098334",
    "title": "Debugging DOM Events",
    "description": "Identify and fix issues in DOM event handling code across a multipage website.",
    "marks": 14,
    "thumbnailUrl": "https://images.deepai.org/art-image/58946b34fccf4a6d93a704b5b98a668d/frontend-dev-fixing-dom-event-bugs-browser-inspector-.jpg",
    "difficulty": "medium",
    "dueDate": "04/07/25",
    "creatorEmail": "events@frontend.dev"
  },
  {
    "_id": "684bea41a15d0f1230098445",
    "title": "Async/Await Deep Dive",
    "description": "Complete code exercises focused on mastering async/await patterns and error handling.",
    "marks": 20,
    "thumbnailUrl": "https://images.deepai.org/art-image/d7be0eeb6cc348acb4326bd472418202/async-await-concepts-visualized-as-a-timeline-develop.jpg",
    "difficulty": "hard",
    "dueDate": "11/07/25",
    "creatorEmail": "async@jsmaster.dev"
  }
]
```

### `assignments.controllers.js`
```javascript
import sendResponse from "../../utils/sendResponse.js";
import { AssignmentServices } from "./assignments.service.js";

const createAssignment = async (req, res, next) => {
  try {
    const result = await AssignmentServices.createAssignmentIntoDB(req.body);
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Assignment created successfully!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/* const getAllAssignments = async (req, res, next) => {
  try {
    const result = await AssignmentServices.getAllAssignmentsFromDB();
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "All assignments retrieved successfully!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
}; */

const getAllAssignments = async (req, res, next) => {
  try {
    const { difficulty, search } = req.query;

    const filters = {};
    if (difficulty) filters.difficulty = difficulty;
    if (search) filters.searchTerm = search;

    const result = await AssignmentServices.getAllAssignmentsFromDB(filters);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Assignments retrieved successfully!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleAssignment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await AssignmentServices.getAssignmentByIdFromDB(id);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Assignment retrieved successfully!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateAssignment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await AssignmentServices.updateAssignmentIntoDB(
      id,
      req.body,
    );
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Assignment updated successfully!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteAssignment = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { email } = req.body;
    console.log(email, "assignments.controllers.js", 70);
    const result = await AssignmentServices.deleteAssignmentFromDB(id, email);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Assignment deleted successfully!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const AssignmentControllers = {
  createAssignment,
  getAllAssignments,
  getSingleAssignment,
  deleteAssignment,
  updateAssignment,
};
```

### `assignments.model.js`
```javascript
import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Assignment title is required"],
      trim: true,
      minlength: [5, "Title must be at least 5 characters long"],
    },
    description: {
      type: String,
      required: [true, "Assignment description is required"],
      minlength: [20, "Description must be at least 20 characters"],
    },
    marks: {
      type: Number,
      required: [true, "Marks are required"],
      min: [1, "Marks must be at least 1"],
    },
    thumbnailUrl: {
      type: String,
      required: [true, "Thumbnail URL is required"],
    },
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      required: [true, "Difficulty level is required"],
    },
    dueDate: {
      type: Date,
      required: [true, "Due date is required"],
    },
    creatorEmail: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Assignment = mongoose.model("Assignment", assignmentSchema);

export default Assignment;
```

### `assignments.route.js`
```javascript
import { AssignmentControllers } from "./assignments.controllers.js";

import verifyEmail from "../auth/verifyEmail.js";
import express from "express";
import validateRequest from "../../utils/validateRequest.js";
import { AssignmentsValidationSchema } from "./assignments.validation.js";
import { verifyToken } from "../auth/jwt.js";

const router = express.Router();

// Create a new assignment
router.post(
  "/create-assignment",
  verifyToken,
  verifyEmail,
  validateRequest(AssignmentsValidationSchema.createAssignmentSchema),
  AssignmentControllers.createAssignment,
);

// Get all assignments
router.get("/", AssignmentControllers.getAllAssignments);

// Get a single assignment by ID
router.get("/:id", verifyToken, AssignmentControllers.getSingleAssignment);
router.patch(
  "/update-assignment/:id",
  validateRequest(AssignmentsValidationSchema.updateAssignmentSchema),
  AssignmentControllers.updateAssignment,
);

// Delete an assignment by ID
router.delete(
  "/delete-assignment/:id",
  verifyToken,
  verifyEmail,
  AssignmentControllers.deleteAssignment,
);

export const AssignmentRoutes = router;
```

### `assignments.service.js`
```javascript
import Assignment from "./assignments.model.js";

// ✅ Create Assignment
const createAssignmentIntoDB = async (data) => {
  const assignment = new Assignment(data);
  return await assignment.save();
};

// ✅ Get All Assignments
/* const getAllAssignmentsFromDB = async (filter = {}) => {
  return await Assignment.find(filter).sort({ createdAt: -1 });
}; */

// ✅ Enhanced Get All Assignments
const getAllAssignmentsFromDB = async (filter = {}) => {
  const query = {};

  // Filter by difficulty
  if (filter.difficulty) {
    query.difficulty = filter.difficulty;
  }

  // Search by title (case-insensitive)
  if (filter.searchTerm) {
    query.title = { $regex: filter.searchTerm, $options: "i" };
  }

  return await Assignment.find(query).sort({ createdAt: -1 });
};

// ✅ Get Single Assignment by ID
const getAssignmentByIdFromDB = async (id) => {
  return await Assignment.findById(id);
};

// ✅ Update Assignment
const updateAssignmentIntoDB = async (id, updatedData) => {
  return await Assignment.findByIdAndUpdate(id, updatedData, {
    new: true,
    runValidators: true,
  });
};

// ✅ Delete Assignment (Only if creator matches)
const deleteAssignmentFromDB = async (id, email) => {
  const assignment = await Assignment.findById(id);
  if (!assignment) {
    throw new Error("Assignment not found");
  }
  if (assignment?.creatorEmail !== email) {
    throw new Error("Oops! Only the creator can delete this assignment.");
  }

  return await Assignment.findByIdAndDelete(id);
};

export const AssignmentServices = {
  createAssignmentIntoDB,
  updateAssignmentIntoDB,
  getAssignmentByIdFromDB,
  getAllAssignmentsFromDB,
  deleteAssignmentFromDB,
};
```

### `assignments.validation.js`
```javascript
import Joi from "joi";

const createAssignmentSchema = Joi.object({
  title: Joi.string().min(5).required().messages({
    "string.base": "Title must be a string",
    "string.min": "Title must be at least 5 characters",
    "any.required": "Title is required",
  }),

  description: Joi.string().min(20).required().messages({
    "string.base": "Description must be a string",
    "string.min": "Description must be at least 20 characters",
    "any.required": "Description is required",
  }),

  marks: Joi.number().min(1).required().messages({
    "number.base": "Marks must be a number",
    "number.min": "Marks must be at least 1",
    "any.required": "Marks are required",
  }),

  thumbnailUrl: Joi.string().uri().required().messages({
    "string.uri": "Thumbnail must be a valid URL",
    "any.required": "Thumbnail URL is required",
  }),

  difficulty: Joi.string().valid("easy", "medium", "hard").required().messages({
    "any.only": "Difficulty must be one of easy, medium, or hard",
    "any.required": "Difficulty is required",
  }),

  dueDate: Joi.date().greater("now").required().messages({
    "date.base": "Due Date must be a valid date",
    "date.greater": "Due Date must be in the future",
    "any.required": "Due Date is required",
  }),

  creatorEmail: Joi.string().email().required(),
});

const updateAssignmentSchema = Joi.object({
  title: Joi.string().min(5),
  description: Joi.string().min(20),
  marks: Joi.number().min(1),
  thumbnailUrl: Joi.string().uri(),
  difficulty: Joi.string().valid("easy", "medium", "hard"),
  dueDate: Joi.date().greater("now"),
}).min(1); // require at least one field for update

export const AssignmentsValidationSchema = {
  createAssignmentSchema,
  updateAssignmentSchema,
};
```

### `assignmentsApi.hur`
```hur
GET  http://localhost:5000/api/v1/assignments




GET  http://localhost:5000


GET  http://localhost:5000/not-found






GET  http://localhost:5000/api/v1/assignments/684a56a999f83617489ebb2c




DELETE http://localhost:5000/api/v1/assignments/delete-assignment/684a4b09b1de13c0699641df
Cookie: token="add-your-token-here"
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9




PATCH  http://localhost:5000/api/v1/update-assignment/684a56a999f83617489ebb2c
Content-Type: application/json
{
    "thumbnailUrl": "https://i.ibb.co.com/PZ3DWGJk/developerpuzzles.png"
}


POST http://localhost:5000/api/v1/create-assignment
Content-Type: application/json
{
    "title": "Build a Blog Platform with Node.js",
    "description": "Create a complete blog application using Node.js, Express, and MongoDB that supports posts, comments, and user authentication.",
    "marks": 100,
    "thumbnailUrl": "https://i.ibb.co.com/PZ3DWGJk/developerpuzzles.png",
    "difficulty": "medium",
    "dueDate": "2025-07-01T00:00:00.000Z",
    "creatorEmail": "teacher@eduverse.com"
}



POST  http://localhost:5000/api/v1/create-schedules

Content-Type: application/json

[
  {
    "title": "Chest Workout",
    "day": "Monday",
    "formattedDate": "2025-05-19",
    "isCompleted": false
  },
  {
    "title": "Back & Biceps",
    "day": "Tuesday",
    "formattedDate": "2025-05-20",
    "isCompleted": false
  },
  {
    "title": "Leg Day",
    "day": "Wednesday",
    "formattedDate": "2025-05-21",
    "isCompleted": false
  },
  {
    "title": "Cardio & Core",
    "day": "Thursday",
    "formattedDate": "2025-05-22",
    "isCompleted": false
  },
  {
    "title": "Shoulders & Triceps",
    "day": "Friday",
    "formattedDate": "2025-05-23",
    "isCompleted": false
  },
  {
    "title": "Full Body Stretch",
    "day": "Saturday",
    "formattedDate": "2025-05-24",
    "isCompleted": false
  },
  {
    "title": "Active Recovery Walk",
    "day": "Sunday",
    "formattedDate": "2025-05-25",
    "isCompleted": false
  },
  {
    "title": "Push Workout",
    "day": "Monday",
    "formattedDate": "2025-05-26",
    "isCompleted": false
  },
  {
    "title": "Pull Workout",
    "day": "Tuesday",
    "formattedDate": "2025-05-27",
    "isCompleted": false
  },
  {
    "title": "HIIT Session",
    "day": "Wednesday",
    "formattedDate": "2025-05-28",
    "isCompleted": false
  }
]



```

### `assignmentsApi.hurl`
```hurl
GET  http://localhost:5000/api/v1/assignments
GET  http://localhost:5000/api/v1/assignments?search=css




GET  http://localhost:5000


GET  http://localhost:5000/not-found






GET  http://localhost:5000/api/v1/assignments/684d3c0952b1bd8add06090a
Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlYWNoZXIyQGVkdXZlcnNlLmNvbSIsImlhdCI6MTc1NzQxNjgyOSwiZXhwIjoxNzU3NTAzMjI5fQ.BdRzCWT9xpKcmq_wtyuqPCd6c6LVIASNA8S2YwTQy-A






DELETE http://localhost:5000/api/v1/assignments/delete-assignment/6850d5868c55ab02cf0dcee3
Content-Type: application/json
Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImltcmFuQGdtYWlsLmNvbSIsImlhdCI6MTc1MDEyNDI1OSwiZXhwIjoxNzUwMjEwNjU5fQ.fAR3ZZJ3e5M2c6Gy7WegF201FpiYkCOXl_hvB3WeCTw

{
  "email": "imran@gmail.com"
}

Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9




PATCH  http://localhost:5000/api/v1/assignments/update-assignment/684abeaf34e52f875cbfebf4
Content-Type: application/json
Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlYWNoZXJAZWR1dmVyc2UuY29tIiwiaWF0IjoxNzQ5NzA3NTA3LCJleHAiOjE3NDk3OTM5MDd9.N8kxW_5idPgvLB_6nzkemFrcdN-xRkLNiSPIILKJSqs

{
    "title": "Assignment title updated"
}


POST http://localhost:5000/api/v1/assignments/create-assignment
Content-Type: application/json
Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImltcmFuQGdtYWlsLmNvbSIsImlhdCI6MTc1MDEyNDI1OSwiZXhwIjoxNzUwMjEwNjU5fQ.fAR3ZZJ3e5M2c6Gy7WegF201FpiYkCOXl_hvB3WeCTw
{
    "title": "Build a Blog Platform with Node.js",
    "description": "Create a complete blog application using Node.js, Express, and MongoDB that supports posts, comments, and user authentication.",
    "marks": 100,
    "thumbnailUrl": "https://i.ibb.co.com/PZ3DWGJk/developerpuzzles.png",
    "difficulty": "medium",
    "dueDate": "2025-07-01T00:00:00.000Z",
    "creatorEmail": "imran@gmail.com"
}




```
