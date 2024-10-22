INSERT INTO "user" (username, password, role)
VALUES 
('admin_user', 'password123', 'admin'),
('investigator_1', 'securepass', 'investigator'),
('investigator_2', 'securepass2', 'investigator');

INSERT INTO "report" (user_id, title, description, location, category)
VALUES
(2, 'Suspicious Transactions at Local Bank', 'Large sums of money deposited frequently at odd hours.', 'New York, NY', 'money laundering'),
(3, 'Shady Offshore Accounts', 'Accounts being opened under fake names, likely for illicit funding.', 'Los Angeles, CA', 'bad actor financing'),
(NULL, 'Anonymous Report of Fraud', 'Possible fraudulent wire transfers from anonymous sources.', 'Miami, FL', 'fraud');


INSERT INTO "annotation" (report_id, user_id, annotation)
VALUES
(1, 2, 'Investigating the bank transaction history for patterns.'),
(2, 3, 'Reached out to relevant financial institutions for account verification.'),
(3, 3, 'Received this report anonymously. Will verify the transaction details.');