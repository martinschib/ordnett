<script lang="ts">
  import { calculateWordPoints, isValidWord } from "../api/api";
  import { retriveData, storeData } from "../api/localstorage";

  import { gameMessage } from "../stores/gameMessage";
  import { game } from "../stores/gameScore";

  import { ordnett } from "../stores/ordnett";
  import { pattern } from "../stores/pattern";
  import { word } from "../stores/word";

  export async function handleCheck() {
    if ($word.length <= 1) {
      gameMessage.newMessage("Trykk på bokstavene for å lage ord", "blue");
      return;
    }

    for (const letter of $word) {
      if (!$ordnett.includes(letter)) {
        gameMessage.newMessage(
          "Ordet inneholder bokstaver som ikke er i nettet",
          "red"
        );
        return;
      }
    }

    if ($word.length <= 3) {
      gameMessage.newMessage("Ordet er for kort", "red");
      return;
    }

    let isValid = await isValidWord($word.join("").toLowerCase());
    if (!isValid) {
      pattern.reset();
      word.reset();
      return;
    }

    game.update({
      score: $game.score + calculateWordPoints($word.join("")),
      words: [$word.join("").toLowerCase(), ...$game.words],
    });
    storeData("my_words", [
      ...retriveData("my_words"),
      $word.join("").toLowerCase(),
    ]);

    gameMessage.newMessage(
      `Bra jobba +${calculateWordPoints($word.join(""))} poeng!`,
      "green"
    );

    word.reset();
    pattern.reset();

    parent.postMessage(`numWords:${$game.words.length}`, "*");
  }

  $: isLetterInNett = (letter: string) =>
    !!$ordnett.includes(letter.toUpperCase());

  function getItemBetweenNextItem(item) {
    if ($pattern.length === 0) return [];

    let colTo = item.id % 3;
    let rowTo = Math.floor(item.id / 3);

    let colFrom = $pattern[$pattern.length - 1] % 3;
    let rowFrom = Math.floor($pattern[$pattern.length - 1] / 3);

    if (Math.abs(colFrom - colTo) === 1 || Math.abs(rowFrom - rowTo) === 1)
      return [];

    return [{ id: (item.id + $pattern[$pattern.length - 1]) / 2 }];
  }

  function handleKeydown(event) {
    // backspace
    if (event.keyCode == 8 && $word.length - 1 > -1) {
      if (isLetterInNett($word[$word.length - 1])) {
        pattern.removeLast();
        word.removeLast();
      } else {
        word.removeLast();
      }
    } else if (event.keyCode == 13) {
      handleCheck();
    } else if (
      (event.keyCode >= 65 && event.keyCode <= 90) ||
      event.keyCode === 186 ||
      event.keyCode === 222 ||
      event.keyCode === 219
    ) {

      if (isLetterInNett(event.key) && $word.filter(i => event.key.toUpperCase() === i).length  < 2) {
        let letterIndex = $ordnett.split("").indexOf(event.key.toUpperCase());

        if ($pattern.includes(letterIndex)) {
          if ($pattern[$pattern.length - 1] === letterIndex) {
            pattern.add(letterIndex);
            word.add($ordnett[letterIndex]);
          } 
        } else {
          getItemBetweenNextItem({ id: letterIndex }).forEach((newItem) => {
            if (letterIndex !== newItem.id && !$pattern.includes(newItem.id)) {
              pattern.add(newItem.id);
              word.add($ordnett[newItem.id]);
            }
          });
          pattern.add(letterIndex);
          word.add($ordnett[letterIndex]);
        }
      }
    }
  }
</script>

<svelte:window on:keydown={handleKeydown} />
