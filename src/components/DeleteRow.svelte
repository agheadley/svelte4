<script>
	import * as state from "./../scripts/state";
	import * as check from "./../scripts/check";

	import { rowIndex } from "./../scripts/store.js";
	let version = state.getVersion();

	let index;

	/* see store.js - for row deletion */
	const unsubscribe = rowIndex.subscribe(value => {
	  index = value;
	});

	function deleteRow() {
	  console.log("deleting row", index);
	  state.deleteRow(index);

	  for (let col = 0; col < version.core.row.length; col++) {
	    check.updateErrors(col);
	  }

	  rowIndex.set(-1);
	  halfmoon.toggleModal("modal-delete-row");
	}
</script>



<div class="modal" id="modal-delete-row" tabindex="-1" role="dialog">
	<div class="modal-dialog" role="document">
		<div class="modal-content">


<a href="#" onclick="halfmoon.toggleModal('modal-delete-row')" class="close" role="button" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </a>
			
<h5 class="modal-title">Delete Row ?</h5>
      <p>
        Are you sure? (Can't be undone.)
      </p>
      <div class="text-right mt-20"> <!-- text-right = text-align: right, mt-20 = margin-top: 2rem (20px) -->
        
				<a href="#" class="btn mr-5 btn-danger" on:click={deleteRow}>Delete</a>
				<a onclick="halfmoon.toggleModal('modal-delete-row')" href="#" class="btn mr-5" role="button">Cancel</a>
       
      </div>

      </div>

	</div>
</div>