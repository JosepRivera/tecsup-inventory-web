export const exportarPDF = (): void => {
  window.open(`${import.meta.env.VITE_API_URL}/api/exportar/pdf`, "_blank");
};

export const exportarExcel = (): void => {
  window.open(`${import.meta.env.VITE_API_URL}/api/exportar/excel`, "_blank");
};
