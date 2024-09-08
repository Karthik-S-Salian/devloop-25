'use client'
import React, { useEffect, useState } from 'react';
import Spreadsheet, {type Matrix } from 'react-spreadsheet';

type SpreadsheetCell = {
  value: string; 
};

type SpreadsheetData = Matrix<SpreadsheetCell> | null;


export default function Excel() {
  const [data, setData] = useState<SpreadsheetData>(null);

  useEffect(() => {
   
    fetch('/api/get-excel')
      .then((response) => response.text())
      .then((csvData) => {
        const parsedData = parseCSVToSpreadsheetData(csvData);
        setData(parsedData);
      })
      .catch((error) => console.error('Error fetching or parsing CSV:', error));
  }, []);


  const parseCSVToSpreadsheetData = (csv: string): Matrix<SpreadsheetCell> => {

    const rows = csv.split('\n');
    return rows.map((row) =>
      row.split(',').map((cell) => ({
        value: cell.trim(),
      }))
    );
  };

  const getFile = () => {
    fetch('/api/get-excel')
      .then((response) => response.text())
      .then((csvData) => {
       
        const blob = new Blob([csvData], { type: 'text/csv' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'data.csv';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link); 
      })
      .catch((error) => console.error('Error downloading CSV:', error));

    alert('Downloaded file');
  };

  return (
    <div className='text-center flex-col m-6'>
      <h2 className='text-center'>Find slope from excel</h2>

      <button className='bg-blue-500 p-3 rounded-md mt-24' onClick={getFile}>
        Get The File
      </button>

      {data ? (
        <div className='h-[60vh] overflow-y-scroll m-6 '> <Spreadsheet data={data} /></div>
      ) : (
        <h2 className='m-6'>Loading...</h2>
      )}
    </div>
  );
}
