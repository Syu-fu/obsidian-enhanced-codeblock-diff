import {
	type App,
	type MarkdownPostProcessorContext,
	Plugin,
	PluginSettingTab,
	Setting,
	loadPrism,
} from "obsidian";

type Prism = typeof import("prismjs");

interface EnhancedCodeblockDiffSettings {
	addedLineColor: string;
	removedLineColor: string;
}

const DEFAULT_SETTINGS: EnhancedCodeblockDiffSettings = {
	addedLineColor: "rgba(0, 255, 128, 0.1)",
	removedLineColor: "rgba(255, 0, 0, 0.1)",
};

// Class to handle the post processing of markdown code blocks
class MarkdownPostProcessorHandler {
	plugin: EnhancedCodeblockDiff;

	constructor(plugin: EnhancedCodeblockDiff) {
		this.plugin = plugin;
	}

	async process(el: HTMLElement, ctx: MarkdownPostProcessorContext) {
		const codeElm: HTMLElement | null = el.querySelector("pre > code");
		if (!codeElm) {
			return;
		}

		const preElements: Array<HTMLElement> = await this.getPreElements(el);
		if (!preElements) return;

		const sectionInfo = ctx.getSectionInfo(preElements[0]);
		if (!sectionInfo) return;

		const codeblockLines = Array.from(
			{ length: sectionInfo.lineEnd - sectionInfo.lineStart + 1 },
			(_, number) => number + sectionInfo.lineStart,
		).map((lineNumber) => sectionInfo.text.split("\n")[lineNumber]);

		const codeLines = Array.from(codeblockLines);
		if (codeLines.length >= 2) {
			codeLines.shift();
			codeLines.pop();
		}

		const codeBlockFirstLine = this.getCodeBlocksFirstLine(codeblockLines);
		const codeBlockLangs = this.getCodeBlockLang(codeBlockFirstLine);

		const prism = await loadPrism();
		require("prismjs/plugins/diff-highlight/prism-diff-highlight");

		for (const [, preElement] of preElements.entries()) {
			const preCodeElm = preElement.querySelector("pre > code");

			if (!preCodeElm) return;

			if (
				Array.from(preCodeElm.classList).some((className) =>
					/^language-\S+/.test(className),
				)
			) {
				while (!preCodeElm.classList.contains("is-loaded")) {
					await sleep(2);
				}
			}

			if (codeBlockLangs.includes("diff")) {
				await this.replaceCodeBlock(
					codeLines,
					prism,
					preCodeElm,
					codeBlockLangs,
				);
			}
		}
	}

	getCodeBlocksFirstLine(array: string[]): string {
		const codeBlocks: string[] = [];
		let inCodeBlock = false;
		let openingBackticks = 0;

		for (let i = 0; i < array.length; i++) {
			let line = array[i].trim();
			line = this.removeCharFromStart(line.trim(), ">");

			const backtickMatch = line.match(/^`+(?!.*`)/);
			if (backtickMatch) {
				if (!inCodeBlock) {
					inCodeBlock = true;
					openingBackticks = backtickMatch[0].length;
					codeBlocks.push(line);
				} else {
					if (backtickMatch[0].length === openingBackticks) {
						inCodeBlock = false;
						openingBackticks = 0;
					}
				}
			}
		}

		if (codeBlocks.length > 0) {
			return codeBlocks[0];
		}

