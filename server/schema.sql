CREATE DATABASE IF NOT EXISTS portfolio
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE portfolio;

-- ---------------------------------------------------------------------------
-- Profile / about section (single row, id = 1)
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS profile (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  title VARCHAR(150) NOT NULL,
  bio TEXT,
  email VARCHAR(150),
  phone VARCHAR(50),
  location VARCHAR(150),
  github VARCHAR(255),
  linkedin VARCHAR(255),
  twitter VARCHAR(255),
  website VARCHAR(255),
  resume_url VARCHAR(255),
  avatar_url VARCHAR(255),
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ---------------------------------------------------------------------------
-- Skills
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS skills (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  category VARCHAR(50) NOT NULL DEFAULT 'General',
  level INT NOT NULL DEFAULT 80,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ---------------------------------------------------------------------------
-- Projects
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS projects (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(150) NOT NULL,
  description TEXT,
  image_url VARCHAR(500),
  tech_stack VARCHAR(255),
  live_url VARCHAR(255),
  repo_url VARCHAR(255),
  featured TINYINT(1) NOT NULL DEFAULT 0,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ---------------------------------------------------------------------------
-- Contact messages
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS messages (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL,
  subject VARCHAR(200),
  message TEXT NOT NULL,
  is_read TINYINT(1) NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ---------------------------------------------------------------------------
-- Seed data (safe to run multiple times)
-- ---------------------------------------------------------------------------
INSERT INTO profile (id, name, title, bio, email, phone, location, github, linkedin, twitter, website, resume_url, avatar_url)
SELECT 1,
  'INGABIRE JOSIANE',
  'Full Stack Developer & Designer',
  'I am a passionate full stack developer and designer who loves building clean, performant web applications. I specialize in React, Node.js and everything in between, turning ideas into delightful products.',
  'josiane@example.com',
  '+1 555 123 4567',
  'San Francisco, CA',
  'https://github.com/yourusername',
  'https://linkedin.com/in/yourusername',
  'https://twitter.com/yourusername',
  'https://yourwebsite.com',
  '/resume.pdf',
  ''
WHERE NOT EXISTS (SELECT 1 FROM profile WHERE id = 1);

INSERT INTO skills (name, category, level)
SELECT * FROM (
  SELECT 'React' AS name, 'Frontend' AS category, 92 AS level UNION ALL
  SELECT 'JavaScript', 'Frontend', 95 UNION ALL
  SELECT 'TypeScript', 'Frontend', 85 UNION ALL
  SELECT 'Tailwind CSS', 'Frontend', 90 UNION ALL
  SELECT 'Node.js', 'Backend', 90 UNION ALL
  SELECT 'Express', 'Backend', 88 UNION ALL
  SELECT 'MySQL', 'Backend', 85 UNION ALL
  SELECT 'MongoDB', 'Backend', 78 UNION ALL
  SELECT 'Docker', 'DevOps', 75 UNION ALL
  SELECT 'Git', 'Tools', 90
) AS seed
WHERE NOT EXISTS (SELECT 1 FROM skills);

INSERT INTO projects (title, description, image_url, tech_stack, live_url, repo_url, featured, sort_order)
SELECT * FROM (
  SELECT 'E-Commerce Platform' AS title,
    'A full-featured online store with product management, cart, checkout and an admin dashboard. Built with React, Express and MySQL.',
    'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80' AS image_url,
    'React,Express,MySQL,Stripe,Tailwind' AS tech_stack,
    'https://example.com' AS live_url,
    'https://github.com/yourusername/ecommerce' AS repo_url,
    1 AS featured, 1 AS sort_order UNION ALL
  SELECT 'Task Management App',
    'A collaborative kanban board with drag and drop, realtime updates and team workspaces.',
    'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&q=80',
    'React,Node.js,Socket.io,MongoDB',
    'https://example.com',
    'https://github.com/yourusername/tasks',
    1, 2 UNION ALL
  SELECT 'Weather Dashboard',
    'A beautiful weather dashboard with hourly and weekly forecasts, geolocation and saved cities.',
    'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800&q=80',
    'React,TypeScript,Tailwind,OpenWeatherAPI',
    'https://example.com',
    'https://github.com/yourusername/weather',
    0, 3
) AS seed
WHERE NOT EXISTS (SELECT 1 FROM projects);
