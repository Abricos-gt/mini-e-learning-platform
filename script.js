// Course data
const coursesData = [
    {
        id: 1,
        title: "Web Development Fundamentals",
        description: "Learn the basics of HTML, CSS, and JavaScript to build modern websites.",
        duration: "4 weeks",
        lessons: [
            { id: 1, title: "Introduction to HTML", description: "Learn HTML structure and semantic elements", completed: false },
            { id: 2, title: "CSS Styling", description: "Master CSS selectors, properties, and layouts", completed: false },
            { id: 3, title: "JavaScript Basics", description: "Variables, functions, and DOM manipulation", completed: false },
            { id: 4, title: "Responsive Design", description: "Create mobile-friendly websites", completed: false }
        ],
        completed: false
    },
    {
        id: 2,
        title: "React Development",
        description: "Build dynamic user interfaces with React and modern JavaScript.",
        duration: "6 weeks",
        lessons: [
            { id: 1, title: "React Components", description: "Understanding components and JSX", completed: false },
            { id: 2, title: "State Management", description: "useState and useEffect hooks", completed: false },
            { id: 3, title: "Props and Events", description: "Component communication", completed: false },
            { id: 4, title: "React Router", description: "Navigation in React applications", completed: false },
            { id: 5, title: "API Integration", description: "Fetching data from external APIs", completed: false },
            { id: 6, title: "Deployment", description: "Deploying React applications", completed: false }
        ],
        completed: false
    },
    {
        id: 3,
        title: "Python Programming",
        description: "Master Python programming from basics to advanced concepts.",
        duration: "8 weeks",
        lessons: [
            { id: 1, title: "Python Basics", description: "Variables, data types, and operators", completed: false },
            { id: 2, title: "Control Structures", description: "Loops, conditionals, and functions", completed: false },
            { id: 3, title: "Data Structures", description: "Lists, dictionaries, and tuples", completed: false },
            { id: 4, title: "Object-Oriented Programming", description: "Classes, objects, and inheritance", completed: false },
            { id: 5, title: "File Handling", description: "Reading and writing files", completed: false },
            { id: 6, title: "Error Handling", description: "Try-catch blocks and exceptions", completed: false },
            { id: 7, title: "Modules and Packages", description: "Creating and importing modules", completed: false },
            { id: 8, title: "Web Scraping", description: "Extracting data from websites", completed: false }
        ],
        completed: false
    },
    {
        id: 4,
        title: "Data Science with Python",
        description: "Analyze data and build machine learning models using Python.",
        duration: "10 weeks",
        lessons: [
            { id: 1, title: "NumPy Fundamentals", description: "Working with arrays and mathematical operations", completed: false },
            { id: 2, title: "Pandas DataFrames", description: "Data manipulation and analysis", completed: false },
            { id: 3, title: "Data Visualization", description: "Creating charts with Matplotlib and Seaborn", completed: false },
            { id: 4, title: "Statistical Analysis", description: "Descriptive and inferential statistics", completed: false },
            { id: 5, title: "Machine Learning Basics", description: "Introduction to ML algorithms", completed: false },
            { id: 6, title: "Regression Models", description: "Linear and polynomial regression", completed: false },
            { id: 7, title: "Classification Models", description: "Decision trees and random forests", completed: false },
            { id: 8, title: "Clustering", description: "K-means and hierarchical clustering", completed: false },
            { id: 9, title: "Model Evaluation", description: "Cross-validation and metrics", completed: false },
            { id: 10, title: "Project Work", description: "Complete data science project", completed: false }
        ],
        completed: false
    }
];

// Load course data from localStorage or use default
let courses = JSON.parse(localStorage.getItem('courses')) || coursesData;

// Save courses to localStorage
function saveCourses() {
    localStorage.setItem('courses', JSON.stringify(courses));
}

// Calculate course progress
function calculateProgress(course) {
    const completedLessons = course.lessons.filter(lesson => lesson.completed).length;
    return Math.round((completedLessons / course.lessons.length) * 100);
}

// Render courses on home page
function renderCourses() {
    const coursesGrid = document.getElementById('coursesGrid');
    if (!coursesGrid) return;

    coursesGrid.innerHTML = '';

    courses.forEach(course => {
        const progress = calculateProgress(course);
        const courseCard = document.createElement('div');
        courseCard.className = 'course-card';
        courseCard.onclick = () => openCourseDetail(course.id);

        courseCard.innerHTML = `
            <div class="course-image">${course.title.charAt(0)}</div>
            <div class="course-content">
                <h3 class="course-title">${course.title}</h3>
                <p class="course-description">${course.description}</p>
                <div class="course-meta">
                    <span class="course-duration">${course.duration}</span>
                    <span class="course-progress-text">${progress}% Complete</span>
                </div>
                <div class="course-progress">
                    <div class="progress-bar" style="width: ${progress}%"></div>
                </div>
                <div class="course-actions">
                    <button class="btn btn-primary" onclick="event.stopPropagation(); openCourseDetail(${course.id})">
                        ${course.completed ? 'Review Course' : 'Start Course'}
                    </button>
                    ${course.completed ? 
                        '<span class="btn btn-completed">✓ Completed</span>' : 
                        '<button class="btn btn-secondary" onclick="event.stopPropagation(); markCourseComplete(${course.id})">Mark Complete</button>'
                    }
                </div>
            </div>
        `;

        coursesGrid.appendChild(courseCard);
    });
}

