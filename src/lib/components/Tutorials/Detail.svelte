<script lang="ts">
    export let item;
    export let goBack: () => void;
  </script>
  
  <div class="details">
    <button on:click={goBack} class="back-button">Go Back</button>
    <div class="description">
      <h3>{item.title}</h3>
      <p>{item.description}</p>
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
  </style>
  