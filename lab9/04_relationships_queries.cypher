// =====================================================
// ЗАДАНИЕ 4. Запросы по связям (3 запроса)
// =====================================================

// 1. Одношаговый переход
MATCH (s:Student)-[:STUDIES]->(c:Course)
RETURN s.name AS student, c.title AS course;

// 2. Обратный поиск + цепочка из двух отношений
MATCH (t:Teacher)-[:TEACHES]->(c:Course)<-[:STUDIES]-(s:Student)
RETURN t.name AS teacher, c.title AS course, s.name AS student
ORDER BY teacher, course;

// 3. Курсы и преподаватели конкретного студента
MATCH (s:Student {name: "Aibek"})-[:STUDIES]->(c:Course)<-[:TEACHES]-(t:Teacher)
RETURN s.name AS student, c.title AS course, t.name AS teacher;