// Open course detail page
function openCourseDetail(courseId) {
    const course = courses.find(c => c.id === courseId);
    if (!course) return;

    // Create course detail page HTML
    const courseDetailHTML = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${course.title} - E-Learning Platform</title>
            <link rel="stylesheet" href="styles.css">
        </head>
        <body>
            <header class="header">
                <div class="container">
                    <h1 class="logo">E-Learn</h1>
                    <nav class="nav">
                        <a href="index.html" class="nav-link">Home</a>
                        <a href="#" class="nav-link active">My Courses</a>
                    </nav>
                </div>
            </header>

            <main class="main">
                <div class="container">
                    <div class="course-detail">
                        <div class="course-header">
                            <h1>${course.title}</h1>
                            <p>${course.description}</p>
                            <div class="course-meta">
                                <span class="course-duration">Duration: ${course.duration}</span>
                                <span class="course-progress-text">Progress: ${calculateProgress(course)}%</span>
                            </div>
                            <div class="course-progress">
                                <div class="progress-bar" style="width: ${calculateProgress(course)}%"></div>
                            </div>
                        </div>

                        <div class="lessons-list">
                            <h3>Course Lessons</h3>
                            ${course.lessons.map(lesson => `
                                <div class="lesson-item">
                                    <div class="lesson-number">${lesson.id}</div>
                                    <div class="lesson-content">
                                        <div class="lesson-title">${lesson.title}</div>
                                        <div class="lesson-description">${lesson.description}</div>
                                    </div>
                                    <div class="lesson-status">
                                        <span class="${lesson.completed ? 'status-completed' : 'status-pending'}">
                                            ${lesson.completed ? '✓ Completed' : '○ Pending'}
                                        </span>
                                    </div>
                                </div>
                            `).join('')}
                        </div>

                        <div class="course-actions" style="margin-top: 2rem; text-align: center;">
                            <button class="btn btn-primary" onclick="markCourseComplete(${course.id})">
                                ${course.completed ? 'Course Completed ✓' : 'Mark Course Complete'}
                            </button>
                            <a href="index.html" class="btn btn-secondary">Back to Courses</a>
                        </div>
                    </div>
                </div>
            </main>

            <footer class="footer">
                <div class="container">
                    <p>&copy; 2024 E-Learning Platform. All rights reserved.</p>
                </div>
            </footer>

            <script>
                // Course data and functions (same as main script)
                const coursesData = ${JSON.stringify(coursesData)};
                let courses = JSON.parse(localStorage.getItem('courses')) || coursesData;

                function saveCourses() {
                    localStorage.setItem('courses', JSON.stringify(courses));
                }

                function calculateProgress(course) {
                    const completedLessons = course.lessons.filter(lesson => lesson.completed).length;
                    return Math.round((completedLessons / course.lessons.length) * 100);
                }

                function markCourseComplete(courseId) {
                    const course = courses.find(c => c.id === courseId);
                    if (course) {
                        course.completed = !course.completed;
                        // Mark all lessons as completed if course is completed
                        if (course.completed) {
                            course.lessons.forEach(lesson => lesson.completed = true);
                        }
                        saveCourses();
                        
                        // Show success message
                        alert(course.completed ? 'Course marked as completed!' : 'Course marked as incomplete!');
                        
                        // Reload the page to update the UI
                        location.reload();
                    }
                }
            </script>
        </body>
        </html>
    `;

    // Open course detail in new window/tab
    const newWindow = window.open('', '_blank');
    newWindow.document.write(courseDetailHTML);
    newWindow.document.close();
}

// Mark course as complete
function markCourseComplete(courseId) {
    const course = courses.find(c => c.id === courseId);
    if (course) {
        course.completed = !course.completed;
        // Mark all lessons as completed if course is completed
        if (course.completed) {
            course.lessons.forEach(lesson => lesson.completed = true);
        }
        saveCourses();
        
        // Show success message
        alert(course.completed ? 'Course marked as completed!' : 'Course marked as incomplete!');
        
        // Re-render courses to update the UI
        renderCourses();
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    renderCourses();
});
