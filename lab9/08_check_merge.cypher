// =====================================================
// ЗАДАНИЕ 8. Проверка MERGE (отсутствие дублей)
// После повторного запуска скрипта создания выполнить:
// =====================================================

MATCH (s:Student) RETURN count(s) AS students;      // должно остаться 6
MATCH (c:Course)  RETURN count(c) AS courses;       // должно остаться 5
MATCH (t:Teacher) RETURN count(t) AS teachers;      // должно остаться 4
MATCH ()-[r]->()  RETURN count(r) AS relationships; // должно остаться 18
