// =====================================================
// ЗАДАНИЕ 2. Ограничения уникальности + узлы + отношения
// Вариант 1 — Университет
// =====================================================

// ----- ОГРАНИЧЕНИЯ УНИКАЛЬНОСТИ -----
CREATE CONSTRAINT student_id_unique IF NOT EXISTS
FOR (s:Student) REQUIRE s.id IS UNIQUE;

CREATE CONSTRAINT course_id_unique IF NOT EXISTS
FOR (c:Course) REQUIRE c.id IS UNIQUE;

CREATE CONSTRAINT teacher_id_unique IF NOT EXISTS
FOR (t:Teacher) REQUIRE t.id IS UNIQUE;


// ----- СТУДЕНТЫ (6) -----
MERGE (s1:Student {id: 1}) SET s1.name = "Aibek", s1.group = "IS-24-1", s1.year = 2;
MERGE (s2:Student {id: 2}) SET s2.name = "Aliya", s2.group = "IS-24-1", s2.year = 2;
MERGE (s3:Student {id: 3}) SET s3.name = "Damir", s3.group = "IS-24-2", s3.year = 3;
MERGE (s4:Student {id: 4}) SET s4.name = "Aigerim", s4.group = "IS-24-1", s4.year = 2;
MERGE (s5:Student {id: 5}) SET s5.name = "Nurlan", s5.group = "IS-24-2", s5.year = 3;
MERGE (s6:Student {id: 6}) SET s6.name = "Asel", s6.group = "IS-24-3", s6.year = 1;


// ----- КУРСЫ (5) -----
MERGE (c1:Course {id: 101}) SET c1.title = "NoSQL", c1.credits = 5, c1.semester = 5;
MERGE (c2:Course {id: 102}) SET c2.title = "Algorithms", c2.credits = 4, c2.semester = 3;
MERGE (c3:Course {id: 103}) SET c3.title = "Databases", c3.credits = 5, c3.semester = 4;
MERGE (c4:Course {id: 104}) SET c4.title = "Web Development", c4.credits = 3, c4.semester = 4;
MERGE (c5:Course {id: 105}) SET c5.title = "Machine Learning", c5.credits = 6, c5.semester = 6;


// ----- ПРЕПОДАВАТЕЛИ (4) -----
MERGE (t1:Teacher {id: 201}) SET t1.name = "Instructor A", t1.department = "CS", t1.experience = 8;
MERGE (t2:Teacher {id: 202}) SET t2.name = "Instructor B", t2.department = "CS", t2.experience = 5;
MERGE (t3:Teacher {id: 203}) SET t3.name = "Dr. Smith", t3.department = "AI", t3.experience = 12;
MERGE (t4:Teacher {id: 204}) SET t4.name = "Prof. Johnson", t4.department = "SE", t4.experience = 15;


// ----- ОТНОШЕНИЯ STUDIES (12) -----
MATCH (s:Student {id: 1}), (c:Course {id: 101}) MERGE (s)-[:STUDIES {semester: 5}]->(c);
MATCH (s:Student {id: 1}), (c:Course {id: 103}) MERGE (s)-[:STUDIES {semester: 4}]->(c);
MATCH (s:Student {id: 2}), (c:Course {id: 101}) MERGE (s)-[:STUDIES {semester: 5}]->(c);
MATCH (s:Student {id: 2}), (c:Course {id: 104}) MERGE (s)-[:STUDIES {semester: 4}]->(c);
MATCH (s:Student {id: 3}), (c:Course {id: 102}) MERGE (s)-[:STUDIES {semester: 3}]->(c);
MATCH (s:Student {id: 3}), (c:Course {id: 105}) MERGE (s)-[:STUDIES {semester: 6}]->(c);
MATCH (s:Student {id: 4}), (c:Course {id: 101}) MERGE (s)-[:STUDIES {semester: 5}]->(c);
MATCH (s:Student {id: 4}), (c:Course {id: 103}) MERGE (s)-[:STUDIES {semester: 4}]->(c);
MATCH (s:Student {id: 5}), (c:Course {id: 102}) MERGE (s)-[:STUDIES {semester: 3}]->(c);
MATCH (s:Student {id: 5}), (c:Course {id: 105}) MERGE (s)-[:STUDIES {semester: 6}]->(c);
MATCH (s:Student {id: 6}), (c:Course {id: 104}) MERGE (s)-[:STUDIES {semester: 4}]->(c);
MATCH (s:Student {id: 6}), (c:Course {id: 101}) MERGE (s)-[:STUDIES {semester: 5}]->(c);


// ----- ОТНОШЕНИЯ TEACHES (6) -----
MATCH (t:Teacher {id: 201}), (c:Course {id: 101}) MERGE (t)-[:TEACHES {hours: 60}]->(c);
MATCH (t:Teacher {id: 201}), (c:Course {id: 103}) MERGE (t)-[:TEACHES {hours: 45}]->(c);
MATCH (t:Teacher {id: 202}), (c:Course {id: 102}) MERGE (t)-[:TEACHES {hours: 50}]->(c);
MATCH (t:Teacher {id: 203}), (c:Course {id: 105}) MERGE (t)-[:TEACHES {hours: 70}]->(c);
MATCH (t:Teacher {id: 204}), (c:Course {id: 104}) MERGE (t)-[:TEACHES {hours: 40}]->(c);
MATCH (t:Teacher {id: 204}), (c:Course {id: 103}) MERGE (t)-[:TEACHES {hours: 55}]->(c);
