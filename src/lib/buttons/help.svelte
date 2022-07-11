<script>
  import { getContext } from "svelte";
  import Popup from "../Popup.svelte";
  const { open } = getContext("simple-modal");

  const showSurprise = () =>
    open(Popup, {
      header: "Hvordan spille ordnettet?",
      body: "",
      listBody: "Ordet må minst være 4 bokstaver \n Du kan bruke alle 9 bokstavene i nettet \n Du kan kun bruke en bokstav en gang \n Du kan bruke tastatur på PC/Mac \n Du kan ikke hoppe over en ubrukt bokstav.",
    });
</script>

<button on:click={showSurprise}
  ><i class="fa-regular fa-circle-question fa-lg" />Hvordan spille?</button
>

<style>
  button {
    border: 0;
    padding: 12px 16px;
    font-size: 16px;
    cursor: pointer;
    background-color: white;
  }

  i {
    margin-right: 7px;
  }
</style>
