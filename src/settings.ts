import {App, PluginSettingTab, Setting} from "obsidian";
import BJJPlugin from "./main";

export interface BJJPluginSettings {
	mySetting: string;
}

export const DEFAULT_SETTINGS: BJJPluginSettings = {
	mySetting: 'default'
}

export class BJJSettingTab extends PluginSettingTab {
	plugin: BJJPlugin;

	constructor(app: App, plugin: BJJPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName('Settings #1')
			.setDesc('It\'s a secret')
			.addText(text => text
				.setPlaceholder('Enter your secret')
				.setValue(this.plugin.settings.mySetting)
				.onChange(async (value) => {
					this.plugin.settings.mySetting = value;
					await this.plugin.saveSettings();
				}));
	}
}
