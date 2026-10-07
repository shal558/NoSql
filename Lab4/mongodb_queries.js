// Лабораторная работа №4: MongoDB Aggregation & Indexes
// Предметная область: Интернет-магазин (Вариант 1)
// Используемые коллекции: products, customers, orders

use ecommerce_lab4;

// --- 4. ПОДГОТОВКА ТЕСТОВЫХ ДАННЫХ ---
db.products.drop();
db.customers.drop();
db.orders.drop();

// Добавление 30 документов в основную коллекцию products
db.products.insertMany([
  { productId: 101, name: "Laptop Lenovo Ideapad", category: "Notebook", price: 420000, stock: 15, rating: 4.7, tags: ["office", "programming", "budget"] },
  { productId: 102, name: "Laptop ASUS ROG Strix", category: "Notebook", price: 780000, stock: 5, rating: 4.9, tags: ["gaming", "premium", "programming"] },
  { productId: 103, name: "Phone Samsung Galaxy S23", category: "Smartphone", price: 450000, stock: 22, rating: 4.6, tags: ["mobile", "android", "photo"] },
  { productId: 104, name: "Phone Apple iPhone 15", category: "Smartphone", price: 650000, stock: 18, rating: 4.8, tags: ["mobile", "ios", "premium"] },
  { productId: 105, name: "Headphones Sony WH-1000XM5", category: "Audio", price: 180000, stock: 30, rating: 4.7, tags: ["wireless", "anc", "music"] },
  { productId: 106, name: "Tablet Apple iPad Air", category: "Tablet", price: 380000, stock: 14, rating: 4.5, tags: ["mobile", "ios", "design"] },
  { productId: 107, name: "Monitor LG UltraFine", category: "Monitors", price: 290000, stock: 8, rating: 4.4, tags: ["office", "4k", "ips"] },
  { productId: 108, name: "Keyboard Keychron K2", category: "Accessories", price: 65000, stock: 40, rating: 4.8, tags: ["mechanical", "wireless", "office"] },
  { productId: 109, name: "Mouse Logitech MX Master 3S", category: "Accessories", price: 55000, stock: 25, rating: 4.9, tags: ["wireless", "ergonomic", "office"] },
  { productId: 110, name: "Laptop HP Pavilion", category: "Notebook", price: 350000, stock: 12, rating: 4.2, tags: ["office", "budget"] },
  { productId: 111, name: "Laptop Apple MacBook Pro", category: "Notebook", price: 1200000, stock: 7, rating: 4.9, tags: ["premium", "programming", "design"] },
  { productId: 112, name: "Phone Xiaomi 13 Pro", category: "Smartphone", price: 390000, stock: 20, rating: 4.5, tags: ["mobile", "android"] },
  { productId: 113, name: "Phone Google Pixel 8", category: "Smartphone", price: 440000, stock: 10, rating: 4.7, tags: ["mobile", "android", "photo"] },
  { productId: 114, name: "Smartwatch Apple Watch 9", category: "Gadgets", price: 230000, stock: 15, rating: 4.6, tags: ["wireless", "ios", "sport"] },
  { productId: 115, name: "Smartwatch Samsung Galaxy Watch 6", category: "Gadgets", price: 160000, stock: 19, rating: 4.4, tags: ["wireless", "android", "sport"] },
  { productId: 116, name: "Headphones JBL Tune", category: "Audio", price: 35000, stock: 50, rating: 4.1, tags: ["wireless", "budget", "music"] },
  { productId: 117, name: "Speaker Marshall Acton", category: "Audio", price: 150000, stock: 6, rating: 4.6, tags: ["premium", "music"] },
  { productId: 118, name: "Router ASUS RT-AX88U", category: "Networking", price: 120000, stock: 11, rating: 4.5, tags: ["wireless", "gaming"] },
  { productId: 119, name: "SSD Samsung 990 Pro 2TB", category: "Components", price: 95000, stock: 35, rating: 4.9, tags: ["storage", "fast"] },
  { productId: 120, name: "RAM Kingston Fury 32GB", category: "Components", price: 55000, stock: 28, rating: 4.7, tags: ["storage", "gaming"] },
  { productId: 121, name: "Laptop Acer Nitro 5", category: "Notebook", price: 460000, stock: 9, rating: 4.3, tags: ["gaming", "budget"] },
  { productId: 122, name: "Phone Huawei P60 Pro", category: "Smartphone", price: 410000, stock: 5, rating: 4.4, tags: ["mobile", "photo"] },
  { productId: 123, name: "Monitor Samsung Odyssey G7", category: "Monitors", price: 350000, stock: 4, rating: 4.8, tags: ["gaming", "premium"] },
  { productId: 124, name: "Powerbank Anker 20000mAh", category: "Accessories", price: 25000, stock: 60, rating: 4.7, tags: ["wireless", "budget"] },
  { productId: 125, name: "Microphone Shure MV7", category: "Audio", price: 140000, stock: 8, rating: 4.8, tags: ["premium", "office"] },
  { productId: 126, name: "Webcam Logitech Brio", category: "Accessories", price: 90000, stock: 13, rating: 4.6, tags: ["office", "4k"] },
  { productId: 127, name: "Laptop Dell XPS 15", category: "Notebook", price: 950000, stock: 3, rating: 4.7, tags: ["premium", "programming"] },
  { productId: 128, name: "Tablet Samsung Galaxy Tab S9", category: "Tablet", price: 470000, stock: 11, rating: 4.6, tags: ["mobile", "android", "design"] },
  { productId: 129, name: "Phone OnePlus 11", category: "Smartphone", price: 360000, stock: 14, rating: 4.5, tags: ["mobile", "android"] },
  { productId: 130, name: "Game Controller Sony DualSense", category: "Accessories", price: 45000, stock: 25, rating: 4.8, tags: ["gaming", "wireless"] }
]);

