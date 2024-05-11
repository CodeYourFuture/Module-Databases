# Big Spender

## Objectives

- Use SQL queries to retrieve specific data from a database
- Interpret natural language user questions
- Write SQL queries to answer user questions

## Requirements

Run the following commands:

```
createdb big-spender
psql -d big-spender -f big-spender.sql
```

This will create and populate a database called big-spender from the file big-spender.sql.

It is based on real data from the government found at
https://data.gov.uk/dataset/72eaec8e-0d32-4041-a553-87b852abee64/spend-over-25-000-in-worcestershire-acute-hospitals-nhs-trust

You can work with it by running

```
psql big-spender
```

## User Stories:

- As a data analyst, I want to retrieve specific transaction records that meet a certain criteria, so that I can generate insights and reports based on the data.
- As a finance manager, I want to know the total amount spent on a specific month, so that I can compare it with our budget and plan accordingly.
- As a data analyst, I want to filter transactions by a specific keyword, so that I can retrieve records that are relevant to my analysis.
- As a finance manager, I want to add a missing transaction to the database, so that it correctly reflects our latest expenses for our report.

## Briefing

You are a data analyst working with the finance team at Worcestershire Acute Hospital Trust. The finance team has asked you to help them analyse their spending data. They have provided you with a file containing all of their big-ticket spending data for 2021.

You are working with Claire and Farnoosh, who are trying to complete a missing report for their boss. They don't just want the answers, they want the queries that will give them the answers. They want to be able to run the queries themselves, so they can do this year's report without your help.

**Claire:** Hey, can you help us out with something? We need to analyze our spending data for 2021 because apparently the report is missing.

**You:** I can try. What kind of data are you looking for exactly?

**Farnoosh:** We need to find out the transactions between £30,000 and £31,000. Could you help us write a query for that?

**You:** Absolutely. Here's the SQL query you need:

<!-- INSERT YOUR QUERY HERE -->

<!-- This query returns all the amounts between 30 to 31 tousands in the spends table. -->

```sql

SELECT * FROM spends WHERE amount BETWEEN 30000 AND 31000;
```

**Claire:** That's great, thanks. Hey, what about transactions that include the word 'fee' in their description?

**You:** Does case matter?

**Claire:** I don't know. What do you meant?

**You:** Does it matter if fee is written like "Fee" or "fee" or "FEE"? Are those all the same to you?

**Claire:** I think that's all the same to me.

**You:** And is it always singular? I mean: do you ever use fees or FEES?

**Claire:** ...Maybe?

**You:** Then here's the query for that:

```sql
INSERT YOUR QUERY HERE
```

**Farnoosh:** Hi, it's me again. It turns out we also need the transactions that have the expense area of 'Better Hospital Food'. Can you help us with that one?

**You:** No worries. Here's the query for that:

 <!-- This query returns all the words contain the word 'fee' , like 'fees' , 'FEES' , 'Fees' . -->

```sql
INSERT YOUR QUERY HERE
select * from spends where lower(description) like '%fee%';
```

**Claire:** Great, that's very helpful. How about the total amount spent for each month?

**You:** You can get that by using the GROUP BY clause. Here's the query:

<!-- This query add up amounts in the spends table and group them based on months; -->

```sql
CREATE YOUR QUERY HERE
select sum(amount) , to_char(date,'yyyy-mm') as month from spends group by month;
```

**Farnoosh:** Thanks, that's really useful. We also need to know the total amount spent on each supplier. Can you help us with that?

**You:** Sure thing. Here's the query for that:

<!-- This query returns supplier_id's and the amount been spent on them, and ordered by supplier id's . -->

```sql
INSERT YOUR QUERY HERE
select supplier_id , sum(amount) as total from spends group by supplier_id order by supplier_id ;

```

**Farnoosh:** Oh, how do I know who these suppliers are? There's only numbers here.

**You:** Whoops! I gave you ids to key the totals, but let me give you names instead.

<!-- This query returns supplier names as well by joining supplier table, order then asc based on the supplier name. -->

```sql
INSERT YOUR QUERY HERE
select sd.supplier_id ,spl.supplier ,sum(sd.amount) as total from spends sd join suppliers spl on (spl.id=sd.supplier_id) group by spl.supplier, sd.supplier_id
order by spl.supplier

```

**Claire:** Thanks, that's really helpful. I can't quite figure out...what is the total amount spent on each of these two dates (1st March 2021 and 1st April 2021)?

**You:** I think you can use the BETWEEN clause to get the total amount spent on a range of dates, just like we used earlier.

**Claire:** But I think I _only_ want those two dates, not a range, or all the days in between.

**You:** Then you need an extra clause. Here's the query:

<!-- It returns total of amount on first of March and first of April . -->

```sql
CREATE YOUR QUERY HERE
select date , sum(amount) from spends where (date='2021-03-01') or (date='2021-04-01') group by date;

```

**Farnoosh:** Fantastic. One last thing, looks like we missed something. Can we add a new transaction to the spends table with a description of 'Computer Hardware Dell' and an amount of £32,000?

**You:** When was this?

**Farnoosh:** The receipt says August 19, 2021

**You:** Sure thing. To confirm, the date is August 19, 2021, the transaction number is 38104091, the supplier invoice number is 3780119655, the supplier is 'Dell', the expense type is 'Hardware' and the expense area is 'IT'. Here's the query for that:

```sql
INSERT YOUR QUERIES HERE
-- first we add a new supplier 'Dell' into suppliers:
Insert into suppliers(supplier)  values('DELL');

-- adding Hardware to expense_types:
insert into expense_types(expense_type) values('Hardware');

-- adding IT to expense_areas as well:
insert into expense_areas(expense_area) values('IT');

INSERT INTO spends(expense_type_id,expense_area_id , supplier_id , date , transaction_no , supplier_inv_no , description , amount )
values(42,46,66,'2021-08-19',38104091,3780119655,'Computer Hardware Dell',32000.00)
;
-- After Insert this data and did some query on the table I realised another field with name 'Hardware Purch' is in the expense_types
-- also there wasn't an IT feild for expense areas so i created it, I hope I understood the questions correctly .

```

**Claire:** Great, that's everything we need. Thanks for your help.

**You:** No problem, glad I could help you out.

## Acceptance Criteria

- [ ] All user stories are satisfied
- [ ] All queries are written in SQL
- [ ] All queries are correct and I have tested them in the database
- [ ] I have opened a pull request with my answers written directly into this README.md file
