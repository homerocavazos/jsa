# JSA 2.0 | JavaScript Accordion Utility

Accessible, responsive, and customizable JavaScript accordion component with vanilla JS and SCSS support. Automatically generates FAQ schema using JSON-LD for enhanced SEO.

### Demo

[jsa.homiehomes.dev](https://jsa.homiehomes.dev/)

### NPM

```
npm i @homiehomes/jsa
```

### Usage

The accordion's markup is based on definition list. The goal is to keep the markup simple to maintain. The application will fill in the necessary attributes.

A trigger element (usually an anchor, button or H1-H6) is required inside the `<dt>` element. The content to be revealed should be wrapped inside the `<dd>` element.

#### HTML markup

```
<dl class="jsa">

  <dt><a href="#">Title One</a></dt>
  <dd>Lorem ipsum dolor sit amet consectetur adipisicing elit. </dd>

  <dt><a href="#">Title Two</a></dt>
  <dd>Lorem ipsum dolor sit amet consectetur adipisicing elit. </dd>

  <dt><a href="#">Title Three</a></dt>
  <dd>Lorem ipsum dolor sit amet consectetur adipisicing elit. </dd>

</dl>
```

#### JavaScript

To instantiate the accordion, you need to include the JavaScript file and create a new instance of the accordion class.

The `<dl>` element should have the class `.jsa` applied to it.


```

import { jsa } from '@homiehomes/jsa';

new jsa();

```

#### Custom trigger
You may prefer using `<dt><h2>Title One</h2></dt>`, then you will have to assign the trigger element in the instance.

```

new jsa({
  dt: 'dt h2'
});

```

#### Additional accordions
For multiple instances of the accordion on the same page, you need to declare a unique selector to the instance. For example,  `#jsa-menu,` `.jsa-accordion2` class on each `<dl>` element.


> **CAUTION:** Nested accordions is not supported.


**Nested accordions is not supported**
```

new jsa(
 {
  dl: '.jsa-menu',
 }
);

```
### Options

JSA by default has no styles but inline styles for expand/collapse functionality. This is ideal if you want to apply your own custom styles from scratch. The collapse functionality is handled within the instance.

The `<a>` tag is recommended because it is semantically appropriate for links that open and close content and is widely recognized by users and assistive technologies.


All options are optional. The defaults are shown below.

```
new jsa(
  {
   dl: ".jsa",
   dt: "dt a",
   dd: "dd",
   theme: '', 
   openFirst: false,
   openAll: false,
   closeAll: null, 
   closeOthers: false,
   animate: false,
   prefix: "" 
   icons: ['', ''], 
   iconClass: 'jsa-icon', 
   termPadding: '0.5em 1em 0.5em 0', 
   schema: false,
   schemaType: 'FAQPage',
   termBg: 'transparent' : '',
   termBgActive: 'black',
   termColor: '#719456',
   termColorActive: '#fff',
   borders: true,
   borderColor: '#719456',
   darkmode: false,
   debug: false,
  }
);
```


#### Visit the [demo site](https://jsa.homiehomes.dev/) for more examples and details.