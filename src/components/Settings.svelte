<script>
  import * as file from "./../scripts/file";
  import * as setup from "./../scripts/setup";
  import * as state from "./../scripts/state";

  import SettingsVersion from "./SettingsVersion.svelte";

  /* period list */
  let files;
  let periodFlag = 0;

  let loadPeriod = e => {
    console.log(files[0]);
    file.read(files[0], res => {
      console.log(res);
      let info = file.csvProcess(res, ["day", "per", "week", "id", "block"]);
      console.log(info);
      if (!info.valid) {
        console.log("invalid period data ...");
        periodFlag = 2;
      } else {
        info = setup.createTimetableTemplates(info.data);
        console.log("row template ", info);

        state.updateCore("row", info.row);
        state.updateCore("rowList", info.rowList);
        state.updateCore("blockList", info.blockList);
        state.updateCore("weekList", info.weekList);
        state.deleteData(state.getStatus().version);
        if (info.row.length && info.row.length > 0) {
          // store data
          periodFlag = 1;
        }
      }
    });
  };

  /* to be removed */

  let deleteAll = () => {
    localStorage.removeItem("version1");
    localStorage.removeItem("version2");
    localStorage.removeItem("version3");
    localStorage.removeItem("version4");
    localStorage.removeItem("version5");
    localStorage.removeItem("active");
    state.initVersion();
    //state.updateCore("blockList", [0]);
    //state.updateCore("rowList", [0]);
    //console.log();
  };
</script>

<div class="content-wrapper">


<div class="card"> 
  
  <h2 class="card-title">Versions</h2>
  
  <SettingsVersion/>



</div>



<div class="card"> 
  
  <h2 class="card-title">Period List</h2>

`    {#if periodFlag===0}
      <div class="alert alert-primary" role="alert">
        <h4 class="alert-heading">Upload Data</h4>
        <p>Valid period list data required</p>
        <div class="custom-file">
          <input type="file" bind:files id="file-input-1" accept=".csv" on:change={e => loadPeriod() }>
          <label for="file-input-1">Upload .csv file</label>
      </div>
      </div>
     {/if}
     {#if periodFlag===1}
      <div class="alert alert-success" role="alert">
        <h4 class="alert-heading">Success</h4>
        <p>Valid period list data store.</p>
        <div class="custom-file">
          <input type="file" bind:files id="file-input-1" accept=".csv" on:change={e => loadPeriod() }>
          <label for="file-input-1">Upload .csv file</label>
      </div>
      </div>
     {/if}
     {#if periodFlag===2}
      <div class="alert alert-danger" role="alert">
        <h4 class="alert-heading">Error</h4>
        <p>Invalid period data in file.</p>
        <div class="custom-file">
          <input type="file" bind:files id="file-input-1" accept=".csv" on:change={e => loadPeriod() }>
          <label for="file-input-1">Upload .csv file</label>
      </div>
      </div>
     {/if}



           
</div>






<div class="card"> 
  
  <h2 class="card-title">Delete Data</h2>

  <button class="btn btn-danger" on:click={deleteAll}>Delete Data</button>
</div>



<div class="card"> 
  
  <h2 class="card-title">Basedata</h2>

</div>


<div class="card"> 
  
  <h2 class="card-title">dept list</h2>

</div>

<div class="card"> 
  
  <h2 class="card-title">year list</h2>

</div>




</div> <!-- end of container-->

