-- psql -U aisha -f queries.sql
\c my_hotels;

SELECT * FROM reservations WHERE room_no = 204;

SELECT * FROM rooms WHERE room_no = 204;

SELECT rate, room_type, checkout_date, rooms.room_no, reservations.room_no FROM reservations
JOIN rooms ON reservations.room_no = rooms.room_no;




