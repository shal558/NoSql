
# Лабораторная работа №7 — Neo4j

**Дисциплина:** Проектирование и применение NoSQL-технологий  
**Тема:** Создание графовой модели Neo4j и запросов Cypher  
**Вариант:** 10 — IT-инфраструктура

## Цель работы
Изучить создание графовой модели в Neo4j и научиться выполнять запросы на языке Cypher.

## Узлы графа
- Service — программные сервисы.
- Server — серверы приложений.
- Database — базы данных.

## Типы связей
- DEPENDS_ON — зависимость сервиса.
- RUNS_ON — размещение сервиса на сервере.
- CONNECTS_TO — подключение сервера к базе данных.

## Содержание проекта
- 01_create_nodes.cypher — создание узлов.
- 02_create_relationships.cypher — создание связей.
- 03_select_queries.cypher — аналитические запросы.
- 04_update_data.cypher — изменение данных и проверка графа.
- screenshots/ — скриншоты результатов выполнения.

## Результат
Создана графовая модель IT-инфраструктуры, подготовлены запросы для поиска зависимостей, анализа узлов и связей, фильтрации и изменения свойств.
<img width="1837" height="968" alt="Снимок экрана 2026-10-14 143711" src="https://github.com/user-attachments/assets/2b300c9a-7763-4b79-83cf-ed517c3b56b4" />

<img width="1845" height="965" alt="Снимок экрана 2026-10-14 143251" src="https://github.com/user-attachments/assets/0f1a8dba-1547-4546-8012-94ad564739b5" />

<img width="1851" height="958" alt="Снимок экрана 2026-10-14 143212" src="https://github.com/user-attachments/assets/5871d624-1631-43c0-9cd7-5954595940a9" />

<img width="1248" height="730" alt="Снимок экрана 2026-10-14 143201" src="https://github.com/user-attachments/assets/f92a41bb-5d58-4ad9-9d61-9441e0f3fe22" />


<img width="1830" height="994" alt="Снимок экрана 2026-10-14 144214" src="https://github.com/user-attachments/assets/73d592dd-1f9b-402c-822c-78a4fc6917a9" />



