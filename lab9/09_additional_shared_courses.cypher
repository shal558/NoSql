// =====================================================
// ДОПОЛНИТЕЛЬНОЕ ЗАДАНИЕ
// Пары студентов, изучающих общие курсы
// =====================================================

MATCH (a:Student)-[:STUDIES]->(c:Course)<-[:STUDIES]-(b:Student)
WHERE a.id < b.id
RETURN a.name AS firstStudent,
       b.name AS secondStudent,
       collect(DISTINCT c.title) AS sharedCourses
ORDER BY firstStudent, secondStudent;
