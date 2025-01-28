const moment = require("moment");
const FORMAT_VALUE = "DD/MM/YYYY";
const convertDate = (dateString) =>
  moment(dateString, "YYYY-MM-DD HH:mm:ss").toDate();

const convertDateOxk = (timestamp) => {
  const baseDate = new Date(1900, 0, 1); // 1 de enero de 1900 // Días desde la base
  const resultDate = new Date(
    baseDate.getTime() + timestamp * 24 * 60 * 60 * 1000
  );
  return moment(resultDate).format(FORMAT_VALUE);
};
const isExcelDate = (value) => {
  if (typeof value === "number" && value > 0) {
    // Rango típico de fechas seriales
    const minDate = new Date(1900, 0, 1); // 1 de enero de 1900
    const maxDate = new Date(2100, 0, 1); // Opcional: límite superior razonable

    // Convertir el valor para ver si está dentro del rango de fechas
    const convertedDate = new Date(
      minDate.getTime() + (value - 1) * 24 * 60 * 60 * 1000
    );
    return convertedDate >= minDate && convertedDate <= maxDate;
  }
  return false;
};

const config = {
  Binance: {
    columns: [
      {
        name: "Fecha (UTC+0)",
        transform: (data) => convertDate(data["Fecha (UTC+0)"]),
      },
      {
        name: "Criptomoneda",
        transform: (data) => data["Moneda"] || "",
      },
      {
        name: "Monto",
        transform: (data) => `$${data["Monto"]}` || "",
      },
      {
        name: "Red",
        transform: (data) => data["Red"] || "",
      },
    ],
  },
  OKX: {
    columns: [
      {
        name: "Fecha de creación",
        transform: (data) =>
          isExcelDate(data["Fecha de creación"])
            ? convertDateOxk(data["Fecha de creación"])
            : moment(data["Fecha de creación"]).format(FORMAT_VALUE),
      },
      {
        name: "Criptomoneda",
        transform: (data) => data["Criptomoneda"] || "",
      },
      {
        name: "Volumen",
        transform: (data) => data["Volumen"] || "",
      },
      {
        name: "Monto",
        transform: (data) => `$${data["Monto"]}` || "",
      },
      {
        name: "Precio",
        transform: (data) => `$${data["Precio"]}` || "",
      },
      {
        name: "Método de pago",
        transform: (data) => data["Método de pago"] || "",
      },
    ],
  },
};

module.exports = config;
