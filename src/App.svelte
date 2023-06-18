<script lang="ts">
  import svelteLogo from './assets/svelte.svg'
  import viteLogo from '/vite.svg'
  import Counter from './lib/Counter.svelte'
  import type Subnet from './utils/network/models/subnet/subnet';
  import type IPv4 from './utils/network/models/IPv4/IPv4';
  import Planner from './utils/network/models/planner/planner';

  let ip: IPv4 = null;
  let subnets: Subnet[] = [];
  let lastNetwork: IPv4 = null;
  let machinesList: string[] = [];
  
  const onIpChange = (event) => {
    ip = event.target.value;
  };

  const addNewMachines = (event) => {
    console.log('input !')
    machinesList = [...machinesList, event.target.value];
  };

  const onMachineListChange = (event, index) => {
    machinesList[index] = event.target.value;
    machinesList = [...machinesList];
  };

  $: {
    console.log("changed !")

    let machinesAsNumber = machinesList.map((machine) => parseInt(machine));

    let planner = new Planner(ip, machinesAsNumber);
    subnets = planner.subnets;
    lastNetwork = planner.lastNetwork;
  }


</script>

<main>
  <div>
    <input type="text" placeholder="192.168.0.0/24" class="input w-full max-w-xs" on:change={(event) => onIpChange(event)}/>
  </div>

  <div class="overflow-x-auto">

    <table class="table">
      <!-- head -->
      <thead>
        <tr>
          <th>Number of machines</th>
          <th>Max number of addresses</th>
          <th>CIDR</th>
          <th>Subnet mask</th>
          <th>Network address</th>
          <th>Broadcast</th>
        </tr>
      </thead>
      <tbody>

        {#each subnets as subnet, i}
          <tr>
            <td>
              <input type="number" placeholder="Number of machines" class="input w-full max-w-xs" on:input={(event) => onMachineListChange(event, i)}/>
            </td>
            <td>
              {subnet.maxAddresses}
            </td>
            <td>
              { subnet.cidr }
            </td>
            <td>
              { subnet.netmask.toString() }
            </td>
            <td>
              { subnet.network.toString() }
            </td>
            <td>
              { subnet.broadcast.toString() }
            </td>
          </tr>
        {/each}

        <tr>
          <td>
            <input type="number" placeholder="Number of machines" class="input w-full max-w-xs" on:input={(event) => addNewMachines(event)}/>
          </td>
          <td></td>
          <td></td>
          <td></td>
          <td>
            { lastNetwork && lastNetwork.toString() }
          </td>
          <td></td>
        </tr>

      </tbody>
    </table>

  </div>


</main>
