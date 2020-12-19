<script>
  import * as file from "./../scripts/file";
  import * as state from "./../scripts/state";
  import * as setup from "./../scripts/setup";

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

        let version = state.getVersion();
        version.core.row = info.row;
        version.core.rowList = info.rowList;
        version.core.blockList = info.blockList;
        version.core.weekList = info.weekList;
        version.data = [];

        state.putVersion(state.getActive(), version);

        if (info.row.length && info.row.length > 0) {
          periodFlag = 1;
        }
      }
    });
  };
</script>

{#if periodFlag===0}
<div class="alert alert-secondary" role="alert">
  <ul>
  <li>Upload period structure to current timetable version</li>
  <li>Valid period list data required</li>
  <li>WARNING - all lesson data will be deleted</li>
  
  
  </ul>
  
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



