<!-- Popup.svelte -->
<script lang="ts">
  export let header: string = "Hi";
  export let body: string = "this is the body element";
  export let listBody: string = "Dette er en liste \n og dette også";
</script>

<h1>{header}</h1>
<p>{body}</p>

<ul>
{#each listBody.split("\n") as elm}
    <li>{elm}</li>
{/each}
</ul>

<style>
    
    ul {
      text-align: left;
      display: inline-flex;
      flex-direction: column;
      gap: 10px
    }

</style>