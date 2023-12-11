var express = require('express');
var router = express.Router();
const fs = require("fs")
PDFParser = require("pdf2json");
const pdfparse = require("pdf-parse");
const pdfFile = fs.readFileSync('file.pdf');
const DIR = './public/images/file.pdf';
/* GET home page. */
let arr = ["Most Recent\nRevision:", "Order Specific Question", "Primary Qualifying Service", "Supplement Oxygegen Required?", "Secondary Services Requested", "CHF", "Most Recent Revision", "Order Information", "Order Specific Question", "Primary Quality Service", "Supplemental Oxygen Required?", "Secondary Services Requested", "Transition Support Level (IP Only):", "Does Patient Have CHF?", "Most Recent Revision:", "Order Question", "Primary Qualifying Service", "Supplemental Oxygen Required", "Premium Qualifying Service", "Secondary Services Requested"]
let hed = ["1/23/2021", "Skilled Nursing", "Labs", "CBC,Chem 7 on Tuesday", "02)", "YES-Nasal Cannula", "PUI or COVID Positive", "1/23/2021", "Skill Nursing", "Labs", "Chem 7 5-7 days post", "NO", "Physical Theraphy", "Occ Therapy", "Med Social Worker", "1/23/2021", "Physical Therapy", "NO", "1/23/2021", "Physical Therapy", "Occ Therapy", "Med Social Worker"]
router.get('/', async (req, res, next) => {
  let pdfParser = new PDFParser();
  pdfparse(pdfFile).then(async (data) => {
    const Text = data.text
    const column = []
    const rows = []
    const doing = await arr.map((v, i) => {
      let included = Text.includes(v)
      if (included) {
        column.push(v)
      }
    })
    const beta = await hed.map((v, i) => {
      let datainclude = Text.includes(v)
      if (datainclude) {
        rows.push(v)
      }
    })
    res.send({ columns: column, rows: rows })
  })
});

module.exports = router;
