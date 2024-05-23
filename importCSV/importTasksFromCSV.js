import fs from 'node:fs'
import { parse } from 'csv-parse'

export async function importTasksFromCSV (csvPath) {

  try {
    const csvData = fs.createReadStream(csvPath)
      .pipe(parse({
        from_line: 2,
        trim: true
      }))

    for await (const record of csvData) {

      fetch('http://localhost:3333/tasks', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: record[0],
          description: record[1]
        })
      })
    }
  } catch (error) {
    console.log(error)
    return 'Unable to upload the CSV file.'
  }
  
}