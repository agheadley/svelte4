<script>
	import Master from "./components/Master.svelte";
	import Staff from "./components/Staff.svelte";
	import Room from "./components/Room.svelte";
	import Settings from "./components/Settings.svelte";

	import About from "./components/About.svelte";
	//import DeleteRow from "./components/DeleteRow.svelte";

	import * as state from "./scripts/state";

	let versions = state.getVersionKeys();
	console.log(versions);
	for (let version of versions) state.initVersion(version);
	if (!state.getActive()) state.setActive(versions[0]);

	/* menu tabs */
	const menuTabOptions = [
	  { text: "MASTER", component: Master },
	  { text: "STAFF", component: Staff },
	  { text: "ROOM", component: Room },
	  { text: "SETTINGS", component: Settings }
	];

	let menuTabSelected = 0;

	let aboutFlag = false;

	/* Staff.svelte bindings for csv export */
	let exportFlag = false;
</script>






<main>

<!--<About/>-->
<!--<DeleteRow/>-->

	<div class="page-wrapper with-navbar with-navbar-fixed-bottom">

		<div class="sticky-alerts"></div>

		<nav class="navbar no-print justify-content-between">
			<div class="navbar-content">
				<a href class="navbar-brand ml-10 ml-sm-20">
					<!--<img src="/static/site/img/fake-logo.svg" alt="fake-logo">-->
					<img src="./android-chrome-192x192.png" alt="...">
					<span class="d-none d-sm-flex">ilexTT</span>
				</a>
				<div class="navbar-nav">
					{#each menuTabOptions as option,i}
					{#if i===menuTabSelected}
					<div class="menu-tab menu-selected" id={"tab"+i} on:click={()=>menuTabSelected=i}>{option.text}</div>
					{/if}
					{#if i!==menuTabSelected}
					<div class="menu-tab" id={"tab"+i} on:click={()=>menuTabSelected=i}>{option.text}</div>
					{/if}
					{/each}
				</div>
			</div>

			<div class="navbar-content ml-auto">
				<button on:click={()=>exportFlag=true} class="btn btn-action mr-5 btn-primary" type="button">
					<i class="fas fa-download" aria-hidden="true"></i>
					<span class="sr-only">Export</span>
				</button>
				<button onclick="window.print()" class="btn mr-5 btn-action btn-primary" type="button">
					<i class="fas fa-print" aria-hidden="true"></i>
					<span class="sr-only">Print</span>
				</button>
				<button on:click={()=>aboutFlag=true} class="btn btn-primary" role="button">About</button>
				

			
	
			</div>



		</nav>

		{#if menuTabSelected===0}
		<Master bind:exportFlag={exportFlag}/>
		{/if}
		{#if menuTabSelected===1}
		<Staff bind:exportFlag={exportFlag} />
		{/if}
		{#if menuTabSelected===2}
		<Room bind:exportFlag={exportFlag}/>
		{/if}
		{#if menuTabSelected===3}
		<Settings/>
		{/if}
		
		
		<!--
		<svelte:component this={menuTabOptions[menuTabSelected].component} />
		-->

		{#if aboutFlag}
		<About bind:closeFlag={aboutFlag}/>
		{/if}

		<nav class="navbar navbar-fixed-bottom no-print justify-content-between">
			<div class="navbar-content ml-auto">
			</div>
			<div class="navbar-content ml-auto">
			AGH
			</div>

		</nav>

	</div>







</main>


<style>
	@media print {
	  .no-print,
	  .no-print * {
	    display: none !important;
	  }
	}

	.menu-tab {
	  padding-left: 1rem;
	  padding-right: 1rem;
	  padding-top: 0.5em;
	  padding-bottom: 0.5em;
	  cursor: pointer;
	}

	.menu-selected {
	  border-top: 1px solid rgba(24, 144, 255, 0.2);
	  background-color: rgba(24, 144, 255, 0.2);
	  border-bottom: 1px solid red;
	}
</style>