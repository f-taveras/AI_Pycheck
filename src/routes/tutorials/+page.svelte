<script lang="ts">
  import tutorials from "$lib/data/tutorials.json";

  interface Item {
    id: number;
    number: string;
    title: string;
    description: string;
    solution: string;
    difficulty: string;
    stack: string;
  }

  let items: Item[] = tutorials;
</script>

<main class="container">
  <ul class="item-list">
    {#each items as item (item.id)}
      <li class="item">
        <a href={`/tutorials/${item.id}/`} class="item-link">
          {item.number}. {item.title} - {item.difficulty}
        </a>
      </li>
    {/each}
  </ul>
</main>

<style>
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }

  .item-list {
    list-style: none;
    padding: 0;
  }

  .item {
    margin-bottom: 10px;
  }

  .item-link {
    text-decoration: none;
    color: #007bff;
    font-size: 20px;
    font-weight: bold;
  }

  .item-link:hover {
    color: #0056b3;
  }
</style>
