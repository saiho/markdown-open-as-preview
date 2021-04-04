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
    if (doc && doc.languageId === "markdown" && !doc.isDirty && !doc.isUntitled && doc.uri.scheme !== "git" && doc.uri.scheme !== "vscode" && doc.uri.scheme !== "output") {
        vscode.commands.executeCommand("markdown.showPreview").then(() => {
            if (vscode.window.activeTextEditor) {
                // Be sure the preview finishes loading
                vscode.window.showTextDocument(vscode.window.activeTextEditor.document, { preview: false }).then(() => {
                    // Activate now the editor in order to close it
                    vscode.commands.executeCommand("markdown.showSource").then(() => {
                        if (vscode.window.activeTextEditor) {
                            // Be sure the preview finishes loading
                            vscode.window.showTextDocument(vscode.window.activeTextEditor.document, { preview: false }).then(() => {
                                // Close the editor
                                vscode.commands.executeCommand("workbench.action.closeActiveEditor");
                            });
                        }
                    });
                });
            }
        });
    }
}
