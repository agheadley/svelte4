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
      let info = file.csvToArray(res);
      console.log(info);
      
      let basedata=setup.extractBasedata(info);
      
      if(!basedata.valid) {
        periodFlag = 2
      } else {
         let version = state.getVersion();
         version.core.basedata={
           staff:basedata.staff,
           rooms:basedata.rooms,
           subjects:basedata.subjects
           };
         version.core.staffList=[... new Set(basedata.staff.map(el=>el.code))].sort();
         version.core.roomList=[... new Set(basedata.rooms.map(el=>el.code))].sort();
         version.core.subjectList=[... new Set(basedata.subjects.map(el=>el.code))].sort();
         console.log(version);
         state.putVersion(state.getActive(),version);
         periodFlag=1;
      }

      /*
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
      */
    });
  };
</script>

{#if periodFlag===0}
<div class="alert alert-secondary" role="alert">
  <ul>
  <li>Upload basedata to current timetable version</li>
  <li>Valid TC,SB,RM basedata required</li>
  
  
  </ul>
  
  <div class="custom-file">
    <input type="file" bind:files id="file-input-1" accept=".txt" on:change={e => loadPeriod() }>
    <label for="file-input-1">Upload .txt file</label>
</div>
</div>
{/if}
{#if periodFlag===1}
<div class="alert alert-success" role="alert">
  <h4 class="alert-heading">Success</h4>
  <p>Valid basedata stored.</p>
  <div class="custom-file">
    <input type="file" bind:files id="file-input-1" accept=".csv" on:change={e => loadPeriod() }>
    <label for="file-input-1">Upload .txt file</label>
</div>
</div>
{/if}
{#if periodFlag===2}
<div class="alert alert-danger" role="alert">
  <h4 class="alert-heading">Error</h4>
  <p>Invalid basedata in file.</p>
  <div class="custom-file">
    <input type="file" bind:files id="file-input-1" accept=".csv" on:change={e => loadPeriod() }>
    <label for="file-input-1">Upload .txt file</label>
</div>
</div>
{/if}



