/**
 * Install WPGulp
 */

const fs = require( 'fs' );
const theCWD = process.cwd();
const ora = require( 'ora' );
const execa = require( 'execa' );
const chalk = require( 'chalk' );
const download = require( 'download' );
const handleError = require( './handleError.js' );
const clearConsole = require( './clearConsole.js' );
const printNextSteps = require( './printNextSteps.js' );

// Init.
clearConsole();

// Files.
const filesToDownload = [
	'https://raw.githubusercontent.com/ahmadawais/WPGulp/v2.0.0/src/.editorconfig',
	'https://raw.githubusercontent.com/ahmadawais/WPGulp/v2.0.0/src/.eslintignore',
	'https://raw.githubusercontent.com/ahmadawais/WPGulp/v2.0.0/src/.eslintrc.js',
	'https://raw.githubusercontent.com/ahmadawais/WPGulp/v2.0.0/src/.gitignore',
	'https://raw.githubusercontent.com/ahmadawais/WPGulp/v2.0.0/src/gulpfile.babel.js',
	'https://raw.githubusercontent.com/ahmadawais/WPGulp/v2.0.0/src/package.json',
	'https://raw.githubusercontent.com/ahmadawais/WPGulp/v2.0.0/src/wpgulp.config.js'
];

// Dotfiles (if any).
const dotFiles = [ '.editorconfig', '.eslintignore', '.eslintrc.js', '.gitignore' ];

// Start.
console.log( '\n' ); // eslint-disable-line no-console
const spinner = ora({ text: '' });
spinner.start( ` 📦  Downloading WPGulp files → ${chalk.black.bgWhite( ` ${theCWD} ` )}` );

// Download.
Promise.all( filesToDownload.map( x => download( x, `${theCWD}` ) ) ).then( async() => {
	dotFiles.map( x => fs.rename( `${theCWD}/${x.slice( 1 )}`, `${theCWD}/${x}`, err => handleError( err ) ) );
	spinner.succeed();

	// The npm install.
	console.log( '\n' ); // eslint-disable-line no-console
	spinner.start( ' 🚀  Installing npm packages' );
	await execa( 'npm', [ 'install', '--silent' ]);
	spinner.succeed();

	// Done.
	printNextSteps();
});
