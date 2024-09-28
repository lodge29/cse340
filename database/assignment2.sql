
/*
-- TASK 1.1
-- Insert the following new record to the account table: Tony, Stark, tony@starkent.com, Iam1ronM@n
INSERT INTO public.account (account_firstname, account_lastname, account_email,account_password)
VALUES ('Tony', 'Stark','tony@starknet.com', 'Iam1ronM@n');


-- TASK 1.2 
--Modify the Tony Stark record to change the account_type to "Admin".
UPDATE account
SET account_type = 'admin'
-- if no other data exists
WHERE account_id = 1;


-- TASK 1.3
-- Delete the Tony Stark record from the database.
DELETE FROM account
WHERE account_id = 1;


-- TASK 1.4
-- Modify the "GM Hummer" record to read "a huge interior" rather than "small interiors" using a single query.
-- It needs to be part of an Update query.
UPDATE inventory
SET inv_description=REPLACE(inv_description,'small interiors', 'a huge interior')
WHERE inv_id = 10;


-- TASK 1.5
--Use an inner join to select the make and model fields from the inventory table and the classification name field from the classification table for inventory items that belong to the "Sport" category. Two records should be returned as a result of the query.
SELECT classification_name, inventory.inv_make, inventory.inv_model 
FROM classification
JOIN inventory 
ON inventory.classification_id = classification.classification_id
WHERE classification_name = 'Sport';


- TASK 1.6
-- Update all records in the inventory table to add "/vehicles" to the middle of the file path in the inv_image and inv_thumbnail columns using a single query.
UPDATE inventory
SET inv_image = REPLACE(inv_image,SUBSTRING(inv_image,1,7), CONCAT(SUBSTRING(inv_image,1,7), '/vehicles'));
inv_thumbnail = REPLACE(inv_thumbnail,SUBSTRING(inv_thumbnail,1,7), CONCAT(SUBSTRING(inv_thumbnail,1,7), '/vehicles'));
*/

SELECT inv_image, inv_thumbnail FROM inventory
ORDER BY inv_id ASC;