/**
 * Install WPGulp
 */

const fs = require( 'fs' );
const theCWD = process.cwd();
const theCWDArray = theCWD.split( '/' );
const theDir = theCWDArray[theCWDArray.length - 1];
const ora = require( 'ora' );
const execa = require( 'execa' );
const chalk = require( 'chalk' );
const download = require( 'download' );
const handleError = require( './handleError.js' );
const clearConsole = require( './clearConsole.js' );
const printNextSteps = require( './printNextSteps.js' );

module.exports = () => {

	// Init.
	clearConsole();

	// Files.
	const filesToDownload = [
		'https://raw.githubusercontent.com/ahmadawais/WPGulp/master/src/.editorconfig',
		'https://raw.githubusercontent.com/ahmadawais/WPGulp/master/src/.eslintignore',
		'https://raw.githubusercontent.com/ahmadawais/WPGulp/master/src/.eslintrc.js',
		'https://raw.githubusercontent.com/ahmadawais/WPGulp/master/src/.gitignore',
		'https://raw.githubusercontent.com/ahmadawais/WPGulp/master/src/gulpfile.babel.js',
	];

	// Dotfiles (if any).
	const dotFiles = [ '.editorconfig', '.eslintignore', '.eslintrc.js', '.gitignore' ];

	// Start.
	console.log( '\n' ); // eslint-disable-line no-console
	const spinner = ora({ text: '' });
	spinner.start( ` 📦  Downloading WPGulp files inside the current directory → ${chalk.black.bgWhite( ` ${theDir} ` )}` );

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
};
