import * as vscode from 'vscode';

export class SCM {

    private defaultEncoding: string;

    constructor(
        context: vscode.ExtensionContext,
    ) {
        this.defaultEncoding = this.getCliPath();

    };

    atualizar = (textDocument: vscode.TextDocument): Thenable<void> => {

        if(textDocument.fileName.indexOf("settings.json") > -1) {
            return Promise.resolve();
        }
        this.defaultEncoding = this.getCliPath();

        const progressOptions: vscode.ProgressOptions = {
            title: `Refreshing the source control...`,
            location: vscode.ProgressLocation.SourceControl,
        };

        const chardet = require('chardet');

        const encoding = chardet.detectFileSync(textDocument.fileName);

        if (encoding !== this.defaultEncoding) {
            const message = `O encoding utilizado [${encoding}] é diferente do esperado [${this.defaultEncoding}].`;
            const options: vscode.MessageOptions = { modal: true };
            vscode.window.showWarningMessage(message, options);
        }

        return vscode.window.withProgress(progressOptions, async progress => {
            try {

                progress.report({ message: `The source control has been refreshed successfully.` });

            } catch (error) {

            }
        });
    };
    getEncoding = (fileName: any): void => {

        const chardet = require('chardet');

        const encoding = chardet.detectFileSync(fileName);

        vscode.window.showInformationMessage(`O encoding atual é ${encoding}`);

    };

    private getCliPath(): string {
        const configuration = vscode.workspace.getConfiguration('EncodingAlert');
        const encoding = configuration.get<string>('Encoding');

        // TODO: if path not exist ask
        if (encoding === undefined || encoding.length === 0) { throw new Error(`O encoding padrão para verificação não foi configurado`); }

        return encoding;
    }

}

