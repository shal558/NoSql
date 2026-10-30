// =====================================================
// ЗАДАНИЕ 5. Фильтрация WHERE (строковое + числовое)
// =====================================================

// По строковому свойству
MATCH (s:Student)
WHERE s.group = "IS-24-1"
RETURN s.name, s.year;

// По числовому свойству
MATCH (c:Course)
WHERE c.credits >= 5
RETURN c.title, c.credits
ORDER BY c.credits DESC;
