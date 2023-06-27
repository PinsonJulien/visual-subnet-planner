<script lang="ts">
  import type Subnet from './utils/network/models/subnet/subnet';
  import IPv4 from './utils/network/models/IPv4/IPv4';
  import Planner from './utils/network/models/planner/planner';

  let ip: IPv4 = null;
  let subnets: Subnet[] = [];
  let lastNetwork: IPv4 = null;
  let machinesList: number[] = [];
  let planner: Planner = null;
  let isInputDisabled = false;
  
  const onIpChange = (event) => {
    ip = IPv4.fromString(event.target.value);
  };

  const addNewMachines = (event) => {
    let newMachine = parseInt(event.target.value);
    event.target.value = null;
    event.target.focus = false;
    
    if (!newMachine || Number.isNaN(newMachine)) 
      return;

    machinesList = [...machinesList, newMachine];
  };

  const onMachineListChange = (event, index) => {
    const updatedMachine = parseInt(event.target.value);

    if (!updatedMachine || Number.isNaN(updatedMachine) || updatedMachine === 0) {
      machinesList.splice(index, 1);
    } 
    else {
      machinesList[index] = updatedMachine;
    }

    machinesList = [...machinesList];
  };

  $: {
    if (ip) {
      planner = new Planner(ip, machinesList);
      subnets = planner.subnets;
      lastNetwork = planner.lastNetwork;

      isInputDisabled = (lastNetwork.toNumber() == planner.lastPossibleIp.toNumber());
    }
  }

</script>

<main>
  <div>
    <input type="text" placeholder="192.168.0.0/24" class="input w-full max-w-xs" on:change={(event) => onIpChange(event)}/>
  </div>

  <div class="overflow-x-auto">
    <div>
      <p>Netmask : <strong>{planner && planner.netmask}</strong></p>
      <p>Broadcast : <strong>{planner && planner.broadcast.toString()}</strong></p>
      <p>Last available IP: <strong>{planner && planner.lastPossibleIp.toString()}</strong></p>
    </div>

    <table class="table">
      <!-- head -->
      <thead>
        <tr>
          <th>Number of machines</th>
          <th>Max number of addresses</th>
          <th>CIDR</th>
          <th>Subnet mask</th>
          <th>Magic number</th>
          <th>Network address</th>
          <th>Broadcast</th>
        </tr>
      </thead>
      <tbody>

        {#each subnets as subnet, i}
          <tr>
            <td>
              <input 
                type="number" 
                placeholder="Number of machines" 
                class="input w-full max-w-xs" 
                on:change={(event) => onMachineListChange(event, i)}
                value={subnet.machines}
                min=0
              />
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
              { subnet.netmask.magicNumber }
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
            <input 
              type="number" 
              placeholder="Number of machines" 
              class="input w-full max-w-xs" 
              on:change={(event) => addNewMachines(event)}
              min=0
              disabled={isInputDisabled}
            />
          </td>
          <td></td>
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
