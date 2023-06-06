-- Create Database
--CREATE DATABASE IF NOT EXISTS cyf_big_spender;

SELECT 'CREATE DATABASE cyf_bigspender'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'cyf_bigspender')\gexec

-- Connect to the 'cyf_big_spender' database
\c cyf_bigspender

-- CreateTable
CREATE TABLE expense_types (id SERIAL PRIMARY KEY,
                                              expense_type VARCHAR(30) NOT NULL);


CREATE TABLE expense_areas (id SERIAL PRIMARY KEY,
                                              expense_area VARCHAR(30) NOT NULL);


CREATE TABLE suppliers (id SERIAL PRIMARY KEY,
                                          supplier VARCHAR(60) NOT NULL);


CREATE TABLE spends (id SERIAL PRIMARY KEY,
                                       expense_type_id INT REFERENCES expense_types(id),
                                                                      expense_area_id INT REFERENCES expense_areas(id),
                                                                                                     supplier_id INT REFERENCES suppliers(id), date DATE NOT NULL,
                                                                                                                                                         transaction_no INT NOT NULL,
                                                                                                                                                                            supplier_inv_no VARCHAR(20) NOT NULL,
                                                                                                                                                                                                        description VARCHAR(90) NOT NULL,
                                                                                                                                                                                                                                amount NUMERIC NOT NULL);


INSERT INTO expense_types (expense_type)
VALUES ('AUC Additions');


INSERT INTO expense_types (expense_type)
VALUES ('Bank Nurse : Qualified');


INSERT INTO expense_types (expense_type)
VALUES ('Bedding & Linen: Disp');


INSERT INTO expense_types (expense_type)
VALUES ('Bldg Ctrcts - PFI Svc Chg');


INSERT INTO expense_types (expense_type)
VALUES ('Bldg/Eng Equip Maint/Rep');


INSERT INTO expense_types (expense_type)
VALUES ('Cleaning Equipment');


INSERT INTO expense_types (expense_type)
VALUES ('Computer Hardware Purch');


INSERT INTO expense_types (expense_type)
VALUES ('Computer Maintenance');


INSERT INTO expense_types (expense_type)
VALUES ('Consultant');


INSERT INTO expense_types (expense_type)
VALUES ('Contr Refuse & Clin Waste');


INSERT INTO expense_types (expense_type)
VALUES ('Data Lines');


INSERT INTO expense_types (expense_type)
VALUES ('Electricity');


INSERT INTO expense_types (expense_type)
VALUES ('Ext Contr Laundry');


INSERT INTO expense_types (expense_type)
VALUES ('External Consultancy Fees');


INSERT INTO expense_types (expense_type)
VALUES ('External Contractors');


INSERT INTO expense_types (expense_type)
VALUES ('Foundation Programme - F2');


INSERT INTO expense_types (expense_type)
VALUES ('Furniture & Fittings');


INSERT INTO expense_types (expense_type)
VALUES ('Gas');


INSERT INTO expense_types (expense_type)
VALUES ('Hcare Srv Rec NHS Trust');


INSERT INTO expense_types (expense_type)
VALUES ('Income tax - Current');


INSERT INTO expense_types (expense_type)
VALUES ('Laboratory Reagents');


INSERT INTO expense_types (expense_type)
VALUES ('Lease Rents');


INSERT INTO expense_types (expense_type)
VALUES ('Med & Surg Equip Disp');


INSERT INTO expense_types (expense_type)
VALUES ('Med & Surg Equip General');


INSERT INTO expense_types (expense_type)
VALUES ('Med & Surg Maint Contract');


INSERT INTO expense_types (expense_type)
VALUES ('Med Equip Additions');


INSERT INTO expense_types (expense_type)
VALUES ('Miscellaneous Expenditure');


INSERT INTO expense_types (expense_type)
VALUES ('National Insurance - Curr');


INSERT INTO expense_types (expense_type)
VALUES ('NonNHS Trade Pybls Curr');


INSERT INTO expense_types (expense_type)
VALUES ('Nurse band 6');


INSERT INTO expense_types (expense_type)
VALUES ('Other Agency Staff');


INSERT INTO expense_types (expense_type)
VALUES ('Other Clinical Costs');


INSERT INTO expense_types (expense_type)
VALUES ('Other Liabilities - Curr');


INSERT INTO expense_types (expense_type)
VALUES ('Other recvables - Current');


INSERT INTO expense_types (expense_type)
VALUES ('Professional Fees');


INSERT INTO expense_types (expense_type)
VALUES ('Rates');


INSERT INTO expense_types (expense_type)
VALUES ('Secndd staff frm othr org');


INSERT INTO expense_types (expense_type)
VALUES ('Staff Location/Bleeps');


INSERT INTO expense_types (expense_type)
VALUES ('Stocks Finished Goods');


INSERT INTO expense_types (expense_type)
VALUES ('Water');


INSERT INTO expense_types (expense_type)
VALUES ('X-Ray Equipment Purchase');


INSERT INTO expense_areas (expense_area)
VALUES ('Balance Sheet');


INSERT INTO expense_areas (expense_area)
VALUES ('Better Hospital Food');


INSERT INTO expense_areas (expense_area)
VALUES ('Bowel Cancer Screening Centre');


INSERT INTO expense_areas (expense_area)
VALUES ('Cardiology Medics');


INSERT INTO expense_areas (expense_area)
VALUES ('Chief Executive');


INSERT INTO expense_areas (expense_area)
VALUES ('Contingency');


INSERT INTO expense_areas (expense_area)
VALUES ('COO Operational Team');


INSERT INTO expense_areas (expense_area)
VALUES ('COVID-19');


INSERT INTO expense_areas (expense_area)
VALUES ('CVI''s - DAF''s 2007-08');


INSERT INTO expense_areas (expense_area)
VALUES ('Diabetic Centre');


INSERT INTO expense_areas (expense_area)
VALUES ('Digital Care Record');


INSERT INTO expense_areas (expense_area)
VALUES ('Discharge Co-ordination');


INSERT INTO expense_areas (expense_area)
VALUES ('Drugs reserve');


INSERT INTO expense_areas (expense_area)
VALUES ('Energy NTN');


INSERT INTO expense_areas (expense_area)
VALUES ('Energy-Rates- No Special');


INSERT INTO expense_areas (expense_area)
VALUES ('Equipt WRH');


INSERT INTO expense_areas (expense_area)
VALUES ('Haematology');


INSERT INTO expense_areas (expense_area)
VALUES ('ICT Contingency');


INSERT INTO expense_areas (expense_area)
VALUES ('ICT Recharges');


INSERT INTO expense_areas (expense_area)
VALUES ('Kidderminster Energy');


INSERT INTO expense_areas (expense_area)
VALUES ('Kings Court');


INSERT INTO expense_areas (expense_area)
VALUES ('Laundry Serv-No Spec');


INSERT INTO expense_areas (expense_area)
VALUES ('Madel Acute');


INSERT INTO expense_areas (expense_area)
VALUES ('Managed Print');


INSERT INTO expense_areas (expense_area)
VALUES ('New Hospital Impl Admin');


INSERT INTO expense_areas (expense_area)
VALUES ('Newtown Acute Payments');


INSERT INTO expense_areas (expense_area)
VALUES ('Newtown Equipt');


INSERT INTO expense_areas (expense_area)
VALUES ('Oral MaxFac- MedStaff WRH');


INSERT INTO expense_areas (expense_area)
VALUES ('Other Pass Throughs');


INSERT INTO expense_areas (expense_area)
VALUES ('Overseas Nurses');


INSERT INTO expense_areas (expense_area)
VALUES ('Path General');


INSERT INTO expense_areas (expense_area)
VALUES ('PFI- Unitary Payments');


INSERT INTO expense_areas (expense_area)
VALUES ('Radiology Countwide');


INSERT INTO expense_areas (expense_area)
VALUES ('Radiology Dept Alex');


INSERT INTO expense_areas (expense_area)
VALUES ('Radiology Dept KGH');


