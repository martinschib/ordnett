<script>
  import { game } from "../stores/gameScore";

  let open = false;
</script>

<div class="center">
  {#if open}
    <div class="btn" on:click={() => (open = false)} style="padding: 7px 20px">
        <div class="row">
      <p><b>Mine ord:</b></p>
      <i class="fa-solid fa-caret-up fa-lg"></i>
    </div>
      <ul>
        {#each $game.words as word}
          <li>{word}</li>
        {/each}
      </ul>
    </div>
  {:else}
    <div class="btn row" on:click={() => (open = true)}>
      <p>Mine ord:</p>
      <i class="fa-solid fa-caret-down fa-lg" />
    </div>
  {/if}
</div>

<style>
  .center {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 200px;
    background-color: #e0e0e0;
    border-radius: 5px;
  }

  .row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .btn {
    border: none;
    padding: 0px 20px;
    text-align: left;
    margin-left: auto;
    margin-right: auto;


    font-size: 16px;
    margin: 4px 2px;

    cursor: pointer;
  }
</style>
