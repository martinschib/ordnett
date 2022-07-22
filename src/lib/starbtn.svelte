<script>
  import { gameTags } from "../stores/gameScore";

  const handleClick = () => {
    alert("Nivåer: \n" + gameTags.map((t) => t.tag).join(", "));
  };
</script>

<button on:click={() => handleClick()}>
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

    cursor: pointer;

    box-shadow: -2px 12px 16px -13px rgba(0, 0, 0, 0.24);
    -webkit-box-shadow: -2px 12px 16px -13px rgba(0, 0, 0, 0.24);
    -moz-box-shadow: -2px 12px 16px -13px rgba(0, 0, 0, 0.24);

    .img {
      height: 20px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -60%);
      width: 20px;
    }
  }
</style>
