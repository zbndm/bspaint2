const PORT = process.env.PORT || 8081;
import app from './app';
// const app = require('./app');

const init = async () => {
  try {
    app.listen(PORT, () => console.log(`Mixing it up on port ${PORT}`));
  } catch (ex) {
    console.log(ex);
  }
};

init();
