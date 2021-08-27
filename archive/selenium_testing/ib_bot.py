from selenium import webdriver
from os import system
from time import sleep
import subprocess


class IBBot:
    def __init__(self):

        self.PAPER_USERNAME = "byusf3215"
        self.PAPER_PASSWORD = "paper1234"

        # settings to avoid privacy warnings
        options = webdriver.ChromeOptions()
        options.add_argument("--ignore-sll-errors=yes")
        options.add_argument("--ignore-certificate-errors")

        # start up Java server
        system(
            'start cmd /k "cd C:/Coding/SF/interactive-broker-python-api/resources/clientportal.beta.gw & "bin/run.bat" "root/conf.yaml""'
        )

        # start up web driver
        self.driver = webdriver.Chrome(
            "C:\\Coding\SF\silverfund\selenium_testing\chromedriver", options=options
        )

    def login(self):
        self.driver.get("https://localhost:5000/")
        # find and enter username
        self.driver.find_element_by_id("user_name").send_keys(self.PAPER_USERNAME)
        # find and enter password
        self.driver.find_element_by_id("password").send_keys(self.PAPER_PASSWORD)
        # hit login button
        self.driver.find_element_by_id("submitForm").click()

    def auth_verify(self):
        self.driver.get("https://localhost:5000/v1/portal/iserver/auth/status/")

    def demo(self):
        self.driver.get("https://localhost:5000/demo/")

    def stop_selenium(self):
        self.driver.quit()

    def stop_server(self):
        self.driver.switch_to.window(self.cmd_window)
        system("exit")


## SCRIPT ##

bot = IBBot()
bot.login()
sleep(10)
bot.auth_verify()
sleep(3)
bot.demo()
sleep(3)
bot.stop_selenium()
