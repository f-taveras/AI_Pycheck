<script lang="ts">
  import { onMount } from "svelte";
  import Detail from "./Detail.svelte";

  const Tutorials: string = import.meta.env.VITE_TUTORIAL_API;

  interface Item {
    id: number;
    title: string;
    description: string;
  }

  let items: Item[] = [];
  let selectedItem: Item | null = null;

  onMount(async () => {
    try {
      const response: Response = await fetch(Tutorials);
      if (response.ok) {
        const data: Item[] = await response.json();
        items = data;
      } else {
        console.error("Failed to fetch items");
      }
    } catch (error) {
      console.error("Failed to fetch items", error);
    }
  });

  function selectItem(item: Item) {
    selectedItem = item;
  }

  function goBack() {
    selectedItem = null;
  }
</script>

<main class="container">
  {#if !selectedItem}
    <ul class="item-list">
      {#each items as item (item.id)}
        <li class="item">
          <button on:click={() => selectItem(item)} class="item-button">
            {item.id}. {item.title}
          </button>
          - {item.difficulty}
        </li>
      {/each}
    </ul>
  {:else}
    <Detail item={selectedItem} goBack={goBack} />
  {/if}
</main>

<style>
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }

  .item-list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
  }

  .item {
    padding: 16px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .item-button {
    width: 80%;
    padding: 12px;
    color: #fff;
    border: none;
    border-radius: 8px;
    font-size: 20px;
    cursor: pointer;
    transition: background-color 0.3s;
    font-family: "Blippo", fantasy;
    font-weight: 800;
  }

  .item-button:hover {
    background-color: #0056b3;
  }
</style>
