### Luckybot Webhook for Render Deployment

1. Gå til https://dashboard.render.com
2. Klikk "New +", velg "Web Service"
3. Koble til GitHub, eller last opp ZIP direkte
4. Velg:
   - Environment: `Node`
   - Build command: `npm install`
   - Start command: `npm start`
5. Render gir deg en URL (f.eks. https://luckybot-webhook.onrender.com/webhook)
6. Lim inn denne i Dialogflow Fulfillment som webhook-URL