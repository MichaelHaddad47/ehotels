-- Trigger 1: Prevent invalid reservation dates
-- This trigger blocks any reservation where end_date is NOT after start_date

-- Step 1: Create the function that checks the dates
CREATE OR REPLACE FUNCTION validate_reservation_dates()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.end_date <= NEW.start_date THEN
    RAISE EXCEPTION 'Reservation end_date must be after start_date.';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Step 2: Bind the function to the reservation table
CREATE TRIGGER trg_validate_reservation_dates
BEFORE INSERT OR UPDATE ON reservation
FOR EACH ROW
EXECUTE FUNCTION validate_reservation_dates();



-- Trigger 2: Archive rooms before deletion
-- When a room is deleted, this trigger saves it into a RoomArchive table

-- Step 1: Create the archive table (if it doesn't exist)
CREATE TABLE IF NOT EXISTS RoomArchive (
  archived_room_id SERIAL PRIMARY KEY,
  room_id INT,
  hotel_id INT,
  price DECIMAL,
  capacity INT,
  area INT,
  sea_view BOOLEAN,
  mountain_view BOOLEAN,
  extendable BOOLEAN,
  damages TEXT,
  deleted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Step 2: Create function to copy room data into archive
CREATE OR REPLACE FUNCTION archive_deleted_room()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO RoomArchive (room_id, hotel_id, price, capacity, area, sea_view, mountain_view, extendable, damages)
  VALUES (
    OLD.room_id, OLD.hotel_id, OLD.price, OLD.capacity, OLD.area,
    OLD.sea_view, OLD.mountain_view, OLD.extendable, OLD.damages
  );
  RETURN OLD;
END;
$$ LANGUAGE plpgsql;

-- Step 3: Bind the function to the room table
CREATE TRIGGER trg_archive_deleted_room
BEFORE DELETE ON room
FOR EACH ROW
EXECUTE FUNCTION archive_deleted_room();
