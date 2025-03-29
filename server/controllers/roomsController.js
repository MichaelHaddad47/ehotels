const pool = require('../db');

const getAvailableRooms = async (req, res) => {
    const { start_date, end_date, capacity, max_price } = req.query;
  
    try {
      const result = await pool.query(
        `
        SELECT * FROM room
        WHERE room_id NOT IN (
          SELECT room_id FROM reservation
          WHERE (start_date, end_date) OVERLAPS ($1::DATE, $2::DATE)
        )
        AND room_id NOT IN (
          SELECT room_id FROM rental
          WHERE (start_date, end_date) OVERLAPS ($1::DATE, $2::DATE)
        )
        ${capacity ? 'AND capacity = $3' : ''}
        ${max_price ? (capacity ? 'AND price <= $4' : 'AND price <= $3') : ''}
        `,
        capacity && max_price
          ? [start_date, end_date, capacity, max_price]
          : capacity
          ? [start_date, end_date, capacity]
          : max_price
          ? [start_date, end_date, max_price]
          : [start_date, end_date]
      );
  
      res.json(result.rows);
    } catch (err) {
      console.error('Error fetching available rooms:', err);
      res.status(500).json({ error: 'Could not fetch available rooms' });
    }
  };
  

module.exports = { getAvailableRooms };
