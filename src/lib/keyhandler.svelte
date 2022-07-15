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
      words: [...$game.words, $word.join("").toLowerCase()],
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
  }

  $: isLetterInNett = (letter: string) =>
    !!$ordnett.includes(letter.toUpperCase());

  $: isLetterdColored = (letter: string, i: number) => {
    if (!isLetterInNett(letter)) return false;

    let count = $word.filter((value) => value === letter).length;
    if (count === 1) return true;

    let firstIndex = $word.indexOf(letter);
    if (i === firstIndex) return true;

    return false;
  };

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
      if (isLetterdColored($word[$word.length - 1], $word.length - 1)) {
        pattern.removeLast();
        word.removeLast();
      } else {
        word.removeLast();
      }
    } else if (event.keyCode == 13) {
        handleCheck()
    }
    else if (
      (event.keyCode >= 65 && event.keyCode <= 90) ||
      event.keyCode === 186 ||
      event.keyCode === 222 ||
      event.keyCode === 219
    ) {
      word.add(event.key.toUpperCase());

      if (isLetterInNett(event.key)) {
        let letterIndex = $ordnett
          .split("")
          .map((item, i) => {
            if ($pattern.includes(i)) return "*";
            else return item;
          })
          .indexOf(event.key.toUpperCase());

        if (letterIndex > -1 && !$pattern.includes(letterIndex)) {
          getItemBetweenNextItem({ id: letterIndex }).forEach((newItem) => {
            if (!$pattern.includes(newItem.id)) {
              pattern.add(newItem.id);
              word.add($ordnett[newItem.id]);
            }
          });
          if (!$pattern.includes(letterIndex)) {
            pattern.add(letterIndex);
          }
        }
      }
    }
  }
</script>

<svelte:window on:keydown={handleKeydown} />
