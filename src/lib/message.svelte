<script lang="ts">
  import { fly, fade } from "svelte/transition";
  import { gameMessage } from "../stores/gameMessage";

</script>

<div class="cotainer">
  {#if $gameMessage.message}
    {#key $gameMessage.message}
      <span
        class="message"
        style="display: inline-block; background-color: {$gameMessage.color}"
        in:fly={{ y: -20 }}
        out:fade
      >
        {$gameMessage.message}
      </span>
    {/key}
  {/if}
</div>

<style>
  .message {
    padding: 7px 15px;
    border-radius: 15px;
    font-weight: 500;
    position: absolute;
    color: white;
    top: 0;
    left: 50%;
    max-width: 300px;
    transform: translate(-50%, -50%);
  }

  .cotainer {
    position: relative;
    margin-left: auto;
    margin-right: auto;
  }
</style>
