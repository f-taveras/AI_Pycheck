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
  {console.log(items)}
  <ul class="item-list">
    {#each items as item (item.id)}
      <li class="item-link">
        <div class="division">
          {item.number}.
          <a href={`/tutorials/${item.id}/`} class="">{item.title}</a>
        </div>
        {item.difficulty}
      </li>
    {/each}
  </ul>
</main>

<style>
  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }

  .item-list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
    column-gap: 20rem 
  }

  .item-link {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 12px;
    color: #fff;
    border-radius: 8px;
    font-size: 20px;
    cursor: pointer;
    transition: background-color 0.3s;
    font-family: "Blippo", fantasy;
    font-weight: 800;
  }

  .item-link:hover {
    background-color: #0056b3;
  }

   main{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%
  }
</style>
