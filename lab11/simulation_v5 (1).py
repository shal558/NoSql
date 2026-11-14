import random, hashlib
from collections import Counter

random.seed(42)
N, Q, SHARDS = 12000, 30000, 3

# Вариант 5: Библиотека
# reader_id — основной ключ (высокая кардинальность)
# genre_id  — низкокардинальный ключ
# loan_id   — последовательный идентификатор выдачи
rows = [dict(reader_id=i % 2500, genre_id=i % 5, loan_id=i) for i in range(N)]

def stable_hash(value):
    digest = hashlib.sha256(str(value).encode()).digest()
    return int.from_bytes(digest[:8], 'big')

def low_card(row):
    return row['genre_id'] % SHARDS

def hashed_reader(row):
    return stable_hash(row['reader_id']) % SHARDS

def range_loan(row):
    return min(row['loan_id'] // (N // SHARDS), SHARDS - 1)

def describe(name, assign, requests):
    docs = Counter(assign(r) for r in rows)
    load = Counter(assign(r) for r in requests)
    d = [docs[i] for i in range(SHARDS)]
    q = [load[i] for i in range(SHARDS)]
    print(name, 'docs=', d, 'queries=', q,
          'doc_max_mean=', round(max(d)/(sum(d)/SHARDS), 2),
          'query_max_mean=', round(max(q)/(sum(q)/SHARDS), 2))

uniform = random.choices(rows, k=Q)
hot_rows = [r for r in rows if r['genre_id'] == 0]
hot = [random.choice(hot_rows) if random.random() < 0.6 else random.choice(rows)
       for _ in range(Q)]

print("=== Вариант 5: Библиотека (reader_id / genre_id / loan_id) ===")
for name, fn in [('genre_id', low_card),
                 ('hashed_reader', hashed_reader),
                 ('range_loan', range_loan)]:
    describe(name + '/uniform', fn, uniform)
    describe(name + '/hot', fn, hot)
