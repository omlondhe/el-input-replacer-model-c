import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand(
		"extension.replaceElInput",
		() => {
			const editor = vscode.window.activeTextEditor;

			if (editor) {
				const document = editor.document;
				const text = document.getText();

				// Regular expression to match <el-input> tags with optional attributes
				const elInputRegex = /<el-input(.*?)>(.*?)<\/el-input>/g;

				// Replace <el-input> with <input> while preserving attributes and content
				const newText = text.replace(
					elInputRegex,
					(match, attributes, content) => {
						return `<input${attributes}>${content}</input>`;
					}
				);

				// Replace the entire document content with the modified text
				const fullRange = new vscode.Range(
					document.positionAt(0),
					document.positionAt(text.length)
				);
				editor.edit((editBuilder) => {
					editBuilder.replace(fullRange, newText);
				});
			}
		}
	);

	context.subscriptions.push(disposable);
}

export function deactivate() {}
