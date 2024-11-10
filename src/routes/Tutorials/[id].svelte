<script lang="ts">
    import { onMount } from "svelte";
    import ace from "ace-builds/src-noconflict/ace";
    import "ace-builds/src-noconflict/mode-python";
    import "ace-builds/src-noconflict/theme-monokai";
    import tutorials from "$lib/data/tutorials.json";
    import { page } from "$app/stores";
  
    let editorDiv: HTMLElement;
    let tutorial = null;
    let code = "# Write your Python code here";
  
    // Get the tutorial ID from the URL
    const tutorialId = parseInt($page.params.id);
  
    // Find the tutorial data by ID
    tutorial = tutorials.find((t) => t.id === tutorialId);
  
    // Initialize Ace Editor
    onMount(() => {
      const editor = ace.edit(editorDiv);
      editor.setTheme("ace/theme/monokai");
      editor.session.setMode("ace/mode/python");
      editor.setValue(code);
      editor.session.on("change", () => {
        code = editor.getValue();
      });
    });
  </script>
  
  <div class="detail-container">
    {#if tutorial}
      <button on:click={() => history.back()} class="back-button">Go Back</button>
      <h2>{tutorial.title}</h2>
      <p>{tutorial.description}</p>
  
      <!-- Ace Editor -->
      <div class="editor-container">
        <div id="editor" bind:this={editorDiv}></div>
      </div>
    {:else}
      <p>Tutorial not found.</p>
    {/if}
  </div>
  
  <style>
    .detail-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
      text-align: center;
    }
  
    .editor-container {
      margin-top: 20px;
      width: 100%;
      height: 400px;
    }
  
    #editor {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      border-radius: 8px;
    }
  
    .back-button {
      padding: 10px 20px;
      background-color: #0056b3;
      color: #fff;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      margin-bottom: 20px;
    }
  
    .back-button:hover {
      background-color: #5a6268;
    }
  </style>
  