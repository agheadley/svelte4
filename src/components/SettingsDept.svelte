<script>
  import * as state from "./../scripts/state";

  let deptList = state.getVersion().core.deptList;

  let subjectList = state.getVersion().core.subjectList;
  let roomList = state.getVersion().core.roomList;
  console.log(subjectList, roomList);
  let deptFlag = deptList.map(el => ({
    dept: false,
    subject: false,
    room: false
  }));

  console.log(deptList, deptFlag);

  let deleteRow = index => {
    deptList.splice(index, 1);
    deptFlag.splice(index, 1);
    deptList = deptList; /* must reassign for reactive view */
    deptFlag = deptFlag;
  };

  let addRow = () => {
    deptList.push({ dept: "", subject: "", room: "" });
    deptFlag.push({ dept: false, subject: false, room: false });
    deptList = deptList; /* must reassign for reactive view */
    deptFlag = deptFlag;
  };

  let storeDept = () => {
    let storeFlag = true;
    let pattern = /^[a-z0-9]+$/i;
    for (let i = 0; i < deptList.length; i++) {
      deptFlag[i] = { dept: false, subject: false, room: false };
      deptList[i]["dept"] = deptList[i]["dept"].replace(" ", "");
      deptList[i]["subject"] = deptList[i]["subject"].replace(" ", "");
      deptList[i]["room"] = deptList[i]["room"].replace(" ", "");

      if (!pattern.test(deptList[i]["dept"]) || deptList[i]["dept"] === "") {
        deptFlag[i]["dept"] = true;
        storeFlag = false;
      }
      if (
        !pattern.test(deptList[i]["subject"]) &&
        deptList[i]["subject"] !== ""
      ) {
        deptFlag[i]["subject"] = true;
        storeFlag = false;
      }
      if (!pattern.test(deptList[i]["room"]) && deptList[i]["room"] !== "") {
        deptFlag[i]["room"] = true;
        storeFlag = false;
      }

      if (
        subjectList.indexOf(deptList[i]["subject"]) === -1 &&
        deptList[i]["subject"] !== ""
      ) {
        deptFlag[i]["subject"] = true;
        storeFlag = false;
      }
      if (
        roomList.indexOf(deptList[i]["room"]) === -1 &&
        deptList[i]["room"] !== ""
      ) {
        deptFlag[i]["room"] = true;
        storeFlag = false;
      }
    }
    console.log(deptFlag);
    if (storeFlag) {
      let version = state.getVersion();
      version.core.deptList = deptList;
      state.putVersion(state.getActive(), version);
    }
  };
</script>

<div class="alert alert-primary" role="alert">
<ul>
<li>Edit, remove and add dept subject/room links</li>
<li>FLEXIBLE - Subject / Room can be valid or blank</li>
<li>Remember to SAVE changes</li>
<li>(Lesson data will be unaffected)</li>
  

</ul>       
</div>

<div class="row p-5">
<div class="col-3 p-5  align-self-center">
<p class="title">Dept</p>
</div>
<div class="col-3 p-5 align-self-center">
<p class="title">Subject</p>
</div>
<div class="col-3 p-5  align-self-center">
<p class="title">Room</p>
</div>
<div class="col-3 p-5  align-self-center">
<p class="title">&nbsp;</p>
</div>
</div>

{#each deptList as dept,index}
<div class="row p-5">

<div class="col-3 p-5  align-self-center">
{#if !deptFlag[index]["dept"]}
<input type="text" placeholder="dept"  bind:value={dept["dept"]}/>
{/if}
{#if deptFlag[index]["dept"]}
<input class="input-error" type="text" placeholder="dept"  bind:value={dept["dept"]}/>
{/if}
</div>

<div class="col-3 p-5  align-self-center">
{#if !deptFlag[index]["subject"]}
<input type="text" placeholder="subject"  bind:value={dept["subject"]}/>
{/if}
{#if deptFlag[index]["subject"]}
<input class="input-error" type="text" placeholder="subject"  bind:value={dept["subject"]}/>
{/if}
</div>

<div class="col-3 p-5  align-self-center">
{#if !deptFlag[index]["room"]}
<input type="text" placeholder="room"  bind:value={dept["room"]}/>
{/if}
{#if deptFlag[index]["room"]}
<input class="input-error" type="text" placeholder="room"  bind:value={dept["room"]}/>
{/if}
</div>

<div class="col-3 p-5  align-self-center">
<button class="btn btn-square btn-danger rounded-circle" on:click={()=>deleteRow(index)} type="button">
 <i class="fas fa-times"></i>
 </button>
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
<button class="btn btn-success" on:click={storeDept} type="button">SAVE</button>

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

