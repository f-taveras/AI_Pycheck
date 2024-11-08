<script lang="ts">
    import { onMount } from "svelte";

    const Tutorials_api: string = import.meta.env.VITE_TUTORIAL_API;

    let items = [];
    let selectedItem = null;

    // fetching data from api
    onMount(async () => {
        try {
            const response = await fetch(Tutorials_api);
            if (response.ok) {
                items = await response.json();
            } else {
                console.error("Failed to fetch items");
            }
        } catch (error) {
            console.error("Failed to fetch items", error);
        }
    });

    function selectItem(item) {
        selectedItem = item;
    }

    function goBack() {
        selectedItem = null;
    }
</script>

<main class="container">
    {#if !selectedItem}
        <div class="tutorial-list">
            <ul class="item-list">
                {#each items as item (item.id)}
                    <li class="item">
                        <button
                            on:click={() => selectItem(item)}
                            class="item-button"
                        >
                            {item.title}</button
                        >
                    </li>
                {/each}
            </ul>
        </div>
    {:else}
        <div class="details">
            <button on:click={goBack} class="back-button">Go back</button>
            <h3>{selectedItem.title}</h3>
            <p>{selectedItem.description}</p>
            <p>{selectedItem.difficulty}</p>
        </div>
    {/if}
</main>

<style>
    .container {
        /* display: flex;
        flex-direction: column;
        align-items: center; */
        gap: 1rem;
        background-color: #1c1c22;
        height: 100vh;
    }
    .item-list {
        display: grid;
        grid-template-columns: 1fr;
        gap: 16px;
    }

    @media (min-width: 768px) {
        .item-list {
            grid-template-columns: repeat(2, 1fr);
        }
    }
</style>
