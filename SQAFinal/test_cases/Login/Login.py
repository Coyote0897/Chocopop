from selenium import webdriver
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager
import time


class TestInterfaz:
    def setup_method(self):
        self.driver = webdriver.Chrome()
        self.driver.maximize_window()
        self.driver.get('http://localhost:3001/')

    def teardown_method(self):
        self.driver.quit()
        print("Prueba visual completada")

    def test_verify_inicio_sesion_admin(self):
        
       usuario_input = self.driver.find_element(By.XPATH, "//label[text()='Usuario']/following-sibling::input")
       usuario_input.send_keys("choco")
       contraseña_input = self.driver.find_element(By.XPATH, "//label[text()='Contraseña']/following-sibling::input")
       contraseña_input.send_keys("popqwerty")
       self.driver.find_element(By.XPATH, "//button[text()='Iniciar Sesión']").click()
       time.sleep(5)
       

       actual=self.driver.find_element(By.XPATH, "//p[@class='text-lg' and contains(., 'Administrador')]").text
       esperado = 'Administrador'

       assert esperado in actual, f"ERROR, actual {actual}, esperado: {esperado}"

       
    def test_verify_inicio_sesion_EMPLEADO(self):
        
       usuario_input = self.driver.find_element(By.XPATH, "//label[text()='Usuario']/following-sibling::input")
       usuario_input.send_keys("Gabriel")
       contraseña_input = self.driver.find_element(By.XPATH, "//label[text()='Contraseña']/following-sibling::input")
       contraseña_input.send_keys("qwerty")
       self.driver.find_element(By.XPATH, "//button[text()='Iniciar Sesión']").click()
       time.sleep(5)
       

       actual=self.driver.find_element(By.XPATH, "//p[@class='text-lg' and contains(., 'Empleado')]").text
       esperado = 'Empleado'

       assert esperado in actual, f"ERROR, actual {actual}, esperado: {esperado}"
    
    
       
       






    
        
        

    



       


       
    