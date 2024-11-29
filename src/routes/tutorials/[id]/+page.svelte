<script lang="ts">
    export let item;
    import { goto } from "$app/navigation";
    import ace from "ace-builds";
    import "ace-builds/src-noconflict/mode-python";
    import "ace-builds/src-noconflict/theme-monokai";
    import { onDestroy, onMount } from "svelte";

// api Ollama 
let result: string = "";
let loading: boolean = false;
let error: string | null = null;
let description: string = "";


const fetchResponse = async () => {
  loading = true;
  error = null;

  try {
    const response = await fetch("/tutorials/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify({
        model: "llama3.2",
        prompt: description,
    }),
});
if (!response.ok) {
      throw new Error (`HTTP error! Status: ${response.status}`);
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

// onMount(fetchResponse);





// mounting ace editor, neet to refactor to run as onMount(AceEditor)

export let data;

const tutorial = data?.tutorial;

if (!tutorial) {
    throw new Error("Tutorial data not found");
}

let editor: HTMLElement;
let code = item?.code || "# Write your Python code here";

onMount(() => {
        fetchResponse;
        const aceEditor = ace.edit(editor);
        aceEditor.setTheme("ace/theme/monokai");
        aceEditor.session.setMode("ace/mode/python");
        aceEditor.setValue(code);
        aceEditor.session.on("change", () => {
            code = aceEditor.getValue();
        });

        // onDestroy(() => {
            //     if (aceEditor) {
        //         aceEditor.destroy();
        //         aceEditor.container.remove();
        //     }
        // });
        
        
    });
    function handleCodeSumit() {
        description = `${tutorial.description}\n${code}`;
        console.log('description:',description);
        fetchResponse();
        // console.log('code:',code);
    }
</script>
<main>

    <button on:click={() => goto('/')} class="back-button">Go Back</button> 
    <div class="details">
        
        <div class="description">
            <!-- // Ollama test -->

            <!-- <h1>Ask Llama 3.2</h1> -->
    {#if loading}
      <p>Loading...</p>
    {:else if error}
      <p class="error">{error}</p>
    {:else if result}
      {console.log(result)}
    {:else}
      <p>No data yet.</p>
    {/if}
            
            <!-- end of ollama test  -->
            
            <h3>{tutorial.title}</h3>
            <p>{tutorial.description}</p>
        </div>
        <div class="editor">
            <div id="editor" bind:this={editor}></div>
            <button on:click={handleCodeSumit}>Submit</button>
        </div>
    </div>
    
</main>
<style>

    .details {
        padding: 20px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    button {
        
        padding: 10px 20px;
        background-color: #0056b3;
        color: #fff;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        margin-bottom: 20px;
        transition: background-color 0.3s;
        margin-top: 8px;

    }
    button:hover{
        background-color: blue;
    }
    .back-button {
        margin: 20px;
        
    }

    .back-button:hover {
        background-color: #5a6268;
    }
    main {
        background-color: #1c1c22;
        height: 100vh;
        color: white;
    }

    .description {
        display: flex;
        flex-direction: column;
        width: 80%;
        /* margin: 3rem; */
        font-size: 18px;
        font-weight: 800;
        font-family: "Blippo", fantasy;
    }
    .description h3 {
        
        /* margin-bottom: 10px; */
        font-weight: bolder;
        font-size: 3em;
        text-align: center;
    }
    .description p {
        margin: 10px;
        /* margin-bottom: 10px; */
        font-weight: bolder;
        text-align: left;
        margin: 3em;
    }


    /* .editor {
        display: flex;
        justify-content: center;
        align-items: center;
    } */

    #editor {
        font-size: x-large;
        /* align-self: center; */
        width: 100rem;
        height: 400px;
        border: 1px solid #ccc;
    }
</style>
