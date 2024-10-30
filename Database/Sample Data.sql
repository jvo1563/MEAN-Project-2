-- Insert sample data into "user" table
INSERT INTO "user" (email, first_name, last_name, picture, role) VALUES
('john.doe@example.com', 'John', 'Doe', 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg', 'Handler'),
('jane.smith@example.com', 'Jane', 'Smith', 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg', 'Handler'),
('alice.jones@example.com', 'Alice', 'Jones', 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg', 'Admin');

-- Insert sample data into "report_category" table
INSERT INTO "report_category" (category_name, description) VALUES
('Fraud', 'Cases involving fraudulent activities'),
('Tax Evasion', 'Reports related to evasion of taxes'),
('Embezzlement', 'Cases of embezzlement and financial misconduct'),
('Money Laundering', 'Cases involving the illegal transfer of money through businesses'),
('Terror Financing', 'Reports related to financing terrorist activities');

-- Insert sample data into "report_status" table
INSERT INTO "report_status" (status_name) VALUES
('Pending'),
('Investigating'),
('Closed');

-- Insert sample data into "report" table
INSERT INTO "report" (created_by, assigned_to, title, description, location, category_id, status_id) VALUES
(1, 2, 'Suspected Fraud in E-commerce', 'Report of suspected fraudulent transactions.', 'New York', 1, 1),
(2, NULL, 'Unreported Tax Revenues', 'Suspicious activity in local tax reporting.', 'Los Angeles', 2, 2),
(NULL, 1, 'Alleged Embezzlement', 'Employee accused of embezzling company funds.', 'Chicago', 3, 3);

-- Insert sample data into "business_entity" table
INSERT INTO "business_entity" (report_id, name, industry, address, email, phone, relation) VALUES
(1, 'E-Shop Inc.', 'E-commerce', '123 Main St, New York, NY', 'contact@eshop.com', '555-1234', 'suspect'),
(2, 'Local Tax Agency', 'Government', '456 Market St, Los Angeles, CA', 'info@localtax.gov', '555-5678', 'reporting agency'),
(3, 'ABC Corp', 'Finance', '789 Wall St, Chicago, IL', 'info@abccorp.com', '555-8765', 'victim');

-- Insert sample data into "annotation" table
INSERT INTO "annotation" (report_id, created_by, title, annotation) VALUES
(1, 2, 'Inital Review','Initial review indicates potential fraudulent activities.'),
(2, 2, 'Waiting','Awaiting further information from tax authorities.'),
(3, 1, 'Case Closed','Case is now closed after funds were recovered.');
