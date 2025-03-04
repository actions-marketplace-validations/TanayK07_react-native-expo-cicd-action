const core = require("@actions/core");
const fs = require("fs");
const path = require("path");
const { generateWorkflowYaml } = require("./src/generator");

async function run() {
	try {
		// Get inputs from action
		const storageType = core.getInput("storage-type");
		const buildTypesInput = core.getInput("build-types");
		const testsInput = core.getInput("tests");
		const triggersInput = core.getInput("triggers");
		const iosSupport = core.getInput("ios-support") === "true";
		const publishToExpo = core.getInput("publish-to-expo") === "true";
		const publishToStores = core.getInput("publish-to-stores") === "true";
		const jestTests = core.getInput("jest-tests") === "true";
		const rntlTests = core.getInput("rntl-tests") === "true";
		const renderHookTests = core.getInput("render-hook-tests") === "true";
		const caching = core.getInput("caching") === "true";
		const notifications = core.getInput("notifications") === "true";
		const outputFile = core.getInput("output-file");

		// Parse comma-separated inputs
		const buildTypes = buildTypesInput.split(",").map((item) => item.trim());
		const tests = testsInput.split(",").map((item) => item.trim());
		const triggers = triggersInput.split(",").map((item) => item.trim());

		// Create the configuration object
		const config = {
			storageType,
			buildTypes,
			tests,
			triggers,
			advancedOptions: {
				iOSSupport: iosSupport,
				publishToExpo,
				publishToStores,
				jestTests,
				rntlTests,
				renderHookTests,
				caching,
				notifications,
			},
		};

		// Generate the workflow YAML
		const yaml = generateWorkflowYaml(config);

		// Ensure the directory exists
		const outputDir = path.dirname(outputFile);
		if (!fs.existsSync(outputDir)) {
			fs.mkdirSync(outputDir, { recursive: true });
		}

		// Write the file
		fs.writeFileSync(outputFile, yaml);

		// Log success
		core.info(`✅ Workflow file generated at: ${outputFile}`);
		core.setOutput("workflow-file", outputFile);
	} catch (error) {
		core.setFailed(`Action failed with error: ${error.message}`);
	}
}

run();
