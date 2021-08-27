from selenium import webdriver
from secrets import INSTA_USERNAME, INSTA_PASSWORD
from time import sleep


class InstaBot():

    def __init__(self):
        self.USERNAME = INSTA_USERNAME
        self.PASSWORD = INSTA_PASSWORD

        self.driver = webdriver.Chrome()
        self.driver.get('https://instagram.com')

    def login(self):
        # find and enter username
        self.driver.find_element_by_name(
            'username').send_keys(self.USERNAME)
        # find and enter password
        self.driver.find_element_by_name(
            'password').send_keys(self.PASSWORD)
        # hit login button
        self.driver.find_element_by_xpath(
            '//*[@id="react-root"]/section/main/article/div[2]/div[1]/div/form/div[4]/button/div').click()
        sleep(3)
        # close save login popup
        self.driver.find_element_by_xpath(
            '//*[@id="react-root"]/section/main/div/div/div/div/button').click()
        # close notifications popup
        self.driver.find_element_by_xpath(
            '/html/body/div[4]/div/div/div/div[3]/button[2]').click()

    def open_profile(self):
        PROFILE_URL = 'https://instagram.com/' + self.USERNAME + '/'
        self.driver.get(PROFILE_URL)
