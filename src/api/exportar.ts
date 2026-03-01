export const exportarPDF = (): void => {
  window.open(`${import.meta.env.VITE_API_URL}/api/exportar/pdf`, "_blank");
};

export const exportarExcel = (): void => {
  window.open(`${import.meta.env.VITE_API_URL}/api/exportar/excel`, "_blank");
};

export const exportarPDFGlobal = (): void => {
  window.open(`${import.meta.env.VITE_API_URL}/api/exportar/global/pdf`, "_blank");
};

export const exportarExcelGlobal = (): void => {
  window.open(`${import.meta.env.VITE_API_URL}/api/exportar/global/excel`, "_blank");
};
