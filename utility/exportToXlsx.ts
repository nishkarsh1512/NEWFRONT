const XLSX = require("xlsx")
import FileSaver from "file-saver"

const exportToXLSX = ({
  jsonData,
  fileName,
}: {
  jsonData: any[]
  fileName: string
}): void => {
  console.log({ XLSX })
  const ws = XLSX.utils.book_new()

  const header = Object.keys(jsonData[0])

  console.log({ header })

  XLSX.utils.sheet_add_aoa(ws, [["Name", "Age"]])
  XLSX.utils.sheet_add_json(ws, jsonData, { origin: "A2", skipHeader: true })

  const wb = { Sheets: { data: ws }, SheetNames: [fileName] }

  const excelBuffer = XLSX.write(wb, {
    bookType: "xlsx",
    type: "array",
    cellStyles: true,
  })

  const finalData = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  })

  FileSaver.saveAs(finalData, "Data.xlsx")
}

export default exportToXLSX
