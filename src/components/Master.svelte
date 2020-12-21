<script>
  import Cell from "./Cell.svelte";
  import Row from "./Row.svelte";

  import * as state from "./../scripts/state";

  import * as csv from "./../scripts/csv";
  import * as file from "./../scripts/file";

  export let exportFlag;

  /*
                      // old - from srote.js and DeleteRow model
                      // store.js, DeleteRow.svelte
                      import { rowIndex } from "./../scripts/store";


                      // rowIndex for row deletion
                      // old - from srote.js and DeleteRow model
                      let rowIndexState = 0;
                      const unsubscribe = rowIndex.subscribe(value => {
                        rowIndexState = value;
                      });
    

                    console.log("rowIndex", rowIndex);
                      */
  let refreshData = () => {
    data = state.getVersion().data;
  };

  /*
                      // old - from srote.js and DeleteRow model
                      $: $rowIndex && deleteRowReturn();

                      let deleteRowReturn = () => {
                        console.log("rowIndexState", rowIndexState);
                        if (rowIndexState === -1) refreshData();
                      };
                      */

  let deleteFlag = -1;
  let deleteRow = index => {
    deleteFlag = index;
  };

  let versionName = state.getVersion().name;

  let data = state.getVersion().data;
  let core = state.getVersion().core;

  let yearFlag = false;
  let blockFlag = false;
  let colorFlag = false;

  let editRow = -1;
  let editCol = -1;

  let edit = (row, col) => {
    editRow = row;
    editCol = col;
  };

  let displayList = core.rowList;

  let toggleBlocks = () => {
    blockFlag = !blockFlag;
    displayList = core.rowList;
    if (blockFlag) displayList = core.blockList;

    console.log(displayList);
    //console.log(displayList);
  };

  $: exportTimetable(exportFlag);

  let exportTimetable = () => {
    let arr2d = csv.createExport(data, core.row, "MASTER");
    console.log(arr2d);
    let fileName = "master.csv";
    if (exportFlag) file.csvDownload(arr2d, fileName);
    exportFlag = false;
  };

  let addRow = () => {
    state.addRow(yearSelected);
    data = state.getVersion().data;
  };

  /*        // old - from srote.js and DeleteRow model
                                let deleteRow = index => {
                                  console.log("deleting row:", index);
                                  rowIndex.set(index);
                                  halfmoon.toggleModal("modal-delete-row");
                                };
                                */

  let yearSelected = core.yearList[0];
  let weekSelected = core.weekList[0];
</script>

 

<div class="content-wrapper">

<!--
<div class="content">
{data.length}
</div>
-->

