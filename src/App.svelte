<script lang="ts">
  import Check from "./lib/CheckBtn.svelte";
  import CurrentWord from "./lib/CurrentWord.svelte";
  import Pattern from "./lib/Pattern.svelte";
  import ProgressBarMobile from "./lib/ProgressBar.svelte";
  import Remove from "./lib/RemoveBtn.svelte";
  import Rotate from "./lib/RotateBtn.svelte";
  import Message from "./lib/Message.svelte";
  import UsedWords from "./lib/UsedWords.svelte";
  import Hint from "./lib/HintBtn.svelte";
  import Keyhandler from "./lib/keyhandler.svelte";
  import Dropdown from "./lib/Dropdown.svelte"


  import { getMaxPoints, retriveStartUpData } from "./api/api";

  import { modal } from "./stores/modal";
  import { game } from "./stores/gameScore";
  import { ordnett } from "./stores/ordnett";
  import { gameMessage } from "./stores/gameMessage";

  import Modal from "svelte-simple-modal";


  // startup function that initilizes the game with data.
  (async function () {
    const data = await retriveStartUpData();
    if (!data) {
      gameMessage.newMessage("Obs! Noe gikk galt..", "red");
      return null;
    }

    game.update({
      myWords: data.myWords,
      maxWords: data.maxWords,
      myScore: getMaxPoints(data.myWords),
      maxScore: data.maxScore,
      solutions: data.solutions,
    });

    ordnett.set(data.wordnett.toUpperCase());
    return;
  })();

</script>

<svelte:head>
  <link
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.1.0/css/font-awesome.min.css"
    rel="stylesheet"
    type="text/css"
  />
</svelte:head>

<main>
  <Modal show={$modal} />
  <Keyhandler />
  <div class="header">
    <h1 class="title" style="margin: 0;">Ordnettet</h1>
    <a
      class="pointer"
      on:click={() =>
        (window.parent.location.href = "https://www.aftenposten.no/spill")}
    >
      <p style="margin: 0; text-align:right; color: black;">
        Alle spill<span class="hideonphone">&nbsp;fra Aftenposten</span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.00065 0.333008L5.82565 1.50801L10.4756 6.16634H0.333984V7.83301H10.4756L5.82565 12.4913L7.00065 13.6663L13.6673 6.99967L7.00065 0.333008Z"
            fill="#7F80E9"
          />
        </svg>
      </p>
    </a>
  </div>
  <div name="content" class="content">
    <UsedWords />
    <ProgressBarMobile />
    <CurrentWord />
    <Pattern />
    <Message />
    <Rotate />
    <div
      style="display:flex; align-items:center; gap: 10px; margin-bottom: 40px;"
    >
      <Remove />
      <Hint />
      <Check />
    </div>
  </div>

  <Dropdown title="Hvordan spiller jeg?">
    <div class="row-img">
      <img alt="Spillets regler" src="./rule_1.svg" />
      <img alt="Spillets regler" src="./rule_2.svg" />
      <img alt="Spillets regler" src="./rule_3.svg" />
    </div>

    <p><b>Regler:</b></p>
    <ul style="line-height: 22px;">
      <li>Let etter ord i ordnettet</li>
      <li>Ordene må bestå av fire eller fler bokstaver.</li>
      <li>Dobbeltkonsonant er tillatt</li>
      <li>
        Ordet må legges i en bane som ikke krysser bokstaver du ikke vil bruke.
      </li>
      <li>Du kan ikke gå tilbake til brukte bokstaver i samme ord</li>
    </ul>

    <p><b>Hjelp:</b></p>
    <ul style="line-height: 24px;">
      <li>Gjort feil? Bruk <b>fjern-knappen</b>.</li>
      <li>
        Vil du ha hint? Trykk på <img
          height="24px"
          style="transform: translate(0, 4px)"
          alt="hint"
          src="lightbulb.svg"
        />.
      </li>
    </ul>
  </Dropdown>

  <Dropdown title="Fasit på dagens ordnett">
    <p>
      Her er alle ordene for dagens ordnett. Ordene er hentet fra Norges
      Scrabbleforbund sin ordliste.
    </p>
    <ul class="list">
      {#each $game.solutions as word}
        <li>{word.toUpperCase()}</li>
      {/each}
    </ul>
  </Dropdown>
  <p>
    Hva synes du om spillet? Vi ønsker å forbedre oss! Svar på <href
      class="link pointer"
      on:click={() =>
        (window.parent.location.href =
          "https://docs.google.com/forms/d/e/1FAIpQLSd4xraVNBn6Di3mXITzSrVcGQypRlOtHtPXFwuzXiuBXnWDlg/viewform")}
      >fire kjappe spørsmål her</href
    >.
  </p>
</main>

<style type="scss">
  @font-face {
    font-family: ProductL;
    src: url("./assets/Produkt.woff2") format("woff");
  }

  @font-face {
    font-family: Product;
    src: url("./assets/Produkt-Semibold.woff2") format("woff");
  }

  @font-face {
    font-family: Graphik light;
    src: url("./assets/Graphik.woff2") format("woff");
  }
  @font-face {
    font-family: Graphik;
    src: url("./assets/Graphik-Semibold.woff") format("woff");
  }

  .link {
    text-decoration: underline;
    color: blue;
  }
  .pointer {
    cursor: pointer;
  }

  :root {
    font-family: Arial, Helvetica, sans-serif;
  }

  .hideonphone {
    @media screen and (max-width: 500px) {
      display: none;
    }
  }
  h1 {
    font-family: Product;
    letter-spacing: -1px;
  }

  .list {
    line-height: 26px;
  }

  .row-img {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
    padding: 20px;
    img {
      width: 90%;
    }
  }
  main {
    text-align: center;
    margin: 0 auto;
    max-width: 1000px;

    .header {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      gap: 40px;
      border-bottom: 3px solid rgb(193, 193, 193);
      padding: 10;
      margin: 10px 10px 0px 10px;
      align-items: center;

      .title {
        font-size: 32px;
      }
    }

    .content {
      display: flex;
      flex-direction: column;
      align-items: center;

      padding: 10px;
    }
  }
</style>
