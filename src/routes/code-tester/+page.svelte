<script lang="ts">
   
    let pythonCode = "";

    function handleSubmit() {
        console.log("Python Code:", pythonCode);
    }
</script>

<main>
    <h1>Python Code Tester</h1>
    <textarea
        bind:value={pythonCode}
        rows="10"
        cols="50"
        placeholder="Enter your codehere"
        name=""
        id=""
    ></textarea>
    <button on:click={handleSubmit}>Run Code</button>
</main>
