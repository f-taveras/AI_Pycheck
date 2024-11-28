<script lang="ts">
    import { onMount } from "svelte";
  
    let result: string = "";
    let loading: boolean = false;
    let error: string | null = null;
  
    const fetchResponse = async () => {
      loading = true;
      error = null;
  
      try {
        const response = await fetch("/testLlama/api", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "mistral:latest",
            prompt: "The exercise comes first (with a few extras if you want the extra challenge or want to spend more time), followed by a discussion. Enjoy!Ask the user for a number. Depending on whether the number is even or odd, print out an appropriate message to the user. Hint: how does an even / odd number react differently when divided by 2?  I answered: num = int(input('Enter a number: ')) print(nif print(num, , if this is correct, respond yes, if not, respond no. do not help with the code ONLY",
          }),
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const json = await response.json();
        if (json.error) {
          throw new Error(json.error);
        }
        result = json.response;
      } catch (err) {
        error = `Error: ${err.message}`;
      } finally {
        loading = false;
      }
    };
  
    onMount(fetchResponse);
  </script>
  
  <main>
    <h1>Ask Llama 3.2</h1>
    {#if loading}
      <p>Loading...</p>
    {:else if error}
      <p class="error">{error}</p>
    {:else if result}
      <p>Response: {result}</p>
      {console.log(result)}
    {:else}
      <p>No data yet.</p>
    {/if}
  </main>
  
  <style>
    .error {
      color: red;
    }
  </style>
  