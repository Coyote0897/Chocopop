from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager
import time

class TestSIU:
    ci='9897019'
    day='21'
    month='5'
    year='2003'

    esperado1="Fabio Sebastian Romero Pardo".lower()
    esperado2=ci

    actual1=""
    actual2=''

    def setup_method(self):
        self.driver = webdriver.Chrome()
        self.driver.maximize_window()
        self.driver.get('https://yoparticipo.oep.org.bo')
        self.driver.execute_script("document.body.style.zoom='80%'")
        time.sleep(1)

        self.driver.find_element(By.XPATH, "//input").send_keys(self.ci)

        self.driver.find_element(By.XPATH, "//select[contains(@aria-label,'month')]").click()
        self.driver.find_element(By.XPATH, f"//select[contains(@aria-label,'month')]//child::option[@value='{self.month}']").click()
        
        self.driver.find_element(By.XPATH, "//select[contains(@aria-label,'year')]").click()
        self.driver.find_element(By.XPATH, f"//select[contains(@aria-label,'year')]//child::option[@value='{self.year}']").click()
        
        self.driver.find_element(By.XPATH, f"//div[text()='{self.day}']").click()
        
        self.driver.find_element(By.XPATH, f"//button[text()='Consultar']").click()
        time.sleep(2)

        self.actual1=self.driver.find_element(By.XPATH, f"//h2").text.lower()
        self.actual2=self.driver.find_element(By.XPATH, f"//h4[contains(text(),'Doc.')]").text


    def teardown_method(self):
        self.driver.quit()
        print("Prueba finalizada")
    
    def test_verify_name(self):
        assert  self.actual1 == self.esperado1, f"FAILED:  {self.esperado1}, {self.actual1}"
        

class TestSIU2:
    ci='9897019'
    day='21'
    month='5'
    year='2003'

    esperado1="Fabio Sebastian Romero Pardo".lower()
    esperado2=ci

    actual1=""
    actual2=''

    def setup_method(self):
        self.driver = webdriver.Chrome()
        self.driver.maximize_window()
        self.driver.get('https://yoparticipo.oep.org.bo')
        self.driver.execute_script("document.body.style.zoom='80%'")
        time.sleep(1)

        self.driver.find_element(By.XPATH, "//input").send_keys(self.ci)

        self.driver.find_element(By.XPATH, "//select[contains(@aria-label,'month')]").click()
        self.driver.find_element(By.XPATH, f"//select[contains(@aria-label,'month')]//child::option[@value='{self.month}']").click()
        
        self.driver.find_element(By.XPATH, "//select[contains(@aria-label,'year')]").click()
        self.driver.find_element(By.XPATH, f"//select[contains(@aria-label,'year')]//child::option[@value='{self.year}']").click()
        
        self.driver.find_element(By.XPATH, f"//div[text()='{self.day}']").click()
        
        self.driver.find_element(By.XPATH, f"//button[text()='Consultar']").click()
        time.sleep(2)

        self.actual1=self.driver.find_element(By.XPATH, f"//h2").text.lower()
        self.actual2=self.driver.find_element(By.XPATH, f"//h4[contains(text(),'Doc.')]").text


    def teardown_method(self):
        self.driver.quit()
        print("Prueba finalizada")
       
    def test_verify_ci(self):
        assert  self.esperado2 in self.actual2, f"FAILED:  {self.esperado2}, {self.actual2}"

