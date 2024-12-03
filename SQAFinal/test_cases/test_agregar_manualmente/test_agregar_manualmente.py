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




       
    
    def test_Agregar_prodcutos_manualmente(self):
        

        usuario_input = self.driver.find_element(By.XPATH, "//label[text()='Usuario']/following-sibling::input")
        usuario_input.send_keys("choco")
        contraseña_input = self.driver.find_element(By.XPATH, "//label[text()='Contraseña']/following-sibling::input")
        contraseña_input.send_keys("popqwerty")
        self.driver.find_element(By.XPATH, "//button[text()='Iniciar Sesión']").click()
        time.sleep(3)

        #agregar productos manualmente
        self.driver.find_element(By.XPATH, "//span[text()='Productos']").click()
        time.sleep(1)
        self.driver.find_element(By.XPATH, "//button[text()='+ Agregar Manualmente']").click()
        time.sleep(1)
        nombre = self.driver.find_element(By.XPATH, "//input[@id='nombre']")
        nombre.send_keys("Milka")
        time.sleep(1)
        self.driver.find_element(By.XPATH, "//select[@id='categoria']//option[text()='Barras']").click()
        time.sleep(1)
        precio = self.driver.find_element(By.XPATH, "//input[@id='precio']")
        precio.send_keys("56")
        time.sleep(1)
        descripcion = self.driver.find_element(By.XPATH, "//input[@id='descripcion']")
        descripcion.send_keys("barras de chocolate")
        time.sleep(1)
        ingredientes = self.driver.find_element(By.XPATH, "//input[@id='ingredientes']")
        ingredientes.send_keys("mani y cocoa")
        time.sleep(1)
        pais = self.driver.find_element(By.XPATH, "//input[@id='pais']")
        pais.send_keys("peru")
        time.sleep(1)
        self.driver.find_element(By.XPATH, "//button[text()='Agregar']").click()
        time.sleep(1)
        
        
