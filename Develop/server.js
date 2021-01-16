const express = require("express");
const apiRoutes = require("./routes/api");
const htmlRoutes = require("./routes/html");


const app = express();
const PORT = process.env.PORT || 4000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/api", apiRoutes);
app.use("/", htmlRoutes);

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
