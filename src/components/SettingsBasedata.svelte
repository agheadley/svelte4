<script>
  import * as file from "./../scripts/file";
  import * as state from "./../scripts/state";
  import * as setup from "./../scripts/setup";

  import File from "./File.svelte";

  let fileData = "";

  let basedataFlag = 0;

  $: processFileData(fileData);

  let processFileData = data => {
    fileData = fileData;
    console.log(fileData);
    console.log(typeof fileData);
    let info = file.csvToArray(fileData);

    let basedata = setup.extractBasedata(info);

    if (!basedata.valid) {
      basedataFlag = 2;
    } else {
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
      basedataFlag = 1;
    }
  };
</script>


<File  bind:fileData={fileData}/>

{#if basedataFlag===2}
<div class="alert alert-danger" role="alert">
Invalid basedata.
</div>
{/if}

{#if basedataFlag===1}
<div class="alert alert-success" role="alert">
Valid basedata uploaded.
</div>
{/if}
