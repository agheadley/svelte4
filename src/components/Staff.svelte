<script>
  import * as state from "./../scripts/state";
  import * as csv from "./../scripts/csv";
  import * as file from "./../scripts/file";

  export let exportFlag;

  let versionName = state.getVersion().name;
  let data = state.getVersion().data;
  let core = state.getVersion().core;

  let allStaffFlag = false;
  let blockFlag = false;
  let colorFlag = false;

  let displayList = core.rowList;

  let weekList = core.weekList;
  let weekSelected = weekList[0];
  let deptList = [...new Set(core.deptList.map(el => el.dept))].sort();
  let deptSelected = deptList[0];
  deptSelected = ""; /* forces App.svelte binding*/
  deptSelected = deptList[0];

  let toggleBlocks = () => {
    blockFlag = !blockFlag;
    displayList = core.rowList;
    if (blockFlag) displayList = core.blockList;

    console.log(displayList);
  };

  $: exportTimetable(exportFlag);

  let exportTimetable = () => {
    let arr2d = csv.createExport(staffRoomData, core.row, "STAFF");
    console.log(arr2d);
    let fileName = deptSelected + "_staff.csv";
    if (allStaffFlag) fileName = "all_staff.csv";
    if (exportFlag) file.csvDownload(arr2d, fileName);
    exportFlag = false;
  };
  //let staffList = [];

  /* react to change */
  $: getLessons(deptSelected, weekSelected, allStaffFlag);

  let staffRoomData = [];

  let getLessons = () => {
    //deptSelected = deptSelected;
    console.log("***", deptSelected, weekSelected, allStaffFlag);
    let subjects = core.deptList
      .filter(el => el.dept === deptSelected && el.subject !== "")
      .map(el => el.subject);
    console.log(subjects);

    let staff = [];

    for (let row of data) {
      for (let lesson of row.row) {
        if (lesson.c !== "") {
          //console.log(lesson.d, lesson.p, lesson.c);
          let check = lesson.c.split("/");
          for (let subject of subjects) {
            if (check[0] === subject || allStaffFlag === true) {
              staff.push(lesson.s);
            }
          }
        }
      }
    }

    staff = [...new Set(staff)].sort();

    console.log(staff);

    staffRoomData = [];

    for (let item of staff) {
      let line = { name: item, count: 0, row: [] };
      for (let col = 0; col < core.rowList.length; col++) {
        let colObj = { c: "", s: "", r: "" };
        let alreadyFlag = false;
        for (let row of data) {
          if (row.row[col].s === item && alreadyFlag === false) {
            colObj.c = row.y + "/" + row.row[col].c;
            colObj.s = row.row[col].s;
            colObj.r = row.row[col].r;
            alreadyFlag = true;
            line.count += 1;
          }
        }
        line.row.push(colObj);
      }
      staffRoomData.push(line);
      console.log(line);

      //let version = state.getVersion();
      //version.staffRoomData = staffRoomData;
      //state.putVersion(state.getActive(), version);
    }
  };

  //getLessons();
</script>



<div class="content-wrapper">
<div class="content">
	

<div class="container-fluid  no-print">

    <div class="row justify-content-between"> <!-- justify-content-between = justify-content: space-between -->
    <div class="col-1 text-center align-self-center">
    DEPT
    </div>
    <div class="col-1 text-center">
    <select class="form-control" bind:value={deptSelected}>
    {#each deptList as option,i}
     <option value={option}>{option}</option>
    {/each}
    </select>
    </div>
    <div class="col-1 text-center align-self-center">
    WEEK
    </div>
    <div class="col-1 text-center">
    
    <select class="form-control" bind:value={weekSelected}>
    {#each weekList as option,i}
     <option value={option}>{option}</option>
    {/each}
    </select>
    </div>
    <div class="col-4 text-center align-self-center">{versionName}</div>
    
    <div class="col-4 text-right">
    {#if !allStaffFlag}<button on:click={()=>allStaffFlag=!allStaffFlag} class="btn" type="button"><i class="fas fa-align-justify"></i></button>{/if}
			{#if allStaffFlag}<button class="btn btn-primary" on:click={()=>allStaffFlag=!allStaffFlag} type="button"><i class="fas fa-align-justify"></i></button>{/if}
			
			{#if !blockFlag}<button on:click={toggleBlocks} class="btn" type="button"><i class="fas fa-shapes"></i></button>{/if}
			{#if blockFlag}<button class="btn btn-primary" on:click={toggleBlocks} type="button"><i class="fas fa-shapes"></i></button>{/if}
		
			{#if !colorFlag}<button on:click={()=>colorFlag=!colorFlag} class="btn" type="button"><i class="fas fa-brush"></i></button>{/if}
			{#if colorFlag}<button class="btn btn-primary" on:click={()=>colorFlag=!colorFlag} type="button"><i class="fas fa-brush"></i></button>{/if}
		
    </div>

    </div> <!--/ row-->    
    </div> <!--/container fluid-->

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
    <th>STAFF</th>
    <th>(count)</th>
    
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
  
  {#each staffRoomData as rowItem,row}
  <tr>
  <td>{rowItem.name}</td>
  <td>{rowItem.count}</td>

  
  {#each displayList as col}
  
  {#if core.row[col].w===weekSelected}
  {#if !colorFlag}
  <td>
  <div  class="font-size-12"><b>{rowItem.row[col].c}</b></div>
  <div  class="font-size-12"><i>{rowItem.row[col].s}&nbsp;</i></div>
  <div  class="font-size-12">{rowItem.row[col].r}</div>
      
  </td>
  {/if}

  {#if colorFlag}
  <td style="background-color:{core.row[col].b === "-" ? "rgba(0,0,0,0)" : core.blockColor[core.row[col].b]}">
  <div  class="font-size-12"><b>{rowItem.row[col].c}</b></div>
  <div  class="font-size-12"><i>{rowItem.row[col].s}&nbsp;</i></div>
  <div  class="font-size-12">{rowItem.row[col].r}</div>
  </td>
  {/if}


  {/if}
      
  {/each}

  </tr>
  {/each}

  </tbody>
  </table>
	</div>
	</div>
  


</div>
</div>


<style>
  @media print {
    .no-print,
    .no-print * {
      display: none !important;
    }
  }
</style>