<script>
  import * as file from "./../scripts/file";

  let files;

  export let fileType;

  export let fileData;

  let readFile = () => {
    file.read(files[0], res => {
      fileData = res;
    });
  };
</script>



<div class="custom-file">
    <input type="file" bind:files id="file-input-1" on:change={e => readFile() }>
    <label for="file-input-1">Upload file</label>
</div>


