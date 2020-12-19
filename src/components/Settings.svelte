<script>
  import * as state from "./../scripts/state";

  import SettingsVersion from "./SettingsVersion.svelte";
  import SettingsPeriod from "./SettingsPeriod.svelte";
  import SettingsYear from "./SettingsYear.svelte";
</script>

<div class="content-wrapper">


<div class="card"> 
  <h2 class="card-title">Version Control</h2>  
  <SettingsVersion/>
</div>

<div class="card"> 
  <h2 class="card-title">Timetable Structure</h2>  
  <SettingsPeriod/>
</div>


<div class="card"> 
  <h2 class="card-title">Timetable Basedata</h2>
</div>


<div class="card"> 
  <h2 class="card-title">Linking Subjects and Rooms to Departments</h2>

</div>

<div class="card"> 
  <h2 class="card-title">Year List</h2>
  <SettingsYear/>
</div>




</div> <!-- end of container-->

