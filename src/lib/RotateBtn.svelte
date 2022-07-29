<script>
  import { word } from "../stores/word";
  import { pattern } from "../stores/pattern";
  import { ordnett } from "../stores/ordnett";

  import { elasticOut } from "svelte/easing";

  // resets each time button is clicked. When updated do the animation.
  let unique = {};

  function spin(node, { duration }) {
    return {
      duration,
      css: (t) => {
        const eased = elasticOut(t);

        return `
					transform: scale(${eased}) rotate(${eased * 1080}deg);`;
      },
    };
  }

  // lookup table of how the letters should rotate and still make the game playable
  const rotationLookup = {
    0: 2,
    1: 5,
    2: 8,
    3: 1,
    4: 4,
    5: 7,
    6: 0,
    7: 3,
    8: 6,
  };

  function handleRotate() {
    let newRotatedBoard = new Array(9).fill().map((v, i) => {
      return $ordnett[rotationLookup[i]];
    });
    ordnett.set(newRotatedBoard.join(""));
    word.reset();
    pattern.reset();
    unique = {};
  }

</script>

<button class="reset" on:click={() => handleRotate()}>
  {#key unique}
    <i in:spin={{ duration: 2000 }} class="fa fa-refresh" aria-hidden="true" />
  {/key}
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
