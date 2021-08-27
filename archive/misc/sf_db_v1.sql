CREATE DATABASE IF NOT EXISTS `test_sf`;
USE `test_sf`;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;


-- Equity Security Master Table
DROP TABLE IF EXISTS `equity_security_master`;
CREATE TABLE equity_security_master (
    asset_id VARCHAR(15) NOT NULL,
    ticker VARCHAR(8) NOT NULL,
    conid VARCHAR(9) NOT NULL,  /* FIXME - Change to exact conid length (fix on proposal too) */
    cusip VARCHAR(15) NOT NULL,
    valid_date TIMESTAMP NOT NULL,
    industry_code VARCHAR(3) NOT NULL,
    country_code VARCHAR(4) NOT NULL,
    prim_exch VARCHAR(1) NOT NULL,
    currency VARCHAR(4) NOT NULL,
    flag VARCHAR(1),
    PRIMARY KEY (asset_id)
);

-- FX Table
DROP TABLE IF EXISTS `fx`;
CREATE TABLE fx (
    country_code VARCHAR(6) NOT NULL,
    date_ TIMESTAMP NOT NULL,
    exchange_rate DOUBLE NOT NULL,
    30_day_rate DOUBLE NOT NULL,
    90_day_rate DOUBLE NOT NULL,
    180_day_rate DOUBLE NOT NULL,
    1_year_rate DOUBLE NOT NULL,
    2_year_rate DOUBLE NOT NULL,
    3_year_rate DOUBLE NOT NULL,
    5_year_rate DOUBLE NOT NULL,
    7_year_rate DOUBLE NOT NULL,
    10_year_rate DOUBLE NOT NULL,
    20_year_rate DOUBLE NOT NULL,
    30_year_rate DOUBLE NOT NULL,
    PRIMARY KEY (country_code)
);

-- Position Table
DROP TABLE IF EXISTS `position`;
CREATE TABLE position (
    asset_id VARCHAR(15) NOT NULL,
    ticker VARCHAR(6) NOT NULL,
    num_of_shares INT NOT NULL,
    pos_type VARCHAR(10) NOT NULL,
    price DOUBLE NOT NULL,
    position_value DOUBLE NOT NULL,
    FOREIGN KEY (asset_id) REFERENCES equity_security_master(asset_id)
);

-- Trade Table
DROP TABLE IF EXISTS `trade`;
CREATE TABLE trade (
    trade_id INT NOT NULL,
    asset_id VARCHAR(8) NOT NULL,
    trade_type VARCHAR(8) NOT NULL,
    num_of_shares INT NOT NULL,
    price DOUBLE NOT NULL,
    tot_price DOUBLE NOT NULL,
    trade_status VARCHAR(10) NOT NULL,
    trade_time TIMESTAMP NOT NULL,
    PRIMARY KEY (trade_id),
    FOREIGN KEY (asset_id) REFERENCES equity_security_master(asset_id)
);

-- Market Data Table
DROP TABLE IF EXISTS `market_data`;
CREATE TABLE market_data (
    asset_id VARCHAR(15) NOT NULL,
    date_ TIMESTAMP NOT NULL,
    open_price DOUBLE NOT NULL,
    close_price DOUBLE NOT NULL,
    intra_high DOUBLE NOT NULL,
    intra_low DOUBLE NOT NULL,
    dividend DOUBLE NOT NULL,
    adj_factor DOUBLE NOT NULL,
    num_of_shares INT NOT NULL,
    tot_value DOUBLE NOT NULL,
    cap DOUBLE NOT NULL,
    usd_shr INT NOT NULL,
    CONSTRAINT pk_market_data PRIMARY KEY (asset_id, asset_date),
	FOREIGN KEY (asset_id) REFERENCES equity_security_master(asset_id)
);

-- Add data sample to tables
-- INSERT INTO `equity_security_master` VALUES ('0001','AAPL','2020-07-02','GIC','USA','N','USD','A'),('0002','AMZN','2020-07-02','GIC','USA','N','USD','A');
-- INSERT INTO `fx` VALUES ('CHN','2020-07-02',0.14153,0.14083,0.13962,0.14426,0.14555,0.15079,0.14844,0.16109,0.16314,0.14756,0.12077,0.20877);
-- INSERT INTO `market_data` VALUES ('0001','2020-07-02',110,120.12,130.01,99.12,0,1,633045,1548960000000,2,1);
-- INSERT INTO `position` VALUES ('0001','AAPL',100,120.96,12096);
-- INSERT INTO `trade` VALUES (1,'0001','buy',100,120.96,12096,'complete','2020-07-02');