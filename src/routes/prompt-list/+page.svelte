<script>
import { onMount } from "svelte";

let items = [];
let selectedItem = null;

onMount(async () => {
    try{
        const response = await fetch("http://localhost:8000/tutorials/")
        if (response.ok){
            items = await response.json();
            } else {
                console.error('Failed to fetch items');
            }
    } catch (error) {
        console.error('Failed to fetch items', error);
    }
});



    function selectItem(item) {
        selectedItem = item;
    }

    function goBack() {
        selectedItem = null;
    }
</script>
<main>

    {#if !selectedItem}
    <div>
        <h2>Practice Your Python Skills</h2>
        
        <ul>
            {#each items as item}
            <li>
                <button on:click={() => selectItem(item)}>
                    {item.title}</button
                    >
                </li>
                {/each}
            </ul>
        </div>
        {/if}
    </main>
