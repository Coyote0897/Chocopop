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




    def test_Agregar_prodcutos(self):
       usuario_input = self.driver.find_element(By.XPATH, "//label[text()='Usuario']/following-sibling::input")
       usuario_input.send_keys("choco")
       contraseña_input = self.driver.find_element(By.XPATH, "//label[text()='Contraseña']/following-sibling::input")
       contraseña_input.send_keys("popqwerty")
       self.driver.find_element(By.XPATH, "//button[text()='Iniciar Sesión']").click()
       time.sleep(3)

       #agregar empleado siendo administrador
       self.driver.find_element(By.XPATH, "//span[text()='Administracion']").click()
       time.sleep(1)
       self.driver.find_element(By.XPATH, "//button[text()='Agregar Usuario']").click()
       time.sleep(1)
       usuario = self.driver.find_element(By.XPATH, "//input[@placeholder='Usuario']")
       usuario.send_keys("prueba")
       time.sleep(1)
       self.driver.find_element(By.XPATH, "//option[text()='Empleado']").click()
       time.sleep(1)
       contra = self.driver.find_element(By.XPATH, "//input[@placeholder='Contraseña']")
       contra.send_keys("qwerty")
       time.sleep(1)
       self.driver.find_element(By.XPATH, "//button[text()='Guardar']").click()
       time.sleep(1)
       self.driver.find_element(By.XPATH, "//button[text()='OK']").click()
       time.sleep(1)
       self.driver.find_element(By.XPATH, "//table/tbody/tr[3]/td[last()]/div/button[contains(@class, 'bg-blue-500')]").click()
       time.sleep(1)
       usuario1 = self.driver.find_element(By.XPATH, "//input[@placeholder='Usuario']")
       usuario1.send_keys("1")
       time.sleep(1)
       self.driver.find_element(By.XPATH, "//button[text()='Actualizar']").click()
       time.sleep(1)
       self.driver.find_element(By.XPATH, "//button[text()='OK']").click()
       time.sleep(1)
       self.driver.find_element(By.XPATH, "//table/tbody/tr[3]/td[last()]/div/button[contains(@class, 'bg-red-500')]").click()
       time.sleep(1)
       self.driver.find_element(By.XPATH, "//button[text()='Sí, eliminar']").click()
       time.sleep(1)
       self.driver.find_element(By.XPATH, "//button[text()='OK']").click()
    
    