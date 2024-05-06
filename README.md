# poster.js: Submit a form cross domain

*DEPRICATION WARNING: the functionality in this script has been superceeded / trivialised by updated web standards.*

Submit a form asynchronously and cross domain.

## How to include the script

The stylesheet is best included in the header of the document.

```html
<link rel="stylesheet" href="css/poster.css"/>
```

This include can be added to the header or placed inline before the script is invoked.

```html
<script src="js/poster.js"></script>
```

Or use [Require.js](https://requirejs.org/).

```js
requirejs([
	'js/poster.js'
], function(FormPoster) {
	...
});
```

Or use imported as a component in existing projects.

```js
@import {poster} from "js/Poster.js";
```

## How to start the script

```javascript
var poster = new Poster({
	'form' : document.getElementById('poster-form'),
	'response' : document.getElementById('poster-response')
});
```

**form : {DOM node}** - The form to attach the script to.

**response : {DOM node}** - Where to put the response.

## License

This work is licensed under a [MIT License](https://opensource.org/licenses/MIT). The latest version of this and other scripts by the same author can be found on [Github](https://github.com/WoollyMittens).
