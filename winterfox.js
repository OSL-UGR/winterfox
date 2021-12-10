const WINTERFOX_CONTAINER_ID      = "snow-container";
const WINTERFOX_IS_ACTIVE_MESSAGE = "is-active";
const WINTERFOX_TOGGLE_MESSAGE    = "toggle-snow";

function exists_snow_container ()
{
	return document.getElementById(WINTERFOX_CONTAINER_ID);
}

function insert_snow_container ()
{
	const snow_container = document.createElement("div");
	snow_container.id = WINTERFOX_CONTAINER_ID;

	snow_container.style.height        = 100 + "%";
	snow_container.style.pointerEvents = "none";
	snow_container.style.position      = "fixed";
	snow_container.style.top           = 0;
	snow_container.style.width         = 100 + "%";
	snow_container.style.zIndex        = 9999;

	document.body.appendChild(snow_container);
}

function listen_for_controls ()
{
	browser.runtime.onMessage.addListener((message) =>
	{
		if (message.command === WINTERFOX_TOGGLE_MESSAGE)
			toggle_snow(message.is_active);
	});
}

function load_snow_particles ()
{
	particlesJS.load(
		WINTERFOX_CONTAINER_ID,
		'/particles/particles.json',
		() =>
		{
			console.log('callback - particles.js config loaded');
		}
	);
}

function log_response_error (error)
{
	console.log(`Error: ${error}`)
}

function remove_snow_container ()
{
	document.body.removeChild(document.getElementById(WINTERFOX_CONTAINER_ID));
}

function load_snow_on_open (message)
{
	toggle_snow(message.is_active);
}

function toggle_snow (is_active)
{
	if (exists_snow_container())
		remove_snow_container();

	if (is_active)
	{
		insert_snow_container();
		load_snow_particles();
	}
}

function main ()
{
	browser.runtime
		.sendMessage({command: WINTERFOX_IS_ACTIVE_MESSAGE})
		.then(load_snow_on_open, log_response_error);

	listen_for_controls();
}

main();
