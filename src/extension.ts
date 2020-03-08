import * as vscode from 'vscode';
import {Watcher} from './watcher'
import {Builder} from './builder';
import {Viewer} from './viewer';
import {Logger} from './logger'

export function activate(context: vscode.ExtensionContext) {	

	let extension = new Extension(context.extensionPath)

	context.subscriptions.push(
		vscode.commands.registerCommand('gnuplot.view', () => {
			extension.viewer.createViewr([extension.watcher]);
			//extension.watcher.updatePreview(vscode.window.activeTextEditor?.document);
			extension.watcher.startWatching();

		})	
	);

}

export class Extension {
	public extensionPath: string;

	public watcher: Watcher;
	public builder: Builder;
	public viewer: Viewer;
	public logger: Logger;

	constructor(extensionPath: string) {
		this.extensionPath = extensionPath;

		this.watcher = new Watcher(this);
		this.builder = new Builder(this);
		this.viewer = new Viewer(this);
		this.logger = new Logger(this);
	}
}