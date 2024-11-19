<script lang="ts">
    
    export let item;
    import { goto } from "$app/navigation";
    import ace from "ace-builds";
    import "ace-builds/src-noconflict/mode-python";
    import "ace-builds/src-noconflict/theme-monokai";
    import { onDestroy, onMount } from "svelte";

    export let data;

    const tutorial = data?.tutorial;

    if (!tutorial) {
        throw new Error("Tutorial data not found");
    }

    let editor: HTMLElement;
    let code = item?.code || "# Write your Python code here";

    onMount(() => {
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
        console.log('code:',code);
    }


    async function WorkCheckAI(){
        const response = await fetch ('http://192.168.1.159:11434/api/generate',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                code: code
            })
        })
    }
</script>

<div class="details">
    
    <button  class="back-button"><a href="/" class="back-button">Go Back</a></button>
    <div class="description">
        <h3>{tutorial.title}</h3>
        <p>{tutorial.description}</p>
    </div>
    <div class="editor">
        <div id="editor" bind:this={editor}></div>
        <button on:click={handleCodeSumit}>Submit</button>
    </div>
</div>

<style>
    .details {
        padding: 20px;
        margin-top: 18px;
    }

    .description {
        font-size: 18px;
        font-weight: 800;
        font-family: "Blippo", fantasy;
    }
    .description h3 {
        margin: 10px;
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

    .editor {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    #editor {
        font-size: x-large;
        align-self: center;
        width: 80%;
        height: 400px;
        border: 1px solid #ccc;
    }
</style>
