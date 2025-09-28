import * as ExcelJS from 'exceljs'
import { saveAs } from 'file-saver'
import { type IFormInput } from '../hooks/useFormEnterprises'

export interface ExportOptions {
  filename?: string
  colorRules?: {
    condition: (row: IFormInput) => boolean
    backgroundColor: string
    fontColor?: string
  }[]
}

export const exportToExcelWithStyling = async (
  data: IFormInput[],
  options: ExportOptions = {}
) => {
  const workbook = new ExcelJS.Workbook()
  const worksheet = workbook.addWorksheet('Inspecciones')

  // Define headers
  const headers = [
    'Nombre',
    'CUIT',
    'ID Empresa',
    'Fecha Inspección',
    'Fecha Fecha de Finalización',
    'Estado',
    'Observaciones'
  ]

  // Add headers with styling
  const headerRow = worksheet.addRow(headers)
  headerRow.eachCell((cell) => {
    cell.font = { size: 14, bold: true, color: { argb: 'FFFFFF' } }
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '366092' } // Blue header
    }
    cell.alignment = { horizontal: 'center', vertical: 'middle' }
    cell.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    }
  })

  // Add data rows with conditional formatting
  data.forEach((item) => {
    const statusText = getStatusText(item.status)
    const rowData = [
      item.name,
      item.cuit.toString(),
      item.id,
      item.date,
      item.date,
      statusText,
      item.observations || ''
    ]

    const dataRow = worksheet.addRow(rowData)

    // Apply conditional styling with complex rules
    const defaultRules = [
      {
        // Red background: ONLY if uncompleted status AND has parentheses
        condition: (row: IFormInput) => {
          if (row.status !== 'uncompleted') return false

          const hasParentheses =
            (row.observations && row.observations.includes('(') && row.observations.includes(')')) ||
            (row.name && row.name.includes('(') && row.name.includes(')')) ||
            (row.activity && row.activity.includes('(') && row.activity.includes(')'))
          return hasParentheses
        },
        backgroundColor: 'FFCCCB', // Soft red (not too bright)
        fontColor: '8B0000', // Dark red text
        fontSize: 14,
      },
      {
        // Yellow background: if observations contains 'Central' (regardless of status)
        condition: (row: IFormInput) => {
          const hasCentral = row.observations && row.observations.toLowerCase().includes('central')
          return hasCentral
        },
        backgroundColor: 'FFEB9C', // Soft yellow (not too bright)
        fontColor: '8B4513', // Brown text for good contrast
        fontSize: 14,
      },
      {
        // Green background: completed status (but not if Central override applies)
        condition: (row: IFormInput) => {
          const hasCentral = row.observations && row.observations.toLowerCase().includes('central')
          return row.status === 'completed' && !hasCentral
        },
        backgroundColor: 'E8F5E8', // Light green
        fontColor: '2E7D32', // Dark green
        fontSize: 14,
      },
      {
        // White background: "Esperando información" status
        condition: (row: IFormInput) => row.status === 'waiting',
        backgroundColor: 'FFFFFF', // White
        fontSize: 14,
        fontColor: '333333' // Dark gray text
      }
    ]

    const colorRules = options.colorRules || defaultRules

    // Check each color rule
    const matchingRule = colorRules.find(rule => rule.condition(item))

    if (matchingRule) {
      dataRow.eachCell((cell) => {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: matchingRule.backgroundColor }
        }
        if (matchingRule.fontColor) {
          cell.font = { color: { argb: matchingRule.fontColor } }
        }
      })
    }

    // Add borders to all cells
    dataRow.eachCell((cell) => {
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' }
      }
      cell.alignment = { vertical: 'middle' }
    })
  })

  // Auto-fit columns
  worksheet.columns.forEach((column) => {
    if (column.eachCell) {
      let maxLength = 10
      column.eachCell({ includeEmpty: false }, (cell) => {
        const columnLength = cell.value ? cell.value.toString().length : 10
        maxLength = Math.max(maxLength, columnLength)
      })
      column.width = Math.min(maxLength + 2, 30) // Max width of 30
    }
  })

  // Generate buffer and save
  const buffer = await workbook.xlsx.writeBuffer()
  const blob = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  })

  const filename = options.filename || `inspecciones_${new Date().toISOString().split('T')[0]}.xlsx`
  saveAs(blob, filename)
}

// Helper function to convert status to readable text
const getStatusText = (status: string): string => {
  switch (status) {
    case 'waiting':
      return 'Esperando información'
    case 'completed':
      return 'Completada'
    case 'uncompleted':
      return 'No se localizó'
    default:
      return status
  }
}

// Specific export with sophisticated color rules
export const exportWithParenthesesHighlight = async (data: IFormInput[]) => {
  const customRules = [
    {
      // Red background: ONLY if uncompleted status AND has parentheses
      condition: (row: IFormInput) => {
        if (row.status !== 'uncompleted') return false

        const hasParentheses =
          (row.observations && row.observations.includes('(') && row.observations.includes(')')) ||
          (row.name && row.name.includes('(') && row.name.includes(')')) ||
          (row.activity && row.activity.includes('(') && row.activity.includes(')'))
        return hasParentheses
      },
      backgroundColor: 'FFCCCB', // Soft red
      fontColor: '8B0000' // Dark red text
    },
    {
      // Yellow background: if observations contains 'Central'
      condition: (row: IFormInput) => {
        const hasCentral = row.observations && row.observations.toLowerCase().includes('central')
        return hasCentral
      },
      backgroundColor: 'FFEB9C', // Soft yellow
      fontColor: '8B4513' // Brown text
    },
    {
      // Green background: completed status (but not if Central applies)
      condition: (row: IFormInput) => {
        const hasCentral = row.observations && row.observations.toLowerCase().includes('central')
        return row.status === 'completed' && !hasCentral
      },
      backgroundColor: 'E8F5E8', // Light green
      fontColor: '2E7D32' // Dark green text
    },
    {
      // White background: waiting status
      condition: (row: IFormInput) => row.status === 'waiting',
      backgroundColor: 'FFFFFF', // White
      fontColor: '333333' // Dark gray text
    }
  ]

  await exportToExcelWithStyling(data, {
    filename: 'inspecciones_destacadas.xlsx',

  })
}

// Keep the old function for backwards compatibility, but use parentheses logic
export const exportWithNoSeLocalizo = exportWithParenthesesHighlight