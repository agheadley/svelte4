<script>
  import * as state from "./../scripts/state";
  import * as check from "./../scripts/check";

  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let deleteRowFlag;

  function deleteRow() {
    console.log("deleting row", deleteRowFlag);
    state.deleteRow(deleteRowFlag);

    let version = state.getVersion();
    for (let col = 0; col < version.core.row.length; col++) {
      check.updateErrors(col);
    }
    dispatch("refresh");
    deleteRowFlag = -1;
  }
</script>

<div  class="position-relative">
		<div class="dialog-container position-absolute z-50">
		<div  class="card">
    <h2 class="card-title">Delete Row</h2>
		<p>Are you sure? (Can't be undone.)</p>
		<div class="text-center">
     <button class="btn btn-danger" on:click={deleteRow}>Delete</button>
    
     <button class="btn" on:click={()=>deleteRowFlag=-1}>Close</button>
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