ЛАБОРАТОРНАЯ РАБОТА №9

Создание графа в Neo4j и выполнение базовых запросов Cypher

Вариант 1 — Университет1. Цель работыОсвоить модель property graph, создать граф предметной области «Университет» в Neo4j и выполнить базовые операции на языке Cypher.2. Предметная областьСтуденты изучают курсы, преподаватели читают эти курсы.

Метки: Student, Course, Teacher

Отношения: STUDIES (студент → курс), TEACHES (преподаватель → курс)3. Схема графа (Задание 1)Узлы:
Student — id, name, group, year
Course — id, title, credits, semester
Teacher — id, name, department, experience
Отношения:
(Student)-[:STUDIES {semester, grade}]->(Course)
(Teacher)-[:TEACHES {hours}]->(Course)
4. Таблица меток и отношений




















МеткаСвойстваStudentid, name, group, yearCourseid, title, credits, semesterTeacherid, name, department, experience



















ОтношениеНаправлениеСвойстваSTUDIESStudent → Coursesemester, gradeTEACHESTeacher → Coursehours5. Полный код и скриншотыЗадание 2. Ограничения + узлы + отношенияcypherCREATE CONSTRAINT student_id_unique IF NOT EXISTS
FOR (s:Student) REQUIRE s.id IS UNIQUE;

CREATE CONSTRAINT course_id_unique IF NOT EXISTS
FOR (c:Course) REQUIRE c.id IS UNIQUE;

CREATE CONSTRAINT teacher_id_unique IF NOT EXISTS
FOR (t:Teacher) REQUIRE t.id IS UNIQUE;Скриншот: создание ограничений (3 зелёные галочки)

→ твой скриншот 121153.pngcypherMERGE (s1:Student {id: 1}) SET s1.name = "Aibek", s1.group = "IS-24-1", s1.year = 2;
MERGE (s2:Student {id: 2}) SET s2.name = "Aliya", s2.group = "IS-24-1", s2.year = 2;
MERGE (s3:Student {id: 3}) SET s3.name = "Damir", s3.group = "IS-24-2", s3.year = 3;
MERGE (s4:Student {id: 4}) SET s4.name = "Aigerim", s4.group = "IS-24-1", s4.year = 2;
MERGE (s5:Student {id: 5}) SET s5.name = "Nurlan", s5.group = "IS-24-2", s5.year = 3;
MERGE (s6:Student {id: 6}) SET s6.name = "Asel", s6.group = "IS-24-3", s6.year = 1;

MERGE (c1:Course {id: 101}) SET c1.title = "NoSQL", c1.credits = 5, c1.semester = 5;
MERGE (c2:Course {id: 102}) SET c2.title = "Algorithms", c2.credits = 4, c2.semester = 3;
MERGE (c3:Course {id: 103}) SET c3.title = "Databases", c3.credits = 5, c3.semester = 4;
MERGE (c4:Course {id: 104}) SET c4.title = "Web Development", c4.credits = 3, c4.semester = 4;
MERGE (c5:Course {id: 105}) SET c5.title = "Machine Learning", c5.credits = 6, c5.semester = 6;

MERGE (t1:Teacher {id: 201}) SET t1.name = "Instructor A", t1.department = "CS", t1.experience = 8;
MERGE (t2:Teacher {id: 202}) SET t2.name = "Instructor B", t2.department = "CS", t2.experience = 5;
MERGE (t3:Teacher {id: 203}) SET t3.name = "Dr. Smith", t3.department = "AI", t3.experience = 12;
MERGE (t4:Teacher {id: 204}) SET t4.name = "Prof. Johnson", t4.department = "SE", t4.experience = 15;Скриншоты:
Nodes (15) → 121438.png и 121455.png
cypherMATCH (s:Student {id: 1}), (c:Course {id: 101}) MERGE (s)-[:STUDIES {semester: 5}]->(c);
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

