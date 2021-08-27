from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from time import sleep

# start up web driver
driver = webdriver.Chrome()

# BYU SEARCH TEST
driver.get('https://www.byu.edu/search-all')
searchBar = driver.find_element_by_id('SearchResultsPageInput')
searchBar.send_keys('test search')
searchBar.send_keys(Keys.ENTER)
time.sleep(5)
driver.close()
