<script>
import { word } from "../stores/word";

  import { pattern } from "../stores/pattern";

  function handleReset() {
    word.reset()
    pattern.reset();
  }
</script>

<button class="reset" on:click={() => handleReset()}> <i class="fa fa-refresh" aria-hidden="true"></i>
</button>

<style>
  .reset {
    border: none;
    padding: 15px 15px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    background-color: #ffffff00;
    color: black;
    border-radius: 5px;
    touch-action: manipulation;

  }

  .reset:active {
    background-color: #c5c3c3;
  }
</style>
