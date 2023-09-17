# MyPlanetPlan React ESLint Setup Guide

 1. In terminal, cd to root of the project
 2. install eslint: (NOTE: we use `--save-dev` because ESLint will be a **Development Dependency**, not needed in production)
 ```
npm install --save-dev eslint
 ```
 
 ```
 npx eslint --init
 ```
```
Ok to proceed? (y) y
✔ How would you like to use ESLint? · problems
✔ What type of modules does your project use? · esm ( JavaScript modules (import/export))
✔ Which framework does your project use? · react
✔ Does your project use TypeScript? · No (No for now, sorry for those who wanted)
✔ Where does your code run? · browser, node (press a to select all)
✔ What format do you want your config file to be in? · JavaScript
The config that you've selected requires the following dependencies:

eslint-plugin-react@latest
✔ Would you like to install them now? · Yes
✔ Which package manager do you want to use? · npm
Installing eslint-plugin-react@latest
```

 3. You will see a file `.eslintrc` in your root directory, it should look like this: (correct it if not)
 ```
module.exports = {
		env: {
			browser: true,
			es2021: true,
			node: true,
	},
	extends: ["eslint:recommended", "plugin:react/recommended"],
	parserOptions: {
			ecmaFeatures: {
				jsx: true,
			},
		ecmaVersion: "latest",
		sourceType: "module",
	},
	plugins: ["react"],
	rules: {"react/prop-types": "off"},
};
```
Note: n rules field: we are turning off prop-types for now. See [Typechecking With PropTypes](https://reactjs.org/docs/typechecking-with-proptypes.html)
We will turn it back on if needed.

[More about configuring ESLint](https://eslint.org/docs/latest/user-guide/configuring/)

4. Install [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) VSCode Extension.

5. Add a `lint` script to your `package.json` file to run ESLint from the command line
```
"scripts": {
  ...
  "lint": "eslint --config .eslintrc.js src/**"
},
```
6. Run your ESLint: 
```
npm run lint
```
7. Fix any errors :(
