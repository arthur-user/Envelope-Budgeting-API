const express = require("express");
const dotenv = require("dotenv");
const logger = require("morgan");
/*. Storing configuration in the environment separate from code is based on The Twelve-Factor 
App methodology.*/

dotenv.config({ path: "./config/config.env" });

const envelopesRouter = require("./routes/envelopes");
const docsRouter = require("./routes/docs");

const app = express();

app.use(logger("dev"));
app.use(express.json());

app.use("/api-documents", docsRouter);

app.use("/api/v1/envelopes", envelopesRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