		return "";
	}

	removeCharFromStart(input: string, charToRemove: string): string {
		let startIndex = 0;
		while (
			startIndex < input.length &&
			(input[startIndex] === charToRemove || input[startIndex] === " ")
		) {
			startIndex++;
		}
		return input.slice(startIndex);
	}

	getCodeBlockLang(input: string): string[] {
		const cleanedInput = input.replace(/^```/, "").trim();
		const resultArray = cleanedInput.split(/\s+/);
		return resultArray;
	}

	async getPreElements(element: HTMLElement) {
		const preElements: Array<HTMLElement> = Array.from(
			element.querySelectorAll("pre:not(.frontmatter)"),
		);
		return preElements;
	}

	async replaceCodeBlock(
		codeLines: string[],
		prism: Prism,
		preCodeElm: Element,
		codeBlockLangs: string[],
	) {
		const html = await this.makeDiffCodeBlock(codeLines, codeBlockLangs, prism);
		preCodeElm.innerHTML = html;
	}

	async makeDiffCodeBlock(
		codeLines: string[],
		codeBlockLangs: string[],
		prism: Prism,
	): Promise<string> {
		const langDefinition = prism.languages.diff;
		const lang = codeBlockLangs.find((lang) => lang !== "diff");
		const html: string = prism.highlight(
			codeLines.join("\n"),
			langDefinition,
			`diff-${lang}`,
		);
		return html;
	}
}

export default class EnhancedCodeblockDiff extends Plugin {
	settings: EnhancedCodeblockDiffSettings;
	postProcessorHandler: MarkdownPostProcessorHandler;

	async onload() {
		console.log("Loading EnhancedCodeblockDiff plugin");
		await this.loadSettings();
		this.addSettingTab(new EnhancedCodeblockDiffSettingTab(this.app, this));

		this.postProcessorHandler = new MarkdownPostProcessorHandler(this);

		// Register the post processor
		this.registerMarkdownPostProcessor(
			async (el: HTMLElement, ctx: MarkdownPostProcessorContext) => {
				await this.postProcessorHandler.process(el, ctx);
			},
		);

		// Apply dynamic CSS based on settings
		this.applyDynamicStyles();
	}

	onunload() {
		console.log("Unloading EnhancedCodeblockDiff plugin");
		// Remove the dynamically added style when the plugin is unloaded
		const existingStyleElement = document.getElementById(
			"enhanced-codeblock-diff-styles",
		);
		if (existingStyleElement) {
			existingStyleElement.remove();
		}
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
		this.applyDynamicStyles(); // Apply styles after saving new settings
	}

	applyDynamicStyles() {
		// Remove any existing style element to avoid duplications
		const existingStyleElement = document.getElementById(
			"enhanced-codeblock-diff-styles",
		);
		if (existingStyleElement) {
			existingStyleElement.remove();
		}

		// Create new style element
		const styleElement = document.createElement("style");
		styleElement.id = "enhanced-codeblock-diff-styles";
		styleElement.innerHTML = `
		pre.language-diff > code .token.deleted:not(.prefix),
		pre > code.language-diff .token.deleted:not(.prefix) {
			background-color: ${this.settings.removedLineColor};
			color: inherit;
			display: block;
		}
		pre.language-diff > code .token.inserted:not(.prefix),
		pre > code.language-diff .token.inserted:not(.prefix) {
			background-color: ${this.settings.addedLineColor};
			color: inherit;
			display: block;
		}
		`;

		// Append the style element to the document head
		document.head.appendChild(styleElement);
	}
}

class EnhancedCodeblockDiffSettingTab extends PluginSettingTab {
	plugin: EnhancedCodeblockDiff;

	constructor(app: App, plugin: EnhancedCodeblockDiff) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;
		containerEl.empty();

		containerEl.createEl("h2", { text: "EnhancedCodeblockDiff Settings" });

		new Setting(containerEl)
			.setName("Added Line Background Color")
			.setDesc("Background color for added lines.")
			.addText((text) =>
				text
					.setPlaceholder("rgba(0, 255, 128, 0.1)")
					.setValue(this.plugin.settings.addedLineColor)
					.onChange(async (value) => {
						this.plugin.settings.addedLineColor = value;
						await this.plugin.saveSettings();
					}),
			);

		new Setting(containerEl)
			.setName("Removed Line Background Color")
			.setDesc("Background color for removed lines.")
			.addText((text) =>
				text
					.setPlaceholder("rgba(255, 0, 0, 0.1)")
					.setValue(this.plugin.settings.removedLineColor)
					.onChange(async (value) => {
						this.plugin.settings.removedLineColor = value;
						await this.plugin.saveSettings();
					}),
			);
	}
}
