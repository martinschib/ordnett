<script>

  const handleClick = () => {
    console.log("Klicked")
  } 

</script>

<button on:click="{() => handleClick()}">
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

    background-color: #bfe069;

    cursor: pointer;

    box-shadow: -2px 12px 16px -13px rgba(0, 0, 0, 0.24);
    -webkit-box-shadow: -2px 12px 16px -13px rgba(0, 0, 0, 0.24);
    -moz-box-shadow: -2px 12px 16px -13px rgba(0, 0, 0, 0.24);

    .img {
      height: 20px;
      width: 20px;
    }
  }
</style>
