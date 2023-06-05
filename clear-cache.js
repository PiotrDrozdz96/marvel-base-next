const fs = require('fs');

fs.rm(`.next/cache/fetch-cache`, { recursive: true, force: true }, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Cache cleared');
  }
});
