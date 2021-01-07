<div align="center">
  <div>
    <img height="250" src="https://wallpapershome.ru/images/pages/pic_h/15631.jpg">
    <h1>Travel App</h1>
  </div>
  <p>
    This project requires you to build out a travel app that, at a minimum, obtains a desired trip location & date from the user, and displays weather and an image of the location using information obtained from external APIs. Given that this is the Capstone project, it's highly encouraged for you to go above and beyond, adding additional functionality and customization to truly stand out with a project you are proud to have at the top of your portfolio!
  </p>
</div>


## Build Setup:
* Insert your API keys to .env file like this:
``` bash
# (e.g. 1dv444 ...)
Weatherbit_API=****
# (e.g. 12g3g3 ...)
Pixabay_API=****
# (e.g. User123)
GeoNames_username=****
```

``` bash
# Install dependencies:
npm install
```

``` bash
# Testing with JEST
npm run test
```

* For development mode:
``` bash
# Server with hot reload at http://localhost:8080/
# Please note that the script will start an additional server on the 3000th port for the API
npm run dev
```

* For production mode:
``` bash
# Output will be at dist/ folder
npm run build
# Server at http://localhost:[port]/
# Note: if you want to use your costume port, you need to use "--" twice on the command line
# (see: https://docs.npmjs.com/cli/run-script)
npm start [-- --port=3000]
```

## Project Structure:

* `src/client/views` - put all HTMLs here;
* `src/client/views/index.html` - main app HTML;
* `src/client/assets/img` - put images here. Don't forget to use correct path: `assets/img/some.jpg`;
* `src/client/assets/fonts` - Place for fonts. Don't forget to use correct path: `assets/fonts/some.woff`;
* `src/client/styles` - put custom app SCSS styles here. Don't forget to import them in `index.js`;
* `src/client/js` - put custom app scripts here;
* `src/client/js/app.js` - main app file where you implement all application logic;
* `src/client/index.js` - main app file where you include/import all required libs and init app;
* `src/client/static/` - folder with extra static assets that will be copied into output folder;
* `src/server` - server side folder;
* `webpack.config` - folder with configs for Webpack (both dev and prod).

<div align="center">
  <h2>Settings:</h2>
</div>

## Main const:
Easy way to move all files.
Default:
``` js
const PATHS = {
  // Path to main app dir
  src: path.join(__dirname, '../src'),
  // Path to Output dir
  dist: path.join(__dirname, '../dist'),
  // Path to Second Output dir (js/css/fonts etc folder)
  assets: 'assets'
}
```
## Customize:
Change any folders:
``` js
const PATHS = {
  // src must be src
  src: path.join(__dirname, '../src'),
  // dist to public
  dist: path.join(__dirname, '../public'),
  // assets to static
  assets: 'static'
}
```

## Import Another libs:
1. Install libs
2. Import libs in `./index.js`
``` js
// React example
import React from 'react'
// Bootstrap example
import Bootstrap from 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'
```

## Import js files:
1. Create another js module in `./js/` folder
2. Import modules in `./js/app.js` file
