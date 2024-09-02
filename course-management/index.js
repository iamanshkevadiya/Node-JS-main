const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const PORT = 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());
let Course = [
    {
        name: "Initial Course",
        category: "Programming",
        instructor: "Jane Doe",
        duration: '15 minutes',
        id: 1
    }
];

// GET Route: Welcome Message
app.get('/', (req, res) => {
    res.send('Welcome to the Online Course Management API.');
});

// GET Route: Serve all recipes
app.get('/courses', (req, res) => {
    res.json(Course);
});

// GET Route: Serve index.html
app.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// GET Route: Serve addCourse.html for adding new courses
app.get('/add', (req, res) => {
    res.sendFile(path.join(__dirname, 'addCourse.html'));
});

// POST Route : Add new courses
app.post('/courses/add', (req, res) => {
    const { name, category, instructor, duration } = req.body;

    if (!name || !category || !instructor || !duration) {
        return res.status(400).send('All fields are required');
    }

    const newCourse = {
        name,
        category,
        instructor,
        duration,
        id: Course.length + 1
    };
    Course.push(newCourse);
    res.status(201).json(newCourse);
});

// PATCH Routes : Update Course
app.patch('/courses/update/:id', (req, res) => {
    const { id } = req.params;
    const courseIndex = Course.findIndex(c => c.id === parseInt(id));

    if (courseIndex !== -1) {
        Course[courseIndex] = { ...Course[courseIndex], ...req.body };
        res.json(Course[courseIndex]);
    }
    else {
        return res.status(404).json('Course not found');
    }
});

// DELETE Route : Delete Course
app.delete('/courses/delete/:id', (req, res) => {
    const { id } = req.params;
    const courseIndex = Course.findIndex(c => c.id === parseInt(id));

    if (courseIndex !== -1) {
        Course.splice(courseIndex, 1);
        res.json({ message: 'Course deleted successfully' });
    }
    else {
        return res.status(404).json('Course not found');
    }
});

app.get('/courses/filter', (req, res) => {
    const { category, instructor, duration } = req.query;
    let filteredCourses = Course;

    if (category) {
        filteredCourses = filteredCourses.filter(course => course.category.toLowerCase() === category.toLowerCase());
    }
    if (instructor) {
        filteredCourses = filteredCourses.filter(course => course.instructor.toLowerCase() === instructor.toLowerCase());
    }
    if (duration) {
        filteredCourses = filteredCourses.filter(course => course.duration === Number(duration));
    }

    res.json(filteredCourses);
});

app.get('/course/:id', (req, res) => {
    const { id } = req.params;
    const course = Course.find(c => c.id === parseInt(id));

    if (!course) {
        return res.status(404).json('Course not found');
    }
    res.json(course);
})


app.listen(PORT, (req, res) => {
    console.log(`Server is running on port ${PORT}`);
});