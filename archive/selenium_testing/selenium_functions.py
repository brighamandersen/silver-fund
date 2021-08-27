# selenium imports
from selenium import webdriver
from selenium.webdriver.common.keys import Keys

# driver functions
driver = webdriver.Chrome()  # add path in ()
driver.get('')  # add url in ''
assert "" in driver.title  # add keyword check in "" for a website element


# find element functions
elem = driver.find_elements_by_xpath('')
elem = driver.find_elements_by_id('')
...     # many other .find_element methods

# NOTE - can combine functions to one line
elem = driver.find_elements_by_('').click()

# element functions
elem.click()
elem.send_keys('')  # type text into '' to simulate user keystrokes
elem.send_keys(Keys.ENTER)  # simulate pressing the enter button
elem.clear()    # clear text in an element


driver.close()  # close driver
