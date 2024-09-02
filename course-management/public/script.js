document.getElementById('courseList').addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const courseData = Object.fromEntries(formData);

    const response = await fetch('/courses/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(courseData)
    });

    if (response.ok) {
        alert('Course added successfully');
        window.location.href = 'index.html';
    }
    else {
        alert('Failed to add course');
    }
});

async function addCourse() {
    const response = await fetch('/courses');
    const course = await response.json();

    const courseList = document.getElementById('courseList');
    courseList.innerHTML = '';

    course.forEach(c => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${c.name}</td>
            <td>${c.category}</td>
            <td>${c.instructor}</td>
            <td>${c.duration} hours</td>
            <td><button onclick="deleteCourse(${c._id})">Delete</button></td>
        `;
        courseList.appendChild(row);
    });
}

addCourse();