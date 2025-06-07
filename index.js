const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 10000;

app.use(bodyParser.json());

const boatData = {
  snekke: {
    no: {
      short: "Snekka er en liten motorbåt med dekk, ofte brukt til kystfiske.",
      long: "Snekker er tradisjonelle motorbåter med opprinnelse på Sørlandet. De ble brukt både som fiskebåter og fritidsbåter, og kjennetegnes av sitt lave fartspotensial og gode sjøegenskaper."
    },
    en: {
      short: "The 'snekke' is a small motorboat used for coastal fishing.",
      long: "The 'snekke' is a traditional Norwegian motorboat, historically used for fishing and leisure. It features a covered deck and stable hull suited for rough coastal waters."
    }
  }
};

app.post('/webhook', (req, res) => {
  console.log('== Webhook called ==');
  console.log(JSON.stringify(req.body, null, 2));

  const query = req.body.queryResult;
  const lang = query.languageCode || 'no';
  const boatType = query.parameters.boat_type;

  if (!boatType || !boatData[boatType]) {
    return res.json({
      fulfillmentText: lang === 'en'
        ? "Sorry, I don't have information about that boat."
        : "Beklager, jeg har ikke informasjon om den båten.",
    });
  }

  const response = boatData[boatType][lang] || boatData[boatType]['no'];

  res.json({
    fulfillmentMessages: [
      {
        text: {
          text: [response.short]
        }
      },
      {
        payload: {
          richText: response.long
        }
      }
    ]
  });
});

app.listen(PORT, () => {
  console.log(`Luckybot webhook listening on port ${PORT}`);
});