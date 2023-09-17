# MyPlanetPlan React Code Standards

This code standards style guide is for **MyPlanetPlan** front-end with React as of 2022, although some conventions may still be included or prohibited on a case-by-case basis. This code standards may change with further development.


## Files Structure

 1. Each **visual** component should be in a single file.

 2. Each component file and its .css file are preferable in a folder

 3. Reusable components or folders should go into src/Shared folder

 4. Non-reusable components (Home, Discover, History, Account, etc) or folder should go directly to Components folder. i.e. src/Components/Home/Home.js

 5. Any files or functions that have no visual component, only doing logic should go src/services folder

 6. Group components by features

 7. Don’t overthink, and avoid too much nesting



## Naming Conventions

 - **Extensions**: Use `.js` extension for React components.

 - **Filename**: 
	 - Use PascalCase for filenames. E.g.,  `BackButton.js` for Component. 
	 - Non-components should be written using camel case: `fetchApi.js`
	 - Unit test files should use the same name as its corresponding file
	 - CSS files should be named the same as the component
	 - Create a  `index.js`  within each folder for exporting if mutiple files exist. This will reduce repeating names on the imports
 
 - **Reference Naming**: Use PascalCase for React components and camelCase for their instances. E.g.,:
   
```		
// bad
import reservationCard from './ReservationCard';

// good
import ReservationCard from './ReservationCard';

// bad
const ReservationItem = <ReservationCard />;

// good
const reservationItem = <ReservationCard />;
```		

 - **Component Naming**: Use the filename as the component name. For example, `Home.js` should have a reference name of `Home`. 

 - **Props Naming**: Avoid using DOM component prop names for different purposes.

> Why? People expect props like `style` and `className` to mean one specific thing. Varying this API for a subset of your app makes the code less readable and less maintainable, and may cause bugs.


```
// bad
<MyComponent style="fancy" />

// bad
<MyComponent className="fancy" />

// good
<MyComponent variant="fancy" /> 
```

## Importing Components 
- **Section 1**: import from React.
- **Section 2**: import from React bootstrap.  
 **Note**: You should import individual components like: `react-bootstrap/Button` rather than the entire library. Doing so pulls in only the specific components that you use, which can significantly reduce the amount of code you end up sending to the client.
- **Section 3**: import 3rd party Component, i.e., Keycloak.
- **Section 4**: import files from other folder. 
- **Section 5**: import css file if it exists.

 - Leave a blank line between each of the sections.
 - Import components by alphabetical order.


Example: 
```
import React, { useContext, useState } from "react";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import Keycloak from "keycloak-js";

import Footer from './Footer.js';
import Gallery from './Gallery.js';
import Zoo from './Zoo.js';

import  "./Home.css"
```

## Comment

- **Header**: In each file, write comment at top of file:
```
/** 
* Path: /src/Components/Home/Home.js
* Author: Peter
* Date Create: 01-01-2002
* Purpose of this component: Displays home page of the web app
*/
```

- **Function**: Write brief logic behind the function
```
//reads item data from api, returns an array of objects of item
```

## Alignment

Follow [Prettier](https://prettier.io/)
See this [guide](https://github.com/FaberAdvies/myplanetplan-app/blob/code-standards/internal-use-documents/prettier-setup-guide.md)

## Quotes

Follow [Prettier](https://prettier.io/)
See this [guide](https://github.com/FaberAdvies/myplanetplan-app/blob/code-standards/internal-use-documents/prettier-setup-guide.md)

## Spacing

Follow [Prettier](https://prettier.io/)
See this [guide](https://github.com/FaberAdvies/myplanetplan-app/blob/code-standards/internal-use-documents/prettier-setup-guide.md)

## Props

 - Always use camelCase for prop names, or PascalCase if the prop value is a React component.
```
<Foo
  userName="hello"
  phoneNumber={12345678}
  Component={SomeComponent}
/>
```
 - Omit the value of the prop when it is explicitly `true`. 
  ```
   // bad
<Foo
  hidden={true}
/>

// good
<Foo hidden />
```
-   Avoid using an array index as  `key`  prop, prefer a stable ID. eslint:  [`react/no-array-index-key`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-array-index-key.md)

> Why? Not using a stable ID [is an anti-pattern](https://medium.com/@robinpokorny/index-as-a-key-is-an-anti-pattern-e0349aece318) because it can negatively impact performance and cause issues with component state.

We don’t recommend using indexes for keys if the order of items may change.

```
// bad
{todos.map((todo, index) =>
  <Todo
    {...todo}
    key={index}
  />
)}

// good
{todos.map(todo => (
  <Todo
    {...todo}
    key={todo.id}
  />
))}
```

- **Optional**: [Typechecking With PropTypes](https://reactjs.org/docs/typechecking-with-proptypes.html)
This is not a "Must" right now, so in `.eslintrc.js` we set: rules: { "react/prop-types": "off" }. By doing so can avoid eslint to check for any propTypes error. 

- Filter out unnecessary props when possible:
```
// bad
render() {
  const { irrelevantProp, ...relevantProps } = this.props;
  return <WrappedComponent {...this.props} />
}

// good
render() {
  const { irrelevantProp, ...relevantProps } = this.props;
  return <WrappedComponent {...relevantProps} />
}
```

## Parentheses

Follow [Prettier](https://prettier.io/)
See this [guide](https://github.com/FaberAdvies/myplanetplan-app/blob/code-standards/internal-use-documents/prettier-setup-guide.md)

## Tags

 - Always self-close tags that have no children.
```
// bad
<Foo variant="stuff"></Foo>

// good
<Foo variant="stuff" />
```
- If your component has multiline properties, close its tag on a new line. (As per [eslint](https://eslint.org/))
```
// bad
<Foo
  bar="bar"
  baz="baz" />

// good
<Foo
  bar="bar"
  baz="baz"
/>
```
## Methods

 - Use arrow functions
 ```
 const ItemList = (props) => {
  return (
    <ul>
      {props.items.map((item, index) => (
        <Item
          key={item.key}
          onClick={(event) => { doSomethingWith(event, item.name, index); }}
        />
      ))}
    </ul>
  );
}
```
 - Do not use underscore prefix for internal methods of a React component.
 

> Why? Underscore prefixes are sometimes used as a convention in other languages to denote privacy. But, unlike those languages, there is no native support for privacy in JavaScript, everything is public. Regardless of your intentions, adding underscore prefixes to your properties does not actually make them private, and any property (underscore-prefixed or not) should be treated as being public.

```
// bad
React.createClass({
  _onClickSubmit() {
    // do stuff
  },

  // other stuff
});

// good
class extends React.Component {
  onClickSubmit() {
    // do stuff
  }

  // other stuff
}
```
