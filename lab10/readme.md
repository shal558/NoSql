Лабораторная работа №10
Тема: Отказоустойчивость, репликация и резервное копирование в MongoDB.
1. Подключение к MongoDB
Подключение выполнялось через MongoDB Compass, используя существующее подключение lab1.

Проверка соединения:
db.adminCommand({ ping: 1 })


Результат:
{ ok: 1 }


Проверка Replica Set:
db.adminCommand({ replSetGetStatus: 1 })


Получена ошибка:
MongoServerError[NoReplicationEnabled]:
not running with --replSet


Поэтому для выполнения работы был выбран сценарий Б — моделирование отказа без запуска трёх отдельных процессов MongoDB.
2. Создание базы данных
use project_lab10


Создание коллекции:
db.createCollection("tasks")


3. Добавление 20 документов
В коллекцию tasks были добавлены 20 документов, содержащих идентификатор задачи, название, статус и приоритет.
db.tasks.insertMany([
  {taskId: 1, title: "Создание проекта", status: "completed", priority: "high"},
  {taskId: 2, title: "Анализ требований", status: "completed", priority: "high"},
  {taskId: 3, title: "Разработка дизайна", status: "completed", priority: "medium"},
  {taskId: 4, title: "Проектирование базы данных", status: "completed", priority: "high"},
  {taskId: 5, title: "Создание интерфейса", status: "in_progress", priority: "high"},
  {taskId: 6, title: "Разработка авторизации", status: "in_progress", priority: "high"},
  {taskId: 7, title: "Настройка сервера", status: "in_progress", priority: "medium"},
  {taskId: 8, title: "Разработка API", status: "in_progress", priority: "high"},
  {taskId: 9, title: "Тестирование системы", status: "pending", priority: "medium"},
  {taskId: 10, title: "Проверка безопасности", status: "pending", priority: "high"},
  {taskId: 11, title: "Исправление ошибок", status: "pending", priority: "medium"},
  {taskId: 12, title: "Оптимизация базы", status: "pending", priority: "low"},
  {taskId: 13, title: "Создание документации", status: "pending", priority: "low"},
  {taskId: 14, title: "Настройка резервного копирования", status: "pending", priority: "high"},
  {taskId: 15, title: "Проверка производительности", status: "pending", priority: "medium"},
  {taskId: 16, title: "Подготовка релиза", status: "pending", priority: "high"},
  {taskId: 17, title: "Развертывание проекта", status: "pending", priority: "high"},
  {taskId: 18, title: "Проверка обновлений", status: "pending", priority: "low"},
  {taskId: 19, title: "Финальное тестирование", status: "pending", priority: "high"},
  {taskId: 20, title: "Завершение проекта", status: "pending", priority: "medium"}
], {
  writeConcern: {
    w: "majority",
    wtimeout: 5000
  }
})


Проверка количества документов:
db.tasks.countDocuments()


Ожидаемый результат:
20


Просмотр всех документов:
db.tasks.find().sort({taskId: 1})


4. Моделирование трёх узлов
Создание коллекции:
db.createCollection("replication_simulation")


Добавление трёх узлов:
db.replication_simulation.insertMany([
  {
    node: "Node1",
    port: 27101,
    role: "PRIMARY",
    status: "ACTIVE"
  },
  {
    node: "Node2",
    port: 27102,
    role: "SECONDARY",
    status: "ACTIVE"
  },
  {
    node: "Node3",
    port: 27103,
    role: "SECONDARY",
    status: "ACTIVE"
  }
])


Проверка:
db.replication_simulation.find()


Результат: создана модель из трёх узлов: одного PRIMARY и двух SECONDARY.
5. Моделирование отказа PRIMARY
Остановка первого узла:
db.replication_simulation.updateOne(
  {node: "Node1"},
  {$set: {status: "STOPPED"}}
)


Назначение второго узла новым PRIMARY:
db.replication_simulation.updateOne(
  {node: "Node2"},
  {$set: {role: "PRIMARY"}}
)


Проверка состояния:
db.replication_simulation.find()


Полученное состояние:
Узел	Роль	Состояние
Node1	PRIMARY	STOPPED
Node2	PRIMARY	ACTIVE
Node3	SECONDARY	ACTIVE

В результате было смоделировано отключение основного узла и назначение другого узла главным.
6. Восстановление первого узла
Команда восстановления:
db.replication_simulation.updateOne(
  {node: "Node1"},
  {$set: {role: "SECONDARY", status: "ACTIVE"}}
)


Проверка:
db.replication_simulation.find()


Ожидаемое состояние:
Узел	Роль	Состояние
Node1	SECONDARY	ACTIVE
Node2	PRIMARY	ACTIVE
Node3	SECONDARY	ACTIVE

Первый узел возвращён в работу в качестве SECONDARY.
7. Проверка сохранности данных
Проверка количества документов:
db.tasks.countDocuments()


Просмотр документов:
db.tasks.find().sort({taskId: 1})


Результат: исходные 20 документов сохранились.
8. Резервное копирование
Резервное копирование выполнялось через MongoDB Compass.

Последовательность действий:
1. Открыть базу project_lab10.
2. Выбрать коллекцию tasks.
3. Нажать Export Data.
4. Выбрать формат JSON.
5. Выбрать экспорт всей коллекции.
6. Сохранить файл под названием tasks_backup.json.
Результат: создана резервная копия коллекции tasks в формате JSON.
9. Восстановление резервной копии
Создание базы данных для восстановления:
use university_restore10


Создание коллекции:
db.createCollection("tasks")


Далее через MongoDB Compass был выполнен импорт файла tasks_backup.json:
1. Открыть university_restore10.
2. Выбрать коллекцию tasks.
3. Нажать ADD DATA.
4. Выбрать Import JSON or CSV file.
5. Указать файл tasks_backup.json.
6. Выбрать формат JSON.
7. Нажать Import.
10. Проверка восстановления
Выполнить команду:
db.getSiblingDB("university_restore10").tasks.countDocuments()


Результат:
20


Это подтверждает, что резервная копия была успешно импортирована и все 20 документов восстановлены.
11. Таблица RPO/RTO
Показатель	Значение	Описание
RPO	0–5 минут (условно)	Допустимый объём потери данных
RTO	5–10 минут (условно)	Предполагаемое время восстановления
Тип резервной копии	JSON	Экспорт коллекции
Количество документов	20	Количество исходных записей
Восстановление	Успешно	Импортировано 20 документов

Примечание: значения RPO и RTO являются условными оценками, поскольку фактические временные показатели не измерялись.
12. Вывод
В ходе выполнения лабораторной работы №10 была изучена отказоустойчивость системы управления базами данных MongoDB.

Была создана база данных project_lab10 и коллекция tasks, содержащая 20 документов. Выполнено моделирование трёх узлов PRIMARY и SECONDARY, рассмотрен сценарий отказа основного узла и восстановления его работы.

Также было выполнено резервное копирование коллекции в формате JSON. Создана отдельная база данных university_restore10, в которую импортирована резервная копия. Проверка показала, что все 20 документов успешно восстановлены.

В результате лабораторной работы были изучены принципы моделирования отказоустойчивости, резервного копирования и восстановления данных в MongoDB.
