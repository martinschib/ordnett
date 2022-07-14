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
        <p>{$gameMessage.message}</p>
      </span>
    {/key}
  {/if}
</div>

<style type="scss">
  .cotainer {
    width: 100%;
    margin-bottom: 20px;
    background-color: aquamarine;
    position: relative;
    margin-left: auto;
    margin-right: auto;

    .message {
      padding: 7px 15px;
      border-radius: 15px;
      font-weight: 500;
      position: absolute;
      display: inline-flex;
      color: white;
      top: 0;
      left: 50%;
      transform: translate(-50%, -50%);

      p {
        margin: 0;
        white-space: nowrap;
      }
    }
  }
</style>
