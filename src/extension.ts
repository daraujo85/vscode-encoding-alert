// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { SCM } from './scm';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	const scm = new SCM(context);

	//vscode.workspace.onDidCreateFiles(event => scm.atualizar()),
	//vscode.workspace.onDidDeleteFiles(scm.atualizar),
	//vscode.workspace.onDidRenameFiles(scm.atualizar),
	vscode.workspace.onDidSaveTextDocument(file => scm.atualizar(file));

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "vscode-encoding-alert" is now active!');


	context.subscriptions.push(
		// The command has been defined in the package.json file
		// Now provide the implementation of the command with registerCommand
		// The commandId parameter must match the command field in package.json
		vscode.commands.registerCommand('vscode-encoding-alert.start', () => {
			// The code you place here will be executed every time your command is executed
			// Display a message box to the user
			vscode.window.showInformationMessage('vscode-encoding-alert iniciado!');
		})
	);
}

// this method is called when your extension is deactivated
export function deactivate() { }
