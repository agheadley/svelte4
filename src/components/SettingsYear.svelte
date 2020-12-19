<script>
  import * as state from "./../scripts/state";

  let yearList = state.getVersion().core.yearList;

  let yearFlag = yearList.map(el => false);

  console.log(yearFlag);

  let deleteRow = index => {
    yearList.splice(index, 1);
    yearFlag.splice(index, 1);
    yearList = yearList; /* must reassign for reactive view */
    yearFlag = yearFlag;
  };

  let addRow = () => {
    yearList.push("x");
    yearFlag.push(false);
    console.log(yearList, yearFlag);
    yearList = yearList; /* must reassign for reactive view */
    yearFlag = yearFlag;
  };

  let storeYears = () => {};
</script>

<div class="alert alert-primary" role="alert">
<ul>
<li>Edit, remove and add year groups</li>
<li>Remember to SAVE changes</li>
</ul>       
</div>

{#each yearList as year,index}
<div class="row p-5">
<div class="col-2 p-5 text-right align-self-center">
Year
</div>
<div class="col-1 p-5">
</div>
<div class="col-2 align-self-center ">
<input type="text" placeholder="year text"  bind:value={year}/>
</div>
<div class="col-1 p-5">
</div>
<div class="col-auto p-5 align-self-center">
<button class="btn btn-square btn-danger rounded-circle" on:click={()=>deleteRow(index)} type="button">
 <i class="fas fa-times"></i>
 </button>
</div>
</div>
{/each}

<div class="row p-5">
<div class="col-2 p-5 text-right align-self-center">
<button on:click={addRow} class="btn btn-square btn-success rounded-circle" role="button">&plus;</button>
</div>
<div class="col-3 p-5">
&nbsp;
</div>
<div class="col-auto p-5 align-self-center">
<button class="btn btn-success" on:click={storeYears} type="button">SAVE</button>
</div>
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

