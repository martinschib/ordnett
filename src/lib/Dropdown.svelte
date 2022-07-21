<script lang="ts">
  export let title: string;
  let open = false;
</script>

<div class="container">
  <div class="title" on:click={() => (open = !open)}>
    <h3>{title || "min tittel"}</h3>
    {#if open}
      <img alt="pil opp" src="arrow_up.svg" />
    {:else}
      <img alt="pil ned" src="arrow_down.svg" />
    {/if}
  </div>
  {#if open}
    <div>
      <slot />
    </div>
  {/if}
</div>

<style type="scss">
  .container {
    text-align: left;
    max-width: 500px;
    margin-left: auto;
    margin-right: auto;
    .title {
      cursor: pointer;
      display: flex;
      gap: 10px;
      font-family: Product;
      font-size: 20px;
      
      h3 {
        margin: 15px 0;
      }
    }
  }
</style>
