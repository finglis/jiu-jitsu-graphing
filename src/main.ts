/* eslint-disable obsidianmd/ui/sentence-case */
import {App, Editor, MarkdownView, Modal, Notice, Plugin} from 'obsidian';
import {DEFAULT_SETTINGS, BJJPluginSettings, BJJSettingTab} from "./settings";

// Remember to rename these classes and interfaces!

export default class BJJPlugin extends Plugin {
	settings: BJJPluginSettings;

	async onload() {
		console.debug('Loading BJJ Plugin');

		await this.loadSettings();
		
		this.addSettingTab(new BJJSettingTab(this.app, this));

		this.addRibbonIcon('dice', 'Bjj paths', (evt: MouseEvent) => {
			// Called when the user clicks the icon.
			// new Notice('This is a notice!');
			this.openBJJModal();
		});

		// This adds a status bar item to the bottom of the app. Does not work on mobile apps.
		const statusBarItemEl = this.addStatusBarItem();
		statusBarItemEl.setText('Jiu Jitsu graphing');

		// This adds a simple command that can be triggered anywhere
		this.addCommand({
			id: 'open-bjj-graphing',
			name: 'Open BJJ Graphing Modal',
			callback: () => {
				this.openBJJModal();
			}
		});

		// This adds an editor command that can perform some operation on the current editor instance
		this.addCommand({
			id: 'replace-selected',
			name: 'Replace selected content',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				editor.replaceSelection('Sample editor command');
			}
		});

		// This adds a complex command that can check whether the current state of the app allows execution of the command
		this.addCommand({
			id: 'open-modal-complex',
			name: 'Open modal (complex)',
			checkCallback: (checking: boolean) => {
				// Conditions to check
				const markdownView = this.app.workspace.getActiveViewOfType(MarkdownView);
				if (markdownView) {
					// If checking is true, we're simply "checking" if the command can be run.
					// If checking is false, then we want to actually perform the operation.
					if (!checking) {
						this.openBJJModal();
					}

					// This command will only show up in Command Palette when the check function returns true
					return true;
				}
				return false;
			}
		});

		// If the plugin hooks up any global DOM events (on parts of the app that doesn't belong to this plugin)
		// Using this function will automatically remove the event listener when this plugin is disabled.
		this.registerDomEvent(document, 'click', (evt: MouseEvent) => {
			// new Notice("Click");
		});

		// When registering intervals, this function will automatically clear the interval when the plugin is disabled.
		// this.registerInterval(window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000));

	}

	onunload() {
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData() as Partial<BJJPluginSettings>);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

	findPaths(
		operation: "path",
		from: string,
		to: string,
		length?: number
	) {
		console.debug(`Finding BJJ path from ${from} to ${to} with max length ${length}`);
	}
	

openBJJModal() {
	new BJJModal (
		this.app,
		this.findPaths.bind(this, "path"), //TODO add the findPaths function 
		// Object.assign({}, this.settings.filter),
		"path"
	).open();
	}
}

class BJJModal extends Modal {
	to: string;
	Form: string;
	length: number = 10;
	operation: "path";
	callback: (
		from: string,
		to: string,
		length?: number
	) => void;


	constructor(
		app: App,
		callback: (
			from: string,
			to: string,
			length?: number
		) => void,
		operation: "path"
	) {
		super(app);
		this.callback = callback;
		this.operation = operation;
	}

	onOpen() {
		let {contentEl} = this;
				if (this.operation == "path") {
			contentEl.createEl("h1", { text: "Get BJJ path" });
		}
		
		contentEl.setText('Bjj graphing coming soon!');
	}

	onClose() {
		const {contentEl} = this;
		contentEl.empty();
	}
}
