<script>
  import { gameTags } from "../stores/gameScore";

  const unique = (value, index, self) => {
    return self.indexOf(value) === index;
  };
  
</script>

<div class="container">
  <h1>Rangering</h1>
  <div class="tags">
    {#each gameTags.map((i) => i.tag).filter(unique) as tag, i}
      <div
        style="background-color: {gameTags[
          gameTags.map((i) => i.tag).indexOf(tag)
        ].color};"
        class="tag"
      >
        <p class="title">{tag}</p>
      </div>
    {/each}
  </div>
</div>

<style type="scss">
  .container {
    padding-bottom: 20px;
  }
  .tags {
    display: flex;
    flex-direction: column;
    max-width: 150px;
    justify-content: center;
    margin-left: auto;
    margin-right: auto;
    gap: 10px;

    .tag {
      padding: 10px 6px;
      text-align: center;
      display: inline-flex;
      border-radius: 6px;
      justify-content: center;

      .title {
        text-align: center;
        font-family: ProductL;
        margin: 0;
      }
    }
  }
</style>
