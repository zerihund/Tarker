const giveContent =(username, id)=>{
  return `<div class="topnav">
    <div class="topnav-left">
        <div class="logo"></div>
        <form class="topnav-searchbar-form" action="" method="get">
            <input class="search-input" type="text" placeholder="search" name="search">
            <button class="search-btn" type="submit"><i class="fa fa-search"></i></button>
        </form>

    </div>
    <div class="topnav-right">
        <div id="login-dropdown" class="login-dropdown">
            <ul class="login-dropdown-content">
                <li href="#smth">some function</li>
                <li href="#smth">some function</li>
            </ul>
            
        </div>
        <p>${username}</p>
        <button id="user-icon" class="user-icon">
            <i class="fa fa-caret-down fa-2x " aria-hidden="true"></i>
        </button>

    </div>
</div>
<aside>

</aside>
<main id="${id}">

</main>
<script src="res/js/content.js"></script>`
};

module.exports = {
  giveContent:giveContent
};