INSERT INTO expense_areas (expense_area)
VALUES ('Respiratory Medics');


INSERT INTO expense_areas (expense_area)
VALUES ('SLA Split of income');


INSERT INTO expense_areas (expense_area)
VALUES ('Software Support and Licences');


INSERT INTO expense_areas (expense_area)
VALUES ('Sterile Services - Alex');


INSERT INTO expense_areas (expense_area)
VALUES ('Telephone Serv- Alex');


INSERT INTO expense_areas (expense_area)
VALUES ('Trust Wide Rates');


INSERT INTO expense_areas (expense_area)
VALUES ('Trustwide');


INSERT INTO expense_areas (expense_area)
VALUES ('WAN');


INSERT INTO expense_areas (expense_area)
VALUES ('WIFI');


INSERT INTO expense_areas (expense_area)
VALUES ('Xerox Contract');


INSERT INTO suppliers (supplier)
VALUES ('3D ALUMINIUM PLAS LTD');


INSERT INTO suppliers (supplier)
VALUES ('ADEPT TELECOM');


INSERT INTO suppliers (supplier)
VALUES ('ALLIANCE HEALTHCARE DISTRIBUTION LTD');


INSERT INTO suppliers (supplier)
VALUES ('ALLOGA UK LTD');


INSERT INTO suppliers (supplier)
VALUES ('ALLSCRIPTS HEALTHCARE (IT) UK LTD');


INSERT INTO suppliers (supplier)
VALUES ('ALTIATECH LTD');


INSERT INTO suppliers (supplier)
VALUES ('ARJO UK LTD');


INSERT INTO suppliers (supplier)
VALUES ('BATH ASU');


INSERT INTO suppliers (supplier)
VALUES ('BAYER PLC');


INSERT INTO suppliers (supplier)
VALUES ('BIOTEST UK LTD');


INSERT INTO suppliers (supplier)
VALUES ('BIRMINGHAM & SOLIHULL MENTAL HEALTH NHS FOUNDATION TRUST');


INSERT INTO suppliers (supplier)
VALUES ('BOXXE LTD');


INSERT INTO suppliers (supplier)
VALUES ('CARE QUALITY COMMISSION');


INSERT INTO suppliers (supplier)
VALUES ('CLINISYS SOLUTIONS LTD');


INSERT INTO suppliers (supplier)
VALUES ('COIF CHARITIES ETHICAL INVESTMENT FUND');


INSERT INTO suppliers (supplier)
VALUES ('COMPUTACENTER (UK) LTD');


INSERT INTO suppliers (supplier)
VALUES ('COUCH PERRY&WILKES');


INSERT INTO suppliers (supplier)
VALUES ('DD PORTER LTD');


INSERT INTO suppliers (supplier)
VALUES ('E MANTON LTD');


INSERT INTO suppliers (supplier)
VALUES ('FRESENIUS MEDICAL CARE UK LTD');


INSERT INTO suppliers (supplier)
VALUES ('GE MEDICAL SYSTEMS LTD');


INSERT INTO suppliers (supplier)
VALUES ('HELICON HEALTH LTD');


INSERT INTO suppliers (supplier)
VALUES ('HEREFORDSHIRE & WORCESTERSHIRE HEALTH & CARE NHS TRUST');


INSERT INTO suppliers (supplier)
VALUES ('INLAND REVENUE CIS');


INSERT INTO suppliers (supplier)
VALUES ('INSIGNIA MEDICAL SYSTEMS LTD');


INSERT INTO suppliers (supplier)
VALUES ('INTERCLASS PLC');


INSERT INTO suppliers (supplier)
VALUES ('JMG ROOFING LTD');


INSERT INTO suppliers (supplier)
VALUES ('KARL STORZ ENDOSCOPY UK LTD');


INSERT INTO suppliers (supplier)
VALUES ('LYNTON TRAILERS (UK) LTD');


INSERT INTO suppliers (supplier)
VALUES ('MAQUET LTD');


INSERT INTO suppliers (supplier)
VALUES ('MEDICA REPORTING LTD');


INSERT INTO suppliers (supplier)
VALUES ('MEDTRONIC LTD');


INSERT INTO suppliers (supplier)
VALUES ('MIDWEST ELECTRICAL SERVICES LTD');


INSERT INTO suppliers (supplier)
VALUES ('NHS BLOOD & TRANSPLANT');


INSERT INTO suppliers (supplier)
VALUES ('NHS BUSINESS SERVICES AUTHORITY');


INSERT INTO suppliers (supplier)
VALUES ('NHS HEREFORDSHIRE AND WORCESTERSHIRE CCG');


INSERT INTO suppliers (supplier)
VALUES ('NHS PROFESSIONALS LTD');


INSERT INTO suppliers (supplier)
VALUES ('NOVARTIS PHARMACEUTICALS UK LTD');


INSERT INTO suppliers (supplier)
VALUES ('OLYMPUS KEYMED');


INSERT INTO suppliers (supplier)
VALUES ('OMNICELL LTD');


INSERT INTO suppliers (supplier)
VALUES ('P2G MANAGEMENT LTD');


INSERT INTO suppliers (supplier)
VALUES ('PICK EVERARD');


INSERT INTO suppliers (supplier)
VALUES ('PINNEGAR HAYWARD DESIGN');


INSERT INTO suppliers (supplier)
VALUES ('REDDITCH BOROUGH COUNCIL');


INSERT INTO suppliers (supplier)
VALUES ('REGIS PROJECT MANAGEMENT LTD');


INSERT INTO suppliers (supplier)
VALUES ('ROCHE PRODUCTS LTD');


INSERT INTO suppliers (supplier)
VALUES ('SALFORD ROYAL HOSPITALS NHS FOUNDATION TRUST');


INSERT INTO suppliers (supplier)
VALUES ('SIEMENS HEALTHCARE LTD');


INSERT INTO suppliers (supplier)
VALUES ('SOFTCAT PLC');


INSERT INTO suppliers (supplier)
VALUES ('SPELLER METCALFE MALVERN LTD');


INSERT INTO suppliers (supplier)
VALUES ('ST HELENS & KNOWSLEY HOSPITALS NHS TRUST');


INSERT INTO suppliers (supplier)
VALUES ('STRIDE TREGLOWN LTD');


INSERT INTO suppliers (supplier)
VALUES ('SUPPLY CHAIN COORDINATION LIMITED');


INSERT INTO suppliers (supplier)
VALUES ('SYNERGY HEALTH MANAGED SERVICES LTD');


INSERT INTO suppliers (supplier)
VALUES ('TRAK SYSTEMS LTD');


INSERT INTO suppliers (supplier)
VALUES ('TRANSFORM HOSPITAL GROUP LTD');


INSERT INTO suppliers (supplier)
VALUES ('UNIVERSITY HOSPITALS BIRMINGHAM NHS FOUNDATION TRUST');


INSERT INTO suppliers (supplier)
VALUES ('WATER PLUS LTD');


INSERT INTO suppliers (supplier)
VALUES ('WILLIAM GOUGH & SONS');


INSERT INTO suppliers (supplier)
VALUES ('WORCESTER CITY COUNCIL');


INSERT INTO suppliers (supplier)
VALUES ('WORCESTERSHIRE HOSPITAL SPC PLC');


INSERT INTO suppliers (supplier)
VALUES ('WYE VALLEY NHS TRUST');


INSERT INTO suppliers (supplier)
VALUES ('WYRE FOREST DISTRICT COUNCIL');


INSERT INTO suppliers (supplier)
VALUES ('XEROX (UK) LTD');


