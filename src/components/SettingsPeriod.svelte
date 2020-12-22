<script>
  import * as file from "./../scripts/file";
  import * as state from "./../scripts/state";
  import * as setup from "./../scripts/setup";

  import File from "./File.svelte";

  let fileData = "";

  $: processFileData(fileData);

  let processFileData = data => {
    fileData = fileData;
    console.log(fileData);
    console.log(typeof fileData);
  };

  /*
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

              */
</script>




<File  bind:fileData={fileData} fileType={".csv"}/>
<!--
{#if basedata.valid===false && fileData!==""}
<div class="alert alert-danger" role="alert">
Invalid basedata.
</div>
{/if}

{#if basedata.valid===true && fileData!==""}
<div class="alert alert-success" role="alert">
Valid basedata uploaded.
</div>
{/if}
-->


<!--
{#if periodFlag===0}
<div class="alert alert-secondary" role="alert">
  <ul>
  <li>Upload period structure to current timetable version</li>
  <li>Valid period list data required</li>
  <li>WARNING - all lesson data will be deleted</li>
  
  
  </ul>
  
  <div class="custom-file">
    <input type="file"  bind:files id="file-input-period" accept=".csv" on:change={e => loadPeriod() }>
    <label for="file-input-period">Upload .csv file</label>
</div>
</div>
{/if}
{#if periodFlag===1}
<div class="alert alert-success" role="alert">
  <h4 class="alert-heading">Success</h4>
  <p>Valid period list data stored.</p>
  <div class="custom-file">
    <input type="file"  bind:files id="file-input-period" accept=".csv" on:change={e => loadPeriod() }>
    <label for="file-input-period">Upload .csv file</label>
</div>
</div>
{/if}
{#if periodFlag===2}
<div class="alert alert-danger" role="alert">
  <h4 class="alert-heading">Error</h4>
  <p>Invalid period data in file.</p>
  <div class="custom-file">
    <input type="file"  bind:files id="file-input-period" accept=".csv" on:change={e => loadPeriod() }>
    <label for="file-input-period">Upload .csv file</label>
</div>
</div>
{/if}


-->


