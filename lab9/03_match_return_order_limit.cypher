// =====================================================
// ЗАДАНИЕ 3. Все узлы одной метки + сортировка + LIMIT
// =====================================================

// Все студенты
MATCH (s:Student)
RETURN s;

// Выбранные свойства с сортировкой и ограничением
MATCH (s:Student)
RETURN s.name AS student, s.group AS groupName, s.year AS year
ORDER BY student
LIMIT 10;
