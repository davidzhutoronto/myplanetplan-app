# MyPlanetPlan React Prettier Setup Guide
Install and configure  [Prettier](https://prettier.io/)  to automatically format our source code when we save files. Begin by installing Prettier as a  **Development Dependency**  (NOTE: prettier needs to be installed with an exact version vs. using an approximate  `~`  or  `^`  version):
 
 1. In terminal, cd to root of the project
 2. install Prettier: (NOTE: we use `--save-dev` because ESLint will be a **Development Dependency**, not needed in production)
 ```
npm install --save-dev --save-exact prettier
 ```
3. Create a .prettierrc file in root folder, and copy the code below: 
```
{
  "arrowParens": "always",
  "bracketSpacing": true,
  "embeddedLanguageFormatting": "auto",
  "endOfLine": "lf",
  "insertPragma": false,
  "proseWrap": "preserve",
  "requirePragma": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "useTabs": false,
  "printWidth": 100
}
```
4. Create a `.prettierignore` file in root folder, which tells Prettier which files and folders to ignore. In our case, we don't want to format code in `node_modules/` or alter the `package.json` or `package-lock.json` files:
```
node_modules/
package.json
package-lock.json
```
5. Install the [Prettier - Code Formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) VSCode Extension.
6. Create a folder  `.vscode/`  in the root of your project, and add a  `settings.json`  file to it. These settings will override how VSCode works when you are working on this project, but not affect other projects:
```
{
  "editor.insertSpaces": true,
  "editor.tabSize": 2,
  "editor.detectIndentation": false,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll": true
  },
  "files.eol": "\n",
  "files.insertFinalNewline": true
}
```
7. Now, whenever you modify a file and save it, Prettier should automatically format it for you. This saves a lot of time and makes our code more readable.
