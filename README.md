
# Instrucciones para Configurar y Generar el Script

Este documento describe los pasos necesarios para configurar y ejecutar el script que genera un archivo Excel con dos hojas, "Compras" y "Ventas", a partir de un archivo fuente.

---

## 1. Clonar el Repositorio

1. Abre una terminal.
2. Ejecuta el siguiente comando para clonar el repositorio:
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   ```
3. Navega al directorio del proyecto:
   ```bash
   cd <NOMBRE_DEL_REPOSITORIO>
   ```

## 2. Instalar Dependencias

1. Asegúrate de tener [Node.js](https://nodejs.org) instalado en tu sistema.
2. Ejecuta el siguiente comando para instalar los módulos necesarios:
   ```bash
   npm install
   ```

---

## 3. Configurar la Ubicación del Archivo de Entrada

1. Localiza el archivo que deseas procesar.
2. Asegúrate de que el archivo sea compatible con el formato esperado (por ejemplo, un archivo `.csv` con las columnas necesarias como "Fecha de creación", "Tipo de orden", "Criptomoneda", etc.).
3. Edita la ruta del archivo en el script, específicamente en la variable `filePath`. Por defecto, está configurada como:
   ```javascript
   const filePath = "../../Downloads/file-ok2.csv";
   ```
4. Cambia esta línea para que apunte a la ubicación real del archivo en tu sistema. Por ejemplo:
   ```javascript
   const filePath = "C:/Users/Usuario/Documentos/datos.csv";
   ```

---

## 4. Ejecutar el Script

1. En la terminal, ejecuta el siguiente comando para iniciar el proceso:
   ```bash
   node <NOMBRE_DEL_SCRIPT>.js
   ```
   Reemplaza `<NOMBRE_DEL_SCRIPT>` con el nombre del archivo que contiene el código (por ejemplo, `app.js`).
2. Si todo está configurado correctamente, el script generará un archivo Excel con dos hojas:
   - Una hoja llamada **"Ventas"** que contiene los datos filtrados de las órdenes de venta.
   - Una hoja llamada **"Compras"** que contiene los datos filtrados de las órdenes de compra.

---

## 5. Verificar el Archivo Generado

1. El archivo resultante se guardará en la carpeta `Downloads` con un nombre basado en el mes actual. Por ejemplo:
   ```
   file-January.xlsx
   ```
2. Abre el archivo para verificar que los datos estén correctos y bien organizados en las hojas "Compras" y "Ventas".

---

## Notas Adicionales

- Si el script no encuentra el archivo en la ubicación especificada, mostrará un mensaje de error indicando que el archivo no existe.
- Asegúrate de que el archivo de entrada contenga las columnas esperadas para evitar errores durante la ejecución.
- Puedes modificar el nombre del archivo generado o la estructura de las hojas según tus necesidades editando las funciones en el script.

---

¡Listo! Ahora puedes generar tu archivo Excel siguiendo estos pasos.
