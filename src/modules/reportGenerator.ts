//reportGenerator.ts

class ReportGenerator {
  generateCustomReport(data: any[], reportType: string): string {
    switch (reportType) {
      case 'summary':
        return this.generateSummaryReport(data);
      case 'detailed':
        return this.generateDetailedReport(data);
      default:
        throw new Error('Invalid report type');
    }
  }

  private generateSummaryReport(data: any[]): string {
    // Implement logic to generate a summary report based on the data
    // Example: Convert data into a summarized format

    const summary = data.map((item) => ({
      name: item.name,
      totalQuantity: item.quantity,
    }));

    // Return the summary report as a string (you can use a library like 'csv-parser' for CSV)
    return JSON.stringify(summary, null, 2);
  }

  private generateDetailedReport(data: any[]): string {
    // Implement logic to generate a detailed report based on the data
    // Example: Include all available details

    // Return the detailed report as a string (you can use a library like 'csv-parser' for CSV)
    return JSON.stringify(data, null, 2);
  }
}

// Example usage:
const reportGenerator = new ReportGenerator();
const sampleData = [
  { name: 'Item 1', quantity: 10, category: 'Category A' },
  { name: 'Item 2', quantity: 20, category: 'Category B' },
  // Add more data entries
];

const summaryReport = reportGenerator.generateCustomReport(sampleData, 'summary');
const detailedReport = reportGenerator.generateCustomReport(sampleData, 'detailed');

console.log('Summary Report:');
console.log(summaryReport);

console.log('\nDetailed Report:');
console.log(detailedReport);