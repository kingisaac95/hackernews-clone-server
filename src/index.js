const express = require('express');
const bodyParser = require('body-parser');

// handle graphql request and response based on schema
const {graphqlExpress, graphiqlExpress} = require('apollo-server-express');

const schema = require('./schema');

let app = express();

app.use('/graphql', bodyParser.json(), graphqlExpress({schema}));

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
}));

const PORT = process.env.PORT || 3200;
app.listen(PORT, () => {
  console.log(`Hackernews Clone Server running on port ${PORT}.`);
});
