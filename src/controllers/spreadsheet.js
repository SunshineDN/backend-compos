require('dotenv').config(); // VARIÁVEIS DE AMBIENTE: SPREADSHEET_ID
const { google } = require('googleapis');
const ArrToObject = require('../utils/mountObject');

async function getAuthSheets() {
  console.log("Pegando as credenciais do Google Sheets")

  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: `credentials.json`,
      scopes: 'https://www.googleapis.com/auth/spreadsheets'
    });

    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: 'v4', auth: client });

    let spreadsheetId = process.env.SPREADSHEET_ID;

    console.log("Spreadsheet ID coletado com sucesso!")
    return {
      auth,
      client,
      googleSheets,
      spreadsheetId
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
}

module.exports = class SpreadsheetController {
  index(req, res) {
    res.send("Rota de Spreadsheet liberada!");
  }

  async getMetadata(req, res) {
    console.log("Pegando metadados da planilha")
    try {
      const { googleSheets, auth, spreadsheetId } = await getAuthSheets();
      const metadata = await googleSheets.spreadsheets.get({
        auth,
        spreadsheetId,
      })
      console.log("Metadados coletados com sucesso!\n")
      res.send(metadata);

    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  }

  async getStatisticsRows(req, res) {
    console.log("Pegando as linhas da planilha de estatísticas")
    try {
      const { googleSheets, auth, spreadsheetId } = await getAuthSheets();
      const getRows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "Estatísticas",
        valueRenderOption: "UNFORMATTED_VALUE",
        dateTimeRenderOption: "FORMATTED_STRING"
      })
      console.log("Linhas coletadas com sucesso!\n")
      const object = new ArrToObject(getRows.data.values);
      res.status(200).send(object.transformInObject);

    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async getNoticesRows(req, res) {
    console.log("Pegando as linhas da planilha de notícias")
    try {
      const { googleSheets, auth, spreadsheetId } = await getAuthSheets();
      const getRows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "Notícias",
        valueRenderOption: "UNFORMATTED_VALUE",
        dateTimeRenderOption: "FORMATTED_STRING"
      })
      console.log("Linhas coletadas com sucesso!\n")
      const object = new ArrToObject(getRows.data.values);
      res.status(200).send(object.transformInObject);

    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  }
}