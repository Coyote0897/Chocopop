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




       
    
    def test_ventas(self):
        

        usuario_input = self.driver.find_element(By.XPATH, "//label[text()='Usuario']/following-sibling::input")
        usuario_input.send_keys("choco")
        contraseña_input = self.driver.find_element(By.XPATH, "//label[text()='Contraseña']/following-sibling::input")
        contraseña_input.send_keys("popqwerty")
        self.driver.find_element(By.XPATH, "//button[text()='Iniciar Sesión']").click()
        time.sleep(3)

        #ventas
        self.driver.find_element(By.XPATH, "//span[text()='Ventas']").click()
        time.sleep(1)
        self.driver.find_element(By.XPATH, "//button[text()='Registrar Venta']").click()
        time.sleep(1)
        actual=self.driver.find_element(By.XPATH, "//div[text()='Debe agregar al menos un producto a la venta']").text
        esperado='Debe agregar al menos un producto a la venta'
        assert esperado in actual, f"ERROR, actual {actual}, esperado: {esperado}"
        self.driver.find_element(By.XPATH, "//button[text()='OK']").click()
        time.sleep(1)
        self.driver.find_element(By.XPATH, "//button[text()='Agregar Producto a Venta']").click()
        time.sleep(1)
        codigo1 = self.driver.find_element(By.XPATH, "//input[@placeholder='Código de barras']")
        codigo1.send_keys("5449000011527")
        time.sleep(1)
        self.driver.find_element(By.XPATH, "//button[text()='Buscar producto']").click()
        time.sleep(1)
        cantidad = self.driver.find_element(By.XPATH, "//input[@id='cantidad']")
        cantidad.send_keys("3")
        time.sleep(1)
        self.driver.find_element(By.XPATH, "//button[text()='Agregar a la Venta']").click()
        time.sleep(1)
        self.driver.find_element(By.XPATH, "//button[text()='OK']").click()
        time.sleep(1)
        self.driver.find_element(By.XPATH, "//button[text()='Editar']").click()
        time.sleep(1)
        cantidad = self.driver.find_element(By.XPATH, "//input[@id='swal2-input']")
        cantidad.click()
        cantidad.clear()
        cantidad.send_keys("1")
        time.sleep(1)
        self.driver.find_element(By.XPATH, "//button[text()='Guardar']").click()
        time.sleep(1)
        self.driver.find_element(By.XPATH, "//button[text()='Eliminar']").click()
        time.sleep(1)
        self.driver.find_element(By.XPATH, "//div[@class='swal2-actions']//button[text()='Eliminar']").click()
        time.sleep(1)
        #agregar nuevamente
        self.driver.find_element(By.XPATH, "//button[text()='Agregar Producto a Venta']").click()
        time.sleep(1)
        codigo1 = self.driver.find_element(By.XPATH, "//input[@placeholder='Código de barras']")
        codigo1.send_keys("5449000011527")
        time.sleep(1)
        self.driver.find_element(By.XPATH, "//button[text()='Buscar producto']").click()
        time.sleep(1)
        cantidad = self.driver.find_element(By.XPATH, "//input[@id='cantidad']")
        cantidad.send_keys("3")
        time.sleep(1)
        self.driver.find_element(By.XPATH, "//button[text()='Agregar a la Venta']").click()
        time.sleep(1)
        self.driver.find_element(By.XPATH, "//button[text()='OK']").click()
        time.sleep(1)
        self.driver.find_element(By.XPATH, "//button[text()='Registrar Venta']").click()
        time.sleep(1)
        self.driver.find_element(By.XPATH, "//select[@id='swal2-select']//option[text()='Efectivo']").click()
        time.sleep(1)
        self.driver.find_element(By.XPATH, "//div[@class='swal2-actions']//button[text()='Registrar Venta']").click()
        time.sleep(1)
        self.driver.find_element(By.XPATH, "//button[text()='OK']").click()
        time.sleep(3)
        
