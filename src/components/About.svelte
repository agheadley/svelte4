<script>
/*
import { createEventDispatcher } from "svelte";
const dispatch = createEventDispatcher();
*/
export let closeFlag;
</script>

<div  class="position-relative">
		<div class="dialog-container position-absolute z-50">
		<div  class="card">
    <h2 class="card-title">ilexTT</h2>
		<p>A simple timetable pwa.</p>
		<ul>
		<li>https://github.com/agheadley/svelte3</li>
		<li>https://svelte.dev/</li>
		<li>https://www.gethalfmoon.com/docs/introduction/</li>
		</ul>
		<p>AGH/mmxx</p>
		<div class="text-center">
     <button class="btn"  on:click={()=>closeFlag=false}>Close</button>
    </div>
		</div>
		</div>
		<!--</div>-->
</div>

<style>
	.dialog-container {
	  display: flex;
	  justify-content: center;
	  align-items: center;
	  min-height: 100vh;
	  min-width: 100vw;
	  background-color: rgba(0, 0, 0, 0.8);
	}
</style>