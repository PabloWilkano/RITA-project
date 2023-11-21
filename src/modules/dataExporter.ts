// dataExporter.ts

import { createObjectCsvWriter } from 'csv-writer';
import * as ExcelJS from 'exceljs';
import { Readable } from 'stream';

export class DataExporter {
  constructor() {
    // Constructor logic if needed
  }

  /**
   * Export data to CSV format.
   * @param data - Array of objects representing the data to export.
   * @param filename - Name of the CSV file.
   */
  async exportToCSV(data: any[], filename: string): Promise<Readable> {
    // Create a CSV stream writer
    const csvWriter = createObjectCsvWriter({
      path: filename,
      header: Object.keys(data[0]).map((key) => ({ id: key, title: key })),
    });

    // Write data to the CSV file
    await csvWriter.writeRecords(data);

    // Create a Readable stream from the saved file
    const readableStream = new Readable();
    readableStream.push(null); // End the stream

    return readableStream;
  }

  /**
   * Export data to xlsx (Excel) format.
   * @param data - Array of objects representing the data to export.
   * @param filename - Name of the xlsx file.
   */
  async exportToXLSX(data: any[], filename: string): Promise<Readable> {
    // Create a workbook and worksheet
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Data');

    // Add data to the worksheet
    worksheet.columns = Object.keys(data[0]).map((key) => ({
      header: key,
      key: key,
    }));
    worksheet.addRows(data);

    // Save the workbook to a buffer
    const buffer = await workbook.xlsx.writeBuffer();

    // Create a Readable stream from the buffer
    const readableStream = new Readable();
    readableStream.push(buffer);
    readableStream.push(null); // End the stream

    return readableStream;
  }
}