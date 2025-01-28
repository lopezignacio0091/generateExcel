const XLSX = require("xlsx");
const fs = require("fs");
const moment = require("moment");
const path = require("path");
const config = require("./mapper");
// Función para leer un archivo Excel

const readExcel = (filePath) => {
  try {
    // Verificar si el archivo existe
    if (!fs.existsSync(filePath)) {
      console.error("El archivo especificado no existe.");
      return;
    }

    // Leer el archivo Excel
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
    // Retorna el valor ordenado
    return data;
  } catch (error) {
    console.error("Ocurrió un error al leer el archivo Excel:", error.message);
  }
};

const generateData = (data, config) =>
  data
    .sort(
      (a, b) =>
        new Date(a[config.columns[0].name]) -
        new Date(b[config.columns[0].name])
    )
    .map((row) => {
      const transformedRow = {};
      config.columns.forEach((column) => {
        transformedRow[column.name] = column.transform(row);
      });
      return transformedRow;
    });

const generateFile = ({
  sellDataOkx,
  buyDataOkx,
  dataBinance,
}) => {
  // Crear un nuevo libro de trabajo
  const workbook = XLSX.utils.book_new();

  // Crear hojas para ventas y compras
  const sellSheetOkx = XLSX.utils.json_to_sheet(sellDataOkx);
  XLSX.utils.book_append_sheet(workbook, sellSheetOkx, "Ventas OKX");

  const buySheetOkx = XLSX.utils.json_to_sheet(buyDataOkx);
  XLSX.utils.book_append_sheet(workbook, buySheetOkx, "Compras OKX");

  const sellSheet = XLSX.utils.json_to_sheet(dataBinance);
  XLSX.utils.book_append_sheet(workbook, sellSheet, "Binance");

  // Guardar el archivo Excel
  const outputPath = path.resolve(
    __dirname,
    `../../Downloads/file-${moment().format("MMMM")}.xlsx`
  );
  XLSX.writeFile(workbook, outputPath);
  console.log(`Archivo generado correctamente en: ${outputPath}`);
};

// Ruta del archivo Excel (cambiar por la ubicación del archivo a leer)
const filePathOkx = "../../Downloads/Okx.csv";
const filePathBinance = "../../Downloads/Binance.xlsx";

// // Leer el archivo Excel
const dataExcelOxk = readExcel(filePathOkx);
const dataExcelBinance = readExcel(filePathBinance);

const sellDataOkx = generateData(
  dataExcelOxk.filter((row) => row["Tipo de orden"] === "Vender"),
  config.OKX
);
const buyDataOkx = generateData(
  dataExcelOxk.filter((row) => row["Tipo de orden"] === "Comprar"),
  config.OKX
);
const dataBinance = generateData(dataExcelBinance, config.Binance);


generateFile({ sellDataOkx, buyDataOkx,dataBinance });
