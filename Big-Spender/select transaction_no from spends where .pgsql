SELECT
    transaction_no
FROM
    spends
WHERE
    amount BETWEEN 30000 AND 31000;

SELECT
    transaction_no,
    description
FROM
    spends
WHERE
    lower(description)
    LIKE '%fee%';

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

SELECT
    sum(amount) AS Total,
    date_trunc('month', date) AS mnth
FROM
    spends
GROUP BY
    date_trunc('month', date);

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

