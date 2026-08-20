// frontend/src/utils/csvExport.js

export function exportToCsv(filename, dataArray) {
  if (!dataArray || !dataArray.length) {
    console.warn("No data available to export.");
    return;
  }

  // Extract headers dynamically from the first object's keys
  const headers = Object.keys(dataArray[0]);
  
  // Map data to CSV rows
  const csvRows = [
    headers.join(','), // Header row
    ...dataArray.map(row => 
      headers.map(fieldName => {
        let cellData = row[fieldName] === null || row[fieldName] === undefined ? '' : row[fieldName];
        // Escape quotes and wrap in quotes if there's a comma
        cellData = String(cellData).replace(/"/g, '""');
        if (cellData.search(/("|,|\n)/g) >= 0) {
          cellData = `"${cellData}"`;
        }
        return cellData;
      }).join(',')
    )
  ];

  const csvString = csvRows.join('\n');
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
  
  // Create a hidden link and trigger download
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}