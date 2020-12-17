<script>
  import * as file from "./../scripts/file";
  import * as setup from "./../scripts/setup";
  import * as state from "./../scripts/state";

  /* versions */
  let version = state.getVersionObj();
  let versionKeys = Object.keys(version);
  let versionText = "Select an action to change a version";

  let disabled = "disabled";

  let status = state.getStatus();

  let selectVersion = versionKey => {
    console.log(versionKey);
    status.version = versionKey;
    state.updateVersion(versionKey);
  };

  let storeName = versionKey => {
    state.putName(versionKey, version[versionKey].name);
  };
</script>



<div>&nbsp;</div>
<div class="alert alert-primary" role="alert">
<p>Active Version: {status.version}</p>       
</div>

  
  {#each versionKeys as item}
  <div class="row p-5">
  {#if item===status.version}
  <div on:click={()=>selectVersion(item)} class="version active col-2 align-self-center">{item}</div>
  {/if}
  {#if item!==status.version}
  <div on:click={()=>selectVersion(item)} class="version col-2 align-self-center">{item}</div>
  {/if}
  <div class="col-2 p-5">
  <input class="form-control" bind:value={version[item].name}/>
  </div>
  
  <div class="col-1 align-self-center">
  <button on:click={()=>storeName(item)} class="btn btn-square rounded-circle" type="button">
					<i class="fas fa-save" aria-hidden="true"></i>
					<span class="sr-only">Save</span>
	</button>			
  </div>
   <div class="col-1">
  </div>
  <div class="col-auto align-self-center">
  
  
  <button onclick="" class="btn btn-square rounded-circle" type="button">
					<i class="fas fa-download" aria-hidden="true"></i>
					<span class="sr-only">Download</span>
	</button>			
  
  <button onclick="" class="btn btn-square rounded-circle" type="button">
					<i class="fas fa-upload" aria-hidden="true"></i>
					<span class="sr-only">Upload</span>
	</button>			
  
  <button onclick="" class="btn btn-square rounded-circle" type="button">
					<i class="fas fa-clone" aria-hidden="true"></i>
					<span class="sr-only">Copy</span>
	</button>

  <button onclick="" disabled={disabled} class="btn btn-square rounded-circle" type="button">
					<i class="fas fa-paste" aria-hidden="true"></i>
					<span class="sr-only">Paste</span>
	</button>			
  			
  <button onclick="" class="btn btn-square rounded-circle" type="button">
					<i class="fas fa-trash-restore" aria-hidden="true"></i>
					<span class="sr-only">Reset</span>
	</button>

  
  
  </div>
  
  </div>
  {/each}




<style>
  .version {
    cursor: pointer;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }

  .active {
    border-top: 1px solid rgba(24, 144, 255, 0.2);
    background-color: rgba(24, 144, 255, 0.2);
    border-bottom: 1px solid red;
  }
</style>