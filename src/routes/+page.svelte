<script>
  import Tutorials from "./tutorials/+page.svelte"
  import NavBar from "$lib/components/NavBar/NavBar.svelte";
</script>

<main>
  <NavBar />
  <Tutorials />
</main>

<style>
  main {
    /* display: flex; */
    color: white;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    background-color: #1c1c22;
    height: 100vh;
  }
</style>
