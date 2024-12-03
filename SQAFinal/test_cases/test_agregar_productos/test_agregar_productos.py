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

       #agregar productos
       
       self.driver.find_element(By.XPATH, "//span[text()='Productos']").click()
       time.sleep(1)
       self.driver.find_element(By.XPATH, "//button[text()='+ Agregar con Código de Barras']").click()
       time.sleep(1)
       codigodebarras = self.driver.find_element(By.XPATH, "//input[@placeholder='Código de Barras']")
       codigodebarras.send_keys("7771258731147")
       time.sleep(1)
       self.driver.find_element(By.XPATH, "//button[text()='Agregar']").click()
       time.sleep(10)
       self.driver.find_element(By.XPATH, "//button[text()='OK']").click()
       time.sleep(1)
       precio = self.driver.find_element(By.XPATH, "//input[@placeholder='Precio']")
       precio.send_keys("50")
       time.sleep(3)
       self.driver.find_element(By.XPATH, "//select[@id='categoria']//option[text()='Bolsas']").click()
       time.sleep(3)
       self.driver.find_element(By.XPATH, "//button[text()='Actualizar']").click()
       time.sleep(3)
       actual=self.driver.find_element(By.XPATH, "//h2[text()='Actualización exitosa']").text
       time.sleep(3)
       esperado='Actualización exitosa'
       assert esperado in actual, f"ERROR, actual {actual}, esperado: {esperado}"
       time.sleep(3)
       self.driver.find_element(By.XPATH, "//button[text()='OK']").click()
       time.sleep(3)
       self.driver.find_element(By.XPATH, "//button[text()='8']").click()
       #editar
       self.driver.find_element(By.XPATH, "//td[text()='hojuelas de quinua blanca orgánica.']/following-sibling::td//button[contains(@class, 'bg-blue-500')]").click()
       time.sleep(3)
       codigodebarras = self.driver.find_element(By.XPATH, "//input[@name='pais']")
       codigodebarras.send_keys("bolivia")
       time.sleep(3)
       self.driver.find_element(By.XPATH, "//button[text()='Guardar']").click()
       time.sleep(3)
       self.driver.find_element(By.XPATH, "//button[text()='OK']").click()
       time.sleep(3)
       #eliminar
       time.sleep(3)
       self.driver.find_element(By.XPATH, "//td[text()='hojuelas de quinua blanca orgánica.']/following-sibling::td//button[contains(@class, 'bg-red-500')]").click()
       time.sleep(3)
       self.driver.find_element(By.XPATH, "//button[text()='Sí, eliminar']").click()
       time.sleep(3)
       self.driver.find_element(By.XPATH, "//button[text()='OK']").click()

       