-- ================================================
-- EDUBRIDGE DATABASE SCHEMA
-- PostgreSQL | SDG 4: Quality Education
-- All tables, columns, and relationships defined
-- ================================================

-- TABLE 1: USERS
-- Stores every person on the platform
CREATE TABLE users (
    user_id    SERIAL PRIMARY KEY,
    name       VARCHAR(100) NOT NULL,
    email      VARCHAR(100) UNIQUE NOT NULL,
    password   VARCHAR(255) NOT NULL,
    role       VARCHAR(20)  NOT NULL CHECK (role IN ('student','mentor','admin')),
    join_date  TIMESTAMP DEFAULT NOW()
);

-- TABLE 2: COURSES
-- Stores all available courses by subject and grade
CREATE TABLE courses (
    course_id    SERIAL PRIMARY KEY,
    title        VARCHAR(200) NOT NULL,
    description  TEXT,
    subject      VARCHAR(100),
    grade_level  VARCHAR(50),
    difficulty   VARCHAR(20),
    is_published BOOLEAN DEFAULT false,
    created_at   TIMESTAMP DEFAULT NOW()
);

-- TABLE 3: ENROLLMENTS
-- Records which student enrolled in which course
CREATE TABLE enrollments (
    enrollment_id SERIAL PRIMARY KEY,
    student_id    INT REFERENCES users(user_id),
    course_id     INT REFERENCES courses(course_id),
    enroll_date   TIMESTAMP DEFAULT NOW(),
    status        VARCHAR(20) DEFAULT 'active'
);

-- TABLE 4: MATERIALS
-- Stores all learning files linked to courses
CREATE TABLE materials (
    material_id  SERIAL PRIMARY KEY,
    course_id    INT REFERENCES courses(course_id),
    title        VARCHAR(200) NOT NULL,
    subject      VARCHAR(100),
    grade_level  VARCHAR(50),
    file_url     VARCHAR(500),
    uploaded_by  INT REFERENCES users(user_id),
    uploaded_at  TIMESTAMP DEFAULT NOW()
);

-- TABLE 5: QUIZZES
-- Stores quiz questions linked to courses
CREATE TABLE quizzes (
    quiz_id     SERIAL PRIMARY KEY,
    course_id   INT REFERENCES courses(course_id),
    title       VARCHAR(200),
    questions   TEXT,
    time_limit  INT,
    created_at  TIMESTAMP DEFAULT NOW()
);

-- TABLE 6: QUIZ RESULTS
-- Records every student quiz attempt and score
CREATE TABLE quiz_results (
    result_id    SERIAL PRIMARY KEY,
    student_id   INT REFERENCES users(user_id),
    quiz_id      INT REFERENCES quizzes(quiz_id),
    score        INT,
    percentage   DECIMAL(5,2),
    submitted_at TIMESTAMP DEFAULT NOW()
);

-- TABLE 7: PROGRESS
-- Tracks each student material completion status
CREATE TABLE progress (
    progress_id       SERIAL PRIMARY KEY,
    student_id        INT REFERENCES users(user_id),
    material_id       INT REFERENCES materials(material_id),
    completion_status VARCHAR(20) DEFAULT 'not_started',
    score             INT,
    updated_at        TIMESTAMP DEFAULT NOW()
);

-- TABLE 8: MENTORSHIP
-- Records student-mentor pairing and request status
CREATE TABLE mentorship (
    mentorship_id SERIAL PRIMARY KEY,
    student_id    INT REFERENCES users(user_id),
    mentor_id     INT REFERENCES users(user_id),
    subject       VARCHAR(100),
    status        VARCHAR(20) DEFAULT 'pending',
    start_date    TIMESTAMP
);

-- TABLE 9: FORUM POSTS
-- Stores all community discussion posts
CREATE TABLE forum_posts (
    post_id    SERIAL PRIMARY KEY,
    author_id  INT REFERENCES users(user_id),
    title      VARCHAR(300),
    content    TEXT,
    category   VARCHAR(100),
    created_at TIMESTAMP DEFAULT NOW()
);

-- ================================================
-- SAMPLE DATA (for testing purposes)
-- ================================================

INSERT INTO users (name, email, password, role) VALUES
('Mary Sesay',    'mary@edubridge.sl',  'hashed_password', 'student'),
('James Koroma',  'james@edubridge.sl', 'hashed_password', 'mentor'),
('Admin User',    'admin@edubridge.sl', 'hashed_password', 'admin');

INSERT INTO courses (title, description, subject, grade_level, difficulty, is_published) VALUES
('Mathematics Grade 10', 'Algebra, Geometry, Statistics', 'Mathematics', 'Grade 10', 'intermediate', true),
('English Language',     'Grammar, Comprehension',        'English',     'Grade 10', 'beginner',     true),
('Science Grade 10',     'Physics, Chemistry, Biology',   'Science',     'Grade 10', 'intermediate', true);
