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

  let storeYears = () => {
    let storeFlag = true;
    let pattern = /^[a-z0-9]+$/i;
    for (let i = 0; i < yearList.length; i++) {
      yearFlag[i] = false;
      yearList[i] = yearList[i].replace(" ", "");
      if (!pattern.test(yearList[i]) || yearList[i] === "") {
        yearFlag[i] = true;
        storeFlag = false;
      }
    }
    console.log(yearFlag);
    if (storeFlag) {
      let version = state.getVersion();
      version.core.yearList = yearList;
      version.data = [];
      state.putVersion(state.getActive(), version);
    }
  };
</script>

<div class="alert alert-primary" role="alert">
<ul>
<li>Edit, remove and add year groups</li>
<li>Remember to SAVE changes</li>
<li>WARNING - all lesson data will be deleted</li>
  

</ul>       
</div>


<div class="row p-5">
<div class="col-3 p-5  align-self-center">
<p class="title">Year</p>
</div>
<div class="col-3 p-5 align-self-center">
<p class="title"></p>
</div>
<div class="col-3 p-5  align-self-center">
<p class="title"></p>
</div>
<div class="col-3 p-5  align-self-center">
<p class="title"></p>
</div>
</div>

{#each yearList as year,index}
<div class="row p-5">
<div class="col-3 p-5  align-self-center">

{#if !yearFlag[index]}
<input type="text" placeholder="year text"  bind:value={year}/>
{/if}
{#if yearFlag[index]}
<input class="input-error" type="text" placeholder="year text"  bind:value={year}/>
{/if}


</div>
<div class="col-3 p-5 align-self-center">
<p class="title"></p>
</div>
<div class="col-3 p-5  align-self-center">
<p class="title">


<button class="btn btn-square btn-danger rounded-circle" on:click={()=>deleteRow(index)} type="button">
 <i class="fas fa-times"></i>
 </button>


</p>
</div>
<div class="col-3 p-5  align-self-center">
<p class="title"></p>
</div>
</div>

{/each}



<div class="row p-5">
<div class="col-3 p-5  align-self-center">
<p class="title">
<button on:click={addRow} class="btn btn-square btn-success rounded-circle" role="button">&plus;</button>

</p>
</div>
<div class="col-3 p-5 align-self-center">
<p class="title"></p>
</div>
<div class="col-3 p-5  align-self-center">
<p class="title">
<button class="btn btn-success" on:click={storeYears} type="button">SAVE</button>

</p>
</div>
<div class="col-3 p-5  align-self-center">
<p class="title"></p>
</div>
</div>




<style>
  .input-error {
    border: 2px solid #ff4d4f;
  }

  .title {
    border: 0px solid black;
    width: 10rem;
    min-width: 10rem;
    max-width: 10rem;
    overflow: hidden;
  }

  input {
    border: 1px solid #e1e1e1;
    border-radius: 5px;
    width: 10rem;
  }

  input:focus {
    border: 2px solid #1890ff;
    outline: none;
  }
</style>

