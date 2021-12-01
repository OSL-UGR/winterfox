const WINTERFOX_CONTAINER_ID = "snow-container";

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

function main ()
{
	if (exists_snow_container())
		remove_snow_container();

	insert_snow_container();
	load_snow_particles();
}

main();
