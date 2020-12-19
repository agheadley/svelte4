<script>
import * as state from "./../scripts/state";

let yearList = state.getVersion().core.yearList;

let deleteRow = index => {};

let addRow = index => {};

let storeRow = index => {};
</script>

<div class="row p-5">
<div class="col-2 p-5">
YEAR
</div>
<div class="col-1 p-5">
SAVE
</div>
<div class="col-auto p-5">
DELETE
</div>
</div>

<table class="table">
<thead>
<tr>
<th>YEAR</th>
<th>SAVE</th>
<th>DELETE</th>

</tr>
</thead>
<tbody>

{#each yearList as year,index}
<tr>
<td>
<input type="text" placeholder="year text"  bind:value={year}/>
</td>
<td>
 <button class="btn" on:click={()=>storeRow(index)} type="button">
 <i class="fas fa-save"></i>
 </button>
</td>
<td>
 <button class="btn" on:click={()=>deleteRow(index)} type="button">
 <i class="fas fa-trash-alt"></i>
 </button>
</td>
</tr>
{/each}

</tbody>
</table>

<div class="content no-print">
 <button on:click={addRow} class="btn btn-square btn-primary rounded-circle" role="button">&plus;</button>
</div>

<style>
  .input-error {
    border: 2px solid #ff4d4f;
  }

  input {
    border: 2px solid #e1e1e1;
    border-radius: 5px;
    width: 10rem;
  }

  input:focus {
    border: 2px solid #1890ff;
    outline: none;
  }
</style>