INSERT INTO suppliers (supplier)
VALUES ('XOGRAPH HEALTHCARE LTD');


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (26,
        1,
        40,
        '2021-03-01',
        37782617,
        '7384',
        'Omnicell automated pharmacy cabinets',
        109645);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (19,
        3,
        62,
        '2021-03-01',
        37472419,
        '373170',
        'BOWEL CANCER SCREENING PROGRAMME',
        44000);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (19,
        3,
        62,
        '2021-03-01',
        37411755,
        '373171',
        'BOWEL SCREENING AT ROSS',
        122301);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (20,
        1,
        24,
        '2021-03-01',
        37515257,
        '064PY001526372111',
        'Income Tax',
        3094950);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (28,
        1,
        24,
        '2021-03-01',
        37515257,
        '064PY001526372111',
        'National Insurance',
        3435364);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (33,
        1,
        35,
        '2021-03-01',
        37411793,
        '1000068209',
        'Prescriptions',
        28700);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (1,
        1,
        20,
        '2021-03-01',
        37776847,
        '1051181673',
        'Renal Central Delivery System',
        29260);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (29,
        1,
        53,
        '2021-03-01',
        37511770,
        '1121202801',
        'Medical and non medical products',
        49651);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (29,
        1,
        53,
        '2021-03-01',
        37511769,
        '1121202813',
        'Medical and non medical products',
        51451);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (29,
        1,
        53,
        '2021-03-01',
        37511767,
        '1121202978',
        'Medical and non medical products',
        90657);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (29,
        1,
        53,
        '2021-03-01',
        37517158,
        '1121207419',
        'Medical and non medical products',
        44852);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (29,
        1,
        53,
        '2021-03-01',
        37517143,
        '1121207431',
        'Medical and non medical products',
        37876);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (29,
        1,
        53,
        '2021-03-01',
        37517165,
        '1121207648',
        'Medical and non medical products',
        75631);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (29,
        1,
        53,
        '2021-03-01',
        37600568,
        '1121210694',
        'Medical and non medical products',
        48845);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (29,
        1,
        53,
        '2021-03-01',
        37600569,
        '1121210760',
        'Medical and non medical products',
        90520);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (29,
        1,
        53,
        '2021-03-01',
        37675623,
        '1121215300',
        'Medical and non medical products',
        55941);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (29,
        1,
        53,
        '2021-03-01',
        37675612,
        '1121215491',
        'Medical and non medical products',
        92336);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (29,
        1,
        53,
        '2021-03-01',
        37788784,
        '1121220982',
        'Medical and non medical products',
        49152);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (29,
        1,
        53,
        '2021-03-01',
        37788791,
        '1121221000',
        'Medical and non medical products',
        32879);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (29,
        1,
        53,
        '2021-03-01',
        37788787,
        '1121221187',
        'Medical and non medical products',
        85279);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (1,
        1,
        19,
        '2021-03-01',
        37301879,
        '11380',
        'A Block Oncology',
        97004);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (1,
        1,
        19,
        '2021-03-01',
        37301879,
        '11380',
        'A Block, Kidderminster Hospital Oncology refurbishment.',
        254474);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (1,
        1,
        19,
        '2021-03-01',
        37475457,
        '11394',
        'Refurbishment of Dirty Utilities at the Alexandra Hospital.',
        76509);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (1,
        1,
        19,
        '2021-03-01',
        37743666,
        '11418',
        'A Block, Kidderminster Hospital Oncology refurbishment.',
        25891);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (1,
        1,
        26,
        '2021-03-01',
        37633180,
        '11523',
        'Aconbury West works',
        38931);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (1,
        1,
        26,
        '2021-03-01',
        37633180,
        '11523',
        'Works to Aconbury Boiler House.',
        194657);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (1,
        1,
        26,
        '2021-03-01',
        37791127,
        '11533',
        'Works to Aconbury Boiler House.',
        43630);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (1,
        1,
        26,
        '2021-03-01',
        37791127,
        '11533',
        'Works to Aconbury Boiler House.',
        218150);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (1,
        1,
        26,
        '2021-03-01',
        37791126,
        '11534',
        'Works to Aconbury Boiler House.',
        33245);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (6,
        29,
        61,
        '2021-03-01',
        37588977,
        '11646',
        'DAF 0227/2020 new ward',
        77085);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (26,
        1,
        61,
        '2021-03-01',
        37588980,
        '11675',
        'Charges for One-off Bullet payments',
        373746);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (1,
        1,
        61,
        '2021-03-01',
        37588982,
        '11683',
        'DAF FM/0034/18 - LV Panel',
        32086);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (4,
        9,
        61,
        '2021-03-01',
        37588984,
        '11696',
        'Current Year DAF Variations',
        39661);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (6,
        29,
        61,
        '2021-03-01',
        37588985,
        '11697',
        'Passthrough costs related to Kings Court soft Service',
        50968);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (13,
        32,
        61,
        '2021-03-01',
        37588986,
        '11714',
        'Laundry volume',
        60000);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (4,
        2,
        61,
        '2021-03-01',
        37588988,
        '11715',
        'Meals Volume',
        105000);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (10,
        26,
        61,
        '2021-03-01',
        37588987,
        '11716',
        'Waste Volume',
        25000);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (18,
        32,
        61,
        '2021-03-01',
        37472468,
        '11728',
        'Gas charges',
        35914);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (12,
        32,
        61,
        '2021-03-01',
        37472473,
        '11729',
        'Electricity charges',
        116093);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (12,
        32,
        61,
        '2021-03-01',
        37472466,
        '11730',
        'Electricity charges',
        113709);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (12,
        14,
        61,
        '2021-03-01',
        37472467,
        '11732',
        'Electricity charges',
        26610);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (12,
        20,
        61,
        '2021-03-01',
        37472467,
        '11732',
        'Electricity charges',
        37837);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (12,
        15,
        61,
        '2021-03-01',
        37472467,
        '11732',
        'Electricity charges',
        91940);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (12,
        20,
        61,
        '2021-03-01',
        37472471,
        '11733',
        'Electricity charges',
        31732);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (12,
        15,
        61,
        '2021-03-01',
        37472471,
        '11733',
        'Electricity charges',
        76865);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (4,
        32,
        61,
        '2021-03-01',
        37600475,
        '11735',
        'Staff and Equipment Costs',
        402901);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (4,
        32,
        61,
        '2021-03-01',
        37600475,
        '11735',
        'Staff and Equipment Costs',
        2311856);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (6,
        29,
        61,
        '2021-03-01',
        37588995,
        '11736',
        'HPV Cleans DAF',
        77744);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (6,
        29,
        61,
        '2021-03-01',
        37588993,
        '11737',
        'HPV Cleans DAF',
        59233);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (4,
        2,
        61,
        '2021-03-01',
        37588992,
        '11740',
        'Meals Additional Variations',
        32558);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (6,
        29,
        61,
        '2021-03-01',
        37588994,
        '11741',
        'Additional Cleans',
        42236);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (6,
        29,
        61,
        '2021-03-01',
        37588996,
        '11742',
        'Additional Cleans',
        117952);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (10,
        32,
        61,
        '2021-03-01',
        37675470,
        '11746',
        'Link bridge soft services provision',
        45865);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (23,
        16,
        61,
        '2021-03-01',
        37588999,
        '11750',
        'Passthrough costs',
        25845);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (4,
        9,
        61,
        '2021-03-01',
        37675488,
        '11751',
        'Current Year DAF Variations',
        45657);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (24,
        8,
        61,
        '2021-03-01',
        37675483,
        '11752',
        'Charges for One-off Bullet payments',
        68359);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (21,
        17,
        61,
        '2021-03-01',
        37774836,
        '11763',
        'Reagents costs',
        38957);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (5,
        27,
        61,
        '2021-03-01',
        37698681,
        '11780',
        'DAF Temporary a/c units',
        31891);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (23,
        16,
        61,
        '2021-03-01',
        37711249,
        '11784',
        'Reagents costs',
        95000);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (26,
        1,
        61,
        '2021-03-01',
        37711245,
        '11785',
        'Charges for One-off Bullet payments',
        188952);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (12,
        32,
        61,
        '2021-03-01',
        37716255,
        '11786',
        'Electricity charges',
        107011);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (18,
        32,
        61,
        '2021-03-01',
        37698692,
        '11787',
        'Gas charges',
        29362);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (12,
        14,
        61,
        '2021-03-01',
        37711252,
        '11788',
        'Electricity charges',
        171208);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (4,
        2,
        61,
        '2021-03-01',
        37716258,
        '11794',
        'Meals Volume',
        100000);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (10,
        26,
        61,
        '2021-03-01',
        37698700,
        '11795',
        'Waste Volume',
        25000);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (13,
        32,
        61,
        '2021-03-01',
        37698708,
        '11796',
        'Laundry volume',
        72000);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (24,
        8,
        61,
        '2021-03-01',
        37726827,
        '11804',
        'Passthrough costs - HPV Cleans',
        35495);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (6,
        29,
        61,
        '2021-03-01',
        37726829,
        '11806',
        'Passthrough costs - HPV Cleans',
        25695);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (24,
        8,
        61,
        '2021-03-01',
        37726825,
        '11807',
        'Passthrough costs - Amber/Additional cleans',
        43490);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (1,
        1,
        61,
        '2021-03-01',
        37774951,
        '11812',
        'DAF - Mulberry Suite',
        145379);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (24,
        8,
        61,
        '2021-03-01',
        37774901,
        '11817',
        'DAF - COVID hangers',
        192563);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (24,
        8,
        61,
        '2021-03-01',
        37774956,
        '11818',
        'DAF - additional screens',
        33959);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (1,
        1,
        61,
        '2021-03-01',
        37774966,
        '11821',
        'DAF ICU bed bays',
        168186);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (24,
        8,
        61,
        '2021-03-01',
        37774932,
        '11822',
        'DAF - ARU Phase 2 works',
        41692);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (5,
        25,
        61,
        '2021-03-01',
        37774947,
        '11823',
        'DAF - Kings Court Data Centre',
        31197);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (24,
        8,
        61,
        '2021-03-01',
        37774922,
        '11824',
        'DAF - ED walkway',
        31168);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (26,
        1,
        65,
        '2021-03-01',
        37782678,
        '11893',
        'Replacement of DR Rooms - Alexandra Hospital',
        35653);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (26,
        1,
        65,
        '2021-03-01',
        37782678,
        '11893',
        'Replacement of DR Rooms - Alexandra Hospital',
        178267);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (24,
        10,
        32,
        '2021-03-01',
        37479181,
        '1204481171',
        'Medtronic patient consumables to include cannulas, reservoirs and batteries.',
        53494);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (1,
        1,
        18,
        '2021-03-01',
        37743776,
        '12637',
        'CT enabling works - Diagnostic equipment replacement',
        77933);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (34,
        1,
        15,
        '2021-03-01',
        37444070,
        '158164-25-FEB-2021',
        'CCLA investment',
        500000);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (41,
        33,
        31,
        '2021-03-01',
        37519574,
        '15861',
        'Call-Off order for Medica Day/Night Hawk OOH',
        34087);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (41,
        33,
        31,
        '2021-03-01',
        37519568,
        '15862',
        'Call-Off order for Medica Day/Night Hawk OOH',
        47227);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (1,
        1,
        43,
        '2021-03-01',
        37672678,
        '197220911',
        'Design Team Services',
        26760);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (13,
        22,
        54,
        '2021-03-01',
        37474728,
        '20012314',
        'Linen services for Feb 21 for Alexandra Hospital',
        36161);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (25,
        34,
        53,
        '2021-03-01',
        37474695,
        '2121006816',
        'Contract COVERING PACS SYSTEMS',
        25882);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (25,
        35,
        53,
        '2021-03-01',
        37741036,
        '2121007564',
        'NHSSC - SIEMENS HEALTHCARE TOP SERVICE CONTRACT',
        124220);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (1,
        1,
        59,
        '2021-03-01',
        37492426,
        '21917',
        'Evesham Community Hospital - Endoscopy Ventilation',
        67239);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (34,
        1,
        43,
        '2021-03-01',
        37695252,
        '2600C20912',
        'Design Team Services',
        31400);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (1,
        1,
        52,
        '2021-03-01',
        37590313,
        '27257',
        'ED Expansion Aconbury',
        28089);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (36,
        41,
        44,
        '2021-03-01',
        37727437,
        '3.00005E+21',
        'Non Domestic rates for the Alexandra Hospital',
        568320);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (17,
        39,
        55,
        '2021-03-01',
        37540464,
        '3004199',
        'Trak catering solutions',
        50523);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (17,
        39,
        55,
        '2021-03-01',
        37540468,
        '3004215',
        'Trak catering solutions',
        83777);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (1,
        1,
        33,
        '2021-03-01',
        37492411,
        '305116',
        'Nurse Call Alex, Midwest supply, wiring installation',
        29521);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (1,
        1,
        33,
        '2021-03-01',
        37483833,
        '305118',
        'Alexandra Hospital Fire Alarm Infrastructure Replacement',
        102740);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (1,
        1,
        33,
        '2021-03-01',
        37547566,
        '305139',
        'Alexandra Hospital - AHU 3 & 4 Replacement',
        58315);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (1,
        1,
        33,
        '2021-03-01',
        37513682,
        '305222',
        'Alexandra Hospital - AHU 3 & 4 Replacement',
        46674);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (26,
        1,
        30,
        '2021-03-01',
        37546709,
        '3129097328',
        'Meera Operating Table + Accessories',
        33091);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (26,
        1,
        29,
        '2021-03-01',
        37727478,
        '31475009425',
        'Single X-ray Room Breast Screening Units',
        77360);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (26,
        1,
        29,
        '2021-03-01',
        37727478,
        '31475009425',
        'Single X-ray Room Breast Screening Units',
        386800);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (1,
        1,
        33,
        '2021-03-01',
        37776736,
        '33287573060',
        'Alexandra Hospital - AHU 3 & 4 Replacement',
        49577);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (1,
        1,
        16,
        '2021-03-01',
        37547602,
        '3780118386',
        'CALL OFF PO - CLOUD STORAGE SOLUTION PROVISION FOR PACS',
        44273);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (1,
        1,
        16,
        '2021-03-01',
        37544766,
        '3780118476',
        'CALL OFF PO - SCCM - Upgrade to Current Branch',
        307388);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (1,
        1,
        16,
        '2021-03-01',
        37632604,
        '3780118573',
        'CALL OFF PO - Services to be called off',
        61976);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (1,
        1,
        16,
        '2021-03-01',
        37782686,
        '3780119124',
        'CALL OFF PO - CLOUD STORAGE SOLUTION PROVISION FOR PACS',
        119273);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (1,
        1,
        16,
        '2021-03-01',
        37314934,
        '3882896550',
        'CALL OFF ORDER - NETWORKING - LAN - Edge Switches',
        55146);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (7,
        44,
        16,
        '2021-03-01',
        37475459,
        '3882927026',
        'Dell Finance deal re provision of hardware & licenses',
        135591);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (7,
        44,
        16,
        '2021-03-01',
        37483816,
        '3882927028',
        'Dell Finance deal re provision of hardware & licenses',
        135591);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (1,
        1,
        16,
        '2021-03-01',
        37716805,
        '3882972565',
        'CALL OFF ORDER - NETWORKING - LAN - Core Switches & Wireless Services',
        180859);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (8,
        44,
        5,
        '2021-03-01',
        37676147,
        '4000007084',
        'Embedded Enterprise Edition license',
        148671);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (8,
        11,
        5,
        '2021-03-01',
        37546706,
        '4000007304',
        'PROVISION OF HEALTHCARE CLINICAL INFORMATION SYSTEM SERVICES',
        818625);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (26,
        1,
        28,
        '2021-03-01',
        37717278,
        '6020085261',
        'Resectoscope Technical Services',
        38246);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (26,
        1,
        28,
        '2021-03-01',
        37755444,
        '6020085620',
        'Flexible endoscope Technical Service',
        30238);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (26,
        1,
        65,
        '2021-03-01',
        37513693,
        '77176',
        'Replacement of DR Rooms - Alexandra Hospital',
        35653);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (26,
        1,
        65,
        '2021-03-01',
        37513693,
        '77176',
        'Replacement of DR Rooms - Alexandra Hospital',
        178267);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (22,
        21,
        60,
        '2021-03-01',
        37717273,
        '8020001502',
        'Worcester City Council',
        25500);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (39,
        1,
        9,
        '2021-03-01',
        37700804,
        '824C329074',
        'PHARMACY PURCHASES',
        45623);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (39,
        1,
        9,
        '2021-03-01',
        37695530,
        '824C332034',
        'PHARMACY PURCHASES',
        45623);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (39,
        1,
        9,
        '2021-03-01',
        37700805,
        '824C332870',
        'PHARMACY PURCHASES',
        45623);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (39,
        1,
        9,
        '2021-03-01',
        37605445,
        '824C333477',
        'PHARMACY PURCHASES',
        72996);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (39,
        1,
        9,
        '2021-03-01',
        37700806,
        '824C333893',
        'PHARMACY PURCHASES',
        45623);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (39,
        1,
        9,
        '2021-03-01',
        37700807,
        '824C336769',
        'PHARMACY PURCHASES',
        72996);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (39,
        1,
        9,
        '2021-03-01',
        37778546,
        '824C337241',
        'PHARMACY PURCHASES',
        45623);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (8,
        24,
        64,
        '2021-03-01',
        37119925,
        '900207313',
        'Xerox - Call Off PO costs for the managed Print Contract',
        96460);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (8,
        45,
        64,
        '2021-03-01',
        37483819,
        '900208144',
        'Xerox - Rectify anomalies',
        44540);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (8,
        45,
        64,
        '2021-03-01',
        37754965,
        '900208609',
        'XEROX CALL OFF ORDER CONTRACT - Scanning Library and printing services',
        35950);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (39,
        1,
        38,
        '2021-03-01',
        37605489,
        '92408741',
        'PHARMACY PURCHASES',
        28882);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (1,
        1,
        33,
        '2021-03-01',
        37776735,
        'CB287573060',
        'AHU 3 &4 Replacement',
        35687);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (26,
        1,
        39,
        '2021-03-01',
        37492427,
        'CD2653241',
        'Laparoscopic imaging stacks 2 Slave systems',
        120394);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (26,
        1,
        39,
        '2021-03-01',
        37546696,
        'CD2654267',
        'Laparoscopic imaging stacks 2 Slave systems',
        34698);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (26,
        1,
        39,
        '2021-03-01',
        37546696,
        'CD2654267',
        'Laparoscopic imaging stacks 2 Slave systems',
        173488);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (1,
        1,
        50,
        '2021-03-01',
        37460223,
        'CIN8567',
        'UEC Spellers Strip and survey works - first floor and ground floor of Aconbury east',
        40922);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (1,
        1,
        50,
        '2021-03-01',
        37460223,
        'CIN8567',
        'UEC Spellers Strip and survey works - first floor and ground floor of Aconbury east',
        204609);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (1,
        1,
        50,
        '2021-03-01',
        37633177,
        'CIN8595',
        'Worcestershire Royal Hospital Breast Screening unit extension.',
        60011);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (1,
        1,
        50,
        '2021-03-01',
        37633172,
        'CIN8605',
        'Strip and survey for UEC project ground floor Aconbury East',
        31292);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (1,
        1,
        50,
        '2021-03-01',
        37633172,
        'CIN8605',
        'Strip and survey for UEC project ground floor Aconbury East',
        156459);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (1,
        1,
        50,
        '2021-03-01',
        37669233,
        'CIN8630',
        'Worcestershire Royal Hospital Breast Screening unit extension',
        56687);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (1,
        1,
        50,
        '2021-03-01',
        37755398,
        'CIN8649',
        'Strip and survey for UEC project ground floor Aconbury East',
        55115);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (1,
        1,
        50,
        '2021-03-01',
        37755398,
        'CIN8649',
        'Strip and survey for UEC project ground floor Aconbury East',
        275574);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (1,
        1,
        50,
        '2021-03-01',
        37776701,
        'CIN8651',
        'Strip and survey for UEC project ground floor Aconbury East',
        59356);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (1,
        1,
        50,
        '2021-03-01',
        37776701,
        'CIN8651',
        'Strip and survey for UEC project ground floor Aconbury East',
        296778);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (39,
        1,
        3,
        '2021-03-01',
        37517595,
        'E13104538',
        'PHARMACY PURCHASES',
        25631);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (39,
        1,
        3,
        '2021-03-01',
        37549114,
        'E13201527',
        'PHARMACY PURCHASES',
        38391);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (39,
        1,
        3,
        '2021-03-01',
        37635840,
        'E13800375',
        'PHARMACY PURCHASES',
        25620);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (39,
        1,
        3,
        '2021-03-01',
        37690739,
        'E13F02167',
        'PHARMACY PURCHASES',
        31304);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (39,
        1,
        3,
        '2021-03-01',
        37778631,
        'E13P00288',
        'PHARMACY PURCHASES',
        28123);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (31,
        13,
        37,
        '2021-03-01',
        37446182,
        'I000037606P',
        'Agency Staff',
        90738);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (2,
        6,
        37,
        '2021-03-01',
        37446186,
        'I000037754P',
        'Staff Nurse',
        61436);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (2,
        6,
        37,
        '2021-03-01',
        37446184,
        'I000037764P',
        'Staff Nurse',
        263849);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (31,
        6,
        37,
        '2021-03-01',
        37446204,
        'I000037873P',
        'Agency Staff',
        179146);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (31,
        6,
        37,
        '2021-03-01',
        37446201,
        'I000037925P',
        'Agency Staff',
        39928);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (31,
        13,
        37,
        '2021-03-01',
        37478639,
        'I000037936P',
        'Agency Staff',
        162986);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (2,
        6,
        37,
        '2021-03-01',
        37478641,
        'I000038054P',
        'Staff Nurse',
        277329);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (2,
        6,
        37,
        '2021-03-01',
        37478640,
        'I000038055P',
        'Staff Nurse',
        65479);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (31,
        6,
        37,
        '2021-03-01',
        37600493,
        'I000038224P',
        'Agency Staff',
        54025);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (31,
        6,
        37,
        '2021-03-01',
        37600496,
        'I000038234P',
        'Agency Staff',
        187161);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (2,
        6,
        37,
        '2021-03-01',
        37600502,
        'I000038240P',
        'Staff Nurse',
        54176);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (2,
        6,
        37,
        '2021-03-01',
        37600499,
        'I000038250P',
        'Staff Nurse',
        257378);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (31,
        13,
        37,
        '2021-03-01',
        37600513,
        'I000038369P',
        'Agency Staff',
        116671);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (27,
        30,
        37,
        '2021-03-01',
        37600517,
        'I000038387P',
        'Overseas Nurses Fees',
        34800);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (2,
        6,
        37,
        '2021-03-01',
        37600537,
        'I000038460P',
        'Staff Nurse',
        54192);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (2,
        6,
        37,
        '2021-03-01',
        37600534,
        'I000038490P',
        'Staff Nurse',
        37500);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (31,
        6,
        37,
        '2021-03-01',
        37600552,
        'I000038557P',
        'Agency Staff',
        167338);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (31,
        13,
        37,
        '2021-03-01',
        37600553,
        'I000038564P',
        'Agency Staff',
        38593);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (31,
        6,
        37,
        '2021-03-01',
        37617989,
        'I000038640P',
        'Agency Staff',
        116757);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (2,
        6,
        37,
        '2021-03-01',
        37618037,
        'I000038715P',
        'Staff Nurse',
        245400);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (2,
        6,
        37,
        '2021-03-01',
        37618041,
        'I000038730P',
        'Staff Nurse',
        59613);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (31,
        6,
        37,
        '2021-03-01',
        37675571,
        'I000038893P',
        'Agency Staff',
        43718);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (31,
        6,
        37,
        '2021-03-01',
        37675563,
        'I000038896P',
        'Agency Staff',
        188697);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (31,
        13,
        37,
        '2021-03-01',
        37726824,
        'I000038926P',
        'Agency Staff',
        124482);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (2,
        6,
        37,
        '2021-03-01',
        37726848,
        'I000038965P',
        'Staff Nurse',
        53964);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (2,
        6,
        37,
        '2021-03-01',
        37726846,
        'I000038970P',
        'Staff Nurse',
        253378);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (2,
        6,
        37,
        '2021-03-01',
        37741290,
        'I000039135P',
        'Staff Nurse',
        86933);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (31,
        6,
        37,
        '2021-03-01',
        37788778,
        'I000039226P',
        'Agency Staff',
        46427);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (31,
        6,
        37,
        '2021-03-01',
        37788780,
        'I000039227P',
        'Agency Staff',
        189799);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (2,
        6,
        37,
        '2021-03-01',
        37788814,
        'I000039344P',
        'Staff Nurse',
        145664);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (26,
        1,
        12,
        '2021-03-01',
        37444186,
        'INV0115154',
        'Subscription License CCU',
        37881);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (26,
        1,
        12,
        '2021-03-01',
        37512894,
        'INV0115227',
        'Eizo Monitors RX560',
        37184);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (26,
        1,
        12,
        '2021-03-01',
        37512894,
        'INV0115227',
        'Eizo Monitors RX360',
        47755);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (8,
        31,
        14,
        '2021-03-01',
        37603659,
        'INV34212000925',
        'Support and Maintenance for Clinisys Winpath Pathology IT system',
        96767);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (8,
        31,
        14,
        '2021-03-01',
        37632595,
        'INV34212100347',
        'Support and Maintenance for Clinisys Winpath Pathology IT system',
        48343);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (8,
        31,
        14,
        '2021-03-01',
        37632601,
        'INV34212100348',
        'Support and Maintenance for Clinisys Winpath Pathology IT system',
        30242);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (8,
        31,
        14,
        '2021-03-01',
        37632601,
        'INV34212100348',
        'Support and Maintenance for Clinisys Winpath Pathology IT system',
        151212);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (1,
        1,
        17,
        '2021-03-01',
        37520209,
        'INV4131',
        'Site surveys and weekly design/Progress Meetings.',
        25000);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (19,
        28,
        57,
        '2021-03-01',
        37472430,
        'OPX065455',
        'Plastics SLA',
        33368);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (35,
        25,
        41,
        '2021-03-01',
        37574010,
        'PML0051',
        'Agreement fee as set out in the Report for the Settlement Deed',
        51113);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (1,
        1,
        47,
        '2021-03-01',
        37656649,
        'S0040839',
        'UEC Support',
        109680);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (39,
        1,
        4,
        '2021-03-01',
        37480281,
        'SIN103109439',
        'PHARMACY PURCHASES',
        27000);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (39,
        1,
        8,
        '2021-03-01',
        37414222,
        'SQS0064539',
        'PHARMACY PURCHASES',
        33393);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (39,
        1,
        8,
        '2021-03-01',
        37635926,
        'SQS0066149',
        'PHARMACY PURCHASES',
        33369);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (39,
        1,
        8,
        '2021-03-01',
        37690786,
        'SQS0067832',
        'PHARMACY PURCHASES',
        60088);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (39,
        1,
        8,
        '2021-03-01',
        37719785,
        'SQS0069827',
        'PHARMACY PURCHASES',
        32280);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (40,
        14,
        58,
        '2021-03-01',
        37698673,
        'STWINV04632895',
        'Water charges',
        43178);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (40,
        14,
        58,
        '2021-03-01',
        37698686,
        'STWINV04665988',
        'Water charges',
        63678);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (9,
        42,
        23,
        '2021-03-01',
        37750117,
        'T034177',
        'Consultant Fees',
        74996);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (30,
        12,
        23,
        '2021-03-01',
        37774776,
        'T034340',
        'Staff Nurse',
        64927);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (9,
        37,
        23,
        '2021-03-01',
        37726776,
        'T034397',
        'Consultant Fees',
        461861);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (9,
        37,
        23,
        '2021-03-01',
        37669018,
        'T034456',
        'Consultant Fees',
        646944);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (30,
        12,
        23,
        '2021-03-01',
        37774787,
        'T034475',
        'Staff Nurse',
        64926);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (39,
        1,
        23,
        '2021-03-01',
        37675451,
        'T034556',
        'Drugs for Spasticity clinics',
        30591);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (9,
        37,
        23,
        '2021-03-01',
        37788777,
        'T034567',
        'Consultant Fees',
        423270);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (30,
        12,
        23,
        '2021-03-01',
        37774825,
        'T034767',
        'Staff Nurse',
        64926);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (1,
        1,
        33,
        '2021-04-01',
        37801641,
        '305719',
        'Fire Alarm Infrastructure Replacement',
        25000);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (29,
        1,
        53,
        '2021-04-01',
        37852571,
        '1122000268',
        'Medical and non medical products',
        25466);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (26,
        1,
        21,
        '2021-04-01',
        37801672,
        '634684',
        'Breast Screening Digital Mammography Equipment',
        25602);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (26,
        1,
        21,
        '2021-04-01',
        37801681,
        '634683',
        'Breast Screening Digital Mammography Equipment',
        25602);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (32,
        33,
        25,
        '2021-04-01',
        37907271,
        '4430',
        'Insignia PACS Contract',
        25634);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (8,
        18,
        6,
        '2021-04-01',
        37804617,
        'ALTINV001724',
        'System Support Renewal',
        25650);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (2,
        6,
        37,
        '2021-04-01',
        38104089,
        'I000040654P',
        'Staff Nurse',
        26226);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (3,
        8,
        7,
        '2021-04-01',
        37933543,
        '3392624203',
        'Extension of Auto Logic Block rental mattresses',
        26387);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (7,
        44,
        16,
        '2021-04-01',
        37873401,
        '2881000473',
        'Provision of hardware & licenses',
        26578);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (14,
        25,
        45,
        '2021-04-01',
        38014040,
        '181225',
        'Advisor Projects',
        26856);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (29,
        1,
        53,
        '2021-04-01',
        37846634,
        '1121224373',
        'Medical and non medical products',
        27356);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (5,
        8,
        61,
        '2021-04-01',
        37960823,
        '11837',
        'DAF - Fixed Screens',
        27841);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (1,
        1,
        17,
        '2021-04-01',
        37804421,
        'INV4299',
        'Site surveys and weekly design',
        27870);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (31,
        6,
        37,
        '2021-04-01',
        37811714,
        'I000039471P',
        'Agency Staff',
        27966);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (39,
        1,
        38,
        '2021-04-01',
        37854459,
        '92422960',
        'PHARMACY PURCHASES',
        28849);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (35,
        11,
        16,
        '2021-04-01',
        37853305,
        '3780119757',
        'DCR PAS Project Manager',
        28912);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (29,
        1,
        53,
        '2021-04-01',
        37917568,
        '1122002045',
        'Medical and non medical products',
        29584);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (31,
        6,
        37,
        '2021-04-01',
        37905657,
        'I000039854P',
        'Agency Staff',
        29772);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (1,
        1,
        16,
        '2021-04-01',
        37854035,
        '3780119745',
        'CALL OFF PO - REMOTE ACCESS',
        30000);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (14,
        25,
        45,
        '2021-04-01',
        38014043,
        '181226',
        'Advisor Projects',
        30040);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (1,
        1,
        16,
        '2021-04-01',
        37823809,
        '3780119356',
        'CALL OFF ORDER - NETWORKING',
        30942);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (13,
        22,
        54,
        '2021-04-01',
        37829728,
        '30012185',
        'Linen services',
        30990);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (38,
        40,
        49,
        '2021-04-01',
        38001615,
        'INV02901455',
        'Multitone Contract Variations',
        31039);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (39,
        1,
        3,
        '2021-04-01',
        37797096,
        'E13P09484',
        'PHARMACY PURCHASES',
        31112);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (39,
        1,
        3,
        '2021-04-01',
        38088113,
        'E14L09542',
        'PHARMACY PURCHASES',
        31288);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (2,
        13,
        37,
        '2021-04-01',
        38001061,
        'I000040281P',
        'Staff Nurse',
        31611);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (38,
        40,
        49,
        '2021-04-01',
        38001613,
        'INV02901449',
        'Multitone iMessage System',
        32186);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (1,
        1,
        18,
        '2021-04-01',
        37801675,
        '12636',
        'CT enabling works - Diagnostic equipment replacement',
        32492);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (1,
        1,
        49,
        '2021-04-01',
        37829726,
        'INV02887847',
        'Alertive Bleeping Contract',
        32500);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (8,
        44,
        16,
        '2021-04-01',
        37876450,
        '3780119965',
        'PAS - Project Management',
        32607);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (1,
        1,
        22,
        '2021-04-01',
        37804605,
        '10732021',
        'Subscription for Teladoc Health telemedicine stations',
        33242);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (1,
        1,
        16,
        '2021-04-01',
        37918575,
        '3358000570',
        'Professional Services',
        33333);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (39,
        1,
        8,
        '2021-04-01',
        38088137,
        'SQS0074870',
        'PHARMACY PURCHASES',
        33369);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (39,
        1,
        8,
        '2021-04-01',
        37854531,
        'SQS0071253',
        'PHARMACY PURCHASES',
        33393);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (8,
        38,
        16,
        '2021-04-01',
        37853309,
        '3882988345',
        'Computer Licenses',
        34182);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (34,
        1,
        37,
        '2021-04-01',
        37788824,
        'I000039418P',
        'Recruitment fee for international nurses',
        34800);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (8,
        45,
        64,
        '2021-04-01',
        37716783,
        '900208545',
        'Scanning Library and printing services',
        34940);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (1,
        1,
        16,
        '2021-04-01',
        37823809,
        '3780119356',
        'CALL OFF ORDER - COMBINED NETWORKING',
        35090);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (39,
        1,
        34,
        '2021-04-01',
        37828239,
        '894966',
        'Charge Blood and components',
        35142);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (39,
        1,
        34,
        '2021-04-01',
        37960895,
        '895443',
        'Charge Blood and components',
        35142);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (39,
        1,
        46,
        '2021-04-01',
        37793557,
        '1322180388',
        'PHARMACY PURCHASES',
        35929);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (1,
        1,
        11,
        '2021-04-01',
        37811703,
        '42369',
        'LHCR programme costs',
        36200);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (5,
        8,
        61,
        '2021-04-01',
        37960828,
        '11836',
        'DAF - Fixed Screens',
        38854);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (37,
        4,
        62,
        '2021-04-01',
        37828175,
        '373432',
        'Secondement Staff',
        39894);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (1,
        1,
        36,
        '2021-04-01',
        38059452,
        '7032500381',
        'Recharge of intersystems',
        40000);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (1,
        1,
        33,
        '2021-04-01',
        37776162,
        '305638',
        'Extension to Car Park',
        40127);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (29,
        1,
        53,
        '2021-04-01',
        37987249,
        '1122005458',
        'Medical and non medical products',
        40420);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (1,
        1,
        1,
        '2021-04-01',
        37802387,
        '15902043',
        'Replacement of Windows',
        41273);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (29,
        1,
        53,
        '2021-04-01',
        37917578,
        '1122002023',
        'Medical and non medical products',
        41689);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (1,
        1,
        16,
        '2021-04-01',
        37853996,
        '3358000574',
        'Professional Services',
        42123);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (2,
        6,
        37,
        '2021-04-01',
        37940579,
        'I000039902P',
        'Staff Nurse',
        42268);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (19,
        3,
        62,
        '2021-04-01',
        37828184,
        '373939',
        'Bowel Cancer Screening - Programme',
        44000);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (29,
        1,
        53,
        '2021-04-01',
        38067150,
        '1122013905',
        'Medical and non medical products',
        44146);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (1,
        1,
        16,
        '2021-04-01',
        37823814,
        '3882986160',
        'CALL OFF ORDER - COMBINED NETWORKING',
        44680);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (39,
        1,
        9,
        '2021-04-01',
        37796832,
        '824C336168',
        'PHARMACY PURCHASES',
        45623);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (8,
        18,
        6,
        '2021-04-01',
        37804617,
        'ALTINV001724',
        'System Support Renewal',
        46130);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (1,
        1,
        33,
        '2021-04-01',
        37801646,
        '305691',
        'Nurse Call ,supply, installation and commission of equipment',
        46133);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (41,
        33,
        31,
        '2021-04-01',
        37896424,
        '15976',
        'Call-Off order for Medica Day/Night Hawk OOH',
        47347);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (1,
        1,
        19,
        '2021-04-01',
        37801678,
        '11434',
        'Refurbishment of Utilities at the Alexandra Hospital',
        48270);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (15,
        7,
        56,
        '2021-04-01',
        38087156,
        'T00129',
        'OMF Services',
        48750);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (1,
        1,
        50,
        '2021-04-01',
        37813145,
        'CIN8661',
        'Breast Screening unit extension',
        49205);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (1,
        1,
        33,
        '2021-04-01',
        37802414,
        '305730',
        'Extension to Car Park',
        49367);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (29,
        1,
        53,
        '2021-04-01',
        38067207,
        '1122013900',
        'Medical and non medical products',
        49666);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (2,
        6,
        37,
        '2021-04-01',
        37852631,
        'I000039642P',
        'Staff Nurse',
        51506);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (39,
        1,
        10,
        '2021-04-01',
        37794069,
        '3950017217',
        'PHARMACY PURCHASES',
        54600);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (39,
        1,
        10,
        '2021-04-01',
        38061073,
        '3950017479',
        'PHARMACY PURCHASES',
        54600);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (8,
        38,
        16,
        '2021-04-01',
        37853309,
        '3882988345',
        'Computer Licenses',
        55049);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (36,
        41,
        63,
        '2021-04-01',
        37941051,
        '158365-15-APR-2021',
        'Council Tax',
        56320);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (36,
        41,
        63,
        '2021-04-01',
        37984818,
        '158368-19-APR-2021',
        'Council Tax',
        56320);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (29,
        1,
        53,
        '2021-04-01',
        37846623,
        '1121224489',
        'Medical and non medical products',
        56610);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (1,
        1,
        27,
        '2021-04-01',
        37801677,
        '2624',
        'Service Block roof refurbishment',
        57012);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (1,
        1,
        1,
        '2021-04-01',
        37802387,
        '15902043',
        'Replacement of Windows',
        58255);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (1,
        1,
        59,
        '2021-04-01',
        37802419,
        '22304',
        'Waste Compound',
        58675);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (26,
        1,
        48,
        '2021-04-01',
        37905196,
        '1051097317',
        'Medical Equipment - Imaging System',
        61275);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (1,
        1,
        33,
        '2021-04-01',
        38025406,
        '306067',
        'Ward and Theatre works',
        62124);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (15,
        7,
        56,
        '2021-04-01',
        38087154,
        'T00133',
        'OMF Services',
        64588);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (19,
        36,
        57,
        '2021-04-01',
        37828213,
        'OHC004202',
        'Consultant Services',
        65062);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (39,
        1,
        8,
        '2021-04-01',
        37958649,
        'SQS0073721',
        'PHARMACY PURCHASES',
        66738);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (1,
        1,
        33,
        '2021-04-01',
        37801643,
        '305693',
        'Fire Alarm Infrastructure Replacement',
        66742);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (1,
        1,
        33,
        '2021-04-01',
        37964716,
        '306012',
        'CCTV Replacement',
        68035);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (1,
        1,
        42,
        '2021-04-01',
        37819265,
        '65219',
        'Trust Advisor and Consultancy Services',
        70253);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (29,
        1,
        53,
        '2021-04-01',
        37917576,
        '1122004135',
        'Medical and non medical products',
        71465);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (29,
        1,
        53,
        '2021-04-01',
        37987255,
        '1122005450',
        'Medical and non medical products',
        73554);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (1,
        1,
        33,
        '2021-04-01',
        37802414,
        '305730',
        'Extension to Car Park',
        80490);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (7,
        18,
        16,
        '2021-04-01',
        37829701,
        '3882986165',
        'Computer Hardware Dell',
        81473);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (41,
        33,
        53,
        '2021-04-01',
        38015058,
        '9522000093',
        'X-Ray Equipment',
        86724);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (29,
        1,
        53,
        '2021-04-01',
        38067073,
        '1122013957',
        'Medical and non medical products',
        95961);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (19,
        3,
        62,
        '2021-04-01',
        37828188,
        '373940',
        'Bowel Cancer Screening - Programme',
        96983);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (29,
        1,
        53,
        '2021-04-01',
        37987244,
        '1122005523',
        'Medical and non medical products',
        102769);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (39,
        1,
        34,
        '2021-04-01',
        37828240,
        '894978',
        'Charge Blood and components',
        104266);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (39,
        1,
        34,
        '2021-04-01',
        37960894,
        '895455',
        'Charge Blood and components',
        104266);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (1,
        1,
        26,
        '2021-04-01',
        38076283,
        '11535',
        'Alexandra Hospital Breast Screening unit works',
        106966);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (31,
        13,
        37,
        '2021-04-01',
        38067227,
        'I000040523P',
        'Agency Staff',
        107013);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (11,
        43,
        2,
        '2021-04-01',
        37870181,
        '464',
        'Circuit Charges Worcestershire Royal Hospital',
        107584);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (11,
        43,
        2,
        '2021-04-01',
        37870181,
        '464',
        'Circuit Charges Worcestershire Royal Hospital',
        107584);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (1,
        1,
        61,
        '2021-04-01',
        37960831,
        '11834',
        'DAF - Oncology CT installation',
        107846);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (31,
        13,
        37,
        '2021-04-01',
        37894110,
        'I000039666P',
        'Agency Staff',
        108315);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (31,
        13,
        37,
        '2021-04-01',
        37931950,
        'I000039861P',
        'Agency Staff',
        112053);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (26,
        1,
        20,
        '2021-04-01',
        37964740,
        '1051181671',
        'Replacement of RO plant at Dialysis Unit',
        113510);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (31,
        13,
        37,
        '2021-04-01',
        37788800,
        'I000039357P',
        'Agency Staff',
        121952);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (1,
        1,
        33,
        '2021-04-01',
        37801644,
        '305690',
        'Nurse Call, supply, installation and commission of equipment',
        123583);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (22,
        21,
        60,
        '2021-04-01',
        37717273,
        '8020001502',
        'Worcester City Council. Rental of building',
        127500);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (26,
        1,
        21,
        '2021-04-01',
        37801681,
        '634683',
        'Breast Screening Digital Mammography Equipment',
        128010);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (26,
        1,
        21,
        '2021-04-01',
        37801672,
        '634684',
        'Breast Screening Digital Mammography Equipment',
        128010);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (31,
        6,
        37,
        '2021-04-01',
        38059475,
        'I000040482P',
        'Agency Staff',
        129446);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (31,
        13,
        37,
        '2021-04-01',
        38001030,
        'I000040153P',
        'Agency Staff',
        140283);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (36,
        41,
        60,
        '2021-04-01',
        37823476,
        '158340-06-APR-2021',
        'Council Tax',
        141824);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (36,
        41,
        60,
        '2021-04-01',
        37984817,
        '158369-19-APR-2021',
        'Council Tax',
        141824);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (31,
        6,
        37,
        '2021-04-01',
        37811711,
        'I000039470P',
        'Agency Staff',
        143377);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (31,
        6,
        37,
        '2021-04-01',
        37987223,
        'I000040073P',
        'Agency Staff',
        150659);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (31,
        13,
        37,
        '2021-04-01',
        37987181,
        'I000037323P',
        'Agency Staff',
        154028);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (1,
        1,
        18,
        '2021-04-01',
        37801675,
        '12636',
        'CT enabling works - Diagnostic equipment replacement',
        162458);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (1,
        1,
        22,
        '2021-04-01',
        37804605,
        '10732021',
        'Subscription for Teladoc Health telemedicine stations',
        166210);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (1,
        1,
        33,
        '2021-04-01',
        37776735,
        'CB287573060',
        'Ward Replacement',
        178435);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (1,
        1,
        16,
        '2021-04-01',
        37853678,
        '3780119741',
        'Server Upgrade Programme',
        183806);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (1,
        1,
        36,
        '2021-04-01',
        38059455,
        '7032500383',
        'Recharge of Mindwave Care Planning',
        200000);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (1,
        1,
        33,
        '2021-04-01',
        37776162,
        '305638',
        'Extension to Car Park',
        200633);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (2,
        6,
        37,
        '2021-04-01',
        38104090,
        'I000040652P',
        'Staff Nurse',
        202212);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (8,
        19,
        16,
        '2021-04-01',
        37854026,
        '3780119644',
        'Digital Aspirant Project',
        233000);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (16,
        23,
        51,
        '2021-04-01',
        37960821,
        '16804296',
        'POST GRADUATE LEVY - WEST MIDLANDS',
        240000);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (16,
        23,
        51,
        '2021-04-01',
        38022931,
        '16804679',
        'POST GRADUATE LEVY - WEST MIDLANDS',
        240000);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (1,
        1,
        50,
        '2021-04-01',
        37813145,
        'CIN8661',
        'Breast Screening unit extension',
        246025);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (1,
        1,
        1,
        '2021-04-01',
        37802387,
        '15902043',
        'Replacement of Windows',
        250000);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (2,
        6,
        37,
        '2021-04-01',
        38001058,
        'I000040285P',
        'Staff Nurse',
        253391);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (1,
        1,
        11,
        '2021-04-01',
        37811701,
        '42370',
        'Intersystems Hosting',
        288000);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (1,
        1,
        61,
        '2021-04-01',
        37828209,
        '11829',
        'DAF - Professional fees',
        300000);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (31,
        6,
        37,
        '2021-04-01',
        37905659,
        'I000039857P',
        'Agency Staff',
        301794);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (2,
        6,
        37,
        '2021-04-01',
        37940586,
        'I000039905P',
        'Staff Nurse',
        303664);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (26,
        1,
        48,
        '2021-04-01',
        37905196,
        '1051097317',
        'Medical Equipment - Imaging System',
        306375);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (35,
        5,
        13,
        '2021-04-01',
        38014054,
        '42914332',
        'Annual Fee',
        319646);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (2,
        6,
        37,
        '2021-04-01',
        37852638,
        'I000039570P',
        'Staff Nurse',
        351630);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (1,
        1,
        16,
        '2021-04-01',
        37854007,
        '3780119641',
        'Professional Services',
        390000);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (1,
        1,
        61,
        '2021-04-01',
        37828204,
        '11802',
        'UEC Expansion Project',
        393799);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (4,
        32,
        61,
        '2021-04-01',
        38000896,
        '11832',
        'Performance Staff and equipments costs',
        402901);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (41,
        33,
        53,
        '2021-04-01',
        38015058,
        '9522000093',
        'X-Ray Equipment',
        433622);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (8,
        45,
        64,
        '2021-04-01',
        37847694,
        '900208713',
        'Scanning Library and printing services',
        487500);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (1,
        1,
        16,
        '2021-04-01',
        37823809,
        '3780119356',
        'CALL OFF ORDER - NETWORKING',
        535773);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (4,
        32,
        61,
        '2021-04-01',
        38000896,
        '11832',
        'Performance Staff and equipments costs',
        2311856);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (20,
        1,
        24,
        '2021-04-01',
        37900261,
        '064PY001526372112',
        'Income Tax',
        2989772);


INSERT INTO spends (expense_type_id, expense_area_id, supplier_id, date, transaction_no, supplier_inv_no, description, amount)
VALUES (28,
        1,
        24,
        '2021-04-01',
        37900261,
        '064PY001526372112',
        'National Insurance Contributions',
        3330925);