<script>
  import { gameTag } from "../stores/gameScore";
 
  import { bind } from "svelte-simple-modal";
  import { modal } from "../stores/modal";
  import Rating from "./Rating.svelte";
  
  const handleClick = () => {
    showModal();
  };
  const showModal = () => modal.set(bind(Rating, { message: "It's a modal!" }));
</script>

<button
  on:click={() => handleClick()}
  style="background-color: {$gameTag.color}"
>
  <img alt="star" class="img" src="star.svg" />
</button>

<style lang="scss">
  button {
    color: black;
    align-self: end;
    display: block;
    height: 35px;
    width: 35px;
    border-radius: 50%;
    border: none;
    position: relative;
    background-color: #bfe069;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
    cursor: pointer;

    .img {
      height: 20px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-48%, -55%);
      width: 20px;
    }
  }
</style>
