import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

    // Register when a new document is opened
    vscode.workspace.onDidOpenTextDocument((doc: vscode.TextDocument) => {
        openMarkdowPreview(doc);
    });

    // When the extension is activated and there is a document already open
    openMarkdowPreview(vscode.window.activeTextEditor?.document);
}

export function deactivate() {}

function openMarkdowPreview(doc: vscode.TextDocument | undefined) {
    if (doc && doc.languageId === "markdown" && !doc.isDirty && !doc.isUntitled) {
        vscode.commands.executeCommand("markdown.showPreview").then(() => {
            vscode.window.showTextDocument(doc).then(() => {
                vscode.commands.executeCommand("workbench.action.closeActiveEditor");
            });
        });
    }
}
