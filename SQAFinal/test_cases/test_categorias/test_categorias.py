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
        
        #inicio sesion

        usuario_input = self.driver.find_element(By.XPATH, "//label[text()='Usuario']/following-sibling::input")
        usuario_input.send_keys("choco")
        contraseña_input = self.driver.find_element(By.XPATH, "//label[text()='Contraseña']/following-sibling::input")
        contraseña_input.send_keys("popqwerty")
        self.driver.find_element(By.XPATH, "//button[text()='Iniciar Sesión']").click()
        time.sleep(3)

        #categorias
        self.driver.find_element(By.XPATH, "//span[text()='Categorias']").click()
        time.sleep(1)
        #agregar categoria
        self.driver.find_element(By.XPATH, "//button[text()='Agregar Categoría']").click()
        time.sleep(1)
        Categoria = self.driver.find_element(By.XPATH, "//input[@placeholder='Nombre de la categoría']")
        Categoria.send_keys("Categoria")
        time.sleep(1)
        descripcion = self.driver.find_element(By.XPATH, "//input[@placeholder='Descripción (máx. 100 caracteres)']")
        descripcion.send_keys("Descripcion categoria")
        time.sleep(1)
        self.driver.find_element(By.XPATH, "//button[text()='Guardar']").click()
        time.sleep(1)
        self.driver.find_element(By.XPATH, "//button[text()='OK']").click()
        time.sleep(1)
         #agregar categoria nuevamente
        self.driver.find_element(By.XPATH, "//button[text()='Agregar Categoría']").click()
        time.sleep(1)
        Categoria = self.driver.find_element(By.XPATH, "//input[@placeholder='Nombre de la categoría']")
        Categoria.send_keys("Categoria")
        time.sleep(1)
        descripcion = self.driver.find_element(By.XPATH, "//input[@placeholder='Descripción (máx. 100 caracteres)']")
        descripcion.send_keys("Descripcion categoria")
        time.sleep(1)
        self.driver.find_element(By.XPATH, "//button[text()='Guardar']").click()
        time.sleep(1)
        actual=self.driver.find_element(By.XPATH, "//div[@id='swal2-validation-message']").text
        esperado='Ya existe una categoría con este nombre'
        assert esperado in actual, f"ERROR, actual {actual}, esperado: {esperado}"
        time.sleep(1)
        self.driver.find_element(By.XPATH, "//button[text()='Cancel']").click()
        time.sleep(1)
        #editar categoria
        self.driver.find_element(By.XPATH, "//td[text()='Categoria']/following-sibling::td//button[contains(@class, 'bg-blue-500')]").click()
        time.sleep(1)
        Categoria = self.driver.find_element(By.XPATH, "//input[@placeholder='Nombre de la categoría']")
        Categoria.send_keys(" jaja")
        time.sleep(1)
        self.driver.find_element(By.XPATH, "//button[text()='Actualizar']").click()
        time.sleep(1)
        self.driver.find_element(By.XPATH, "//button[text()='OK']").click()
        time.sleep(1)
        #eliminar
        self.driver.find_element(By.XPATH, "//td[text()='Descripcion categoria']/following-sibling::td//button[contains(@class, 'bg-red-500')]").click()
        time.sleep(1)
        self.driver.find_element(By.XPATH, "//button[text()='Sí, eliminar']").click()
        time.sleep(1)
        self.driver.find_element(By.XPATH, "//button[text()='OK']").click()
        time.sleep(1)