// Подготовка связанных коллекций для $lookup
db.customers.insertMany([
  { customerId: 501, name: "Айдар", email: "aidar@example.com" },
  { customerId: 502, name: "Дана", email: "dana@example.com" },
  { customerId: 503, name: "Иван", email: "ivan@example.com" }
]);

db.orders.insertMany([
  { orderId: "ORD-001", customerId: 501, productId: 101, total: 420000, status: "paid" },
  { orderId: "ORD-002", customerId: 501, productId: 108, total: 65000, status: "paid" },
  { orderId: "ORD-003", customerId: 502, productId: 104, total: 650000, status: "new" },
  { orderId: "ORD-004", customerId: 503, productId: 111, total: 1200000, status: "cancelled" }
]);


// --- 19. ОБЯЗАТЕЛЬНЫЕ ЗАДАНИЯ ПО СВОЕМУ ВАРИАНТУ ---

// 1. Три запроса с $match
// Запрос 1: Фильтрация по одному строковому полю
db.products.aggregate([
  { $match: { category: "Notebook" } }
]);

// Запрос 2: Фильтрация по диапазону числовых значений
db.products.aggregate([
  { $match: { price: { $gte: 100000, $lte: 400000 } } }
]);

// Запрос 3: Фильтрация одновременно по двум условиям с $or или $in
db.products.aggregate([
  { $match: { 
      category: { $in: ["Smartphone", "Audio"] },
      rating: { $gte: 4.7 } 
  } }
]);


// 2. Два запроса с $project
// Запрос 4: Проекция с выбором 3-4 нужных полей
db.products.aggregate([
  { $project: { _id: 0, name: 1, category: 1, price: 1 } }
]);

// Запрос 5: Проекция с вычисляемым полем (стоимость остатка товара)
db.products.aggregate([
  { $project: { 
      _id: 0, 
      name: 1, 
      price: 1, 
      stock: 1, 
      inventoryValue: { $multiply: ["$price", "$stock"] } 
  } }
]);


