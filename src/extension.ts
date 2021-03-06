import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

    // Register when a new document is opened
    vscode.workspace.onDidOpenTextDocument((doc: vscode.TextDocument) => {
        openMarkdowPreview(doc);
    });

    // When the extension is activated and there is a document already open
    openMarkdowPreview(vscode.window.activeTextEditor?.document);
}

export function deactivate() { }

function openMarkdowPreview(doc: vscode.TextDocument | undefined) {
    // Doc is markdown, and has not been modified, and is not an special view (GIT comparison, difference...)
    if (doc && doc.languageId === "markdown" && !doc.isDirty && !doc.isUntitled && doc.uri.scheme !== "git" && doc.uri.scheme !== "vscode" && doc.uri.scheme !== "output") {
        vscode.commands.executeCommand("markdown.showPreview");
    }
}
