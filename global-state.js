const WINTERFOX_IS_ACTIVE_MESSAGE = "is-active";
const WINTERFOX_TOGGLE_MESSAGE    = "toggle-snow";

let winterfox_active = true;

function manage_messages (message, _, sendResponse)
{
	if (message.command === WINTERFOX_TOGGLE_MESSAGE)
	{
		winterfox_active = !winterfox_active;

		browser.tabs
			.query({currentWindow: true})
			.then((tabs) =>
			{
				for (let tab of tabs)
					browser.tabs.sendMessage(tab.id, {
						command: WINTERFOX_TOGGLE_MESSAGE,
						is_active: winterfox_active
					});
			})
	}
	else if (message.command === WINTERFOX_IS_ACTIVE_MESSAGE)
	{
		sendResponse({is_active: winterfox_active});
	}
}

function main ()
{
	browser.runtime.onMessage.addListener(manage_messages);
}

main ();
