<script>
  import * as file from "./../scripts/file";
  import * as setup from "./../scripts/setup";
  import * as state from "./../scripts/state";

  /* versions */
  let versionKeys = state.getVersionKeys();

  if (!state.getActive()) state.setActive(versions[0]);

  let active = state.getActive();
  let activeIndex = versionKeys.indexOf(active);
  console.log(versionKeys);
  let versions = versionKeys.map(el => ({
    key: el,
    name: state.getVersion(el).name
  }));

  let selectVersion = index => {
    state.setActive(versions[index].key);
    active = state.getActive();
    activeIndex = index;
  };

  let nameFlag = [false, false, false, false, false];
  let error = "";
  let storeName = index => {
    //state.putName(versionKey, version[versionKey].name);
    let pattern = /^[\w\-\s]+$/;
    if (pattern.test(versions[index].name)) {
      let version = state.getVersion(versions[index].key);
      console.log(version);
      version.name = versions[index].name;
      state.putVersion(versions[index].key);
      nameFlag[index] = false;
      error = "";
    } else {
      nameFlag[index] = true;
      error = "name";
    }
  };

  let disabled = "disabled";
  let copyVersionKey = "";
  let copyVersion = index => {
    copyVersionKey = versions[index].key;
    disabled = "";
  };

  let pasteVersion = index => {
    let copy = state.getVersion(copyVersionKey);
    let pasteVersionKey = versions[index].key;
    state.putVersion(pasteVersionKey, copy);
    disabled = "disabled";
    copyVersionKey = "";
    versions[index].name = copy.name;
  };

  let clearIndex = -1;
  let clearData = index => {
    error = "delete";
    clearIndex = index;
  };

  let confirmClear = () => {
    if (clearIndex !== -1) {
      state.deleteData(versions[clearIndex].key);
    }
    error = "";
    clearIndex = -1;
  };

  let resetIndex = -1;
  let resetVersion = index => {
    resetIndex = index;
    error = "reset";
  };

  let confirmReset = () => {
    if (resetIndex !== -1) {
      state.removeStorage(versions[resetIndex].key);
      state.initVersion(versions[resetIndex].key);
      error = "";
      versions[resetIndex].name = "v" + (resetIndex + 1);
      resetIndex = -1;
    }
  };

  let downloadVersion = index => {
    let content = JSON.stringify(state.getVersion(versions[index].key));
    file.download(content, "version_" + versions[index].name + ".ttv");
  };

  let files = null;
  let uploadIndex = -1;
  let uploadVersion = index => {
    error = "upload";
    uploadIndex = index;
  };

  let uploadVersionFile = () => {
    file.read(files[0], res => {
      console.log(res);
      let version = JSON.parse(res);
      state.putVersion(versions[uploadIndex].key, version);
      versions[uploadIndex].name = version.name;
      uploadIndex = -1;
      error = "";
    });
  };
</script>



<div>&nbsp;</div>
{#if error===""}
<div class="alert alert-primary" role="alert">
<p><b>{state.getVersion(versions[activeIndex].key).name}</b>&nbsp;({active}) is active.</p>       
</div>
{/if}
{#if error==="name"}
<div class="alert alert-danger" role="alert">
<p>Invalid version name. Letters/Numbers/- only please.</p>       
</div>
{/if}
{#if error==="delete"}
<div class="alert alert-danger" role="alert">
<p>Do you really want to clear data? (Can't be undone.)</p>       
<button on:click={confirmClear} class="btn btn-danger">CLear</button>

<button on:click={()=>error=""} class="btn">Cancel</button>
</div>
{/if}

{#if error==="reset"}
<div class="alert alert-danger" role="alert">
<p>Do you really want to clear data and settings? (Can't be undone.)</p>       
<button on:click={confirmReset} class="btn btn-danger">Clear</button>

<button on:click={()=>error=""} class="btn">Cancel</button>
</div>
{/if}

{#if error==="upload"}
<div class="alert alert-secondary" role="alert">
<p>Upload a .ttv file</p>
<div class="custom-file">

<label for="file-input-1">Choose file</label>
<input type="file" bind:files id="file-input-1" accept=".ttv" on:change={e => uploadVersionFile() }/>
</div>
</div>
{/if}
  
  {#each versions as item,i}
  <div class="row p-5">
  {#if item.key===active}
  <div on:click={()=>selectVersion(i)} class="version active col-2 align-self-center">{item.key}</div>
  {/if}
  {#if item.key!==active}
  <div on:click={()=>selectVersion(i)} class="version col-2 align-self-center">{item.key}</div>
  {/if}
  <div class="col-2 p-5">

  {#if !nameFlag[i]}
  <input class="form-control" placeholder="letters/numbers only" bind:value={item.name}/>
  {/if}
  {#if nameFlag[i]}
  <input class="form-control input-error" placeholder="letters/numbers only" bind:value={item.name}/>
  {/if}
  
  </div>
  
  <div class="col-1 align-self-center">
  <button on:click={()=>storeName(i)}  class="btn btn-square rounded-circle" type="button">
					<i class="fas fa-save" aria-hidden="true"></i>
					<span class="sr-only">Save</span>
	</button>			
  </div>
   <div class="col-1">
  </div>
  <div class="col-auto align-self-center">
  
  
  <button on:click={()=>downloadVersion(i)}  class="btn btn-square rounded-circle" type="button">
					<i class="fas fa-download" aria-hidden="true"></i>
					<span class="sr-only">Download</span>
	</button>			
  
  <button on:click={()=>uploadVersion(i)} class="btn btn-square rounded-circle" type="button">
					<i class="fas fa-upload" aria-hidden="true"></i>
					<span class="sr-only">Upload</span>
	</button>			
  
  <button on:click={()=>copyVersion(i)} class="btn btn-square rounded-circle" type="button">
					<i class="fas fa-clone" aria-hidden="true"></i>
					<span class="sr-only">Copy</span>
	</button>

  <button on:click={()=>pasteVersion(i)}  disabled={disabled} class="btn btn-square rounded-circle" type="button">
					<i class="fas fa-paste" aria-hidden="true"></i>
					<span class="sr-only">Paste</span>
	</button>			

  <button on:click={()=>clearData(i)}  class="btn btn-square btn-danger rounded-circle" type="button">
					<i class="fas fa-undo" aria-hidden="true"></i>
					<span class="sr-only">Paste</span>
	</button>			

<button on:click={()=>resetVersion(i)}  class="btn btn-square btn-danger rounded-circle" type="button">
					<i class="fas fa-times" aria-hidden="true"></i>
					<span class="sr-only">Paste</span>
	</button>			


  
  </div>
  
  </div>
  {/each}




<style>
  .version {
    cursor: pointer;
    color: #1890ff;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }

  .active {
    border-top: 1px solid rgba(24, 144, 255, 0.2);
    background-color: rgba(24, 144, 255, 0.2);
    border-bottom: 1px solid red;
  }

  .input-error {
    border: 2px solid #ff4d4f;
  }

  input {
    border: 2px solid #e1e1e1;
    border-radius: 5px;
    width: 10rem;
  }

  input:focus {
    border: 2px solid #1890ff;
    outline: none;
  }
</style>