MATCH (t:Teacher {id: 201}), (c:Course {id: 101}) MERGE (t)-[:TEACHES {hours: 60}]->(c);
MATCH (t:Teacher {id: 201}), (c:Course {id: 103}) MERGE (t)-[:TEACHES {hours: 45}]->(c);
MATCH (t:Teacher {id: 202}), (c:Course {id: 102}) MERGE (t)-[:TEACHES {hours: 50}]->(c);
MATCH (t:Teacher {id: 203}), (c:Course {id: 105}) MERGE (t)-[:TEACHES {hours: 70}]->(c);
MATCH (t:Teacher {id: 204}), (c:Course {id: 104}) MERGE (t)-[:TEACHES {hours: 40}]->(c);
MATCH (t:Teacher {id: 204}), (c:Course {id: 103}) MERGE (t)-[:TEACHES {hours: 55}]->(c);Скриншоты:
Создание отношений → 121633.png
Граф STUDIES → 123011.png
Граф TEACHES → 123113.png
Узлы Student → 123023.png
Узлы Teacher → 123033.png
Задание 3. MATCH + ORDER BY + LIMITcypherMATCH (s:Student) RETURN s;

MATCH (s:Student)
RETURN s.name AS student, s.group AS groupName, s.year AS year
ORDER BY student LIMIT 10;Скриншоты:
Граф 6 студентов → 122545.png
Таблица с сортировкой → 122604.png
Задание 4. Запросы по связямcypherMATCH (s:Student)-[:STUDIES]->(c:Course)
RETURN s.name AS student, c.title AS course;

MATCH (t:Teacher)-[:TEACHES]->(c:Course)<-[:STUDIES]-(s:Student)
RETURN t.name AS teacher, c.title AS course, s.name AS student
ORDER BY teacher, course;

MATCH (s:Student {name: "Aibek"})-[:STUDIES]->(c:Course)<-[:TEACHES]-(t:Teacher)
RETURN s.name AS student, c.title AS course, t.name AS teacher;Скриншоты:
Одношаговый переход → 122716.png
Двухшаговый запрос → 122725.png
Курсы Aibek → 122736.png
Задание 5. WHEREcypherMATCH (s:Student)
WHERE s.group = "IS-24-1"
RETURN s.name, s.year;

MATCH (c:Course)
WHERE c.credits >= 5
RETURN c.title, c.credits
ORDER BY c.credits DESC;Скриншоты:
Фильтр по группе → 122839.png
Фильтр по credits → 122847.png
Задание 6. SETcypherMATCH (s:Student {id: 1})
SET s.year = 3
RETURN s;

MATCH (s:Student {id: 1})-[r:STUDIES]->(c:Course {id: 101})
SET r.grade = "A"
RETURN s.name, r.semester, r.grade, c.title;Скриншоты:
Изменение year → 122948.png
Добавление grade → 122957.png
Задание 7. DETACH DELETEcypherCREATE (:Temp {id: 999, note: "delete-me"});

MATCH (n:Temp {id: 999})
DETACH DELETE n;

MATCH (n:Temp {id: 999})
RETURN count(n) AS remaining;Скриншот: remaining = 0 → 123200.pngЗадание 8. Проверка MERGEcypherMATCH (s:Student) RETURN count(s) AS students;
MATCH (c:Course)  RETURN count(c) AS courses;
MATCH (t:Teacher) RETURN count(t) AS teachers;
MATCH ()-[r]->()  RETURN count(r) AS relationships;Скриншоты:
students = 6 → 123255.png
courses = 5 → 123304.png
teachers = 4 → 123316.png
relationships = 18 → 123324.png
Дополнительное заданиеcypherMATCH (a:Student)-[:STUDIES]->(c:Course)<-[:STUDIES]-(b:Student)
WHERE a.id < b.id
RETURN a.name AS firstStudent,
       b.name AS secondStudent,
       collect(DISTINCT c.title) AS sharedCourses
ORDER BY firstStudent, secondStudent;Скриншот: пары студентов с общими курсами → 123423.png6. Пояснения
MATCH — ищет шаблон в графе
MERGE — ищет или создаёт (нет дублей)
WHERE — фильтрует результаты
SET — изменяет свойства
DETACH DELETE — удаляет узел вместе со связями
7. ВыводВ ходе работы создан граф из 15 узлов и 18 отношений. Освоены основные операции Cypher: создание, чтение, фильтрация, изменение и удаление. Использованы MERGE и ограничения уникальности для предотвращения дублей. Графовая модель удобна для анализа связей между сущностями.
