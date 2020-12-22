<script>
  import * as file from "./../scripts/file";
  import * as state from "./../scripts/state";
  import * as setup from "./../scripts/setup";

  import File from "./File.svelte";

  let fileData = "";
  let basedata = { valid: false };
  let periodData = { valid: false };

  let dataType = "error";

  $: processFileData(fileData);

  let processFileData = data => {
    fileData = fileData;
    console.log(fileData);
    console.log(typeof fileData);
    let info = file.csvToArray(fileData);

    basedata = setup.extractBasedata(info);
    if (basedata.valid) storeBasedata();

    periodData = file.csvProcess(fileData, ["day", "per", "week", "id", "block"]);
    if (periodData.valid) storePeriodData();

    if (!periodData.valid && !basedata.valid) dataType = "error";
  };

  let storePeriodData = () => {
    dataType = "period";
    let info = setup.createTimetableTemplates(periodData.data);
    console.log("row template ", info);

    let version = state.getVersion();
    version.core.row = info.row;
    version.core.rowList = info.rowList;
    version.core.blockList = info.blockList;
    version.core.weekList = info.weekList;
    version.data = [];

    console.log(version);

    console.log("stored periodData");
    state.putVersion(state.getActive(), version);

    return true;
  };

  let storeBasedata = () => {
    dataType = "base";
    let version = state.getVersion();
    version.core.basedata = {
      staff: basedata.staff,
      rooms: basedata.rooms,
      subjects: basedata.subjects
    };
    version.core.staffList = [
      ...new Set(basedata.staff.map(el => el.code))
    ].sort();
    version.core.roomList = [
      ...new Set(basedata.rooms.map(el => el.code))
    ].sort();
    version.core.subjectList = [
      ...new Set(basedata.subjects.map(el => el.code))
    ].sort();
    console.log(version);
    state.putVersion(state.getActive(), version);
    console.log("stored basedata");
    return true;
  };
</script>


<File  bind:fileData={fileData} fileType={".txt"}/>

{#if dataType==="error" && fileData!==""}
<div class="alert alert-danger" role="alert">
Invalid data. Please load valid basedata / period data.
</div>
{/if}

{#if dataType==="base" && fileData!==""}
<div class="alert alert-success" role="alert">
Valid basedata uploaded.
</div>
{/if}

{#if dataType==="period" && fileData!==""}
<div class="alert alert-success" role="alert">
Valid period data uploaded.
</div>
{/if}