// 3. Два запроса с $group (использование $sum, $avg, $min, $max)
// Запрос 6: Группировка по категориям с расчетом статистических метрик
db.products.aggregate([
  { $group: {
      _id: "$category",
      productCount: { $sum: 1 },
      avgPrice: { $avg: "$price" },
      minPrice: { $min: "$price" },
      maxPrice: { $max: "$price" }
  } }
]);

// Запрос 7: Группировка по наличию премиум-тега с расчетом суммарных остатков
db.products.aggregate([
  { $match: { tags: "premium" } },
  { $group: {
      _id: "Premium Products",
      totalStock: { $sum: "$stock" },
      avgRating: { $avg: "$rating" }
  } }
]);


// 4. Использование $sort и $limit
// Запрос 8: Топ-5 самых дорогих товаров в наличии
db.products.aggregate([
  { $match: { stock: { $gt: 0 } } },
  { $sort: { price: -1 } },
  { $limit: 5 },
  { $project: { _id: 0, name: 1, price: 1, stock: 1 } }
]);


// 5. Использование $unwind для массива
// Запрос 9: Развертывание массива тегов и определение популярных
db.products.aggregate([
  { $unwind: "$tags" },
  { $group: { _id: "$tags", count: { $sum: 1 } } },
  { $sort: { count: -1 } }
]);


// 6. Использование $lookup между двумя коллекциями
// Запрос 10: Соединение заказов с информацией о клиентах
db.orders.aggregate([
  { $lookup: {
      from: "customers",
      localField: "customerId",
      foreignField: "customerId",
      as: "customerDetails"
  } },
  { $unwind: "$customerDetails" },
  { $project: { _id: 0, orderId: 1, total: 1, "customerDetails.name": 1, status: 1 } }
]);


// 7. Создание pipeline минимум из 4 этапов
// Запрос 11: Сложный многоэтапный конвейер агрегации
db.products.aggregate([
  { $match: { rating: { $gte: 4.5 } } }, // Этап 1: фильтрация по рейтингу
  { $group: { _id: "$category", avgPrice: { $avg: "$price" }, totalQty: { $sum: "$stock" } } }, // Этап 2: группировка
  { $sort: { avgPrice: -1 } }, // Этап 3: сортировка средней стоимости по убыванию
  { $limit: 3 }, // Этап 4: ограничение топ-3 категориями
  { $project: { category: "$_id", _id: 0, avgPrice: 1, totalQty: 1 } } // Этап 5 (дополнительный): форматирование
]);


// --- ИНДЕКСЫ И АНАЛИЗ ПРОИЗВОДИТЕЛЬНОСТИ ---

// Задание 8. Анализ запроса без индекса (COLLSCAN)
db.products.find({ category: "Notebook" }).explain("executionStats");

// Задание 9. Создание простого индекса и повторное измерение (IXSCAN)
db.products.createIndex({ category: 1 });
db.products.find({ category: "Notebook" }).explain("executionStats");

// Задание 10 & 11. Составной индекс и проверка
db.products.createIndex({ category: 1, price: 1 });
db.products.find({ category: "Notebook" }).sort({ price: 1 }).explain("executionStats");

// Задание 12. Эксперимент с ESR
// Запрос: равенство (category), диапазон (rating), сортировка (price)
// Шаблон запроса: db.products.find({ category: "Notebook", rating: { $gte: 4.5 } }).sort({ price: 1 })

// Тестирование Индекса А (Соответствие ESR: Equality -> Sort -> Range)
db.products.createIndex({ category: 1, price: 1, rating: 1 });
db.products.find({ category: "Notebook", rating: { $gte: 4.5 } }).sort({ price: 1 }).explain("executionStats");

// Тестирование Индекса Б (Нарушение ESR: Equality -> Range -> Sort)
db.products.createIndex({ category: 1, rating: 1, price: 1 });
db.products.find({ category: "Notebook", rating: { $gte: 4.5 } }).sort({ price: 1 }).explain("executionStats");