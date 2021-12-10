const WINTERFOX_TOGGLE_MESSAGE = "toggle-snow";

function listen_for_controls ()
{
	const button = document.getElementById(WINTERFOX_TOGGLE_MESSAGE);

	button.addEventListener("click", () =>
	{
		browser.runtime
			.sendMessage({command: WINTERFOX_TOGGLE_MESSAGE})
			.then(() => {});
	});
}

function main ()
{
	listen_for_controls();
	browser.tabs.executeScript({file: "/winterfox.js"});
}

main();