<div class="content">

    <div class="container-fluid  no-print">

    <div class="row justify-content-between"> <!-- justify-content-between = justify-content: space-between -->
    <div class="col-1 text-center align-self-center">
    YEAR
    </div>
    <div class="col-1 text-center">
    <select class="form-control" bind:value={yearSelected}>
    {#each core.yearList as option,i}
     <option value={option}>{option}</option>
    {/each}
    </select>
    </div>
    <div class="col-1 text-center align-self-center">
    WEEK
    </div>
    <div class="col-1 text-center">
    
    <select class="form-control" bind:value={weekSelected}>
    {#each core.weekList as option,i}
     <option value={option}>{option}</option>
    {/each}
    </select>
    </div>
    <div class="col-4 text-center align-self-center">{versionName}</div>
    
    <div class="col-4 text-right">
    {#if !yearFlag}<button on:click={()=>yearFlag=!yearFlag} class="btn" type="button"><i class="fas fa-align-justify"></i></button>{/if}
			{#if yearFlag}<button class="btn btn-primary" on:click={()=>yearFlag=!yearFlag} type="button"><i class="fas fa-align-justify"></i></button>{/if}
			
			{#if !blockFlag}<button on:click={toggleBlocks} class="btn" type="button"><i class="fas fa-shapes"></i></button>{/if}
			{#if blockFlag}<button class="btn btn-primary" on:click={toggleBlocks} type="button"><i class="fas fa-shapes"></i></button>{/if}
		
			{#if !colorFlag}<button on:click={()=>colorFlag=!colorFlag} class="btn" type="button"><i class="fas fa-brush"></i></button>{/if}
			{#if colorFlag}<button class="btn btn-primary" on:click={()=>colorFlag=!colorFlag} type="button"><i class="fas fa-brush"></i></button>{/if}
		
    </div>

    </div> <!--/ row-->
    
    </div> <!--/container fluid-->

</div> <!-- / content-->
	
  

	<div class="content">

	<div class="table-responsive">
	
  <table class="table table-bordered">
  <thead>
    {#if blockFlag}
    <tr>

    <th></th>
    <th></th>
    

		{#each displayList as item}
      {#if core.row[item].w===weekSelected}
      
      {#if colorFlag}
      <th style="background-color:{core.row[item].b === "-" ? "rgba(0,0,0,0)" : core.blockColor[core.row[item].b]}">{core.row[item].b}</th>
      {/if}


      {#if !colorFlag}
      <th>{core.row[item].b}</th>
      {/if}
      
      
      
      {/if}
		{/each}
    </tr>
    {/if}
    <tr>

    <th></th>
    <th>YEAR</th>
    
		{#each displayList as item}
      {#if core.row[item].w===weekSelected}
      
      {#if colorFlag}
      <th style="background-color:{core.row[item].b === "-" ? "rgba(0,0,0,0)" : core.blockColor[core.row[item].b]}">{core.row[item].d+core.row[item].p}</th>
      {/if}
      
      {#if !colorFlag}
      <th>{core.row[item].d+core.row[item].p}</th>
      {/if}
      
      {/if}
		{/each}
    </tr>
    
  </thead>
  <tbody>
    {#each data as rowItem,row}
      {#if rowItem.y===yearSelected || yearFlag}
      <tr>
        <td>
        <button class="btn no-print btn-square btn-danger rounded-circle" on:click={()=>deleteRow(row)} type="button"><i class="fas fa-times"></i></button>
        </td>
      <td>{rowItem.y}</td>

      {#each displayList as col}
      {#if core.row[col].w===weekSelected}
      
      {#if !colorFlag}
      <td>
      
      {#if editRow!==row || editCol!==col}
      
      <div on:click={()=>edit(row,col)} class="cell text-left">
      <div  class="font-size-12"><b>{data[row].row[col].c}</b></div>
      <div  class="font-size-12"><i>{data[row].row[col].s}&nbsp;</i></div>
      <div  class="font-size-12">{data[row].row[col].r}</div>
      
      {#if !data[row].row[col].e}
      <div class="status no-print text-right font-size-12">&nbsp;</div>
      {/if}
      
      {#if data[row].row[col].e}
      <div class="status no-print text-right font-size-12 error">{data[row].row[col].e}</div>
      {/if}
      
      </div>
      {/if}


      {#if editRow===row && editCol===col}
      <Cell bind:row={editRow} bind:col={editCol} on:refresh={refreshData}/>
      {/if}






      </td>
      {/if}
      

      {#if colorFlag}
      <td style="background-color:{core.row[col].b === "-" ? "rgba(0,0,0,0)" : core.blockColor[core.row[col].b]}">
      
      {#if editRow!==row || editCol!==col}
      
      <div on:click={()=>edit(row,col)} class="cell text-left">
      <div  class="font-size-12"><b>{data[row].row[col].c}</b></div>
      <div  class="font-size-12"><i>{data[row].row[col].s}&nbsp;</i></div>
      <div  class="font-size-12">{data[row].row[col].r}</div>
      
      {#if !data[row].row[col].e}
      <div class="status no-print text-right font-size-12">&nbsp;</div>
      {/if}
      
      {#if data[row].row[col].e}
      <div class="status no-print text-right font-size-12 error">{data[row].row[col].e}</div>
      {/if}
      
      </div>
      {/if}


      {#if editRow===row && editCol===col}
      <Cell bind:row={editRow} bind:col={editCol} on:refresh={refreshData}/>
      {/if}






      </td>
      {/if}
      


      {/if}
		  {/each}



      </tr>
      {/if}
    {/each}
  </tbody>
</table>

</div> <!-- / reponsive table div-->
		

</div> <!-- / content -->

<div class="content p-15 no-print">
 <button on:click={addRow} class="btn btn-square btn-success rounded-circle" role="button">&plus;</button>
</div> <!-- / content -->




</div> <!--  / content-wrapper-->


{#if deleteFlag>-1}
<Row bind:deleteRowFlag={deleteFlag} on:refresh={refreshData}/>
{/if}


<style>
  @media print {
    .no-print,
    .no-print * {
      display: none !important;
    }
  }

  .cell {
    cursor: pointer;
  }

  .status {
    padding-right: 0.5rem;
    padding-left: 0.5rem;
  }

  .error {
    background-color: rgba(255, 77, 79, 0.5);
  }
</style>
