from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from webdriver_manager.chrome import ChromeDriverManager 
import time

class TestVerDetalles:
    def setup_method(self):
        self.driver = webdriver.Chrome()
        self.driver.maximize_window()
        self.driver.get('http://localhost:3001')
        time.sleep(3)

    def teardown_method(self):
        self.driver.quit()
        print("El test case de mostrar los gráficos en los reportes se hizo de manera correcta.")

    def test_view_button_functionality(self):
        
        usuario_actual = self.driver.find_element(By.XPATH, "//input[@type = 'text']")
        contrasena_actual  = self.driver.find_element(By.XPATH, "//input[@type = 'password']")
        
        usuario_actual.send_keys("choco")
        contrasena_actual.send_keys("popqwerty")
        
        btn_inicio_sesion = self.driver.find_element(By.XPATH, "//button[@type = 'submit']")
        btn_inicio_sesion.click()
        
        time.sleep(4)  
        
        reportes = self.driver.find_element(By.XPATH, "//a[@href = '/reportes']")
        reportes.click()

        time.sleep(4)  
        
        grafico = self.driver.find_element(By.XPATH, "//canvas[@role = 'img']")
        assert grafico.is_displayed(), "FALLÓ: El gráfico del reporte no se puede visualizar."

        time.sleep(4)
