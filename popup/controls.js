const WINTERFOX_TOGGLE_MESSAGE = "toggle-snow";

function listen_for_controls ()
{
	const button = document.getElementById(WINTERFOX_TOGGLE_MESSAGE);

	button.addEventListener("click", () =>
	{
		browser.tabs.query({active: true, currentWindow: true})
			.then((tabs) =>
			{
				for (let tab of tabs)
					browser.tabs.sendMessage(
						tab.id,
						{command: WINTERFOX_TOGGLE_MESSAGE}
					);
			})
	});
}

// function report_script_error (error)
// {
// 	document.querySelector("#popup-content").classList.add("hidden");
// 	document.querySelector("#error-content").classList.remove("hidden");
// 	console.error(`Failed to execute beastify content script: ${error.message}`);
// }

function main ()
{
	listen_for_controls();
	browser.tabs
		.executeScript({file: "/winterfox.js"});
		// .catch(report_script_error);
}

main();
