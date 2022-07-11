<script>
</script>

<div class="container">
 
  <div>

  </div>
</div>

<style>
  .container {
    margin-top: 30px;
    margin-bottom: 30px;
    max-width: 400px;
    display: block;
    margin-left: auto;
    margin-right: auto;
    text-align: left;
  }

  /*All the button styles*/

  .row {
    display: flex;
    gap: 5px;

    justify-content: center;
  }
  a {
    text-decoration: none;
  }

  /********************
GENERIC BUTTON STYLES
********************/
  .btn {
    font-size: 18px;
    padding: 0.8em 1.5em;
    display: inline-block;
    zoom: 1;
    color: #fff;
    text-align: center;
    position: relative;
    -webkit-transition: border 0.25s linear, color 0.25s linear,
      background-color 0.25s linear;
    transition: border 0.25s linear, color 0.25s linear,
      background-color 0.25s linear;
  }

  /********************
SOCIAL BUTTON STYLES
********************/

  /*FACEBOOK*/
  .btn.btn-facebook {
    background-color: #2479b6;
    border-color: #2479b6;
    -webkit-box-shadow: 0 3px 0 #1c6394;
    box-shadow: 0 3px 0 #1c6394;
  }
  .btn.btn-facebook:active {
    top: 3px;
    outline: none;
    -webkit-box-shadow: none;
    box-shadow: none;
  }
  /*TWITTER*/
  .btn.btn-twitter {
    background-color: #2a91db;
    border-color: #2a91db;
    -webkit-box-shadow: 0 3px 0 #1d6ea7;
    box-shadow: 0 3px 0 #1d6ea7;
  }
  .btn.btn-twitter:active {
    top: 3px;
    outline: none;
    -webkit-box-shadow: none;
    box-shadow: none;
  }
  /*REDDIT*/
  .btn.btn-reddit {
    background-color: #ff4300;
    border-color: #ff4300;
    -webkit-box-shadow: 0 3px 0 #b10d21;
    box-shadow: 0 3px 0 #b10d21;
  }
  .btn.btn-reddit:active {
    top: 3px;
    outline: none;
    -webkit-box-shadow: none;
    box-shadow: none;
  }
  /**********
Icon styles
**********/
  .btn i {
    padding-right: 0.8em;
    line-height: 22px;
  }
  .icon-only {
    padding: 1em;
  }
  .icon-only i {
    padding-right: 0;
    font-size: 22px;
    line-height: 22px;
  }
</style>
