import * as XLSX from 'xlsx'
import { exportToExcelWithStyling, exportWithNoSeLocalizo } from '../utils/excelExport'
import type { IFormInput } from '../hooks/useFormEnterprises'

export class ExportService {
  private static formatStatus(status: string): string {
    switch (status) {
      case "waiting":
        return "Esperando información"
      case "completed":
        return "Completada"
      case "uncompleted":
        return "No se completó"
      default:
        return status
    }
  }

  private static exportToXLS(data: any[], filename: string, sheetName: string, headerColor?: string): void {
    const ws = XLSX.utils.json_to_sheet(data)

    // Add styling to headers
    if (data.length > 0) {
      const headerRow = Object.keys(data[0]).length
      for (let col = 0; col < headerRow; col++) {
        const cellAddress = XLSX.utils.encode_cell({ r: 0, c: col })
        if (!ws[cellAddress]) continue

        ws[cellAddress].s = {
          fill: { fgColor: { rgb: headerColor || "4F46E5" } }, // Blue background
          font: { color: { rgb: "FFFFFF" }, bold: true, sz: 12 }, // White text, bold
          alignment: { horizontal: "center", vertical: "center" },
          border: {
            top: { style: "thin", color: { rgb: "000000" } },
            bottom: { style: "thin", color: { rgb: "000000" } },
            left: { style: "thin", color: { rgb: "000000" } },
            right: { style: "thin", color: { rgb: "000000" } }
          }
        }
      }

      // Style data rows
      for (let row = 1; row < data.length + 1; row++) {
        for (let col = 0; col < headerRow; col++) {
          const cellAddress = XLSX.utils.encode_cell({ r: row, c: col })
          if (!ws[cellAddress]) continue

          ws[cellAddress].s = {
            border: {
              top: { style: "thin", color: { rgb: "E5E7EB" } },
              bottom: { style: "thin", color: { rgb: "E5E7EB" } },
              left: { style: "thin", color: { rgb: "E5E7EB" } },
              right: { style: "thin", color: { rgb: "E5E7EB" } }
            },
            alignment: { horizontal: "left", vertical: "center" },
            fill: { fgColor: { rgb: row % 2 === 0 ? "F9FAFB" : "FFFFFF" } } // Alternating row colors
          }
        }
      }

      // Set column widths
      const colWidths = Object.keys(data[0]).map(key => ({
        wch: Math.max(key.length, ...data.map(row => String(row[key] || '').length)) + 2
      }))
      ws['!cols'] = colWidths
    }

    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, sheetName)
    XLSX.writeFile(wb, `${filename}.xlsx`)
  }

  static exportSheet1(enterprises: IFormInput[]): void {
    // Use new ExcelJS export with dynamic colors
    exportToExcelWithStyling(enterprises, {
      filename: 'Todas_las_Empresas.xlsx'
    })
  }

  static exportSheet2(): void {
    // For now, export team structure - later we'll add actual assignments
    const teamMembers = [
      'Mariano A. García',
      'Sebastian Mansilla',
      'Ludmila Seisdedos',
      'Solange Maidana',
      'Lautaro Pintos',
      'Juan Cruz Galvaliz',
      'Lautaro Lopez',
      'Melina Soto'
    ]
    const data = teamMembers.map(member => ({
      'Miembro del Equipo': member,
      'Empresas Asignadas': 'Pendiente implementación'
    }))
    this.exportToXLS(data, 'Reporte_Semanal', 'Reporte Semanal')
  }

  static exportSheet3(enterprises: IFormInput[]): void {
    // Filter uncompleted enterprises and export with RED highlighting
    const pendingData = enterprises.filter(empresa => empresa.status === 'uncompleted')

    if (pendingData.length === 0) {
      alert('¡Excelente! No hay empresas pendientes para exportar.')
      return
    }

    // Use special export that highlights "No se localizó" in bright red
    exportWithNoSeLocalizo(pendingData)
  }

  static exportSheet4(enterprises: IFormInput[]): void {
    const completedData = enterprises
      .filter(empresa => empresa.status === 'completed')
      .map(empresa => ({
        'Nombre Empresa': empresa.name,
        'CUIT': empresa.cuit,
        'N° Empresa': empresa.id,
        'Correo': '-', // Por ahora vacío
        'Teléfono': '-', // Por ahora vacío
        'Actividad': empresa.city
      }))
    this.exportToXLS(completedData, 'Cuenta_Corriente', 'Cuenta Corriente')
  }

  // Special export with bright red highlighting for "No se localizó"
  static exportNoSeLocalizo(enterprises: IFormInput[]): void {
    exportWithNoSeLocalizo(enterprises)
  }

  static exportAll(enterprises: IFormInput[]): void {
    const wb = XLSX.utils.book_new()

    // Sheet 1 - All enterprises
    const sheet1Data = enterprises.map(empresa => ({
      'Nombre Empresa': empresa.name,
      'CUIT': empresa.cuit,
      'N° Empresa': empresa.id,
      'Recibido': empresa.date,
      'Enviado': '-',
      'Observaciones': this.formatStatus(empresa.status)
    }))
    const ws1 = XLSX.utils.json_to_sheet(sheet1Data)
    XLSX.utils.book_append_sheet(wb, ws1, 'Todas las Empresas')

    // Sheet 2 - Team Report
    const teamMembers = [
      'Mariano A. García', 'Sebastian Mansilla', 'Ludmila Seisdedos',
      'Solange Maidana', 'Lautaro Pintos', 'Juan Cruz Galvaliz',
      'Lautaro Lopez', 'Melina Soto'
    ]
    const sheet2Data = teamMembers.map(member => ({
      'Miembro del Equipo': member,
      'Empresas Asignadas': 'Pendiente implementación'
    }))
    const ws2 = XLSX.utils.json_to_sheet(sheet2Data)
    XLSX.utils.book_append_sheet(wb, ws2, 'Reporte Semanal')

    // Sheet 3 - Uncompleted
    const sheet3Data = enterprises
      .filter(empresa => empresa.status === 'uncompleted')
      .map(empresa => ({
        'Nombre Empresa': empresa.name,
        'CUIT': empresa.cuit,
        'N° Empresa': empresa.id,
        'Recibido': empresa.date,
        'Observaciones': this.formatStatus(empresa.status)
      }))
    const ws3 = XLSX.utils.json_to_sheet(sheet3Data)
    XLSX.utils.book_append_sheet(wb, ws3, 'No Completadas')

    // Sheet 4 - Completed
    const sheet4Data = enterprises
      .filter(empresa => empresa.status === 'completed')
      .map(empresa => ({
        'Nombre Empresa': empresa.name,
        'CUIT': empresa.cuit,
        'N° Empresa': empresa.id,
        'Correo': '-',
        'Teléfono': '-',
        'Actividad': empresa.city
      }))
    const ws4 = XLSX.utils.json_to_sheet(sheet4Data)
    XLSX.utils.book_append_sheet(wb, ws4, 'Cuenta Corriente')

    const today = new Date().toLocaleDateString('es-AR').replace(/\//g, '-')
    XLSX.writeFile(wb, `Tablas_Compartido_${today}.xlsx`)
  }
}