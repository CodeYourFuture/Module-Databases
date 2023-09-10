-- Farnoosh: We need to find out the transactions between £30,000 and £31,000. Could you help us write a query for that?
SELECT
    *
FROM
    spends;

SELECT
    *
FROM
    spends
WHERE
    amount BETWEEN 30000 AND 31000;

-- Claire: That's great, thanks. Hey, what about transactions that include the word 'fee' in their description?
SELECT
    *
FROM
    spends
WHERE
    description ILIKE '%fee%';

-- Farnoosh: Hi, it's me again. It turns out we also need the transactions that have the expense area of 'Better Hospital Food'. Can you help us with that one?
SELECT
    *
FROM
    spends;

SELECT
    *
FROM
    expense_areas;

SELECT
    *
FROM
    expense_types;

SELECT
    *
FROM
    suppliers;

SELECT
    s.expense_area_id,
    s.transaction_no,
    s.supplier_inv_no,
    s.description,
    s.amount,
    ea.expense_area
FROM
    spends s
    INNER JOIN expense_areas ea ON (s.expense_area_id = ea.id)
WHERE
    ea.expense_area = 'Better Hospital Food';

SELECT
    *
FROM
    expense_areas
WHERE
    expense_area = 'Better Hospital Food';

SELECT
    *
FROM
    spends
    JOIN expense_areas ON expense_areas.id = spends.expense_area_id;

SELECT
    *
FROM
    spends
    JOIN expense_areas ON expense_areas.id = spends.expense_area_id
WHERE
    expense_areas.expense_area = 'Better Hospital';

SELECT
    transaction_no
FROM
    spends
    JOIN expense_areas ON expense_areas.id = spends.expense_area_id
WHERE
    expense_areas.expense_area = 'Better Hospital Food';

-- Claire: Great, that's very helpful. How about the total amount spent for each month?
SELECT
    sum(amount) AS Total,
    date_trunc('month', date) AS mnth
FROM
    spends
GROUP BY
    date_trunc('month', date);

SELECT
    SUM(amount) AS "total amount spent",
    to_char(date, 'month') AS month
FROM
    spends
GROUP BY
    month;

-- Farnoosh: Thanks, that's really useful. We also need to know the total amount spent on each supplier. Can you help us with that?
SELECT
    *
FROM
    suppliers;

SELECT
    *
FROM
    expense_types;

SELECT
    *
FROM
    expense_areas;

SELECT
    *
FROM
    suppliers;

SELECT
    *
FROM
    spends;

SELECT
    supplier_id,
    sum(amount) AS "total amount spent"
FROM
    spends
GROUP BY
    supplier_id
ORDER BY
    supplier_id;

-- Farnoosh: Oh, how do I know who these suppliers are? There's only numbers here.
SELECT
    su.id,
    su.supplier,
    sum(sp.amount) AS "total amount spent"
FROM
    spends sp
    INNER JOIN suppliers su ON (sp.supplier_id = su.id)
GROUP BY
    su.id,
    su.supplier
ORDER BY
    su.id;

-- Claire: Thanks, that's really helpful. I can't quite figure out...what is the total amount spent on each of these two dates (1st March 2021 and 1st April 2021)?
-- Claire: But I think I only want those two dates, not a range, or all the days in between.
SELECT
    sum(amount) AS "total amount spent",
    date
FROM
    spends
WHERE
    date IN ('2021-03-01', '2021-04-01')
GROUP BY
    date;

-- Can we add a new transaction to the spends table with a description of 'Computer Hardware Dell' and an amount of £32,000?
-- To confirm, the date is August 19, 2021, the transaction number is 38104091, the supplier invoice number is 3780119655, the supplier is 'Dell', the expense type is 'Hardware' and the expense area is 'IT'.

INSERT INTO expense_types(expense_type)
    VALUES ('Hardware');

INSERT INTO expense_areas(expense_area)
    VALUES ('IT');

INSERT INTO suppliers(supplier)
    VALUES ('Dell');

INSERT INTO spends(expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
    VALUES (42, 46, 66, '2021-08-19', 38104091, 3780119655, 'Computer Hardware Dell', 32000);

SELECT
    *
FROM
    spends;

SELECT
    *
FROM
    expense_areas;

SELECT
    *
FROM
    expense_types;

SELECT
    *
FROM
    suppliers;

SELECT * FROM spends;
SELECT * FROM expense_areas;
SELECT * FROM expense_types;
SELECT * FROM suppliers;