<script>
  export let row;
  export let col;

  import * as state from "./../scripts/state";
  import * as check from "./../scripts/check";

  let data = state.getData();

  let value = {
    class: data[row].row[col].c,
    staff: data[row].row[col].s,
    room: data[row].row[col].r
  };

  let flag = { class: false, staff: false, room: false };

  let store = () => {
    console.log("Cell.store():");
    flag = check.checkInput(value);

    if (flag.class === false && flag.staff === false && flag.room === false) {
      data[row].row[col].c = value.class.replace(" ", "");
      data[row].row[col].s = value.staff.replace(" ", "").toUpperCase();
      data[row].row[col].r = value.room.replace(" ", "");
      state.putRow(row, data[row]);

      check.updateErrors(col);

      //console.log(data);
      row = -1;
      col = -1;
    }
  };

  let cancel = () => {
    row = -1;
    col = -1;
  };
</script>


<div class="cell text-left">

<div  class="cell-item">
{#if !flag.class}
<input type="text" placeholder="subject/set"  bind:value={value.class}/>
{/if}
{#if flag.class}
<input class="input-error" type="text" placeholder="subject/set"  bind:value={value.class}/>
{/if}

</div>
<div  class="cell-item">
{#if !flag.staff}
<input type="text" placeholder="staff"  bind:value={value.staff}/>
{/if}
{#if flag.staff}
<input class="input-error" type="text" placeholder="staff"  bind:value={value.staff}/>
{/if}

</div>
<div  class="cell-item">
{#if !flag.room}
<input type="text" placeholder="room"  bind:value={value.room}/>
{/if}
{#if flag.room}
<input class="input-error" type="text" placeholder="room"  bind:value={value.room}/>
{/if}

</div>
<div class="cell-item">
<button class="btn btn-sm btn-primary" on:click={store}>Store</button>
<button class="btn btn-sm" on:click={cancel}>Cancel</button>
</div>

</div>



<style>
  .cell-item {
    padding: 0.5rem;
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

  .cell {
    cursor: pointer;
  }
</style>