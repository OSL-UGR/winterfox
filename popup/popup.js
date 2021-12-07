const WINTERFOX_TOGGLE_MESSAGE = "toggle-snow";

function listen_for_controls ()
{
	const button = document.getElementById(WINTERFOX_TOGGLE_MESSAGE);

	button.addEventListener("click", () =>
	{
		browser.tabs.query({currentWindow: true})
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

function main ()
{
	listen_for_controls();
	browser.tabs.executeScript({file: "/winterfox.js"});
}

main();
