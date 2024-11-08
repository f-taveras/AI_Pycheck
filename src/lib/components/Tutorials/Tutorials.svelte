<script lang="ts">
    import { onMount } from "svelte";
  
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
              {item.title}
            </button>
          </li>
        {/each}
      </ul>
    {:else}
      <div class="details">
        <button on:click={goBack} class="back-button">Go Back</button>
        <h3>{selectedItem.title}</h3>
        <p>{selectedItem.description}</p>
      </div>
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
      grid-template-columns: 1fr;
      gap: 8px;
    }
  
    /* Two-column layout for medium and larger screens */
    @media (min-width: 768px) {
      .item-list {
        grid-template-columns: repeat(2, 1fr);
      }
    }
  
    .item {
      /* background-color: #f9f9f9; */
      padding: 16px;
      /* border-radius: 8px; */
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
  
    .item-button {
      width: 100%;
      padding: 12px;
      /* background-color: #007bff; */
      color: #fff;
      border: none;
      border-radius: 8px;
      font-size: 16px;
      cursor: pointer;
      transition: background-color 0.3s;
    }
  
    .item-button:hover {
      background-color: #0056b3;
    }
  
    .details {
      text-align: center;
      padding: 20px;
    }
  
    .back-button {
      padding: 10px 20px;
      background-color: #0056b3;
      color: #fff;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      margin-bottom: 20px;
      transition: background-color 0.3s;
    }
  
    .back-button:hover {
      background-color: #5a6268;
    }
  </style>
  