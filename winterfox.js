const WINTERFOX_CONTAINER_ID = "snow-container";

const TOGGLE_ACTIONS = {
	true_toggle: "true-toggle",
	always_load: "always-load",
};

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
		if (message.command === "toggle-snow")
			toggle_snow();
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

function remove_snow_container ()
{
	document.body.removeChild(document.getElementById(WINTERFOX_CONTAINER_ID));
}

function toggle_snow (action)
{
	const container_loaded = exists_snow_container();

	if (container_loaded)
		remove_snow_container();

	if (!container_loaded || action === TOGGLE_ACTIONS.always_load)
	{
		insert_snow_container();
		load_snow_particles();
	}
}

function main ()
{
	toggle_snow(TOGGLE_ACTIONS.always_load);
	listen_for_controls();
}

main();
