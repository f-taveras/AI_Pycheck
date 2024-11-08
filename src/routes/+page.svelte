<script>
    let pythonCode = '';
    
    function handleSubmit() {
      // Temporary action to log code; we’ll hook this up to the OpenAI API later
      console.log("Python Code:", pythonCode);
    }
  </script>
  
  <main>
    <h1>Not the one</h1>
    <textarea bind:value={pythonCode} rows="10" cols="50" placeholder="Enter Python code here"></textarea>
    <button on:click={handleSubmit}>Run Code</button>
    <prompt-list />
  </main>
  
  <style>
    main {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
    }
    textarea {
      width: 100%;
      max-width: 600px;
    }
  </style>
  