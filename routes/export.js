const ExcelJS = require("exceljs");
var express = require("express");
var router = express.Router();

/**
 * @openapi
 * /api/users:
 *   get:
 *     description: Get Data All Users
 *     responses:
 *       200:
 *         description: Returns a row data users.
 */
 router.get('/export', (req, res) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sheet1');
  
    // Add headers to the worksheet
    worksheet.addRow(['Name', 'Age', 'Country']);
  
    // Add some sample data to the worksheet
    worksheet.addRow(['John Doe', 30, 'USA']);
    worksheet.addRow(['Jane Doe', 25, 'Canada']);
  
    // Set the content type and attachment header
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=export.xlsx');
  
    // Write the workbook to the response
    workbook.xlsx.write(res)
      .then(() => {
        res.end();
      })
      .catch((err) => {
        console.log(err);
      });
  });
  
  module.exports = router;
