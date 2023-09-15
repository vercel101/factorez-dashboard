import FileSaver from "file-saver";
import XLSX from "sheetjs-style";
export const exportToExcel = (array) => {
    let fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    const fileExtension = ".xlsx";
    // const exportToExcel = async () => {
    const ws = XLSX.utils.json_to_sheet(array);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, "helloExcel" + fileExtension);
};

